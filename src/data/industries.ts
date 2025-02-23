
type Industry = {
  name: string;
  subcategories?: {
    name: string;
    subcategories?: {
      name: string;
    }[];
  }[];
};

export const targetIndustries: Industry[] = [
  {
    name: "製造業",
    subcategories: [
      {
        name: "機械・設備",
        subcategories: [
          { name: "機械製造" },
          { name: "工作機械" },
          { name: "産業用ロボット" },
          { name: "航空宇宙" }
        ]
      },
      {
        name: "電機・電子",
        subcategories: [
          { name: "電機電子" },
          { name: "半導体" },
          { name: "光学機器" }
        ]
      },
      {
        name: "素材",
        subcategories: [
          { name: "金属加工" },
          { name: "化学" },
          { name: "繊維" },
          { name: "プラスチック" },
          { name: "セラミックス" }
        ]
      },
      {
        name: "その他製造",
        subcategories: [
          { name: "食品加工" },
          { name: "医療機器" },
          { name: "自動車部品" },
          { name: "印刷" }
        ]
      }
    ]
  },
  {
    name: "IT・デジタル",
    subcategories: [
      {
        name: "ソフトウェア開発",
        subcategories: [
          { name: "ソフトウェア" },
          { name: "システム開発" },
          { name: "アプリ開発" },
          { name: "Web制作" }
        ]
      },
      {
        name: "デジタルサービス",
        subcategories: [
          { name: "クラウドサービス" },
          { name: "IoTソリューション" },
          { name: "デジタルマーケティング" }
        ]
      },
      {
        name: "先端技術",
        subcategories: [
          { name: "AI開発" },
          { name: "ブロックチェーン" },
          { name: "VR/AR開発" }
        ]
      },
      {
        name: "デジタルコンテンツ",
        subcategories: [
          { name: "デジタルコンテンツ" },
          { name: "ゲーム開発" }
        ]
      }
    ]
  },
  {
    name: "サービス業",
    subcategories: [
      {
        name: "小売",
        subcategories: [
          { name: "小売店" },
          { name: "食品スーパー" },
          { name: "コンビニエンスストア" },
          { name: "アパレル" }
        ]
      },
      {
        name: "飲食",
        subcategories: [
          { name: "レストラン" },
          { name: "カフェ" }
        ]
      },
      {
        name: "専門店",
        subcategories: [
          { name: "ドラッグストア" },
          { name: "家電量販店" },
          { name: "書店" },
          { name: "雑貨店" }
        ]
      }
    ]
  }
  // ... 残りのカテゴリーも同様の階層構造で整理
];

