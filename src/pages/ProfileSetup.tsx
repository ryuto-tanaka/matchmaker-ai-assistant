
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company_name: profile?.company_name || '',
    contact_name: profile?.contact_name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "エラー",
        description: "ユーザー情報が見つかりません。再度ログインしてください。",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...formData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "保存完了",
        description: "プロフィール情報を保存しました",
      });

      // プロフィールのタイプに基づいてダッシュボードにリダイレクト
      if (profile?.primary_type) {
        navigate(`/dashboard/${profile.primary_type}`);
      }
    } catch (error: any) {
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
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_name">担当者名</Label>
                <Input
                  id="contact_name"
                  placeholder="山田 太郎"
                  value={formData.contact_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">電話番号</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="03-xxxx-xxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">住所</Label>
                <Input
                  id="address"
                  placeholder="東京都〇〇区..."
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
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
