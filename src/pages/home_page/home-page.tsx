"use client"

import { Sidebar } from "@/components/custom/home_page/side_bar"
import { Topbar } from "@/components/custom/home_page/top_bar"
import { useState } from "react"
import { Outlet } from "react-router-dom"

export function HomePage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white">
      <DashboardLayout />
    </div>
  )
}

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      {sidebarOpen && (
        <Sidebar className="hidden md:flex bg-[#151518] border-r border-zinc-800 text-white" />
      )}

      {/* Main Section */}
      <main className="flex-1 flex flex-col bg-[#0b0b0b]">
        {/* Topbar */}
        <Topbar
          onToggleSidebar={() => setSidebarOpen((s) => !s)}
        />

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-[#0b0b0b] to-[#111112]">
          <div className="max-w-[1440px] mx-auto space-y-8">
            {/* 🔹 Routed Component (Dashboard, Quizzes, etc.) */}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
