import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Search } from "lucide-react"
import { QuestionBankCreationDialog } from "@/components/custom/question_bank_creation_dialog.tsx";
import type { QuestionBank } from "@/model/QuestionBank.ts";
import { getUserQuestionBanks } from "@/lib/api.ts";
import QuestionBankCard from "@/components/custom/question_bank_card.tsx";


export default function QuestionBankSection() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All Banks")
  const [questionBanks, setQuestionBanks] = useState<QuestionBank[]>([])

  useEffect(() => {
    getUserQuestionBanks()
      .then(banks => setQuestionBanks(banks))
  }, [])

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return questionBanks.filter((bank) => {
      const matchesSearch =
        (bank.name?.toLowerCase() || "").includes(term) ||
        (bank.description?.toLowerCase() || "").includes(term);
      const matchesFilter = filter === "All Banks" || bank.status === filter.toUpperCase();

      return matchesSearch && matchesFilter;
    });
  }, [questionBanks, search, filter]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* === Header === */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Banks</h1>
          <p className="text-zinc-400 mt-1">Create, manage and analyze your question banks</p>
        </div>
        <QuestionBankCreationDialog addBank={(bank: QuestionBank) => setQuestionBanks(prev => [...prev, bank])} />
      </div>

      <Separator className="bg-zinc-800" />

      {/* === Filters === */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          {["All Banks", "Published", "Draft"].map(tab => (
            <Button
              key={tab}
              variant={filter === tab ? "default" : "outline"}
              className={`text-sm ${filter === tab ? "bg-white text-black" : "text-gray-400 border-gray-700"}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search banks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-zinc-900 border-gray-700 text-white"
            />
          </div>


        </div>
      </div>

      {/* === Bank List === */}
      <div className="space-y-3">
        {filtered.map((item, index) => (
          <QuestionBankCard key={index} questionBank={item} editable={true} />
        ))}
      </div>
    </div>
  )
}