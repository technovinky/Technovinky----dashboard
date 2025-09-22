"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Copy, Heart, Share, RefreshCw, Zap, TrendingUp, Target, Brain } from "lucide-react"

interface IdeaCard {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  engagement: number
  difficulty: "Easy" | "Medium" | "Hard"
}

export function AIGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [ideas, setIdeas] = useState<IdeaCard[]>([])

  const mockIdeas: IdeaCard[] = [
    {
      id: "1",
      title: "10 AI Tools That Will Transform Your Workflow in 2025",
      description:
        "Explore cutting-edge AI tools that are revolutionizing productivity across industries. From content creation to data analysis, discover how these tools can streamline your daily tasks.",
      category: "Technology",
      tags: ["AI", "Productivity", "Tools", "2025"],
      engagement: 85,
      difficulty: "Easy",
    },
    {
      id: "2",
      title: "The Psychology Behind Viral Content: What Makes People Share",
      description:
        "Dive deep into the psychological triggers that make content go viral. Learn the science behind shareability and how to apply these principles to your content strategy.",
      category: "Marketing",
      tags: ["Psychology", "Viral", "Content", "Social Media"],
      engagement: 92,
      difficulty: "Medium",
    },
    {
      id: "3",
      title: "Building a Personal Brand in the Age of AI",
      description:
        "Navigate the challenges and opportunities of personal branding when AI can create content. Discover how to maintain authenticity and stand out in an AI-driven world.",
      category: "Personal Branding",
      tags: ["Personal Brand", "AI", "Authenticity", "Strategy"],
      engagement: 78,
      difficulty: "Hard",
    },
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIdeas(mockIdeas)
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
          <div className="p-3 gradient-primary rounded-xl animate-float">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Idea Generator</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary animate-pulse-slow" />
              Generate compelling content ideas powered by artificial intelligence
            </p>
          </div>
        </div>
      </div>

      <Card className="bg-card border-primary/20 shadow-luxury">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Sparkles className="h-5 w-5 text-primary animate-pulse-slow" />
            Generate New Ideas
          </CardTitle>
          <CardDescription>Describe your topic, audience, or goals to get personalized content ideas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prompt" className="flex items-center gap-2 text-foreground">
              <Target className="h-4 w-4 text-primary" />
              Content Prompt
            </Label>
            <div className="relative group">
              <div className="absolute inset-0 gradient-primary rounded-lg opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 blur-sm"></div>
              <Textarea
                id="prompt"
                placeholder="e.g., 'Create engaging social media content ideas for a tech startup targeting millennials...'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] relative bg-input border-primary/30 focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="audience" className="text-foreground">
                Target Audience
              </Label>
              <Input
                id="audience"
                placeholder="e.g., Tech professionals"
                className="bg-input border-primary/30 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform" className="text-foreground">
                Platform
              </Label>
              <Input
                id="platform"
                placeholder="e.g., LinkedIn, Twitter"
                className="bg-input border-primary/30 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tone" className="text-foreground">
                Tone
              </Label>
              <Input
                id="tone"
                placeholder="e.g., Professional, Casual"
                className="bg-input border-primary/30 focus:border-primary"
              />
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full md:w-auto gradient-primary hover:opacity-90 transition-all duration-300 glow-primary"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Ideas...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Ideas
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {ideas.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5 text-primary" />
              Generated Ideas
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerate}
              className="hover:bg-primary/10 border-primary/30 bg-transparent"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea, index) => (
              <Card
                key={idea.id}
                className="group hover:shadow-2xl transition-all duration-500 bg-card border-primary/20 hover:border-primary/40 hover:glow-primary"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="text-xs bg-secondary/20 text-secondary border-secondary/30">
                      {idea.category}
                    </Badge>
                    <Badge className={`${getDifficultyColor(idea.difficulty)} border`}>{idea.difficulty}</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors duration-300">
                    {idea.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{idea.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {idea.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-primary/30 hover:bg-primary/10 transition-colors"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-primary" />
                        <span>Score: {idea.engagement}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-red-500/10 hover:text-red-400 transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-secondary/10 hover:text-secondary transition-colors"
                      >
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
