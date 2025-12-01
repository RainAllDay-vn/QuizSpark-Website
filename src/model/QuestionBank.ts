import type { Question } from "./Question";

export interface QuestionBank {
  id: string;
  creator_id?: string;
  name: string;
  description?: string;
  access: string;
  status: string;
  createdAt: string;
  rating?: number;
  numberOfQuestions: number;
  numberOfAttempts: number;
  tags: string[];
  questions: Question[];
}
