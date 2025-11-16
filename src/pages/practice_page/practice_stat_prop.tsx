import { Card, CardContent } from "@/components/ui/card";

interface PracticeStatsProps {
  score: number;
  current: number;
  total: number;
  seconds: number;
}

export function PracticeStats({ score, current, total, seconds }: PracticeStatsProps) {
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Card className="bg-gray-900/60 border border-gray-700 text-white">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-gray-200">Practice Stats</h2>
          <div className="space-y-3 text-gray-300 text-sm">
            <div className="flex justify-between">
              <span>Score</span>
              <span>{score}</span>
            </div>
            <div className="flex justify-between">
              <span>Progress</span>
              <span>{current}/{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span>{formatTime(seconds)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
