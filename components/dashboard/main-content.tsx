"use client"
import { AIGenerator } from "./sections/ai-generator"
import { ContentAngles } from "./sections/content-angles"
import { TrendsInsights } from "./sections/trends-insights"
import { IdeaManagement } from "./sections/idea-management"
import { CollaborationHub } from "./sections/collaboration-hub"
import { Analytics } from "./sections/analytics"
import { ContentLibrary } from "./sections/content-library"
import { Settings } from "./sections/settings"

interface MainContentProps {
  activeSection: string
}

export function MainContent({ activeSection }: MainContentProps) {
  const renderSection = () => {
    switch (activeSection) {
      case "ai-generator":
        return <AIGenerator />
      case "content-angles":
        return <ContentAngles />
      case "trends-insights":
        return <TrendsInsights />
      case "idea-management":
        return <IdeaManagement />
      case "collaboration":
        return <CollaborationHub />
      case "analytics":
        return <Analytics />
      case "content-library":
        return <ContentLibrary />
      case "settings":
        return <Settings />
      default:
        return <AIGenerator />
    }
  }

  return (
    <main className="flex-1 overflow-auto">
      <div className="container mx-auto p-6 space-y-6">{renderSection()}</div>
    </main>
  )
}
