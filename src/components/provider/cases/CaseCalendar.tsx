
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CalendarEvent } from "@/components/ui/calendar";
import { Case } from "@/types/client";

interface CaseCalendarProps {
  cases: Case[];
}

export const CaseCalendar = ({ cases }: CaseCalendarProps) => {
  const calendarEvents: CalendarEvent[] = cases.flatMap(case_ => [
    {
      date: new Date(case_.deadline),
      title: `期限: ${case_.client}`,
      type: 'deadline' as const,
      description: case_.description
    },
    ...(case_.reminder ? [{
      date: new Date(case_.reminder),
      title: `リマインダー: ${case_.client}`,
      type: 'reminder' as const,
      description: case_.description
    }] : [])
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">カレンダー</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          className="rounded-md border"
          events={calendarEvents}
        />
      </CardContent>
    </Card>
  );
};
