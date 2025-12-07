import type {QuestionBank} from "@/model/QuestionBank.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import { startNewPractice } from "@/lib/api";
import useAuthStatus from "@/lib/use_auth_hook.ts";
import { formatRelativeTime } from "@/lib/utils";
import PracticeOptionsDialog from "@/components/custom/practice_options_dialog";

interface QuestionBankCardProps {
  questionBank: QuestionBank;
  editable: boolean;
}

export default function QuestionBankCard({questionBank, editable}: QuestionBankCardProps) {
  const navigate = useNavigate();
  const {user} = useAuthStatus();
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  


  function handlePracticeButton() {
    setIsDialogOpen(true);
  }

  async function startPractice(practiceSize: number, shuffleChoices: boolean, revealAnswer: boolean, selectedTags: string[]) {
    if (user) {
      const response = await startNewPractice(questionBank.id, practiceSize, shuffleChoices, revealAnswer, selectedTags);
      const practiceId = response.id;
      navigate('/practice/'+practiceId);
    } else {
      const searchParams = new URLSearchParams();
      searchParams.append("size", practiceSize.toString());
      searchParams.append("shuffle", shuffleChoices.toString());
      // Add selected tags as query parameters (will be used by API later)
      if (selectedTags.length > 0 && selectedTags.length < questionBank.tags.length) {
        searchParams.append("tags", selectedTags.join(","));
      }
      navigate(`/practice/${questionBank.id}?${searchParams.toString()}`);
    }
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
          <h2 className="text-lg font-semibold cursor-pointer hover:text-violet-400 transition-colors" onClick={() => navigate(`/bank/${questionBank.id}`)}>{questionBank.name}</h2>
          <p className="text-zinc-400 text-sm whitespace-pre-wrap">{questionBank.description}</p>
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
        {editable && 
          <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-white" onClick={() => navigate("/edit/bank/"+questionBank.id)}>
            Edit
          </Button>
        }
        <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-white" onClick={handlePracticeButton}>
          Practice
        </Button>
      </CardContent>
      
      <PracticeOptionsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onStartPractice={startPractice}
        questionBank={questionBank}
      />
    </Card>
  )
}