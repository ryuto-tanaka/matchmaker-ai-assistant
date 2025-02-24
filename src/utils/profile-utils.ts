
import { IndustryData } from '@/types/auth';

export const parseIndustryData = (data: any): IndustryData | null => {
  if (!data) return null;
  try {
    const parsed = typeof data === 'string' ? JSON.parse(data) : data;
    return parsed?.name ? { name: parsed.name } : null;
  } catch {
    return null;
  }
};

export const transformProfileData = (profileData: any) => {
  return {
    id: profileData.id,
    company_name: profileData.company_name,
    contact_name: profileData.contact_name,
    phone: profileData.phone,
    address: profileData.address,
    primary_type: profileData.primary_type,
    industry: parseIndustryData(profileData.industry),
    industry_subcategory: parseIndustryData(profileData.industry_subcategory),
    industry_detail: parseIndustryData(profileData.industry_detail),
  };
};

