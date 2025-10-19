"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export default function MyFooter() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 200)
    return () => clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <footer className="py-10 px-6 mt-10 border-t border-white/10 bg-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="mt-8 pt-4 text-center">
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </footer>
    )
  }

  return (
    <footer className="relative flex flex-col justify-between px-12 py-12 bg-[#0D0F1A] text-gray-300 border-t border-white/10 h-[66.67vh]">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
    {/* Brand */}
    <div className="flex flex-col gap-6">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-[#7B3FE4] via-[#A134C7] to-[#E04646] bg-clip-text text-transparent">
        Quizzy
      </h2>
      <p className="text-lg text-gray-400">
        The ultimate quiz platform for students and teachers. Learn, compete, and earn rewards.
      </p>
      <div className="flex gap-4 text-2xl text-[#7B3FE4]">
        <i className="fab fa-facebook-f hover:text-white transition-colors"></i>
        <i className="fab fa-twitter hover:text-white transition-colors"></i>
        <i className="fab fa-instagram hover:text-white transition-colors"></i>
        <i className="fab fa-linkedin-in hover:text-white transition-colors"></i>
      </div>
    </div>

    {/* Quick Links */}
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-white">Quick Links</h3>
      <div className="flex flex-col gap-3 text-lg">
        {["Home", "Quizzes", "Leaderboard", "About"].map((label, i) => (
          <Button
            key={i}
            variant="link"
            className="justify-start p-0 h-auto text-gray-400 hover:text-white transition-colors"
            asChild
          >
            <Link to={`/${label.toLowerCase()}`}>{label}</Link>
          </Button>
        ))}
      </div>
    </div>

    {/* Legal */}
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-white">Legal</h3>
      <div className="flex flex-col gap-3 text-lg">
        {["Privacy Policy", "Terms of Service", "Cookie Settings", "Contact Us"].map((label, i) => (
          <Button
            key={i}
            variant="link"
            className="justify-start p-0 h-auto text-gray-400 hover:text-white transition-colors"
            asChild
          >
            <Link to={`/${label.toLowerCase().replace(/\s+/g, "-")}`}>{label}</Link>
          </Button>
        ))}
      </div>
    </div>
  </div>

  {/* Bottom note */}
  <div className="mt-12 text-center text-lg text-gray-400">
    <p>
      © 2025 <span className="text-white font-medium">StuQuiz</span>. All Rights Reserved |{" "}
      <Link to="/terms" className="text-[#A134C7] hover:underline">Terms & Conditions</Link> |{" "}
      <Link to="/privacy" className="text-[#A134C7] hover:underline">Privacy Policy</Link>
    </p>
  </div>
</footer>

  )
}
