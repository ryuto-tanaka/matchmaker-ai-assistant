
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";

const RegisterDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp } = useAuthContext();
  const userType = location.state?.userType;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add timeout to prevent infinite loading state
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loading) {
      timeout = setTimeout(() => {
        setLoading(false);
        setError('登録処理がタイムアウトしました。もう一度お試しください。');
      }, 10000); // 10秒でタイムアウト
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [loading]);

  // Redirect if no userType is provided
  useEffect(() => {
    if (!userType) {
      navigate('/register');
    }
  }, [userType, navigate]);

  if (!userType) {
    return null;
  }

  const validatePassword = (pass: string) => {
    if (pass.length < 6) {
      return 'パスワードは6文字以上で入力してください';
    }
    return null;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return '有効なメールアドレスを入力してください';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);
    try {
      const result = await signUp(email, password);
      if (result) {
        toast({
          title: "登録完了",
          description: "アカウントが正常に作成されました",
        });
        navigate('/profile-setup', { state: { userType } });
      } else {
        throw new Error('登録に失敗しました');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      if (err.message.includes('after')) {
        setError('しばらく待ってから再度お試しください');
      } else if (err.message.includes('Password')) {
        setError('パスワードは6文字以上で入力してください');
      } else if (err.message.includes('Email')) {
        setError('このメールアドレスは既に登録されています');
      } else {
        setError(err.message || '登録中にエラーが発生しました');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="container max-w-lg mx-auto px-4">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate('/register')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          戻る
        </Button>

        <Card className="w-full">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold">アカウント作成</h1>
            <p className="text-sm text-gray-600">
              必要な情報を入力してください
            </p>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@company.com"
                  required
                  disabled={loading}
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                  minLength={6}
                  className="bg-white"
                />
                <p className="text-sm text-gray-500">
                  パスワードは6文字以上で入力してください
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? '登録中...' : '次へ'}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                アカウントをお持ちの方は{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  こちら
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterDetails;
