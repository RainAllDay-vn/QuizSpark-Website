import {ThemeProvider} from "@/components/theme-provider"
import {LandingPage} from "@/pages/landing_page/landing_page.tsx"
import {HomePage} from "@/pages/home_page/home_page.tsx";
import {Routes, Route, Outlet, Navigate} from "react-router-dom"
import {AccessPage} from "@/pages/log_in_page/access_page.tsx"
import {AboutPage} from "./pages/about_page/about-page"
import {LeaderboardPage} from "./pages/leaderboard_page/leaderboard-page"
import QuizzPage from "./pages/quizz_page/quizz_page"
import DashboardSection from "@/pages/home_page/dashboard_section.tsx";
import QuizSection from "@/pages/home_page/quiz_section.tsx";
import EventSection from "@/pages/home_page/event_section.tsx";
import StudentSection from "@/pages/home_page/student_section.tsx";
import SettingSection from "@/pages/home_page/setting_section.tsx";
import LogInSection from "@/pages/log_in_page/log_in_section.tsx";
import SignUpSection from "@/pages/log_in_page/sign_up_section.tsx";
import AdditionalInfoSection from "@/pages/log_in_page/additional_info_section.tsx";
import useAuthStatus from "@/lib/use_auth_hook.ts";
import PracticePage from "@/pages/practice_page/practice_page.tsx";
import Loader from "@/components/custom/loader.tsx";
import MyHeader from "@/components/custom/header.tsx";
import MyFooter from "@/components/custom/footer.tsx";

const ProtectedRoute = () => {
  const {user} = useAuthStatus();
  return user ? <Outlet/> : <Navigate to="/login" replace/>;
};

const AnonymousRoute = () => {
  const {user} = useAuthStatus();
  return user ? <Navigate to="/home" replace/> : <Outlet/>;
};

function App() {
  const {loading} = useAuthStatus();

  if (loading) return <Loader />;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-full min-w-full flex overflow-hidden flex-col items-center justify-center bg-black">
        <Routes>
          {/* 1. Public Routes: Accessible to everyone */}
          <Route element={
            <div className="w-full h-full">
              <MyHeader/>
              <Outlet/>
              <MyFooter/>
            </div>
          }>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/quizz" element={<QuizzPage/>}/>
          </Route>
          <Route path="/leaderboard" element={<LeaderboardPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/practice/bank/:bankId" element={<PracticePage/>}/>
          <Route path="/test" element={<PracticePage/>}/>
          {/* 2. Anonymous routes — only for non-logged-in users */}
          <Route element={<AnonymousRoute/>}>
            <Route path="/signup" element={<AccessPage Section={SignUpSection}/>}/>
            <Route path="/login" element={<AccessPage Section={LogInSection}/>}/>
          </Route>
          {/* 3. Protected routes — only for logged-in users */}
          <Route element={<ProtectedRoute/>}>
            <Route path="/additional-info" element={<AccessPage Section={AdditionalInfoSection}/>}/>
            <Route path="/home" element={<HomePage/>}>
              <Route index element={<Navigate to="dashboard" replace/>}/>
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