
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';

interface ApplicationFiltersProps {
  searchQuery: string;
  selectedPrefecture: string;
  selectedCity: string;
  onSearchChange: (value: string) => void;
  onPrefectureChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onReset: () => void;
  prefectures: Array<{ id: string; name: string }>;
  availableCities: Array<{ id: string; name: string }>;
}

const ApplicationFilters = ({
  searchQuery,
  selectedPrefecture,
  selectedCity,
  onSearchChange,
  onPrefectureChange,
  onCityChange,
  onReset,
  prefectures,
  availableCities,
}: ApplicationFiltersProps) => {
  return (
    <>
      {/* キーワード検索 */}
      <div className="space-y-2">
        <label className="text-sm font-medium">キーワードを入力</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="ご自由に入力してください"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* 地域選択 */}
      <div className="space-y-2">
        <label className="text-sm font-medium">地域を選択</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={selectedPrefecture} onValueChange={onPrefectureChange}>
            <SelectTrigger>
              <SelectValue placeholder="都道府県を選択してください" />
            </SelectTrigger>
            <SelectContent>
              {prefectures.map((prefecture) => (
                <SelectItem key={prefecture.id} value={prefecture.id}>
                  {prefecture.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={selectedCity} 
            onValueChange={onCityChange}
            disabled={!selectedPrefecture}
          >
            <SelectTrigger>
              <SelectValue placeholder="市区町村を選択してください" />
            </SelectTrigger>
            <SelectContent>
              {availableCities.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default ApplicationFilters;
