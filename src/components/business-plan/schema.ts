
import * as z from "zod";

export const formSchema = z.object({
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
