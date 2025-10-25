import {useState} from "react"
import {Card, CardHeader, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Separator} from "@/components/ui/separator"
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu"
import {Filter, Search} from "lucide-react"
import {CreateQuizDialog} from "@/components/custom/quiz_creation_dialog.tsx";
import type {Collection} from "@/model/collection.ts";

/*
* TO-DO:
* Replace hard coded data
* */
const quizzesData: Collection[] = [
  {
    "id": "e8a2c3c3-4f74-4a4c-8b5a-77cdbad4449f",
    "creator_id": 1,
    "name": "Introduction to Biology",
    "description": "Basic concepts of biology for beginners",
    "access": "public",
    "status": "Published"
  },
  {
    "id": "2b68f6f5-4cb2-48f4-82b4-bb8a00a6f9b1",
    "creator_id": 1,
    "name": "Advanced Mathematics",
    "description": "Basic concepts of biology for beginners",
    "access": "public",
    "status": "Published"
  },
  {
    "id": "b3fdd942-8a5b-4959-a247-59c4e27ecdc4",
    "creator_id": 1,
    "name": "Chemistry Fundamentals",
    "description": "Basic concepts of biology for beginners",
    "access": "public",
    "status": "Draft"
  }
]

interface CollectionCardProps {
  collection: Collection;
}

function CollectionCard({collection}: CollectionCardProps) {
  const statusColor =
    collection.status === "Published"
      ? "bg-green-600"
      : collection.status === "Draft"
        ? "bg-amber-600"
        : "bg-gray-600"

  return (
    <Card className="bg-[#0f0f10] border border-zinc-800 text-white hover:border-zinc-700 transition-all">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{collection.name}</h2>
          <p className="text-zinc-400 text-sm">{collection.description}</p>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full text-white ${statusColor}`}>
          {collection.status}
        </span>
      </CardHeader>
      <CardContent className="flex justify-between items-center text-zinc-400 text-sm">
        <div className="flex items-center gap-4">
          <span>📘 15 questions</span>
          <span>⏱ 20 min</span>
          <span>👥 32 completions</span>
          <span>🕒 Created just now</span>
        </div>
        <Button variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-white">
          View
        </Button>
      </CardContent>
    </Card>
  )
}

export default function QuizSection() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All Quizzes")

  const filtered = quizzesData.filter(q =>
    q.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All Quizzes" || q.status === filter)
  )

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
              onClick={() => setFilter(tab)}
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
          <CollectionCard key={index} collection={item}/>
        ))}
      </div>
    </div>
  )
}