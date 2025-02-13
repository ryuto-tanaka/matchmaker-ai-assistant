
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { UserProfile } from '@/types/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<null | { id: string; email: string }>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // モック認証: 実際のSupabase認証の代わり
      if (email && password) {
        const mockUser = { id: '1', email };
        setUser(mockUser);
        // モックプロフィールも設定
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
        const mockUser = { id: '1', email };
        setUser(mockUser);
        // 新規ユーザー用の空のプロフィールを設定
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

  return {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  };
};
