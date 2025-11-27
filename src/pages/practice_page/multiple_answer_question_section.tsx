import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import type {PracticeQuestion} from "@/model/PracticeQuestion";
import type {PracticeAction} from "@/pages/practice_page/practice_section.tsx";
import * as React from "react";
import type {EncouragementMessage} from "@/pages/practice_page/EncouragementMessage.ts";
import {useEffect, useState} from "react";

interface MultipleAnswerQuestionSectionProps {
  question: PracticeQuestion;
  isLastQuestion: boolean;
  encouragement: EncouragementMessage | null;
  dispatch: React.Dispatch<PracticeAction>;
  handleNextButton: () => void;
  handleCompleteButton: () => void;
}

export default function MultipleAnswerQuestionSection({
                                                      question,
                                                      isLastQuestion,
                                                      encouragement,
                                                      dispatch,
                                                      handleNextButton,
                                                      handleCompleteButton
                                                    }: MultipleAnswerQuestionSectionProps) {
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '9') {
        const answerIndex = parseInt(e.key) - 1;
        handleAnswerButton(answerIndex);
      } else if (e.key === 'Enter') {
        if(question.userAnswer) handleNextButton();
        else dispatch({type: "ANSWER", payload: {answer: selected.map(v => v.toString())}})
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, handleNextButton]);

  const answer = question.answer.map(v => parseInt(v));
  const userAnswer = question.userAnswer?.map(v => parseInt(v));

  const handleAnswerButton= (answerIndex: number) => {
    console.log(userAnswer);
    if (userAnswer) return;
    if (selected.includes(answerIndex)) setSelected(selected.filter(v => v!==answerIndex));
    else setSelected([...selected, answerIndex].sort())
  }

  return (
    <div className="flex-grow">
      <Card className="bg-gray-900/60 border border-gray-700 w-full text-white">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
                <span className="bg-purple-500 text-sm px-3 py-1 rounded-full font-medium">
                  100 points
                </span>
          </div>

          <div className="text-lg font-semibold whitespace-pre-wrap">{question.description}</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {question.choices.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerButton(index)}
                disabled={question.userAnswer !== undefined} // prevent further clicks
                className={`border border-gray-700 rounded-xl px-4 py-3 text-left transition-all duration-150 hover:border-purple-400 ${
                  userAnswer === undefined
                    ? ""
                    : answer.includes(index)
                      ? "bg-green-500 text-white border-green-600" // correct answer
                      : userAnswer.includes(index)
                        ? "bg-red-500 text-white border-red-600" // wrong selection
                        : "" // other buttons stay default
                } ${selected.includes(index) ? "border-purple-400" : ""}`}
              ><span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>{" "}{option}
              </button>
            ))}
          </div>

          {/* Encouragement Message */}
          {encouragement && (
            <div className={`mt-4 p-3 rounded-lg text-center font-medium ${
              question.userAnswer === question.answer
                ? "bg-green-500/20 border border-green-500/30 text-green-300"
                : "bg-orange-500/20 border border-orange-500/30 text-orange-300"
            }`}>
              <span className="text-2xl mr-2">{encouragement.emoji}</span>
              {encouragement.message}
              <span className="text-2xl ml-2">{encouragement.emoji}</span>
            </div>
          )}

          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline" onClick={handleCompleteButton}
              className="border-gray-600 text-gray-300"
            >
              End Early
            </Button>
            {userAnswer===undefined && <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6" 
                onClick={() => dispatch({type: "ANSWER", payload: {answer: selected.map(v => v.toString())}})}>
              Submit answers
            </Button>}
            {userAnswer!==undefined && <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6" onClick={handleNextButton}>
              {isLastQuestion ? "Finish →" : "Next →"}
            </Button>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}