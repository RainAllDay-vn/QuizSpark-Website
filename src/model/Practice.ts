import type { QuestionBank } from "./QuestionBank";
import type { PracticeQuestion } from "./PracticeQuestion";

export interface Practice {
    id: string;
    questionBank: QuestionBank;
    questions: PracticeQuestion[];
    closed: boolean;
    date: string;
}