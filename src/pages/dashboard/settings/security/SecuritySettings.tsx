
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuthContext } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PasswordChangeForm from '@/components/settings/security/PasswordChangeForm';
import SecurityOptionsForm from '@/components/settings/security/SecurityOptionsForm';

const SecuritySettings = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuthContext();

  return (
    <DashboardLayout
      userType="applicant"
      userName={profile?.company_name || user?.email || 'ユーザー'}
    >
      <div className="space-y-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="mr-4"
            onClick={() => navigate('/dashboard/settings')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">セキュリティ設定</h1>
            <p className="text-muted-foreground">
              パスワードやログイン履歴の管理を行います
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <PasswordChangeForm />
          <SecurityOptionsForm />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SecuritySettings;
