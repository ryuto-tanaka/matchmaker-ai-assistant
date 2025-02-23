
import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Conversation {
  id: string; // Changed from number to string to match Supabase UUID type
  expertName: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  project: {
    title: string;
    budget: string;
    deadline: string;
    deliveryDate: string;
    details: string;
  };
}

interface Message {
  id: string; // Changed from number to string to match Supabase UUID type
  content: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  read_at: string | null;
  expert_id: string; // Changed from number to string
  experts: {
    id: string; // Changed from number to string
    name: string;
    title: string;
  } | null;
}

export const useMessages = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: messagesData = [], isLoading } = useQuery({
    queryKey: ['messages', user?.id],
    queryFn: async (): Promise<Message[]> => {
      if (!user?.id) throw new Error('認証が必要です');

      const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          created_at,
          sender_id,
          receiver_id,
          read_at,
          expert_id,
          experts (
            id,
            name,
            title
          )
        `)
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (messagesError) {
        throw new Error('メッセージの取得に失敗しました');
      }

      return messages || [];
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5分間キャッシュを保持
    gcTime: 1000 * 60 * 30, // Changed from cacheTime to gcTime - 30分間キャッシュを維持
  });

  // メッセージの既読状態を更新する関数
  const markMessageAsRead = React.useCallback(async (messageId: string) => { // Changed from number to string
    if (!user?.id) return;

    const { error } = await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('id', messageId)
      .eq('receiver_id', user.id);

    if (!error) {
      // キャッシュを更新
      queryClient.setQueryData(['messages', user.id], (oldData: Message[] | undefined) => {
        if (!oldData) return [];
        return oldData.map(message => 
          message.id === messageId 
            ? { ...message, read_at: new Date().toISOString() }
            : message
        );
      });
    }
  }, [user?.id, queryClient]);

  const { conversations, unreadCount } = React.useMemo(() => {
    const conversationMap = new Map<string, Conversation>(); // Changed from number to string
    let unreadMessages = 0;

    messagesData.forEach((message) => {
      const expert = message.experts;
      if (!expert) return;
      
      const expertId = expert.id;
      const isUnread = message.receiver_id === user?.id && !message.read_at;
      
      if (isUnread) {
        unreadMessages++;
      }

      if (!conversationMap.has(expertId) || 
          new Date(message.created_at) > new Date(conversationMap.get(expertId)!.timestamp)) {
        conversationMap.set(expertId, {
          id: expertId,
          expertName: expert.name,
          title: expert.title,
          lastMessage: message.content,
          timestamp: message.created_at,
          project: {
            title: "相談内容",
            budget: "見積り希望",
            deadline: "未定",
            deliveryDate: "未定",
            details: message.content,
          }
        });
      }
    });

    return {
      conversations: Array.from(conversationMap.values()),
      unreadCount: unreadMessages
    };
  }, [messagesData, user?.id]);

  return { 
    conversations, 
    unreadCount, 
    isLoading,
    markMessageAsRead 
  };
};
