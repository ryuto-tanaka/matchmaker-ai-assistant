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

  const trustFactors = [
    {
      title: "無料登録",
      description: "初期費用0円で始められます。申請完了後の成功報酬型なので、安心してご利用いただけます",
      points: [
        "会員登録完全無料",
        "初期費用・月額費用なし",
        "成功報酬型の料金体系"
      ]
    },
    {
      title: "専門家監修",
      description: "業界経験豊富な専門家が、申請書類を徹底的にチェック。確実な申請をサポートします",
      points: [
        "経験15年以上の専門家が対応",
        "24時間以内の迅速レビュー",
        "申請戦略の個別アドバイス"
      ]
    },
    {
      title: "安心サポート",
      description: "申請から採択後まで、包括的なサポート体制で不安を解消します",
      points: [
        "24時間365日サポート体制",
        "採択後のフォローアップ対応",
        "専門家への無料相談"
      ]
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
                    className="text-xl px-12 py-8 hover:bg-gray-50 transition-all duration-300 border-2"
                    onClick={() => navigate("/login")}
                  >
                    ログインはこちら
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow-lg">
                  {trustFactors.map((factor, index) => (
                    <div key={index} className="text-center p-4">
                      <div className="flex items-center justify-center mb-3">
                        <CheckCircle2 className="text-primary w-6 h-6" />
                        <span className="ml-2 font-semibold">{factor.title}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{factor.description}</p>
                      <ul className="text-xs text-left space-y-1">
                        {factor.points.map((point, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary mr-1">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
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
