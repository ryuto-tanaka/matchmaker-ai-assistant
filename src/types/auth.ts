
export interface IndustryData {
  name: string;
}

export interface UserProfile {
  id: string;
  company_name: string | null;
  contact_name: string | null;
  phone: string | null;
  address: string | null;
  primary_type: string | null;
  industry?: IndustryData | null;
  industry_subcategory?: IndustryData | null;
  industry_detail?: IndustryData | null;
}
