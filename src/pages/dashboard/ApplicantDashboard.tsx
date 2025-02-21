
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOverview from '@/components/dashboard/applicant/DashboardOverview';
import CalendarSection from '@/components/dashboard/applicant/CalendarSection';
import DocumentsSection from '@/components/dashboard/applicant/DocumentsSection';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from 'lucide-react';

const ApplicantDashboard = () => {
  const isOnline = useOnlineStatus();

  return (
    <DashboardLayout userType="applicant" userName="山田太郎" secondaryTypes={['provider']}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="sr-only">申請者ダッシュボード</h1>
        <Badge 
          variant={isOnline ? "default" : "destructive"}
          className="flex items-center gap-2"
          aria-live="polite"
        >
          {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
          {isOnline ? "オンライン" : "オフライン"}
        </Badge>
      </div>

      <Tabs defaultValue="dashboard" className="w-full space-y-6">
        <TabsList 
          className="grid w-full grid-cols-3 lg:w-[400px]"
          aria-label="ダッシュボードナビゲーション"
        >
          <TabsTrigger value="dashboard" aria-controls="dashboard-tab">
            ダッシュボード
          </TabsTrigger>
          <TabsTrigger value="calendar" aria-controls="calendar-tab">
            カレンダー
          </TabsTrigger>
          <TabsTrigger value="documents" aria-controls="documents-tab">
            書類
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" role="tabpanel" id="dashboard-tab">
          <DashboardOverview />
        </TabsContent>

        <TabsContent value="calendar" role="tabpanel" id="calendar-tab">
          <CalendarSection />
        </TabsContent>

        <TabsContent value="documents" role="tabpanel" id="documents-tab">
          <DocumentsSection />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ApplicantDashboard;
