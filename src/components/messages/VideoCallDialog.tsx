
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Video } from "lucide-react";

interface VideoCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSchedule: () => void;
}

const VideoCallDialog = ({ open, onOpenChange, onSchedule }: VideoCallDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button onClick={onSchedule} className="w-full">
            予約を確定する
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoCallDialog;
