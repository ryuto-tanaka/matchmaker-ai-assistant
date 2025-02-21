
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

const MessagesPage = () => {
  const navigate = useNavigate();

  // 仮のメッセージ一覧データ
  const conversations = [
    {
      id: 1,
      expertName: "山田太郎",
      title: "中小企業診断士",
      lastMessage: "IT導入補助金について",
      timestamp: "2024-02-21T15:30:00",
    },
  ];

  return (
    <DashboardLayout userType="applicant" userName="申請者">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">メッセージ</h1>

        <div className="grid gap-4">
          {conversations.map((conversation) => (
            <Card
              key={conversation.id}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{conversation.expertName}</h3>
                        <span className="text-sm text-muted-foreground">
                          {new Date(conversation.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{conversation.title}</p>
                      <p className="text-sm mt-1 line-clamp-1">{conversation.lastMessage}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      console.log("Navigating to:", `/dashboard/messages/${conversation.id}`);
                      navigate(`/dashboard/messages/${conversation.id}`, { replace: true });
                    }}
                  >
                    開く
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
