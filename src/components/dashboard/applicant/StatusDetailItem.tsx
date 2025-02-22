
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface StatusDetailItemProps {
  detail: {
    text: string;
    path: string;
    progress?: number;
    dueDate?: string;
    status?: string;
    urgent?: boolean;
  };
  isValidRoute: (path: string) => boolean;
  onDetailClick: (path: string, event: React.MouseEvent) => void;
  daysLeft: number | null;
}

export const StatusDetailItem = ({ 
  detail, 
  isValidRoute, 
  onDetailClick, 
  daysLeft 
}: StatusDetailItemProps) => {
  const isUrgent = daysLeft !== null && daysLeft <= 7 && daysLeft > 0;
  const isExpired = daysLeft !== null && daysLeft <= 0;

  return (
    <div
      className={cn(
        "p-4 rounded-lg text-sm transition-colors duration-200",
        isValidRoute(detail.path)
          ? 'bg-white/50 cursor-pointer hover:bg-white'
          : 'bg-gray-100/50',
        detail.urgent && 'border-2 border-red-500',
        isExpired && 'opacity-75'
      )}
      onClick={(e) => isValidRoute(detail.path) && onDetailClick(detail.path, e)}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-medium">{detail.text}</span>
        {isUrgent && !isExpired && (
          <AlertCircle className="h-5 w-5 text-red-500 animate-pulse" />
        )}
      </div>
      {detail.progress !== undefined && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{detail.status}</span>
            <span>{detail.progress}%</span>
          </div>
          <Progress value={detail.progress} className="h-1.5" />
        </div>
      )}
      {daysLeft !== null && (
        <p className={cn(
          "text-xs mt-2",
          isExpired ? "text-gray-500" :
          isUrgent ? "text-red-500 font-medium" : "text-gray-500"
        )}>
          {isExpired ? "期限切れ" : `締切まで: ${daysLeft}日`}
        </p>
      )}
    </div>
  );
};
