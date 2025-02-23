
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { ja } from "date-fns/locale";
import EventList from './calendar/EventList';
import EventDialogs from './calendar/EventDialogs';
import type { EventDetails } from './calendar/types';

const CalendarSection = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);
  const [reminderTime, setReminderTime] = useState<string>("");
  const [isUpcomingEventsOpen, setIsUpcomingEventsOpen] = useState(true);
  const [expandedEventIndex, setExpandedEventIndex] = useState<number | null>(null);

  const today = new Date();
  const events = [
    {
      date: today,
      title: 'IT導入補助金申請期限',
      type: 'deadline' as const,
      description: '申請書類の提出期限です。締切までに必要書類を全て揃えて提出してください。'
    },
    {
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      title: '専門家相談',
      type: 'consultation' as const,
      description: '山田先生との相談予約。IT導入補助金の申請内容について詳細な確認を行います。'
    },
    {
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      title: '書類確認リマインダー',
      type: 'reminder' as const,
      description: '事業計画書の最終確認。特に収支計画と導入スケジュールの部分を重点的に確認してください。'
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

  return (
    <Card className="w-full max-w-[1200px] mx-auto bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800">スケジュール管理</CardTitle>
        <Button
          variant="outline"
          size="default"
          onClick={handleGoogleCalendarConnect}
          className="flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <CalendarDays className="h-4 w-4" />
          <span>{isGoogleCalendarConnected ? 'Google Calendar連携済み' : 'Google Calendar連携'}</span>
        </Button>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
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
          </div>

          <div className="space-y-4">
            <EventList
              events={events}
              isUpcomingEventsOpen={isUpcomingEventsOpen}
              setIsUpcomingEventsOpen={setIsUpcomingEventsOpen}
              expandedEventIndex={expandedEventIndex}
              setExpandedEventIndex={setExpandedEventIndex}
              onEventClick={handleEventClick}
            />
          </div>
        </div>
      </CardContent>

      <EventDialogs
        selectedEvent={selectedEvent}
        isEventDetailsOpen={isEventDetailsOpen}
        setIsEventDetailsOpen={setIsEventDetailsOpen}
        isReminderDialogOpen={isReminderDialogOpen}
        setIsReminderDialogOpen={setIsReminderDialogOpen}
        reminderTime={reminderTime}
        setReminderTime={setReminderTime}
        onReminderSave={handleReminderSave}
      />
    </Card>
  );
};

export default CalendarSection;
