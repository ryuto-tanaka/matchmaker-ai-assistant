
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  UserPlus,
  UserCog,
  MessageSquare,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'applicant' | 'provider' | 'expert';
  secondaryTypes?: ('applicant' | 'provider' | 'expert')[];
  userName?: string;
}

const DashboardLayout = ({ 
  children,
  userType,
  secondaryTypes = [],
  userName = 'ユーザー'
}: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { signOut } = useAuthContext();

  const menuItems = {
    applicant: [
      { icon: LayoutGrid, label: 'ダッシュボード', path: '/dashboard/applicant' },
      { icon: FileText, label: '補助金申請', path: '/dashboard/applicant/applications' },
      { icon: Users, label: '専門家に相談', path: '/dashboard/applicant/experts' },
      { icon: MessageSquare, label: 'メッセージ', path: '/dashboard/messages' },
    ],
    provider: [
      { icon: LayoutGrid, label: 'ダッシュボード', path: '/dashboard/provider' },
      { icon: FileText, label: '案件一覧', path: '/dashboard/provider/cases' },
      { icon: Users, label: 'クライアント管理', path: '/dashboard/provider/clients' },
      { icon: MessageSquare, label: 'メッセージ', path: '/dashboard/messages' },
    ],
    expert: [
      { icon: LayoutGrid, label: 'ダッシュボード', path: '/dashboard/expert' },
      { icon: FileText, label: '相談案件', path: '/dashboard/expert/consultations' },
      { icon: Users, label: 'クライアント一覧', path: '/dashboard/expert/clients' },
      { icon: MessageSquare, label: 'メッセージ', path: '/dashboard/messages' },
    ],
  };

  const currentMenu = menuItems[userType];

  const handleTypeSwitch = (type: string) => {
    navigate(`/dashboard/${type}`);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-primary">補助金プラットフォーム</h1>
        </div>
        
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {currentMenu.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate(item.path)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full flex items-center justify-between p-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                    {userName[0]}
                  </div>
                  <span className="ml-2 text-sm font-medium">{userName}</span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {/* アカウントタイプの切り替え */}
              {secondaryTypes.map((type) => (
                <DropdownMenuItem key={type} onClick={() => handleTypeSwitch(type)}>
                  <UserCog className="mr-2 h-4 w-4" />
                  {type === 'applicant' && '申請者として表示'}
                  {type === 'provider' && 'サービス提供者として表示'}
                  {type === 'expert' && '専門家として表示'}
                </DropdownMenuItem>
              ))}

              {/* 新規登録オプション */}
              {!secondaryTypes.includes('provider') && (
                <DropdownMenuItem onClick={() => navigate('/register/provider')}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  サービス提供者として登録
                </DropdownMenuItem>
              )}
              {!secondaryTypes.includes('expert') && (
                <DropdownMenuItem onClick={() => navigate('/register/expert')}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  専門家として登録
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />
              
              {/* 設定とログアウト */}
              <DropdownMenuItem onClick={() => navigate('/dashboard/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                設定
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-500 focus:text-red-500 focus:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                ログアウト
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
