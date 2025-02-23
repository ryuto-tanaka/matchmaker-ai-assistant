
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ServiceCard from './ServiceCard';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Service } from '@/types/service';

// Define interface for available hours structure
interface AvailableHours {
  weekdays: string[];
  hours: string[];
}

// Helper function to extract price number from price_range string
const extractPrice = (priceRange: string | null): number => {
  if (!priceRange) return 0;
  const match = priceRange.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

// Helper function to safely parse available hours
const parseAvailableHours = (hours: unknown): AvailableHours => {
  if (hours && typeof hours === 'object' && 'weekdays' in hours && 'hours' in hours) {
    return {
      weekdays: Array.isArray((hours as AvailableHours).weekdays) ? (hours as AvailableHours).weekdays : [],
      hours: Array.isArray((hours as AvailableHours).hours) ? (hours as AvailableHours).hours : []
    };
  }
  return { weekdays: [], hours: [] };
};

const ServicesList = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          provider:profiles!services_user_id_fkey(
            id,
            company_name,
            industry,
            industry_subcategory,
            industry_detail
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      // Transform the data to match ServiceCard props
      return data.map(service => {
        const availableHours = parseAvailableHours(service.available_hours);
        const industryData = {
          large_category: service.provider?.industry?.name || '',
          medium_category: service.provider?.industry_subcategory?.name,
          small_category: service.provider?.industry_detail?.name
        };
        
        return {
          id: service.id,
          name: service.name,
          description: service.description,
          price: extractPrice(service.price_range),
          category: service.category,
          industry_categories: industryData,
          provider_name: service.provider?.company_name || '企業名なし',
          provider_id: service.provider?.id || '',
          rating: 4.5, // TODO: Implement actual rating system
          service_area: service.service_area || [],
          completed_projects: service.completed_projects || 0,
          start_date: service.start_date || null,
          available_hours: {
            weekdays: availableHours.weekdays,
            hours: availableHours.hours
          }
        };
      });
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
