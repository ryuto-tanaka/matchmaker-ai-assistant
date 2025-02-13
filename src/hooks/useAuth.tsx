
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<null | { id: string; email: string }>(null);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // モック認証: 実際のSupabase認証の代わり
      if (email && password) {
        setUser({ id: '1', email });
        toast({
          title: "ログイン成功",
          description: "ログインに成功しました",
        });
        navigate('/dashboard/applicant'); // 仮のリダイレクト
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
      // モックサインアップ
      if (email && password) {
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

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
};
