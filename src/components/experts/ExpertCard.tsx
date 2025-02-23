
import React from 'react';
import { User, Star, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Expert } from '@/types/expert';

interface ExpertCardProps {
  expert?: Expert;
  isLoading?: boolean;
  error?: string;
  onConsultationRequest: (expertId: string, expertName: string) => void;
}

export const ExpertCard = ({ expert, isLoading, error, onConsultationRequest }: ExpertCardProps) => {
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
            <Skeleton className="h-9 w-20" />
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

  if (!expert) {
    return null;
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
          <Button onClick={() => onConsultationRequest(expert.id, expert.name)}>
            相談する
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
