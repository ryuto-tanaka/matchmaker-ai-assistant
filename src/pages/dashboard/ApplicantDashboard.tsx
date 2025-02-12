
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Clock, CheckCircle } from 'lucide-react';

const ApplicantDashboard = () => {
  const stats = [
    { icon: FileText, label: '申請中の補助金', value: '3件' },
    { icon: Users, label: '相談中の専門家', value: '2名' },
    { icon: Clock, label: '審査待ち', value: '1件' },
    { icon: CheckCircle, label: '承認済み', value: '2件' },
  ];

  return (
    <DashboardLayout userType="applicant" userName="山田太郎" secondaryTypes={['provider']}>
      <h1 className="text-2xl font-bold mb-6">申請者ダッシュボード</h1>
      
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
            <CardTitle>最近の申請状況</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 申請状況のリスト */}
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">ものづくり補助金</p>
                    <p className="text-sm text-gray-500">申請日: 2024/02/01</p>
                  </div>
                  <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                    審査中
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>おすすめの補助金</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* おすすめの補助金リスト */}
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">IT導入補助金</p>
                    <p className="text-sm text-gray-500">
                      最大補助額: 450万円
                    </p>
                  </div>
                  <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                    申請受付中
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

export default ApplicantDashboard;
