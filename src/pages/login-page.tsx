"use client"

import { use, useState } from "react"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { app } from "../firebase"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"


export function LoginPage() {
  
  const navigate = useNavigate()
  const auth = getAuth(app)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = async () => {
    setError("")

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      navigate("/home")
    } catch (err: any) {
      setError(err.message)
    }

  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      alert("Logged in with Google successfully!")
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <Card className="w-auto max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>{isRegister ? "Register" : "Login"}</CardTitle>
        <CardDescription>
          {isRegister ? "Create a new account" : "Sign in to your account"}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {error && <p className="text-red-500">{error}</p>}

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {isRegister && (
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        <Button variant="outline" onClick={handleSubmit}>
          {isRegister ? "Register" : "Login"}
        </Button>

        <div className="text-center">or</div>

        <Button variant="outline" onClick={handleGoogleLogin}>
          Continue with Google
        </Button>

        <div className="flex justify-center gap-2 mt-2">
          <Button size="sm" variant="secondary" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Switch to Login" : "Switch to Register"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
