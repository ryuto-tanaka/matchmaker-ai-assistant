
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
    <CardHeader className="flex flex-col space-y-4 border-b pb-4">
      <CardTitle className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight leading-none bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        スケジュール管理
      </CardTitle>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={onOpenTodoDialog}
          className="flex items-center gap-2 text-sm md:text-base"
        >
          TODOを追加
        </Button>
        <Button
          variant="outline"
          size="default"
          onClick={onGoogleCalendarConnect}
          className="flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm md:text-base whitespace-nowrap"
        >
          <CalendarDays className="h-4 w-4" />
          <span>{isGoogleCalendarConnected ? 'Google Calendar連携済み' : 'Google Calendar連携'}</span>
        </Button>
      </div>
    </CardHeader>
  );
};

export default CalendarHeader;
