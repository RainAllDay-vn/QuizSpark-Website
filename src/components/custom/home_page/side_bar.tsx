"use client"

import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Video,
  Calendar,
  Users,
  Settings,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import clsx from "clsx"
import search from "@/assets/img/icon-2.svg"

type SidebarProps = {
  className?: string
}

const mainNav = [
  { name: "Dashboard", icon: LayoutDashboard, to: "/home/dashboard" },
  { name: "Quizzes", icon: Video, to: "/home/quizzes" },
  { name: "Events", icon: Calendar, to: "/home/events" },
  { name: "Students", icon: Users, to: "/home/students" },
]

const manageNav = [
  { name: "Settings", icon: Settings, to: "/home/settings" },
]

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside
      className={clsx(
        "flex flex-col w-[310px] h-screen bg-[#0f0f0f] border-r border-zinc-800 text-white",
        className
      )}
    >
      {/* === Logo Section === */}
      <div className="flex items-center gap-2 p-6 pb-4">
        <h1 className="text-2xl font-semibold text-transparent bg-gradient-to-b from-[#5813C1] to-[#C45037] bg-clip-text">
          Quizzy
        </h1>
      </div>

      {/* === Search === */}
      <div className="px-6">
        <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#151518] border border-[#1f1f23]">
          <img src={search} alt="search icon" className="w-4 h-4 opacity-70" />
          <Input
            placeholder="Search"
            className="bg-transparent border-none text-sm text-white placeholder:text-[#878787] focus-visible:ring-0 focus:outline-none"
          />
        </div>
      </div>

      {/* === Navigation === */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {mainNav.map(({ name, icon: Icon, to }) => (
            <NavLink
              key={name}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all",
                  isActive
                    ? "bg-violet-600/20 border border-violet-600/40 text-violet-400 shadow-sm"
                    : "text-[#cccccc] hover:bg-[#18181a] hover:text-white border border-transparent"
                )
              }
            >
              <Icon className="h-5 w-5" />
              {name}
            </NavLink>
          ))}
        </nav>

        {/* === Manage Section === */}
        <div className="mt-8">
          <p className="text-sm font-semibold text-white px-3 mb-2">Manage</p>
          {manageNav.map(({ name, icon: Icon, to }) => (
            <NavLink
              key={name}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all",
                  isActive
                    ? "bg-violet-600/20 border border-violet-600/40 text-violet-400 shadow-sm"
                    : "text-[#cccccc] hover:bg-[#18181a] hover:text-white border border-transparent"
                )
              }
            >
              <Icon className="h-5 w-5" />
              {name}
            </NavLink>
          ))}
        </div>
      </ScrollArea>

      {/* === Footer === */}
      <div className="p-4 text-xs text-[#666] border-t border-zinc-800">
        © 2025 Quizzy Inc.
      </div>
    </aside>
  )
}
