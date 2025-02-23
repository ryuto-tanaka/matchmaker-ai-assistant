
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from "@/components/ui/use-toast";
import ExpertInfo from '@/components/messages/ExpertInfo';
import VideoCallDialog from '@/components/messages/VideoCallDialog';
import ChatMessages from '@/components/messages/ChatMessages';
import MessageInput from '@/components/messages/MessageInput';
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const ExpertChatPage = () => {
  const { expertId } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = React.useState("");
  const [showVideoCallDialog, setShowVideoCallDialog] = React.useState(false);

  const { data: expertData, isLoading: isLoadingExpert } = useQuery({
    queryKey: ['expert', expertId],
    queryFn: async () => {
      if (!expertId) throw new Error('Expert ID is required');
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        .eq('id', expertId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!expertId,
  });

  const { data: messages = [], isLoading: isLoadingMessages } = useQuery({
    queryKey: ['messages', user?.id, expertId],
    queryFn: async () => {
      if (!user?.id || !expertId) throw new Error('User ID and Expert ID are required');
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .or(`sender_id.eq.${expertId},receiver_id.eq.${expertId}`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id && !!expertId,
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user?.id || !expertId) return;

    try {
      const { error } = await supabase.from('messages').insert({
        content: newMessage,
        sender_id: user.id,
        receiver_id: expertId,
      });

      if (error) throw error;

      toast({
        title: "メッセージを送信しました",
        description: "クライアントからの返信をお待ちください。",
      });
      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "エラーが発生しました",
        description: "メッセージの送信に失敗しました。",
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !user?.id || !expertId) return;

    try {
      const file = files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('message_attachments')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: messageError } = await supabase.from('messages').insert({
        content: `ファイル: ${file.name}`,
        sender_id: user.id,
        receiver_id: expertId,
        file_attachments: [{ name: file.name, path: filePath }],
      });

      if (messageError) throw messageError;

      toast({
        title: "ファイルがアップロードされました",
        description: `${file.name} を添付しました。`,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        variant: "destructive",
        title: "エラーが発生しました",
        description: "ファイルのアップロードに失敗しました。",
      });
    }
  };

  const handleVideoCallSchedule = () => {
    setShowVideoCallDialog(false);
  };

  if (!expertId) return null;
  if (isLoadingExpert || !expertData) return <div>Loading...</div>;

  return (
    <DashboardLayout userType="expert" userName={user?.email || ''}>
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
