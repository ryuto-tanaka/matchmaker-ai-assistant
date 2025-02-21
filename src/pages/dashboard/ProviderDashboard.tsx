import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { StatDetailsModal } from "@/components/modals/StatDetailsModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { LucideIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type StatLabel = '進行中の案件' | '契約クライアント' | '今月の成約率' | '今月の売上';

interface DashboardStat {
  icon: LucideIcon;
  label: StatLabel;
  value: string;
}

const monthlyData = [
  { month: '1月', revenue: 800000, projects: 8 },
  { month: '2月', revenue: 950000, projects: 10 },
  { month: '3月', revenue: 1200000, projects: 12 },
  { month: '4月', revenue: 1000000, projects: 11 },
  { month: '5月', revenue: 1300000, projects: 14 },
  { month: '6月', revenue: 1200000, projects: 12 },
];

const ProviderDashboard = () => {
  const [openDialogs, setOpenDialogs] = useState<{ [key: number]: boolean }>({});

  const stats: DashboardStat[] = [
    { icon: FileText, label: '進行中の案件', value: '12件' },
    { icon: Users, label: '契約クライアント', value: '25社' },
    { icon: TrendingUp, label: '今月の成約率', value: '75%' },
    { icon: DollarSign, label: '今月の売上', value: '¥1.2M' },
  ];

  const handleOpenChange = (index: number, open: boolean) => {
    setOpenDialogs(prev => ({ ...prev, [index]: open }));
  };

  return (
    <DashboardLayout userType="provider" userName="株式会社〇〇" secondaryTypes={['expert']}>
      <h1 className="text-2xl font-bold mb-6">サービス提供者ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <Dialog 
                open={openDialogs[index]} 
                onOpenChange={(open) => handleOpenChange(index, open)}
              >
                <DialogTrigger asChild>
                  <div className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <StatDetailsModal statType={stat.label} value={stat.value} />
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>最近の案件</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">IT導入支援</p>
                    <p className="text-sm text-gray-500">クライアント: 株式会社ABC</p>
                  </div>
                  <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full">
                    進行中
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>新規問い合わせ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">補助金申請支援の相談</p>
                    <p className="text-sm text-gray-500">
                      受付日: 2024/02/15
                    </p>
                  </div>
                  <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                    未対応
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>月間推移</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    name="売上"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="projects"
                    name="案件数"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProviderDashboard;
