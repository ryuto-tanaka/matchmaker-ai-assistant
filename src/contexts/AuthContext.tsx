
import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType } from '@/types/auth-context';
import { useAuthState } from '@/hooks/useAuthState';
import { UserRole } from '@/types/user';

const MOCK_USER_ID = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { loading, setLoading, user, setUser, profile, setProfile } = useAuthState();

  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('メールアドレスとパスワードを入力してください');
    }

    // For demo purposes, accept any non-empty email/password
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
  };

  const signUp = async (email: string, password: string): Promise<boolean> => {
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
        return true;
      }
      return false;
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      toast({
        title: "ログアウト完了",
        description: "ログアウトしました",
      });
      navigate('/');
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
