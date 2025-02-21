
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from "@/components/ui/use-toast";
import ExpertInfo from '@/components/messages/ExpertInfo';
import VideoCallDialog from '@/components/messages/VideoCallDialog';
import ChatMessages from '@/components/messages/ChatMessages';
import MessageInput from '@/components/messages/MessageInput';

const ApplicantChatPage = () => {
  const { expertId } = useParams();
  const { toast } = useToast();
  const [newMessage, setNewMessage] = React.useState("");
  const [showVideoCallDialog, setShowVideoCallDialog] = React.useState(false);

  const userName = "申請者";

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
      sender: "user" as const,
      timestamp: "2024-02-21T15:30:00",
      files: [],
    },
    {
      id: 2,
      content: "IT導入補助金についてご相談ありがとうございます。\n具体的な導入予定のシステムはお決まりでしょうか？",
      sender: "expert" as const,
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
    <DashboardLayout userType="applicant" userName={userName}>
      <div className="flex gap-4 h-[calc(100vh-8rem)]">
        <div className="flex-1 flex flex-col">
          <ChatMessages messages={messages} />
          <MessageInput
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onSubmit={handleSendMessage}
            onFileUpload={handleFileUpload}
          />
        </div>

        <div className="w-80 space-y-4">
          <ExpertInfo expertData={expertData} />
          <VideoCallDialog
            open={showVideoCallDialog}
            onOpenChange={setShowVideoCallDialog}
            onSchedule={handleVideoCallSchedule}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicantChatPage;
