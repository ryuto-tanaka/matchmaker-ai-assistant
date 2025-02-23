
import React from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import EventDialogs from './calendar/EventDialogs';
import CalendarHeader from './calendar/components/CalendarHeader';
import CalendarContent from './calendar/components/CalendarContent';
import { useCalendarState } from './calendar/hooks/useCalendarState';

const CalendarSection = () => {
  const { toast } = useToast();
  const {
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
  } = useCalendarState();

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
    if (!selectedEvent) return;
    try {
      const { error } = await supabase
        .from('calendar_events')
        .update({ description: `Reminder set for: ${reminderTime}` })
        .eq('id', selectedEvent.id);

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

  const handleAddTodo = async () => {
    try {
      const { error } = await supabase
        .from('calendar_events')
        .insert({
          title: newTodo.title,
          event_date: newTodo.date.toISOString(),
          description: newTodo.description,
          event_type: 'todo'
        });

      if (error) throw error;

      toast({
        title: "TODO追加完了",
        description: "新しいTODOを追加しました。",
      });

      setNewTodo({ title: '', date: new Date(), description: '' });
      setIsTodoDialogOpen(false);
    } catch (error) {
      console.error('Error adding todo:', error);
      toast({
        title: "エラー",
        description: "TODOの追加に失敗しました。",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-[1200px] mx-auto bg-white shadow-lg">
      <CalendarHeader
        isGoogleCalendarConnected={isGoogleCalendarConnected}
        onGoogleCalendarConnect={handleGoogleCalendarConnect}
        onOpenTodoDialog={() => setIsTodoDialogOpen(true)}
      />

      <CalendarContent
        date={date}
        setDate={setDate}
        events={events}
        onEventClick={handleEventClick}
        isUpcomingEventsOpen={isUpcomingEventsOpen}
        setIsUpcomingEventsOpen={setIsUpcomingEventsOpen}
        expandedEventIndex={expandedEventIndex}
        setExpandedEventIndex={setExpandedEventIndex}
      />

      <EventDialogs
        selectedEvent={selectedEvent}
        isEventDetailsOpen={isEventDetailsOpen}
        setIsEventDetailsOpen={setIsEventDetailsOpen}
        isReminderDialogOpen={isReminderDialogOpen}
        setIsReminderDialogOpen={setIsReminderDialogOpen}
        isTodoDialogOpen={isTodoDialogOpen}
        setIsTodoDialogOpen={setIsTodoDialogOpen}
        reminderTime={reminderTime}
        setReminderTime={setReminderTime}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        onReminderSave={handleReminderSave}
        onTodoSave={handleAddTodo}
      />
    </Card>
  );
};

export default CalendarSection;
