
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-xl text-gray-600">ページが見つかりませんでした</p>
          <p className="text-sm text-gray-500">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            前のページに戻る
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            ホームに戻る
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
