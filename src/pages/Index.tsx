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

      {/* Before & After セクション */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              申請プロセスの革新的な変化
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              従来の複雑な申請プロセスを、シンプルで効率的なものに変革します
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-2xl font-bold text-gray-400 mb-4">Before</div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span>複雑な申請書類の作成に時間がかかる</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span>事業計画書の作成に苦労する</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span>必要な情報収集に時間を要する</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">×</span>
                  <span>専門家への相談が困難</span>
                </li>
              </ul>
            </div>
            <div className="bg-primary/5 p-8 rounded-lg shadow-lg border-2 border-primary">
              <div className="text-2xl font-bold text-primary mb-4">After</div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>AIによる申請書類の自動生成</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>事業計画書がほぼ自動で完成</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>必要情報の効率的な収集と整理</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>専門家に気軽に相談可能</span>
                </li>
              </ul>
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
