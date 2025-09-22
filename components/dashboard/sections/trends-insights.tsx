"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TrendingUp, Search, BarChart3, Globe, ArrowUp, ArrowDown, Minus, Target, Activity } from "lucide-react"

interface TrendData {
  id: string
  keyword: string
  searchVolume: number
  trend: "up" | "down" | "stable"
  trendPercentage: number
  difficulty: number
  category: string
  relatedTopics: string[]
}

interface InsightCard {
  id: string
  title: string
  description: string
  type: "opportunity" | "warning" | "info"
  impact: "high" | "medium" | "low"
}

export function TrendsInsights() {
  const [searchTerm, setSearchTerm] = useState("")
  const [trends, setTrends] = useState<TrendData[]>([])
  const [insights, setInsights] = useState<InsightCard[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const mockTrends: TrendData[] = [
    {
      id: "1",
      keyword: "AI Content Creation",
      searchVolume: 45600,
      trend: "up",
      trendPercentage: 23,
      difficulty: 72,
      category: "Technology",
      relatedTopics: ["GPT", "Content Marketing", "Automation"],
    },
    {
      id: "2",
      keyword: "Remote Work Tools",
      searchVolume: 33200,
      trend: "stable",
      trendPercentage: 2,
      difficulty: 58,
      category: "Business",
      relatedTopics: ["Productivity", "Collaboration", "Digital Nomad"],
    },
    {
      id: "3",
      keyword: "Sustainable Marketing",
      searchVolume: 18900,
      trend: "up",
      trendPercentage: 45,
      difficulty: 41,
      category: "Marketing",
      relatedTopics: ["Green Business", "ESG", "Brand Purpose"],
    },
    {
      id: "4",
      keyword: "Social Commerce",
      searchVolume: 28700,
      trend: "up",
      trendPercentage: 67,
      difficulty: 65,
      category: "E-commerce",
      relatedTopics: ["Instagram Shopping", "TikTok Shop", "Live Streaming"],
    },
    {
      id: "5",
      keyword: "Voice Search SEO",
      searchVolume: 12400,
      trend: "down",
      trendPercentage: -15,
      difficulty: 39,
      category: "SEO",
      relatedTopics: ["Smart Speakers", "Local SEO", "Featured Snippets"],
    },
  ]

  const mockInsights: InsightCard[] = [
    {
      id: "1",
      title: "AI Content Creation Surge",
      description:
        "Search volume for AI content tools has increased 23% this month. Consider creating content around AI writing assistants and automation.",
      type: "opportunity",
      impact: "high",
    },
    {
      id: "2",
      title: "Voice Search Declining",
      description:
        "Voice search optimization queries are down 15%. Focus may be shifting to visual and video search instead.",
      type: "warning",
      impact: "medium",
    },
    {
      id: "3",
      title: "Sustainable Marketing Rising",
      description:
        "Growing interest in sustainable and ethical marketing practices. Low competition makes this a great opportunity.",
      type: "opportunity",
      impact: "high",
    },
  ]

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setTrends(mockTrends)
    setInsights(mockInsights)
    setIsAnalyzing(false)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-4 w-4 text-green-400" />
      case "down":
        return <ArrowDown className="h-4 w-4 text-red-400" />
      default:
        return <Minus className="h-4 w-4 text-yellow-400" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-400"
      case "down":
        return "text-red-400"
      default:
        return "text-yellow-400"
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "border-green-500/30 bg-green-500/10"
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/10"
      default:
        return "border-blue-500/30 bg-blue-500/10"
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 gradient-accent rounded-xl animate-float">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Trends & Insights
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-accent animate-pulse-slow" />
              Stay ahead with the latest trends and keyword insights
            </p>
          </div>
        </div>
      </div>

      <Card className="glass-effect border-accent/20 glow-primary" style={{ backgroundColor: '#272F40' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Search className="h-5 w-5 text-accent animate-pulse-slow" />
            Trend Analysis
          </CardTitle>
          <CardDescription className="text-gray-300">Analyze trending keywords and market insights for your niche</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search-term" className="text-white">Industry or Keyword</Label>
            <div className="relative group">
              <div className="absolute inset-0 gradient-accent rounded-lg opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 blur-sm"></div>
              <Input
                id="search-term"
                placeholder="e.g., 'digital marketing', 'sustainable fashion', 'fintech'..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="relative bg-black/30 backdrop-blur-sm border-accent/30 focus:border-accent focus:ring-accent/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full md:w-auto gradient-accent hover:opacity-90 transition-all duration-300"
          >
            {isAnalyzing ? (
              <>
                <BarChart3 className="mr-2 h-4 w-4 animate-pulse" />
                Analyzing Trends...
              </>
            ) : (
              <>
                <TrendingUp className="mr-2 h-4 w-4" />
                Analyze Trends
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {insights.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            Key Insights
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight, index) => (
              <Card
                key={insight.id}
                className={`glass-effect ${getInsightColor(insight.type)} hover:shadow-lg transition-all duration-300`}
                style={{
                  backgroundColor: '#272F40',
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <CardHeader className="space-y-2">
                  <div className="flex items-start justify-between">
                    <Badge className={`${getImpactBadge(insight.impact)} border text-xs`}>
                      {insight.impact.toUpperCase()} IMPACT
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-white">{insight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300 leading-relaxed">{insight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {trends.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Trending Keywords
          </h2>
          <Card className="glass-effect border-primary/20" style={{ backgroundColor: '#272F40' }}>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-4 font-medium text-white">Keyword</th>
                      <th className="text-left p-4 font-medium text-white">Volume</th>
                      <th className="text-left p-4 font-medium text-white">Trend</th>
                      <th className="text-left p-4 font-medium text-white">Difficulty</th>
                      <th className="text-left p-4 font-medium text-white">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trends.map((trend, index) => (
                      <tr
                        key={trend.id}
                        className="border-b border-gray-600/50 hover:bg-primary/10 transition-colors"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                        }}
                      >
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="font-medium text-white">{trend.keyword}</div>
                            <div className="flex flex-wrap gap-1">
                              {trend.relatedTopics.slice(0, 2).map((topic) => (
                                <Badge key={topic} variant="outline" className="text-xs border-primary/30 text-gray-300">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Globe className="h-4 w-4 text-gray-400" />
                            <span className="font-mono text-sm text-white">{trend.searchVolume.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getTrendIcon(trend.trend)}
                            <span className={`font-medium ${getTrendColor(trend.trend)}`}>
                              {trend.trendPercentage > 0 ? "+" : ""}
                              {trend.trendPercentage}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-1000 ${
                                  trend.difficulty > 70
                                    ? "bg-red-500"
                                    : trend.difficulty > 40
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }`}
                                style={{ width: `${trend.difficulty}%` }}
                              />
                            </div>
                            <span className="text-sm font-mono text-white">{trend.difficulty}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                            {trend.category}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {trends.length === 0 && (
        <Card className="glass-effect border-accent/20" style={{ backgroundColor: '#272F40' }}>
          <CardContent className="text-center py-12">
            <div className="space-y-4">
              <div className="p-4 gradient-accent rounded-full w-fit mx-auto animate-float">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Discover Market Trends</h3>
                <p className="text-gray-300 max-w-md mx-auto">
                  Enter an industry or keyword above to analyze current trends, search volumes, and competitive
                  insights.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}