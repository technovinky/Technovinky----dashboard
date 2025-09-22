"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreVertical,
  Bookmark,
  Share2,
  Copy,
  Trash2,
  Clock,
  TrendingUp,
  Target,
  Calendar,
  Tag,
} from "lucide-react"
import type { GeneratedIdea } from "@/app/generator/page"
import { useDashboard } from "@/contexts/dashboard-context"

interface GeneratedIdeasProps {
  ideas: GeneratedIdea[]
  setIdeas: (ideas: GeneratedIdea[]) => void
}

export function GeneratedIdeas({ ideas, setIdeas }: GeneratedIdeasProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterDifficulty, setFilterDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const { addToSaved, moveToProject, scheduleContent, shareWithTeam } = useDashboard()

  const filteredAndSortedIdeas = ideas
    .filter((idea) => {
      const matchesSearch =
        idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        idea.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = filterCategory === "all" || idea.category === filterCategory
      const matchesDifficulty = filterDifficulty === "all" || idea.difficulty === filterDifficulty

      return matchesSearch && matchesCategory && matchesDifficulty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.createdAt.getTime() - a.createdAt.getTime()
        case "oldest":
          return a.createdAt.getTime() - b.createdAt.getTime()
        case "engagement":
          return b.engagement - a.engagement
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const handleDeleteIdea = (ideaId: string) => {
    setIdeas(ideas.filter((idea) => idea.id !== ideaId))
  }

  const handleSaveIdea = (ideaId: string) => {
    const idea = ideas.find((i) => i.id === ideaId)
    if (idea) {
      const dashboardItem = {
        id: idea.id,
        title: idea.title,
        description: idea.description,
        category: idea.category,
        tags: idea.tags,
        createdAt: idea.createdAt,
        source: "ai-generator" as const,
      }
      addToSaved(dashboardItem)
    }
  }

  const handleMoveToProject = (ideaId: string, projectId: string) => {
    const idea = ideas.find((i) => i.id === ideaId)
    if (idea) {
      const dashboardItem = {
        id: idea.id,
        title: idea.title,
        description: idea.description,
        category: idea.category,
        tags: idea.tags,
        createdAt: idea.createdAt,
        source: "ai-generator" as const,
      }
      moveToProject(dashboardItem, projectId)
    }
  }

  const handleScheduleContent = (ideaId: string, date: Date) => {
    const idea = ideas.find((i) => i.id === ideaId)
    if (idea) {
      const dashboardItem = {
        id: idea.id,
        title: idea.title,
        description: idea.description,
        category: idea.category,
        tags: idea.tags,
        createdAt: idea.createdAt,
        source: "ai-generator" as const,
      }
      scheduleContent(dashboardItem, date)
    }
  }

  const handleShareIdea = (ideaId: string) => {
    shareWithTeam(ideaId)
  }

  const handleCopyIdea = (ideaId: string) => {
    const idea = ideas.find((i) => i.id === ideaId)
    if (idea) {
      navigator.clipboard.writeText(`${idea.title}\n\n${idea.description}`)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "Hard":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  if (ideas.length === 0) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="p-12 text-center">
          <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-serif font-semibold text-foreground mb-2">No Ideas Generated Yet</h3>
          <p className="text-muted-foreground">Use the AI Generator to create your first batch of content ideas.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-serif">Generated Ideas ({ideas.length})</CardTitle>
          <CardDescription>Manage and organize your AI-generated content ideas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search ideas, descriptions, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border focus:border-primary"
              />
            </div>

            <div className="flex gap-2">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-32 bg-input border-border">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Educational">Educational</SelectItem>
                  <SelectItem value="Practical">Practical</SelectItem>
                  <SelectItem value="Trending">Trending</SelectItem>
                  <SelectItem value="Case Study">Case Study</SelectItem>
                  <SelectItem value="Resources">Resources</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                <SelectTrigger className="w-32 bg-input border-border">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-input border-border">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedIdeas.map((idea) => (
          <Card key={idea.id} className="border-border bg-card hover:bg-card/80 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-serif text-balance leading-tight">{idea.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {idea.category}
                    </Badge>
                    <Badge className={`text-xs ${getDifficultyColor(idea.difficulty)}`}>{idea.difficulty}</Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleSaveIdea(idea.id)}>
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save to Collection
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMoveToProject(idea.id, "default")}>
                      <Target className="mr-2 h-4 w-4" />
                      Move to Project
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleScheduleContent(idea.id, new Date())}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Content
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCopyIdea(idea.id)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Content
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShareIdea(idea.id)}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share with Team
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteIdea(idea.id)} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-pretty">{idea.description}</p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{idea.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="h-3 w-3" />
                  <span>{idea.engagement}% engagement</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {idea.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    <Tag className="mr-1 h-2 w-2" />
                    {tag}
                  </Badge>
                ))}
                {idea.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{idea.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{idea.createdAt.toLocaleDateString()}</span>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleSaveIdea(idea.id)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Bookmark className="mr-1 h-3 w-3" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedIdeas.length === 0 && searchTerm && (
        <Card className="border-border bg-card">
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-serif font-semibold text-foreground mb-2">No Ideas Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
