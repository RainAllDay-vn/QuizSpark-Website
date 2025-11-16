export default interface QuestionUpdateDTO {
  tags?: string[];
  description?: string;
  answer?: number;
  choices?: string[];
}