export default interface QuestionComment{
  id: string;
  user: string;
  comment: string;
  createdDate: string;
  editedDate?: string;
  isAnswer: boolean;
  isAI: boolean;
}