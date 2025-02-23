
export interface Expert {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  consultations: number;
  joined_at: string;
  status: 'active' | 'inactive';
  recommendation_score: number;
}
