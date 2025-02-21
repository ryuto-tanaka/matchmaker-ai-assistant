
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const MessagesPage = () => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = React.useState(false);

  // 仮のメッセージ一覧データ
  const conversations = [
    {
      id: 1,
      expertName: "山田太郎",
      title: "中小企業診断士",
      lastMessage: "【やりたいこと】IT導入補助金について",
      timestamp: "2024-02-21T15:30:00",
      project: {
        title: "クロードの project",
        budget: "見積り希望",
        deadline: "2025年2月21日",
        deliveryDate: "未定・相談してみたい",
        details: `
【やりたいこと】
Claudeのプロジェクトで、質の高いセールスレターを書けるツールを作りたい。

安室系、占い系、健康系などさまざまなジャンルに対応したライティングができるツールが好ましい。

【自分の現時点での構想】
ライティングが上手い人の文章を読み込ませ、その文章に沿って、Claudeに文章を作ってもらう。`,
      }
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
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => setShowDetails(true)}
                    >
                      詳細
                    </Button>
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>相談内容の詳細</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">{conversations[0].project.title}</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">予算</p>
                    <p>{conversations[0].project.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">提案期限</p>
                    <p>{conversations[0].project.deadline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">納品希望日</p>
                    <p>{conversations[0].project.deliveryDate}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">相談内容の詳細</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap font-sans">{conversations[0].project.details}</pre>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
