
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';
import { transformProfileData } from '@/utils/profile-utils';

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<null | { id: string; email: string }>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email!,
        });

        // プロフィール情報を取得
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileData) {
          const transformedProfile = transformProfileData(profileData);
          setProfile(transformedProfile);
        }

        toast({
          title: "ログイン成功",
          description: "ダッシュボードに移動します",
        });
        navigate('/dashboard/applicant');
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
        setUser({
          id: data.user.id,
          email: data.user.email!,
        });

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

      setUser(null);
      setProfile(null);
      
      toast({
        title: "ログアウト完了",
        description: "ログアウトしました",
      });
      navigate('/');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "エラー",
        description: "ログアウトに失敗しました",
        variant: "destructive",
      });
    }
  };

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  };
};
