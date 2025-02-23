
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MessageCard from '@/components/messages/MessageCard';
import ProjectDetailsDialog from '@/components/messages/ProjectDetailsDialog';
import { UserType } from '@/types/dashboard';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Search, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const MessagesPage = () => {
  const [showDetails, setShowDetails] = React.useState(false);
  const [selectedConversation, setSelectedConversation] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const location = useLocation();
  const { user } = useAuth();

  // Extract user type from URL path and ensure it's a valid UserType
  const userType = location.pathname.split('/')[2] as UserType;

  const { data: messagesData = [], isLoading } = useQuery({
    queryKey: ['messages', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');

      // Get all messages where the user is either sender or receiver
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
          experts:expert_id (
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

  // Process messages to get conversations and unread count
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

  // Filter conversations based on search query
  const filteredConversations = React.useMemo(() => {
    if (!searchQuery) return conversations;
    
    return conversations.filter(conversation => 
      conversation.expertName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [conversations, searchQuery]);

  const userName = user?.email || '';

  if (isLoading) {
    return (
      <DashboardLayout userType={userType} userName={userName}>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">メッセージ</h1>
          <div>Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType={userType} userName={userName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">メッセージ</h1>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span>{unreadCount}</span>
              </Badge>
            )}
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="メッセージを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4">
          {filteredConversations.map((conversation) => (
            <MessageCard
              key={conversation.id}
              id={conversation.id}
              expertName={conversation.expertName}
              title={conversation.title}
              lastMessage={conversation.lastMessage}
              timestamp={conversation.timestamp}
              onDetailsClick={() => {
                setSelectedConversation(conversation.id);
                setShowDetails(true);
              }}
            />
          ))}
          {filteredConversations.length === 0 && searchQuery && (
            <div className="text-center text-gray-500 py-8">
              検索結果が見つかりませんでした。
            </div>
          )}
        </div>

        <ProjectDetailsDialog
          open={showDetails}
          onOpenChange={setShowDetails}
          project={conversations.find(c => c.id === selectedConversation)?.project || {
            title: "",
            budget: "",
            deadline: "",
            deliveryDate: "",
            details: ""
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
