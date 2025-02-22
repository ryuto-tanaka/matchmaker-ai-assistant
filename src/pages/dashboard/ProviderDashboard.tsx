
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { DashboardStats } from '@/components/dashboard/provider/DashboardStats';
import { DashboardFilters } from '@/components/dashboard/provider/DashboardFilters';
import { RecentProjectsList } from '@/components/dashboard/provider/RecentProjectsList';
import { InquiriesList } from '@/components/dashboard/provider/InquiriesList';
import { MonthlyChart } from '@/components/dashboard/provider/MonthlyChart';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from 'lucide-react';

const ProviderDashboard = () => {
  const [openDialogs, setOpenDialogs] = useState<{ [key: number]: boolean }>({});
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const isOnline = useOnlineStatus();

  const handleOpenChange = (index: number, open: boolean) => {
    setOpenDialogs(prev => ({ ...prev, [index]: open }));
  };

  return (
    <DashboardLayout userType="provider" userName="株式会社〇〇" secondaryTypes={['expert']}>
      <div className="flex justify-between items-center mb-6" role="banner">
        <h1 className="text-2xl font-bold">サービス提供者ダッシュボード</h1>
        <Badge 
          variant={isOnline ? "default" : "destructive"}
          className="flex items-center gap-2"
          aria-live="polite"
          role="status"
        >
          {isOnline ? (
            <Wifi className="h-4 w-4" aria-hidden="true" />
          ) : (
            <WifiOff className="h-4 w-4" aria-hidden="true" />
          )}
          {isOnline ? "オンライン" : "オフライン"}
        </Badge>
      </div>
      
      <main role="main" aria-label="ダッシュボードの概要">
        <div role="region" aria-label="ダッシュボードの統計">
          <DashboardStats 
            openDialogs={openDialogs}
            onOpenChange={handleOpenChange}
          />
        </div>

        <div role="region" aria-label="フィルターオプション">
          <DashboardFilters
            statusFilter={statusFilter}
            dateFilter={dateFilter}
            onStatusFilterChange={setStatusFilter}
            onDateFilterChange={setDateFilter}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div role="region" aria-label="最近の案件一覧">
            <RecentProjectsList 
              statusFilter={statusFilter}
              dateFilter={dateFilter}
            />
          </div>
          <div role="region" aria-label="新規問い合わせ一覧">
            <InquiriesList />
          </div>
        </div>

        <div className="mt-8" role="region" aria-label="月間データチャート">
          <MonthlyChart />
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ProviderDashboard;
