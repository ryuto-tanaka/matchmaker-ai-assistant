
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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

  const menuItems = {
    applicant: [
      { icon: LayoutGrid, label: 'ダッシュボード', path: '/dashboard/applicant' },
      { icon: FileText, label: '補助金申請', path: '/dashboard/applicant/applications' },
      { icon: Users, label: '専門家に相談', path: '/dashboard/applicant/experts' },
    ],
    provider: [
      { icon: LayoutGrid, label: 'ダッシュボード', path: '/dashboard/provider' },
      { icon: FileText, label: '案件一覧', path: '/dashboard/provider/cases' },
      { icon: Users, label: 'クライアント管理', path: '/dashboard/provider/clients' },
    ],
    expert: [
      { icon: LayoutGrid, label: 'ダッシュボード', path: '/dashboard/expert' },
      { icon: FileText, label: '相談案件', path: '/dashboard/expert/consultations' },
      { icon: Users, label: 'クライアント一覧', path: '/dashboard/expert/clients' },
    ],
  };

  const currentMenu = menuItems[userType];

  const handleTypeSwitch = (type: string) => {
    navigate(`/dashboard/${type}`);
  };

  const handleLogout = () => {
    // TODO: ログアウト処理の実装
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* サイドバー */}
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                {userName[0]}
              </div>
              <span className="ml-2 text-sm font-medium">{userName}</span>
            </div>
            {secondaryTypes.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {secondaryTypes.map((type) => (
                    <DropdownMenuItem key={type} onClick={() => handleTypeSwitch(type)}>
                      {type === 'applicant' && '申請者として表示'}
                      {type === 'provider' && 'サービス提供者として表示'}
                      {type === 'expert' && '専門家として表示'}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/dashboard/settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              設定
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              ログアウト
            </Button>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 bg-gray-50">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
