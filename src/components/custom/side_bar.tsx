import {ScrollArea} from "@/components/ui/scroll-area.tsx"
import {LayoutDashboard, Video, Calendar, Users, Settings, ChevronLeft, ChevronRight} from "lucide-react"
import {Link, NavLink} from "react-router-dom"
import clsx from "clsx"

interface SideBarProps {
  isSideBarCollapsed: boolean,
  toggleSideBar: () => void,
}

const navItems = [
  {name: "Dashboard", icon: LayoutDashboard, to: "/home/dashboard"},
  {name: "My Banks", icon: Video, to: "/home/banks"},
  {name: "Events", icon: Calendar, to: "/home/events"},
  {name: "Students", icon: Users, to: "/home/students"},
  {name: "Settings", icon: Settings, to: "/home/settings"},
]

export function SideBar({isSideBarCollapsed, toggleSideBar}: SideBarProps) {  
  const baseLink =
    "flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-[#1a1a1c] hover:text-white"
  const activeLink =
    "bg-violet-600/20 border border-violet-600/40 text-violet-400 shadow-sm"
  const inactiveLink = "text-zinc-400 border border-transparent"

  return (
    <aside
      className={clsx(
        "md:flex fixed top-0 left-0 flex-col h-screen bg-[#151518] border-r border-zinc-800 text-white z-40 transition-all duration-300 overflow-hidden md:visible",
        isSideBarCollapsed ? "w-0 md:w-16" : "w-64",
      )}>
      {/* === Header with Logo and Collapse Button === */}
      <div className="flex items-center justify-between h-16 p-4 border-b border-zinc-800">
        {!isSideBarCollapsed && (
          <div className="text-2xl font-semibold tracking-tight text-white">
            <Link to="/"><span className="text-violet-500">Quiz</span>Spark</Link>
          </div>
        )}
        <button
          onClick={toggleSideBar}
          className="px-auto rounded-md hover:bg-[#1a1a1c] transition-colors"
        >
          {isSideBarCollapsed ? (
            <ChevronRight className="h-5 text-zinc-400" />
          ) : (
            <ChevronLeft className="h-5 text-zinc-400" />
          )}
        </button>
      </div>

      {/* === Navigation === */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-1">
          {navItems.map(({name, icon: Icon, to}) => (
            <NavLink
              key={name}
              to={to}
              className={({isActive}) => clsx(
                baseLink,
                isSideBarCollapsed ? "justify-center px-2" : "",
                isActive ? activeLink : inactiveLink
              )}
              title={isSideBarCollapsed ? name : undefined}
            >
              <Icon className={clsx(isSideBarCollapsed ? "" : "mr-3", "h-5 w-5")}/>
              {!isSideBarCollapsed && <span className="font-medium">{name}</span>}
            </NavLink>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}
