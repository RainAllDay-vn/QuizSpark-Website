import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CreateQuizDialog } from "./create-quizz-dialouge"

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* === Header === */}
  <div className="flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-semibold tracking-tight text-white">Dashboard</h1>
    <p className="text-zinc-400 mt-1">Overview of your quiz system activity</p>
  </div>
  <div>
    <CreateQuizDialog />
  </div>
</div>


      <Separator className="bg-zinc-800" />

      {/* === Stats Grid === */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Quizzes" value="12" color="from-violet-600 to-fuchsia-500" />
        <StatCard title="Total Students" value="58" color="from-blue-600 to-cyan-500" />
        <StatCard title="Upcoming Events" value="3" color="from-emerald-600 to-green-500" />
      </div>
    </div>
  )
}

/* === Reusable StatCard Component === */
function StatCard({
  title,
  value,
  color,
}: {
  title: string
  value: string
  color: string
}) {
  return (
    <Card className="bg-[#0f0f10] border border-zinc-800 text-white shadow-md hover:shadow-violet-500/20 transition-all duration-300 hover:scale-[1.02]">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className={`text-4xl font-bold bg-gradient-to-r ${color} text-transparent bg-clip-text`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  )
}
