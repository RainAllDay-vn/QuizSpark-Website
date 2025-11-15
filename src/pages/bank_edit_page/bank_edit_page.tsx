import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Save, Eye, ChevronLeft, Edit, Trash2, Check } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

// Sample question data
const sampleQuestions = [
  {
    id: 1,
    question: "Which of the following is NOT a renewable energy source?",
    options: ["Solar Power", "Wind Power", "Natural Gas", "Hydroelectric Power"],
    correctAnswer: "natural-gas"
  },
  {
    id: 2,
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "jupiter"
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: "leonardo"
  }
];

export default function BankEditPage() {
  const {bankId} = useParams<{ bankId: string }>();
  const [questions, setQuestions] = useState(sampleQuestions);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingQuestion, setEditingQuestion] = useState("");

  const handleEdit = (id: number, questionText: string) => {
    setEditingId(id);
    setEditingQuestion(questionText);
  };

  const handleSave = (id: number) => {
    setQuestions(questions.map(q =>
      q.id === id ? { ...q, question: editingQuestion } : q
    ));
    setEditingId(null);
    setEditingQuestion("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingQuestion("");
  };

  const handleDelete = (id: number) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

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
        {/* Quiz Questions Section */}
        <div className="bg-[#0f0f10] border border-zinc-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Questions ({questions.length})</h2>
            <Button variant="outline" className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]">
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={q.id} className="bg-[#151518] border border-zinc-800 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium text-violet-400 mr-3">#{index + 1}</span>
                      {editingId === q.id ? (
                        <Input
                          value={editingQuestion}
                          onChange={(e) => setEditingQuestion(e.target.value)}
                          className="bg-[#0f0f10] border border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-600"
                        />
                      ) : (
                        <h3 className="text-lg font-medium text-white">{q.question}</h3>
                      )}
                    </div>
                    
                    {/* Answer Options */}
                    <div className="mt-3 space-y-2">
                      {q.options.map((option, optionIndex) => {
                        const isCorrect = q.correctAnswer === option.toLowerCase().replace(/\s+/g, '-');
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
                              {isCorrect && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-zinc-200">{option}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-2 ml-4">
                    {editingId === q.id ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-600 text-green-400 bg-[#151518] hover:bg-green-900/20"
                          onClick={() => handleSave(q.id)}
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-zinc-700 text-zinc-300 bg-[#151518] hover:bg-[#1a1a1c]"
                          onClick={handleCancel}
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
                          onClick={() => handleEdit(q.id, q.question)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-400 bg-[#151518] hover:bg-red-900/20"
                          onClick={() => handleDelete(q.id)}
                        >
                          <Trash2 className="w-4 h-4" />
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
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            <Eye className="w-4 h-4 mr-2" />
            Preview & Publish
          </Button>
        </div>
      </div>
    </div>
  );
}