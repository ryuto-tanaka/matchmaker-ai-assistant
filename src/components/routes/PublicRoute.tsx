
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { UserRole } from '@/types/user';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user } = useAuthContext();

  if (user) {
    // 既に認証済みの場合、ユーザータイプに応じたダッシュボードにリダイレクト
    switch (user.role) {
      case UserRole.APPLICANT:
        return <Navigate to="/dashboard/applicant" replace />;
      case UserRole.PROVIDER:
        return <Navigate to="/dashboard/provider" replace />;
      case UserRole.EXPERT:
        return <Navigate to="/dashboard/expert" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};
