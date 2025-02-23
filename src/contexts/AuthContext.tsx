
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { UserProfile, IndustryData } from '@/types/auth';
import { UserRole } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';

const MOCK_USER_ID = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

type AuthContextType = {
  user: { id: string; email: string; role?: UserRole } | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const parseIndustryData = (data: any): IndustryData | null => {
  if (!data) return null;
  try {
    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
    return parsed?.name ? { name: parsed.name } : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; email: string; role?: UserRole } | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const transformProfileData = (profileData: any): UserProfile => {
    return {
      id: profileData.id,
      company_name: profileData.company_name,
      contact_name: profileData.contact_name,
      phone: profileData.phone,
      address: profileData.address,
      primary_type: profileData.primary_type,
      industry: parseIndustryData(profileData.industry),
      industry_subcategory: parseIndustryData(profileData.industry_subcategory),
      industry_detail: parseIndustryData(profileData.industry_detail),
    };
  };

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

  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('メールアドレスとパスワードを入力してください');
    }

    // For demo purposes, accept any non-empty email/password
    const mockUser = { id: MOCK_USER_ID, email, role: UserRole.APPLICANT };
    setUser(mockUser);
    setProfile({
      id: mockUser.id,
      company_name: null,
      contact_name: null,
      phone: null,
      address: null,
      primary_type: 'applicant'
    });
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (email && password) {
        const mockUser = { id: MOCK_USER_ID, email, role: UserRole.APPLICANT };
        setUser(mockUser);
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
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      toast({
        title: "ログアウト完了",
        description: "ログアウトしました",
      });
      navigate('/');
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

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
