"use client"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Menu, Bell, Search, LogOut, User, Settings } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth()
  const isMobile = useMobile()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-white/10 backdrop-blur-md px-4 lg:px-6">
      {/* Mobile Menu Button */}
      {isMobile && (
        <Button variant="ghost" size="sm" onClick={onMenuClick} className="lg:hidden hover:bg-primary/10">
          <Menu className="h-5 w-5" />
        </Button>
      )}

      <div className="flex-1 max-w-md">
        <div className="relative group">
          <div className="absolute inset-0 gradient-primary rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
          <input
            type="search"
            placeholder="Search ideas, trends, or content..."
            className="relative w-full rounded-lg border border-input bg-background/80 backdrop-blur-sm pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="relative hover:bg-primary/10 group">
          <Bell className="h-5 w-5 group-hover:text-primary transition-colors" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-accent text-accent-foreground animate-pulse-slow">
            3
          </Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-primary/20 transition-all duration-300"
            >
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 glass-effect border-primary/20" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-primary/20" />
            <DropdownMenuItem className="hover:bg-primary/10 focus:bg-primary/10">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary/10 focus:bg-primary/10">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-primary/20" />
            <DropdownMenuItem
              onClick={logout}
              className="text-accent hover:bg-accent/10 focus:bg-accent/10 focus:text-accent"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}