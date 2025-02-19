
import { LoadingTimeoutAlert } from "@/components/ui/loading-timeout-alert";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { UserRole } from "@/types/user";
import { ArrowRight, CheckCircle2, Shield, Briefcase, Users } from "lucide-react";

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
      title: "簡単な申請プロセス",
      description: "複雑な手続きをシンプルに。必要な情報を段階的にガイド",
    },
    {
      icon: Briefcase,
      title: "専門家との連携",
      description: "経験豊富な専門家がサポート。最適な選択をお手伝い",
    },
    {
      icon: Users,
      title: "リアルタイムサポート",
      description: "質問や不安点にすぐに対応。充実したサポート体制",
    },
  ];

  const benefits = [
    {
      title: "スピーディーな申請",
      description: "面倒な手続きを最短で完了。必要な情報を効率的に収集し、スムーズな申請をサポート",
    },
    {
      title: "専門家のサポート",
      description: "各分野のエキスパートが申請を支援。要件の確認から書類作成まで、プロフェッショナルがガイド",
    },
    {
      title: "高い採択率",
      description: "豊富な実績と経験に基づく、質の高いサポートで採択率の向上を実現",
    },
    {
      title: "安心の審査対応",
      description: "審査時の質問や追加要件にも迅速に対応。きめ細かなフォローアップ体制",
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
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                    補助金・助成金申請を
                    <span className="text-primary block">もっとシンプルに</span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl">
                    専門家とつながり、最適な補助金・助成金を見つけ、
                    スムーズな申請をサポートします。
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                    onClick={() => navigate("/register")}
                  >
                    無料で始める
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6"
                    onClick={() => navigate("/login")}
                  >
                    ログイン
                  </Button>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm">
                  <div className="flex items-center">
                    <CheckCircle2 className="text-primary w-5 h-5 mr-2" />
                    <span>無料登録</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="text-primary w-5 h-5 mr-2" />
                    <span>専門家監修</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="text-primary w-5 h-5 mr-2" />
                    <span>安心サポート</span>
                  </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 特徴セクション */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              申請をよりスムーズに
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              補助金・助成金の申請に必要な情報収集から書類作成まで、
              各ステップでプロフェッショナルがサポートします。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 border border-gray-100"
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
            <h2 className="text-3xl font-bold mb-4">
              選ばれる4つの理由
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              私たちは、補助金・助成金申請の経験と実績を活かし、
              確かな成果を提供します。
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
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

      {/* CTAセクション */}
      <div className="py-20 bg-gradient-to-r from-primary/90 to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            まずは無料で始めてみませんか？
          </h2>
          <p className="text-xl mb-8 opacity-90">
            プロフェッショナルが、あなたに最適な補助金・助成金を見つけ、
            申請までサポートします。
          </p>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100"
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
