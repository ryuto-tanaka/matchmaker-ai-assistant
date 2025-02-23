
import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProjectDetailsDialog from '@/components/messages/ProjectDetailsDialog';
import FavoriteExpertsDialog from '@/components/messages/FavoriteExpertsDialog';
import MessagesHeader from '@/components/messages/MessagesHeader';
import MessagesSearch from '@/components/messages/MessagesSearch';
import MessagesList from '@/components/messages/MessagesList';
import { UserType } from '@/types/dashboard';
import { useAuth } from '@/hooks/useAuth';
import { useMessages } from '@/hooks/useMessages';

const MessagesPage = () => {
  const [showDetails, setShowDetails] = React.useState(false);
  const [showFavorites, setShowFavorites] = React.useState(false);
  const [selectedConversation, setSelectedConversation] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const location = useLocation();
  const { user } = useAuth();
  const { conversations, unreadCount, isLoading } = useMessages();

  // Extract user type from URL path and ensure it's a valid UserType
  const userType = location.pathname.split('/')[2] as UserType;

  // Filter conversations based on search query
  const filteredConversations = React.useMemo(() => {
    if (!searchQuery) return conversations;
    
    return conversations.filter(conversation => 
      conversation.expertName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [conversations, searchQuery]);

  const handleCreateNew = () => {
    setShowFavorites(true);
  };

  const handleStartConversation = (expertId: string) => {
    setShowFavorites(false);
    // Navigate to the chat with the selected expert
    window.location.href = `/dashboard/${userType}/messages/${expertId}`;
  };

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
        <MessagesHeader
          unreadCount={unreadCount}
          onCreateNew={handleCreateNew}
        />

        <MessagesSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <MessagesList
          conversations={filteredConversations}
          onDetailsClick={(id) => {
            setSelectedConversation(id);
            setShowDetails(true);
          }}
        />

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

        <FavoriteExpertsDialog
          open={showFavorites}
          onOpenChange={setShowFavorites}
          onSelectExpert={handleStartConversation}
        />
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
