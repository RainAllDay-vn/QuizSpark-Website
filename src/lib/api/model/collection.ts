export interface Collection {
  id: number;
  name: string;
  description?: string;
  creator_id: number;
  public: boolean;
  created_at?: string;
  updated_at?: string;
  card_count?: number; 
}
