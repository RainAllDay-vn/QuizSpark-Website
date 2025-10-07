"use client"

import { Button } from "@/components/ui/button"

export default function MyFooter() {
  return (
    <footer className="py-10 px-6 mt-10 border-t">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">QuizSpark</h2>
          <p className="mt-3 text-sm opacity-80">
            Test your knowledge with fun and interactive quizzes across various topics.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Button variant="link" className="justify-start p-0 h-auto">
              <a href="#">Home</a>
            </Button>
            <Button variant="link" className="justify-start p-0 h-auto">
              <a href="#">Quizzes</a>
            </Button>
            <Button variant="link" className="justify-start p-0 h-auto">
              <a href="#">Leaderboard</a>
            </Button>
            <Button variant="link" className="justify-start p-0 h-auto">
              <a href="#">About</a>
            </Button>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Legal</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Button variant="link" className="justify-start p-0 h-auto">
              <a href="#">Privacy Policy</a>
            </Button>
            <Button variant="link" className="justify-start p-0 h-auto">
              <a href="#">Terms of Service</a>
            </Button>
            <Button variant="link" className="justify-start p-0 h-auto">
              <a href="#">Cookie Settings</a>
            </Button>
            <Button variant="link" className="justify-start p-0 h-auto">
              <a href="#">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-8 pt-4 text-center text-sm opacity-70">
        © 2025 QuizSpark. All rights reserved.
      </div>
    </footer>
  )
}
