
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X } from 'lucide-react';

const ApplicationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrefecture, setSelectedPrefecture] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
  const purposes = [
    "起業・創業・ベンチャー", "人材育成・雇用", "経営改善・経営強化", "海外展開", "地域活性・まちづくり",
    "観光・インバウンド", "感染症対策", "新規事業・第二創業", "事業承継", "設備投資",
    "研究・実証実験・産学連携", "ものづくり・新商品開発", "生産性向上・業務効率化", "デジタル", "省エネ",
    "再エネ・省エネ", "販路開拓・販路拡大", "環境", "防犯・防災・BCP", "空き家利用"
  ];

  return (
    <DashboardLayout userType="applicant" userName="申請者">
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">補助金情報</h1>

        <Card className="bg-white/50 backdrop-blur-sm">
          <CardContent className="p-6 space-y-6">
            {/* キーワード検索 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">キーワードを入力</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="ご自由に入力してください"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* 地域選択 */}
            <div className="space-y-2">
              <label className="text-sm font-medium">地域を選択</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select value={selectedPrefecture} onValueChange={setSelectedPrefecture}>
                  <SelectTrigger>
                    <SelectValue placeholder="都道府県を選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tokyo">東京都</SelectItem>
                    <SelectItem value="kanagawa">神奈川県</SelectItem>
                    <SelectItem value="osaka">大阪府</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="市区町村を選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shinjuku">新宿区</SelectItem>
                    <SelectItem value="shibuya">渋谷区</SelectItem>
                    <SelectItem value="minato">港区</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 利用目的選択 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">利用目的を選択</label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm text-gray-500"
                  onClick={() => {
                    // リセットロジックを実装
                  }}
                >
                  <X className="h-4 w-4 mr-1" />
                  リセットする
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {purposes.map((purpose) => (
                  <div key={purpose} className="flex items-center space-x-2">
                    <Checkbox id={purpose} />
                    <label
                      htmlFor={purpose}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {purpose}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* 検索ボタン */}
            <div className="flex justify-center pt-4">
              <Button className="w-full max-w-md" size="lg">
                <Search className="mr-2 h-4 w-4" />
                この条件で検索する
              </Button>
            </div>

            {/* 検索結果カウント */}
            <div className="text-center text-sm text-gray-600">
              <span className="text-2xl font-bold text-primary">37,986</span> 件がヒットしました
              <span className="mx-2">/</span>
              総登録件数 <span className="font-bold">37,986</span> 件
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationsPage;
