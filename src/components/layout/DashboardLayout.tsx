import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutGrid,
  FileText,
  Users,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { NavigationMenu } from './NavigationMenu';
import { NotificationsMenu } from './NotificationsMenu';
import { UserMenu } from './UserMenu';
import { MenuItem, Notification, UserType } from '@/types/dashboard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen flex w-full">
      {/* サイドバー */}
      <div className={cn(
        "fixed h-full bg-white border-r z-10 transition-all duration-300 shadow-sm",
        isSidebarCollapsed ? "w-16" : "w-64"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <h1 className={cn(
              "text-xl font-bold text-primary transition-opacity duration-300 overflow-hidden",
              isSidebarCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            )}>
              補助金プラットフォーム
            </h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={cn(
                "hover:bg-gray-100 transition-colors",
                isSidebarCollapsed && "mx-auto"
              )}
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <NavigationMenu 
              currentMenu={currentMenu}
              userType={userType}
              isCollapsed={isSidebarCollapsed}
            />
          </div>

          <div className="p-4 border-t mt-auto bg-white space-y-4">
            <NotificationsMenu 
              notifications={notifications}
              unreadCount={unreadCount}
              isCollapsed={isSidebarCollapsed}
            />
            <UserMenu
              userName={userName}
              userType={userType}
              secondaryTypes={secondaryTypes}
              onTypeSwitch={handleTypeSwitch}
              isCollapsed={isSidebarCollapsed}
            />
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        isSidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        <main className="p-6 min-h-screen bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
