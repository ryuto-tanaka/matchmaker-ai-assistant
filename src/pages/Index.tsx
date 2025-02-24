
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { LoadingTimeoutAlert } from "@/components/ui/loading-timeout-alert";
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
        // ユーザーがログイン済みの場合は、適切なダッシュボードにリダイレクト
        if (user) {
          const dashboardPath = `/dashboard/${user.role}`;
          await navigate(dashboardPath, { replace: true });
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user, navigate]);

  // ローディング中の表示
  if (isLoading) {
    return <LoadingTimeoutAlert isLoading={isLoading} timeout={60000} />;
  }

  // 未ログインユーザー向けのランディングページを表示
  return (
    <main className="min-h-screen w-full bg-white">
      <HeroSection />
      <IndustriesSection />
      <MetricsSection />
    </main>
  );
};

export default Index;
