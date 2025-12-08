import {Button} from '@/components/ui/button';
import {updateQuestion, deleteQuestion, addQuestion, overwriteQuestion} from '@/lib/api';
import type QuestionCreationDTO from '@/dtos/QuestionCreationDTO';
import type QuestionUpdateDTO from '@/dtos/QuestionUpdateDTO';
import type {Question} from '@/model/Question';
import type {QuestionBank} from '@/model/QuestionBank';
import {Plus, Trash2, Check, Edit, Upload} from 'lucide-react';
import {useState, useRef} from 'react';
import * as React from "react";
import QuestionEditor from './question_editor';
import MarkdownRenderer from "@/components/custom/markdown-renderer";

interface QuestionEditSectionProps {
  questionBank: QuestionBank | null;
  onQuestionsUpdated: (updatedQuestions: Question[]) => void;
}

export default function QuestionEditSection({
  questionBank,
  onQuestionsUpdated
}: QuestionEditSectionProps) {
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [importError, setImportError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditQuestion = (question: Question) => {
    // If there's a current editing question, save it first
    if (editingQuestion && questionBank) {
      const updatedQuestions = questionBank.questions.map(q =>
        q.id === editingQuestion.id ? editingQuestion : q
      );
      onQuestionsUpdated(updatedQuestions);
    }
    // Start editing the new question
    setEditingQuestion({...question});
  };

  const validateQuestionData = (question: Question): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (!question.description || question.description.trim() === '') {
      errors.description = 'Description is required and cannot be empty';
    }
    // Validate choices (should not be null or undefined)
    if (question.choices.length < 2) {
      errors.choices = 'At least 2 choices are required';
    } else {
      const hasEmptyChoice = question.choices.some(choice => !choice || choice.trim() === '');
      if (hasEmptyChoice) {
        errors.choices = 'All choices must have content';
      }
    }
    // Validate answers
    if (!question.answer || question.answer.length === 0) {
      errors.answer = 'At least one correct answer is required';
    }
    return errors;
  };

  const handleSaveQuestion = async () => {
    if (!editingQuestion || !questionBank) return;
    const errors = validateQuestionData(editingQuestion);
    setValidationErrors(errors);
    // If there are validation errors, don't proceed with saving
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      // Check if this is a new question (no id yet) or an existing one
      if (editingQuestion.id === 'new') {
        // This is a new question, create it
        const questionData: QuestionCreationDTO = {
          questionType: editingQuestion.questionType,
          tags: editingQuestion.tags || [],
          description: editingQuestion.description,
          answer: editingQuestion.answer,
          choices: editingQuestion.choices,
          explanation: editingQuestion.explanation
        };
        
        const newQuestion = await addQuestion(questionBank.id, questionData);
        const updatedQuestions = [...questionBank.questions, newQuestion];
        onQuestionsUpdated(updatedQuestions);
      } else {
        // This is an existing question, update it
        const questionData: QuestionUpdateDTO = {
          questionType: editingQuestion.questionType,
          description: editingQuestion.description,
          answer: editingQuestion.answer,
          choices: editingQuestion.choices,
          tags: editingQuestion.tags,
          explanation: editingQuestion.explanation
        };
        
        const updatedQuestion = await updateQuestion(editingQuestion.id, questionData);
        const updatedQuestions = questionBank.questions.map(q =>
          q.id === editingQuestion.id ? updatedQuestion : q
        );
        onQuestionsUpdated(updatedQuestions);
      }
      setEditingQuestion(null);
      setValidationErrors({});
    } catch (error) {
      console.error('Failed to save question:', error);
    }
  };

  const handleCancelQuestion = () => {
    setEditingQuestion(null);
    setValidationErrors({});
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!questionBank) return;

    try {
      await deleteQuestion(id);
      const updatedQuestions = questionBank.questions.filter(q => q.id !== id);
      onQuestionsUpdated(updatedQuestions);
    } catch (error) {
      console.error('Failed to delete question:', error);
    }
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: 'new', // Temporary ID for new questions
      description: '',
      choices: ['', '', ''], // Start with 3 empty choices
      answer: ['0'], // Default to first choice as string
      questionType: 'SINGLE_ANSWER',
      tags: []
    };
    setEditingQuestion(newQuestion);
  };

  const handleChoiceChange = (index: number, value: string) => {
    if (!editingQuestion) return;

    const newChoices = [...editingQuestion.choices];
    newChoices[index] = value;
    setEditingQuestion({...editingQuestion, choices: newChoices});
  };

  const handleAddChoice = () => {
    if (!editingQuestion) return;
    setEditingQuestion({...editingQuestion, choices: [...editingQuestion.choices, ""]});
  };

  const handleRemoveChoice = (index: number) => {
    if (!editingQuestion) return;
    const newChoices = editingQuestion.choices.filter((_, i) => i !== index);
    const newAnswer = editingQuestion.answer.filter(ans => ans !== index.toString());
    setEditingQuestion({...editingQuestion, choices: newChoices, answer: newAnswer});
  };

  const handleAnswerChange = (index: number) => {
    if (!editingQuestion) return;
    if (editingQuestion.questionType==="SINGLE_ANSWER") {
      setEditingQuestion({...editingQuestion, answer: [index.toString()]});
      return;
    }
    if (editingQuestion.questionType==="MULTIPLE_ANSWER") {
      const currentAnswers = editingQuestion.answer;
      if (currentAnswers.includes(index.toString())) {
        const newAnswer = currentAnswers.filter(ans => ans !== index.toString());
        setEditingQuestion({...editingQuestion, answer: newAnswer});
      } else {
        const newAnswer = [...currentAnswers, index.toString()].sort();
        setEditingQuestion({...editingQuestion, answer: newAnswer});
      }
    }

  };

  const handleQuestionDescriptionChange = (value: string) => {
    if (!editingQuestion) return;
    setEditingQuestion({...editingQuestion, description: value});
  };

  const handleQuestionTypeChange = (value: string) => {
    if (!editingQuestion) return;
    setEditingQuestion({...editingQuestion, questionType: value as Question['questionType']});
  };

  const handleImportFromJSON = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !questionBank) return;
    setIsImporting(true);
    setImportError(null);

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      if (!Array.isArray(jsonData)) {
        console.error('Import error:', 'JSON file must contain an array of questions');
        setImportError('JSON file must contain an array of questions');
        setIsImporting(false);
        return;
      }

      // Validate each question
      const questionsToImport: QuestionCreationDTO[] = jsonData.map(q => {
        return {
          questionType: q.questionType,
          tags: q.tags || [],
          description: q.description,
          choices: q.choices,
          answer: q.answer,
          explanation: q.explanation
        };
      });
      // Call the API to overwrite all questions
      const updatedQuestions = await overwriteQuestion(questionBank.id, questionsToImport);
      onQuestionsUpdated(updatedQuestions);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Import error:', error);
      setImportError(error instanceof Error ? error.message : 'Failed to import questions');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="bg-[#0f0f10] border border-zinc-800 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Questions ({questionBank?.questions.length || 0})</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
          >
            <Upload className="w-4 h-4 mr-2"/>
            {isImporting ? 'Importing...' : 'Import JSON'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportFromJSON}
            className="hidden"
          />
          <Button
            variant="outline"
            className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
            onClick={handleAddQuestion}
          >
            <Plus className="w-4 h-4 mr-2"/>
            Add Question
          </Button>
        </div>
      </div>

      {/* Import Error Display */}
      {importError && (
        <div className="mb-4 bg-red-900/20 border border-red-700 rounded-lg p-4">
          <p className="text-red-200">{importError}</p>
        </div>
      )}
      
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

      {/* Questions List */}
      <div className="space-y-4">
        {/* Show the question being edited */}
        {editingQuestion?.id === 'new' && (
          <QuestionEditor
            editingQuestion={editingQuestion}
            validationErrors={validationErrors}
            handleQuestionTypeChange={handleQuestionTypeChange}
            handleQuestionDescriptionChange={handleQuestionDescriptionChange}
            handleChoiceChange={handleChoiceChange}
            handleAnswerChange={handleAnswerChange}
            handleAddChoice={handleAddChoice}
            handleRemoveChoice={handleRemoveChoice}
            handleSaveQuestion={handleSaveQuestion}
            handleCancelQuestion={handleCancelQuestion}
            isNewQuestion={true}
          />
        )}

        {questionBank?.questions.map((q, index) => {
          if (q.id === editingQuestion?.id) return <QuestionEditor
            key="new"
            editingQuestion={editingQuestion}
            validationErrors={validationErrors}
            handleQuestionTypeChange={handleQuestionTypeChange}
            handleQuestionDescriptionChange={handleQuestionDescriptionChange}
            handleChoiceChange={handleChoiceChange}
            handleAnswerChange={handleAnswerChange}
            handleAddChoice={handleAddChoice}
            handleRemoveChoice={handleRemoveChoice}
            handleSaveQuestion={handleSaveQuestion}
            handleCancelQuestion={handleCancelQuestion}
            isNewQuestion={false}
          />
          else return <div key={q.id} className="bg-[#151518] border border-zinc-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-violet-400 mr-3">#{index + 1}</span>
                  <div className="text-lg font-medium text-white"><MarkdownRenderer content={q.description} /></div>
                </div>
                <div className="mt-3 space-y-2">
                  {q.choices.map((option, optionIndex) => {
                    const isCorrect = q.answer.includes(optionIndex.toString());
                    return (
                      <div
                        key={optionIndex}
                        className={`flex items-center space-x-2 p-2 rounded ${
                          isCorrect ? 'bg-green-900/30 border border-green-700' : ''
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isCorrect ? 'border-green-500 bg-green-500' : 'border-zinc-600'
                        }`}>
                          {isCorrect && <Check className="w-3 h-3 text-white"/>}
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
                  onClick={() => handleEditQuestion(q)}
                >
                  <Edit className="w-4 h-4"/>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-600 text-red-400 bg-[#151518] hover:bg-red-900/20"
                  onClick={() => handleDeleteQuestion(q.id)}
                >
                  <Trash2 className="w-4 h-4"/>
                </Button>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  );
}