
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ProviderDashboard = () => {
  const stats = [
    { icon: FileText, label: '進行中の案件', value: '12件' },
    { icon: Users, label: '契約クライアント', value: '25社' },
    { icon: TrendingUp, label: '今月の成約率', value: '75%' },
    { icon: DollarSign, label: '今月の売上', value: '¥1.2M' },
  ];

  return (
    <DashboardLayout userType="provider" userName="株式会社〇〇" secondaryTypes={['expert']}>
      <h1 className="text-2xl font-bold mb-6">サービス提供者ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="ml-2">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
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
    </DashboardLayout>
  );
};

export default ProviderDashboard;
