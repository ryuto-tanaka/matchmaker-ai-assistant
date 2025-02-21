
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOverview from '@/components/dashboard/applicant/DashboardOverview';
import CalendarSection from '@/components/dashboard/applicant/CalendarSection';
import DocumentsSection from '@/components/dashboard/applicant/DocumentsSection';

const ApplicantDashboard = () => {
  return (
    <DashboardLayout userType="applicant" userName="山田太郎" secondaryTypes={['provider']}>
      <Tabs defaultValue="dashboard" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="dashboard">ダッシュボード</TabsTrigger>
          <TabsTrigger value="calendar">カレンダー</TabsTrigger>
          <TabsTrigger value="documents">書類</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <DashboardOverview />
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarSection />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsSection />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ApplicantDashboard;
