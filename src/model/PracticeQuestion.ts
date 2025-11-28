export interface PracticeQuestion {
    index: number;
    type: string;
    tags: string[];
    description: string;
    choices: string[];
    answer: string[] | null;
    userAnswer: string[] | null;
    timesToAnswer: number;
}