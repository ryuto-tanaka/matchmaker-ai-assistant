
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { OfflineBanner } from "@/components/ui/offline-banner";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { PrivateRoute } from "@/components/routes/PrivateRoute";
import { PublicRoute } from "@/components/routes/PublicRoute";
import { UserRole } from "@/types/user";

import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProfileSetup from "./pages/ProfileSetup";
import ApplicantDashboard from "./pages/dashboard/ApplicantDashboard";
import ProviderDashboard from "./pages/dashboard/ProviderDashboard";
import ExpertDashboard from "./pages/dashboard/ExpertDashboard";
import RegisterDetails from "./pages/RegisterDetails";
import Settings from "./pages/dashboard/settings/Settings";
import ProfileSettings from "./pages/dashboard/settings/profile/ProfileSettings";
import NotificationSettings from "./pages/dashboard/settings/notifications/NotificationSettings";
import SecuritySettings from "./pages/dashboard/settings/security/SecuritySettings";
import LocaleSettings from "./pages/dashboard/settings/locale/LocaleSettings";

// 新規追加ページのインポート
import ApplicationsPage from "./pages/dashboard/applicant/ApplicationsPage";
import ExpertsPage from "./pages/dashboard/applicant/ExpertsPage";
import CasesPage from "./pages/dashboard/provider/CasesPage";
import ProviderClientsPage from "./pages/dashboard/provider/ClientsPage";
import ConsultationsPage from "./pages/dashboard/expert/ConsultationsPage";
import ExpertClientsPage from "./pages/dashboard/expert/ClientsPage";

// 新規追加
import MessagesPage from "./pages/dashboard/messages/MessagesPage";
import ApplicantChatPage from "./pages/dashboard/messages/ApplicantChatPage";
import ProviderChatPage from "./pages/dashboard/messages/ProviderChatPage";
import ExpertChatPage from "./pages/dashboard/messages/ExpertChatPage";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <OfflineBanner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* パブリックルート */}
              <Route path="/" element={<Index />} />
              
              {/* 未認証ユーザーのみアクセス可能なルート */}
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
              <Route
                path="/register/details"
                element={
                  <PublicRoute>
                    <RegisterDetails />
                  </PublicRoute>
                }
              />
              <Route path="/register/applicant" element={<Navigate to="/register" state={{ userType: 'applicant' }} />} />
              <Route path="/register/provider" element={<Navigate to="/register" state={{ userType: 'provider' }} />} />
              <Route path="/register/expert" element={<Navigate to="/register" state={{ userType: 'expert' }} />} />
              
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/profile-setup"
                element={
                  <PrivateRoute>
                    <ProfileSetup />
                  </PrivateRoute>
                }
              />
              
              {/* 申請者専用のルート */}
              <Route
                path="/dashboard/applicant"
                element={
                  <PrivateRoute allowedRoles={[UserRole.APPLICANT]}>
                    <ApplicantDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/applicant/applications"
                element={
                  <PrivateRoute allowedRoles={[UserRole.APPLICANT]}>
                    <ApplicationsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/applicant/experts"
                element={
                  <PrivateRoute allowedRoles={[UserRole.APPLICANT]}>
                    <ExpertsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/applicant/messages"
                element={
                  <PrivateRoute allowedRoles={[UserRole.APPLICANT]}>
                    <MessagesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/applicant/messages/:expertId"
                element={
                  <PrivateRoute allowedRoles={[UserRole.APPLICANT]}>
                    <ApplicantChatPage />
                  </PrivateRoute>
                }
              />
              
              {/* サービス提供者専用のルート */}
              <Route
                path="/dashboard/provider"
                element={
                  <PrivateRoute allowedRoles={[UserRole.PROVIDER]}>
                    <ProviderDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/provider/cases"
                element={
                  <PrivateRoute allowedRoles={[UserRole.PROVIDER]}>
                    <CasesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/provider/clients"
                element={
                  <PrivateRoute allowedRoles={[UserRole.PROVIDER]}>
                    <ProviderClientsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/provider/messages"
                element={
                  <PrivateRoute allowedRoles={[UserRole.PROVIDER]}>
                    <MessagesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/provider/messages/:expertId"
                element={
                  <PrivateRoute allowedRoles={[UserRole.PROVIDER]}>
                    <ProviderChatPage />
                  </PrivateRoute>
                }
              />
              
              {/* 専門家専用のルート */}
              <Route
                path="/dashboard/expert"
                element={
                  <PrivateRoute allowedRoles={[UserRole.EXPERT]}>
                    <ExpertDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/expert/consultations"
                element={
                  <PrivateRoute allowedRoles={[UserRole.EXPERT]}>
                    <ConsultationsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/expert/clients"
                element={
                  <PrivateRoute allowedRoles={[UserRole.EXPERT]}>
                    <ExpertClientsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/expert/messages"
                element={
                  <PrivateRoute allowedRoles={[UserRole.EXPERT]}>
                    <MessagesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/expert/messages/:expertId"
                element={
                  <PrivateRoute allowedRoles={[UserRole.EXPERT]}>
                    <ExpertChatPage />
                  </PrivateRoute>
                }
              />
              
              {/* 設定関連のルート（全認証ユーザーがアクセス可能） */}
              <Route
                path="/dashboard/settings"
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/settings/profile"
                element={
                  <PrivateRoute>
                    <ProfileSettings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/settings/notifications"
                element={
                  <PrivateRoute>
                    <NotificationSettings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/settings/security"
                element={
                  <PrivateRoute>
                    <SecuritySettings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard/settings/locale"
                element={
                  <PrivateRoute>
                    <LocaleSettings />
                  </PrivateRoute>
                }
              />
              
              {/* 404ページ */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
