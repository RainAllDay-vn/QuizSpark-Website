export interface Quizz {
  id: number;
  collection_id: number;
  data: {
    question: any;
    answer: any;
    key: any; 
  };
  is_public: boolean;
  type: string; 
  created_at: string;
  updated_at: string;
}
