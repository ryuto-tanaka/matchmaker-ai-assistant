
export interface UserProfile {
  id: string;
  company_name: string | null;
  contact_name: string | null;
  phone: string | null;
  address: string | null;
  primary_type: string | null;
  industry?: string | null;
  industry_subcategory?: string | null;
  industry_detail?: string | null;
}
