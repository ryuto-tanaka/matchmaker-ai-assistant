
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { LoadingTimeoutAlert } from "@/components/ui/loading-timeout-alert";
import { HeroSection } from "@/components/sections/HeroSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // ユーザーがログインしている場合のみダッシュボードにリダイレクト
        if (user) {
          console.log("User is logged in, redirecting to dashboard");
          navigate(`/dashboard/${user.role}`, { replace: true });
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user, navigate]);

  // ローディング中はローディング画面を表示
  if (isLoading) {
    return <LoadingTimeoutAlert isLoading={isLoading} timeout={60000} />;
  }

  // ユーザーが未ログインの場合はLPを表示
  if (!user) {
    return (
      <main className="min-h-screen w-full bg-white overflow-x-hidden">
        <HeroSection />
        <IndustriesSection />
        <MetricsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
    );
  }

  // ユーザーがログインしている場合は空のコンポーネントを返す（useEffectでリダイレクトされるため）
  return null;
};

export default Index;
