
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, User, Building2, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { UserRole } from '@/types/user';
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email || !password) {
      toast({
        title: "入力エラー",
        description: "メールアドレスとパスワードを入力してください",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleLoginAsType = async (userType: UserRole) => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await signIn(email, password);
      navigate(`/dashboard/${userType}`);
      toast({
        title: "ログイン成功",
        description: "ダッシュボードに移動します",
      });
    } catch (error) {
      toast({
        title: "ログインエラー",
        description: "認証に失敗しました。入力内容を確認してください。",
        variant: "destructive",
      });
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
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          トップページに戻る
        </Button>

        <Card className="w-full">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold">ログイン</h1>
            <p className="text-sm text-gray-600">
              アカウントにログインして、サービスをご利用ください
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@company.com"
                  required
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
                />
              </div>
              <div className="space-y-4">
                <Button 
                  type="button"
                  className="w-full flex items-center justify-center gap-2 hover:bg-primary/80 transition-colors duration-200"
                  onClick={() => handleLoginAsType(UserRole.APPLICANT)}
                  disabled={loading}
                >
                  <User className="h-4 w-4" />
                  申請者としてログイン
                </Button>
                <Button 
                  type="button"
                  variant="secondary"
                  className="w-full flex items-center justify-center gap-2 hover:bg-secondary/70 transition-colors duration-200"
                  onClick={() => handleLoginAsType(UserRole.PROVIDER)}
                  disabled={loading}
                >
                  <Building2 className="h-4 w-4" />
                  サービス提供者としてログイン
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 hover:bg-accent/80 transition-colors duration-200"
                  onClick={() => handleLoginAsType(UserRole.EXPERT)}
                  disabled={loading}
                >
                  <GraduationCap className="h-4 w-4" />
                  専門家としてログイン
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-600">
              アカウントをお持ちでない方は
              <Button
                variant="link"
                className="p-0 ml-1"
                onClick={() => navigate('/register')}
              >
                新規登録
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
