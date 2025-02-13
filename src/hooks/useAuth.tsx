
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { translateError } from '@/utils/authErrorMessages';
import { useProfile } from '@/hooks/useProfile';

// デモ用の自動ログイン情報
const DEMO_EMAIL = 'demo@gmail.com';
const DEMO_PASSWORD = 'Demo123456!';

export const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signUpCooldown, setSignUpCooldown] = useState(false);
  const { profile, setProfile, fetchProfile, handleProfileNavigation } = useProfile();

  // デモ用の自動ログイン関数
  const autoLogin = async () => {
    try {
      console.log('Attempting auto login...');
      
      // まず既存のアカウントでログインを試みる
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
      });

      if (!loginError && loginData.user) {
        console.log('Auto login successful with existing account');
        return loginData;
      }

      console.log('Login failed, attempting to create account...');

      // ログインに失敗した場合は新規登録を試みる
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
        options: {
          emailRedirectTo: window.location.origin,
        }
      });

      if (signUpError) {
        console.error('Sign up failed:', signUpError);
        throw signUpError;
      }

      console.log('Account created successfully, attempting login...');
      
      // 登録後、少し待ってからログインを試みる
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { data: finalLoginData, error: finalLoginError } = await supabase.auth.signInWithPassword({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
      });

      if (finalLoginError) throw finalLoginError;

      console.log('Auto login successful after account creation');
      return finalLoginData;
    } catch (error: any) {
      console.error('Auto login process failed:', error);
      throw error;
    }
  };

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
    const initAuth = async () => {
      console.log('Initializing auth...');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('No session found, attempting auto login...');
        try {
          const data = await autoLogin();
          handleAuthStateChange(data?.session);
        } catch (error) {
          console.error('Auto login failed:', error);
          setLoading(false);
        }
      } else {
        console.log('Existing session found');
        handleAuthStateChange(session);
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
