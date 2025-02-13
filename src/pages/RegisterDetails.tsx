
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from "@/components/ui/alert";

const RegisterDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp } = useAuthContext();
  const userType = location.state?.userType;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!userType) {
    navigate('/register');
    return null;
  }

  const validatePassword = (pass: string) => {
    if (pass.length < 6) {
      return 'パスワードは6文字以上で入力してください';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // パスワードのバリデーション
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
      navigate('/profile-setup', { state: { userType } });
    } catch (err: any) {
      if (err.message.includes('after')) {
        setError('しばらく待ってから再度お試しください');
      } else if (err.message.includes('Password')) {
        setError('パスワードは6文字以上で入力してください');
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
                />
                <p className="text-sm text-gray-500">
                  パスワードは6文字以上で入力してください
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? '登録中...' : '次へ'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterDetails;
