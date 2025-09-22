"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FolderOpen,
  Search,
  Download,
  Star,
  Trash2,
  Edit,
  Copy,
  Grid3X3,
  List,
  FileText,
  Clock,
  TrendingUp,
} from "lucide-react"

interface SavedIdea {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  difficulty: string
  estimatedTime: string
  engagement: number
  createdAt: Date
  updatedAt: Date
  status: "draft" | "in-progress" | "completed" | "archived"
  isFavorite: boolean
  notes: string
  priority: "low" | "medium" | "high"
}

export function IdeaManagement() {
  const [ideas, setIdeas] = useState<SavedIdea[]>([])
  const [filteredIdeas, setFilteredIdeas] = useState<SavedIdea[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [sortBy, setSortBy] = useState("createdAt")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedIdeas, setSelectedIdeas] = useState<string[]>([])
  const [editingIdea, setEditingIdea] = useState<SavedIdea | null>(null)

  // Mock data - in real app this would come from API/database
  useEffect(() => {
    const mockIdeas: SavedIdea[] = [
      {
        id: "1",
        title: "AI in Healthcare: Complete Guide",
        description:
          "Comprehensive guide covering AI applications in healthcare, including diagnostics, treatment planning, and patient care.",
        category: "Educational",
        tags: ["ai", "healthcare", "guide", "technology"],
        difficulty: "Medium",
        estimatedTime: "15-20 min read",
        engagement: 85,
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-16"),
        status: "in-progress",
        isFavorite: true,
        notes: "Need to add more case studies and examples",
        priority: "high",
      },
      {
        id: "2",
        title: "Digital Marketing Mistakes to Avoid",
        description: "Common pitfalls in digital marketing and how to avoid them for better ROI.",
        category: "Practical",
        tags: ["marketing", "mistakes", "tips", "roi"],
        difficulty: "Easy",
        estimatedTime: "10-12 min read",
        engagement: 78,
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-10"),
        status: "completed",
        isFavorite: false,
        notes: "Published on blog, performed well",
        priority: "medium",
      },
      {
        id: "3",
        title: "Future of Remote Work",
        description: "Predictions and trends for remote work in 2025 and beyond.",
        category: "Trending",
        tags: ["remote work", "future", "trends", "workplace"],
        difficulty: "Hard",
        estimatedTime: "20-25 min read",
        engagement: 92,
        createdAt: new Date("2024-01-08"),
        updatedAt: new Date("2024-01-12"),
        status: "draft",
        isFavorite: true,
        notes: "Waiting for latest survey data",
        priority: "high",
      },
      {
        id: "4",
        title: "Productivity Tools Comparison",
        description: "In-depth comparison of popular productivity tools and their features.",
        category: "Resources",
        tags: ["productivity", "tools", "comparison", "review"],
        difficulty: "Medium",
        estimatedTime: "18-22 min read",
        engagement: 73,
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-05"),
        status: "archived",
        isFavorite: false,
        notes: "Outdated, needs refresh",
        priority: "low",
      },
    ]
    setIdeas(mockIdeas)
    setFilteredIdeas(mockIdeas)
  }, [])

  // Filter and search logic
  useEffect(() => {
    let filtered = ideas

    if (searchQuery) {
      filtered = filtered.filter(
        (idea) =>
          idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idea.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((idea) => idea.category === selectedCategory)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((idea) => idea.status === selectedStatus)
    }

    if (selectedPriority !== "all") {
      filtered = filtered.filter((idea) => idea.priority === selectedPriority)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "engagement":
          return b.engagement - a.engagement
        case "updatedAt":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    setFilteredIdeas(filtered)
  }, [ideas, searchQuery, selectedCategory, selectedStatus, selectedPriority, sortBy])

  const toggleFavorite = (id: string) => {
    setIdeas((prev) => prev.map((idea) => (idea.id === id ? { ...idea, isFavorite: !idea.isFavorite } : idea)))
  }

  const updateStatus = (id: string, status: SavedIdea["status"]) => {
    setIdeas((prev) => prev.map((idea) => (idea.id === id ? { ...idea, status, updatedAt: new Date() } : idea)))
  }

  const deleteIdea = (id: string) => {
    setIdeas((prev) => prev.filter((idea) => idea.id !== id))
    setSelectedIdeas((prev) => prev.filter((ideaId) => ideaId !== id))
  }

  const toggleSelectIdea = (id: string) => {
    setSelectedIdeas((prev) => (prev.includes(id) ? prev.filter((ideaId) => ideaId !== id) : [...prev, id]))
  }

  const exportIdeas = (format: "csv" | "json" | "pdf") => {
    // Mock export functionality
    console.log(`Exporting ${selectedIdeas.length || filteredIdeas.length} ideas as ${format}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "archived":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Idea Management</h1>
        <p className="text-muted-foreground">Organize, save, and export your content ideas</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Ideas</p>
                <p className="text-2xl font-bold">{ideas.length}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Favorites</p>
                <p className="text-2xl font-bold">{ideas.filter((i) => i.isFavorite).length}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{ideas.filter((i) => i.status === "in-progress").length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Engagement</p>
                <p className="text-2xl font-bold">
                  {Math.round(ideas.reduce((acc, i) => acc + i.engagement, 0) / ideas.length)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search ideas, tags, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Educational">Educational</SelectItem>
                  <SelectItem value="Practical">Practical</SelectItem>
                  <SelectItem value="Trending">Trending</SelectItem>
                  <SelectItem value="Resources">Resources</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Created</SelectItem>
                  <SelectItem value="updatedAt">Updated</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedIdeas.length > 0 && (
            <div className="flex items-center gap-2 mt-4 p-3 bg-muted rounded-md">
              <span className="text-sm text-muted-foreground">{selectedIdeas.length} selected</span>
              <Button size="sm" variant="outline" onClick={() => exportIdeas("csv")}>
                <Download className="h-4 w-4 mr-1" />
                Export CSV
              </Button>
              <Button size="sm" variant="outline" onClick={() => exportIdeas("json")}>
                <Download className="h-4 w-4 mr-1" />
                Export JSON
              </Button>
              <Button size="sm" variant="outline" onClick={() => setSelectedIdeas([])}>
                Clear Selection
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ideas Display */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
        {filteredIdeas.map((idea) => (
          <Card key={idea.id} className={`${viewMode === "list" ? "flex" : ""} hover:shadow-md transition-shadow`}>
            <CardContent className={`p-4 ${viewMode === "list" ? "flex-1 flex items-center gap-4" : ""}`}>
              <div
                className={`${viewMode === "list" ? "flex items-center gap-2" : "flex items-start justify-between mb-3"}`}
              >
                <Checkbox checked={selectedIdeas.includes(idea.id)} onCheckedChange={() => toggleSelectIdea(idea.id)} />
                {viewMode === "grid" && (
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => toggleFavorite(idea.id)} className="p-1 h-auto">
                      <Star className={`h-4 w-4 ${idea.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
                    </Button>
                    <Button size="sm" variant="ghost" className="p-1 h-auto">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="p-1 h-auto">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="p-1 h-auto text-red-500 hover:text-red-700"
                      onClick={() => deleteIdea(idea.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className={viewMode === "list" ? "flex-1" : ""}>
                <h3 className="font-semibold text-foreground mb-2">{idea.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{idea.description}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  <Badge variant="outline" className={getStatusColor(idea.status)}>
                    {idea.status}
                  </Badge>
                  <Badge variant="outline" className={getPriorityColor(idea.priority)}>
                    {idea.priority}
                  </Badge>
                  <Badge variant="outline">{idea.category}</Badge>
                  <Badge variant="outline">{idea.engagement}% engagement</Badge>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {idea.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {idea.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{idea.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{idea.estimatedTime}</span>
                  <span>{idea.createdAt.toLocaleDateString()}</span>
                </div>
              </div>

              {viewMode === "list" && (
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => toggleFavorite(idea.id)} className="p-1 h-auto">
                    <Star className={`h-4 w-4 ${idea.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  </Button>
                  <Button size="sm" variant="ghost" className="p-1 h-auto">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="p-1 h-auto">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="p-1 h-auto text-red-500 hover:text-red-700"
                    onClick={() => deleteIdea(idea.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIdeas.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No ideas found matching your criteria</p>
            <Button
              className="mt-4"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSelectedStatus("all")
                setSelectedPriority("all")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
