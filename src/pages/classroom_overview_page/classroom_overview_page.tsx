import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"
import { Separator } from "@/components/ui/separator.tsx"
import { Input } from "@/components/ui/input.tsx";
import { Loader2, Plus, Users, ArrowLeft, Calendar, Shield, User as UserIcon, LogOut, Trash2 } from "lucide-react";
import type ClassroomResponseDTO from "@/dtos/ClassroomResponseDTO.ts";
import type UserDTO from "@/dtos/UserDTO.ts";
import { getClassroom, removeMemberFromClassroom, searchUsers, inviteToClassroom } from "@/lib/api.ts";
import useAuthStatus from "@/lib/use_auth_hook";
import { format } from "date-fns";
import Loader from "@/components/custom/loader.tsx";

export default function ClassroomOverviewPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuthStatus();
    const [classroom, setClassroom] = useState<ClassroomResponseDTO | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Search & Invite State
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<UserDTO[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [isInviting, setIsInviting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.trim().length > 0) {
                setIsSearching(true);
                try {
                    const results = await searchUsers(searchQuery);
                    setSearchResults(results);
                    setShowResults(true);
                } catch (error) {
                    console.error("Failed to search users", error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleInvite = async (username: string) => {
        if (!classroom || isInviting) return;

        setIsInviting(true);
        try {
            const updated = await inviteToClassroom(classroom.id, username);
            setClassroom(updated);
            setSearchQuery("");
            setShowResults(false);
            // Optional: Show success toast
        } catch (error) {
            console.error("Failed to invite user", error);
            // Optional: Show error toast
        } finally {
            setIsInviting(false);
        }
    };

    useEffect(() => {
        if (id) {
            getClassroom(id)
                .then(data => {
                    setClassroom(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch classroom", err);
                    setIsLoading(false);
                });
        }
    }, [id]);

    if (isLoading) {
        return <Loader />;
    }

    if (!classroom) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                <Users className="h-16 w-16 mb-4 opacity-20" />
                <h2 className="text-xl font-medium text-white">Classroom not found</h2>
                <Button onClick={() => navigate("/home/classrooms")} variant="link" className="text-violet-400 mt-2">
                    Back to all classrooms
                </Button>
            </div>
        );
    }

    const isOwner = classroom.members.find(m => m.username === user?.username)?.role === 'OWNER';
    const isTeacher = classroom.members.find(m => m.username === user?.username)?.role === 'TEACHER';
    const canManage = isOwner || isTeacher;

    const handleRemoveMember = async (userId: string) => {
        if (!id || !window.confirm("Are you sure you want to remove this member?")) return;

        try {
            const updated = await removeMemberFromClassroom(id, userId);
            setClassroom(updated);
        } catch (error) {
            console.error("Failed to remove member", error);
            // Could add a toast here
        }
    };

    return (
        <div className="min-w-[100vw] min-h-[100vh] px-10 lg:px-40 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto p-6">
            {/* === Breadcrumbs / Back button === */}
            <Button
                variant="ghost"
                onClick={() => navigate("/home/classrooms")}
                className="text-zinc-400 hover:text-white -ml-2"
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Classrooms
            </Button>

            {/* === Header === */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white">{classroom.name}</h1>
                    <p className="text-zinc-400 mt-2 text-lg max-w-2xl">{classroom.description || "No description provided."}</p>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center text-sm text-zinc-500">
                            <Calendar className="mr-2 h-4 w-4" />
                            Created on {format(new Date(classroom.createdAt), "PPP")}
                        </div>
                        <div className="flex items-center text-sm text-zinc-500">
                            <Users className="mr-2 h-4 w-4" />
                            {classroom.members.length} member{classroom.members.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-red-400/10">
                        {isOwner ? <Trash2 className="mr-2 h-4 w-4" /> : <LogOut className="mr-2 h-4 w-4" />}
                        {isOwner ? "Delete Class" : "Leave Class"}
                    </Button>
                </div>
            </div>

            <Separator className="bg-zinc-800" />

            {/* === Details Grid === */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* === Left Col: Members List === */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#151518] rounded-xl border border-zinc-800 overflow-hidden">
                        <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-white">Class Members</h3>
                                {canManage && (
                                    <div className="relative w-full max-w-xs">
                                        <Input
                                            placeholder="Search & invite users..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onFocus={() => { if (searchResults.length > 0) setShowResults(true) }}
                                            className="h-9 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-violet-500"
                                        />
                                        {isSearching && (
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
                                            </div>
                                        )}

                                        {showResults && searchQuery && (
                                            <div className="absolute z-10 w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-md shadow-lg overflow-hidden max-h-[300px] overflow-y-auto">
                                                {searchResults.length === 0 && !isSearching ? (
                                                    <div className="px-4 py-3 text-sm text-zinc-500 text-center">No users found</div>
                                                ) : (
                                                    searchResults.map(user => {
                                                        const isMember = classroom.members.some(m => m.username === user.username);
                                                        return (
                                                            <div
                                                                key={user.username}
                                                                className="px-4 py-3 hover:bg-zinc-800 flex items-center justify-between group transition-colors cursor-default"
                                                            >
                                                                <div className="overflow-hidden mr-3">
                                                                    <div className="text-sm font-medium text-white truncate">{user.firstName} {user.lastName}</div>
                                                                    <div className="text-xs text-zinc-500 truncate">@{user.username}</div>
                                                                </div>
                                                                {isMember ? (
                                                                    <span className="text-xs text-zinc-500 italic px-2">Member</span>
                                                                ) : (
                                                                    <Button
                                                                        size="sm"
                                                                        variant="ghost"
                                                                        className="h-7 px-2 text-violet-400 hover:text-white hover:bg-violet-600/20"
                                                                        onClick={() => handleInvite(user.username)}
                                                                        disabled={isInviting}
                                                                    >
                                                                        {isInviting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-4 w-4 mr-1" />}
                                                                        Invite
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        );
                                                    })
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="divide-y divide-zinc-800">
                            {classroom.members.sort((a, b) => {
                                const rolesOrder = { OWNER: 0, TEACHER: 1, STUDENT: 2 };
                                if (rolesOrder[a.role] !== rolesOrder[b.role]) {
                                    return rolesOrder[a.role] - rolesOrder[b.role];
                                }
                                return a.firstName.localeCompare(b.firstName);
                            }).map((member) => (
                                <div key={member.id} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-900/30 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-violet-600/10 border border-violet-600/20 flex items-center justify-center text-violet-400 font-medium">
                                            {member.firstName[0]}{member.lastName[0]}
                                        </div>
                                        <div>
                                            <div className="text-white font-medium flex items-center gap-2">
                                                {member.firstName} {member.lastName}
                                                {member.username === user?.username && <span className="text-[10px] bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">You</span>}
                                            </div>
                                            <div className="text-sm text-zinc-500">@{member.username}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${member.role === 'OWNER' ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' :
                                            member.role === 'TEACHER' ? 'bg-violet-400/10 text-violet-400 border border-violet-400/20' :
                                                'bg-zinc-800 text-zinc-400 border border-zinc-700'
                                            }`}>
                                            {member.role === 'OWNER' && <Shield className="h-3 w-3" />}
                                            {member.role === 'TEACHER' && <Shield className="h-3 w-3" />}
                                            {member.role === 'STUDENT' && <UserIcon className="h-3 w-3" />}
                                            {member.role}
                                        </div>

                                        {canManage && member.role === 'STUDENT' && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-zinc-500 hover:text-red-400"
                                                onClick={() => handleRemoveMember(member.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* === Right Col: Sidebar Info === */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-600/30 rounded-xl p-6">
                        <h4 className="text-violet-400 font-medium text-sm uppercase tracking-wider mb-2">Classroom Code</h4>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-mono font-bold text-white tracking-widest">{classroom.joinCode}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-violet-300 hover:text-white hover:bg-violet-400/20"
                                onClick={() => {
                                    navigator.clipboard.writeText(classroom.joinCode);
                                    // Could add a toast here
                                }}
                            >
                                Copy
                            </Button>
                        </div>
                        <p className="text-zinc-400 text-xs mt-4 leading-relaxed">
                            Share this code with students or teachers to let them join this classroom instantly.
                        </p>
                    </div>

                    <div className="bg-[#151518] border border-zinc-800 rounded-xl p-6">
                        <h4 className="text-zinc-500 font-medium text-sm uppercase tracking-wider mb-4">Quick Stats</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">Total Banks Shared</span>
                                <span className="text-white font-medium">0</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">Completed Practices</span>
                                <span className="text-white font-medium">0</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">Average Score</span>
                                <span className="text-white font-medium">-%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
