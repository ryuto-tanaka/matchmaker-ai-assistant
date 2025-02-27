
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { CompanyOverviewSection } from "@/components/business-plan/CompanyOverviewSection";
import { BusinessPlanSection } from "@/components/business-plan/BusinessPlanSection";
import { SubsidyPlanSection } from "@/components/business-plan/SubsidyPlanSection";
import { formSchema } from "@/components/business-plan/schema";

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
            <CompanyOverviewSection form={form} />
            <BusinessPlanSection form={form} />
            <SubsidyPlanSection form={form} />

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
