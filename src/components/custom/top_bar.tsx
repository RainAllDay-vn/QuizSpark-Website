import {useState, useEffect} from "react"
import {Menu, Search, LogOut, User} from "lucide-react"
import {Button} from "@/components/ui/button.tsx"
import {Input} from "@/components/ui/input.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx"
import {getAuth, signOut, onAuthStateChanged, type User as FirebaseUser} from "firebase/auth"
import {app} from "../../firebase.tsx"
import {useNavigate} from "react-router-dom"

type TopBarProps = {
  toggleSideBar: () => void
}

export function TopBar({toggleSideBar}: TopBarProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const navigate = useNavigate()
  const auth = getAuth(app)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [auth])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch (err) {
      console.error("Sign out error:", err)
    }
  }

  /* TO-DO:
  * Add search logic
  * */
  return (
    <header
      className="flex items-center justify-between h-16 px-6 py-3 border-b border-zinc-800 bg-[#0f0f10]/80 backdrop-blur-md">
      {/* === Left section === */}
      <div className="flex items-center gap-3 w-1/2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-zinc-300 hover:bg-[#1a1a1c]"
          onClick={toggleSideBar}
        >
          <Menu className="h-5 w-5"/>
        </Button>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500"/>
          <Input
            placeholder="Search questions, events..."
            className="pl-9 bg-[#151518] border border-[#1f1f23] text-white placeholder:text-zinc-500 focus-visible:ring-violet-600"
          />
        </div>
      </div>

      {/* === Right section === */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-zinc-300 hover:bg-[#1a1a1c]"
            >
              <User className="h-5 w-5"/>
              {user && (
                <span className="hidden md:inline text-sm font-medium">
                  {user.displayName || "Account"}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="bg-[#151518] border border-zinc-800 text-zinc-200 w-48"
          >
            <DropdownMenuLabel className="text-xs uppercase tracking-wide text-zinc-500">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800"/>

            <DropdownMenuItem className="cursor-pointer hover:bg-[#1a1a1c]">
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer text-red-400 hover:bg-[#1a1a1c] hover:text-red-500"
              onSelect={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4"/>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
