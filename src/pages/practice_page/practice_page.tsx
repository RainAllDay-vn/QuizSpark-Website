import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionBank, logQuestionAnswer } from '@/lib/api.ts';
import type { Question } from '@/model/Question.ts';
import useAuthStatus from '@/lib/use_auth_hook.ts';
import PracticeResults from './practice_result';
import { PracticeStats } from './practice_stat_prop';
import { QuestionCard } from './question_card';
import { type EncouragementMessage,getEncouragementMessage } from './practice_page_quote';




// ========== MAIN PAGE ==========
export default function PracticePage() {
  const { bankId } = useParams<{ bankId: string }>();
  const { user } = useAuthStatus();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [question, setQuestion] = useState<Question>({} as Question);
  const [isFinished, setIsFinished] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [encouragement, setEncouragement] = useState<EncouragementMessage | null>(null);
  const [showNext, setShowNext] = useState(false);

  const handleAnswerButton = useCallback(async (answer: number) => {
  if (selected === -1 && answer < question.choices.length) {
    const isCorrect = answer === question.answer;

    setEncouragement(getEncouragementMessage(isCorrect));

    if (isCorrect) {
      setScore(prev => prev + 100);
    }

    setSelected(answer);
    setShowNext(true);

    if (user) await logQuestionAnswer(question.id, answer);
  }
}, [selected, question, user]);


  const handleNextButton = useCallback(() => {
    if (currentQuestionIndex + 1 >= questions.length) {
      setIsFinished(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestion(questions[currentQuestionIndex + 1]);
      setSelected(-1);
      setEncouragement(null);
      setShowNext(false);
    }
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (!bankId) {
      alert("This page doesn't exist");
      navigate("/home");
      return;
    }
    getQuestionBank(bankId).then(bank => {
      if (bank.questions.length === 0) {
        alert("This question bank is empty");
        navigate("/home");
        return;
      }
      setQuestions(bank.questions);
      setQuestion(bank.questions[0]);
    });
  }, [bankId]);

  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => setSeconds(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [isFinished]);

  if (questions.length === 0) return <div className="min-h-screen w-screen bg-black text-white flex items-center justify-center">LOADING</div>;

  if (isFinished) {
    return (
      <PracticeResults
        score={score}
        questions={questions}
        seconds={seconds}
        onRetry={() => window.location.reload()}
        onBack={() => user ? navigate("/home") : navigate("/")}
      />
    );
  }

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="flex justify-between items-center w-full max-w-6xl mb-6 relative z-10">
        <Button onClick={() => user ? navigate("/home") : navigate('/')} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
          ← Back to Home
        </Button>
        <h1 className="text-xl font-semibold">PRACTICE</h1>
        <div className="w-36"></div>
      </div>

      <div className="grow"></div>
      <div className="flex w-full max-w-6xl gap-6">
        {/* Left: Question */}
        <div className="flex-grow">
          <QuestionCard
            question={question}
            selected={selected}
            onAnswer={handleAnswerButton}
            onNext={handleNextButton}
            encouragement={encouragement}
            showNext={showNext}
          />
        </div>

        {/* Right: Stats */}
        <div className="w-64 flex flex-col items-stretch gap-4">
          <PracticeStats
            score={score}
            current={currentQuestionIndex + 1}
            total={questions.length}
            seconds={seconds}
          />
          <Button
            onClick={() => setIsFinished(true)}
            className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-6" 
          >
            End Early
          </Button>
        </div>
      </div>
      <div className="grow"></div>
    </div>
  );
}
