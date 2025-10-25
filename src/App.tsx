import {ThemeProvider} from "@/components/theme-provider"
import {LandingPage} from "@/pages/landing_page/landing_page.tsx"
import {HomePage} from "@/pages/home_page/home_page.tsx";
import {Routes, Route, Outlet, Navigate} from "react-router-dom"
import {SignUp} from "@/pages/sign_up_page/sign_up_page.tsx"
import {AboutPage} from "./pages/about_page/about-page"
import {LeaderboardPage} from "./pages/leaderboard_page/leaderboard-page"
import {QuizzPage} from "./pages/quizz_page/quizz-page"
import {getAuth} from "firebase/auth";
import {app} from "@/firebase.tsx";

const ProtectedRoute = () => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  return user ? <Outlet /> : <Navigate to="/signup" replace />;
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
          <Route path="/signup" element={<SignUp/>}/>
          {/* 2. Protected Route Wrapper: Only renders children if user is logged in */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage/>}/>
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App