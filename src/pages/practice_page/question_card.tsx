import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Question } from '@/model/Question.ts';
import type { EncouragementMessage } from './practice_page_quote';


// ========== COMPONENTS ==========
interface QuestionCardProps {
  question: Question;
  selected: number;
  onAnswer: (answer: number) => void;
  onNext: () => void;
  encouragement: EncouragementMessage | null;
  showNext: boolean;
}

export function QuestionCard({ question, selected, onAnswer, onNext, encouragement, showNext }: QuestionCardProps) {
  return (
    <Card className="bg-gray-900/60 border border-gray-700 w-full text-white">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="bg-purple-500 text-sm px-3 py-1 rounded-full font-medium">
            100 points
          </span>
        </div>
        <div className="text-lg font-semibold">{question.description}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {question.choices.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              disabled={selected !== -1}
              className={`border border-gray-700 rounded-xl px-4 py-3 text-left transition-all duration-150 hover:border-purple-400 ${
                selected === -1
                  ? ''
                  : index === question.answer
                  ? 'bg-green-500 text-white border-green-600'
                  : index === selected
                  ? 'bg-red-500 text-white border-red-600'
                  : ''
              }`}
            >
              <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          ))}
        </div>
        {encouragement && (
          <div
            className={`mt-4 p-3 rounded-lg text-center font-medium ${
              selected === question.answer
                ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                : 'bg-orange-500/20 border border-orange-500/30 text-orange-300'
            }`}
          >
            {encouragement.message}
            <img src={encouragement.imageUrl} alt="Encouragement" className="mx-auto mt-2 rounded-lg max-h-32 object-contain" />
          </div>
        )}
        <div className="flex justify-end mt-6">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6" onClick={onNext}>
            {showNext ? 'Next →' : 'Skip →'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}