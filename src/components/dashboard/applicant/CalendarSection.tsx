
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Settings2, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Calendar, type CalendarEvent } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

const CalendarSection = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

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

  return (
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
    </Card>
  );
};

export default CalendarSection;
