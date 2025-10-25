import {useState} from "react"
import {Button} from "@/components/ui/button.tsx"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Textarea} from "@/components/ui/textarea.tsx"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx"

export function CreateQuizDialog() {
  const [open, setOpen] = useState(false);

  /*
  * TO-DO: Add quiz creation login
  * */
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
          + Create New Quiz
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-neutral-900 text-white border border-neutral-800 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Quiz</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Fill out the details below to create a new quiz.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Quiz Title</Label>
            <Input id="title" placeholder="Enter quiz title" className="bg-neutral-800 border-neutral-700 text-white"/>
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea id="desc" placeholder="Short description..."
                      className="bg-neutral-800 border-neutral-700 text-white"/>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select>
              <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                <SelectValue placeholder="Select category"/>
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-neutral-800 text-neutral-400">
                <SelectItem value="math">Math</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => setOpen(false)} className="border-neutral-700 text-neutral-300">
            Cancel
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            Save Quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
