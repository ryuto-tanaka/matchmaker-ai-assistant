
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Notification } from '@/types/dashboard';
import { cn } from "@/lib/utils";
import { Bell } from 'lucide-react';

interface NotificationsMenuProps {
  notifications: Notification[];
  unreadCount: number;
  isCollapsed: boolean;
}

export const NotificationsMenu = ({ notifications, unreadCount, isCollapsed }: NotificationsMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative hover:bg-gray-100 transition-colors",
            isCollapsed ? "w-full" : "w-auto"
          )}
        >
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">通知を表示</span>
          <Bell className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2">
          <h4 className="text-sm font-semibold mb-2">通知</h4>
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  notification.read ? 'bg-gray-50 hover:bg-gray-100' : 'bg-blue-50 hover:bg-blue-100'
                )}
              >
                <div className="text-sm font-medium">{notification.title}</div>
                <div className="text-xs text-gray-500">{notification.message}</div>
                <div className="text-xs text-gray-400 mt-1">{notification.date}</div>
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
