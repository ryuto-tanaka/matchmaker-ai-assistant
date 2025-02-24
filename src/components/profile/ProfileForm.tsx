
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ProfileFormProps {
  formData: {
    company_name: string;
    contact_name: string;
    phone: string;
    address: string;
  };
  validationErrors: Record<string, string>;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  formData,
  validationErrors,
  isSubmitting,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">プロフィール設定</h1>
        <p className="text-sm text-gray-600">
          基本情報を入力してください
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company_name">会社名</Label>
          <Input
            id="company_name"
            placeholder="株式会社〇〇"
            value={formData.company_name}
            onChange={onChange}
            aria-invalid={!!validationErrors.company_name}
          />
          {validationErrors.company_name && (
            <p className="text-sm text-red-500">{validationErrors.company_name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_name">担当者名</Label>
          <Input
            id="contact_name"
            placeholder="山田 太郎"
            value={formData.contact_name}
            onChange={onChange}
            aria-invalid={!!validationErrors.contact_name}
          />
          {validationErrors.contact_name && (
            <p className="text-sm text-red-500">{validationErrors.contact_name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">電話番号</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="03-xxxx-xxxx"
            value={formData.phone}
            onChange={onChange}
            aria-invalid={!!validationErrors.phone}
          />
          {validationErrors.phone && (
            <p className="text-sm text-red-500">{validationErrors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">住所</Label>
          <Input
            id="address"
            placeholder="東京都〇〇区..."
            value={formData.address}
            onChange={onChange}
            aria-invalid={!!validationErrors.address}
          />
          {validationErrors.address && (
            <p className="text-sm text-red-500">{validationErrors.address}</p>
          )}
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? '保存中...' : '登録を完了する'}
      </Button>
    </form>
  );
};
