import type { PracticeQuestion } from "./PracticeQuestion";

export interface Practice {
    id: string;
    bankNames: string[];
    numberOfQuestion: number;
    questions: PracticeQuestion[];
    closed: boolean;
    date: string;
    timeInSeconds: number;
}