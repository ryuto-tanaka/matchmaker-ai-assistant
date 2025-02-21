
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CalendarDays } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

interface EventDetails {
  date: Date;
  title: string;
  type: 'deadline' | 'consultation' | 'reminder';
  description?: string;
}

const CalendarSection = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);
  const [reminderTime, setReminderTime] = useState<string>("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);

  const today = new Date();
  const events = [
    {
      date: today,
      title: 'IT導入補助金申請期限',
      type: 'deadline' as const,
      description: '申請書類の提出期限です。'
    },
    {
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      title: '専門家相談',
      type: 'consultation' as const,
      description: '山田先生との相談予約'
    },
    {
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      title: '書類確認リマインダー',
      type: 'reminder' as const,
      description: '事業計画書の最終確認'
    }
  ];

  const handleGoogleCalendarConnect = () => {
    toast({
      title: "Google Calendar連携",
      description: "連携が完了しました。",
    });
    setIsGoogleCalendarConnected(true);
  };

  const handleEventClick = (event: EventDetails) => {
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
  };

  const handleReminderSave = () => {
    if (selectedEvent) {
      toast({
        title: "リマインダー設定完了",
        description: `${selectedEvent.title}のリマインダーを設定しました。`,
      });
    }
    setIsReminderDialogOpen(false);
  };

  const handleNotificationSettingsSave = () => {
    toast({
      title: "通知設定を保存しました",
      description: "設定が更新されました。",
    });
  };

  return (
    <Card className="w-full max-w-[1200px] mx-auto">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <CardTitle className="text-2xl">スケジュール管理</CardTitle>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="relative"
              >
                <Bell className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[240px]">
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">通知設定</h4>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">メール通知</Label>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-notifications">アプリ内通知</Label>
                    <Switch
                      id="app-notifications"
                      checked={appNotifications}
                      onCheckedChange={setAppNotifications}
                    />
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={handleNotificationSettingsSave}
                >
                  設定を保存
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="default"
            onClick={handleGoogleCalendarConnect}
            className="flex items-center gap-2"
          >
            <CalendarDays className="h-4 w-4" />
            <span>{isGoogleCalendarConnected ? 'Google Calendar連携済み' : 'Google Calendar連携'}</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={ja}
            events={events}
            onEventClick={handleEventClick}
            className="w-full"
          />
        </div>
      </CardContent>

      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
            <DialogDescription>
              {selectedEvent?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <span>日時</span>
              <span>
                {selectedEvent && format(selectedEvent.date, 'yyyy年MM月dd日')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>種類</span>
              <span>
                {selectedEvent?.type === 'deadline' && '期限'}
                {selectedEvent?.type === 'consultation' && '相談'}
                {selectedEvent?.type === 'reminder' && 'リマインダー'}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEventDetailsOpen(false);
                setIsReminderDialogOpen(true);
              }}
            >
              リマインダーを設定
            </Button>
            <Button onClick={() => setIsEventDetailsOpen(false)}>
              閉じる
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>リマインダー設定</DialogTitle>
            <DialogDescription>
              {selectedEvent?.title}のリマインダーを設定します
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>通知時間</Label>
              <Input
                type="datetime-local"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="reminder-email">メールで通知</Label>
                <Switch
                  id="reminder-email"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="reminder-app">アプリ内で通知</Label>
                <Switch
                  id="reminder-app"
                  checked={appNotifications}
                  onCheckedChange={setAppNotifications}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleReminderSave}>
              設定を保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CalendarSection;
