
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Calendar, Clock, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConsultationsPage = () => {
  const consultations = [
    {
      id: 1,
      client: '株式会社ABC',
      topic: 'IT導入補助金について',
      date: '2024/03/15',
      time: '14:00-15:00',
      status: '予約済み',
    },
    {
      id: 2,
      client: '株式会社XYZ',
      topic: '事業再構築補助金の要件確認',
      date: '2024/03/16',
      time: '10:00-11:00',
      status: '完了',
    },
    {
      id: 3,
      client: '有限会社DEF',
      topic: 'ものづくり補助金の申請方法',
      date: '2024/03/17',
      time: '15:00-16:00',
      status: '予約済み',
    },
  ];

  return (
    <DashboardLayout userType="expert" userName="専門家">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">相談案件</h1>

        <div className="grid gap-6">
          {consultations.map((consultation) => (
            <Card key={consultation.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <h3 className="font-semibold">{consultation.client}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{consultation.topic}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">{consultation.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm">{consultation.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      consultation.status === '完了' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {consultation.status}
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

export default ConsultationsPage;
