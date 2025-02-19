import { LoadingTimeoutAlert } from "@/components/ui/loading-timeout-alert";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { UserRole } from "@/types/user";
import { ArrowRight, CheckCircle2, Shield, Briefcase, Users, LogIn } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          switch (user.role) {
            case UserRole.APPLICANT:
              navigate("/dashboard/applicant");
              break;
            case UserRole.PROVIDER:
              navigate("/dashboard/provider");
              break;
            case UserRole.EXPERT:
              navigate("/dashboard/expert");
              break;
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const features = [
    {
      icon: Shield,
      title: "安全な申請プロセス",
      description: "専門家による二重チェック体制で、申請書類の質を担保。確実な申請をサポートします",
    },
    {
      icon: Briefcase,
      title: "経験豊富な専門家が伴走",
      description: "補助金・助成金の申請実績500件以上。様々な業界・規模の企業様をサポートしてきた実績があります",
    },
    {
      icon: Users,
      title: "24時間365日体制",
      description: "急な相談にも対応可能。チャットサポートで素早く疑問を解決し、スムーズな申請をサポートします",
    },
  ];

  const benefits = [
    {
      title: "圧倒的な採択実績",
      description: "過去3年間の採択率95%以上。豊富な経験と専門知識を活かし、高い採択率を実現しています",
    },
    {
      title: "専門家による個別支援",
      description: "業界経験15年以上のプロフェッショナルが、企業様の状況に合わせて最適な申請戦略を提案します",
    },
    {
      title: "徹底したリスク管理",
      description: "申請から採択後のフォローまで、リスクを最小限に抑えるための包括的なサポート体制を整えています",
    },
    {
      title: "透明性の高い進行管理",
      description: "申請の進捗状況をリアルタイムで確認可能。予定外の遅延や問題を未然に防ぎます",
    },
  ];

  const metrics = [
    {
      title: "補助金申請時間",
      reduction: "70",
      description: "AI活用による効率化で、申請時間を大幅カット"
    },
    {
      title: "助成金申請時間",
      reduction: "65",
      description: "専門家サポートで、手続き時間を削減"
    },
    {
      title: "事業計画書作成",
      reduction: "90",
      description: "AIと専門家の連携で、ほぼ自動作成"
    }
  ];

  const targetIndustries = [
    "機械製造", "食品加工", "電機電子", "金属加工", "化学", "繊維",
    "ソフトウェア", "クラウドサービス", "デジタルコンテンツ", "システム開発", "データ分析", "AI開発",
    "小売店", "レストラン", "カフェ", "食品スーパー", "アパレル", "ドラッグストア",
    "建設会社", "不動産", "建築設計", "リフォーム", "インテリア",
    "病院", "クリニック", "介護施設", "保育所", "リハビリ施設",
    "美容院", "エステ", "ホテル", "旅館", "フィットネス", "学習塾",
    "運輸", "倉庫", "農業", "水産", "林業", "環境"
  ];

  const serviceCategories = [
    {
      title: "Web制作",
      services: [
        "ホームページ制作",
        "ランディングページ制作",
        "ECサイト構築",
        "Webデザイン",
        "コーディング",
        "SEO対策",
        "Webコンサルティング",
      ],
    },
    {
      title: "デザイン",
      services: [
        "ロゴデザイン",
        "名刺デザイン",
        "パンフレットデザイン",
        "チラシデザイン",
        "パッケージデザイン",
        "イラスト制作",
        "UI/UXデザイン",
      ],
    },
    {
      title: "ライティング",
      services: [
        "記事作成",
        "ブログ記事作成",
        "コピーライティング",
        "コンテンツマーケティング",
        "SEOライティング",
        "セールスライティング",
        "翻訳",
      ],
    },
    {
      title: "マーケティング",
      services: [
        "Webマーケティング",
        "SNSマーケティング",
        "SEOマーケティング",
        "コンテンツマーケティング",
        "広告運用",
        "インフルエンサーマーケティング",
        "メールマーケティング",
      ],
    },
    {
      title: "コンサルティング",
      services: [
        "経営コンサルティング",
        "Webコンサルティング",
        "マーケティングコンサルティング",
        "ITコンサルティング",
        "人事コンサルティング",
        "財務コンサルティング",
        "業務改善コンサルティング",
      ],
    },
    {
      title: "その他",
      services: [
        "動画制作",
        "写真撮影",
        "プログラミング",
        "システム開発",
        "アプリ開発",
        "翻訳",
        "ナレーション",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="relative pt-12 pb-20 sm:pt-16 lg:pt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="space-y-4">
                  <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                    採択率95%以上の実績
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                    補助金・助成金申請を
                    <span className="text-primary block">もっとシンプルに</span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl">
                    経験豊富な専門家があなたの事業に最適な補助金・助成金を見つけ、
                    申請から採択までトータルでサポート。
                    <span className="block mt-2 font-semibold">
                      面倒な手続きをAIと専門家の力でスムーズに。
                    </span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="text-xl px-12 py-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    onClick={() => navigate("/register")}
                  >
                    今すぐ無料で始める
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-xl px-12 py-8 bg-white border-primary border-2 text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                    onClick={() => navigate("/login")}
                  >
                    <LogIn className="mr-3 h-6 w-6" />
                    ログインはこちら
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow-lg">
                  {features.map((feature, index) => (
                    <div key={index} className="text-center p-4">
                      <div className="flex items-center justify-center mb-3">
                        <CheckCircle2 className="text-primary w-6 h-6" />
                        <span className="ml-2 font-semibold">{feature.title}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-lg blur"></div>
                  <img
                    src="/placeholder.svg"
                    alt="Dashboard preview"
                    className="relative rounded-lg shadow-2xl"
                  />
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">セキュリティ対策済み</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* メトリクスセクション */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              圧倒的な効率化を実現
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              AIと専門家の力で、申請プロセスを大幅に効率化
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-4">{metric.title}</h3>
                  <div className="text-5xl font-bold text-primary mb-2">
                    {metric.reduction}
                    <span className="text-2xl">%</span>
                  </div>
                  <p className="text-gray-600">{metric.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 特徴セクション */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              充実のサポート体制
            </span>
            <h2 className="text-3xl font-bold mb-4">
              申請をよりスムーズに
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              補助金・助成金の申請に必要な情報収集から書類作成まで、
              各ステップでプロフェッショナルがサポート。
              <span className="block mt-2 font-medium">
                経験豊富な専門家とAIの力で、確実な申請を実現します。
              </span>
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-xl hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 hover:border-primary/20"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* メリットセクション */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              選ばれる理由
            </span>
            <h2 className="text-3xl font-bold mb-4">
              圧倒的な実績と信頼性
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              豊富な経験と実績に基づく、質の高いサポートで
              確実な申請をお手伝いします。
              <span className="block mt-2 font-medium">
                専門家による個別支援で、あなたの事業の成長をサポート。
              </span>
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20"
              >
                <div className="text-primary text-4xl font-bold mb-4">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 対象業種セクション */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              幅広い業種に対応
            </span>
            <h2 className="text-4xl font-bold mb-6">
              あらゆる業種の企業様を
              <span className="text-primary block mt-2">強力にサポート</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              業種や規模を問わず、さまざまな企業様の補助金・助成金申請をサポートしています。
              <span className="block mt-2 font-medium">
                豊富な実績と専門知識で、最適な補助金・助成金を見つけ出します。
              </span>
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-primary/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              対応業種一覧
            </h3>
            <div className="flex flex-wrap gap-3">
              {targetIndustries.map((industry, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-colors duration-200"
                >
                  {industry}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-6">
              ※上記以外の業種もサポート可能です。お気軽にご相談ください。
            </p>
          </div>
        </div>
      </div>

      {/* CTAセクション */}
      <div className="py-20 bg-gradient-to-r from-primary/90 to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white text-sm font-semibold mb-6">
            今すぐ始めよう
          </span>
          <h2 className="text-3xl font-bold mb-6">
            まずは無料で始めてみませんか？
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            経験豊富なプロフェッショナルが、
            あなたに最適な補助金・助成金を見つけ、
            申請から採択までサポートします。
            <span className="block mt-2 font-medium">
              初期費用0円で、成功報酬型だから安心。
            </span>
          </p>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate("/register")}
          >
            無料アカウントを作成
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <LoadingTimeoutAlert isLoading={isLoading} timeout={60000} />
    </div>
  );
};

export default Index;
