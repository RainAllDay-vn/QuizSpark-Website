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

interface PracticeSectionProps {
  practice: Practice;
  completePractice: () => void;
}

export interface QuestionSectionProps {
  state: PracticeState;
  handleSubmitAnswer: (answer: string[]) => void;
  handleNextQuestion: () => void;
  handleCompletePractice: () => void;
}

export interface PracticeState {
  questions: PracticeQuestion[];
  currentQuestionIndex: number;
  timeInSeconds: number;
  encouragement: EncouragementMessage | null;
  loading: boolean;
}

export type PracticeAction =
  | { type: "VIEW_QUESTION"; payload: { index: number } }
  | { type: "NEXT_QUESTION" }
  | { type: "ANSWER" }
  | { type: "SHOW_RESULT"; payload: { userAnswer: string[], response: PracticeAnswerResponseDTO|null } }
  | { type: "INCREASE_TIME" };

function practiceReducer(state: PracticeState, action: PracticeAction): PracticeState {
  switch (action.type) {
    case "VIEW_QUESTION":
      return { ...state, currentQuestionIndex: action.payload.index, encouragement: null };
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex:
          Math.min(state.currentQuestionIndex + 1, state.questions.length - 1),
        encouragement: null,
      };
    case "ANSWER":
      return { ...state, loading: true }
    case "SHOW_RESULT": {
      console.log(action.payload.response);
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const userAnswer = action.payload.userAnswer;
      const correctAnswer = action.payload.response ? action.payload.response.correctAnswer : null;
      const comments = action.payload.response ? action.payload.response.questionComments : null;
      const newQuestions = state.questions.map((question) => {
        if (question === currentQuestion) {
          return {
            ...question,
            userAnswer: userAnswer,
            correctAnswer: correctAnswer,
            comments: comments,
          } as PracticeQuestion;
        }
        return question;
      });
      if (correctAnswer === null) return { ...state, questions: newQuestions }
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
      };
    }
    case "INCREASE_TIME": {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const newQuestions = state.questions.map((question) => {
        if (question === currentQuestion) {
          return {
            ...question,
            secondsToAnswer: (currentQuestion?.secondsToAnswer || 0) + 1,
          };
        }
        return question;
      });
      return { ...state, questions: newQuestions, timeInSeconds: state.timeInSeconds + 1 };
    }
    default:
      return state;
  }
}

export default function PracticeSection({ practice, completePractice }: PracticeSectionProps) {
  const initialState: PracticeState = {
    questions: practice.questions,
    currentQuestionIndex: 0,
    timeInSeconds: 0,
    encouragement: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(practiceReducer, initialState);
  const { questions, currentQuestionIndex, timeInSeconds } = state;
  const question = questions[currentQuestionIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "INCREASE_TIME" });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmitAnswer = async (userAnswer: string[]) => {
    dispatch({ type: "ANSWER" });
    const response = await answer(practice.id, { index: currentQuestionIndex, answer: userAnswer, secondsToAnswer: question.secondsToAnswer || 0 })
    dispatch({ type: "SHOW_RESULT", payload: { userAnswer: userAnswer, response: response } });
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < practice.questions.length - 1) dispatch({ type: "NEXT_QUESTION" });
  }

  const handleCompletePractice = () => {
    completePractice();
  }

  const handleQuestionNavigation = (index: number) => {
    dispatch({ type: "VIEW_QUESTION", payload: { index } });
  }

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT: Question column */}
      <div className="lg:col-span-2">
        {question.type === "SINGLE_ANSWER" && <SingleAnswerQuestionSection state={state} handleSubmitAnswer={handleSubmitAnswer}
          handleNextQuestion={handleNextQuestion} handleCompletePractice={handleCompletePractice} />}
        {question.type === "MULTIPLE_ANSWER" && <MultipleAnswerQuestionSection state={state} handleSubmitAnswer={handleSubmitAnswer}
          handleNextQuestion={handleNextQuestion} handleCompletePractice={handleCompletePractice} />}
      </div>

      {/* RIGHT: Practice Stats column */}
      <div className="lg:col-span-1">
        <Card className="bg-gray-900/60 border border-gray-700 text-white">
          <CardContent className="p-4 space-y-4">
            <h2 className="text-lg font-semibold text-gray-200">
              Practice Stats
            </h2>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex justify-between">
                <span>Progress</span>
                <span>{currentQuestionIndex + 1}/{practice.questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span>{formatTime(timeInSeconds)}</span>
              </div>
            </div>

            {/* Question Navigation Grid */}
            <div className="pt-3 border-t border-gray-700">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Navigate to Question</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((question, index) => {
                  const isCurrentQuestion = index === currentQuestionIndex;
                  const hasAnswer = question.userAnswer !== undefined;

                  return (
                    <button
                      key={index}
                      onClick={() => handleQuestionNavigation(index)}
                      className={`
                        w-10 h-10 text-xs font-medium rounded transition-all duration-200
                        ${isCurrentQuestion
                          ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                          : hasAnswer
                            ? 'bg-green-600/20 text-green-400 border border-green-600/30 hover:bg-green-600/30'
                            : 'bg-gray-700/50 text-gray-400 border border-gray-600/30 hover:bg-gray-700'
                        }
                      `}
                    >
                      {index + 1}
                    </button>
                  );
                })}
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