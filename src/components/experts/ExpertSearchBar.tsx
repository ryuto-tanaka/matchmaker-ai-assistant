
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = 'rating-desc' | 'rating-asc' | 'consultations-desc' | 'consultations-asc' | 'newest' | 'recommended';

interface ExpertSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortOption: SortOption;
  onSortChange: (value: SortOption) => void;
}

export const ExpertSearchBar = ({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
}: ExpertSearchBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="専門家を検索..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Select
        value={sortOption}
        onValueChange={(value) => onSortChange(value as SortOption)}
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="並び替え" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recommended">おすすめ順</SelectItem>
          <SelectItem value="newest">新着順</SelectItem>
          <SelectItem value="rating-desc">評価が高い順</SelectItem>
          <SelectItem value="rating-asc">評価が低い順</SelectItem>
          <SelectItem value="consultations-desc">相談件数が多い順</SelectItem>
          <SelectItem value="consultations-asc">相談件数が少ない順</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
