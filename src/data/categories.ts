
import { TargetCategory, ServiceCategory } from "@/types/categories";

export const targetCategories: TargetCategory[] = [
  {
    title: "製造業",
    examples: ["工場の自動化", "生産設備の導入", "研究開発支援"],
    industries: ["機械製造", "食品加工", "電機電子"]
  },
  {
    title: "IT・サービス業",
    examples: ["システム開発", "デジタル化支援", "クラウド導入"],
    industries: ["ソフトウェア", "クラウドサービス", "デジタルコンテンツ"]
  },
  {
    title: "小売・飲食業",
    examples: ["店舗改装", "デジタル化", "衛生設備導入"],
    industries: ["小売店", "レストラン", "カフェ"]
  },
  {
    title: "建設・不動産",
    examples: ["設備投資", "環境対策", "安全対策"],
    industries: ["建設会社", "不動産", "建築設計"]
  }
];

export const serviceCategories: ServiceCategory[] = [
  {
    title: "美容・健康",
    services: [
      "エステサロン支援", "ネイルサロン支援", "ボディメイク", "美容鍼灸", 
      "ダイエット", "整体技術指導", "セルフケア", "ヨガ", "パーソナルトレーニング"
    ]
  },
  {
    title: "教育・スキル",
    services: [
      "プログラミング", "WEBデザイン", "Canvaデザイン", "動画編集",
      "英語コーチ", "フランス語", "教員支援", "料理教室", "ピアノ教室支援"
    ]
  },
  {
    title: "ビジネス支援",
    services: [
      "女性起業家支援", "コーチング", "キャリアコーチング", "転職支援",
      "ネットショップ支援", "SNSマーケティング", "物販", "FX投資"
    ]
  },
  {
    title: "ライフスタイル",
    services: [
      "子育て支援", "夫婦仲改善", "心理セラピスト", "性格診断",
      "占い", "手相鑑定", "開運術", "マインドフルネス"
    ]
  }
];
