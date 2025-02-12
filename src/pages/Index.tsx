
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Users, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-end space-x-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/login')}
          >
            ログイン
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/register')}
          >
            新規登録
          </Button>
        </div>

        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            補助金・助成金マッチング
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI支援による効率的な手続きサポートで、あなたのビジネスをサポートします。
          </p>
          <Button 
            size="lg" 
            className="hover-lift"
            onClick={() => navigate('/register')}
          >
            無料で始める <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover-lift glass-panel">
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            多くの企業様にご利用いただいています
          </p>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: Users,
    title: "専門家とのマッチング",
    description: "あなたのニーズに合った最適な専門家をAIがマッチング",
  },
  {
    icon: FileText,
    title: "AI書類作成支援",
    description: "面倒な申請書類をAIが効率的にサポート",
  },
  {
    icon: Shield,
    title: "安全な取引",
    description: "セキュアな環境で安心してご利用いただけます",
  },
];

export default Index;
