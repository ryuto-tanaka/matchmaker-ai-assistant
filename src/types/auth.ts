
import { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  company_name: string | null;
  contact_name: string | null;
  phone: string | null;
  address: string | null;
  primary_type: 'applicant' | 'provider' | 'expert';
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
}
