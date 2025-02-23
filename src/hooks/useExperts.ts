
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Expert } from '@/types/expert';
import { toast } from '@/components/ui/use-toast';

interface QueryError {
  code: string;
  details: string;
  hint: string;
  message: string;
}

export const useExperts = () => {
  return useQuery({
    queryKey: ['experts'],
    queryFn: async (): Promise<Expert[]> => {
      try {
        const { data, error } = await supabase
          .from('experts')
          .select('*')
          .eq('status', 'active');

        if (error) {
          // Log the detailed error for debugging
          console.error('Error fetching experts:', error);

          // Handle specific error cases
          const queryError = error as QueryError;
          switch (queryError.code) {
            case '42P01': // undefined_table
              toast({
                title: 'データベースエラー',
                description: 'エキスパートテーブルが見つかりません。システム管理者に連絡してください。',
                variant: 'destructive',
              });
              throw new Error('テーブルが見つかりません');

            case '28P01': // invalid_password
            case '28000': // invalid_authorization
              toast({
                title: '認証エラー',
                description: 'データベースへのアクセス権限がありません。再度ログインしてください。',
                variant: 'destructive',
              });
              throw new Error('認証エラー');

            case '23505': // unique_violation
            case '23503': // foreign_key_violation
              toast({
                title: 'データ整合性エラー',
                description: 'データの整合性に問題が発生しました。システム管理者に連絡してください。',
                variant: 'destructive',
              });
              throw new Error('データ整合性エラー');

            default:
              // Generic network or connection errors
              if (queryError.message.includes('network') || queryError.message.includes('connection')) {
                toast({
                  title: '接続エラー',
                  description: 'ネットワーク接続を確認してください。',
                  variant: 'destructive',
                });
                throw new Error('ネットワークエラー');
              }

              // Fallback error message for unknown errors
              toast({
                title: 'エラーが発生しました',
                description: '専門家データの取得に失敗しました。しばらく経ってからもう一度お試しください。',
                variant: 'destructive',
              });
              throw new Error('データ取得エラー');
          }
        }

        return data || [];
      } catch (error) {
        // Handle unexpected errors that weren't caught by the Supabase error handling
        console.error('Unexpected error:', error);
        toast({
          title: '予期せぬエラー',
          description: '予期せぬエラーが発生しました。しばらく経ってからもう一度お試しください。',
          variant: 'destructive',
        });
        throw error;
      }
    },
    // Add toast notifications for retries
    meta: {
      onError: (error: Error) => {
        // This will show when all retries have failed
        toast({
          title: 'データ取得失敗',
          description: '専門家データの取得に失敗しました。ページを更新してもう一度お試しください。',
          variant: 'destructive',
        });
      }
    },
    // Add retry configuration
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
