
// この訂正はuseAuth.tsxが非推奨になったことを示します。
// 代わりに/src/contexts/AuthContext.tsxのuseAuthContextを使用してください。

// この古いフックの使用をやめて、代わりにuseAuthContextを使用してください。
// 将来的に削除される予定です。

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';
import { transformProfileData } from '@/utils/profile-utils';

export const useAuth = () => {
  console.warn('useAuth hook is deprecated. Use useAuthContext from AuthContext instead.');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<null | { id: string; email: string }>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // 全ての関数は警告メッセージを表示し、useAuthContextを使用するよう促します
  const signIn = async (email: string, password: string) => {
    console.warn('useAuth hook is deprecated. Use useAuthContext from AuthContext instead.');
    // 空の関数になっています - useAuthContextを使用してください
  };

  const signUp = async (email: string, password: string): Promise<boolean> => {
    console.warn('useAuth hook is deprecated. Use useAuthContext from AuthContext instead.');
    return false;
  };

  const signOut = async () => {
    console.warn('useAuth hook is deprecated. Use useAuthContext from AuthContext instead.');
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
