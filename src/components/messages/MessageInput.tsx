
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUp, Send } from "lucide-react";

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MessageInput = ({ value, onChange, onSubmit, onFileUpload }: MessageInputProps) => {
  return (
    <div className="p-4 border-t">
      <form onSubmit={onSubmit} className="flex gap-2">
        <Input
          value={value}
          onChange={onChange}
          placeholder="メッセージを入力..."
          className="flex-1"
        />
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={onFileUpload}
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
  );
};

export default MessageInput;
