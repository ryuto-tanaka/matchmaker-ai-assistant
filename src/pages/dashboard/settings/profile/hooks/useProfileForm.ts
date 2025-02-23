
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { ProfileFormValues, IndustryData } from '../types';
import { targetIndustries } from '@/data/industries';

export const useProfileForm = (user: any, profile: any) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      company_name: profile?.company_name || '',
      contact_name: profile?.contact_name || '',
      phone: profile?.phone || '',
      address: profile?.address || '',
      industry: '',
      industry_subcategory: '',
      industry_detail: '',
    }
  });

  const selectedIndustryData = targetIndustries.find(
    industry => industry.name === selectedIndustry
  );

  const subcategories = selectedIndustryData?.subcategories || [];
  const selectedSubcategoryData = subcategories.find(
    subcat => subcat.name === selectedSubcategory
  );
  const detailCategories = selectedSubcategoryData?.subcategories || [];

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      const industryData: Record<string, any> | null = selectedIndustry ? { name: selectedIndustry } : null;
      const subcategoryData: Record<string, any> | null = selectedSubcategory ? { name: selectedSubcategory } : null;
      const detailData: Record<string, any> | null = data.industry_detail ? { name: data.industry_detail } : null;

      const { error } = await supabase
        .from('profiles')
        .update({
          company_name: data.company_name,
          contact_name: data.contact_name,
          phone: data.phone,
          address: data.address,
          industry: industryData,
          industry_subcategory: subcategoryData,
          industry_detail: detailData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "更新完了",
        description: "プロフィール情報を更新しました",
      });
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: "エラー",
        description: "プロフィールの更新に失敗しました",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    selectedIndustry,
    setSelectedIndustry,
    selectedSubcategory,
    setSelectedSubcategory,
    subcategories,
    detailCategories,
    onSubmit
  };
};
