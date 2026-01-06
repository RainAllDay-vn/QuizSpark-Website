import { useState } from "react"
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
import { joinClassroomByCode } from "@/lib/api.ts";
import * as React from "react";
import type ClassroomResponseDTO from "@/dtos/ClassroomResponseDTO"

interface JoinClassroomDialogProps {
    onJoined?: (classroom: ClassroomResponseDTO) => void;
}

export function JoinClassroomDialog({ onJoined }: JoinClassroomDialogProps) {
    const [open, setOpen] = useState(false);
    const [joinCode, setJoinCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!joinCode.trim()) {
            setError("Join code is required");
            return;
        }

        setIsSubmitting(true);
        setError("");
        setSuccess("");

        try {
            const response = await joinClassroomByCode(joinCode.toUpperCase());
            setSuccess(`Successfully joined ${response.name}!`);
            if (onJoined) onJoined(response);
            setJoinCode("");
            setTimeout(() => {
                setOpen(false);
                setSuccess("");
            }, 1500);
        } catch (error: any) {
            console.error(error);
            setError(error.response?.data?.message || "An error occurred while joining the classroom. Make sure the code is correct.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:text-white">
                    Join Class
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-[#151518] text-white border border-zinc-800 sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Join a Classroom</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Enter the join code provided by your teacher to join their classroom.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="code">Classroom Code <span className="text-red-500">*</span></Label>
                            <Input
                                id="code"
                                placeholder="e.g. ABC123"
                                className="bg-zinc-900 border-zinc-800 text-white focus-visible:ring-violet-500 font-mono uppercase tracking-widest"
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value)}
                                maxLength={10}
                            />
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
                            {isSubmitting ? "Joining..." : "Join Classroom"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
