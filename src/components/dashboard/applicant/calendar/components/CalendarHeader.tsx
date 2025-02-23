
import React from 'react';
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from 'lucide-react';

interface CalendarHeaderProps {
  isGoogleCalendarConnected: boolean;
  onGoogleCalendarConnect: () => void;
  onOpenTodoDialog: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  isGoogleCalendarConnected,
  onGoogleCalendarConnect,
  onOpenTodoDialog,
}) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
      <CardTitle className="text-2xl font-bold text-gray-800">スケジュール管理</CardTitle>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onOpenTodoDialog}
          className="flex items-center gap-2"
        >
          TODOを追加
        </Button>
        <Button
          variant="outline"
          size="default"
          onClick={onGoogleCalendarConnect}
          className="flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <CalendarDays className="h-4 w-4" />
          <span>{isGoogleCalendarConnected ? 'Google Calendar連携済み' : 'Google Calendar連携'}</span>
        </Button>
      </div>
    </CardHeader>
  );
};

export default CalendarHeader;
