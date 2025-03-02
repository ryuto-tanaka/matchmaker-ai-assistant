
import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType } from '@/types/auth-context';
import { useAuthState } from '@/hooks/useAuthState';
import { UserRole } from '@/types/user';

// Initialize context with undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { loading, setLoading, user, setUser, profile, setProfile } = useAuthState();

  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('メールアドレスとパスワードを入力してください');
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // プロファイル情報を取得するのはuseAuthStateが行うのでここでは何もしない
      toast({
        title: "ログイン成功",
        description: "ダッシュボードに移動します",
      });
      
      if (data.user && profile?.primary_type) {
        navigate(`/dashboard/${profile.primary_type}`);
      } else if (data.user) {
        navigate('/profile-setup');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "ログインエラー",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      if (data.user) {
        toast({
          title: "登録完了",
          description: "アカウントが作成されました",
        });
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: "登録エラー",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // 先にユーザー情報をクリア
      setUser(null);
      setProfile(null);
      
      // その後でトーストとリダイレクトを実行
      toast({
        title: "ログアウト完了",
        description: "ログアウトしました",
      });
      
      // 明示的にリプレースでトップページへリダイレクト
      navigate('/', { replace: true });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "エラー",
        description: "ログアウトに失敗しました",
        variant: "destructive",
      });
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

  // Ensure value is properly typed
  const contextValue: AuthContextType = value;

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the hook with proper type checking
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
