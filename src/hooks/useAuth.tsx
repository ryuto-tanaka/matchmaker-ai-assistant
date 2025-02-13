
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { translateError } from '@/utils/authErrorMessages';
import { useProfile } from '@/hooks/useProfile';

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signUpCooldown, setSignUpCooldown] = useState(false);
  const { profile, setProfile, fetchProfile, handleProfileNavigation } = useProfile();

  const handleAuthStateChange = useCallback(async (session: any) => {
    setUser(session?.user ?? null);
    if (session?.user) {
      try {
        const profileData = await fetchProfile(session.user.id);
        handleProfileNavigation(profileData);
      } catch (error) {
        if (window.location.pathname !== '/login') {
          navigate('/login');
        }
      }
    } else {
      setProfile(null);
      const protectedRoutes = ['/dashboard', '/profile-setup'];
      if (protectedRoutes.some(route => window.location.pathname.startsWith(route))) {
        navigate('/login');
      }
    }
    setLoading(false);
  }, [navigate, fetchProfile, handleProfileNavigation, setProfile]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuthStateChange(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      handleAuthStateChange(session);
    });

    return () => subscription.unsubscribe();
  }, [handleAuthStateChange]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const profileData = await fetchProfile(data.user.id);
      
      toast({
        title: "ログイン成功",
        description: "ログインに成功しました",
      });

      handleProfileNavigation(profileData);
    } catch (error: any) {
      toast({
        title: "ログインエラー",
        description: translateError(error.message) || "ログインに失敗しました",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    if (signUpCooldown) {
      toast({
        title: "送信制限",
        description: "セキュリティのため、しばらく待ってから再度お試しください",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('14 seconds') || error.message.includes('rate_limit')) {
          setSignUpCooldown(true);
          setTimeout(() => setSignUpCooldown(false), 15000);
        }
        throw error;
      }

      toast({
        title: "登録完了",
        description: "メールアドレスの確認メールを送信しました。メールの内容に従って登録を完了してください。",
      });

      return data;
    } catch (error: any) {
      const errorMessage = error.message || error.error_description || "登録に失敗しました";
      toast({
        title: "登録エラー",
        description: translateError(errorMessage),
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
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "ログアウト完了",
        description: "ログアウトしました",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "エラー",
        description: translateError(error.message) || "ログアウトに失敗しました",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
