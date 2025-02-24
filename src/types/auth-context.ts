
import { UserRole } from './user';
import { UserProfile } from './auth';

export type AuthContextType = {
  user: { id: string; email: string; role?: UserRole } | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
};

