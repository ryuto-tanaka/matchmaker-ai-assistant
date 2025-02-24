
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, LogIn, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { features } from "@/data/features";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 min-h-[90vh]">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative pt-20 pb-24 sm:pt-32 lg:pt-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-10 text-center lg:text-left">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  <Star className="w-4 h-4" />
                  採択率95%以上の実績
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                  補助金・助成金申請を
                  <span className="text-primary block mt-2">もっとシンプルに</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                  経験豊富な専門家があなたの事業に最適な補助金・助成金を見つけ、
                  申請から採択までトータルでサポート。
                  <span className="block mt-2 font-medium">
                    面倒な手続きをAIと専門家の力でスムーズに。
                  </span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="text-lg px-8 py-7 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => navigate("/register")}
                >
                  今すぐ無料で始める
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-7 bg-white/80 backdrop-blur-sm border-primary/20 text-primary hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => navigate("/login")}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  ログインはこちら
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
                {features.map((feature, index) => (
                  <div key={index} className="text-center p-4">
                    <div className="flex items-center justify-center mb-3">
                      <CheckCircle2 className="text-primary w-5 h-5" />
                      <span className="ml-2 font-medium text-gray-900">{feature.title}</span>
                    </div>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-lg blur"></div>
                <img
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
                  alt="Dashboard preview"
                  className="relative rounded-lg shadow-2xl w-full object-cover"
                />
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">セキュリティ対策済み</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
