import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Bell } from 'lucide-react';
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useAuthContext } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';

interface NotificationFormValues {
  email_enabled: boolean;
  app_notifications_enabled: boolean;
  marketing_emails_enabled: boolean;
  deadline_reminders_enabled: boolean;
}

const NotificationSettings = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<NotificationFormValues>({
    defaultValues: {
      email_enabled: true,
      app_notifications_enabled: true,
      marketing_emails_enabled: false,
      deadline_reminders_enabled: true,
    }
  });

  const onSubmit = async (data: NotificationFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          email_enabled: data.email_enabled,
          app_notifications_enabled: data.app_notifications_enabled,
          marketing_emails_enabled: data.marketing_emails_enabled,
          deadline_reminders_enabled: data.deadline_reminders_enabled,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "更新完了",
        description: "通知設定を更新しました",
      });
    } catch (error: any) {
      console.error('Notification settings update error:', error);
      toast({
        title: "エラー",
        description: "設定の更新に失敗しました",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            <h1 className="text-2xl font-bold tracking-tight">通知設定</h1>
            <p className="text-muted-foreground">
              メールやアプリ内の通知設定を管理します
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>メール通知</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="email_enabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">重要な通知をメールで受け取る</FormLabel>
                        <FormDescription>
                          申請状況の更新や重要なお知らせをメールで受け取ります
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
                  name="marketing_emails_enabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">マーケティングメール</FormLabel>
                        <FormDescription>
                          新機能や関連サービスの情報を受け取ります
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

            <Card>
              <CardHeader>
                <CardTitle>アプリ内通知</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="app_notifications_enabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">アプリ内通知を有効にする</FormLabel>
                        <FormDescription>
                          アプリ内でリアルタイムの通知を受け取ります
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
                  name="deadline_reminders_enabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">期限リマインダー</FormLabel>
                        <FormDescription>
                          申請期限が近づいた際にリマインダーを表示します
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
    </DashboardLayout>
  );
};

export default NotificationSettings;
