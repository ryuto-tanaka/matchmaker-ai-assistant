
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchResultsSummaryProps {
  totalResults: number;
  totalCount: number;
  onSearch: () => void;
}

const SearchResultsSummary = ({ totalResults, totalCount, onSearch }: SearchResultsSummaryProps) => {
  return (
    <>
      <div className="flex justify-center pt-4">
        <Button className="w-full max-w-md" size="lg" onClick={onSearch}>
          <Search className="mr-2 h-4 w-4" />
          この条件で検索する
        </Button>
      </div>

      <div className="text-center text-sm text-gray-600">
        <span className="text-2xl font-bold text-primary">{totalResults.toLocaleString()}</span> 件がヒットしました
        <span className="mx-2">/</span>
        総登録件数 <span className="font-bold">{totalCount.toLocaleString()}</span> 件
      </div>
    </>
  );
};

export default SearchResultsSummary;
