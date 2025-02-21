
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  UserPlus,
  UserCog,
  Settings,
  LogOut,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuthContext } from '@/contexts/AuthContext';

interface UserMenuProps {
  userName: string;
  userType: string;
  secondaryTypes: ('applicant' | 'provider' | 'expert')[];
  onTypeSwitch: (type: string) => void;
}

export const UserMenu = ({ userName, userType, secondaryTypes, onTypeSwitch }: UserMenuProps) => {
  const navigate = useNavigate();
  const { signOut } = useAuthContext();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
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
        {secondaryTypes.map((type) => (
          <DropdownMenuItem key={type} onClick={() => onTypeSwitch(type)}>
            <UserCog className="mr-2 h-4 w-4" />
            {type === 'applicant' && '申請者として表示'}
            {type === 'provider' && 'サービス提供者として表示'}
            {type === 'expert' && '専門家として表示'}
          </DropdownMenuItem>
        ))}

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
  );
};
