
import { useState, useEffect } from 'react';
import { UserRole } from '@/types/user';
import { UserProfile } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { transformProfileData } from '@/utils/profile-utils';

export const useAuthState = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; email: string; role?: UserRole } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session?.user) {
          // プロファイルデータを取得してからユーザー情報を設定
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profileData) {
            const transformedProfile = transformProfileData(profileData);
            setProfile(transformedProfile);
            setUser({
              id: session.user.id,
              email: session.user.email!,
              role: profileData.primary_type as UserRole
            });
          } else {
            setUser({
              id: session.user.id,
              email: session.user.email!
            });
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // 認証状態が変更された時もプロファイルを取得
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profileData) {
          const transformedProfile = transformProfileData(profileData);
          setProfile(transformedProfile);
          setUser({
            id: session.user.id,
            email: session.user.email!,
            role: profileData.primary_type as UserRole
          });
        } else {
          setUser({
            id: session.user.id,
            email: session.user.email!
          });
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    loading,
    setLoading,
    user,
    setUser,
    profile,
    setProfile
  };
};
