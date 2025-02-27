
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./schema";

interface BusinessPlanSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const BusinessPlanSection = ({ form }: BusinessPlanSectionProps) => {
  return (
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
  );
};
