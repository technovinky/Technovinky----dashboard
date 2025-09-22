"use client"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { MainContent } from "./main-content"
import { useMobile } from "@/hooks/use-mobile"

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("ai-generator")
  const isMobile = useMobile()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Layout */}
      <div className={`flex flex-col ${isMobile ? "" : "lg:pl-64"}`}>
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Content */}
        <MainContent activeSection={activeSection} />
      </div>
    </div>
  )
}
