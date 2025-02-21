
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutGrid,
  FileText,
  Users,
  MessageSquare,
} from 'lucide-react';

interface MenuItem {
  icon: any;
  label: string;
  path: string;
}

interface NavigationMenuProps {
  currentMenu: MenuItem[];
}

export const NavigationMenu = ({ currentMenu }: NavigationMenuProps) => {
  const navigate = useNavigate();

  return (
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
  );
};
