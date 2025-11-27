export default interface QuestionUpdateDTO {
  tags?: string[];
  description?: string;
  answer?: string[];
  choices?: string[];
  explanation?: string;
}