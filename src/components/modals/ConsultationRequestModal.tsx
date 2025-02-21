
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  preferredDate: z.string().min(1, "希望日時を選択してください"),
  consultationType: z.string().min(1, "相談内容を選択してください"),
  description: z.string().min(10, "相談内容を10文字以上で入力してください"),
});

interface ConsultationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  expertName: string;
  onSubmitComplete?: (values: z.infer<typeof formSchema>) => void;
}

export const ConsultationRequestModal = ({ 
  isOpen, 
  onClose,
  expertName,
  onSubmitComplete 
}: ConsultationRequestModalProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferredDate: "",
      consultationType: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form submitted:", values);
      
      toast({
        title: "見積り相談をしました",
        description: `【やりたいこと】${values.consultationType}\n\n期間：${values.preferredDate}まで`,
      });
      
      if (onSubmitComplete) {
        onSubmitComplete(values);
      }
      
      onClose();
      form.reset();
    } catch (error) {
      toast({
        title: "エラーが発生しました",
        description: "申し訳ありません。時間をおいて再度お試しください。",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{expertName}への相談予約</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>希望日時</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="consultationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>相談内容</FormLabel>
                  <FormControl>
                    <Input placeholder="例：IT導入補助金について" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>詳細な相談内容</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="相談したい内容の詳細を記入してください"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                キャンセル
              </Button>
              <Button type="submit">予約する</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
