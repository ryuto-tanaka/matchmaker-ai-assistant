
import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    // エラーの報告
    this.reportError(error, errorInfo);
    
    // ユーザーへの通知
    toast.error("エラーが発生しました", {
      description: "システム管理者に通知しました。",
    });
  }

  private reportError(error: Error, errorInfo: React.ErrorInfo) {
    // エラー報告のロジックをここに実装
    // 例: エラーログの送信など
    console.error({
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>エラーが発生しました</AlertTitle>
            <AlertDescription className="mt-2">
              <p className="mb-4">
                申し訳ありません。予期せぬエラーが発生しました。
              </p>
              <div className="space-x-4">
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  ページを再読み込み
                </Button>
                <Button
                  onClick={() => {
                    this.setState({ hasError: false, error: null });
                    window.location.href = "/";
                  }}
                >
                  ホームに戻る
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}
