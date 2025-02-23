
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { UserProfile, IndustryData } from '@/types/auth';

const parseIndustryData = (data: any): IndustryData | null => {
  if (!data) return null;
  try {
    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
    return parsed?.name ? { name: parsed.name } : null;
  } catch {
    return null;
  }
};

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
      
      if (data) {
        const transformedData: UserProfile = {
          id: data.id,
          company_name: data.company_name,
          contact_name: data.contact_name,
          phone: data.phone,
          address: data.address,
          primary_type: data.primary_type,
          industry: parseIndustryData(data.industry),
          industry_subcategory: parseIndustryData(data.industry_subcategory),
          industry_detail: parseIndustryData(data.industry_detail),
        };
        setProfile(transformedData);
        return transformedData;
      }
      return null;
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

  const handleProfileNavigation = (profileData: UserProfile | null, currentPath: string) => {
    if (!profileData) {
      navigate('/profile-setup');
      return;
    }

    if (!profileData.company_name || !profileData.primary_type) {
      if (currentPath !== '/profile-setup') {
        navigate('/profile-setup');
      }
      return;
    }

    if (currentPath === '/login' || currentPath === '/profile-setup') {
      navigate(`/dashboard/${profileData.primary_type}`);
    }
  };

  return {
    profile,
    setProfile,
    fetchProfile,
    handleProfileNavigation,
  };
};
