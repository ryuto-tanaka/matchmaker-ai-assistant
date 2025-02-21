
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, FileUp, Video, Download, User, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const ChatPage = () => {
  const { expertId } = useParams();
  const { toast } = useToast();
  const [newMessage, setNewMessage] = React.useState("");
  const [showVideoCallDialog, setShowVideoCallDialog] = React.useState(false);

  // 仮の専門家データ
  const expertData = {
    id: expertId,
    name: "山田太郎",
    title: "中小企業診断士",
    specialties: ["IT導入補助金", "事業再構築補助金", "経営革新計画"],
    experience: "15年",
    profile: "IT企業での経験を活かし、デジタル化支援を得意としています。",
  };

  // 仮のメッセージデータ
  const messages = [
    {
      id: 1,
      content: "【やりたいこと】IT導入補助金について\n\n期間：2024年3月31日まで",
      sender: "user",
      timestamp: "2024-02-21T15:30:00",
      files: [],
    },
    {
      id: 2,
      content: "IT導入補助金についてご相談ありがとうございます。\n具体的な導入予定のシステムはお決まりでしょうか？",
      sender: "expert",
      timestamp: "2024-02-21T15:35:00",
      files: [{
        name: "IT導入補助金_概要資料.pdf",
        size: "2.4MB"
      }],
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    toast({
      title: "メッセージを送信しました",
      description: "専門家からの返信をお待ちください。",
    });
    setNewMessage("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      toast({
        title: "ファイルがアップロードされました",
        description: `${files[0].name} を添付しました。`,
      });
    }
  };

  const handleVideoCallSchedule = () => {
    toast({
      title: "ビデオ通話が予約されました",
      description: "予約日時: 2024年3月1日 15:00",
    });
    setShowVideoCallDialog(false);
  };

  return (
    <DashboardLayout userType="applicant" userName="申請者">
      <div className="flex gap-4 h-[calc(100vh-8rem)]">
        {/* メインチャットエリア */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-background rounded-lg border">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
                  {message.files.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.files.map((file, index) => (
                        <div key={index} className="flex items-center text-xs space-x-2">
                          <Download className="h-4 w-4" />
                          <span>{file.name}</span>
                          <span className="opacity-70">({file.size})</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="メッセージを入力..."
                className="flex-1"
              />
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <FileUp className="h-4 w-4" />
              </Button>
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* 右サイドバー: 専門家情報とアクション */}
        <div className="w-80 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{expertData.name}</h3>
                <p className="text-sm text-muted-foreground">{expertData.title}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>専門分野</Label>
                <div className="mt-1 text-sm space-y-1">
                  {expertData.specialties.map((specialty, index) => (
                    <div key={index} className="bg-muted rounded px-2 py-1">
                      {specialty}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>経験年数</Label>
                <p className="mt-1 text-sm">{expertData.experience}</p>
              </div>
              <div>
                <Label>プロフィール</Label>
                <p className="mt-1 text-sm">{expertData.profile}</p>
              </div>
              <Dialog open={showVideoCallDialog} onOpenChange={setShowVideoCallDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="secondary">
                    <Video className="mr-2 h-4 w-4" />
                    ビデオ通話を予約
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>ビデオ通話の予約</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>予約日時</Label>
                      <Input type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label>相談内容</Label>
                      <Textarea placeholder="相談したい内容を記入してください" />
                    </div>
                    <Button onClick={handleVideoCallSchedule} className="w-full">
                      予約を確定する
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;
