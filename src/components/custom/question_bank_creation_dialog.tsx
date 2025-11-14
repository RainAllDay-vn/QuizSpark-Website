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
import {createQuestionBank} from "@/lib/api.ts";
import * as React from "react";

export function QuestionBankCreationDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [access, setAccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const response = await createQuestionBank({name: name, description: description, access: access})
      console.log(response)
      // Reset form
      setName("");
      setDescription("");
      setAccess("");
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert("An error occurred")
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
          + Create New Bank
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-neutral-900 text-white border border-neutral-800 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Question Bank</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Fill out the details below to create a new question bank.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Bank Name <span className="text-red-500">*</span></Label>
              <Input 
                id="title" 
                placeholder="Enter question bank's name" 
                className="bg-neutral-800 border-neutral-700 text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea 
                id="desc" 
                placeholder="Short description..."
                className="bg-neutral-800 border-neutral-700 text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Bank Visibility <span className="text-red-500">*</span></Label>
              <Select value={access} onValueChange={setAccess}>
                <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectValue placeholder="Select visibility"/>
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-800 text-neutral-400">
                  <SelectItem value="PUBLIC">Public</SelectItem>
                  <SelectItem value="PRIVATE">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)} 
              className="border-neutral-700 text-neutral-300"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              className="bg-violet-600 hover:bg-violet-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Save Bank"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
