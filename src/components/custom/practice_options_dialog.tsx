import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { NumberInput } from "@/components/ui/number-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { QuestionBank } from "@/model/QuestionBank";
import useAuthStatus from "@/lib/use_auth_hook";
import {useState} from "react";
import {startNewPractice} from "@/lib/api.ts";
import {useNavigate} from "react-router-dom";

interface PracticeOptionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  questionBank: QuestionBank;
}

export default function PracticeOptionsDialog({ 
  isOpen, 
  onClose, 
  questionBank
}: PracticeOptionsDialogProps) {
  const navigate = useNavigate();
  const { user } = useAuthStatus();
  const [practiceSize, setPracticeSize] = useState<number>(10);
  const [shuffleChoices, setShuffleChoices] = useState<boolean>(true);
  const [revealAnswer, setRevealAnswer] = useState<boolean>(true);
  const availableTags = questionBank.tags;
  const [selectedTags, setSelectedTags] = useState<string[]>([...availableTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleStartPractice = async () => {
    if (questionBank) {
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
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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

          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">
              Select Tags
            </Label>
            <div className="col-span-3 space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="selectAll"
                  checked={selectedTags.length === availableTags.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedTags([...availableTags]);
                    } else {
                      setSelectedTags([]);
                    }
                  }}
                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label htmlFor="selectAll" className="text-sm text-zinc-400">
                  Select All Tags ({selectedTags.length} of {availableTags.length} selected)
                </Label>
              </div>

              {availableTags.length > 0 && (
                <ScrollArea className="h-32 w-full rounded-md border border-zinc-700 p-2">
                  <div className="flex flex-wrap gap-2">
                    {availableTags.sort().map((tag) => (
                      <div key={tag} className="flex items-center space-x-1">
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => handleTagToggle(tag)}
                          className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                        />
                        <Label
                          htmlFor={`tag-${tag}`}
                          className="text-sm text-zinc-300 cursor-pointer"
                        >
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}

              {selectedTags.length === 0 && (
                <p className="text-xs text-amber-400">
                  Warning: No tags selected. Questions from all tags will be included.
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-zinc-700 text-white hover:bg-zinc-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleStartPractice}
            className="bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            Start Practice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
