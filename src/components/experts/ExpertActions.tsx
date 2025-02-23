
import React from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExpertActionsProps {
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onMessageClick: () => void;
  onConsultationRequest: () => void;
}

export const ExpertActions = ({
  isFavorite,
  onFavoriteToggle,
  onMessageClick,
  onConsultationRequest,
}: ExpertActionsProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onFavoriteToggle}
        className={isFavorite ? "text-red-500" : "text-gray-500"}
      >
        <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        {isFavorite ? "お気に入り済み" : "お気に入り"}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onMessageClick}
      >
        <MessageSquare className="h-4 w-4 mr-1" />
        メッセージ
      </Button>
      <Button onClick={onConsultationRequest}>
        相談する
      </Button>
    </div>
  );
};
