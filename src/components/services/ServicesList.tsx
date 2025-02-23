
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ServiceCard from './ServiceCard';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Helper function to extract price number from price_range string
const extractPrice = (priceRange: string | null): number => {
  if (!priceRange) return 0;
  // Assuming price_range format is like "¥10000" or "10000"
  const match = priceRange.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

const ServicesList = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          provider:profiles!services_user_id_fkey(company_name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      // Transform the data to match ServiceCard props
      return data.map(service => ({
        id: service.id,
        name: service.name,
        description: service.description,
        price: extractPrice(service.price_range),
        category: service.category,
        provider_name: service.provider?.company_name || '企業名なし', // Default if no company name
      }));
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {services?.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServicesList;
