import type QuestionComment from "@/model/Comment.ts";
import type Tag from "./Tag";

export interface PracticeQuestion {
  index: number;
  baseQuestionId: string;
  ownerId: string;
  type: string;
  tags: Tag[];
  description: string;
  choices: string[];
  correctAnswer?: string[];
  userAnswer?: string[];
  secondsToAnswer?: number;
  comments?: QuestionComment[];
}