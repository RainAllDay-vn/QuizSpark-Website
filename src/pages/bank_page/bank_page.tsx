import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import {useEffect, useState} from "react";
import type {QuestionBank} from "@/model/QuestionBank.ts";
import {getPublicQuestionBank} from "@/lib/api.ts";
import QuestionBankCard from "@/components/custom/question_bank_card.tsx";
import Loader from "@/components/custom/loader.tsx";

export default function QuestionBankPage() {
  const [questionBanks, setQuestionBanks] = useState<QuestionBank[]>([])

  useEffect(() => {
    getPublicQuestionBank()
      .then(banks => setQuestionBanks(banks))
  }, [])

  return (
    <div className="bg-black text-white">
      {/* ------ Hero ------ */}
      <div className="border-b border-zinc-800 bg-[#0f0f10]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Explore Question Collections
          </h1>
          <p className="text-zinc-400 mt-2 max-w-lg">
            Challenge yourself with community-created question banks. No account required.
          </p>
        </div>
      </div>

      {/* ------ Filters ------ */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {["All", "Science", "Technology", "History", "Math"].map((tab) => (
              <Button
                key={tab}
                variant="outline"
                className="border-zinc-700 text-zinc-300"
              >
                {tab}
              </Button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500"/>
            <Input
              placeholder="Search banks..."
              className="pl-10 bg-zinc-900 border-zinc-800 text-white"
            />
          </div>
        </div>
      </div>

      {/* ------ Bank Grid ------ */}
      {questionBanks.length===0 && <Loader/>}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid gap-4">
          <div className="space-y-3">
            {questionBanks.map((item, index) => (
              <QuestionBankCard key={index} questionBank={item}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}