
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MessageCard from '@/components/messages/MessageCard';
import ProjectDetailsDialog from '@/components/messages/ProjectDetailsDialog';
import { UserType } from '@/types/dashboard';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const MessagesPage = () => {
  const [showDetails, setShowDetails] = React.useState(false);
  const location = useLocation();
  const { user } = useAuth();

  // Extract user type from URL path and ensure it's a valid UserType
  const userType = location.pathname.split('/')[2] as UserType;

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ['conversations', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');

      // First, get all messages where the user is either sender or receiver
      const { data: messages, error: messagesError } = await supabase
        .from('messages')
        .select(`
          id,
          content,
          created_at,
          sender_id,
          receiver_id,
          experts!inner (
            id,
            name,
            title
          )
        `)
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (messagesError) throw messagesError;

      // Group messages by expert and get the latest message for each
      const conversationMap = new Map();
      messages?.forEach((message) => {
        const expert = message.experts;
        const expertId = expert.id;
        
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

      return Array.from(conversationMap.values());
    },
    enabled: !!user?.id,
  });

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
        <h1 className="text-2xl font-bold">メッセージ</h1>

        <div className="grid gap-4">
          {conversations.map((conversation) => (
            <MessageCard
              key={conversation.id}
              id={conversation.id}
              expertName={conversation.expertName}
              title={conversation.title}
              lastMessage={conversation.lastMessage}
              timestamp={conversation.timestamp}
              onDetailsClick={() => setShowDetails(true)}
            />
          ))}
        </div>

        <ProjectDetailsDialog
          open={showDetails}
          onOpenChange={setShowDetails}
          project={conversations[0]?.project}
        />
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;

