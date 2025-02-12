import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Users, FileText, CheckCircle2, Building2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handlePlanSelect = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_90%)]" />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative">
        <div className="flex justify-end space-x-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/login')}
          >
            ログイン
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/register')}
          >
            新規登録
          </Button>
        </div>

        <div className="text-center mb-20 animate-fadeIn">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
              AI支援型マッチングプラットフォーム
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
            バックオフィス業務を
            <br />
            AIと専門家がトータルサポート
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            補助金・助成金の申請から、会計、税務、労務まで。
            <br />
            あなたのビジネスに最適な専門家とAIが、
            <br />
            面倒な手続きをすべてサポートします。
          </p>
          <Button 
            size="lg" 
            className="hover-lift"
            onClick={() => navigate('/register')}
          >
            まずは無料相談から始める <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover-lift glass-panel backdrop-blur-sm">
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">解決までの流れ</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-red-500">Before</h3>
              <ul className="space-y-4">
                {beforePoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <span className="text-red-500 mt-1">●</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-primary">After</h3>
              <ul className="space-y-4">
                {afterPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">料金プラン</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className="p-8 hover-lift glass-panel backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                <p className="text-3xl font-bold mb-4">¥{plan.price.toLocaleString()}<span className="text-sm text-gray-600">/月</span></p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={index === 1 ? "default" : "outline"}
                  onClick={handlePlanSelect}
                >
                  プランを選択
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            多くの企業様にご利用いただいています
          </p>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: Users,
    title: "AIマッチング",
    description: "あなたのニーズに最適な専門家をAIが即座にマッチング。経験豊富な士業との出会いをサポートします。",
  },
  {
    icon: FileText,
    title: "書類作成支援",
    description: "補助金・助成金申請から各種届出まで、AIが効率的に書類作成をサポート。人的ミスを大幅に削減。",
  },
  {
    icon: Shield,
    title: "安全な取引",
    description: "情報セキュリティ対策済みの環境で、安心してご利用いただけます。専門家との安全な取引を実現。",
  },
];

const beforePoints = [
  "補助金・助成金の情報が多すぎて、何を選べばいいかわからない",
  "申請書類の作成が複雑で時間がかかる",
  "どの専門家に相談すればいいか迷っている",
  "バックオフィス業務に時間を取られすぎている",
  "コストと効果が見えづらい",
];

const afterPoints = [
  "AIが最適な補助金・助成金を提案し、専門家がサポート",
  "AI支援により書類作成時間を最大80%削減",
  "経験豊富な専門家との最適なマッチングを実現",
  "バックオフィス業務の大幅な効率化を実現",
  "明確な費用対効果と進捗の可視化",
];

const pricingPlans = [
  {
    title: "スタンダードプラン",
    price: 10000,
    features: [
      "補助金・助成金診断",
      "AI書類作成支援",
      "専門家とのマッチング",
      "基本的なサポート",
    ],
  },
  {
    title: "プレミアムプラン",
    price: 20000,
    features: [
      "スタンダードプランの全機能",
      "優先的なマッチング",
      "書類作成の全面サポート",
      "専門家との無制限相談",
      "進捗管理ダッシュボード",
    ],
  },
  {
    title: "士業プラン",
    price: 5000,
    features: [
      "案件紹介",
      "AIツール利用",
      "プロフィール掲載",
      "顧客管理機能",
    ],
  },
];

export default Index;
