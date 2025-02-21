import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, type CalendarEvent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  Calendar as CalendarIcon, 
  File,
  Bell,
  Settings2
} from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { BusinessPlanSurveyModal } from '@/components/modals/BusinessPlanSurveyModal';
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ApplicantDashboard = () => {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const [isBusinessPlanModalOpen, setIsBusinessPlanModalOpen] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Sample calendar events
  const events: CalendarEvent[] = [
    {
      date: new Date(2024, 2, 15),
      title: 'IT導入補助金申請期限',
      type: 'deadline',
      description: '申請書類の提出期限です。'
    },
    {
      date: new Date(2024, 2, 16),
      title: '専門家相談',
      type: 'consultation',
      description: '山田先生との相談予約'
    },
    {
      date: new Date(2024, 2, 17),
      title: '書類確認リマインダー',
      type: 'reminder',
      description: '事業計画書の最終確認'
    }
  ];

  const handleGoogleCalendarConnect = async () => {
    // 実際の実装ではGoogle OAuth認証を行う
    toast({
      title: "Google Calendar連携",
      description: "連携が完了しました。",
    });
    setIsGoogleCalendarConnected(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsReminderDialogOpen(true);
  };

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
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="dashboard">ダッシュボード</TabsTrigger>
          <TabsTrigger value="calendar">カレンダー</TabsTrigger>
          <TabsTrigger value="documents">書類</TabsTrigger>
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
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>スケジュール管理</CardTitle>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings2 className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleGoogleCalendarConnect}>
                      {isGoogleCalendarConnected ? 'Google Calendar連携済み' : 'Google Calendar連携'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>通知設定</DialogTitle>
                      <DialogDescription>
                        イベントの通知設定を管理します
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="deadline-notify">申請期限の通知</Label>
                        <Switch id="deadline-notify" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="consultation-notify">相談予約の通知</Label>
                        <Switch id="consultation-notify" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="reminder-notify">リマインダーの通知</Label>
                        <Switch id="reminder-notify" defaultChecked />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                events={events}
                onEventClick={handleEventClick}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedEvent?.title}</DialogTitle>
                <DialogDescription>{selectedEvent?.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>リマインダー設定</Label>
                  <Input type="datetime-local" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsReminderDialogOpen(false)}>
                  設定を保存
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
      </Tabs>
    </DashboardLayout>
  );
};

export default ApplicantDashboard;
