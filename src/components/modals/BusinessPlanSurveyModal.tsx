
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
  companyOverview: z.object({
    name: z.string().min(1, "会社名を入力してください"),
    established: z.string().min(1, "設立年月を入力してください"),
    employees: z.string().min(1, "従業員数を入力してください"),
    capital: z.string().min(1, "資本金を入力してください"),
  }),
  businessPlan: z.object({
    currentState: z.string().min(10, "現状分析を入力してください"),
    objectives: z.string().min(10, "目標を入力してください"),
    strategy: z.string().min(10, "実施計画を入力してください"),
    marketAnalysis: z.string().min(10, "市場分析を入力してください"),
    financialProjection: z.string().min(10, "収支計画を入力してください"),
  }),
  subsidy: z.object({
    amount: z.string().min(1, "申請金額を入力してください"),
    purpose: z.string().min(10, "資金用途を入力してください"),
    timeline: z.string().min(10, "実施スケジュールを入力してください"),
  }),
});

interface BusinessPlanSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}

export const BusinessPlanSurveyModal = ({ isOpen, onClose, onSubmit }: BusinessPlanSurveyModalProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyOverview: {
        name: "",
        established: "",
        employees: "",
        capital: "",
      },
      businessPlan: {
        currentState: "",
        objectives: "",
        strategy: "",
        marketAnalysis: "",
        financialProjection: "",
      },
      subsidy: {
        amount: "",
        purpose: "",
        timeline: "",
      },
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await onSubmit(values);
      toast({
        title: "事業計画書を保存しました",
        description: "次のステップに進みます。",
      });
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
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>事業計画書の作成</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            {/* 会社概要セクション */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">会社概要</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companyOverview.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>会社名</FormLabel>
                      <FormControl>
                        <Input placeholder="株式会社〇〇" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyOverview.established"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>設立年月</FormLabel>
                      <FormControl>
                        <Input type="month" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyOverview.employees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>従業員数</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyOverview.capital"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>資本金</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1000000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* 事業計画セクション */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">事業計画</h3>
              <FormField
                control={form.control}
                name="businessPlan.currentState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>現状分析</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="現在の事業状況や課題について記述してください"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessPlan.objectives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>目標</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="達成したい目標を具体的に記述してください"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessPlan.strategy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>実施計画</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="目標達成のための具体的な計画を記述してください"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessPlan.marketAnalysis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>市場分析</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="対象市場の規模や競合状況について記述してください"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessPlan.financialProjection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>収支計画</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="3年間の収支予測を記述してください"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 補助金利用計画セクション */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">補助金利用計画</h3>
              <FormField
                control={form.control}
                name="subsidy.amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>申請金額</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subsidy.purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>資金用途</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="補助金の具体的な使途について記述してください"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subsidy.timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>実施スケジュール</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="補助金を活用した事業の実施スケジュールを記述してください"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                下書き保存
              </Button>
              <Button type="submit">次へ進む</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
