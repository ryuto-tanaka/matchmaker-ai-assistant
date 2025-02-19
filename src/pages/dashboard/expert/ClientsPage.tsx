
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Building, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ClientsPage = () => {
  const clients = [
    {
      id: 1,
      name: '株式会社ABC',
      industry: 'IT・通信',
      consultations: 5,
      lastConsultation: '2024/03/10',
      status: 'アクティブ',
    },
    {
      id: 2,
      name: '株式会社XYZ',
      industry: '製造業',
      consultations: 3,
      lastConsultation: '2024/03/05',
      status: 'アクティブ',
    },
    {
      id: 3,
      name: '有限会社DEF',
      industry: 'サービス業',
      consultations: 2,
      lastConsultation: '2024/02/28',
      status: '完了',
    },
  ];

  return (
    <DashboardLayout userType="expert" userName="専門家">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">クライアント一覧</h1>

        <div className="grid gap-6">
          {clients.map((client) => (
            <Card key={client.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{client.name}</h3>
                      <p className="text-sm text-gray-500">{client.industry}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">相談件数: {client.consultations}件</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">最終相談: {client.lastConsultation}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      client.status === 'アクティブ'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {client.status}
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

export default ClientsPage;
