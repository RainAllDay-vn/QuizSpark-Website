export interface Quiz {
  id: string;
  collection_id: number;
  question: string;
  choices: string[];
  answer: number;
}
