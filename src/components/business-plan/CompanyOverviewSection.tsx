
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./schema";

interface CompanyOverviewSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export const CompanyOverviewSection = ({ form }: CompanyOverviewSectionProps) => {
  return (
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
  );
};
