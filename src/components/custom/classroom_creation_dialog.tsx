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
import { Textarea } from "@/components/ui/textarea.tsx"
import { createClassroom } from "@/lib/api.ts";
import * as React from "react";
import type ClassroomResponseDTO from "@/dtos/ClassroomResponseDTO"
import { Plus } from "lucide-react";

interface ClassroomCreationDialogProps {
    onClassroomCreated?: (classroom: ClassroomResponseDTO) => void;
}

export function ClassroomCreationDialog({ onClassroomCreated }: ClassroomCreationDialogProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Classroom name is required");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const response = await createClassroom({ name: name, description: description });
            if (onClassroomCreated) onClassroomCreated(response);
            // Reset form
            setName("");
            setDescription("");
            setOpen(false);
        } catch (error) {
            console.error(error);
            setError("An error occurred while creating the classroom");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Create Class
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-[#151518] text-white border border-zinc-800 sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create New Classroom</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Create a space for your students to learn and collaborate.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Classroom Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                placeholder="e.g. Advanced Mathematics"
                                className="bg-zinc-900 border-zinc-800 text-white focus-visible:ring-violet-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="desc">Description</Label>
                            <Textarea
                                id="desc"
                                placeholder="What is this class about?"
                                className="bg-zinc-900 border-zinc-800 text-white focus-visible:ring-violet-500 min-h-[100px]"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-900/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg text-sm">
                            {error}
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
                            {isSubmitting ? "Creating..." : "Create Classroom"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
