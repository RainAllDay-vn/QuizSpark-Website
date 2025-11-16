import { useState, useEffect } from "react";
import { Menu, Search, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { getAuth, signOut, onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { app } from "../../firebase.tsx";
import { useNavigate } from "react-router-dom";

type TopBarProps = {
  toggleSideBar: () => void;
};

export function TopBar({ toggleSideBar }: TopBarProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-zinc-700 bg-[#151518]">
      {/* === Left section === */}
      <div className="flex items-center gap-3 w-1/2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-zinc-200 hover:bg-[#1f1f1f]"
          onClick={toggleSideBar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Search questions, events..."
            className="pl-9 bg-[#151518] border border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:ring-0"
          />
        </div>
      </div>

      {/* === Right section === */}
      <div className="flex items-center gap-4">
        {/* Account / Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-zinc-200 hover:bg-[#1f1f1f]"
            >
              <User className="h-5 w-5" />
              {user && (
                <span className="hidden md:inline text-sm font-medium">
                  {user.displayName || "Account"}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="bg-[#151518] border border-zinc-700 text-zinc-200 w-48"
          >
            {/* Mirror Top Bar entries */}
            <DropdownMenuItem
              className="cursor-pointer hover:bg-[#1f1f1f]"
              onSelect={() => navigate("/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer hover:bg-[#1f1f1f]"
              onSelect={() => navigate("/search")}
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer text-red-400 hover:bg-[#1f1f1f] hover:text-red-500"
              onSelect={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
