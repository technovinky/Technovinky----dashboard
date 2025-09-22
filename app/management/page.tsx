"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Bookmark,
  Search,
  Download,
  Share2,
  MoreVertical,
  Calendar,
  Clock,
  Tag,
  FolderPlus,
  Archive,
  Star,
  Copy,
  Trash2,
  Edit,
} from "lucide-react"

interface SavedIdea {
  id: string
  title: string
  description: string
  category: string
  status: "Draft" | "In Progress" | "Published" | "Archived"
  priority: "Low" | "Medium" | "High"
  tags: string[]
  createdAt: Date
  updatedAt: Date
  scheduledDate?: Date
  notes?: string
}

const mockSavedIdeas: SavedIdea[] = [
  {
    id: "1",
    title: "10 AI Tools That Will Transform Your Workflow",
    description: "Comprehensive guide to the most impactful AI productivity tools for professionals.",
    category: "Technology",
    status: "In Progress",
    priority: "High",
    tags: ["AI", "productivity", "tools", "workflow"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    scheduledDate: new Date("2024-02-01"),
    notes: "Need to add more screenshots and user testimonials",
  },
  {
    id: "2",
    title: "The Psychology Behind Viral Content",
    description: "Analyzing what makes content shareable and how to apply these principles.",
    category: "Marketing",
    status: "Draft",
    priority: "Medium",
    tags: ["psychology", "viral", "content", "social media"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "3",
    title: "Remote Work Setup: Complete Guide",
    description: "Everything you need to create the perfect remote work environment.",
    category: "Lifestyle",
    status: "Published",
    priority: "Low",
    tags: ["remote work", "setup", "productivity", "home office"],
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-25"),
  },
]

export default function ManagementPage() {
  const [ideas, setIdeas] = useState<SavedIdea[]>(mockSavedIdeas)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [selectedIdeas, setSelectedIdeas] = useState<string[]>([])

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = filterStatus === "all" || idea.status === filterStatus
    const matchesPriority = filterPriority === "all" || idea.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleDeleteIdea = (ideaId: string) => {
    setIdeas(ideas.filter((idea) => idea.id !== ideaId))
    setSelectedIdeas(selectedIdeas.filter((id) => id !== ideaId))
  }

  const handleBulkAction = (action: string) => {
    switch (action) {
      case "delete":
        setIdeas(ideas.filter((idea) => !selectedIdeas.includes(idea.id)))
        setSelectedIdeas([])
        break
      case "archive":
        setIdeas(
          ideas.map((idea) => (selectedIdeas.includes(idea.id) ? { ...idea, status: "Archived" as const } : idea)),
        )
        setSelectedIdeas([])
        break
      default:
        break
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "secondary"
      case "In Progress":
        return "default"
      case "Published":
        return "outline"
      case "Archived":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Bookmark className="h-6 w-6 text-primary animate-pulse-glow" />
            <h1 className="text-3xl font-serif font-bold text-foreground">Idea Management</h1>
          </div>
          <p className="text-muted-foreground">
            Organize, track, and manage your content ideas from conception to publication.
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="all">All Ideas ({ideas.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({ideas.filter((i) => i.status !== "Archived").length})</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled ({ideas.filter((i) => i.scheduledDate).length})</TabsTrigger>
            <TabsTrigger value="archived">Archived ({ideas.filter((i) => i.status === "Archived").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Controls */}
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-serif">Manage Your Content Ideas</CardTitle>
                    <CardDescription>Search, filter, and organize your saved ideas</CardDescription>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <FolderPlus className="mr-2 h-4 w-4" />
                    New Collection
                  </Button>
                </div>
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
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-32 bg-input border-border">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterPriority} onValueChange={setFilterPriority}>
                      <SelectTrigger className="w-32 bg-input border-border">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priority</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" className="border-border bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                {selectedIdeas.length > 0 && (
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <span className="text-sm text-foreground">{selectedIdeas.length} ideas selected</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleBulkAction("archive")}>
                        <Archive className="h-3 w-3 mr-1" />
                        Archive
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleBulkAction("delete")}>
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ideas List */}
            <div className="space-y-4">
              {filteredIdeas.map((idea) => (
                <Card key={idea.id} className="border-border bg-card hover:bg-card/80 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedIdeas.includes(idea.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIdeas([...selectedIdeas, idea.id])
                          } else {
                            setSelectedIdeas(selectedIdeas.filter((id) => id !== idea.id))
                          }
                        }}
                        className="mt-1"
                      />

                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-serif font-semibold text-foreground text-balance">
                              {idea.title}
                            </h3>
                            <p className="text-sm text-muted-foreground text-pretty mt-1">{idea.description}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Star className="mr-2 h-4 w-4" />
                                Add to Favorites
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteIdea(idea.id)} className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={getStatusColor(idea.status)}>{idea.status}</Badge>
                          <Badge variant={getPriorityColor(idea.priority)}>{idea.priority}</Badge>
                          <Badge variant="outline">{idea.category}</Badge>
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

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>Created {idea.createdAt.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>Updated {idea.updatedAt.toLocaleDateString()}</span>
                            </div>
                          </div>
                          {idea.scheduledDate && (
                            <div className="flex items-center space-x-1 text-primary">
                              <Calendar className="h-3 w-3" />
                              <span>Scheduled for {idea.scheduledDate.toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>

                        {idea.notes && (
                          <div className="p-3 bg-muted/20 rounded-lg border border-border">
                            <p className="text-sm text-muted-foreground italic">"{idea.notes}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <Card className="border-border bg-card">
              <CardContent className="p-12 text-center">
                <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Active Ideas</h3>
                <p className="text-muted-foreground">Ideas currently in draft or in progress status.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled">
            <Card className="border-border bg-card">
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Scheduled Content</h3>
                <p className="text-muted-foreground">Ideas with planned publication dates.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archived">
            <Card className="border-border bg-card">
              <CardContent className="p-12 text-center">
                <Archive className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Archived Ideas</h3>
                <p className="text-muted-foreground">Ideas that have been archived or completed.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
