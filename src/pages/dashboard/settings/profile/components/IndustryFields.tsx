
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { targetIndustries } from '@/data/industries';
import { ProfileFormValues } from '../types';

interface IndustryFieldsProps {
  form: UseFormReturn<ProfileFormValues>;
  selectedIndustry: string;
  setSelectedIndustry: (value: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (value: string) => void;
  subcategories: { name: string }[];
  detailCategories: { name: string }[];
}

export const IndustryFields: React.FC<IndustryFieldsProps> = ({
  form,
  selectedIndustry,
  setSelectedIndustry,
  selectedSubcategory,
  setSelectedSubcategory,
  subcategories,
  detailCategories,
}) => {
  return (
    <div className="space-y-4">
      <FormItem>
        <FormLabel>業種</FormLabel>
        <Select
          value={selectedIndustry}
          onValueChange={setSelectedIndustry}
        >
          <SelectTrigger>
            <SelectValue placeholder="業種を選択" />
          </SelectTrigger>
          <SelectContent>
            {targetIndustries.map((industry) => (
              <SelectItem key={industry.name} value={industry.name}>
                {industry.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormItem>

      {selectedIndustry && (
        <FormItem>
          <FormLabel>業種カテゴリー</FormLabel>
          <Select
            value={selectedSubcategory}
            onValueChange={setSelectedSubcategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="カテゴリーを選択" />
            </SelectTrigger>
            <SelectContent>
              {subcategories.map((subcat) => (
                <SelectItem key={subcat.name} value={subcat.name}>
                  {subcat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}

      {selectedSubcategory && (
        <FormField
          control={form.control}
          name="industry_detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>詳細カテゴリー</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="詳細カテゴリーを選択" />
                </SelectTrigger>
                <SelectContent>
                  {detailCategories.map((detail) => (
                    <SelectItem key={detail.name} value={detail.name}>
                      {detail.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};
