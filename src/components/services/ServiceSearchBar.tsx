
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ServiceSearchBar = () => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
      <Input
        type="text"
        placeholder="サービスを検索..."
        className="pl-10"
      />
    </div>
  );
};

export default ServiceSearchBar;
