
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { z } from "zod";

// バリデーションスキーマの定義
const profileSchema = z.object({
  company_name: z.string().min(1, "会社名を入力してください"),
  contact_name: z.string().min(1, "担当者名を入力してください"),
  phone: z.string()
    .min(1, "電話番号を入力してください")
    .regex(/^(0\d{1,4}-?\d{1,4}-?\d{4})$/, "正しい電話番号の形式で入力してください"),
  address: z.string().min(1, "住所を入力してください"),
});

const ProfileSetup = () => {
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

  const validateForm = () => {
    try {
      profileSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!user) {
      toast({
        title: "エラー",
        description: "ユーザー情報が見つかりません。再度ログインしてください。",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...formData,
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
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: "エラー",
        description: error.message || "プロフィールの保存に失敗しました",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="container max-w-lg mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>

        <Card className="w-full">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">プロフィール設定</h1>
              <p className="text-sm text-gray-600">
                基本情報を入力してください
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company_name">会社名</Label>
                <Input
                  id="company_name"
                  placeholder="株式会社〇〇"
                  value={formData.company_name}
                  onChange={handleChange}
                  aria-invalid={!!validationErrors.company_name}
                />
                {validationErrors.company_name && (
                  <p className="text-sm text-red-500">{validationErrors.company_name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_name">担当者名</Label>
                <Input
                  id="contact_name"
                  placeholder="山田 太郎"
                  value={formData.contact_name}
                  onChange={handleChange}
                  aria-invalid={!!validationErrors.contact_name}
                />
                {validationErrors.contact_name && (
                  <p className="text-sm text-red-500">{validationErrors.contact_name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">電話番号</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="03-xxxx-xxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  aria-invalid={!!validationErrors.phone}
                />
                {validationErrors.phone && (
                  <p className="text-sm text-red-500">{validationErrors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">住所</Label>
                <Input
                  id="address"
                  placeholder="東京都〇〇区..."
                  value={formData.address}
                  onChange={handleChange}
                  aria-invalid={!!validationErrors.address}
                />
                {validationErrors.address && (
                  <p className="text-sm text-red-500">{validationErrors.address}</p>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? '保存中...' : '登録を完了する'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;
