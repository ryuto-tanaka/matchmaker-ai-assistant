
import React from 'react';
import { Download } from "lucide-react";

interface MessageFile {
  name: string;
  size: string;
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
  );
};

export default ChatMessages;
