import {ThemeProvider} from "@/components/theme-provider"
import {LandingPage} from "@/pages/landing_page/landing_page.tsx"
import {HomePage} from "@/pages/home_page/home_page.tsx";
import {Routes, Route, Outlet, Navigate} from "react-router-dom"
import {AccessPage} from "@/pages/log_in_page/access_page.tsx"
import {AboutPage} from "./pages/about_page/about-page"
import {LeaderboardPage} from "./pages/leaderboard_page/leaderboard-page"
import {QuizzPage} from "./pages/quizz_page/quizz-page"
import DashboardSection from "@/pages/home_page/dashboard_section.tsx";
import QuizSection from "@/pages/home_page/quiz_section.tsx";
import EventSection from "@/pages/home_page/event_section.tsx";
import StudentSection from "@/pages/home_page/student_section.tsx";
import SettingSection from "@/pages/home_page/setting_section.tsx";
import LogInSection from "@/pages/log_in_page/log_in_section.tsx";
import SignUpSection from "@/pages/log_in_page/sign_up_section.tsx";
import useAuthStatus from "@/lib/use_auth_hook.ts";

const ProtectedRoute = () => {
  const {user, loading} = useAuthStatus();

  if (loading) return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
    </div>
  );
  return user ? <Outlet/> : <Navigate to="/login" replace/>;
};

const AnonymousRoute = () => {
  const {user, loading} = useAuthStatus();

  if (loading) return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
    </div>
  );
  return user ? <Navigate to="/home" replace/> : <Outlet/>;
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-svh flex-col items-center justify-center fill-black">
        <Routes>
          {/* 1. Public Routes: Accessible to everyone */}
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/leaderboard" element={<LeaderboardPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/quizz" element={<QuizzPage/>}/>
          <Route path="/test" element={<QuizSection/>}/>
          {/* 2. Anonymous routes — only for non-logged-in users */}
          <Route element={<AnonymousRoute/>}>
            <Route path="/signup" element={<AccessPage Section={SignUpSection}/>}/>
            <Route path="/login" element={<AccessPage Section={LogInSection}/>}/>
          </Route>
          {/* 3. Protected routes — only for logged-in users */}
          <Route element={<ProtectedRoute/>}>
            <Route path="/home" element={<HomePage/>}>
              <Route path="dashboard" element={<DashboardSection/>}/>
              <Route path="quizzes" element={<QuizSection/>}/>
              <Route path="events" element={<EventSection/>}/>
              <Route path="students" element={<StudentSection/>}/>
              <Route path="settings" element={<SettingSection/>}/>
            </Route>
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App