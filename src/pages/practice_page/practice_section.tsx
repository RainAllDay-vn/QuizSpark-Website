import {useEffect, useReducer} from "react";
import type {Practice} from "@/model/Practice.ts";
import {correctMessages, wrongMessages, type EncouragementMessage} from "@/pages/practice_page/EncouragementMessage.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import type { PracticeQuestion } from "@/model/PracticeQuestion";
import SingleAnswerQuestionSection from "./single_answer_question_section";
import MultipleAnswerQuestionSection from "./multiple_answer_question_section";

interface PracticeSectionProps {
  practice: Practice;
  completePractice: (practice: Practice) => void;
}

interface PracticeState {
  questions: PracticeQuestion[];
  currentQuestionIndex: number;
  timeInSeconds: number;
  score: number;
  encouragement: EncouragementMessage | null;
}

export type PracticeAction =
  | { type: "VIEW_QUESTION"; payload: { index: number } }
  | { type: "NEXT_QUESTION" }
  | { type: "ANSWER"; payload: { answer: string[] } }
  | { type: "INCREASE_TIME" };

function practiceReducer(state: PracticeState, action: PracticeAction): PracticeState {
  switch (action.type) {
    case "VIEW_QUESTION":
      return { ...state, currentQuestionIndex: action.payload.index, encouragement: null };
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: 
          Math.min(state.currentQuestionIndex+1, state.questions.length-1),
        encouragement: null,
      };
    case "ANSWER":
      {
        const currentQuestion = state.questions[state.currentQuestionIndex];
        const answer = currentQuestion.answer;
        const userAnswer = action.payload.answer;
        if (currentQuestion.userAnswer) return state;
        const newQuestions = state.questions.map((question) => {
          if (question === currentQuestion) {
            return {
              ...question,
              userAnswer: userAnswer,
            };
          }
          return question;
        });
        let newScore;
        let encouragement;
        if (answer.every((value, index) => value===userAnswer[index])){
          newScore = state.score + 100;
          encouragement = correctMessages[Math.floor(Math.random() * correctMessages.length)];
        } else {
          newScore = state.score;
          encouragement = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
        }
        return {
          ...state,
          questions: newQuestions,
          score: newScore,
          encouragement: encouragement,
        };
      }
    case "INCREASE_TIME":
      return {...state, timeInSeconds: state.timeInSeconds+1};
    default:
      return state;
  }
}

export default function PracticeSection({practice, completePractice}: PracticeSectionProps) {
  practice.score = 0;
  const initialState: PracticeState = {
    questions: practice.questions,
    currentQuestionIndex: 0,
    timeInSeconds: 0,
    score: 0,
    encouragement: null,
  };

  const [state, dispatch] = useReducer(practiceReducer, initialState);
  const {questions, currentQuestionIndex, timeInSeconds, score, encouragement} = state;
  const question = questions[currentQuestionIndex];

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '9') {
        const answerIndex = parseInt(e.key) - 1;
        dispatch({type: "ANSWER", payload: {answer: [answerIndex.toString()]}});
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
      handleCompleteButton();
    }
  }

  const handleCompleteButton = () => {
    completePractice({
      ...practice,
      questions: questions,
      score: score,
      timeInSeconds: timeInSeconds,
    });
  }

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex w-full max-w-6xl gap-6">
      {/* LEFT: Question column */}
      {question.type==="SINGLE_ANSWER" && <SingleAnswerQuestionSection question={question} isLastQuestion={currentQuestionIndex===questions.length-1}
          encouragement={encouragement} dispatch={dispatch} handleNextButton={handleNextButton} handleCompleteButton={handleCompleteButton}/>}
      {question.type==="MULTIPLE_ANSWER" && <MultipleAnswerQuestionSection question={question} isLastQuestion={currentQuestionIndex===questions.length-1}
          encouragement={encouragement} dispatch={dispatch} handleNextButton={handleNextButton} handleCompleteButton={handleCompleteButton}/>}

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