import {SideBar} from "@/components/custom/side_bar"
import {TopBar} from "@/components/custom/top_bar"
import {useState} from "react"
import {Outlet} from "react-router-dom"

export function Home_page() {
  const [sideBarVisibility, setSideBarVisibility] = useState(false)

  return (
    <div className="min-h-screen w-full flex flex-col bg-black text-white">
      <div className="flex flex-1 overflow-hidden">
        <SideBar isVisible={sideBarVisibility}/>
        {/* Main Section */}
        <main className="flex-1 flex flex-col bg-[#0b0b0b]">
          <TopBar toggleSideBar={() => setSideBarVisibility(!sideBarVisibility)}/>
          <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-b from-[#0b0b0b] to-[#111112]">
            <div className="max-w-[1440px] mx-auto space-y-8">
              {/* Routed Component (Dashboard, Quizzes, etc.) */}
              <Outlet/>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
