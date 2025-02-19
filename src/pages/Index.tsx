
import { LoadingTimeoutAlert } from "@/components/ui/loading-timeout-alert";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { UserRole } from "@/types/user";
import { HeroSection } from "@/components/home/HeroSection";
import { TargetCategoriesSection } from "@/components/home/TargetCategoriesSection";
import { ServiceCategoriesSection } from "@/components/home/ServiceCategoriesSection";
import { targetCategories, serviceCategories } from "@/data/categories";

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

  return (
    <div className="min-h-screen">
      <HeroSection />
      <TargetCategoriesSection categories={targetCategories} />
      <ServiceCategoriesSection categories={serviceCategories} />
      <LoadingTimeoutAlert isLoading={isLoading} timeout={60000} />
    </div>
  );
};

export default Index;
