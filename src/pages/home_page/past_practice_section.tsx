import {useEffect, useMemo, useState} from "react"
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu"
import {Filter} from "lucide-react"
import type {Practice} from "@/model/Practice.ts";
import {getUserPractice} from "@/lib/api.ts";
import PracticeCard from "@/components/custom/practice_card.tsx";

export default function PastPracticeSection() {
  const [filter, setFilter] = useState("All Practices")
  const [practices, setPractices] = useState<Practice[]>([])

  useEffect(() => {
    getUserPractice()
      .then(practiceData => setPractices(practiceData))
      .catch(error => console.error("Failed to fetch practices:", error))
  }, [])

  const filtered = useMemo(() => {
    return practices.filter(
      (practice) =>
        (filter === "All Practices" ||
         (filter === "Completed" && practice.closed) ||
         (filter === "In Progress" && !practice.closed))
    );
  }, [practices, filter]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* === Header === */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">Past Practices</h1>
          <p className="text-zinc-400 mt-1">Review your completed and ongoing practice sessions</p>
        </div>
      </div>

      <Separator className="bg-zinc-800"/>

      {/* === Filters === */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          {["All Practices", "Completed", "In Progress"].map(tab => (
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

      {/* === Practice List === */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((practice, index) => (
            <PracticeCard key={index} practice={practice}/>
          ))
        ) : (
          <div className="text-center py-12 text-zinc-400">
            <p className="text-lg">No practices found</p>
            <p className="text-sm mt-2">Start a practice session to see it here</p>
          </div>
        )}
      </div>
    </div>
  )
}
