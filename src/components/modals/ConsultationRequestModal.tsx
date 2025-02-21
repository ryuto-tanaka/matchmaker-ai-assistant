
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
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
      preferredDate: roundToNearest15Minutes(),
      consultationType: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form submitted:", values);
      
      toast({
        title: "相談予約を受け付けました",
        description: `${values.consultationType}\n\n期間：${values.preferredDate}`,
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

  function roundToNearest15Minutes() {
    const now = new Date();
    const minutes = now.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 15) * 15;
    now.setMinutes(roundedMinutes);
    now.setSeconds(0);
    now.setMilliseconds(0);
    
    if (roundedMinutes === 60) {
      now.setHours(now.getHours() + 1);
      now.setMinutes(0);
    }
    
    return now.toISOString().slice(0, 16);
  }

  function validateAndFormatTime(dateString: string) {
    const date = new Date(dateString);
    const minutes = date.getMinutes();
    
    // 最も近い15分単位に丸める
    const remainder = minutes % 15;
    let roundedMinutes = minutes;
    
    if (remainder !== 0) {
      roundedMinutes = minutes - remainder;
      date.setMinutes(roundedMinutes);
    }
    
    return date.toISOString().slice(0, 16);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{expertName}への相談予約</DialogTitle>
          <DialogDescription>相談日時は15分単位で選択できます</DialogDescription>
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
                    <Input 
                      type="datetime-local"
                      step="900"
                      min={roundToNearest15Minutes()}
                      value={field.value}
                      onChange={(e) => {
                        const formattedDate = validateAndFormatTime(e.target.value);
                        field.onChange(formattedDate);
                      }}
                    />
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
                    <Input placeholder="相談内容を入力してください" {...field} />
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
