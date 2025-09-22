"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface DashboardItem {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  createdAt: Date
  source: "ai-generator" | "idea-management" | "collaboration"
}

interface DashboardContextType {
  // Shared items across sections
  savedItems: DashboardItem[]
  addToSaved: (item: DashboardItem) => void
  removeFromSaved: (id: string) => void

  // Cross-section actions
  moveToProject: (item: DashboardItem, projectId: string) => void
  scheduleContent: (item: DashboardItem, date: Date) => void
  shareWithTeam: (item: DashboardItem, teamMembers: string[]) => void

  // Analytics tracking
  trackAction: (action: string, itemId: string, section: string) => void

  // Notifications
  notifications: Array<{
    id: string
    message: string
    type: "success" | "info" | "warning" | "error"
    timestamp: Date
  }>
  addNotification: (message: string, type: "success" | "info" | "warning" | "error") => void
  removeNotification: (id: string) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [savedItems, setSavedItems] = useState<DashboardItem[]>([])
  const [notifications, setNotifications] = useState<DashboardContextType["notifications"]>([])

  const addToSaved = (item: DashboardItem) => {
    setSavedItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev
      return [...prev, item]
    })
    addNotification(`"${item.title}" saved successfully`, "success")
    trackAction("save", item.id, item.source)
  }

  const removeFromSaved = (id: string) => {
    const item = savedItems.find((i) => i.id === id)
    setSavedItems((prev) => prev.filter((i) => i.id !== id))
    if (item) {
      addNotification(`"${item.title}" removed from saved items`, "info")
      trackAction("remove", id, item.source)
    }
  }

  const moveToProject = (item: DashboardItem, projectId: string) => {
    addNotification(`"${item.title}" moved to project`, "success")
    trackAction("move_to_project", item.id, item.source)
  }

  const scheduleContent = (item: DashboardItem, date: Date) => {
    addNotification(`"${item.title}" scheduled for ${date.toLocaleDateString()}`, "success")
    trackAction("schedule", item.id, item.source)
  }

  const shareWithTeam = (item: DashboardItem, teamMembers: string[]) => {
    addNotification(`"${item.title}" shared with ${teamMembers.length} team members`, "success")
    trackAction("share", item.id, item.source)
  }

  const trackAction = (action: string, itemId: string, section: string) => {
    // In a real app, this would send analytics data to your backend
    console.log(`Analytics: ${action} on ${itemId} from ${section}`)
  }

  const addNotification = (message: string, type: "success" | "info" | "warning" | "error") => {
    const notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date(),
    }
    setNotifications((prev) => [...prev, notification])

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(notification.id)
    }, 5000)
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <DashboardContext.Provider
      value={{
        savedItems,
        addToSaved,
        removeFromSaved,
        moveToProject,
        scheduleContent,
        shareWithTeam,
        trackAction,
        notifications,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}
