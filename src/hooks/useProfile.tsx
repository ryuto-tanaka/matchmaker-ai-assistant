
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { UserProfile } from '@/types/auth';

export const useProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        console.log('No profile found for user:', userId);
        return null;
      }

      setProfile(data);
      return data;
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      toast({
        title: "エラー",
        description: "プロフィールの取得に失敗しました",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleProfileNavigation = (profileData: UserProfile | null) => {
    if (window.location.pathname === '/login') {
      if (!profileData?.company_name) {
        navigate('/profile-setup');
      } else {
        navigate(`/dashboard/${profileData.primary_type}`);
      }
    }
  };

  return {
    profile,
    setProfile,
    fetchProfile,
    handleProfileNavigation,
  };
};
