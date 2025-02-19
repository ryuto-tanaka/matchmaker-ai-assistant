
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CasesPage = () => {
  const cases = [
    {
      id: 1,
      client: '株式会社ABC',
      type: 'IT導入補助金',
      status: '申請準備中',
      amount: '450万円',
      deadline: '2024/03/31',
    },
    {
      id: 2,
      client: '株式会社XYZ',
      type: '事業再構築補助金',
      status: '審査中',
      amount: '1,200万円',
      deadline: '2024/04/15',
    },
    {
      id: 3,
      client: '有限会社DEF',
      type: 'ものづくり補助金',
      status: '交付決定',
      amount: '800万円',
      deadline: '2024/05/01',
    },
  ];

  return (
    <DashboardLayout userType="provider" userName="提供者">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">案件一覧</h1>

        <div className="grid gap-6">
          {cases.map((case_) => (
            <Card key={case_.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{case_.client}</h3>
                      <p className="text-sm text-gray-500">{case_.type}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">申請金額: {case_.amount}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">期限: {case_.deadline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                      {case_.status}
                    </span>
                    <Button variant="outline">詳細</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CasesPage;
