
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface LoadingTimeoutAlertProps {
  timeout?: number; // タイムアウトまでの時間（ミリ秒）
  isLoading: boolean;
}

export const LoadingTimeoutAlert = ({
  timeout = 60000, // デフォルトは1分
  isLoading,
}: LoadingTimeoutAlertProps) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isLoading) {
      timeoutId = setTimeout(() => {
        setShowAlert(true);
      }, timeout);
    } else {
      setShowAlert(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoading, timeout]);

  if (!showAlert) return null;

  return (
    <Alert className="fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-md">
      <AlertTitle className="flex items-center gap-2">
        <RefreshCw className="h-4 w-4" />
        ローディングに時間がかかっています
      </AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-3">
          データの読み込みに時間がかかっています。ネットワークの状態をご確認ください。
        </p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          ページを再読み込み
        </Button>
      </AlertDescription>
    </Alert>
  );
};
