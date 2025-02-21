
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ConsultationActionModalProps {
  consultationId: number;
  onAction: (id: number, action: 'approve' | 'reject', message: string) => void;
}

export function ConsultationActionModal({ consultationId, onAction }: ConsultationActionModalProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (action) {
      onAction(consultationId, action, message);
      setOpen(false);
      setMessage('');
      setAction(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>承認/拒否</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>相談予約への対応</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">メッセージ</Label>
            <Textarea
              id="message"
              placeholder="クライアントへのメッセージを入力してください"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="bg-red-50 text-red-600 hover:bg-red-100"
              onClick={() => setAction('reject')}
            >
              拒否
            </Button>
            <Button
              type="submit"
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setAction('approve')}
            >
              承認
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
