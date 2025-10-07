import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"

export default function MyHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-sm">
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-semibold">MyApp</h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-4">
          <Button asChild variant="link"><a href="/">Home</a></Button>
          <Button asChild variant="link"><a href="/quizz">Quizz</a></Button>
          <Button asChild variant="link"><a href="/leaderboard">Leaderboard</a></Button>
          <Button asChild variant="link"><a href="/about">About</a></Button>
        </nav>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2">
        <Button className="hidden md:block" variant="link"><a href="/login">Join</a></Button>

        {/* Mobile menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild><a href="/">Home</a></DropdownMenuItem>
              <DropdownMenuItem asChild><a href="/about">About</a></DropdownMenuItem>
              <DropdownMenuItem asChild><a href="/quizz">Quizzes</a></DropdownMenuItem>
              <DropdownMenuItem asChild><a href="/leaderboard">Leaderboard</a></DropdownMenuItem>
              <DropdownMenuItem asChild><a href="/login">Join</a></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
