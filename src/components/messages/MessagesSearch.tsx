
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface MessagesSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const MessagesSearch = ({ searchQuery, onSearchChange }: MessagesSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
      <Input
        placeholder="メッセージを検索..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default MessagesSearch;
