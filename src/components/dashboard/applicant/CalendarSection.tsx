
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
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

const CalendarSection = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] = useState(false);

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

  const handleEventClick = (event: any) => {
    console.log('Event clicked:', event);
    setIsReminderDialogOpen(true);
  };

  return (
    <Card className="w-full max-w-[1200px] mx-auto">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <CardTitle className="text-2xl">スケジュール管理</CardTitle>
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

      <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>リマインダー設定</DialogTitle>
            <DialogDescription>
              イベントの通知時間を設定してください
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>通知時間</Label>
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
    </Card>
  );
};

export default CalendarSection;
