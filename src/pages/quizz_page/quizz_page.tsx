import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";

/* ---------- hard-coded data ---------- */
const quizzes = [
  {
    id: 1,
    name: "Database Concepts Quiz",
    description: "A quiz covering fundamental concepts of relational databases",
    status: "PUBLISHED",
    questions: 15,
    duration: 20,
    completions: 32,
    created: "just now",
  },
  {
    id: 2,
    name: "React Hooks Mastery",
    description: "Test your knowledge on useState, useEffect and custom hooks",
    status: "PUBLISHED",
    questions: 12,
    duration: 15,
    completions: 128,
    created: "2 hours ago",
  },
  {
    id: 3,
    name: "World Geography Challenge",
    description: "Flags, capitals and landmarks around the globe",
    status: "PUBLISHED",
    questions: 25,
    duration: 30,
    completions: 89,
    created: "1 day ago",
  },
  {
    id: 4,
    name: "Python Basics",
    description: "Syntax, data types and control structures",
    status: "DRAFT",
    questions: 10,
    duration: 10,
    completions: 0,
    created: "3 days ago",
  },
];

const statusColor = {
  PUBLISHED: "bg-green-600",
  DRAFT: "bg-amber-600",
};

/* ---------- UI ---------- */
export default function QuizzPage() {
  return (
    <div className="bg-black text-white">
      {/* ------ Hero ------ */}
      <div className="border-b border-zinc-800 bg-[#0f0f10]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Explore Quizzes
          </h1>
          <p className="text-zinc-400 mt-2 max-w-lg">
            Challenge yourself with community-created quizzes. No account required.
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
              placeholder="Search quizzes..."
              className="pl-10 bg-zinc-900 border-zinc-800 text-white"
            />
          </div>
        </div>
      </div>

      {/* ------ Quiz Grid ------ */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((q) => (
            <Card
              key={q.id}
              className="bg-[#0f0f10] border border-zinc-800 text-white hover:border-zinc-700 transition"
            >
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{q.name}</h3>
                  <p className="text-zinc-400 text-sm mt-1">{q.description}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${statusColor[q.status]} text-white`}>
                  {q.status}
                </span>
              </CardHeader>

              <CardContent className="flex items-center justify-between text-sm text-zinc-400">
                <div className="flex gap-4">
                  <span>📘 {q.questions} Qs</span>
                  <span>⏱ {q.duration} min</span>
                  <span>👥 {q.completions}</span>
                </div>
              </CardContent>

              <div className="px-6 pb-4">
                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">
                  Start Quiz
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}