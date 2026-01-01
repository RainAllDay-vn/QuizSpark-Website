import type { Question } from "@/model/Question.ts";
import MarkdownRenderer from "@/components/custom/markdown-renderer.tsx";
import { Check, Edit, Eye, EyeOff, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { memo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Input } from "@/components/ui/input.tsx";
import type QuestionCreationDTO from "@/dtos/QuestionCreationDTO.ts";
import { addQuestion, deleteQuestion, updateQuestion } from "@/lib/api.ts";
import type QuestionUpdateDTO from "@/dtos/QuestionUpdateDTO.ts";
import * as React from "react";
import { Badge } from "@/components/ui/badge.tsx";

interface QuestionCardProps {
  questionProp: Question;
  bankId: string;
  index: number;
  isEditingProp: boolean;
  appendQuestion: (question: Question) => void;
  removeQuestion: (question: Question) => void;
}

function QuestionCard({
  questionProp,
  bankId,
  index,
  isEditingProp,
  appendQuestion,
  removeQuestion,
}: QuestionCardProps) {
  const [question, setQuestion] = useState(questionProp);
  const [isEditing, setIsEditing] = useState(isEditingProp);
  const [tempQuestion, setTempQuestion] = useState({ ...question });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  const validateQuestionData = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!tempQuestion.description || tempQuestion.description.trim() === '') {
      errors.description = 'Description is required and cannot be empty';
    }
    // Validate choices (should not be null or undefined)
    if (tempQuestion.choices.length < 2) {
      errors.choices = 'At least 2 choices are required';
    } else {
      const hasEmptyChoice = tempQuestion.choices.some(choice => !choice || choice.trim() === '');
      if (hasEmptyChoice) {
        errors.choices = 'All choices must have content';
      }
    }
    // Validate answers
    if (!tempQuestion.answer || tempQuestion.answer.length === 0) {
      errors.answer = 'At least one correct answer is required';
    }
    return errors;
  };

  const handleSaveQuestion = async () => {
    const errors = validateQuestionData();
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      // Check if this is a new question (no id yet) or an existing one
      if (tempQuestion.id === 'new') {
        // This is a new question, create it
        const questionData: QuestionCreationDTO = {
          questionType: tempQuestion.questionType,
          tags: tempQuestion.tags || [],
          description: tempQuestion.description,
          answer: tempQuestion.answer,
          choices: tempQuestion.choices,
        };
        const newQuestion = await addQuestion(bankId, questionData);
        appendQuestion(newQuestion);
        removeQuestion(question);
      } else {
        // This is an existing question, update it
        const questionData: QuestionUpdateDTO = {
          questionType: tempQuestion.questionType,
          description: tempQuestion.description,
          answer: tempQuestion.answer,
          choices: tempQuestion.choices,
          tags: tempQuestion.tags,
        };
        const updatedQuestion = await updateQuestion(tempQuestion.id, questionData);
        setQuestion(updatedQuestion);
      }
      setIsEditing(false);
      setValidationErrors({});
    } catch (error) {
      console.error('Failed to save question:', error);
    }
  };

  const handleEditQuestion = () => {
    setIsEditing(true);
  };

  const handleCancelQuestion = () => {
    if (question.id === 'new') {
      removeQuestion(question);
      return;
    }
    setIsEditing(false);
    setValidationErrors({});
  };

  const handleDeleteQuestion = async (question: Question) => {
    try {
      if (!question.id.startsWith("AI_")) {
        await deleteQuestion(question.id);
      }
      removeQuestion(question);
    } catch (error) {
      console.error('Failed to delete question:', error);
    }
  };

  const handleChoiceChange = (index: number, value: string) => {
    const newChoices = [...tempQuestion.choices];
    newChoices[index] = value;
    setTempQuestion({ ...tempQuestion, choices: newChoices });
  };

  const handleAddChoice = () => {
    setTempQuestion({ ...tempQuestion, choices: [...tempQuestion.choices, ""] });
  };

  const handleRemoveChoice = (index: number) => {
    const newChoices = tempQuestion.choices.filter((_, i) => i !== index);
    const newAnswer = tempQuestion.answer.filter(ans => ans !== index.toString());
    setTempQuestion({ ...tempQuestion, choices: newChoices, answer: newAnswer });
  };

  const handleAnswerChange = (index: number) => {
    if (tempQuestion.questionType === "SINGLE_ANSWER") {
      setTempQuestion({ ...tempQuestion, answer: [index.toString()] });
      return;
    }
    if (tempQuestion.questionType === "MULTIPLE_ANSWER") {
      const currentAnswers = tempQuestion.answer;
      if (currentAnswers.includes(index.toString())) {
        const newAnswer = currentAnswers.filter(ans => ans !== index.toString());
        setTempQuestion({ ...tempQuestion, answer: newAnswer });
      } else {
        const newAnswer = [...currentAnswers, index.toString()].sort();
        setTempQuestion({ ...tempQuestion, answer: newAnswer });
      }
    }
  };

  const handleQuestionDescriptionChange = (value: string) => {
    setTempQuestion({ ...tempQuestion, description: value });
  };

  const handleQuestionTypeChange = (value: string) => {
    setTempQuestion({ ...tempQuestion, questionType: value as Question['questionType'] });
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      console.log(items[i]);
      if (items[i].kind === 'string') items[i].getAsString((data) => console.log(data));
    }
  };

  if (isEditing) return (
    <div className="bg-[#151518] border border-zinc-800 rounded-lg p-4">
      <span className="text-sm font-medium text-violet-400 mr-3">{tempQuestion.id === 'new' ? '#New' : '#Edit'}</span>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className="w-full">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm text-zinc-400">Question Type:</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-white h-8 px-2"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    {showPreview ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                    {showPreview ? "Edit" : "Preview"}
                  </Button>
                </div>
                <Select value={tempQuestion.questionType} onValueChange={handleQuestionTypeChange}>
                  <SelectTrigger className="bg-[#0f0f10] border-zinc-700 text-white focus:ring-violet-600">
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#151518] border-zinc-700">
                    <SelectItem value="SINGLE_ANSWER">Single Answer</SelectItem>
                    <SelectItem value="MULTIPLE_ANSWER">Multiple Answer</SelectItem>
                    <SelectItem value="FILL_THE_BLANK">Fill the Blank</SelectItem>
                    <SelectItem value="OPEN_ANSWER">Open Answer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {showPreview ? (
                <div className={`bg-[#0f0f10] border p-3 rounded mb-3 ${validationErrors.description ? 'border-red-500' : 'border-zinc-700'
                  }`}>
                  <MarkdownRenderer content={tempQuestion.description} />
                </div>
              ) : (
                <Textarea
                  value={tempQuestion.description}
                  onChange={(e) => handleQuestionDescriptionChange(e.target.value)}
                  onPaste={handlePaste}
                  className={`bg-[#0f0f10] border text-white placeholder:text-zinc-500 focus-visible:ring-violet-600 mb-3 min-h-[100px] ${validationErrors.description ? 'border-red-500' : 'border-zinc-700'
                    }`}
                  placeholder="Question text (supports Markdown and LaTeX: $x^2$ for inline math, $$\frac{1}{2}$$ for block math)"
                />
              )}
              <div className="space-y-2">
                <p className="text-sm text-zinc-400 mb-2">Answer Options:</p>
                {tempQuestion.choices.map((choice, choiceIndex) => (
                  <div key={choiceIndex} className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${tempQuestion.answer.includes(choiceIndex.toString()) ? 'border-green-500 bg-green-500' : 'border-zinc-600'
                        }`} onClick={() => handleAnswerChange(choiceIndex)}>
                      {tempQuestion.answer.includes(choiceIndex.toString()) &&
                        <Check className="w-3 h-3 text-white" />}
                    </div>
                    {showPreview ? (
                      <div className={`bg-[#0f0f10] border p-2 rounded flex-1 ${validationErrors.choices ? 'border-red-500' : 'border-zinc-700'
                        }`}>
                        <MarkdownRenderer content={choice} />
                      </div>
                    ) : (
                      <Input
                        value={choice}
                        onChange={(e) => handleChoiceChange(choiceIndex, e.target.value)}
                        className={`bg-[#0f0f10] border text-white placeholder:text-zinc-500 focus-visible:ring-violet-600 flex-1 ${validationErrors.choices ? 'border-red-500' : 'border-zinc-700'
                          }`}
                        placeholder={`Option ${choiceIndex + 1} (supports Markdown and LaTeX)`}
                      />
                    )}
                    {tempQuestion.choices.length > 2 && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-400 bg-[#151518] hover:bg-red-900/20"
                        onClick={() => handleRemoveChoice(choiceIndex)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c] mt-2"
                  onClick={handleAddChoice}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>
            </div>
          </div>
          {/* Validation Errors Display */}
          {Object.keys(validationErrors).length > 0 && (
            <div className="mb-4 bg-red-900/20 border border-red-700 rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-red-200">
                {Object.entries(validationErrors).map(([field, error]) => (
                  <li key={field}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {handleSaveQuestion && handleCancelQuestion && (
          <div className="flex space-x-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              className="border-green-600 text-green-400 bg-[#151518] hover:bg-green-900/20"
              onClick={handleSaveQuestion}
            >
              <Save className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
              onClick={handleCancelQuestion}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[#151518] border border-zinc-800 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="text-sm font-medium text-violet-400 mr-3">#{index + 1}</span>
            <div className="text-lg font-medium text-white"><MarkdownRenderer content={question.description} /></div>
          </div>
          {question.tags && question.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {question.tags.map((tag, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-violet-900/30 text-violet-300 border-violet-800/50 hover:bg-violet-900/50 transition-colors px-2 py-0.5 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="mt-3 space-y-2">
            {(question.questionType == "SINGLE_ANSWER" || question.questionType == "MULTIPLE_ANSWER")
              && question.choices.map((option, optionIndex) => {
                const isCorrect = question.answer.includes(optionIndex.toString());
                return (
                  <div
                    key={optionIndex}
                    className={`flex items-center space-x-2 p-2 rounded ${isCorrect ? 'bg-green-900/30 border border-green-700' : ''
                      }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isCorrect ? 'border-green-500 bg-green-500' : 'border-zinc-600'
                      }`}>
                      {isCorrect && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div className="text-zinc-200"><MarkdownRenderer content={option} /></div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
            onClick={() => handleEditQuestion()}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-red-600 text-red-400 bg-[#151518] hover:bg-red-900/20"
            onClick={() => handleDeleteQuestion(question)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default memo(QuestionCard);