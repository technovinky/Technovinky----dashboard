"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, Target, TrendingUp, Eye, Clock, CheckCircle, Lightbulb } from "lucide-react"

interface OptimizationSuggestion {
  type: "seo" | "readability" | "engagement" | "structure"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  effort: "easy" | "moderate" | "complex"
}

export function AIContentOptimizer() {
  const [content, setContent] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<{
    score: number
    suggestions: OptimizationSuggestion[]
    metrics: {
      readability: number
      seoScore: number
      engagement: number
      structure: number
    }
  } | null>(null)

  const handleAnalyze = async () => {
    if (!content.trim()) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockResults = {
      score: 78,
      suggestions: [
        {
          type: "seo" as const,
          title: "Add more relevant keywords",
          description: "Include 'AI automation' and 'productivity tools' 2-3 more times naturally",
          impact: "high" as const,
          effort: "easy" as const,
        },
        {
          type: "readability" as const,
          title: "Break up long paragraphs",
          description: "Split the third paragraph into 2-3 shorter ones for better readability",
          impact: "medium" as const,
          effort: "easy" as const,
        },
        {
          type: "engagement" as const,
          title: "Add a compelling hook",
          description: "Start with a surprising statistic or thought-provoking question",
          impact: "high" as const,
          effort: "moderate" as const,
        },
        {
          type: "structure" as const,
          title: "Include subheadings",
          description: "Add 2-3 H2 subheadings to improve content structure and scannability",
          impact: "medium" as const,
          effort: "easy" as const,
        },
      ],
      metrics: {
        readability: 72,
        seoScore: 65,
        engagement: 81,
        structure: 58,
      },
    }

    setAnalysisResults(mockResults)
    setIsAnalyzing(false)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "moderate":
        return "bg-yellow-100 text-yellow-800"
      case "complex":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "seo":
        return <Target className="h-4 w-4" />
      case "readability":
        return <Eye className="h-4 w-4" />
      case "engagement":
        return <TrendingUp className="h-4 w-4" />
      case "structure":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Lightbulb className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">AI Content Optimizer</h1>
        <p className="text-muted-foreground">Analyze and optimize your content for better performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Content Analysis
            </CardTitle>
            <CardDescription>Paste your content below for AI-powered optimization suggestions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your content here for analysis..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] resize-none"
            />
            <Button onClick={handleAnalyze} disabled={!content.trim() || isAnalyzing} className="w-full">
              {isAnalyzing ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing Content...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Analyze Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <Card>
          <CardHeader>
            <CardTitle>Optimization Results</CardTitle>
            <CardDescription>AI-powered suggestions to improve your content</CardDescription>
          </CardHeader>
          <CardContent>
            {!analysisResults ? (
              <div className="text-center py-12">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Analyze your content to see optimization suggestions</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">{analysisResults.score}/100</div>
                  <p className="text-sm text-muted-foreground">Overall Content Score</p>
                  <Progress value={analysisResults.score} className="mt-2" />
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold">{analysisResults.metrics.readability}%</div>
                    <p className="text-xs text-muted-foreground">Readability</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{analysisResults.metrics.seoScore}%</div>
                    <p className="text-xs text-muted-foreground">SEO Score</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{analysisResults.metrics.engagement}%</div>
                    <p className="text-xs text-muted-foreground">Engagement</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">{analysisResults.metrics.structure}%</div>
                    <p className="text-xs text-muted-foreground">Structure</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Suggestions */}
      {analysisResults && (
        <Card>
          <CardHeader>
            <CardTitle>Optimization Suggestions</CardTitle>
            <CardDescription>Prioritized recommendations to improve your content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysisResults.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {getTypeIcon(suggestion.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <Badge className={`text-xs ${getImpactColor(suggestion.impact)}`}>
                        {suggestion.impact} impact
                      </Badge>
                      <Badge className={`text-xs ${getEffortColor(suggestion.effort)}`}>{suggestion.effort}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
