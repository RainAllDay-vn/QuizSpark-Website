import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Search, Users } from "lucide-react"
import type ClassroomResponseDTO from "@/dtos/ClassroomResponseDTO.ts";
import { getUserClassrooms } from "@/lib/api.ts";
import { ClassroomCreationDialog } from "@/components/custom/classroom_creation_dialog.tsx";
import useAuthStatus from "@/lib/use_auth_hook";
import { Navigate } from "react-router-dom";

export default function ClassroomSection() {
    const { user, loading } = useAuthStatus()
    const [search, setSearch] = useState("")
    const [classrooms, setClassrooms] = useState<ClassroomResponseDTO[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (loading || !user || (user.role !== "ROLE_TEACHER" && user.role !== "ROLE_ADMIN")) return;

        getUserClassrooms()
            .then(data => {
                setClassrooms(data)
                setIsLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch classrooms", err)
                setIsLoading(false)
            })
    }, [loading, user])

    const filtered = useMemo(() => {
        return classrooms.filter(
            (classroom) =>
                classroom.name.toLowerCase().includes(search.toLowerCase()) ||
                classroom.description.toLowerCase().includes(search.toLowerCase())
        );
    }, [classrooms, search]);

    if (loading) return null;
    if (!user || (user.role !== "ROLE_TEACHER" && user.role !== "ROLE_ADMIN")) {
        return <Navigate to="/home" replace />
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* === Header === */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight text-white">Classrooms</h1>
                    <p className="text-zinc-400 mt-1">Join or create a classroom to collaborate with others</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white">
                        Join Class
                    </Button>
                    <ClassroomCreationDialog onClassroomCreated={(newClass) => setClassrooms(prev => [newClass, ...prev])} />
                </div>
            </div>

            <Separator className="bg-zinc-800" />

            {/* === Filters === */}
            <div className="flex flex-wrap gap-3 items-center justify-between">
                <div className="flex gap-2">
                    <div className="relative w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search classrooms..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 bg-zinc-900 border-gray-700 text-white"
                        />
                    </div>
                </div>
            </div>

            {/* === Classroom List === */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                    <Users className="h-12 w-12 mb-4 animate-pulse" />
                    <p>Loading classrooms...</p>
                </div>
            ) : filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((item) => (
                        <div key={item.id} className="bg-[#1a1a1c] border border-zinc-800 rounded-xl p-5 hover:border-violet-500/50 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-12 w-12 rounded-lg bg-violet-600/10 flex items-center justify-center border border-violet-600/20 group-hover:bg-violet-600/20 transition-colors">
                                    <Users className="h-6 w-6 text-violet-400" />
                                </div>
                                <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-2 py-1 rounded">
                                    {item.joinCode}
                                </span>
                            </div>
                            <h3 className="text-lg font-medium text-white mb-1">{item.name}</h3>
                            <p className="text-sm text-zinc-400 line-clamp-2 mb-4 h-10">{item.description || "No description provided."}</p>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex -space-x-2 overflow-hidden">
                                    {item.members.slice(0, 3).map((member, i) => (
                                        <div key={i} title={member.username} className="inline-block h-6 w-6 rounded-full ring-2 ring-zinc-900 bg-zinc-700 border border-zinc-600 flex items-center justify-center text-[10px] text-zinc-300">
                                            {member.firstName[0]}{member.lastName[0]}
                                        </div>
                                    ))}
                                    {item.members.length > 3 && (
                                        <div className="inline-block h-6 w-6 rounded-full ring-2 ring-zinc-900 bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] text-zinc-400">
                                            +{item.members.length - 3}
                                        </div>
                                    )}
                                </div>
                                <Button variant="ghost" size="sm" className="text-violet-400 hover:text-violet-300 hover:bg-violet-400/10">
                                    View Class
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-zinc-500 bg-[#151518] rounded-xl border border-dashed border-zinc-800">
                    <Users className="h-12 w-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium text-zinc-400">No classrooms found</p>
                    <p className="text-sm text-zinc-500 mt-1">Create a new class to get started</p>
                </div>
            )}
        </div>
    )
}
