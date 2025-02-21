
import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MessageCard from '@/components/messages/MessageCard';
import ProjectDetailsDialog from '@/components/messages/ProjectDetailsDialog';
import { UserType } from '@/types/dashboard';

const MessagesPage = () => {
  const [showDetails, setShowDetails] = React.useState(false);
  const location = useLocation();

  // Extract user type from URL path and ensure it's a valid UserType
  const userType = location.pathname.split('/')[2] as UserType;

  // ユーザータイプに基づいてメッセージデータを調整
  const conversations = [
    {
      id: 1,
      expertName: userType === 'expert' ? "クライアントA" : "山田太郎",
      title: userType === 'expert' ? "相談者" : "中小企業診断士",
      lastMessage: "IT導入補助金について",
      timestamp: "2024-02-21T15:30:00",
      project: {
        title: "クロードの project",
        budget: "見積り希望",
        deadline: "2025年2月21日",
        deliveryDate: "未定・相談してみたい",
        details: `IT導入補助金について`,
      }
    },
  ];

  const userName = {
    applicant: "申請者",
    provider: "株式会社〇〇",
    expert: "田中弁護士"
  }[userType];

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
          project={conversations[0].project}
        />
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
