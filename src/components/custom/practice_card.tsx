import type {Practice} from "@/model/Practice.ts";
import {useNavigate} from "react-router-dom";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {formatRelativeTime} from "@/lib/utils.ts";

interface PracticeCardProps {
  practice: Practice;
}

export default function PracticeCard({practice}: PracticeCardProps) {
  const navigate = useNavigate();
  
  const handleContinuePractice = () => {
    navigate(`/practice/${practice.id}`);
  };
  
  const handleViewResults = () => {
    navigate(`/practice/${practice.id}`);
  };
  
  const statusColor = practice.closed
    ? "bg-green-600"
    : "bg-blue-600"
  
  const statusText = practice.closed
    ? "Completed"
    : "In Progress"
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  
  // Get tags from the first question if available, otherwise use empty array
  
  return (
    <Card className="bg-[#0f0f10] border border-zinc-800 text-white hover:border-zinc-700 transition-all">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{practice.bankNames[0]}</h2>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full text-white ${statusColor}`}>
          {statusText}
        </span>
      </CardHeader>
      <CardContent className="flex gap-5 justify-between items-center text-zinc-400 text-sm">
        <div className="flex items-center gap-4">
          <span>📊 {practice.numberOfQuestion} questions</span>
          <span>🕒 {formatTime(practice.timeInSeconds)}</span>
          <span>📅 {formatRelativeTime(practice.date)}</span>
        </div>
        <div className="grow"></div>
        {!practice.closed ? (
          <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-white" onClick={handleContinuePractice}>
            Continue
          </Button>
        ) : (
          <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-white" onClick={handleViewResults}>
            View Results
          </Button>
        )}
      </CardContent>
    </Card>
  )
}