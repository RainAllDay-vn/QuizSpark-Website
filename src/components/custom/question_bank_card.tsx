import type {QuestionBank} from "@/model/QuestionBank.ts";
import {useNavigate} from "react-router-dom";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

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
      <CardContent className="flex justify-between items-center text-zinc-400 text-sm">
        <div className="flex items-center gap-4">
          <span>📘 15 questions</span>
          <span>⏱ 20 min</span>
          <span>👥 32 completions</span>
          <span>🕒 Created just now</span>
        </div>
        <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-white" onClick={handlePracticeButton}>
          Practice
        </Button>
      </CardContent>
    </Card>
  )
}