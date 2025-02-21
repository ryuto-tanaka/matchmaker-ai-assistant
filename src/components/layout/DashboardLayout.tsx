
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutGrid,
  FileText,
  Users,
  MessageSquare,
} from 'lucide-react';
import { NavigationMenu } from './NavigationMenu';
import { NotificationsMenu } from './NotificationsMenu';
import { UserMenu } from './UserMenu';
import { MenuItem, Notification, UserType } from '@/types/dashboard';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: UserType;
  secondaryTypes?: UserType[];
  userName?: string;
}

const DashboardLayout = ({ 
  children,
  userType,
  secondaryTypes = [],
  userName = 'ユーザー'
}: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const notifications: Notification[] = [
    {
      id: '1',
      title: '補助金申請の締め切り',
      message: 'IT導入補助金の申請締め切りが1週間後に迫っています。',
      date: '2024-03-20',
      read: false
    },
    {
      id: '2',
      title: '専門家からの返信',
      message: '山田先生から申請書類についてコメントが届いています。',
      date: '2024-03-19',
      read: false
    },
    {
      id: '3',
      title: 'システムメンテナンス',
      message: '明日午前2時からシステムメンテナンスを実施します。',
      date: '2024-03-18',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const menuItems: Record<UserType, MenuItem[]> = {
    applicant: [
      { icon: LayoutGrid, label: 'ダッシュボード', path: '/dashboard/applicant' },
      { icon: FileText, label: '補助金申請', path: '/dashboard/applicant/applications' },
      { icon: Users, label: '専門家に相談', path: '/dashboard/applicant/experts' },
      { icon: MessageSquare, label: 'メッセージ', path: '/dashboard/applicant/messages' },
    ],
    provider: [
      { icon: LayoutGrid, label: 'ダッシュボード', path: '/dashboard/provider' },
      { icon: FileText, label: '案件一覧', path: '/dashboard/provider/cases' },
      { icon: Users, label: 'クライアント管理', path: '/dashboard/provider/clients' },
      { icon: MessageSquare, label: 'メッセージ', path: '/dashboard/provider/messages' },
    ],
    expert: [
      { icon: LayoutGrid, label: 'ダッシュボード', path: '/dashboard/expert' },
      { icon: FileText, label: '相談案件', path: '/dashboard/expert/consultations' },
      { icon: Users, label: 'クライアント一覧', path: '/dashboard/expert/clients' },
      { icon: MessageSquare, label: 'メッセージ', path: '/dashboard/expert/messages' },
    ],
  };

  const currentMenu = menuItems[userType];

  const handleTypeSwitch = (newType: UserType) => {
    const currentPath = location.pathname;
    let newPath = `/dashboard/${newType}`;

    if (currentPath.includes('/messages')) {
      newPath = `/dashboard/${newType}/messages`;
    }

    navigate(newPath);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-primary">補助金プラットフォーム</h1>
        </div>
        
        <NavigationMenu 
          currentMenu={currentMenu}
          userType={userType}
        />

        <div className="p-4 border-t">
          <div className="flex items-center space-x-2 mb-4">
            <NotificationsMenu 
              notifications={notifications}
              unreadCount={unreadCount}
            />
          </div>

          <UserMenu
            userName={userName}
            userType={userType}
            secondaryTypes={secondaryTypes}
            onTypeSwitch={handleTypeSwitch}
          />
        </div>
      </div>

      <div className="flex-1 bg-gray-50">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
