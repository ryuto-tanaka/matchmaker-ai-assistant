import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { FileText, Users, Clock, CheckCircle, Calendar as CalendarIcon, File, MessageCircle } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import BusinessPlanSurveyModal from '@/components/modals/BusinessPlanSurveyModal';
import { useToast } from "@/components/ui/use-toast";

const ApplicantDashboard = () => {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const [isBusinessPlanModalOpen, setIsBusinessPlanModalOpen] = useState(false);

  const stats = [
    { icon: FileText, label: '申請中の補助金', value: '3件' },
    { icon: Users, label: '相談中の専門家', value: '2名' },
    { icon: Clock, label: '審査待ち', value: '1件' },
    { icon: CheckCircle, label: '承認済み', value: '2件' },
  ];

  const handleAIBusinessPlanClick = () => {
    setIsBusinessPlanModalOpen(true);
  };

  const handleSurveySubmit = async (data: any) => {
    console.log('Survey data:', data);
    // TODO: AIによる事業計画書生成の処理を実装
    toast({
      title: "アンケート送信完了",
      description: "AI事業計画書の生成を開始します。完了までしばらくお待ちください。",
    });
    setIsBusinessPlanModalOpen(false);
  };

  return (
    <DashboardLayout userType="applicant" userName="山田太郎" secondaryTypes={['provider']}>
      <BusinessPlanSurveyModal
        isOpen={isBusinessPlanModalOpen}
        onClose={() => setIsBusinessPlanModalOpen(false)}
        onSubmit={handleSurveySubmit}
      />
      
      <Tabs defaultValue="dashboard" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="dashboard">ダッシュボード</TabsTrigger>
          <TabsTrigger value="calendar">カレンダー</TabsTrigger>
          <TabsTrigger value="documents">書類</TabsTrigger>
          <TabsTrigger value="messages">メッセージ</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="space-y-6">
            <Card className="border-2 border-primary">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold">AI事業計画書を作成</h2>
                  <p className="text-gray-600">
                    簡単なアンケートに答えるだけで、AIがあなたの事業計画書を作成します
                  </p>
                  <Button size="lg" onClick={handleAIBusinessPlanClick}>
                    作成を開始する
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>スケジュール管理</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={new Date()}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>書類管理</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <File className="h-6 w-6 text-gray-400" />
                      <div>
                        <p className="font-medium">事業計画書_v{index + 1}</p>
                        <p className="text-sm text-gray-500">更新日: 2024/02/01</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">表示</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>メッセージ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <MessageCircle className="h-6 w-6 text-gray-400" />
                      <div>
                        <p className="font-medium">専門家 太田様からの新着メッセージ</p>
                        <p className="text-sm text-gray-500">受信日時: 2024/02/01 10:30</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">開く</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ApplicantDashboard;
