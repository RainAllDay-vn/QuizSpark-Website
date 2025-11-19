import {useEffect, useReducer} from "react";
import type {Practice} from "@/model/Practice.ts";
import {correctMessages, type EncouragementMessage, wrongMessages} from "@/pages/practice_page/EncouragementMessage.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

interface PracticeSectionProps {
  practiceProp: Practice;
  completePractice: (practice: Practice) => void;
}

interface PracticeState {
  practice: Practice;
  currentQuestionIndex: number;
  timeInSeconds: number;
  encouragement: EncouragementMessage | null;
}

type PracticeAction =
  | { type: "VIEW_QUESTION"; payload: { index: number } }
  | { type: "NEXT_QUESTION" }
  | { type: "ANSWER"; payload: { answer: number } }
  | { type: "INCREASE_TIME" };

function practiceReducer(state: PracticeState, action: PracticeAction): PracticeState {
  switch (action.type) {
    case "VIEW_QUESTION":
      return { ...state, currentQuestionIndex: action.payload.index, encouragement: null };
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: 
          Math.min(state.currentQuestionIndex+1, state.practice.questions.length-1),
        encouragement: null,
      };
    case "ANSWER":
      {
        const currentQuestion = state.practice.questions[state.currentQuestionIndex];
        const newQuestions = state.practice.questions.map((question) => {
          if (question === currentQuestion) {
            return {
              ...question,
              userAnswer: action.payload.answer,
            };
          }
          return question;
        });
        let newScore;
        let encouragement;
        if (currentQuestion.answer === action.payload.answer){
          newScore = state.practice.score + 100;
          encouragement = correctMessages[Math.floor(Math.random() * correctMessages.length)];
        } else {
          newScore = state.practice.score;
          encouragement = wrongMessages[Math.floor(Math.random() * correctMessages.length)];
        }
        return {
          ...state,
          practice: {
            ...state.practice,
            questions: newQuestions,
            score: newScore,
          },
          encouragement: encouragement,
        };
      }
    case "INCREASE_TIME":
      return {...state, timeInSeconds: state.timeInSeconds+1};
    default:
      return state;
  }
}

export default function PracticeSection({practiceProp, completePractice}: PracticeSectionProps) {
  practiceProp.score = 0;
  const initialState: PracticeState = {
    practice: practiceProp,
    currentQuestionIndex: 0,
    timeInSeconds: 0,
    encouragement: null,
  };

  const [state, dispatch] = useReducer(practiceReducer, initialState);
  const {practice, currentQuestionIndex, timeInSeconds, encouragement} = state;
  const question = practice.questions[currentQuestionIndex];

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '4') {
        const answerIndex = parseInt(e.key) - 1;
        dispatch({type: "ANSWER", payload: {answer: answerIndex}});
      } else if (e.key === 'Enter') {
        dispatch({type: "NEXT_QUESTION"});
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({type: "INCREASE_TIME"});
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNextButton = () => {
    if (currentQuestionIndex < practice.questions.length - 1) dispatch({type: "NEXT_QUESTION"});
    else {
      practice.timeInSeconds = timeInSeconds;
      completePractice(practice);
    }
  }

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
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
              {question.choices.map((option, index) => (
                <button
                  key={index}
                  onClick={() => dispatch({type: "ANSWER", payload: {answer: index}})}
                  disabled={question.userAnswer !== undefined} // prevent further clicks
                  className={`border border-gray-700 rounded-xl px-4 py-3 text-left transition-all duration-150 hover:border-purple-400 ${
                    question.userAnswer === undefined
                      ? ""
                      : index === question.answer
                        ? "bg-green-500 text-white border-green-600" // correct answer
                        : index === question.userAnswer
                          ? "bg-red-500 text-white border-red-600" // wrong selection
                          : "" // other buttons stay default
                  }`}
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
                variant="outline" onClick={() => completePractice(state.practice)}
                className="border-gray-600 text-gray-300"
              >
                End Early
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6" onClick={handleNextButton}>
                {currentQuestionIndex === practice.questions.length - 1 ? "Finish →" : "Next →"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT: Practice Stats column */}
      <div className="w-64">
        <Card className="bg-gray-900/60 border border-gray-700 text-white">
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold text-gray-200">
              Practice Stats
            </h2>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex justify-between">
                <span>Score</span>
                <span>{practice.score}</span>
              </div>
              <div className="flex justify-between">
                <span>Progress</span>
                <span>{currentQuestionIndex + 1}/{practice.questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span>{formatTime(timeInSeconds)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}