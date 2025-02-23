
import React from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface SecurityFormValues {
  two_factor_auth: boolean;
  security_alerts: boolean;
}

const SecurityOptionsForm = () => {
  const { user } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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

  return (
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
  );
};

export default SecurityOptionsForm;
