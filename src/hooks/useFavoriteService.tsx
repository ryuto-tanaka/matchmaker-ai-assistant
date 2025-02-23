
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useFavoriteService = (serviceId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: isFavorite } = useQuery({
    queryKey: ['favorite-services', serviceId, user?.id],
    queryFn: async () => {
      if (!user?.id || !serviceId) return false;
      const { data } = await supabase
        .from('favorite_services')
        .select('id')
        .eq('user_id', user.id)
        .eq('service_id', serviceId)
        .single();
      return !!data;
    },
    enabled: !!user?.id && !!serviceId,
  });

  const toggleFavorite = async () => {
    if (!user?.id || !serviceId) return;

    try {
      if (isFavorite) {
        await supabase
          .from('favorite_services')
          .delete()
          .eq('user_id', user.id)
          .eq('service_id', serviceId);
        
        toast({
          description: "お気に入りから削除しました",
        });
      } else {
        await supabase
          .from('favorite_services')
          .insert({
            user_id: user.id,
            service_id: serviceId,
          });
        
        toast({
          description: "お気に入りに追加しました",
        });
      }
      queryClient.invalidateQueries({ queryKey: ['favorite-services', serviceId, user.id] });
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
