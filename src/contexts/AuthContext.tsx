
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { UserProfile } from '@/types/auth';
import { UserRole } from '@/types/user';

// モック用のUUID
const MOCK_USER_ID = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

type AuthContextType = {
  user: { id: string; email: string; role?: UserRole } | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ id: string; email: string; role?: UserRole } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (email && password) {
        const mockUser = { id: MOCK_USER_ID, email, role: UserRole.APPLICANT };
        setUser(mockUser);
        setProfile({
          id: mockUser.id,
          company_name: null,
          contact_name: null,
          phone: null,
          address: null,
          primary_type: 'applicant'
        });
        toast({
          title: "ログイン成功",
          description: "ログインに成功しました",
        });
        navigate('/dashboard/applicant');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      toast({
        title: "ログインエラー",
        description: "ログインに失敗しました",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (email && password) {
        const mockUser = { id: MOCK_USER_ID, email, role: UserRole.APPLICANT };
        setUser(mockUser);
        setProfile({
          id: mockUser.id,
          company_name: null,
          contact_name: null,
          phone: null,
          address: null,
          primary_type: 'applicant'
        });
        toast({
          title: "登録完了",
          description: "登録が完了しました",
        });
        navigate('/profile-setup');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      toast({
        title: "登録エラー",
        description: "登録に失敗しました",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      setUser(null);
      setProfile(null);
      toast({
        title: "ログアウト完了",
        description: "ログアウトしました",
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "エラー",
        description: "ログアウトに失敗しました",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
