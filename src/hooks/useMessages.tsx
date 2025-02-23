
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Conversation {
  id: number;
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

export const useMessages = () => {
  const { user } = useAuth();

  const { data: messagesData = [], isLoading } = useQuery({
    queryKey: ['messages', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');

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

      if (messagesError) throw messagesError;

      return messages || [];
    },
    enabled: !!user?.id,
  });

  const { conversations, unreadCount } = React.useMemo(() => {
    const conversationMap = new Map();
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
          new Date(message.created_at) > new Date(conversationMap.get(expertId).timestamp)) {
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

  return { conversations, unreadCount, isLoading };
};
