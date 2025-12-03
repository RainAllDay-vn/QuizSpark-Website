export default interface QuestionCreationDTO {
  questionType: "SINGLE_ANSWER"|"MULTIPLE_ANSWER"|"FILL_THE_BLANK"|"OPEN_ANSWER";
  tags: string[];
  description: string;
  answer: string[];
  choices: string[];
  explanation?: string;
}