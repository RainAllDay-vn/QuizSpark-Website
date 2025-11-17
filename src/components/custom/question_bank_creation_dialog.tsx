import {useState} from "react"
import {Button} from "@/components/ui/button.tsx"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Textarea} from "@/components/ui/textarea.tsx"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx"
import {createQuestionBank} from "@/lib/api.ts";
import * as React from "react";
import type { QuestionBank } from "@/model/QuestionBank"

interface ValidationError {
  name?: string;
  description?: string;
  access?: string;
}

interface QuestionBankCreationDialogProps{
  addBank: (bank: QuestionBank) => void;
}

export function QuestionBankCreationDialog({addBank}: QuestionBankCreationDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [access, setAccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationError>({});

  const validateForm = (): ValidationError => {
    const errors: ValidationError = {};

    // Validate name
    if (!name.trim()) {
      errors.name = "Question bank name is required";
    } else if (name.length > 200) {
      errors.name = "Question bank name must be less than 200 characters";
    }

    // Validate description
    if (description.length > 1000) {
      errors.description = "Description must be less than 1000 characters";
    }

    // Validate access
    if (!access) {
      errors.access = "Question bank must either be PRIVATE or PUBLIC";
    } else if (!["PRIVATE", "PUBLIC"].includes(access)) {
      errors.access = "Question bank must either be PRIVATE or PUBLIC";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    setValidationErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return; // Don't submit if there are validation errors
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await createQuestionBank({name: name, description: description, access: access});
      addBank(response);
      // Reset form
      setName("");
      setDescription("");
      setAccess("");
      setValidationErrors({});
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred while creating the question bank");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
          + Create New Bank
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-neutral-900 text-white border border-neutral-800 sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Question Bank</DialogTitle>
          <DialogDescription className="text-neutral-400">
            Fill out the details below to create a new question bank.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Bank Name <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                placeholder="Enter question bank's name"
                className={`bg-neutral-800 border-neutral-700 text-white ${validationErrors.name ? "border-red-500" : ""}`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  // Clear validation error when user starts typing
                  if (validationErrors.name) {
                    setValidationErrors(prev => ({ ...prev, name: undefined }));
                  }
                }}
              />
              {validationErrors.name && (
                <p className="text-red-500 text-sm">{validationErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                placeholder="Short description..."
                className={`bg-neutral-800 border-neutral-700 text-white ${validationErrors.description ? "border-red-500" : ""}`}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  // Clear validation error when user starts typing
                  if (validationErrors.description) {
                    setValidationErrors(prev => ({ ...prev, description: undefined }));
                  }
                }}
              />
              {validationErrors.description && (
                <p className="text-red-500 text-sm">{validationErrors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Bank Visibility <span className="text-red-500">*</span></Label>
              <Select value={access} onValueChange={(value) => {
                setAccess(value);
                // Clear validation error when user selects a value
                if (validationErrors.access) {
                  setValidationErrors(prev => ({ ...prev, access: undefined }));
                }
              }}>
                <SelectTrigger className={`bg-neutral-800 border-neutral-700 text-white ${validationErrors.access ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select visibility"/>
                </SelectTrigger>
                <SelectContent className="bg-neutral-900 border-neutral-800 text-neutral-400">
                  <SelectItem value="PUBLIC">Public</SelectItem>
                  <SelectItem value="PRIVATE">Private</SelectItem>
                </SelectContent>
              </Select>
              {validationErrors.access && (
                <p className="text-red-500 text-sm">{validationErrors.access}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)} 
              className="border-neutral-700 text-neutral-300"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              className="bg-violet-600 hover:bg-violet-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Save Bank"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
