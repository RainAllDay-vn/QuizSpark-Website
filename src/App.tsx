import { ThemeProvider } from "@/components/theme-provider"
import { LandingPage } from "@/pages/landing_page/landing_page.tsx"
import { HomePage } from "@/pages/home_page/home_page.tsx";
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { AccessPage } from "@/pages/log_in_page/access_page.tsx"
import { AboutPage } from "./pages/about_page/about-page"
import { LeaderboardPage } from "./pages/leaderboard_page/leaderboard-page"
import QuestionBankPage from "@/pages/bank_page/bank_page.tsx"
import DashboardSection from "@/pages/home_page/dashboard_section.tsx";
import QuestionBankSection from "@/pages/home_page/bank_section.tsx";
import PastPracticeSection from "@/pages/home_page/past_practice_section";
import ClassroomSection from "@/pages/home_page/classroom_section.tsx";
import LogInSection from "@/pages/log_in_page/log_in_section.tsx";
import SignUpSection from "@/pages/log_in_page/sign_up_section.tsx";
import AdditionalInfoSection from "@/pages/log_in_page/additional_info_section.tsx";
import useAuthStatus from "@/lib/use_auth_hook.ts";
import PracticePage from "@/pages/practice_page/practice_page.tsx";
import MyHeader from "@/components/custom/header.tsx";
import MyFooter from "@/components/custom/footer.tsx";
import BankEditPage from "./pages/bank_edit_page/bank_edit_page";
import BankOverviewPage from "./pages/bank_overview_page/bank_overview_page";
import GlobalChatBot from "@/components/chatbot/GlobalChatBot";
import WorkspacePage from "./pages/workspace_page/workspace_page";

const ProtectedRoute = () => {
  const { user, loading } = useAuthStatus();
  if (loading) return null;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const RoleProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user, loading } = useAuthStatus();
  if (loading) return null; // Or a loader
  return user && allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/home" replace />;
};

const AnonymousRoute = () => {
  const { user, loading } = useAuthStatus();
  if (loading) return null;
  return user ? <Navigate to="/home" replace /> : <Outlet />;
};

import { ChatBotProvider } from "@/components/chatbot/ChatBotContext";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ChatBotProvider>
        <GlobalChatBot />
        <div className="min-h-full min-w-full flex overflow-hidden flex-col items-center justify-center bg-black">
          <Routes>
            {/* 1. Public Routes: Accessible to everyone */}
            <Route element={
              <div className="w-full h-full">
                <MyHeader />
                <Outlet />
                <MyFooter />
              </div>
            }>
              <Route path="/" element={<LandingPage />} />
              <Route path="/banks" element={<QuestionBankPage />} />
            </Route>
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/practice/:id" element={<PracticePage />} />
            {/* 2. Anonymous routes — only for non-logged-in users */}
            <Route element={<AnonymousRoute />}>
              <Route path="/signup" element={<AccessPage Section={SignUpSection} />} />
              <Route path="/login" element={<AccessPage Section={LogInSection} />} />
            </Route>
            {/* 3. Protected routes — only for logged-in users */}
            <Route element={<ProtectedRoute />}>
              <Route path="/additional-info" element={<AccessPage Section={AdditionalInfoSection} />} />
              <Route path="/home" element={<HomePage />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<DashboardSection />} />
                <Route path="banks" element={<QuestionBankSection />} />
                <Route element={<RoleProtectedRoute allowedRoles={["ROLE_TEACHER", "ROLE_ADMIN"]} />}>
                  <Route path="classrooms" element={<ClassroomSection />} />
                </Route>
                <Route path="past-practices" element={<PastPracticeSection />} />
              </Route>
              <Route path="/workspace" element={<WorkspacePage />} />
              <Route path="/edit/bank/:bankId" element={<BankEditPage />} />
              <Route path="/bank/:bankId" element={<BankOverviewPage />} />
            </Route>
          </Routes>
        </div>
      </ChatBotProvider>
    </ThemeProvider>
  )
}

export default App