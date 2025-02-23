
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import type { EventDetails, CalendarEventDB } from '../types';

export const useCalendarState = () => {
  const { toast } = useToast();
  const { user } = useAuthContext();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<EventDetails[]>([]);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [isTodoDialogOpen, setIsTodoDialogOpen] = useState(false);
  const [isGoogleCalendarConnected, setIsGoogleCalendarConnected] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);
  const [reminderTime, setReminderTime] = useState<string>("");
  const [isUpcomingEventsOpen, setIsUpcomingEventsOpen] = useState(true);
  const [expandedEventIndex, setExpandedEventIndex] = useState<number | null>(null);
  const [newTodo, setNewTodo] = useState({
    title: '',
    date: new Date(),
    description: ''
  });

  useEffect(() => {
    if (!user) return;

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
        async () => {
          await fetchEvents();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  return {
    date,
    setDate,
    events,
    isReminderDialogOpen,
    setIsReminderDialogOpen,
    isEventDetailsOpen,
    setIsEventDetailsOpen,
    isTodoDialogOpen,
    setIsTodoDialogOpen,
    isGoogleCalendarConnected,
    setIsGoogleCalendarConnected,
    selectedEvent,
    setSelectedEvent,
    reminderTime,
    setReminderTime,
    isUpcomingEventsOpen,
    setIsUpcomingEventsOpen,
    expandedEventIndex,
    setExpandedEventIndex,
    newTodo,
    setNewTodo,
  };
};
