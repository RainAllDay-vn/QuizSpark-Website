import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Question } from "@/model/Question";
import { scoreResults } from "./practice_page_quote";
import { getResultReportQuote } from "./score_report_system";

interface PracticeResultsProps {
  score: number;
  questions: Question[];
  seconds: number;
  onRetry: () => void;
  onBack: () => void;
}


function PracticeResults({ score, questions, seconds, onRetry, onBack }: PracticeResultsProps) {
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const correctAnswers = score / 100;
  const totalQuestions = questions.length;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  // Select the appropriate result based on accuracy
  const result = scoreResults.find(r => accuracy >= r.minAccuracy)?.info || scoreResults[scoreResults.length - 1].info;

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="flex justify-center items-center w-full max-w-6xl mb-6 relative z-10">
        <h1 className="text-xl font-semibold">PRACTICE RESULTS</h1>
      </div>

      <div className="grow"></div>
      <div className="w-full max-w-2xl">
        <Card className="bg-gray-900/60 border border-gray-700 text-white">
          <CardContent className="p-8 space-y-6 text-center">
            <h2 className="text-3xl font-bold mb-6">{result.message}</h2>

            {result.imageUrl && (
              <div className="mb-6">
                <img src={result.imageUrl} alt="Result" className="mx-auto rounded-lg max-h-48 object-contain" />
              </div>
            )}

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
              {getResultReportQuote(correctAnswers, totalQuestions)}
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={onRetry} className="bg-purple-600 hover:bg-purple-700 text-white px-6">
                Practice More
              </Button>
              <Button onClick={onBack} variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
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

export default PracticeResults;
