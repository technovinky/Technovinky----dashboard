"use client"

import type React from "react"
import Image from "next/image"

import { useState } from "react"
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Sparkles,
  TrendingUp,
  Bookmark,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  Home,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "AI Generator", href: "/generator", icon: Brain },
  { name: "Content Angles", href: "/angles", icon: Sparkles },
  { name: "Trends & Insights", href: "/trends", icon: TrendingUp },
  { name: "Idea Management", href: "/management", icon: Bookmark },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Collaboration", href: "/collaboration", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...")
  }

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0 bg-card border-border">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center px-6 border-b border-border">
              <div className="relative flex items-center">
                <Image
                  src="/logo.png"
                  alt="TechnoVinky Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                  priority
                />
                <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-md animate-pulse-slow"></div>
              </div>
              <span className="ml-2 text-xl font-serif font-bold text-foreground"></span>
            </div>

            <nav className="flex-1 space-y-2 px-3 py-6">
              {navigation.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <div key={item.name} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-luxury glow-primary"
                          : "text-foreground hover:text-foreground hover:bg-muted hover:shadow-lg",
                      )}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon
                        className={cn(
                          "mr-3 h-5 w-5 transition-transform duration-300",
                          isActive ? "scale-110" : "group-hover:scale-105",
                        )}
                      />
                      {item.name}
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-primary opacity-10 animate-shimmer"></div>
                      )}
                    </Link>
                  </div>
                )
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-card border-r border-border px-6 shadow-luxury">
          <div className="flex h-16 shrink-0 items-center animate-float">
            <div className="relative flex items-center">
              <Image
                src="/logo.png"
                alt="TechnoVinky Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
                priority
              />
              <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-md animate-pulse-slow"></div>
            </div>
            <span className="ml-2 text-xl font-serif font-bold text-foreground">TechnoVinky</span>
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-2">
                  {navigation.map((item, index) => {
                    const isActive = pathname === item.href
                    return (
                      <li key={item.name} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-medium transition-all duration-300 relative overflow-hidden",
                            isActive
                              ? "bg-primary text-primary-foreground shadow-luxury glow-primary"
                              : "text-foreground hover:text-foreground hover:bg-muted hover:shadow-lg",
                          )}
                        >
                          <item.icon
                            className={cn(
                              "h-5 w-5 shrink-0 transition-transform duration-300",
                              isActive ? "scale-110" : "group-hover:scale-105",
                            )}
                          />
                          {item.name}
                          {isActive && (
                            <div className="absolute inset-0 bg-gradient-primary opacity-10 animate-shimmer"></div>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background/95 backdrop-blur-sm px-4 shadow-luxury sm:gap-x-6 sm:px-6 lg:px-8">
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="lg:hidden hover:bg-muted/50 transition-colors">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1 items-center max-w-lg">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                className="block h-10 w-full rounded-xl border border-border/50 bg-muted/30 py-2 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 sm:text-sm"
                placeholder="Search ideas, trends, analytics..."
                type="search"
              />
            </div>
          </div>

          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <Button variant="ghost" size="sm" className="relative hover:bg-muted/50 transition-colors">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-secondary text-secondary-foreground animate-pulse-slow">
                3
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
                    <AvatarImage src="/professional-avatar.png" alt="User" />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                      TV
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-effect border-border/50 shadow-luxury" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none text-foreground">TechnoVinky User</p>
                    <p className="text-xs leading-none text-muted-foreground">user@technovinky.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem asChild className="hover:bg-muted/50 transition-colors">
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <main className="py-8">
          <div className="px-4 sm:px-6 lg:px-8 animate-scale-in">{children}</div>
        </main>
      </div>
    </div>
  )
}