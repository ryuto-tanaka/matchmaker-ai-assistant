
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, User, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface FavoriteExpertsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FavoriteExpertsDialog = ({ open, onOpenChange }: FavoriteExpertsDialogProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: favoriteExperts = [], isLoading } = useQuery({
    queryKey: ['favorite-experts', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data: favorites, error } = await supabase
        .from('favorite_experts')
        .select(`
          expert_id,
          experts (
            id,
            name,
            title,
            rating,
            consultations
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return favorites.map(f => f.experts) || [];
    },
    enabled: !!user?.id,
  });

  const handleMessageClick = (expertId: string) => {
    onOpenChange(false);
    navigate(`/messages/${expertId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>お気に入りの専門家</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {isLoading ? (
            <div className="text-center py-4">読み込み中...</div>
          ) : favoriteExperts.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              お気に入りの専門家がいません。
            </div>
          ) : (
            favoriteExperts.map(expert => (
              <Card key={expert.id}>
                <CardContent className="p-4">
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
                      </div>
                    </div>
                    <Button
                      onClick={() => handleMessageClick(expert.id)}
                      variant="outline"
                      size="sm"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      メッセージ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FavoriteExpertsDialog;
