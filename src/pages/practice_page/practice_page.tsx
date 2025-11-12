import {useCallback, useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {useParams, useNavigate} from "react-router-dom";
import {getQuestions, logQuestionAnswer} from "@/lib/api.ts";
import type {Question} from "@/model/Question.ts";
import useAuthStatus from "@/lib/use_auth_hook.ts";

interface EncouragementMessage {
  message: string;
  emoji: string;
}

const correctMessages: EncouragementMessage[] = [
  { message: "Excellent! You got it right!", emoji: "🎉" },
  { message: "Perfect! Well done!", emoji: "🌟" },
  { message: "Awesome! Keep it up!", emoji: "🎊" },
  { message: "Brilliant! You nailed it!", emoji: "✨" },
  { message: "Fantastic! Great job!", emoji: "🏆" }
];

const wrongMessages: EncouragementMessage[] = [
  { message: "Not quite, but keep trying!", emoji: "💪" },
  { message: "Almost there! Don't give up!", emoji: "🌈" },
  { message: "Learning opportunity! Try again!", emoji: "📚" },
  { message: "Mistakes help us grow! Keep going!", emoji: "🌱" },
  { message: "Every attempt is progress!", emoji: "💡" }
];

export default function PracticePage() {
  const {bankId} = useParams<{ bankId: string }>();
  const {user} = useAuthStatus();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [question, setQuestion] = useState({} as Question);
  const [isFinished, setIsFinished] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [encouragement, setEncouragement] = useState<EncouragementMessage | null>(null);

  const handleAnswerButton = useCallback(async (answer: number) => {
    if (selected === -1 && answer < question.choices.length) {
      const isCorrect = answer === question.answer;
      if (isCorrect) {
        setScore(score + 100);
        setEncouragement(correctMessages[Math.floor(Math.random() * correctMessages.length)]);
      } else {
        setEncouragement(wrongMessages[Math.floor(Math.random() * wrongMessages.length)])
      }
      setSelected(answer);
      if(user) await logQuestionAnswer(question.id, answer);
    }
  }, [selected, question, user, score]);

  const handleNextButton = useCallback(() => {
    setCurrentQuestionIndex(Math.min(currentQuestionIndex+1, questions.length));
    setQuestion(questions[currentQuestionIndex])
    setIsFinished(currentQuestionIndex+1 === questions.length);
    setSelected(-1);
    setEncouragement(null);
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    getQuestions(bankId)
      .then(questions => {
        setQuestions(questions);
        setQuestion(questions[currentQuestionIndex]);
      })
  }, [bankId]);

  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished]);

  useEffect(() => {
    if (isFinished) return;
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '4') {
        const answerIndex = parseInt(e.key) - 1;
        await handleAnswerButton(answerIndex);
      } else if (e.key === 'Enter') {
        handleNextButton();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAnswerButton, handleNextButton, isFinished]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (questions.length === 0) {
    return <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center p-6">
      <h1>LOADING</h1>
    </div>
  }

  // Show statistics page when all questions are answered
  if (isFinished) {
    const correctAnswers = score / 100; // Each correct answer is worth 100 points
    const totalQuestions = questions.length;
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    
    return (
      <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center p-6 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* === Header === */}
        <div className="flex justify-center items-center w-full max-w-6xl mb-6 relative z-10">
          <h1 className="text-xl font-semibold">QUIZ RESULTS</h1>
        </div>

        {/* === Main content (Statistics) === */}
        <div className="grow"></div>
        <div className="w-full max-w-2xl">
          <Card className="bg-gray-900/60 border border-gray-700 text-white">
            <CardContent className="p-8 space-y-6 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-6">Quiz Completed!</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-400">{score}</div>
                  <div className="text-sm text-gray-400">Total Score</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">{accuracy}%</div>
                  <div className="text-sm text-gray-400">Accuracy</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400">{formatTime(seconds)}</div>
                  <div className="text-sm text-gray-400">Time Taken</div>
                </div>
              </div>
              
              <div className="text-lg mb-6">
                You answered <span className="font-bold text-green-400">{correctAnswers}</span> out of <span className="font-bold">{totalQuestions}</span> questions correctly!
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                >
                  Practice More
                </Button>
                <Button
                  onClick={() => user ? navigate("/home") : navigate('/')}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grow"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* === Header === */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-6 relative z-10">
        <Button 
          onClick={() => user ? navigate("/home") : navigate('/')}
          variant="outline" 
          className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          ← Back to Home
        </Button>
        <h1 className="text-xl font-semibold">PRACTICE</h1>
        <div className="w-36"></div> {/* Spacer to center the title */}
      </div>

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

              {/* Encouragement Message */}
              {encouragement && (
                <div className={`mt-4 p-3 rounded-lg text-center font-medium ${
                  selected === question.answer 
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
                  variant="outline" onClick={() => setIsFinished(true)}
                  className="border-gray-600 text-gray-300"
                >
                  End Early
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6" onClick={handleNextButton}>
                  Skip →
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
                <div className="flex justify-between">
                  <span>Time</span>
                  <span>{formatTime(seconds)}</span>
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