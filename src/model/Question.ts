import type QuestionComment from "@/model/Comment.ts";

export interface Question {
  id: string;
  description: string;
  choices: string[];
  answer: string[];
  questionType: "SINGLE_ANSWER"|"MULTIPLE_ANSWER"|"FILL_THE_BLANK"|"OPEN_ANSWER";
  tags: string[];
  comments?: QuestionComment[];
}
