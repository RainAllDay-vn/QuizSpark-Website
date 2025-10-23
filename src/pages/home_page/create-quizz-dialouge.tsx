"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CreateQuizDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
          Create Quiz
        </Button>
      </DialogTrigger>

      <DialogContent className="!max-w-fit bg-[#0f0f0f] border border-zinc-800 text-white p-8 rounded-2xl overflow-visible">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Create New Quiz</DialogTitle>
          <DialogDescription className="text-zinc-400 mt-2 space-y-6">
            <p>Add questions, set answers, and configure quiz settings</p>

            {/* Both cards inside description */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left side */}
              <Card className="bg-[#151518] border-zinc-800 flex-1">
                <CardHeader>
                  <CardTitle className="text-lg">Quiz Details</CardTitle>
                  <p className="text-sm text-zinc-400">
                    Basic information about your quiz
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 overflow-visible">
                  <div>
                    <Label>Quiz Title</Label>
                    <Input
                      className="bg-[#1a1a1c] border-zinc-700 mt-1 w-full"
                      placeholder="Enter quiz title"
                    />
                  </div>

                  <div>
                    <Label>Description</Label>
                    <textarea
                      className="bg-[#1a1a1c] border border-zinc-700 w-full rounded-md p-2 mt-1 text-sm resize-none"
                      rows={3}
                      placeholder="Describe what your quiz is about..."
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Label>Category</Label>
                      <Select>
                        <SelectTrigger className="bg-[#1a1a1c] border-zinc-700 mt-1 w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#151518] border-zinc-700 text-white">
                          <SelectItem value="science">Science</SelectItem>
                          <SelectItem value="math">Math</SelectItem>
                          <SelectItem value="history">History</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex-1">
                      <Label>Difficulty Level</Label>
                      <Select>
                        <SelectTrigger className="bg-[#1a1a1c] border-zinc-700 mt-1 w-full truncate">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#151518] border-zinc-700 text-white">
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right side */}
              <Card className="bg-[#151518] border-zinc-800 w-full lg:w-[320px]">
                <CardHeader>
                  <CardTitle className="text-lg">Quiz Settings</CardTitle>
                  <p className="text-sm text-zinc-400">
                    Configure how your quiz works
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 overflow-visible">
                  <div>
                    <Label>Time Limit</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        type="number"
                        placeholder="15"
                        className="bg-[#1a1a1c] border-zinc-700 w-20"
                      />
                      <span className="text-zinc-400 text-sm">minutes</span>
                    </div>
                  </div>

                  <div>
                    <Label>Passing Score</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        type="number"
                        placeholder="70"
                        className="bg-[#1a1a1c] border-zinc-700 w-20"
                      />
                      <span className="text-zinc-400 text-sm">%</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Label className="font-medium">Randomize Questions</Label>
                    <p className="text-sm text-zinc-400">
                      Show questions in random order
                    </p>
                  </div>

                  <div>
                    <Label className="font-medium">Immediate Results</Label>
                    <p className="text-sm text-zinc-400">
                      Show results after each question
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-[#1a1a1c]">
            Save Draft
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            Preview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
