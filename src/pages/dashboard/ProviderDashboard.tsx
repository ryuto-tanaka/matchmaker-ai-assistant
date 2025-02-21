
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { DashboardStats } from '@/components/dashboard/provider/DashboardStats';
import { DashboardFilters } from '@/components/dashboard/provider/DashboardFilters';
import { RecentProjectsList } from '@/components/dashboard/provider/RecentProjectsList';
import { InquiriesList } from '@/components/dashboard/provider/InquiriesList';
import { MonthlyChart } from '@/components/dashboard/provider/MonthlyChart';

const ProviderDashboard = () => {
  const [openDialogs, setOpenDialogs] = useState<{ [key: number]: boolean }>({});
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');

  const handleOpenChange = (index: number, open: boolean) => {
    setOpenDialogs(prev => ({ ...prev, [index]: open }));
  };

  return (
    <DashboardLayout userType="provider" userName="株式会社〇〇" secondaryTypes={['expert']}>
      <h1 className="text-2xl font-bold mb-6">サービス提供者ダッシュボード</h1>
      
      <DashboardStats 
        openDialogs={openDialogs}
        onOpenChange={handleOpenChange}
      />

      <DashboardFilters
        statusFilter={statusFilter}
        dateFilter={dateFilter}
        onStatusFilterChange={setStatusFilter}
        onDateFilterChange={setDateFilter}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentProjectsList 
          statusFilter={statusFilter}
          dateFilter={dateFilter}
        />
        <InquiriesList />
      </div>

      <div className="mt-8">
        <MonthlyChart />
      </div>
    </DashboardLayout>
  );
};

export default ProviderDashboard;
