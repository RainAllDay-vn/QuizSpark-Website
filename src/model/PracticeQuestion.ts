export interface PracticeQuestion {
    id: number;
    index: number;
    tags: string[];
    description: string;
    choices: string[];
    answer: number;
    userAnswer: number | null;
}