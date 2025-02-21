
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
import { UserType } from '@/types/dashboard';
import { cn } from "@/lib/utils";

interface UserMenuProps {
  userName: string;
  userType: UserType;
  secondaryTypes: UserType[];
  onTypeSwitch: (type: UserType) => void;
  isCollapsed: boolean;
}

export const UserMenu = ({ userName, userType, secondaryTypes, onTypeSwitch, isCollapsed }: UserMenuProps) => {
  const navigate = useNavigate();
  const { signOut } = useAuthContext();

  const availableUserTypes: { type: UserType; label: string }[] = [
    { type: 'applicant', label: '申請者' },
    { type: 'provider', label: 'サービス提供者' },
    { type: 'expert', label: '専門家' },
  ];

  const switchableTypes = availableUserTypes.filter(
    (availableType) => availableType.type !== userType
  );

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
        <Button 
          variant="ghost" 
          className={cn(
            "w-full flex items-center transition-colors hover:bg-gray-100",
            isCollapsed ? "justify-center px-2" : "justify-between px-3"
          )}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              {userName[0]}
            </div>
            {!isCollapsed && (
              <span className="ml-3 text-sm font-medium overflow-hidden text-ellipsis">
                {userName}
              </span>
            )}
          </div>
          {!isCollapsed && <ChevronDown className="h-4 w-4 ml-2" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {switchableTypes.map((type) => {
          const isRegistered = secondaryTypes.includes(type.type);
          if (isRegistered) {
            return (
              <DropdownMenuItem key={type.type} onClick={() => onTypeSwitch(type.type)}>
                <UserCog className="mr-2 h-4 w-4" />
                {type.label}として表示
              </DropdownMenuItem>
            );
          } else {
            return (
              <DropdownMenuItem key={type.type} onClick={() => navigate(`/register/${type.type}`)}>
                <UserPlus className="mr-2 h-4 w-4" />
                {type.label}として登録
              </DropdownMenuItem>
            );
          }
        })}

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
