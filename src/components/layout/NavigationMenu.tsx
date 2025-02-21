
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
    <ScrollArea className="flex-1 py-2">
      <nav className="space-y-1 px-2">
        {currentMenu.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={cn(
              "w-full justify-start hover:bg-gray-100 transition-colors",
              isCollapsed ? "px-3" : "px-4",
              location.pathname === item.path && "bg-gray-100"
            )}
            onClick={() => handleNavigation(item.path)}
          >
            <item.icon className={cn(
              "h-4 w-4",
              !isCollapsed && "mr-3"
            )} />
            <span className={cn(
              "transition-all duration-200",
              isCollapsed && "w-0 opacity-0 hidden"
            )}>
              {item.label}
            </span>
          </Button>
        ))}
      </nav>
    </ScrollArea>
  );
};

