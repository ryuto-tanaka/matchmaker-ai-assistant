
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuItem, UserType } from '@/types/dashboard';

interface NavigationMenuProps {
  currentMenu: MenuItem[];
  userType: UserType;
}

export const NavigationMenu = ({ currentMenu, userType }: NavigationMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    // ユーザータイプに基づいてパスを構築
    const basePath = `/dashboard/${userType}`;
    
    // メッセージページの場合は特別処理
    if (path.includes('/messages')) {
      navigate(path);
      return;
    }

    // その他のページの場合は、現在のユーザータイプに基づいてパスを構築
    const newPath = path.startsWith('/dashboard') 
      ? path.replace(/^\/dashboard\/[^/]+/, basePath)
      : path;

    navigate(newPath);
  };

  return (
    <ScrollArea className="flex-1 py-4">
      <nav className="space-y-1 px-2">
        {currentMenu.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => handleNavigation(item.path)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </ScrollArea>
  );
};
