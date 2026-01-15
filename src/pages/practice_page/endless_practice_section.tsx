import { useEffect, useReducer } from "react";
import type { Practice } from "@/model/Practice.ts";
import { correctMessages, wrongMessages, type EncouragementMessage } from "@/pages/practice_page/EncouragementMessage.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import type { PracticeQuestion } from "@/model/PracticeQuestion";
import SingleAnswerQuestionSection from "./single_answer_question_section";
import MultipleAnswerQuestionSection from "./multiple_answer_question_section";
import { answer } from "@/lib/api";
import CommentSection from "@/pages/practice_page/comment_section.tsx";
import type PracticeAnswerResponseDTO from "@/dtos/PracticeAnswerResponseDTO.ts";
import { Button } from "@/components/ui/button";
import { SkipForward, Trash2 } from "lucide-react";

interface EndlessPracticeSectionProps {
  practice: Practice;
}

export interface QuestionSectionProps {
  state: PracticeState;
  handleSubmitAnswer: (answer: string[]) => void;
  handleNextQuestion: () => void;
  handleCompletePractice: () => void;
}

export interface PracticeState {
  questions: PracticeQuestion[]; // This is the active queue
  timeInSeconds: number;
  encouragement: EncouragementMessage | null;
  loading: boolean;
  currentQuestionIndex: number; // For compatibility, always 0
}

export type PracticeAction =
  | { type: "NEXT_QUESTION" }
  | { type: "SKIP_QUESTION" }
  | { type: "DISCARD_QUESTION" }
  | { type: "ANSWER" }
  | { type: "SHOW_RESULT"; payload: { userAnswer: string[], response: PracticeAnswerResponseDTO|null } }
  | { type: "INCREASE_TIME" };

function practiceReducer(state: PracticeState, action: PracticeAction): PracticeState {
  switch (action.type) {
    case "NEXT_QUESTION":
      // Remove the current question from the queue
      return {
        ...state,
        questions: state.questions.slice(1),
        encouragement: null,
      };
    case "SKIP_QUESTION":
      if (state.questions.length <= 1) return { ...state, encouragement: null };
      // Move the current question to the end of the queue
      return {
        ...state,
        questions: [...state.questions.slice(1), state.questions[0]],
        encouragement: null,
      };
    case "DISCARD_QUESTION":
      // Remove the current question entirely
      return {
        ...state,
        questions: state.questions.slice(1),
        encouragement: null,
      };
    case "ANSWER":
      return { ...state, loading: true }
    case "SHOW_RESULT": {
      if (state.questions.length === 0) return state;
      const currentQuestion = state.questions[0];
      const userAnswer = action.payload.userAnswer;
      const correctAnswer = action.payload.response ? action.payload.response.correctAnswer : null;
      const comments = action.payload.response ? action.payload.response.questionComments : null;
      
      const updatedQuestion = {
        ...currentQuestion,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        comments: comments,
      } as PracticeQuestion;

      const newQuestions = [updatedQuestion, ...state.questions.slice(1)];

      if (correctAnswer === null) return { ...state, questions: newQuestions, loading: false }
      
      let encouragement;
      if (correctAnswer.every((value, index) => value === userAnswer[index])) {
        encouragement = correctMessages[Math.floor(Math.random() * correctMessages.length)];
      } else {
        encouragement = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
      }
      return {
        ...state,
        questions: newQuestions,
        encouragement: encouragement,
        loading: false,
      };
    }
    case "INCREASE_TIME": {
      if (state.questions.length === 0) return { ...state, timeInSeconds: state.timeInSeconds + 1 };
      const currentQuestion = state.questions[0];
      const newQuestions = [
        {
          ...currentQuestion,
          secondsToAnswer: (currentQuestion?.secondsToAnswer || 0) + 1,
        },
        ...state.questions.slice(1)
      ];
      return { ...state, questions: newQuestions, timeInSeconds: state.timeInSeconds + 1 };
    }
    default:
      return state;
  }
}

export default function EndlessPracticeSection({ practice }: EndlessPracticeSectionProps) {
  const initialState: PracticeState = {
    questions: [...practice.questions],
    timeInSeconds: 0,
    encouragement: null,
    loading: false,
    currentQuestionIndex: 0,
  };

  const [state, dispatch] = useReducer(practiceReducer, initialState);
  const { questions, timeInSeconds } = state;
  const question = questions[0];

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "INCREASE_TIME" });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmitAnswer = async (userAnswer: string[]) => {
    if (!question) return;
    dispatch({ type: "ANSWER" });
    const response = await answer(practice.id, { 
      index: 0, 
      answer: userAnswer, 
      secondsToAnswer: question.secondsToAnswer || 0 
    });
    dispatch({ type: "SHOW_RESULT", payload: { userAnswer: userAnswer, response: response } });
  }

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  }

  const handleSkipQuestion = () => {
    dispatch({ type: "SKIP_QUESTION" });
  }

  const handleDiscardQuestion = () => {
    dispatch({ type: "DISCARD_QUESTION" });
  }

  const handleCompletePractice = () => {
    window.history.back();
  }

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (questions.length === 0) {
    return (
      <Card className="bg-gray-900/60 border border-gray-700 p-12 text-center text-white space-y-6">
        <h2 className="text-2xl font-bold">Queue Empty!</h2>
        <p className="text-gray-400">You've completed or discarded all available questions.</p>
        <Button onClick={handleCompletePractice} className="bg-blue-600 hover:bg-blue-700">
          Back to Overview
        </Button>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT: Question column */}
      <div className="lg:col-span-2">
        {question.type === "SINGLE_ANSWER" && <SingleAnswerQuestionSection state={state} handleSubmitAnswer={handleSubmitAnswer}
          handleNextQuestion={handleNextQuestion} handleCompletePractice={handleCompletePractice} />}
        {question.type === "MULTIPLE_ANSWER" && <MultipleAnswerQuestionSection state={state} handleSubmitAnswer={handleSubmitAnswer}
          handleNextQuestion={handleNextQuestion} handleCompletePractice={handleCompletePractice} />}
      </div>

      {/* RIGHT: Practice Stats & Controls column */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="bg-gray-900/60 border border-gray-700 text-white">
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold text-gray-200">
              Endless Stats
            </h2>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex justify-between">
                <span>Remaining in Queue</span>
                <span className="text-blue-400 font-bold">{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Time</span>
                <span>{formatTime(timeInSeconds)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700 space-y-3">
              <h3 className="text-sm font-medium text-gray-400">Queue Controls</h3>
              <div className="flex gap-2">
                <Button 
                  onClick={handleSkipQuestion}
                  variant="outline"
                  className="flex-1 border-gray-600 text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300"
                  title="Move to the end of the queue"
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  Skip
                </Button>
                <Button 
                  onClick={handleDiscardQuestion}
                  variant="outline"
                  className="flex-1 border-gray-600 text-red-400 hover:bg-red-400/10 hover:text-red-300"
                  title="Remove from practice entirely"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Discard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* BOTTOM: Comment Section - shown after answering */}
      {question.userAnswer!==undefined && (
        <div className="lg:col-span-3 w-full">
          <CommentSection
            question={question}
            isVisible={true}
          />
        </div>
      )}
    </div>
  )
}
