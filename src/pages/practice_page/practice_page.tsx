import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {useParams} from "react-router-dom";
import {getQuestions} from "@/lib/api.ts";
import type {Question} from "@/model/Question.ts";

export default function PracticePage() {
  const {bankId} = useParams<{ bankId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selected, setSelected] = useState(-1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    getQuestions(bankId)
      .then(questions => {
        setQuestions(questions);
      })
  }, [bankId]);

  if (questions.length === 0) {
    return <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center p-6">
      <h1>LOADING</h1>
    </div>
  }

  const question = questions[currentQuestionIndex];

  function handleAnswerButton(answer: number) {
    if (selected === -1) {
      if (answer === question.answer) setScore(score + 100);
      setSelected(answer);
    }
  }

  function handleNextButton() {
    setCurrentQuestionIndex(Math.min(currentQuestionIndex+1, questions.length - 1));
    setSelected(-1);
  }

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center p-6">
      {/* === Header === */}
      <h1 className="text-xl font-semibold mb-6">PRACTICE</h1>

      {/* === Main content (Question + Stats) === */}
      <div className="grow"></div>
      <div className="flex w-full max-w-6xl gap-6">
        {/* LEFT: Question column */}
        <div className="flex-grow">
          <Card className="bg-gray-900/60 border border-gray-700 w-full text-white">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-purple-500 text-sm px-3 py-1 rounded-full font-medium">
                  100 points
                </span>
              </div>

              <div className="text-lg font-semibold">{question.description}</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {question.choices.map((option,index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerButton(index)}
                    disabled={selected !== -1} // prevent further clicks
                    className={`border border-gray-700 rounded-xl px-4 py-3 text-left transition-all duration-150 hover:border-purple-400 ${
                      selected === -1
                        ? ""
                        : index === question.answer
                          ? "bg-green-500 text-white border-green-600" // correct answer
                          : index === selected
                            ? "bg-red-500 text-white border-red-600" // wrong selection
                            : "" // other buttons stay default
                    }`}
                  ><span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>{" "}{option}
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300"
                >
                  Skip
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6" onClick={handleNextButton}>
                  Next Question →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: Quiz Stats column */}
        <div className="w-64">
          <Card className="bg-gray-900/60 border border-gray-700 text-white">
            <CardContent className="p-4 space-y-4">
              <h2 className="text-lg font-semibold text-gray-200">
                Quiz Stats
              </h2>
              <div className="space-y-3 text-gray-300 text-sm">
                <div className="flex justify-between">
                  <span>Score</span>
                  <span>{score}</span>
                </div>
                <div className="flex justify-between">
                  <span>Progress</span>
                  <span>{currentQuestionIndex+1}/{questions.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grow"></div>
    </div>
  );
}