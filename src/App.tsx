import { ThemeProvider } from "@/components/theme-provider"
import { MainPage } from "./pages/main_page/main-page"
import { Routes,Route } from "react-router-dom"
import { LoginPage } from "./pages/log_in_page/login-page"
import { AboutPage } from "./pages/about_page/about-page"
import { LeaderboardPage } from "./pages/leaderboard_page/leaderboard-page"
import { QuizzPage } from "./pages/quizz_page/quizz-page"
import { LandingPage } from "@/pages/landing_page/landing_page.tsx"
import {Home_page} from "@/pages/home_page/home_page.tsx";



function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-svh flex-col items-center justify-center fill-black">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/quizz" element={<QuizzPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/test" element={<>
            <Home_page />
          </>} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App