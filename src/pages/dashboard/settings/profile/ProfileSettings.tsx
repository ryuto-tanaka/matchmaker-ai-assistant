
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuthContext } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useProfileForm } from './hooks/useProfileForm';
import { BasicInfoFields } from './components/BasicInfoFields';
import { IndustryFields } from './components/IndustryFields';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuthContext();
  const {
    form,
    isSubmitting,
    selectedIndustry,
    setSelectedIndustry,
    selectedSubcategory,
    setSelectedSubcategory,
    subcategories,
    detailCategories,
    onSubmit
  } = useProfileForm(user, profile);

  React.useEffect(() => {
    if (profile?.industry) {
      const industryData = JSON.parse(profile.industry as string);
      setSelectedIndustry(industryData.name || '');
      if (profile.industry_subcategory) {
        const subcategoryData = JSON.parse(profile.industry_subcategory as string);
        setSelectedSubcategory(subcategoryData.name || '');
      }
    }
  }, [profile, setSelectedIndustry, setSelectedSubcategory]);

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
              <BasicInfoFields form={form} />
              <IndustryFields
                form={form}
                selectedIndustry={selectedIndustry}
                setSelectedIndustry={setSelectedIndustry}
                selectedSubcategory={selectedSubcategory}
                setSelectedSubcategory={setSelectedSubcategory}
                subcategories={subcategories}
                detailCategories={detailCategories}
              />
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
