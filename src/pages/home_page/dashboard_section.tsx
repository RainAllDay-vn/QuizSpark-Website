import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {QuestionBankCreationDialog} from "@/components/custom/question_bank_creation_dialog.tsx";
import {getUserStatistic} from "@/lib/api.ts";
import {useEffect, useState} from "react";
import Loader from "@/components/custom/loader.tsx";
import type {UserStatisticDTO} from "@/dtos/UserStatisticDTO.ts";

interface StatCardProps {
  title: string;
  value: string;
  color: string;
}

function StatCard({title, value, color}: StatCardProps) {
  return (
    <Card
      className="bg-[#0f0f10] border border-zinc-800 text-white shadow-md hover:shadow-violet-500/20 transition-all duration-300 hover:scale-[1.02]">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-4xl font-bold bg-gradient-to-r ${color} text-transparent bg-clip-text`}>
          {value}
        </p>
      </CardContent>
    </Card>
  )
}

export default function DashboardSection() {
  const [statistics, setStatistics] = useState<UserStatisticDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        const data = await getUserStatistic();
        setStatistics(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching user statistics:', err);
        setError('Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  const formatTimeSpent = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center space-x-8">
          <div className="w-fit">
            <h1 className="text-3xl font-semibold tracking-tight text-white">Dashboard</h1>
            <p className="text-zinc-400 mt-1">Overview of your activity</p>
          </div>
          <QuestionBankCreationDialog />
        </div>
        <Separator className="bg-zinc-800"/>
        <div className="flex justify-center items-center py-12">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center space-x-8">
          <div className="w-fit">
            <h1 className="text-3xl font-semibold tracking-tight text-white">Dashboard</h1>
            <p className="text-zinc-400 mt-1">Overview of your activity</p>
          </div>
          <QuestionBankCreationDialog />
        </div>
        <Separator className="bg-zinc-800"/>
        <div className="flex justify-center items-center py-12">
          <p className="text-zinc-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* === Header === */}
      <div className="flex justify-between items-center space-x-8">
        <div className="w-fit">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Overview of your activity</p>
        </div>
        <QuestionBankCreationDialog />
      </div>

      <Separator className="bg-zinc-800"/>

      {/* === Stats Grid === */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Questions Answered" 
          value={statistics?.totalQuestionsAnswered?.toString() || "0"} 
          color="from-blue-600 to-cyan-500"
        />
        <StatCard 
          title="Question Banks" 
          value={statistics?.totalQuestionBanks?.toString() || "0"} 
          color="from-violet-600 to-fuchsia-500"
        />
        <StatCard 
          title="Time Spent" 
          value={statistics ? formatTimeSpent(statistics.totalTimeSpentInSeconds) : "0m"} 
          color="from-emerald-600 to-green-500"
        />
      </div>
    </div>
  );
}
