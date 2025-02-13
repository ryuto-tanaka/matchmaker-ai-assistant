
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
    const currentUser = session?.user ?? null;
    setUser(currentUser);

    try {
      if (currentUser) {
        const profileData = await fetchProfile(currentUser.id);
        const currentPath = window.location.pathname;
        
        // protectedRoutesでない場合は、ナビゲーションをスキップ
        const publicRoutes = ['/', '/login', '/register'];
        if (!publicRoutes.includes(currentPath)) {
          handleProfileNavigation(profileData, currentPath);
        }
      } else {
        setProfile(null);
        const protectedRoutes = ['/dashboard', '/profile-setup'];
        if (protectedRoutes.some(route => window.location.pathname.startsWith(route))) {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Auth state change error:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate, fetchProfile, handleProfileNavigation, setProfile]);

  useEffect(() => {
    let isSubscribed = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (isSubscribed) {
          await handleAuthStateChange(session);
        }
      } catch (error) {
        console.error('Initialize auth error:', error);
        if (isSubscribed) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (isSubscribed) {
        await handleAuthStateChange(session);
      }
    });

    return () => {
      isSubscribed = false;
      subscription.unsubscribe();
    };
  }, [handleAuthStateChange]);

  const signIn = async (email: string, password: string) => {
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

      handleProfileNavigation(profileData, '/login');
    } catch (error: any) {
      toast({
        title: "ログインエラー",
        description: translateError(error.message) || "ログインに失敗しました",
        variant: "destructive",
      });
      throw error;
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

      if (data.user) {
        navigate('/profile-setup');
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
    }
  };

  const signOut = async () => {
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
