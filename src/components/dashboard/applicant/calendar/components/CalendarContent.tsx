
import React from 'react';
import { CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import EventList from '../EventList';
import { ja } from "date-fns/locale";
import type { EventDetails } from '../types';

interface CalendarContentProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  events: EventDetails[];
  onEventClick: (event: EventDetails) => void;
  isUpcomingEventsOpen: boolean;
  setIsUpcomingEventsOpen: (isOpen: boolean) => void;
  expandedEventIndex: number | null;
  setExpandedEventIndex: (index: number | null) => void;
}

const CalendarContent: React.FC<CalendarContentProps> = ({
  date,
  setDate,
  events,
  onEventClick,
  isUpcomingEventsOpen,
  setIsUpcomingEventsOpen,
  expandedEventIndex,
  setExpandedEventIndex,
}) => {
  return (
    <CardContent className="p-4 md:p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 min-h-[500px] md:min-h-[600px]">
          <div className="border rounded-lg p-2 md:p-6 bg-white shadow-sm hover:shadow-md transition-shadow h-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ja}
              className="w-full"
              events={events}
              onEventClick={onEventClick}
            />
          </div>
        </div>

        <div className="space-y-4 min-h-[300px] md:min-h-[400px]">
          <EventList
            events={events}
            isUpcomingEventsOpen={isUpcomingEventsOpen}
            setIsUpcomingEventsOpen={setIsUpcomingEventsOpen}
            expandedEventIndex={expandedEventIndex}
            setExpandedEventIndex={setExpandedEventIndex}
            onEventClick={onEventClick}
          />
        </div>
      </div>
    </CardContent>
  );
};

export default CalendarContent;
