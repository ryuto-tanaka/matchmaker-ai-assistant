
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCog, Bell, Shield, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthContext } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';

const Settings = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuthContext();

  const settingsSections = [
    {
      icon: UserCog,
      title: "プロフィール設定",
      description: "会社情報や連絡先などの基本情報を管理します",
      path: "/dashboard/settings/profile",
      implemented: false
    },
    {
      icon: Bell,
      title: "通知設定",
      description: "メールやアプリ内の通知設定を管理します",
      path: "/dashboard/settings/notifications",
      implemented: false
    },
    {
      icon: Shield,
      title: "セキュリティ設定",
      description: "パスワードやログイン履歴の管理を行います",
      path: "/dashboard/settings/security",
      implemented: false
    },
    {
      icon: Globe,
      title: "言語・地域設定",
      description: "表示言語や地域に関する設定を変更します",
      path: "/dashboard/settings/locale",
      implemented: false
    }
  ];

  return (
    <DashboardLayout 
      userType="applicant"
      userName={profile?.company_name || user?.email || 'ユーザー'}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">設定</h1>
          <p className="text-muted-foreground">
            アカウントや表示に関する設定を管理します
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {settingsSections.map((section, index) => (
            <Card key={index} className="hover:bg-accent/50 transition-colors">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <div className="mr-2 bg-primary/10 p-2 rounded-full">
                  <section.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mt-2">{section.description}</CardDescription>
                <Button 
                  variant="ghost" 
                  className="mt-4 w-full"
                  onClick={() => navigate(section.path)}
                  disabled={!section.implemented}
                >
                  {section.implemented ? "設定を変更" : "準備中"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
