"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { getAuth, signOut, onAuthStateChanged, type User } from "firebase/auth"
import { app } from "../../firebase"
import { Link, useNavigate } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"

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

  if (loading) {
    return (
      <header className="flex items-center justify-between px-6 py-3 shadow-sm">
        <Skeleton className="h-6 w-32" />
        <div className="flex gap-3">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
      </header>
    )
  }

  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-sm">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-semibold">
          <Link to={user ? "/home" : "/"}>MyApp</Link>
        </h1>

        <nav className="hidden md:flex space-x-4">
          {user && (
            <Button asChild variant="link">
              <Link to="/home">Home</Link>
            </Button>
          )}
          <Button asChild variant="link">
            <Link to="/quizz">Quizz</Link>
          </Button>
          <Button asChild variant="link">
            <Link to="/leaderboard">Leaderboard</Link>
          </Button>
          <Button asChild variant="link">
            <Link to="/about">About</Link>
          </Button>
        </nav>
      </div>

      <div className="flex items-center gap-2">
        {user ? (
          <Button className="hidden md:block" variant="link" onClick={handleSignOut}>
            Sign Out
          </Button>
        ) : (
          <Button className="hidden md:block" variant="link" asChild>
            <Link to="/login">Join</Link>
          </Button>
        )}

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user && (
                <DropdownMenuItem asChild>
                  <Link to="/home">Home</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link to="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/quizz">Quizzes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/leaderboard">Leaderboard</Link>
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
