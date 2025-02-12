
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, MessageSquare, TrendingUp } from 'lucide-react';

const ExpertDashboard = () => {
  const stats = [
    { icon: FileText, label: '担当案件数', value: '8件' },
    { icon: Users, label: '相談対応数', value: '15件' },
    { icon: MessageSquare, label: '未回答の質問', value: '3件' },
    { icon: TrendingUp, label: '評価スコア', value: '4.8' },
  ];

  return (
    <DashboardLayout userType="expert" userName="田中弁護士" secondaryTypes={['provider']}>
      <h1 className="text-2xl font-bold mb-6">専門家ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>最近の相談</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">補助金申請に関する相談</p>
                    <p className="text-sm text-gray-500">クライアント: 株式会社XYZ</p>
                  </div>
                  <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                    対応済み
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>スケジュール</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">オンライン相談</p>
                    <p className="text-sm text-gray-500">
                      2024/02/20 14:00-15:00
                    </p>
                  </div>
                  <span className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full">
                    予約済み
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

export default ExpertDashboard;
