export default interface QuestionComment{
  id: string;
  user: string;
  content: string;
  date: string;
  isAnswer: boolean;
  isAI: boolean;
}