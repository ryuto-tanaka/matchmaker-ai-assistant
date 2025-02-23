
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Expert } from '@/types/expert';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ExpertCardSkeleton } from './ExpertCardSkeleton';
import { ExpertCardError } from './ExpertCardError';
import { ExpertInfo } from './ExpertInfo';
import { ExpertActions } from './ExpertActions';

interface LoadingExpertCardProps {
  isLoading: true;
  expert?: undefined;
  error?: undefined;
  onConsultationRequest?: undefined;
}

interface ErrorExpertCardProps {
  isLoading?: undefined;
  expert?: undefined;
  error: string;
  onConsultationRequest?: undefined;
}

interface NormalExpertCardProps {
  isLoading?: undefined;
  expert: Expert;
  error?: undefined;
  onConsultationRequest: (expertId: string, expertName: string) => void;
}

type ExpertCardProps = LoadingExpertCardProps | ErrorExpertCardProps | NormalExpertCardProps;

export const ExpertCard = ({ expert, isLoading, error, onConsultationRequest }: ExpertCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: isFavorite } = useQuery({
    queryKey: ['favorites', expert?.id, user?.id],
    queryFn: async () => {
      if (!user?.id || !expert?.id) return false;
      const { data } = await supabase
        .from('favorite_experts')
        .select('id')
        .eq('user_id', user.id)
        .eq('expert_id', expert.id)
        .single();
      return !!data;
    },
    enabled: !!user?.id && !!expert?.id,
  });

  const handleFavoriteToggle = async () => {
    if (!user?.id || !expert?.id) return;

    try {
      if (isFavorite) {
        await supabase
          .from('favorite_experts')
          .delete()
          .eq('user_id', user.id)
          .eq('expert_id', expert.id);
        
        toast({
          description: "お気に入りから削除しました",
        });
      } else {
        await supabase
          .from('favorite_experts')
          .insert({
            user_id: user.id,
            expert_id: expert.id,
          });
        
        toast({
          description: "お気に入りに追加しました",
        });
      }
      queryClient.invalidateQueries({ queryKey: ['favorites', expert.id, user.id] });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "エラーが発生しました",
        description: "お気に入りの更新に失敗しました。",
      });
    }
  };

  const handleMessageClick = () => {
    if (expert) {
      navigate(`/dashboard/messages/${expert.id}`);
    }
  };

  if (isLoading) {
    return <ExpertCardSkeleton />;
  }

  if (error) {
    return <ExpertCardError error={error} />;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <ExpertInfo expert={expert} />
          <ExpertActions
            isFavorite={isFavorite || false}
            onFavoriteToggle={handleFavoriteToggle}
            onMessageClick={handleMessageClick}
            onConsultationRequest={() => onConsultationRequest(expert.id, expert.name)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
