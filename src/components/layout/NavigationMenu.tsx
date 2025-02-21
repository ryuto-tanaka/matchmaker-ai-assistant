
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuItem, UserType } from '@/types/dashboard';
import { cn } from "@/lib/utils";

interface NavigationMenuProps {
  currentMenu: MenuItem[];
  userType: UserType;
  isCollapsed: boolean;
}

export const NavigationMenu = ({ currentMenu, userType, isCollapsed }: NavigationMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <ScrollArea className="flex-1 py-4">
      <nav className="space-y-1 px-2">
        {currentMenu.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={cn(
              "w-full justify-start",
              isCollapsed && "justify-center px-2"
            )}
            onClick={() => handleNavigation(item.path)}
          >
            <item.icon className={cn(
              "h-4 w-4",
              !isCollapsed && "mr-2"
            )} />
            {!isCollapsed && item.label}
          </Button>
        ))}
      </nav>
    </ScrollArea>
  );
};
