
import React from 'react';
import { Download, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface MessageFile {
  name: string;
  size: string;
  status?: 'pending' | 'received' | 'downloaded';
  receivedAt?: string;
}

interface Message {
  id: number;
  content: string;
  sender: "user" | "expert";
  timestamp: string;
  files: MessageFile[];
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const { toast } = useToast();

  const handleFileDownload = (file: MessageFile) => {
    // Here you would implement the actual file download logic
    toast({
      title: "ファイルをダウンロードしました",
      description: `${file.name} のダウンロードが完了しました。`,
    });
  };

  const handleFileReceiptConfirm = (file: MessageFile) => {
    toast({
      title: "ファイル受領を確認しました",
      description: `${file.name} の受領を確認しました。`,
    });
  };

  return (
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
              <div className="mt-2 space-y-2">
                {message.files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-2 text-xs">
                      <Download className="h-4 w-4" />
                      <span>{file.name}</span>
                      <span className="opacity-70">({file.size})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {file.status === 'received' && (
                        <span className="text-xs flex items-center text-green-500">
                          <Check className="h-3 w-3 mr-1" />
                          {file.receivedAt}
                        </span>
                      )}
                      {file.status === 'pending' && (
                        <span className="text-xs flex items-center text-yellow-500">
                          <Clock className="h-3 w-3 mr-1" />
                          確認待ち
                        </span>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          message.sender === "user"
                            ? handleFileReceiptConfirm(file)
                            : handleFileDownload(file);
                        }}
                      >
                        {message.sender === "user" ? "受領確認" : "ダウンロード"}
                      </Button>
                    </div>
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
  );
};

export default ChatMessages;
