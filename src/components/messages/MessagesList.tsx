
import React from 'react';
import MessageCard from '@/components/messages/MessageCard';
import type { Conversation } from '@/hooks/useMessages';

interface MessagesListProps {
  conversations: Conversation[];
  onDetailsClick: (conversationId: number) => void;
}

const MessagesList = ({ conversations, onDetailsClick }: MessagesListProps) => {
  return (
    <div className="grid gap-4">
      {conversations.map((conversation) => (
        <MessageCard
          key={conversation.id}
          id={conversation.id}
          expertName={conversation.expertName}
          title={conversation.title}
          lastMessage={conversation.lastMessage}
          timestamp={conversation.timestamp}
          onDetailsClick={() => onDetailsClick(conversation.id)}
        />
      ))}
      {conversations.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          検索結果が見つかりませんでした。
        </div>
      )}
    </div>
  );
};

export default MessagesList;
