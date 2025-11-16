import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {updateQuestion, deleteQuestion, addQuestion} from '@/lib/api';
import type QuestionCreationDTO from '@/dtos/QuestionCreationDTO';
import type QuestionUpdateDTO from '@/dtos/QuestionUpdateDTO';
import type {Question} from '@/model/Question';
import type {QuestionBank} from '@/model/QuestionBank';
import {Plus, Save, Trash2, Check, Edit} from 'lucide-react';
import {useState} from 'react';

interface QuestionEditSectionProps {
  questionBank: QuestionBank | null;
  onQuestionsUpdated: (updatedQuestions: Question[]) => void;
}

export default function QuestionEditSection({
  questionBank,
  onQuestionsUpdated
}: QuestionEditSectionProps) {
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

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

  const handleSaveQuestion = async () => {
    if (!editingQuestion || !questionBank) return;

    try {
      // Check if this is a new question (no id yet) or an existing one
      if (editingQuestion.id === 'new') {
        // This is a new question, create it
        const questionData: QuestionCreationDTO = {
          tags: [], // Default empty tags
          description: editingQuestion.description,
          answer: editingQuestion.answer,
          choices: editingQuestion.choices
        };
        
        const newQuestion = await addQuestion(questionBank.id, questionData);
        const updatedQuestions = [...questionBank.questions, newQuestion];
        onQuestionsUpdated(updatedQuestions);
      } else {
        // This is an existing question, update it
        const questionData: QuestionUpdateDTO = {
          description: editingQuestion.description,
          answer: editingQuestion.answer,
          choices: editingQuestion.choices
        };
        
        const updatedQuestion = await updateQuestion(editingQuestion.id, questionData);
        const updatedQuestions = questionBank.questions.map(q =>
          q.id === editingQuestion.id ? updatedQuestion : q
        );
        onQuestionsUpdated(updatedQuestions);
      }
      setEditingQuestion(null);
    } catch (error) {
      console.error('Failed to save question:', error);
      // Optionally show an error message to the user
    }
  };

  const handleCancelQuestion = () => {
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!questionBank) return;

    try {
      await deleteQuestion(id);
      const updatedQuestions = questionBank.questions.filter(q => q.id !== id);
      onQuestionsUpdated(updatedQuestions);
    } catch (error) {
      console.error('Failed to delete question:', error);
      // Optionally show an error message to the user
    }
  };

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: 'new', // Temporary ID for new questions
      description: '',
      choices: ['', '', ''], // Start with 3 empty choices
      answer: 0 // Default to first choice
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
    let newAnswer = editingQuestion.answer;

    // Adjust the correct answer index if necessary
    if (editingQuestion.answer >= index && editingQuestion.answer > 0) {
      newAnswer = editingQuestion.answer - 1;
    }

    setEditingQuestion({...editingQuestion, choices: newChoices, answer: newAnswer});
  };

  const handleAnswerChange = (index: number) => {
    if (!editingQuestion) return;

    setEditingQuestion({...editingQuestion, answer: index});
  };

  const handleQuestionDescriptionChange = (value: string) => {
    if (!editingQuestion) return;

    setEditingQuestion({...editingQuestion, description: value});
  };

  return (
    <div className="bg-[#0f0f10] border border-zinc-800 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Questions ({questionBank?.questions.length || 0})</h2>
        <Button
          variant="outline"
          className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
          onClick={handleAddQuestion}
        >
          <Plus className="w-4 h-4 mr-2"/>
          Add Question
        </Button>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {/* Show new question being edited */}
        {editingQuestion?.id === 'new' && (
          <div className="bg-[#151518] border border-zinc-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-violet-400 mr-3">#New</span>
                  <div className="w-full">
                    <Input
                      value={editingQuestion.description}
                      onChange={(e) => handleQuestionDescriptionChange(e.target.value)}
                      className="bg-[#0f0f10] border border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-600 mb-3"
                      placeholder="Question text"
                    />
                    <div className="space-y-2">
                      <p className="text-sm text-zinc-400 mb-2">Answer Options:</p>
                      {editingQuestion.choices.map((choice, choiceIndex) => (
                        <div key={choiceIndex} className="flex items-center space-x-2">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                              editingQuestion.answer === choiceIndex ? 'border-green-500 bg-green-500' : 'border-zinc-600'
                            }`} onClick={() => handleAnswerChange(choiceIndex)}>
                            {editingQuestion.answer === choiceIndex && <Check className="w-3 h-3 text-white"/>}
                          </div>
                          <Input
                            value={choice}
                            onChange={(e) => handleChoiceChange(choiceIndex, e.target.value)}
                            className="bg-[#0f0f10] border border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-600 flex-1"
                            placeholder={`Option ${choiceIndex + 1}`}
                          />
                          {editingQuestion.choices.length > 2 && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 bg-[#151518] hover:bg-red-900/20"
                              onClick={() => handleRemoveChoice(choiceIndex)}
                            >
                              <Trash2 className="w-4 h-4"/>
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
                        <Plus className="w-4 h-4 mr-2"/>
                        Add Option
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-600 text-green-400 bg-[#151518] hover:bg-green-900/20"
                  onClick={handleSaveQuestion}
                >
                  <Save className="w-4 h-4"/>
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
            </div>
          </div>
        )}
        
        {questionBank?.questions.map((q, index) => (
          <div key={q.id} className="bg-[#151518] border border-zinc-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-violet-400 mr-3">#{index + 1}</span>
                  {editingQuestion?.id === q.id ? (
                    <div className="w-full">
                      <Input
                        value={editingQuestion.description}
                        onChange={(e) => handleQuestionDescriptionChange(e.target.value)}
                        className="bg-[#0f0f10] border border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-600 mb-3"
                        placeholder="Question text"
                      />
                      <div className="space-y-2">
                        <p className="text-sm text-zinc-400 mb-2">Answer Options:</p>
                        {editingQuestion.choices.map((choice, choiceIndex) => (
                          <div key={choiceIndex} className="flex items-center space-x-2">
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                                editingQuestion.answer === choiceIndex ? 'border-green-500 bg-green-500' : 'border-zinc-600'
                              }`} onClick={() => handleAnswerChange(choiceIndex)}>
                              {editingQuestion.answer === choiceIndex && <Check className="w-3 h-3 text-white"/>}
                            </div>
                            <Input
                              value={choice}
                              onChange={(e) => handleChoiceChange(choiceIndex, e.target.value)}
                              className="bg-[#0f0f10] border border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-600 flex-1"
                              placeholder={`Option ${choiceIndex + 1}`}
                            />
                            {editingQuestion.choices.length > 2 && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-600 text-red-400 bg-[#151518] hover:bg-red-900/20"
                                onClick={() => handleRemoveChoice(choiceIndex)}
                              >
                                <Trash2 className="w-4 h-4"/>
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
                          <Plus className="w-4 h-4 mr-2"/>
                          Add Option
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <h3 className="text-lg font-medium text-white">{q.description}</h3>
                  )}
                </div>

                {/* Answer Options - Only show when not editing */}
                {editingQuestion?.id !== q.id && (
                  <div className="mt-3 space-y-2">
                    {q.choices.map((option, optionIndex) => {
                      const isCorrect = q.answer === optionIndex;
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
                          <span className="text-zinc-200">{option}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 ml-4">
                {editingQuestion?.id === q.id ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-600 text-green-400 bg-[#151518] hover:bg-green-900/20"
                      onClick={handleSaveQuestion}
                    >
                      <Save className="w-4 h-4"/>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
                      onClick={handleCancelQuestion}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}