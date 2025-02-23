
import React from 'react';
import { User, Star, MessageSquare, AlertCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Expert } from '@/types/expert';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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

  // Fetch favorite status
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
        // Remove from favorites
        await supabase
          .from('favorite_experts')
          .delete()
          .eq('user_id', user.id)
          .eq('expert_id', expert.id);
        
        toast({
          description: "お気に入りから削除しました",
        });
      } else {
        // Add to favorites
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
      // Invalidate favorites query to refresh the UI
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
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
                <div className="flex items-center mt-2 space-x-4">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            </div>
            <div className="space-x-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{expert.name}</h3>
              <p className="text-sm text-gray-500">{expert.title}</p>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm">{expert.rating}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm">{expert.consultations}件の相談</span>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {expert.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFavoriteToggle}
              className={isFavorite ? "text-red-500" : "text-gray-500"}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              {isFavorite ? "お気に入り済み" : "お気に入り"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleMessageClick}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              メッセージ
            </Button>
            <Button 
              onClick={() => onConsultationRequest(expert.id, expert.name)}
            >
              相談する
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
