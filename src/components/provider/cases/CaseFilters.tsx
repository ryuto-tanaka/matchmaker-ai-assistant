
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CaseFiltersProps } from '@/types/client';
import { targetIndustries } from '@/data/industries';

export const CaseFilters = ({
  statusFilter,
  industryFilter,
  deadlineFilter,
  onStatusFilterChange,
  onIndustryFilterChange,
  onDeadlineFilterChange,
}: CaseFiltersProps) => {
  // Extract just the industry names from the complex objects
  const industryNames = targetIndustries.map(industry => industry.name);

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="w-48">
        <Select onValueChange={onStatusFilterChange} defaultValue={statusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="ステータス" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="見積依頼中">見積依頼中</SelectItem>
            <SelectItem value="商談中">商談中</SelectItem>
            <SelectItem value="受注確定">受注確定</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-48">
        <Select onValueChange={onIndustryFilterChange} defaultValue={industryFilter}>
          <SelectTrigger>
            <SelectValue placeholder="業種" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            {industryNames.map((industryName) => (
              <SelectItem key={industryName} value={industryName}>
                {industryName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-48">
        <Input
          type="date"
          value={deadlineFilter}
          onChange={(e) => onDeadlineFilterChange(e.target.value)}
          className="w-full"
          placeholder="期限"
        />
      </div>
    </div>
  );
};
