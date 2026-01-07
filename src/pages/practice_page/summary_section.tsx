import type { Practice } from "@/model/Practice.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import useAuthStatus from "@/lib/use_auth_hook.ts";
import { useNavigate } from "react-router-dom";

import { duplicatePractice } from "@/lib/api.ts";
import { useState } from "react";

interface SummarySectionProps {
  practice: Practice;
}

export default function SummarySection({ practice }: SummarySectionProps) {
  const navigate = useNavigate();
  const { user } = useAuthStatus();
  const [isDuplicating, setIsDuplicating] = useState(false);

  let correctAnswers = 0;
  practice.questions.forEach((question) => {
    const userAnswer = question.userAnswer;
    const correctAnswer = question.correctAnswer;
    if (!userAnswer || !correctAnswer) return;
    if (userAnswer.every((val, index) => val === correctAnswer[index])) correctAnswers++;
  });
  const totalQuestions = practice.questions.length;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePracticeMore = async () => {
    try {
      setIsDuplicating(true);
      const newPractice = await duplicatePractice(practice.id);
      navigate(`/practice/${newPractice.id}`);
      window.location.reload(); // Force reload to fetch new practice data
    } catch (error) {
      console.error("Failed to duplicate practice:", error);
    } finally {
      setIsDuplicating(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* === Main content (Statistics) === */}
      <div className="grow"></div>
      <div className="w-full max-w-2xl">
        <Card className="bg-gray-900/60 border border-gray-700 text-white">
          <CardContent className="p-8 space-y-6 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-6">Practice Completed!</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">{correctAnswers}</div>
                <div className="text-sm text-gray-400">Correct Answers</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">{accuracy}%</div>
                <div className="text-sm text-gray-400">Accuracy</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">{formatTime(practice.timeInSeconds)}</div>
                <div className="text-sm text-gray-400">Time Taken</div>
              </div>
            </div>

            <div className="text-lg mb-6">
              You answered <span className="font-bold text-green-400">{correctAnswers}</span> out of <span className="font-bold">{totalQuestions}</span> questions correctly!
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={handlePracticeMore}
                disabled={isDuplicating}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                {isDuplicating ? "Preparing..." : "Practice Again"}
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