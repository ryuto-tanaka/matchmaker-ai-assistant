
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
          setUser({
            id: session.user.id,
            email: session.user.email!,
            role: UserRole.APPLICANT
          });
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profileData) {
            setProfile(transformProfileData(profileData));
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
        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: UserRole.APPLICANT
        });
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profileData) {
          setProfile(transformProfileData(profileData));
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

