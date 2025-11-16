"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area.tsx"
import { LayoutDashboard, Calendar, Users, Settings, Folder, Compass } from "lucide-react"
import { Link, NavLink } from "react-router-dom"
import clsx from "clsx"

interface SideBarProps {
  isVisible: boolean
}

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, to: "/home/dashboard" },
  { name: "Banks", icon: Folder, to: "/home/banks" },
  { name: "Discovery", icon: Compass, to: "/home/discovery" },
  { name: "Events", icon: Calendar, to: "/home/events" },
  { name: "Students", icon: Users, to: "/home/students" },
  { name: "Settings", icon: Settings, to: "/home/settings" },
]

export function SideBar({ isVisible }: SideBarProps) {
  const [collapsed, setCollapsed] = useState(false)

  const baseLink =
    "flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-[#1a1a1c] hover:text-white"
  const activeLink = "bg-violet-600/20 border border-violet-600/40 text-violet-400 shadow-sm"
  const inactiveLink = "text-zinc-400 border border-transparent"

  return (
    <aside
      className={clsx(
        "md:flex flex-col h-auto bg-[#151518] border-r border-zinc-800 text-white transition-all duration-300",
        isVisible ? "" : "hidden",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* === Logo & Collapse Button === */}
      <div className="flex items-center justify-between p-6">
        {!collapsed && (
          <Link to="/" className="text-2xl font-semibold tracking-tight text-white">
            <span className="text-violet-500">Quiz</span>Spark
          </Link>
        )}
      </div>

      {/* === Navigation === */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-1">
          {navItems.map(({ name, icon: Icon, to }) => (
            <NavLink
              key={name}
              to={to}
              className={({ isActive }) => clsx(baseLink, isActive ? activeLink : inactiveLink)}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span className="ml-3 font-medium">{name}</span>}
            </NavLink>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}
