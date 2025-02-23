
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store, Star } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    provider_name: string;
  };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-sm text-gray-500">{service.provider_name}</p>
            </div>
            <p className="text-sm">{service.description}</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{service.category}</Badge>
              <Badge variant="outline">¥{service.price.toLocaleString()}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Star className="h-4 w-4 mr-1" />
              お気に入り
            </Button>
            <Button size="sm">
              <Store className="h-4 w-4 mr-1" />
              詳細を見る
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
