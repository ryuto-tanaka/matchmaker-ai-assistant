
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { ja } from "date-fns/locale";
import EventList from './calendar/EventList';
import EventDialogs from './calendar/EventDialogs';
import type { EventDetails, CalendarEventDB } from './calendar/types';
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const CalendarSection = () => {
  const { toast } = useToast();
  const { user } = useAuthContext();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<EventDetails[]>([]);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);
  const [reminderTime, setReminderTime] = useState<string>("");
  const [isUpcomingEventsOpen, setIsUpcomingEventsOpen] = useState(true);
  const [expandedEventIndex, setExpandedEventIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;

    // Initial fetch
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching events:', error);
        return;
      }

      const transformedEvents: EventDetails[] = (data as CalendarEventDB[]).map(event => ({
        id: event.id,
        date: new Date(event.event_date),
        title: event.title,
        type: event.event_type,
        description: event.description || undefined,
        user_id: event.user_id
      }));

      setEvents(transformedEvents);
    };

    fetchEvents();

    // Set up real-time subscription
    const subscription = supabase
      .channel('calendar_events')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'calendar_events',
          filter: `user_id=eq.${user.id}`
        },
        async (payload) => {
          // Fetch all events again to ensure consistency
          await fetchEvents();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

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

  const handleReminderSave = async () => {
    if (!selectedEvent || !user) return;

    try {
      const { error } = await supabase
        .from('calendar_events')
        .update({ description: `Reminder set for: ${reminderTime}` })
        .eq('id', selectedEvent.id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "リマインダー設定完了",
        description: `${selectedEvent.title}のリマインダーを設定しました。`,
      });
    } catch (error) {
      console.error('Error setting reminder:', error);
      toast({
        title: "エラー",
        description: "リマインダーの設定に失敗しました。",
        variant: "destructive"
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
