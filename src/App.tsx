import { ThemeProvider } from "@/components/theme-provider";
import { MainPage } from "./pages/main_page/main-page";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/log_in_page/login-page";
import { AboutPage } from "./pages/about_page/about-page";
import { LeaderboardPage } from "./pages/leaderboard_page/leaderboard-page";
import { QuizzPage } from "./pages/quizz_page/quizz-page";
import { HomePage } from "./pages/home_page/home-page";
import { testRoutes } from "./test/test_route";
import Dashboard from "./pages/home_page/dash-board";
import Quizzes from "./pages/home_page/quizz";
import Events from "./pages/home_page/event";
import Students from "./pages/home_page/student";
import Settings from "./pages/home_page/settings";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-svh flex-col items-center justify-center fill-black">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home" element={<HomePage />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="quizzes" element={<Quizzes />} />
            <Route path="events" element={<Events />} />
            <Route path="students" element={<Students />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/quizz" element={<QuizzPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          {testRoutes}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
