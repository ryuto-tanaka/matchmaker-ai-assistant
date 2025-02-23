
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
  },
  {
    name: "金融・保険",
    subcategories: [
      {
        name: "銀行・金融",
        subcategories: [
          { name: "銀行" },
          { name: "証券" },
          { name: "投資" },
          { name: "フィンテック" }
        ]
      },
      {
        name: "保険",
        subcategories: [
          { name: "生命保険" },
          { name: "損害保険" },
          { name: "保険代理店" }
        ]
      }
    ]
  },
  {
    name: "建設・不動産",
    subcategories: [
      {
        name: "建設",
        subcategories: [
          { name: "建築" },
          { name: "土木" },
          { name: "設備工事" },
          { name: "リフォーム" }
        ]
      },
      {
        name: "不動産",
        subcategories: [
          { name: "不動産売買" },
          { name: "不動産賃貸" },
          { name: "不動産管理" },
          { name: "不動産開発" }
        ]
      }
    ]
  },
  {
    name: "医療・福祉",
    subcategories: [
      {
        name: "医療",
        subcategories: [
          { name: "病院" },
          { name: "診療所" },
          { name: "歯科医院" },
          { name: "薬局" }
        ]
      },
      {
        name: "福祉",
        subcategories: [
          { name: "介護施設" },
          { name: "デイサービス" },
          { name: "障害者支援" },
          { name: "保育所" }
        ]
      }
    ]
  },
  {
    name: "教育",
    subcategories: [
      {
        name: "学校教育",
        subcategories: [
          { name: "小中学校" },
          { name: "高校" },
          { name: "専門学校" },
          { name: "大学" }
        ]
      },
      {
        name: "その他教育",
        subcategories: [
          { name: "塾・予備校" },
          { name: "語学学校" },
          { name: "職業訓練" },
          { name: "オンライン教育" }
        ]
      }
    ]
  },
  {
    name: "運輸・物流",
    subcategories: [
      {
        name: "運輸",
        subcategories: [
          { name: "陸上運送" },
          { name: "海上運送" },
          { name: "航空運送" },
          { name: "旅客運送" }
        ]
      },
      {
        name: "物流",
        subcategories: [
          { name: "倉庫" },
          { name: "配送センター" },
          { name: "宅配便" },
          { name: "3PL" }
        ]
      }
    ]
  }
];

