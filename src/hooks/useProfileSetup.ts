
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { profileSchema } from '@/validations/profileSchema';
import { z } from 'zod';

export const useProfileSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    company_name: profile?.company_name || '',
    contact_name: profile?.contact_name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "セッションエラー",
          description: "ログインが必要です",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }
      
      if (profile?.company_name && profile?.primary_type) {
        navigate(`/dashboard/${profile.primary_type}`);
      }
    };

    checkAuth();
  }, [user, profile, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    if (validationErrors[id]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "エラー",
        description: "ユーザー情報が見つかりません。再度ログインしてください。",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    try {
      const validatedData = profileSchema.parse(formData);
      
      setIsSubmitting(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          ...validatedData,
          primary_type: location.state?.userType || profile?.primary_type,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "保存完了",
        description: "プロフィール情報を保存しました",
      });

      const userType = location.state?.userType || profile?.primary_type;
      if (userType) {
        navigate(`/dashboard/${userType}`);
      }
    } catch (error) {
      console.error('Profile update error:', error);
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setValidationErrors(errors);
      } else {
        toast({
          title: "エラー",
          description: "プロフィールの保存に失敗しました",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    validationErrors,
    handleChange,
    handleSubmit
  };
};
