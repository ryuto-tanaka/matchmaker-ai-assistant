
export interface ServiceIndustry {
  large_category: string;
  medium_category?: string;
  small_category?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  industry_categories: ServiceIndustry;
  provider_name: string;
  provider_id: string;
  rating?: number;
  service_area?: string[];
  completed_projects?: number;
  start_date?: string;
  available_hours?: {
    weekdays: string[];
    hours: string[];
  };
}
