
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import type {Question} from '@/model/Question';
import {Plus, Trash2, Check, Save} from 'lucide-react';

interface QuestionEditorProps {
  editingQuestion: Question;
  validationErrors: Record<string, string>;
  handleQuestionTypeChange: (value: string) => void;
  handleQuestionDescriptionChange: (value: string) => void;
  handleChoiceChange: (index: number, value: string) => void;
  handleAnswerChange: (index: number) => void;
  handleAddChoice: () => void;
  handleRemoveChoice: (index: number) => void;
  handleSaveQuestion?: () => void;
  handleCancelQuestion?: () => void;
  isNewQuestion?: boolean;
}

export default function QuestionEditor({
  editingQuestion,
  validationErrors,
  handleQuestionTypeChange,
  handleQuestionDescriptionChange,
  handleChoiceChange,
  handleAnswerChange,
  handleAddChoice,
  handleRemoveChoice,
  handleSaveQuestion,
  handleCancelQuestion,
  isNewQuestion = false
}: QuestionEditorProps) {
  return (
    <div className="bg-[#151518] border border-zinc-800 rounded-lg p-4">
      <span className="text-sm font-medium text-violet-400 mr-3">{isNewQuestion ? '#New' : '#Edit'}</span>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className="w-full">
              <div className="mb-3">
                <label className="text-sm text-zinc-400 mb-1 block">Question Type:</label>
                <Select value={editingQuestion.questionType} onValueChange={handleQuestionTypeChange}>
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
              <Input
                value={editingQuestion.description}
                onChange={(e) => handleQuestionDescriptionChange(e.target.value)}
                className={`bg-[#0f0f10] border text-white placeholder:text-zinc-500 focus-visible:ring-violet-600 mb-3 ${
                  validationErrors.description ? 'border-red-500' : 'border-zinc-700'
                }`}
                placeholder="Question text"
              />
              <div className="space-y-2">
                <p className="text-sm text-zinc-400 mb-2">Answer Options:</p>
                {editingQuestion.choices.map((choice, choiceIndex) => (
                  <div key={choiceIndex} className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                        editingQuestion.answer.includes(choiceIndex.toString()) ? 'border-green-500 bg-green-500' : 'border-zinc-600'
                      }`} onClick={() => handleAnswerChange(choiceIndex)}>
                      {editingQuestion.answer.includes(choiceIndex.toString()) && <Check className="w-3 h-3 text-white"/>}
                    </div>
                    <Input
                      value={choice}
                      onChange={(e) => handleChoiceChange(choiceIndex, e.target.value)}
                      className={`bg-[#0f0f10] border text-white placeholder:text-zinc-500 focus-visible:ring-violet-600 flex-1 ${
                        validationErrors.choices ? 'border-red-500' : 'border-zinc-700'
                      }`}
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
        {handleSaveQuestion && handleCancelQuestion && (
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
        )}
      </div>
    </div>
  );
}
