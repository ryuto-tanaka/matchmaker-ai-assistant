
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useExpertFavorite = (expertId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: isFavorite } = useQuery({
    queryKey: ['favorites', expertId, user?.id],
    queryFn: async () => {
      if (!user?.id || !expertId) return false;
      const { data } = await supabase
        .from('favorite_experts')
        .select('id')
        .eq('user_id', user.id)
        .eq('expert_id', expertId)
        .single();
      return !!data;
    },
    enabled: !!user?.id && !!expertId,
  });

  const toggleFavorite = async () => {
    if (!user?.id || !expertId) return;

    try {
      if (isFavorite) {
        await supabase
          .from('favorite_experts')
          .delete()
          .eq('user_id', user.id)
          .eq('expert_id', expertId);
        
        toast({
          description: "お気に入りから削除しました",
        });
      } else {
        await supabase
          .from('favorite_experts')
          .insert({
            user_id: user.id,
            expert_id: expertId,
          });
        
        toast({
          description: "お気に入りに追加しました",
        });
      }
      queryClient.invalidateQueries({ queryKey: ['favorites', expertId, user.id] });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "エラーが発生しました",
        description: "お気に入りの更新に失敗しました。",
      });
    }
  };

  return {
    isFavorite: isFavorite || false,
    toggleFavorite
  };
};
