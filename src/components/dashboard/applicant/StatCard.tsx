
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { StatusDetailItem } from './StatusDetailItem';
import { cn } from "@/lib/utils";

interface StatCardProps {
  stat: {
    icon: LucideIcon;
    label: string;
    value: string;
    color: string;
    iconColor: string;
    progress?: number;
    details: Array<{
      text: string;
      path: string;
      progress?: number;
      dueDate?: string;
      status?: string;
      urgent?: boolean;
    }>;
  };
  isExpanded: boolean;
  onExpandChange: () => void;
  isValidRoute: (path: string) => boolean;
  onDetailClick: (path: string, event: React.MouseEvent) => void;
  getDaysUntil: (dateString: string) => number;
}

export const StatCard = ({
  stat,
  isExpanded,
  onExpandChange,
  isValidRoute,
  onDetailClick,
  getDaysUntil
}: StatCardProps) => {
  const Icon = stat.icon;

  return (
    <Collapsible open={isExpanded} onOpenChange={onExpandChange}>
      <Card className={`transition-all duration-300 hover:shadow-md ${stat.color}`}>
        <CollapsibleTrigger className="w-full">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-gray-500 transition-transform duration-300 ease-in-out",
                  isExpanded && "transform rotate-180"
                )}
              />
            </div>
            {stat.progress !== undefined && (
              <div className="mt-4">
                <Progress value={stat.progress} className="h-2" />
                <p className="text-xs text-right mt-1 text-gray-500">
                  全体の進捗: {stat.progress}%
                </p>
              </div>
            )}
          </CardContent>
        </CollapsibleTrigger>
        <CollapsibleContent className="animate-accordion-down">
          <div className="px-6 pb-6 pt-0 space-y-2">
            {stat.details.map((detail, index) => (
              <StatusDetailItem
                key={index}
                detail={detail}
                isValidRoute={isValidRoute}
                onDetailClick={onDetailClick}
                daysLeft={detail.dueDate ? getDaysUntil(detail.dueDate) : null}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
