import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from "@/components/ui/card";
import ApplicationFilters from '@/components/applicant/applications/ApplicationFilters';
import PurposeSelection from '@/components/applicant/applications/PurposeSelection';
import SearchResultsSummary from '@/components/applicant/applications/SearchResultsSummary';

// 都道府県データ
const prefectures = [
  { id: "hokkaido", name: "北海道" },
  { id: "aomori", name: "青森県" },
  { id: "iwate", name: "岩手県" },
  { id: "miyagi", name: "宮城県" },
  { id: "akita", name: "秋田県" },
  { id: "yamagata", name: "山形県" },
  { id: "fukushima", name: "福島県" },
  { id: "ibaraki", name: "茨城県" },
  { id: "tochigi", name: "栃木県" },
  { id: "gunma", name: "群馬県" },
  { id: "saitama", name: "埼玉県" },
  { id: "chiba", name: "千葉県" },
  { id: "tokyo", name: "東京都" },
  { id: "kanagawa", name: "神奈川県" },
  { id: "niigata", name: "新潟県" },
  { id: "toyama", name: "富山県" },
  { id: "ishikawa", name: "石川県" },
  { id: "fukui", name: "福井県" },
  { id: "yamanashi", name: "山梨県" },
  { id: "nagano", name: "長野県" },
  { id: "gifu", name: "岐阜県" },
  { id: "shizuoka", name: "静岡県" },
  { id: "aichi", name: "愛知県" },
  { id: "mie", name: "三重県" },
  { id: "shiga", name: "滋賀県" },
  { id: "kyoto", name: "京都府" },
  { id: "osaka", name: "大阪府" },
  { id: "hyogo", name: "兵庫県" },
  { id: "nara", name: "奈良県" },
  { id: "wakayama", name: "和歌山県" },
  { id: "tottori", name: "鳥取県" },
  { id: "shimane", name: "島根県" },
  { id: "okayama", name: "岡山県" },
  { id: "hiroshima", name: "広島県" },
  { id: "yamaguchi", name: "山口県" },
  { id: "tokushima", name: "徳島県" },
  { id: "kagawa", name: "香川県" },
  { id: "ehime", name: "愛媛県" },
  { id: "kochi", name: "高知県" },
  { id: "fukuoka", name: "福岡県" },
  { id: "saga", name: "佐賀県" },
  { id: "nagasaki", name: "長崎県" },
  { id: "kumamoto", name: "熊本県" },
  { id: "oita", name: "大分県" },
  { id: "miyazaki", name: "宮崎県" },
  { id: "kagoshima", name: "鹿児島県" },
  { id: "okinawa", name: "沖縄県" }
];

// 市区町村データ
const cities: { [key: string]: { id: string; name: string }[] } = {
  tokyo: [
    { id: "chiyoda", name: "千代田区" },
    { id: "chuo", name: "中央区" },
    { id: "minato", name: "港区" },
    { id: "shinjuku", name: "新宿区" },
    { id: "shibuya", name: "渋谷区" },
    { id: "meguro", name: "目黒区" },
    { id: "setagaya", name: "世田谷区" },
    // ... 他の地域も同様に追加
  ],
  kanagawa: [
    { id: "yokohama", name: "横浜市" },
    { id: "kawasaki", name: "川崎市" },
    { id: "sagamihara", name: "相模原市" },
    { id: "yokosuka", name: "横須賀市" },
    // ... 他の地域も同様に追加
  ],
  // ... 他の都道府県も同様に追加
};

// 目的一覧
const purposes = [
  "起業・創業・ベンチャー", "人材育成・雇用", "経営改善・経営強化", "海外展開", "地域活性・まちづくり",
  "観光・インバウンド", "感染症対策", "新規事業・第二創業", "事業承継", "設備投資",
  "研究・実証実験・産学連携", "ものづくり・新商品開発", "生産性向上・業務効率化", "デジタル", "省エネ",
  "再エネ・省エネ", "販路開拓・販路拡大", "環境", "防犯・防災・BCP", "空き家利用"
];

const ApplicationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrefecture, setSelectedPrefecture] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
  // 選択された都道府県に基づいて市区町村を取得
  const availableCities = useMemo(() => {
    if (!selectedPrefecture) return [];
    return cities[selectedPrefecture] || [];
  }, [selectedPrefecture]);

  // 都道府県が変更されたときの処理
  const handlePrefectureChange = (value: string) => {
    setSelectedPrefecture(value);
    setSelectedCity(''); // 市区町村の選択をリセット
  };

  // リセット処理
  const handleReset = () => {
    setSearchQuery('');
    setSelectedPrefecture('');
    setSelectedCity('');
  };

  // 検索処理
  const handleSearch = () => {
    // 検索ロジックをここに実装
    console.log('Searching with:', { searchQuery, selectedPrefecture, selectedCity });
  };

  return (
    <DashboardLayout userType="applicant" userName="申請者">
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">補助金情報</h1>

        <Card className="bg-white/50 backdrop-blur-sm">
          <CardContent className="p-6 space-y-6">
            <ApplicationFilters
              searchQuery={searchQuery}
              selectedPrefecture={selectedPrefecture}
              selectedCity={selectedCity}
              onSearchChange={setSearchQuery}
              onPrefectureChange={handlePrefectureChange}
              onCityChange={setSelectedCity}
              onReset={handleReset}
              prefectures={prefectures}
              availableCities={availableCities}
            />

            <PurposeSelection
              purposes={purposes}
              onReset={handleReset}
            />

            <SearchResultsSummary
              totalResults={37986}
              totalCount={37986}
              onSearch={handleSearch}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationsPage;
