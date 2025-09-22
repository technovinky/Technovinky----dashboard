"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lightbulb, Sparkles, RefreshCw, Eye, Target, Users, TrendingUp, Zap, ArrowRight } from "lucide-react"

interface ContentAngle {
  id: string
  title: string
  description: string
  perspective: string
  audience: string
  tone: string
  difficulty: "Easy" | "Medium" | "Hard"
  engagement: number
}

export function ContentAngles() {
  const [topic, setTopic] = useState("")
  const [angles, setAngles] = useState<ContentAngle[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const mockAngles: ContentAngle[] = [
    {
      id: "1",
      title: "The Beginner's Perspective",
      description:
        "Approach your topic from someone who's just starting out. Focus on basic concepts, common mistakes, and step-by-step guidance.",
      perspective: "Beginner-friendly",
      audience: "Newcomers",
      tone: "Educational",
      difficulty: "Easy",
      engagement: 78,
    },
    {
      id: "2",
      title: "The Contrarian View",
      description:
        "Challenge popular opinions or conventional wisdom. Present alternative viewpoints that spark debate and discussion.",
      perspective: "Controversial",
      audience: "Industry experts",
      tone: "Provocative",
      difficulty: "Hard",
      engagement: 92,
    },
    {
      id: "3",
      title: "Behind the Scenes",
      description:
        "Show the process, struggles, and real work that goes into achieving results. People love authentic, transparent content.",
      perspective: "Transparent",
      audience: "General audience",
      tone: "Authentic",
      difficulty: "Medium",
      engagement: 85,
    },
    {
      id: "4",
      title: "The Data-Driven Approach",
      description:
        "Use statistics, research, and hard numbers to support your points. Appeal to logical, analytical thinkers.",
      perspective: "Analytical",
      audience: "Data enthusiasts",
      tone: "Professional",
      difficulty: "Medium",
      engagement: 81,
    },
    {
      id: "5",
      title: "Personal Story Angle",
      description:
        "Share your personal experience, failures, and lessons learned. Make it relatable and emotionally engaging.",
      perspective: "Personal",
      audience: "Broad audience",
      tone: "Emotional",
      difficulty: "Easy",
      engagement: 89,
    },
    {
      id: "6",
      title: "Future Predictions",
      description:
        "Discuss trends, predictions, and what's coming next in your industry. Position yourself as a thought leader.",
      perspective: "Futuristic",
      audience: "Forward-thinkers",
      tone: "Visionary",
      difficulty: "Hard",
      engagement: 76,
    },
  ]

  const handleGenerate = async () => {
    if (!topic.trim()) return

    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setAngles(mockAngles)
    setIsGenerating(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 gradient-secondary rounded-xl animate-float">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Content Angles
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Eye className="h-4 w-4 text-secondary animate-pulse-slow" />
              Explore different perspectives and approaches for your content
            </p>
          </div>
        </div>
      </div>

      <Card className="glass-effect border-secondary/20 glow-primary" style={{ backgroundColor: '#272F40' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Target className="h-5 w-5 text-secondary animate-pulse-slow" />
            Generate Content Angles
          </CardTitle>
          <CardDescription className="text-gray-300">Enter your topic to discover unique perspectives and approaches</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-white">Content Topic</Label>
            <div className="relative group">
              <div className="absolute inset-0 gradient-secondary rounded-lg opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 blur-sm"></div>
              <Input
                id="topic"
                placeholder="e.g., 'Remote work productivity', 'Social media marketing', 'Personal finance'..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="relative bg-black/30 backdrop-blur-sm border-secondary/30 focus:border-secondary focus:ring-secondary/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !topic.trim()}
            className="w-full md:w-auto gradient-secondary hover:opacity-90 transition-all duration-300"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating Angles...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Angles
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {angles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              Content Angle Suggestions
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerate}
              className="hover:bg-secondary/10 border-secondary/30 bg-transparent"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {angles.map((angle, index) => (
              <Card
                key={angle.id}
                className="group hover:shadow-2xl transition-all duration-500 glass-effect border-secondary/20 hover:border-secondary/40 hover:glow-primary relative overflow-hidden"
                style={{
                  backgroundColor: '#272F40',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Gradient background overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="space-y-3 relative z-10">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="text-xs bg-secondary/20 text-secondary border-secondary/30">
                      {angle.perspective}
                    </Badge>
                    <Badge className={`${getDifficultyColor(angle.difficulty)} border`}>{angle.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-secondary transition-colors duration-300 text-white">
                    {angle.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 relative z-10">
                  <p className="text-sm text-gray-300 leading-relaxed">{angle.description}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-secondary" />
                      <span className="text-gray-400">{angle.audience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-accent" />
                      <span className="text-gray-400">{angle.tone}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-600">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <TrendingUp className="h-3 w-3 text-secondary" />
                      <span>Engagement: {angle.engagement}%</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-secondary/10 hover:text-secondary transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {angles.length === 0 && (
        <Card className="glass-effect border-secondary/20" style={{ backgroundColor: '#272F40' }}>
          <CardContent className="text-center py-12">
            <div className="space-y-4">
              <div className="p-4 gradient-secondary rounded-full w-fit mx-auto animate-float">
                <Lightbulb className="h-12 w-12 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Ready to Explore New Angles?</h3>
                <p className="text-gray-300 max-w-md mx-auto">
                  Enter a topic above to discover unique perspectives and creative approaches for your content strategy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}