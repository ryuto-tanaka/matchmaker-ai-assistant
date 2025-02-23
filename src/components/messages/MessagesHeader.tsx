
import React from 'react';
import { Mail, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MessagesHeaderProps {
  unreadCount: number;
  onCreateNew: () => void;
}

const MessagesHeader = ({ unreadCount, onCreateNew }: MessagesHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">メッセージ</h1>
        <Badge 
          variant={unreadCount > 0 ? "destructive" : "secondary"} 
          className="flex items-center gap-1"
        >
          <Mail className="h-4 w-4" />
          <span>{unreadCount}</span>
        </Badge>
      </div>
      <Button
        onClick={onCreateNew}
        className="bg-green-500 hover:bg-green-600"
      >
        <Plus className="w-4 h-4 mr-2" />
        作成を開始する
      </Button>
    </div>
  );
};

export default MessagesHeader;
