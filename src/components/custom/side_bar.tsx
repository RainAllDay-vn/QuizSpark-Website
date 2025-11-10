"use client"

import {Input} from "@/components/ui/input.tsx"
import {ScrollArea} from "@/components/ui/scroll-area.tsx"
import {LayoutDashboard, Video, Calendar, Users, Settings} from "lucide-react"
import {Link, NavLink} from "react-router-dom"
import clsx from "clsx"

interface SideBarProps {
  isVisible: boolean,
}

const navItems = [
  {name: "Dashboard", icon: LayoutDashboard, to: "/home/dashboard"},
  {name: "Quizzes", icon: Video, to: "/home/quizzes"},
  {name: "Events", icon: Calendar, to: "/home/events"},
  {name: "Students", icon: Users, to: "/home/students"},
  {name: "Settings", icon: Settings, to: "/home/settings"},
]

export function SideBar({isVisible}: SideBarProps) {
  const baseLink =
    "flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-[#1a1a1c] hover:text-white"
  const activeLink =
    "bg-violet-600/20 border border-violet-600/40 text-violet-400 shadow-sm"
  const inactiveLink = "text-zinc-400 border border-transparent"

  /*TO-DO:
  * Add search logic
  * Make SideBar become an overlay drawer on small screens
  * */
  return (
    <aside
      className={clsx("md:flex flex-col w-64 h-screen bg-[#151518] border-r border-zinc-800 text-white", isVisible ? "" : "hidden")}>
      {/* === Logo Section === */}
      <div className="p-6 text-2xl font-semibold tracking-tight text-white">
        <Link to="/"><span className="text-violet-500">Quiz</span>Spark</Link>
      </div>

      {/* === Search === */}
      <div className="px-4">
        <Input
          placeholder="Search..."
          className="bg-[#151518] border border-[#1f1f23] text-white placeholder:text-zinc-500 focus-visible:ring-violet-600"
        />
      </div>

      {/* === Navigation === */}
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-1">
          {navItems.map(({name, icon: Icon, to}) => (
            <NavLink
              key={name}
              to={to}
              className={({isActive}) => clsx(baseLink, isActive ? activeLink : inactiveLink)}
            >
              <Icon className="mr-3 h-5 w-5"/>
              <span className="font-medium">{name}</span>
            </NavLink>
          ))}
        </nav>
      </ScrollArea>

      {/* === Footer or version info === */}
      <div className="p-4 text-xs text-zinc-600 border-t border-zinc-800">
        © 2025 QuizSpark GROUP
      </div>
    </aside>
  )
}
