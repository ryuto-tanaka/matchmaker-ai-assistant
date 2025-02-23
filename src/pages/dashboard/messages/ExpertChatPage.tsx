
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from "@/components/ui/use-toast";
import ExpertInfo from '@/components/messages/ExpertInfo';
import VideoCallDialog from '@/components/messages/VideoCallDialog';
import ChatMessages from '@/components/messages/ChatMessages';
import MessageInput from '@/components/messages/MessageInput';
import { useAuth } from "@/hooks/useAuth";

const ExpertChatPage = () => {
  const { expertId } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = React.useState("");
  const [showVideoCallDialog, setShowVideoCallDialog] = React.useState(false);

  const userName = "田中弁護士";

  // 仮のクライアントデータ
  const expertData = {
    id: expertId || '',
    name: "クライアントA",
    title: "相談者",
    specialties: ["IT導入補助金", "事業再構築補助金"],
    experience: "-",
    profile: "IT導入補助金の申請を検討中の企業です。",
  };

  // 仮のメッセージデータ
  const messages = [
    {
      id: 1,
      content: "【相談内容】IT導入補助金について\n\n期間：2024年3月31日まで",
      sender: "expert" as const,
      timestamp: "2024-02-21T15:30:00",
      files: [],
    },
    {
      id: 2,
      content: "承知いたしました。具体的な導入予定のシステムについて教えていただけますでしょうか？",
      sender: "user" as const,
      timestamp: "2024-02-21T15:35:00",
      files: [{
        name: "補助金申請_チェックリスト.pdf",
        size: "1.8MB"
      }],
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    toast({
      title: "メッセージを送信しました",
      description: "クライアントからの返信をお待ちください。",
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
    setShowVideoCallDialog(false);
  };

  if (!expertId) return null;

  return (
    <DashboardLayout userType="expert" userName={userName}>
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
            expertId={expertId}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ExpertChatPage;
