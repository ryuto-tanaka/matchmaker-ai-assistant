
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ChevronDown, Clock, MapPin, FileText } from 'lucide-react';
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
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

  const getEventTypeIcon = (type: EventDetails['type']) => {
    switch (type) {
      case 'deadline':
        return <Clock className="h-5 w-5 text-red-500" />;
      case 'consultation':
        return <MapPin className="h-5 w-5 text-blue-500" />;
      case 'reminder':
        return <FileText className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getEventTypeStyle = (type: EventDetails['type']) => {
    switch (type) {
      case 'deadline':
        return 'border-l-4 border-red-500 bg-red-50 hover:bg-red-100';
      case 'consultation':
        return 'border-l-4 border-blue-500 bg-blue-50 hover:bg-blue-100';
      case 'reminder':
        return 'border-l-4 border-yellow-500 bg-yellow-50 hover:bg-yellow-100';
    }
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
            <Collapsible
              open={isUpcomingEventsOpen}
              onOpenChange={setIsUpcomingEventsOpen}
              className="border rounded-lg bg-white shadow-sm"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold text-gray-800">直近のイベント</h3>
                <ChevronDown className={`h-4 w-4 transition-transform ${isUpcomingEventsOpen ? 'transform rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-3">
                {events.map((event, index) => (
                  <Collapsible
                    key={index}
                    open={expandedEventIndex === index}
                    onOpenChange={() => setExpandedEventIndex(expandedEventIndex === index ? null : index)}
                  >
                    <CollapsibleTrigger className={`w-full rounded-t-lg ${getEventTypeStyle(event.type)} p-4 transition-colors cursor-pointer`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getEventTypeIcon(event.type)}
                          <div>
                            <div className="font-medium text-gray-800">{event.title}</div>
                            <div className="text-sm text-gray-600">
                              {format(event.date, 'yyyy年MM月dd日')}
                            </div>
                          </div>
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${expandedEventIndex === index ? 'transform rotate-180' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className={`p-4 border-t ${
                      event.type === 'deadline' ? 'bg-red-50' :
                      event.type === 'consultation' ? 'bg-blue-50' :
                      'bg-yellow-50'
                    }`}>
                      <p className="text-gray-700">{event.description}</p>
                      <div className="mt-3 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEventClick(event)}
                          className="text-sm"
                        >
                          詳細を見る
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </CardContent>

      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{selectedEvent?.title}</DialogTitle>
            <DialogDescription className="text-gray-600">
              {selectedEvent?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">日時</span>
              <span className="text-gray-600">
                {selectedEvent && format(selectedEvent.date, 'yyyy年MM月dd日')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">種類</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                selectedEvent?.type === 'deadline' ? 'bg-red-100 text-red-800' :
                selectedEvent?.type === 'consultation' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {selectedEvent?.type === 'deadline' && '期限'}
                {selectedEvent?.type === 'consultation' && '相談'}
                {selectedEvent?.type === 'reminder' && 'リマインダー'}
              </span>
            </div>
          </div>
          <DialogFooter className="space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEventDetailsOpen(false);
                setIsReminderDialogOpen(true);
              }}
              className="hover:bg-gray-50"
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">リマインダー設定</DialogTitle>
            <DialogDescription className="text-gray-600">
              {selectedEvent?.title}のリマインダーを設定します
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reminder-time" className="text-gray-700">通知時間</Label>
              <Input
                id="reminder-time"
                type="datetime-local"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full"
              />
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
