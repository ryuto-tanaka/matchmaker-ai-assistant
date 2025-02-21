
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
  // イベントを日付ごとにグループ化
  const eventsByDate = React.useMemo(() => {
    return events.reduce((acc, event) => {
      const dateKey = format(event.date, 'yyyy-MM-dd');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {} as Record<string, CalendarEvent[]>);
  }, [events]);

  const renderEventBadge = (event: CalendarEvent) => {
    const badgeVariants: Record<CalendarEvent['type'], string> = {
      deadline: 'bg-red-100 text-red-800 hover:bg-red-200',
      consultation: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      reminder: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    };

    return (
      <Badge
        key={`${event.title}-${event.date.toISOString()}`}
        className={cn(
          "text-xs cursor-pointer transition-colors",
          badgeVariants[event.type]
        )}
        onClick={(e) => {
          e.stopPropagation();
          onEventClick?.(event);
        }}
      >
        {event.title}
      </Badge>
    );
  };

  return (
    <DayPicker
      locale={ja}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
        Day: ({ date, displayMonth, ...dayProps }) => {
          const dateKey = format(date, 'yyyy-MM-dd');
          const dayEvents = eventsByDate[dateKey] || [];
          
          return (
            <div className="relative min-h-[60px] w-9">
              <div {...dayProps} className="absolute top-0 left-0 right-0" />
              {dayEvents.length > 0 && (
                <div className="absolute top-8 left-0 right-0 flex flex-col gap-1 px-1">
                  {dayEvents.map(renderEventBadge)}
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
