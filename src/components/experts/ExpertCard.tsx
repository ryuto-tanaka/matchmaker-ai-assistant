
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Expert } from '@/types/expert';
import { useNavigate } from 'react-router-dom';
import { ExpertCardSkeleton } from './ExpertCardSkeleton';
import { ExpertCardError } from './ExpertCardError';
import { ExpertInfo } from './ExpertInfo';
import { ExpertActions } from './ExpertActions';
import { useExpertFavorite } from '@/hooks/useExpertFavorite';

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

  const { isFavorite, toggleFavorite } = useExpertFavorite(expert?.id || '');

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
            isFavorite={isFavorite}
            onFavoriteToggle={toggleFavorite}
            onMessageClick={handleMessageClick}
            onConsultationRequest={() => onConsultationRequest(expert.id, expert.name)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
