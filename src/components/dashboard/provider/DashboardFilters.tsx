
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DashboardFiltersProps } from '@/types/providerDashboard';

export const DashboardFilters = ({
  statusFilter,
  dateFilter,
  onStatusFilterChange,
  onDateFilterChange,
}: DashboardFiltersProps) => {
  return (
    <div className="flex gap-4 mb-6" role="search" aria-label="案件フィルター">
      <div className="w-48">
        <Select 
          onValueChange={onStatusFilterChange} 
          defaultValue={statusFilter}
          aria-label="ステータスでフィルター"
        >
          <SelectTrigger>
            <SelectValue placeholder="ステータス" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="in_progress">進行中</SelectItem>
            <SelectItem value="completed">完了</SelectItem>
            <SelectItem value="pending">保留中</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-48">
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => onDateFilterChange(e.target.value)}
          className="w-full"
          aria-label="日付でフィルター"
        />
      </div>
    </div>
  );
};
