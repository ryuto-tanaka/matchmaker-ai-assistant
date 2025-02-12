
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // プロフィール設定のロジックは後ほど実装
    console.log('Profile setup submitted');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="container max-w-lg mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate('/register')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>

        <Card className="w-full">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">プロフィール設定</h1>
              <p className="text-sm text-gray-600">
                基本情報を入力してください
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">会社名</Label>
                <Input
                  id="company"
                  placeholder="株式会社〇〇"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">担当者名</Label>
                <Input
                  id="name"
                  placeholder="山田 太郎"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">電話番号</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="03-xxxx-xxxx"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">住所</Label>
                <Input
                  id="address"
                  placeholder="東京都〇〇区..."
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              登録を完了する
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;
