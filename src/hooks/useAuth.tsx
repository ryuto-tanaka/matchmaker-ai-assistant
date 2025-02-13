
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface UserProfile {
  id: string;
  company_name: string | null;
  contact_name: string | null;
  phone: string | null;
  address: string | null;
  primary_type: 'applicant' | 'provider' | 'expert';
}

// Supabaseエラーメッセージの日本語化
const translateError = (error: string): string => {
  const errorMessages: { [key: string]: string } = {
    'Invalid login credentials': 'メールアドレスまたはパスワードが正しくありません',
    'Email not confirmed': 'メールアドレスが確認されていません',
    'User already registered': 'このメールアドレスは既に登録されています',
    'Password should be at least 6 characters': 'パスワードは6文字以上で入力してください',
    'Email format is invalid': 'メールアドレスの形式が正しくありません',
    'For security purposes, you can only request this after 14 seconds': 'セキュリティのため、14秒後に再度お試しください',
    'over_email_send_rate_limit': 'メール送信の制限に達しました。しばらく待ってから再度お試しください',
  };
  return errorMessages[error] || error;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [signUpCooldown, setSignUpCooldown] = useState(false);
  const navigate = useNavigate();

  const handleAuthStateChange = useCallback(async (session: any) => {
    setUser(session?.user ?? null);
    if (session?.user) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;

        setProfile(data);

        // プロフィールの状態に応じてリダイレクト
        if (window.location.pathname === '/login') {
          if (data.company_name) {
            // プロフィールが完全な場合、ダッシュボードへ
            navigate(`/dashboard/${data.primary_type}`);
          } else {
            // プロフィールが不完全な場合、プロフィール設定へ
            navigate('/profile-setup');
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "エラー",
          description: "プロフィールの取得に失敗しました",
          variant: "destructive",
        });
        // エラー時はログインページへリダイレクト
        if (window.location.pathname !== '/login') {
          navigate('/login');
        }
      }
    } else {
      setProfile(null);
      // 未認証状態でprotectedルートにアクセスした場合、ログインページへリダイレクト
      const protectedRoutes = ['/dashboard', '/profile-setup'];
      if (protectedRoutes.some(route => window.location.pathname.startsWith(route))) {
        navigate('/login');
      }
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    // 現在のセッションを取得
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuthStateChange(session);
    });

    // 認証状態の変更を監視
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

      // プロフィール情報を取得
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      toast({
        title: "ログイン成功",
        description: "ログインに成功しました",
      });

      // プロフィールの状態に応じて画面遷移
      if (profileData.company_name) {
        navigate(`/dashboard/${profileData.primary_type}`);
      } else {
        navigate('/profile-setup');
      }

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
          setTimeout(() => setSignUpCooldown(false), 15000); // 15秒後にクールダウンを解除
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
