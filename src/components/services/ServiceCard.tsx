
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store, Star, MessageSquare, MapPin, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavoriteService } from '@/hooks/useFavoriteService';
import { format } from 'date-fns';
import { Service } from '@/types/service';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavoriteService(service.id);

  const handleMessageClick = () => {
    navigate(`/dashboard/messages/provider/${service.provider_id}`);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-sm text-gray-500">{service.provider_name}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={isFavorite ? "default" : "outline"}
                size="sm"
                onClick={toggleFavorite}
              >
                <Star className="h-4 w-4 mr-1" />
                お気に入り
              </Button>
              <Button variant="outline" size="sm" onClick={handleMessageClick}>
                <MessageSquare className="h-4 w-4 mr-1" />
                メッセージ
              </Button>
              <Button size="sm">
                <Store className="h-4 w-4 mr-1" />
                詳細を見る
              </Button>
            </div>
          </div>

          <p className="text-sm">{service.description}</p>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            {service.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>{service.rating.toFixed(1)}</span>
              </div>
            )}
            {service.completed_projects !== undefined && (
              <div>
                実績: {service.completed_projects}件
              </div>
            )}
          </div>

          {service.service_area && service.service_area.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{service.service_area.join(', ')}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm">
            {service.start_date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>開始可能日: {format(new Date(service.start_date), 'yyyy/MM/dd')}</span>
              </div>
            )}
            {service.available_hours && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>
                  対応時間: {service.available_hours.weekdays.join(', ')} 
                  {service.available_hours.hours.join(', ')}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{service.industry_categories.large_category}</Badge>
            {service.industry_categories.medium_category && (
              <Badge variant="outline">{service.industry_categories.medium_category}</Badge>
            )}
            {service.industry_categories.small_category && (
              <Badge variant="outline">{service.industry_categories.small_category}</Badge>
            )}
            <Badge variant="outline">¥{service.price.toLocaleString()}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
