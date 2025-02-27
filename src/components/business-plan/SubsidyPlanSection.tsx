
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./schema";

interface SubsidyPlanSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const SubsidyPlanSection = ({ form }: SubsidyPlanSectionProps) => {
  return (
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
  );
};
