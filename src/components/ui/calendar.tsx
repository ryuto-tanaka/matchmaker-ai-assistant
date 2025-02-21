
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type CalendarEvent = {
  date: Date;
  title: string;
  type: 'deadline' | 'consultation' | 'reminder';
  description?: string;
};

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  events = [],
  onEventClick,
  ...props
}: CalendarProps) {
  const eventsByDate = React.useMemo(() => {
    const eventMap: Record<string, CalendarEvent[]> = {};
    events.forEach(event => {
      const dateKey = format(event.date, 'yyyy-MM-dd');
      if (!eventMap[dateKey]) {
        eventMap[dateKey] = [];
      }
      eventMap[dateKey].push(event);
    });
    return eventMap;
  }, [events]);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 w-full",
        caption: "flex justify-center pt-1 relative items-center px-8 py-4",
        caption_label: "text-lg font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-2",
        table: "w-full border-collapse space-y-1",
        head_row: "flex w-full",
        head_cell: "text-muted-foreground rounded-md w-full font-medium text-base p-2 text-center",
        row: "flex w-full mt-2",
        cell: "relative h-32 w-full border border-gray-200 p-1 text-center hover:bg-gray-50 transition-colors",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal absolute top-1 left-1/2 -translate-x-1/2"
        ),
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-5 w-5" />,
        IconRight: () => <ChevronRight className="h-5 w-5" />,
        Day: ({ date, ...dayProps }) => {
          const dateKey = format(date, 'yyyy-MM-dd');
          const dayEvents = eventsByDate[dateKey] || [];
          
          return (
            <div className="relative h-full w-full" {...dayProps}>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-base">
                {format(date, 'd')}
              </div>
              {dayEvents.length > 0 && (
                <div className="absolute top-10 left-0 right-0 flex flex-col gap-1.5 px-2">
                  {dayEvents.map((event) => (
                    <Badge
                      key={`${event.title}-${event.date.toISOString()}`}
                      className={cn(
                        "text-sm cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis px-2 py-1",
                        event.type === 'deadline' && "bg-red-100 text-red-800 hover:bg-red-200",
                        event.type === 'consultation' && "bg-blue-100 text-blue-800 hover:bg-blue-200",
                        event.type === 'reminder' && "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(event);
                      }}
                    >
                      {event.title}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
