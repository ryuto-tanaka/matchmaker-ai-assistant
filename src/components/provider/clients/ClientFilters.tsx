
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ClientFiltersProps {
  statusFilter: string;
  dateFilter: string;
  sortBy: string;
  showHighPriorityOnly: boolean;
  setStatusFilter: (value: string) => void;
  setDateFilter: (value: string) => void;
  setSortBy: (value: string) => void;
  setShowHighPriorityOnly: (value: boolean) => void;
}

export const ClientFilters = ({
  statusFilter,
  dateFilter,
  sortBy,
  showHighPriorityOnly,
  setStatusFilter,
  setDateFilter,
  setSortBy,
  setShowHighPriorityOnly,
}: ClientFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="w-48">
        <Select onValueChange={setStatusFilter} defaultValue={statusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="ステータス" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="アクティブ">アクティブ</SelectItem>
            <SelectItem value="完了">完了</SelectItem>
            <SelectItem value="保留中">保留中</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-48">
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="w-48">
        <Select onValueChange={setSortBy} defaultValue={sortBy}>
          <SelectTrigger>
            <SelectValue placeholder="並び替え" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lastUpdated">最終更新日</SelectItem>
            <SelectItem value="priority">重要度</SelectItem>
            <SelectItem value="activeProjects">進行中案件数</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="priority-filter"
          checked={showHighPriorityOnly}
          onCheckedChange={setShowHighPriorityOnly}
        />
        <Label htmlFor="priority-filter">重要案件のみ表示</Label>
      </div>
    </div>
  );
};
