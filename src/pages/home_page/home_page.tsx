import {SideBar} from "@/components/custom/side_bar"
import {TopBar} from "@/components/custom/top_bar"
import {useState} from "react"
import {Outlet} from "react-router-dom"
import clsx from "clsx"

export function HomePage() {
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(false)

  function toggleSideBar() {
    setIsSideBarCollapsed(!isSideBarCollapsed);
  }

  return (
    <div className="min-h-screen w-full flex bg-black text-white">
      <SideBar
        isSideBarCollapsed={isSideBarCollapsed}
        toggleSideBar={toggleSideBar}
      />
      {/* Main Section */}
      <main className={clsx(
        "flex-1 flex flex-col bg-[#0b0b0b] overflow-y-auto transition-all duration-300 ml-0",
        isSideBarCollapsed ? "md:ml-16" : "md:ml-64"
      )}>
        <TopBar toggleSideBar={toggleSideBar}/>
        <div className="flex-1 p-8 bg-gradient-to-b from-[#0b0b0b] to-[#111112]">
          <div className="max-w-[1440px] mx-auto space-y-8">
            {/* Routed Component (Dashboard, Question Banks, etc.) */}
            <Outlet/>
          </div>
        </div>
      </main>
    </div>
  )
}
