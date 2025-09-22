"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { IdeaGenerator } from "@/components/idea-generator"
import { GeneratedIdeas } from "@/components/generated-ideas"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Zap, Sparkles } from "lucide-react"

export interface GeneratedIdea {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  difficulty: "Easy" | "Medium" | "Hard"
  estimatedTime: string
  engagement: number
  createdAt: Date
}

export default function GeneratorPage() {
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleIdeasGenerated = (ideas: GeneratedIdea[]) => {
    setGeneratedIdeas((prev) => [...ideas, ...prev])
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary animate-pulse-glow" />
            <h1 className="text-3xl font-serif font-bold text-foreground">AI Idea Generator</h1>
          </div>
          <p className="text-muted-foreground">
            Generate unlimited content ideas powered by advanced AI algorithms tailored to your niche and audience.
          </p>
        </div>

        <Tabs defaultValue="generator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="generator" className="flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Generate Ideas</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>Generated Ideas ({generatedIdeas.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Generator Form */}
              <div className="lg:col-span-2">
                <IdeaGenerator
                  onIdeasGenerated={handleIdeasGenerated}
                  isGenerating={isGenerating}
                  setIsGenerating={setIsGenerating}
                />
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-serif">Generation Stats</CardTitle>
                    <CardDescription>Your AI-powered content creation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Ideas Generated</span>
                      <span className="text-sm font-medium text-foreground">{generatedIdeas.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Categories Explored</span>
                      <span className="text-sm font-medium text-foreground">
                        {new Set(generatedIdeas.map((idea) => idea.category)).size}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg. Engagement</span>
                      <span className="text-sm font-medium text-foreground">
                        {generatedIdeas.length > 0
                          ? Math.round(
                              generatedIdeas.reduce((acc, idea) => acc + idea.engagement, 0) / generatedIdeas.length,
                            )
                          : 0}
                        %
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-serif">Pro Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>• Be specific with your target audience for better results</p>
                    <p>• Try different content types to diversify your strategy</p>
                    <p>• Use trending keywords to boost engagement potential</p>
                    <p>• Generate ideas in batches for consistent content flow</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <GeneratedIdeas ideas={generatedIdeas} setIdeas={setGeneratedIdeas} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
