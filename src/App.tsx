import MyHeader from "./components/custom/header"
import MyFooter from "./components/custom/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { MainPage } from "./pages/main-page"
import { Routes,Route } from "react-router-dom"
import { LoginPage } from "./pages/login-page"
import { AboutPage } from "./pages/about-page"
import { LeaderboardPage } from "./pages/leaderboard-page"
import { QuizzPage } from "./pages/quizz-page"
import { HomePage } from "./pages/home-page"



function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MyHeader />
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/quizz" element={<QuizzPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
        </Routes>
      </div>
      <MyFooter />
    </ThemeProvider>
  )
}

export default App