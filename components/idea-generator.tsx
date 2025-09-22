"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Sparkles, Lightbulb, Settings, Zap, Target, Brain, TrendingUp } from "lucide-react"
import type { GeneratedIdea } from "@/app/generator/page"

interface IdeaGeneratorProps {
  onIdeasGenerated: (ideas: GeneratedIdea[]) => void
  isGenerating: boolean
  setIsGenerating: (generating: boolean) => void
}

export function IdeaGenerator({ onIdeasGenerated, isGenerating, setIsGenerating }: IdeaGeneratorProps) {
  const [topic, setTopic] = useState("")
  const [audience, setAudience] = useState("")
  const [contentType, setContentType] = useState("")
  const [tone, setTone] = useState("")
  const [keywords, setKeywords] = useState("")

  const [creativity, setCreativity] = useState([75])
  const [ideaCount, setIdeaCount] = useState([5])
  const [includeQuestions, setIncludeQuestions] = useState(true)
  const [includeTrends, setIncludeTrends] = useState(true)
  const [industry, setIndustry] = useState("")
  const [competitorAnalysis, setCompetitorAnalysis] = useState(false)
  const [seoOptimized, setSeoOptimized] = useState(true)

  const generateIdeas = async () => {
    if (!topic.trim()) return

    setIsGenerating(true)

    // Simulate API call delay based on complexity
    const delay = competitorAnalysis ? 4000 : 2000
    await new Promise((resolve) => setTimeout(resolve, delay))

    const ideaTypes = [
      "Complete Beginner's Guide",
      "Common Mistakes to Avoid",
      "Future Trends and Predictions",
      "Case Study Analysis",
      "Tools and Resources",
      "Step-by-Step Tutorial",
      "Comparison Guide",
      "Expert Interview",
      "Behind the Scenes",
      "Data-Driven Insights",
    ]

    const mockIdeas: GeneratedIdea[] = Array.from({ length: ideaCount[0] }, (_, i) => {
      const ideaType = ideaTypes[i % ideaTypes.length]
      const engagementBoost = seoOptimized ? 10 : 0
      const trendBoost = includeTrends ? 15 : 0

      return {
        id: `idea-${Date.now()}-${i}`,
        title: `${topic}: ${ideaType}`,
        description: `${getDescriptionForType(ideaType, topic)} ${includeQuestions ? "Includes FAQ section and common questions." : ""}`,
        category: getCategoryForType(ideaType),
        tags: [
          topic.toLowerCase(),
          ...getTagsForType(ideaType),
          ...(industry ? [industry.toLowerCase()] : []),
          ...(seoOptimized ? ["seo-optimized"] : []),
          ...(includeTrends ? ["trending"] : []),
        ],
        difficulty: getDifficultyForType(ideaType),
        estimatedTime: getTimeForType(ideaType),
        engagement: Math.min(95, Math.floor(Math.random() * 20) + 60 + engagementBoost + trendBoost),
        createdAt: new Date(),
      }
    })

    onIdeasGenerated(mockIdeas)
    setIsGenerating(false)
  }

  const getDescriptionForType = (type: string, topic: string) => {
    const descriptions = {
      "Complete Beginner's Guide": `A comprehensive guide covering everything beginners need to know about ${topic}, including practical tips and real-world examples.`,
      "Common Mistakes to Avoid": `Common pitfalls and mistakes people make when dealing with ${topic}, and how to avoid them for better results.`,
      "Future Trends and Predictions": `Predictions and trends for ${topic} in the coming year, based on current market analysis and expert insights.`,
      "Case Study Analysis": `Real-world case study showing how ${topic} was successfully implemented, including challenges and results.`,
      "Tools and Resources": `Curated list of the best tools, resources, and platforms for ${topic}, with detailed reviews and recommendations.`,
      "Step-by-Step Tutorial": `Detailed tutorial breaking down ${topic} into actionable steps with screenshots and examples.`,
      "Comparison Guide": `In-depth comparison of different approaches, tools, or strategies related to ${topic}.`,
      "Expert Interview": `Insights and advice from industry experts about ${topic} and its future implications.`,
      "Behind the Scenes": `Behind-the-scenes look at how ${topic} works in practice, with insider tips and secrets.`,
      "Data-Driven Insights": `Statistical analysis and data-driven insights about ${topic} trends and performance.`,
    }
    return descriptions[type] || `Comprehensive content about ${topic} with actionable insights.`
  }

  const getCategoryForType = (type: string) => {
    const categories = {
      "Complete Beginner's Guide": "Educational",
      "Common Mistakes to Avoid": "Practical",
      "Future Trends and Predictions": "Trending",
      "Case Study Analysis": "Case Study",
      "Tools and Resources": "Resources",
      "Step-by-Step Tutorial": "Tutorial",
      "Comparison Guide": "Analysis",
      "Expert Interview": "Interview",
      "Behind the Scenes": "Insights",
      "Data-Driven Insights": "Analytics",
    }
    return categories[type] || "General"
  }

  const getTagsForType = (type: string) => {
    const tags = {
      "Complete Beginner's Guide": ["beginner", "guide", "tutorial"],
      "Common Mistakes to Avoid": ["mistakes", "tips", "advice"],
      "Future Trends and Predictions": ["future", "trends", "predictions"],
      "Case Study Analysis": ["case study", "success", "results"],
      "Tools and Resources": ["tools", "resources", "recommendations"],
      "Step-by-Step Tutorial": ["tutorial", "step-by-step", "how-to"],
      "Comparison Guide": ["comparison", "analysis", "review"],
      "Expert Interview": ["interview", "expert", "insights"],
      "Behind the Scenes": ["behind-scenes", "insider", "secrets"],
      "Data-Driven Insights": ["data", "analytics", "insights"],
    }
    return tags[type] || ["content"]
  }

  const getDifficultyForType = (type: string) => {
    const difficulties = {
      "Complete Beginner's Guide": "Easy",
      "Common Mistakes to Avoid": "Easy",
      "Future Trends and Predictions": "Hard",
      "Case Study Analysis": "Medium",
      "Tools and Resources": "Easy",
      "Step-by-Step Tutorial": "Medium",
      "Comparison Guide": "Medium",
      "Expert Interview": "Hard",
      "Behind the Scenes": "Medium",
      "Data-Driven Insights": "Hard",
    }
    return difficulties[type] || "Medium"
  }

  const getTimeForType = (type: string) => {
    const times = {
      "Complete Beginner's Guide": "15-20 min read",
      "Common Mistakes to Avoid": "10-12 min read",
      "Future Trends and Predictions": "20-25 min read",
      "Case Study Analysis": "18-22 min read",
      "Tools and Resources": "12-15 min read",
      "Step-by-Step Tutorial": "25-30 min read",
      "Comparison Guide": "15-18 min read",
      "Expert Interview": "20-25 min read",
      "Behind the Scenes": "12-16 min read",
      "Data-Driven Insights": "18-22 min read",
    }
    return times[type] || "15 min read"
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-serif flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-primary" />
          AI Idea Generator
        </CardTitle>
        <CardDescription>Advanced AI-powered content idea generation with customizable parameters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic" className="flex items-center">
              <Zap className="mr-2 h-4 w-4" />
              Quick Generate
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Advanced Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Topic or Subject *</label>
                <Input
                  placeholder="e.g., Artificial Intelligence, Digital Marketing"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="bg-input border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Target Audience</label>
                <Input
                  placeholder="e.g., Small business owners, Students"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="bg-input border-border focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Content Type</label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog-post">Blog Post</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="infographic">Infographic</SelectItem>
                    <SelectItem value="tutorial">Tutorial</SelectItem>
                    <SelectItem value="case-study">Case Study</SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="podcast">Podcast</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Industry/Niche</label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger className="bg-input border-border">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Creativity Level: {creativity[0]}%</label>
                  <Slider value={creativity} onValueChange={setCreativity} max={100} step={5} className="w-full" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservative</span>
                    <span>Balanced</span>
                    <span>Creative</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Number of Ideas: {ideaCount[0]}</label>
                  <Slider value={ideaCount} onValueChange={setIdeaCount} min={3} max={15} step={1} className="w-full" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Include Questions</label>
                    <p className="text-xs text-muted-foreground">Add FAQ sections to ideas</p>
                  </div>
                  <Switch checked={includeQuestions} onCheckedChange={setIncludeQuestions} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Trend Analysis</label>
                    <p className="text-xs text-muted-foreground">Include trending topics</p>
                  </div>
                  <Switch checked={includeTrends} onCheckedChange={setIncludeTrends} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">SEO Optimized</label>
                    <p className="text-xs text-muted-foreground">Focus on search optimization</p>
                  </div>
                  <Switch checked={seoOptimized} onCheckedChange={setSeoOptimized} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Competitor Analysis</label>
                    <p className="text-xs text-muted-foreground">Analyze competitor content</p>
                  </div>
                  <Switch checked={competitorAnalysis} onCheckedChange={setCompetitorAnalysis} />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Keywords (optional)</label>
          <Textarea
            placeholder="Enter relevant keywords separated by commas"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="bg-input border-border focus:border-primary min-h-[80px]"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4" />
            <span>AI will generate {ideaCount[0]} unique ideas</span>
            {competitorAnalysis && (
              <Badge variant="secondary" className="ml-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                +Analysis
              </Badge>
            )}
          </div>

          <Button
            onClick={generateIdeas}
            disabled={!topic.trim() || isGenerating}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {competitorAnalysis ? "Analyzing..." : "Generating..."}
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Ideas
              </>
            )}
          </Button>
        </div>

        {/* Quick suggestions */}
        <div className="space-y-3 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Popular Topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              "AI & Machine Learning",
              "Digital Marketing",
              "Productivity",
              "Remote Work",
              "Entrepreneurship",
              "Web Development",
              "Cryptocurrency",
              "Sustainability",
            ].map((suggestion) => (
              <Badge
                key={suggestion}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setTopic(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
