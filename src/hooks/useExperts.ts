
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Expert } from '@/types/expert';

export const useExperts = () => {
  return useQuery({
    queryKey: ['experts'],
    queryFn: async (): Promise<Expert[]> => {
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching experts:', error);
        throw new Error('専門家データの取得に失敗しました');
      }

      return data || [];
    },
  });
};
