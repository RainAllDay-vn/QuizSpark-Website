import { SideBar } from "@/components/custom/side_bar"
import { TopBar } from "@/components/custom/top_bar"
import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import clsx from "clsx"

export function HomePage() {
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(() => {
    const saved = sessionStorage.getItem("quizspark_sidebar_collapsed");
    return saved ? JSON.parse(saved) : false;
  })

  useEffect(() => {
    sessionStorage.setItem("quizspark_sidebar_collapsed", JSON.stringify(isSideBarCollapsed));
  }, [isSideBarCollapsed]);

  function toggleSideBar() {
    setIsSideBarCollapsed(!isSideBarCollapsed);
  }

  return (
    <div className="h-screen w-full flex bg-black text-white overflow-hidden">
      <SideBar
        isSideBarCollapsed={isSideBarCollapsed}
        toggleSideBar={toggleSideBar}
      />
      {/* Main Section */}
      <main className={clsx(
        "flex-1 flex flex-col bg-[#0b0b0b] transition-all duration-300",
      )}>
        <TopBar toggleSideBar={toggleSideBar} />
        <div className="flex-1 p-8 bg-gradient-to-b from-[#0b0b0b] to-[#111112] overflow-y-auto">
          <div className="max-w-[1440px] mx-auto space-y-8">
            {/* Routed Component (Dashboard, Question Banks, etc.) */}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
