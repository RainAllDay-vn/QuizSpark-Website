import { ScrollArea } from "@/components/ui/scroll-area.tsx"
import { LayoutDashboard, Video, Calendar, Library, ChevronLeft, ChevronRight, Users } from "lucide-react"
import { Link, NavLink } from "react-router-dom"
import clsx from "clsx"
import useAuthStatus from "@/lib/use_auth_hook"

interface SideBarProps {
  isSideBarCollapsed: boolean,
  toggleSideBar: () => void,
}

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, to: "/home/dashboard" },
  { name: "My Banks", icon: Video, to: "/home/banks" },
  { name: "Workspace", icon: Library, to: "/workspace" },
  { name: "Classrooms", icon: Users, to: "/home/classrooms", roleRequired: ["ROLE_TEACHER", "ROLE_ADMIN"] },
  { name: "Past Practices", icon: Calendar, to: "/home/past-practices" },
]

export function SideBar({ isSideBarCollapsed, toggleSideBar }: SideBarProps) {
  const { user, loading } = useAuthStatus()
  const baseLink =
    "flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-[#1a1a1c] hover:text-white"
  const activeLink =
    "bg-violet-600/20 border border-violet-600/40 text-violet-400 shadow-sm"
  const inactiveLink = "text-zinc-400 border border-transparent"

  const filteredItems = navItems.filter(item => {
    if (!item.roleRequired) return true;
    if (loading) return false; // Hide protected items while loading
    return user && item.roleRequired.includes(user.role);
  })

  return (
    <aside
      className={clsx(
        "md:flex flex-col h-full bg-[#151518] border-r border-zinc-800 text-white transition-all duration-300 overflow-hidden md:visible",
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
          {filteredItems.map(({ name, icon: Icon, to }) => (
            <NavLink
              key={name}
              to={to}
              className={({ isActive }) => clsx(
                baseLink,
                isSideBarCollapsed ? "justify-center px-2" : "",
                isActive ? activeLink : inactiveLink
              )}
              title={isSideBarCollapsed ? name : undefined}
            >
              <Icon className={clsx(isSideBarCollapsed ? "" : "mr-3", "h-5 w-5")} />
              {!isSideBarCollapsed && <span className="font-medium">{name}</span>}
            </NavLink>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}
