
import { z } from "zod";

export const profileSchema = z.object({
  company_name: z.string().min(1, "会社名を入力してください"),
  contact_name: z.string().min(1, "担当者名を入力してください"),
  phone: z.string()
    .min(1, "電話番号を入力してください")
    .regex(/^(0\d{1,4}-?\d{1,4}-?\d{4})$/, "正しい電話番号の形式で入力してください"),
  address: z.string().min(1, "住所を入力してください"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
