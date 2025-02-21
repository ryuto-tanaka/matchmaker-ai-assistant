
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewApplicationModal } from '@/components/modals/NewApplicationModal';
import { BusinessPlanSurveyModal } from '@/components/modals/BusinessPlanSurveyModal';
import { useToast } from "@/hooks/use-toast";

const ApplicationsPage = () => {
  const [isNewApplicationModalOpen, setIsNewApplicationModalOpen] = useState(false);
  const [isBusinessPlanModalOpen, setIsBusinessPlanModalOpen] = useState(false);
  const { toast } = useToast();
  
  const applications = [
    { id: 1, name: 'IT導入補助金', status: '申請中', deadline: '2024/03/31' },
    { id: 2, name: '事業再構築補助金', status: '下書き', deadline: '2024/04/15' },
    { id: 3, name: '小規模事業者持続化補助金', status: '準備中', deadline: '2024/05/01' },
  ];

  const handleInitialSubmit = () => {
    setIsNewApplicationModalOpen(false);
    setIsBusinessPlanModalOpen(true);
  };

  const handleBusinessPlanSubmit = async (data: any) => {
    try {
      // TODO: API実装後に実際の送信処理を追加
      console.log("Business plan submitted:", data);
      
      toast({
        title: "申請が完了しました",
        description: "申請内容を確認の上、担当者よりご連絡いたします。",
      });
      
      setIsBusinessPlanModalOpen(false);
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "申し訳ありません。時間をおいて再度お試しください。",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout userType="applicant" userName="申請者">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">補助金申請</h1>
          <Button onClick={() => setIsNewApplicationModalOpen(true)}>
            新規申請
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6">
          {applications.map((application) => (
            <Card key={application.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{application.name}</h3>
                      <p className="text-sm text-gray-500">申請期限: {application.deadline}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                    {application.status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <NewApplicationModal
          isOpen={isNewApplicationModalOpen}
          onClose={() => setIsNewApplicationModalOpen(false)}
          onSubmit={handleInitialSubmit}
        />

        <BusinessPlanSurveyModal
          isOpen={isBusinessPlanModalOpen}
          onClose={() => setIsBusinessPlanModalOpen(false)}
          onSubmit={handleBusinessPlanSubmit}
        />
      </div>
    </DashboardLayout>
  );
};

export default ApplicationsPage;
