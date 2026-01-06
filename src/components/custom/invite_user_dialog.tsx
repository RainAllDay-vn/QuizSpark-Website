import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button.tsx"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import { inviteToClassroom, searchUsers } from "@/lib/api.ts";
import * as React from "react";
import type ClassroomResponseDTO from "@/dtos/ClassroomResponseDTO"
import type UserDTO from "@/dtos/UserDTO";
import { UserPlus, Loader2 } from "lucide-react";

interface InviteUserDialogProps {
    classroomId: string;
    onUserInvited?: (updatedClassroom: ClassroomResponseDTO) => void;
    trigger?: React.ReactNode;
}

export function InviteUserDialog({ classroomId, onUserInvited, trigger }: InviteUserDialogProps) {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [searchResults, setSearchResults] = useState<UserDTO[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (username.trim().length > 0) {
                setIsSearching(true);
                try {
                    const results = await searchUsers(username);
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
        }, 500);

        return () => clearTimeout(timer);
    }, [username]);

    const selectUser = (user: UserDTO) => {
        setUsername(user.username);
        setShowResults(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!username.trim()) {
            setError("Username is required");
            return;
        }

        setIsSubmitting(true);
        setError("");
        setSuccess("");

        try {
            const response = await inviteToClassroom(classroomId, username);
            setSuccess(`Successfully invited ${username}!`);
            if (onUserInvited) onUserInvited(response);
            setUsername("");
            // We might want to keep the dialog open for a bit to show success or close it immediately
            setTimeout(() => {
                setOpen(false);
                setSuccess("");
            }, 1500);
        } catch (error: any) {
            console.error(error);
            setError(error.response?.data?.message || "An error occurred while inviting the user");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:text-white">
                        <UserPlus className="mr-2 h-4 w-4" /> Invite User
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="bg-[#151518] text-white border border-zinc-800 sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invite Member</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Enter the username of the student or teacher you want to invite.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-4">
                        <div className="space-y-2 relative">
                            <Label htmlFor="username">Username <span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <Input
                                    id="username"
                                    placeholder="Search by username or name..."
                                    className="bg-zinc-900 border-zinc-800 text-white focus-visible:ring-violet-500 pr-10"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        // If user types, we might want to show results again if hidden?
                                        // The effect triggers anyway. 
                                        // Use showResults to toggle visibility when selecting.
                                    }}
                                    onFocus={() => {
                                        if (searchResults.length > 0) setShowResults(true);
                                    }}
                                    autoComplete="off"
                                />
                                {isSearching && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
                                    </div>
                                )}
                            </div>

                            {/* Search Results Dropdown */}
                            {showResults && searchResults.length > 0 && (
                                <div className="absolute z-10 w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-md shadow-lg max-h-60 overflow-auto">
                                    {searchResults.map((user) => (
                                        <div
                                            key={user.username}
                                            className="px-4 py-2 hover:bg-zinc-800 cursor-pointer flex items-center gap-3 transition-colors"
                                            onClick={() => selectUser(user)}
                                        >
                                            <div className="h-8 w-8 rounded-full bg-violet-600/10 border border-violet-600/20 flex items-center justify-center text-violet-400 text-xs font-medium shrink-0">
                                                {user.firstName?.[0]}{user.lastName?.[0]}
                                            </div>
                                            <div className="overflow-hidden">
                                                <div className="text-sm font-medium text-white truncate">
                                                    {user.firstName} {user.lastName}
                                                </div>
                                                <div className="text-xs text-zinc-500 truncate">@{user.username}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-900/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-900/10 border border-green-500/50 text-green-500 px-4 py-2 rounded-lg text-sm">
                            {success}
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-violet-600 hover:bg-violet-700 text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Inviting..." : "Send Invitation"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
