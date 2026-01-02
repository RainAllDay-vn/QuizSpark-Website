import type { PracticeQuestion } from "./PracticeQuestion";
import type Tag from "./Tag";

export interface Practice {
    id: string;
    bankNames: string[];
    tags: Tag[];
    numberOfQuestion: number;
    questions: PracticeQuestion[];
    closed: boolean;
    date: string;
    timeInSeconds: number;
}