export default interface QuestionComment{
  id: string;
  ownerUsername: string;
  ownerId: string;
  comment: string;
  createdDate: string;
  editedDate?: string;
  answer: boolean;
  ai: boolean;
}