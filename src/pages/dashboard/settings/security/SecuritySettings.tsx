
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

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const SecuritySettings = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isChangingPassword, setIsChangingPassword] = React.useState(false);

  const securityForm = useForm<SecurityFormValues>({
    defaultValues: {
      two_factor_auth: false,
      security_alerts: true,
    }
  });

  const passwordForm = useForm<PasswordFormValues>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  });

  const onSubmit = async (data: SecurityFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          two_factor_auth: data.two_factor_auth,
          security_alerts: data.security_alerts,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

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

  const handlePasswordChange = async (data: PasswordFormValues) => {
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: "エラー",
        description: "新しいパスワードと確認用パスワードが一致しません",
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(true);
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
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>現在のパスワード</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>新しいパスワード</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>新しいパスワード（確認）</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isChangingPassword}
                  >
                    {isChangingPassword ? 'パスワード変更中...' : 'パスワードを変更'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Form {...securityForm}>
            <form onSubmit={securityForm.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>セキュリティオプション</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={securityForm.control}
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
                    control={securityForm.control}
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
