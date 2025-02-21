
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ConversationProject {
  title: string;
  budget: string;
  deadline: string;
  deliveryDate: string;
  details: string;
}

interface MessageCardProps {
  id: number;
  expertName: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  onDetailsClick: () => void;
}

const MessageCard = ({ 
  id, 
  expertName, 
  title, 
  lastMessage, 
  timestamp,
  onDetailsClick 
}: MessageCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract user type from current URL path
  const userType = location.pathname.split('/')[2];

  return (
    <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{expertName}</h3>
                <span className="text-sm text-muted-foreground">
                  {new Date(timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="text-sm mt-1 line-clamp-1">{lastMessage}</p>
              <Button 
                variant="link"
                className="text-sm p-0 h-auto mt-1"
                onClick={onDetailsClick}
              >
                詳細を見る
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => {
                const path = `/dashboard/${userType}/messages/${id}`;
                console.log("Navigating to:", path);
                navigate(path, { replace: true });
              }}
            >
              開く
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageCard;
