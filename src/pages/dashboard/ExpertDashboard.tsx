
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, MessageSquare, TrendingUp } from 'lucide-react';
import { ExpertPerformanceChart } from '@/components/dashboard/expert/ExpertPerformanceChart';
import { useAuthContext } from '@/contexts/AuthContext';

const ExpertDashboard = () => {
  const { user, profile } = useAuthContext();
  
  const stats = [
    { icon: FileText, label: '担当案件数', value: '8件', description: '現在進行中の案件数' },
    { icon: Users, label: '相談対応数', value: '15件', description: '今月の相談対応総数' },
    { icon: MessageSquare, label: '未回答の質問', value: '3件', description: '回答待ちの質問件数' },
    { icon: TrendingUp, label: '評価スコア', value: '4.8', description: 'クライアントからの平均評価' },
  ];

  // プロフィール情報から表示名を決定
  const displayName = profile?.company_name || profile?.contact_name || user?.email || 'ユーザー';

  return (
    <DashboardLayout 
      userType="expert" 
      userName={displayName} 
      secondaryTypes={['provider']}
    >
      <h1 className="text-2xl font-bold mb-6">専門家ダッシュボード</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
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
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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

      <div className="mt-8">
        <ExpertPerformanceChart />
      </div>
    </DashboardLayout>
  );
};

export default ExpertDashboard;
