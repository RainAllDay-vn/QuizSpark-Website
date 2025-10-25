import {ThemeProvider} from "@/components/theme-provider"
import {LandingPage} from "@/pages/landing_page/landing_page.tsx"
import {HomePage} from "@/pages/home_page/home_page.tsx";
import {Routes, Route} from "react-router-dom"
import {SignUp} from "@/pages/sign_up_page/sign_up.tsx"
import {AboutPage} from "./pages/about_page/about-page"
import {LeaderboardPage} from "./pages/leaderboard_page/leaderboard-page"
import {QuizzPage} from "./pages/quizz_page/quizz-page"


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex min-h-svh flex-col items-center justify-center fill-black">
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/quizz" element={<QuizzPage/>}/>
          <Route path="/leaderboard" element={<LeaderboardPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/login" element={<SignUp/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/test" element={<>
            <HomePage/>
          </>}/>
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App