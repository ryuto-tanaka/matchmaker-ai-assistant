
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import type { EventDetails } from './types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EventDialogsProps {
  selectedEvent: EventDetails | null;
  isEventDetailsOpen: boolean;
  setIsEventDetailsOpen: (value: boolean) => void;
  isReminderDialogOpen: boolean;
  setIsReminderDialogOpen: (value: boolean) => void;
  reminderTime: string;
  setReminderTime: (value: string) => void;
  onReminderSave: () => void;
}

const EventDialogs = ({
  selectedEvent,
  isEventDetailsOpen,
  setIsEventDetailsOpen,
  isReminderDialogOpen,
  setIsReminderDialogOpen,
  reminderTime,
  setReminderTime,
  onReminderSave,
}: EventDialogsProps) => {
  return (
    <>
      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{selectedEvent?.title}</DialogTitle>
            <DialogDescription className="text-gray-600">
              {selectedEvent?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">日時</span>
              <span className="text-gray-600">
                {selectedEvent && format(selectedEvent.date, 'yyyy年MM月dd日')}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">種類</span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                selectedEvent?.type === 'deadline' ? 'bg-red-100 text-red-800' :
                selectedEvent?.type === 'consultation' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {selectedEvent?.type === 'deadline' && '期限'}
                {selectedEvent?.type === 'consultation' && '相談'}
                {selectedEvent?.type === 'reminder' && 'リマインダー'}
              </span>
            </div>
          </div>
          <DialogFooter className="space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEventDetailsOpen(false);
                setIsReminderDialogOpen(true);
              }}
              className="hover:bg-gray-50"
            >
              リマインダーを設定
            </Button>
            <Button onClick={() => setIsEventDetailsOpen(false)}>
              閉じる
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">リマインダー設定</DialogTitle>
            <DialogDescription className="text-gray-600">
              {selectedEvent?.title}のリマインダーを設定します
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reminder-time" className="text-gray-700">通知時間</Label>
              <Input
                id="reminder-time"
                type="datetime-local"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onReminderSave}>
              設定を保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventDialogs;
