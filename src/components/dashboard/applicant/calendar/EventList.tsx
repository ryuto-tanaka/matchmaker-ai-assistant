
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { EventDetails } from './types';
import { getEventTypeIcon, getEventTypeStyle } from './utils';

interface EventListProps {
  events: EventDetails[];
  isUpcomingEventsOpen: boolean;
  setIsUpcomingEventsOpen: (value: boolean) => void;
  expandedEventIndex: number | null;
  setExpandedEventIndex: (value: number | null) => void;
  onEventClick: (event: EventDetails) => void;
}

const EventList = ({
  events,
  isUpcomingEventsOpen,
  setIsUpcomingEventsOpen,
  expandedEventIndex,
  setExpandedEventIndex,
  onEventClick,
}: EventListProps) => {
  return (
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
            <CollapsibleContent className={`p-4 border-t ${getEventTypeStyle(event.type)}`}>
              <p className="text-gray-700">{event.description}</p>
              <div className="mt-3 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEventClick(event)}
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
  );
};

export default EventList;
