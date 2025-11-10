import {useEffect, useMemo, useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Separator} from "@/components/ui/separator"
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu"
import {Filter, Search} from "lucide-react"
import {CreateQuizDialog} from "@/components/custom/quiz_creation_dialog.tsx";
import type {QuestionBank} from "@/model/QuestionBank.ts";
import {getPublicQuestionBank} from "@/lib/api.ts";
import QuestionBankCard from "@/components/custom/question_bank_card.tsx";


export default function QuizSection() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All Quizzes")
  const [questionBanks, setQuestionBanks] = useState<QuestionBank[]>([])

  useEffect(() => {
    getPublicQuestionBank()
      .then(banks => setQuestionBanks(banks))
  }, [])

  const filtered = useMemo(() => {
    return questionBanks.filter(
      (bank) =>
        bank.name.toLowerCase().includes(search.toLowerCase()) &&
        (filter === "All Quizzes" || bank.status === filter)
    );
  }, [questionBanks, search, filter]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* === Header === */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Quizzes</h1>
          <p className="text-zinc-400 mt-1">Create, manage and analyze your quizzes</p>
        </div>
        <CreateQuizDialog/>
      </div>

      <Separator className="bg-zinc-800"/>

      {/* === Filters === */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          {["All Quizzes", "Published", "Draft"].map(tab => (
            <Button
              key={tab}
              variant={filter === tab ? "default" : "outline"}
              className={`text-sm ${filter === tab ? "bg-white text-black" : "text-gray-400 border-gray-700"}`}
              onClick={() => setFilter(tab.toUpperCase)}
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4"/>
            <Input
              placeholder="Search quizzes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-zinc-900 border-gray-700 text-white"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-700 text-gray-300">
                <Filter className="mr-2 h-4 w-4"/> All Categories
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Science</DropdownMenuItem>
              <DropdownMenuItem>Math</DropdownMenuItem>
              <DropdownMenuItem>History</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* === Quiz List === */}
      <div className="space-y-3">
        {filtered.map((item, index) => (
          <QuestionBankCard key={index} questionBank={item}/>
        ))}
      </div>
    </div>
  )
}