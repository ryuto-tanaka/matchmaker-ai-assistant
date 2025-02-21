
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { UserRole } from '@/types/user';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) {
    // ユーザーが未認証の場合、ログインページにリダイレクト
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user.role && !allowedRoles.includes(user.role)) {
    // ユーザーが必要な権限を持っていない場合、適切なダッシュボードにリダイレクト
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
