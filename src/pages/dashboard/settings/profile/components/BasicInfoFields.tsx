
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ProfileFormValues } from '../types';

interface BasicInfoFieldsProps {
  form: UseFormReturn<ProfileFormValues>;
}

export const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="company_name"
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
        name="contact_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>担当者名</FormLabel>
            <FormControl>
              <Input placeholder="山田 太郎" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>電話番号</FormLabel>
            <FormControl>
              <Input placeholder="03-xxxx-xxxx" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>住所</FormLabel>
            <FormControl>
              <Input placeholder="東京都〇〇区..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
