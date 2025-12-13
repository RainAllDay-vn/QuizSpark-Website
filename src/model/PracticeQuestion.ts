import type QuestionComment from "@/model/Comment.ts";

export interface PracticeQuestion {
  index: number;
  baseQuestionId: string;
  ownerId: string;
  type: string;
  tags: string[];
  description: string;
  choices: string[];
  correctAnswer?: string[];
  userAnswer?: string[];
  secondsToAnswer?: number;
  comments?: QuestionComment[];
}