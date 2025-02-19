
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { AlertCircle, Wifi, WifiOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const OfflineBanner = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <Alert variant="destructive" className="fixed bottom-4 right-4 w-auto max-w-md">
      <WifiOff className="h-4 w-4" />
      <AlertTitle>オフライン</AlertTitle>
      <AlertDescription>
        インターネット接続が切断されました。一部の機能が制限される可能性があります。
      </AlertDescription>
    </Alert>
  );
};
