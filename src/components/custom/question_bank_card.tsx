import type {QuestionBank} from "@/model/QuestionBank.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {NumberInput} from "@/components/ui/number-input.tsx";
import { startNewPractice } from "@/lib/api";
import useAuthStatus from "@/lib/use_auth_hook.ts";

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
  editable: boolean;
}

export default function QuestionBankCard({questionBank, editable}: QuestionBankCardProps) {
  const navigate = useNavigate();
  const {user} = useAuthStatus();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [practiceSize, setPracticeSize] = useState<number>(Math.min(10, questionBank.numberOfQuestions));
  const [shuffleChoices, setShuffleChoices] = useState<boolean>(true);
  const [revealAnswer, setRevealAnswer] = useState<boolean>(false);

  function handlePracticeButton() {
    setIsDialogOpen(true);
  }

  async function startPractice() {
    if (user) {
      const response = await startNewPractice(questionBank.id, practiceSize, shuffleChoices, revealAnswer);
      const practiceId = response.id;
      navigate('/practice/'+practiceId);
    } else {
      const searchParams = new URLSearchParams();
      searchParams.append("size", practiceSize.toString());
      searchParams.append("shuffle", shuffleChoices.toString());
      navigate(`/practice/${questionBank.id}?${searchParams.toString()}`);
    }
    setIsDialogOpen(false);
  }

  // This function is no longer needed as we handle anonymous practice in startPractice

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
        {editable && 
          <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-white" onClick={() => navigate("/edit/bank/"+questionBank.id)}>
            Edit
          </Button>
        }
        <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-white" onClick={handlePracticeButton}>
          Practice
        </Button>
      </CardContent>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#0f0f10] border border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle>Practice Options</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Configure your practice session for "{questionBank.name}"
              {!user && (
                <div className="mt-2 p-2 bg-amber-900/30 border border-amber-700 rounded text-amber-300 text-sm">
                  ⚠️ You are not logged in. Your progress will not be saved.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="size" className="text-right">
                Number of Questions
              </Label>
              <NumberInput
                id="size"
                min={1}
                max={questionBank.numberOfQuestions}
                value={practiceSize}
                onValueChange={(value) => setPracticeSize(value || 1)}
                inputClassName="col-span-3 border-zinc-700 text-white"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shuffle" className="text-right">
                Shuffle Choices
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox
                  id="shuffle"
                  checked={shuffleChoices}
                  onCheckedChange={(checked) => setShuffleChoices(checked === true)}
                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label htmlFor="shuffle" className="text-sm text-zinc-400">
                  Randomize answer choices
                </Label>
              </div>
            </div>
            
            {user && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reveal" className="text-right">
                  Reveal Answers
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Checkbox
                    id="reveal"
                    checked={revealAnswer}
                    onCheckedChange={(checked) => setRevealAnswer(checked === true)}
                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <Label htmlFor="reveal" className="text-sm text-zinc-400">
                    Show correct answers immediately
                  </Label>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-zinc-700 text-white hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              onClick={startPractice}
              className="bg-zinc-800 hover:bg-zinc-700 text-white"
            >
              Start Practice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}