
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/details" element={<RegisterDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            
            {/* 申請者関連のルート */}
            <Route path="/dashboard/applicant" element={<ApplicantDashboard />} />
            <Route path="/dashboard/applicant/applications" element={<ApplicationsPage />} />
            <Route path="/dashboard/applicant/experts" element={<ExpertsPage />} />
            
            {/* サービス提供者関連のルート */}
            <Route path="/dashboard/provider" element={<ProviderDashboard />} />
            <Route path="/dashboard/provider/cases" element={<CasesPage />} />
            <Route path="/dashboard/provider/clients" element={<ProviderClientsPage />} />
            
            {/* 専門家関連のルート */}
            <Route path="/dashboard/expert" element={<ExpertDashboard />} />
            <Route path="/dashboard/expert/consultations" element={<ConsultationsPage />} />
            <Route path="/dashboard/expert/clients" element={<ExpertClientsPage />} />
            
            {/* 設定関連のルート */}
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/settings/profile" element={<ProfileSettings />} />
            <Route path="/dashboard/settings/notifications" element={<NotificationSettings />} />
            <Route path="/dashboard/settings/security" element={<SecuritySettings />} />
            <Route path="/dashboard/settings/locale" element={<LocaleSettings />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
