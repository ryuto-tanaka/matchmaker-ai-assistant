
import { LoadingTimeoutAlert } from "@/components/ui/loading-timeout-alert";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { UserRole } from "@/types/user";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Redirect logged-in users to their respective dashboards
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
        <p className="text-lg text-muted-foreground">
          Connect with experts and service providers for your needs
        </p>
        <div className="space-y-4">
          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate("/register")}
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </div>
      </div>
      <LoadingTimeoutAlert isLoading={isLoading} timeout={60000} />
    </div>
  );
};

export default Index;
