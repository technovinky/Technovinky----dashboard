"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMobile } from "@/hooks/use-mobile"
import Image from "next/image"
import {
  Brain,
  Lightbulb,
  TrendingUp,
  FolderOpen,
  Users,
  Settings,
  Sparkles,
  BarChart3,
  FileText,
  X,
  Zap,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  onSectionChange: (section: string) => void
}

const sidebarItems = [
  {
    id: "ai-generator",
    label: "AI Idea Generator",
    icon: Brain,
    description: "Generate content ideas",
    gradient: "from-primary to-secondary",
  },
  {
    id: "content-angles",
    label: "Content Angles",
    icon: Lightbulb,
    description: "Explore different perspectives",
    gradient: "from-secondary to-accent",
  },
  {
    id: "trends-insights",
    label: "Trends & Insights",
    icon: TrendingUp,
    description: "Market trends and keywords",
    gradient: "from-accent to-primary",
  },
  {
    id: "idea-management",
    label: "Idea Management",
    icon: FolderOpen,
    description: "Organize and export ideas",
    gradient: "from-primary to-accent",
  },
  {
    id: "collaboration",
    label: "Collaboration Hub",
    icon: Users,
    description: "Team brainstorming",
    gradient: "from-secondary to-primary",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    description: "Performance insights",
    gradient: "from-accent to-secondary",
  },
]

export function Sidebar({ isOpen, onClose, activeSection, onSectionChange }: SidebarProps) {
  const isMobile = useMobile()

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out shadow-luxury",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {/* Logo Container */}
                <div className="relative flex-shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Techno Logo"
                    width={120}
                    height={32}
                    className="h-8 w-auto object-contain"
                    priority
                  />
                  {/* Optional: Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-sm"></div>
                </div>
                {/* Optional: Company/App Name */}
              
              </div>
            </div>
            {isMobile && (
              <Button variant="ghost" size="sm" onClick={onClose} className="text-foreground hover:bg-muted">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-2">
              {sidebarItems.map((item, index) => {
                const Icon = item.icon
                const isActive = activeSection === item.id

                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start h-auto p-3 text-left relative overflow-hidden group transition-all duration-300",
                      isActive
                        ? "bg-primary text-primary-foreground border border-border glow-primary"
                        : "text-foreground hover:bg-muted hover:text-foreground",
                    )}
                    onClick={() => {
                      onSectionChange(item.id)
                      if (isMobile) onClose()
                    }}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Gradient background for active state */}
                    {isActive && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-10 animate-gradient`}
                      />
                    )}

                    <Icon className="mr-3 h-5 w-5 flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    <div className="flex flex-col items-start relative z-10">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs opacity-70">{item.description}</span>
                    </div>

                    {/* Shimmer effect on hover */}
                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                )
              })}
            </div>
          </ScrollArea>

          <div className="p-3 border-t border-border">
            <Button
              variant={activeSection === "settings" ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-auto p-3 text-left relative overflow-hidden group",
                activeSection === "settings"
                  ? "bg-primary text-primary-foreground glow-accent"
                  : "text-foreground hover:bg-muted hover:text-foreground",
              )}
              onClick={() => {
                onSectionChange("settings")
                if (isMobile) onClose()
              }}
            >
              {activeSection === "settings" && (
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-10" />
              )}
              <Settings className="mr-3 h-5 w-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
              <div className="flex flex-col items-start relative z-10">
                <span className="font-medium">Settings</span>
                <span className="text-xs opacity-70">Preferences & account</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}