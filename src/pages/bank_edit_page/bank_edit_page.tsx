import Loader from '@/components/custom/loader';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {getQuestionBank, updateQuestionBank} from '@/lib/api';
import type {Question} from '@/model/Question';
import type {QuestionBank} from '@/model/QuestionBank';
import {Plus, Save, ChevronLeft, Edit, Trash2, Check, Eye} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

export default function BankEditPage() {
  const {bankId} = useParams<{ bankId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questionBank, setQuestionBank] = useState<QuestionBank | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [editingBank, setEditingBank] = useState<QuestionBank | null>(null);

  useEffect(() => {
    if (!bankId) {
      alert("This page doesn't exist")
      navigate("/home")
      return;
    }
    getQuestionBank(bankId)
      .then(bank => {
        setQuestionBank(bank);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load data:', error);
        setLoading(false);
      });
  }, [bankId]);

  const handleEditBank = () => {
    if (questionBank) {
      setEditingBank({...questionBank});
    }
  };

  const handleSaveBank = async () => {
    if (!editingBank || !bankId) return;

    try {
      const updatedBank = await updateQuestionBank(bankId, editingBank);
      setQuestionBank(updatedBank);
      setEditingBank(null);
    } catch (error) {
      console.error('Failed to update question bank:', error);
    }
  };

  const handleCancelBank = () => {
    setEditingBank(null);
  };

  const handleBankFieldChange = (field: keyof QuestionBank, value: string) => {
    if (!editingBank) return;

    setEditingBank({...editingBank, [field]: value});
  };

  const handleEditQuestion = (question: Question) => {
    // If there's a current editing question, save it first
    if (editingQuestion && questionBank) {
      const updatedQuestions = questionBank.questions.map(q =>
        q.id === editingQuestion.id ? editingQuestion : q
      );
      setQuestionBank({...questionBank, questions: updatedQuestions});
    }
    // Start editing the new question
    setEditingQuestion({...question});
  };

  const handleSaveQuestion = () => {
    if (!editingQuestion || !questionBank) return;

    const updatedQuestions = questionBank.questions.map(q =>
      q.id === editingQuestion.id ? editingQuestion : q
    );
    setQuestionBank({...questionBank, questions: updatedQuestions});
    setEditingQuestion(null);
  };

  const handleCancelQuestion = () => {
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (id: string) => {
    if (!questionBank) return;

    const updatedQuestions = questionBank.questions.filter(q => q.id !== id);
    setQuestionBank({...questionBank, questions: updatedQuestions});
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

  if (loading) return <Loader/>

  return (
    <div className="min-h-screen bg-black text-white w-full">
      {/* Header Section */}
      <div className="border-b border-zinc-800 bg-[#0f0f10]">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Edit Question Bank
          </h1>
          <p className="text-zinc-400 mt-2 max-w-lg">
            Manage questions, edit content and configure quiz settings
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Question Bank Metadata Section */}
        {questionBank && (
          <div className="bg-[#0f0f10] border border-zinc-800 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Question Bank Details</h2>
              {editingBank ? (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-600 text-green-400 bg-[#151518] hover:bg-green-900/20"
                    onClick={handleSaveBank}
                  >
                    <Save className="w-4 h-4 mr-2"/>
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
                    onClick={handleCancelBank}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
                  onClick={handleEditBank}
                >
                  <Edit className="w-4 h-4 mr-2"/>
                  Edit
                </Button>
              )}
            </div>

            {editingBank ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
                  <Input
                    value={editingBank.name}
                    onChange={(e) => handleBankFieldChange('name', e.target.value)}
                    className="bg-[#0f0f10] border border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Access</label>
                  <Input
                    value={editingBank.access}
                    onChange={(e) => handleBankFieldChange('access', e.target.value)}
                    className="bg-[#0f0f10] border border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Status</label>
                  <Input
                    value={editingBank.status}
                    onChange={(e) => handleBankFieldChange('status', e.target.value)}
                    className="bg-[#0f0f10] border border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-600"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Description</label>
                  <Input
                    value={editingBank.description || ''}
                    onChange={(e) => handleBankFieldChange('description', e.target.value)}
                    className="bg-[#0f0f10] border border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-600"
                    placeholder="Enter description"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-zinc-400 mb-1">Name</p>
                  <p className="text-white">{questionBank.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-400 mb-1">Access</p>
                  <p className="text-white">{questionBank.access}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-400 mb-1">Status</p>
                  <p className="text-white">{questionBank.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-400 mb-1">Questions</p>
                  <p className="text-white">{questionBank.numberOfQuestions}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-400 mb-1">Attempts</p>
                  <p className="text-white">{questionBank.numberOfAttempts}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-400 mb-1">Created</p>
                  <p className="text-white">{new Date(questionBank.createdAt).toLocaleDateString()}</p>
                </div>
                {questionBank.description && (
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-zinc-400 mb-1">Description</p>
                    <p className="text-white">{questionBank.description}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Quiz Questions Section */}
        <div className="bg-[#0f0f10] border border-zinc-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Questions ({questionBank?.questions.length || 0})</h2>
            <Button variant="outline" className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]">
              <Plus className="w-4 h-4 mr-2"/>
              Add Question
            </Button>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
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

        {/* Bottom Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]">
            <ChevronLeft className="w-4 h-4 mr-2"/>
            Back
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            <Eye className="w-4 h-4 mr-2"/>
            Preview & Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
