import type QuestionComment from "@/model/Comment.ts";

export interface PracticeQuestion {
  index: number;
  type: string;
  tags: string[];
  description: string;
  choices: string[];
  correctAnswer?: string[];
  userAnswer?: string[];
  secondsToAnswer?: number;
  comments?: QuestionComment[];
}