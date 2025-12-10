import type QuestionComment from "@/model/Comment.ts";

export default interface PracticeAnswerResponseDTO{
  correctAnswer: string[];
  questionComments: QuestionComment[];
}