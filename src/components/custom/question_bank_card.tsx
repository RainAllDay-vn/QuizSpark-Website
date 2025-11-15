import type {QuestionBank} from "@/model/QuestionBank.ts";
import {useNavigate} from "react-router-dom";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

// Utility function to format date in a human-readable way
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    // For dates older than a week, return the formatted date
    return 'on ' + date.toLocaleDateString();
  }
}

interface QuestionBankCardProps {
  questionBank: QuestionBank;
}

export default function QuestionBankCard({questionBank}: QuestionBankCardProps) {
  const navigate = useNavigate();

  async function handlePracticeButton() {
    navigate('/practice/bank/' + questionBank.id);
  }

  const statusColor =
    questionBank.status === "PUBLISHED"
      ? "bg-green-600"
      : questionBank.status === "DRAFT"
        ? "bg-amber-600"
        : "bg-gray-600"

  return (
    <Card className="bg-[#0f0f10] border border-zinc-800 text-white hover:border-zinc-700 transition-all">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{questionBank.name}</h2>
          <p className="text-zinc-400 text-sm">{questionBank.description}</p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full text-white ${statusColor}`}>
          {questionBank.status}
        </span>
      </CardHeader>
      <CardContent className="flex gap-5 justify-between items-center text-zinc-400 text-sm">
        <div className="flex items-center gap-4">
          <span>📘 {questionBank.numberOfQuestions} questions</span>
          {questionBank.rating && <span>⭐ {questionBank.rating} stars</span>}
          <span>👥 {questionBank.numberOfAttempts} completions</span>
          <span>🕒 Created {formatRelativeTime(questionBank.createdAt)}</span>
        </div>
        <div className="grow"></div>
        <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-white" onClick={() => navigate("/edit/bank/"+questionBank.id)}>
          Edit
        </Button>
        <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-white" onClick={handlePracticeButton}>
          Practice
        </Button>
      </CardContent>
    </Card>
  )
}