
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { LoadingTimeoutAlert } from "@/components/ui/loading-timeout-alert";
import { UserRole } from "@/types/user";
import { HeroSection } from "@/components/sections/HeroSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { MetricsSection } from "@/components/sections/MetricsSection";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // ログイン済みユーザーは適切なダッシュボードにリダイレクト
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
        console.error("Error checking auth:", error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user, navigate]);

  // ローディング中はローディングアラートを表示
  if (isLoading) {
    return <LoadingTimeoutAlert isLoading={isLoading} timeout={60000} />;
  }

  // 未ログインユーザーにはトップページコンテンツを表示
  return (
    <div className="min-h-screen">
      <HeroSection />
      <IndustriesSection />
      <MetricsSection />
    </div>
  );
};

export default Index;
