
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthContext } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { targetIndustries } from '@/data/industries';

interface ProfileFormValues {
  company_name: string;
  contact_name: string;
  phone: string;
  address: string;
  industry: string;
  industry_subcategory: string;
  industry_detail: string;
}

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedIndustry, setSelectedIndustry] = React.useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<string>('');

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

  React.useEffect(() => {
    if (profile?.industry) {
      const industryData = JSON.parse(profile.industry as string);
      setSelectedIndustry(industryData.name || '');
      if (profile.industry_subcategory) {
        const subcategoryData = JSON.parse(profile.industry_subcategory as string);
        setSelectedSubcategory(subcategoryData.name || '');
      }
    }
  }, [profile]);

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
      const industryData = selectedIndustry ? { name: selectedIndustry } : null;
      const subcategoryData = selectedSubcategory ? { name: selectedSubcategory } : null;
      const detailData = data.industry_detail ? { name: data.industry_detail } : null;

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

  return (
    <DashboardLayout
      userType="applicant"
      userName={profile?.company_name || user?.email || 'ユーザー'}
    >
      <div className="space-y-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="mr-4"
            onClick={() => navigate('/dashboard/settings')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">プロフィール設定</h1>
            <p className="text-muted-foreground">
              会社情報や連絡先などの基本情報を管理します
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>会社名</FormLabel>
                    <FormControl>
                      <Input placeholder="株式会社〇〇" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>担当者名</FormLabel>
                    <FormControl>
                      <Input placeholder="山田 太郎" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>電話番号</FormLabel>
                    <FormControl>
                      <Input placeholder="03-xxxx-xxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>住所</FormLabel>
                    <FormControl>
                      <Input placeholder="東京都〇〇区..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormItem>
                  <FormLabel>業種</FormLabel>
                  <Select
                    value={selectedIndustry}
                    onValueChange={setSelectedIndustry}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="業種を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {targetIndustries.map((industry) => (
                        <SelectItem key={industry.name} value={industry.name}>
                          {industry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>

                {selectedIndustry && (
                  <FormItem>
                    <FormLabel>業種カテゴリー</FormLabel>
                    <Select
                      value={selectedSubcategory}
                      onValueChange={setSelectedSubcategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="カテゴリーを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategories.map((subcat) => (
                          <SelectItem key={subcat.name} value={subcat.name}>
                            {subcat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}

                {selectedSubcategory && (
                  <FormField
                    control={form.control}
                    name="industry_detail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>詳細カテゴリー</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="詳細カテゴリーを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            {detailCategories.map((detail) => (
                              <SelectItem key={detail.name} value={detail.name}>
                                {detail.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? '更新中...' : '変更を保存'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
};

export default ProfileSettings;
