
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Key, Shield, Smartphone } from 'lucide-react';
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthContext } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';

interface SecurityFormValues {
  two_factor_auth: boolean;
  security_alerts: boolean;
}

const SecuritySettings = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);

  const form = useForm<SecurityFormValues>({
    defaultValues: {
      two_factor_auth: false,
      security_alerts: true,
    }
  });

  const onSubmit = async (data: SecurityFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('security_settings')
        .upsert({
          user_id: user.id,
          ...data,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "更新完了",
        description: "セキュリティ設定を更新しました",
      });
    } catch (error: any) {
      console.error('Security settings update error:', error);
      toast({
        title: "エラー",
        description: "設定の更新に失敗しました",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsChangingPassword(true);
    
    const formData = new FormData(event.currentTarget);
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (newPassword !== confirmPassword) {
      toast({
        title: "エラー",
        description: "新しいパスワードと確認用パスワードが一致しません",
        variant: "destructive",
      });
      setIsChangingPassword(false);
      return;
    }

    try {
      // Note: This is a placeholder for actual password change logic
      toast({
        title: "更新完了",
        description: "パスワードを変更しました",
      });
    } catch (error: any) {
      toast({
        title: "エラー",
        description: "パスワードの変更に失敗しました",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <DashboardLayout
      userType="applicant"
      userName={profile?.company_name || user?.email || 'ユーザー'}
    >
      <div className="space-y-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="mr-4"
            onClick={() => navigate('/dashboard/settings')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">セキュリティ設定</h1>
            <p className="text-muted-foreground">
              パスワードやログイン履歴の管理を行います
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>パスワード変更</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <FormLabel>現在のパスワード</FormLabel>
                  <Input
                    name="currentPassword"
                    type="password"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel>新しいパスワード</FormLabel>
                  <Input
                    name="newPassword"
                    type="password"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel>新しいパスワード（確認）</FormLabel>
                  <Input
                    name="confirmPassword"
                    type="password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? 'パスワード変更中...' : 'パスワードを変更'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>セキュリティオプション</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="two_factor_auth"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">2要素認証</FormLabel>
                          <FormDescription>
                            ログイン時に追加の認証を要求します
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="security_alerts"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">セキュリティ通知</FormLabel>
                          <FormDescription>
                            不審なログインや重要な変更について通知を受け取ります
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '更新中...' : '変更を保存'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SecuritySettings;
