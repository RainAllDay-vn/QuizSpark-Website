"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import { Menu } from "lucide-react"
import { getAuth, signOut, onAuthStateChanged, type User } from "firebase/auth"
import { app } from "@/firebase.tsx"
import { Link, useNavigate } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton.tsx"

export default function MyHeader() {
  const navigate = useNavigate()
  const auth = getAuth(app)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [auth])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch (err) {
      console.error("Sign out error:", err)
    }
  }

  /*TO-DO: Check the color of the skeleton*/
  if (loading) {
    return (
      <header className="flex items-center justify-between px-6 py-3 bg-black">
        <Skeleton className="h-6 w-32" />
        <div className="flex gap-3">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
      </header>
    )
  }

  /*TO-DO: Fix centering Nav element*/
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-black border-b border-white/10">
      {/* === Logo & Nav === */}
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-bold tracking-tight">
          <Link
            to={user ? "/home" : "/"}
            className="bg-gradient-to-r from-[#7B3FE4] via-[#A134C7] to-[#E04646] bg-clip-text text-transparent hover:opacity-80 transition"
          >
            QuizSpark
          </Link>
        </h1>

        <nav className="hidden md:flex space-x-4 text-sm font-medium">
          {user && (
            <Button asChild variant="link" className="text-gray-300 hover:text-white">
              <Link to="/home">Dashboard</Link>
            </Button>
          )}
          <Button asChild variant="destructive" className="text-gray-300 hover:text-white">
            <Link to="/quizz">Quizzes</Link>
          </Button>
          <Button asChild variant="link" className="text-gray-300 hover:text-white">
            <Link to="/leaderboard">Leaderboard</Link>
          </Button>
          <Button asChild variant="link" className="text-gray-300 hover:text-white">
            <Link to="/about">About</Link>
          </Button>
        </nav>
      </div>

      {/* === Auth Buttons === */}
      <div className="flex items-center gap-2">
        {user ? (
          <Button
            className="hidden md:block text-gray-300 hover:text-white hover:bg-white/10 transition"
            variant="ghost"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            className="hidden md:block text-white bg-gradient-to-r from-[#7B3FE4] to-[#E04646] hover:opacity-90 transition"
            asChild
          >
            <Link to="/signup">Join</Link>
          </Button>
        )}

        {/* === Mobile Menu === */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="border-white/20 text-white bg-black/50 hover:bg-black/70">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-black text-gray-200 border border-white/10"
            >
              {user && (
                <DropdownMenuItem asChild>
                  <Link to="/home">Home</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link to="/quizz">Quizzes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/leaderboard">Leaderboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about">About</Link>
              </DropdownMenuItem>
              {user ? (
                <DropdownMenuItem onSelect={handleSignOut}>Sign Out</DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild>
                  <Link to="/login">Join</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
