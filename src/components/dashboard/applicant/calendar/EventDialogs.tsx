
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  isTodoDialogOpen: boolean;
  setIsTodoDialogOpen: (value: boolean) => void;
  reminderTime: string;
  setReminderTime: (value: string) => void;
  onReminderSave: () => void;
  newTodo: {
    title: string;
    date: Date;
    description: string;
  };
  setNewTodo: (value: { title: string; date: Date; description: string; }) => void;
  onTodoSave: () => void;
}

const EventDialogs = ({
  selectedEvent,
  isEventDetailsOpen,
  setIsEventDetailsOpen,
  isReminderDialogOpen,
  setIsReminderDialogOpen,
  isTodoDialogOpen,
  setIsTodoDialogOpen,
  reminderTime,
  setReminderTime,
  onReminderSave,
  newTodo,
  setNewTodo,
  onTodoSave,
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
                selectedEvent?.type === 'todo' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {selectedEvent?.type === 'deadline' && '期限'}
                {selectedEvent?.type === 'consultation' && '相談'}
                {selectedEvent?.type === 'reminder' && 'リマインダー'}
                {selectedEvent?.type === 'todo' && 'TODO'}
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

      <Dialog open={isTodoDialogOpen} onOpenChange={setIsTodoDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">新しいTODOを追加</DialogTitle>
            <DialogDescription className="text-gray-600">
              TODOの詳細を入力してください
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="todo-title" className="text-gray-700">タイトル</Label>
              <Input
                id="todo-title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                placeholder="TODOのタイトル"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="todo-date" className="text-gray-700">日付</Label>
              <Input
                id="todo-date"
                type="date"
                value={format(newTodo.date, 'yyyy-MM-dd')}
                onChange={(e) => setNewTodo({ ...newTodo, date: new Date(e.target.value) })}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="todo-description" className="text-gray-700">説明</Label>
              <Textarea
                id="todo-description"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                placeholder="TODOの説明"
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onTodoSave}>
              TODOを追加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventDialogs;
