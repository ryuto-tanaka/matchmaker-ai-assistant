
import React from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";

const formSchema = z.object({
  scheduledAt: z.string().min(1, "予約日時を選択してください"),
  topic: z.string().min(1, "相談内容を入力してください"),
});

interface VideoCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSchedule: () => void;
  expertId: string;
}

const VideoCallDialog = ({ 
  open, 
  onOpenChange, 
  onSchedule,
  expertId 
}: VideoCallDialogProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scheduledAt: "",
      topic: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "エラーが発生しました",
        description: "ログインが必要です。",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('video_calls')
        .insert({
          expert_id: expertId,
          user_id: user.id,
          scheduled_at: new Date(values.scheduledAt).toISOString(),
          topic: values.topic,
          status: 'scheduled'
        });

      if (error) throw error;

      toast({
        title: "ビデオ通話を予約しました",
        description: `予約日時: ${new Date(values.scheduledAt).toLocaleString()}`,
      });

      form.reset();
      onSchedule();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "エラーが発生しました",
        description: "ビデオ通話の予約に失敗しました。もう一度お試しください。",
      });
      console.error("Video call scheduling error:", error);
    }
  };

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="scheduledAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>予約日時</FormLabel>
                  <FormControl>
                    <Input 
                      type="datetime-local" 
                      {...field}
                      min={new Date().toISOString().slice(0, 16)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>相談内容</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="相談したい内容を記入してください"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full">
                予約を確定する
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default VideoCallDialog;
