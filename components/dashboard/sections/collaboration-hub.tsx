"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageCircle,
  Plus,
  Clock,
  CheckCircle,
  Star,
  UserPlus,
  Calendar,
  Video,
  FileText,
  Lightbulb,
  Zap,
} from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  avatar: string
  role: "admin" | "editor" | "contributor"
  status: "online" | "offline" | "away"
  lastActive: Date
}

interface Project {
  id: string
  title: string
  description: string
  status: "active" | "completed" | "on-hold"
  priority: "high" | "medium" | "low"
  dueDate: Date
  members: string[]
  progress: number
  createdAt: Date
}

interface Comment {
  id: string
  author: TeamMember
  content: string
  timestamp: Date
  replies?: Comment[]
}

interface BrainstormSession {
  id: string
  title: string
  description: string
  host: TeamMember
  participants: TeamMember[]
  status: "scheduled" | "active" | "completed"
  scheduledTime: Date
  ideas: Array<{
    id: string
    content: string
    author: TeamMember
    votes: number
    timestamp: Date
  }>
}

export function CollaborationHub() {
  const [activeTab, setActiveTab] = useState("projects")
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [brainstormSessions, setBrainstormSessions] = useState<BrainstormSession[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    // Mock data - in real app this would come from API
    const mockTeamMembers: TeamMember[] = [
      {
        id: "1",
        name: "Sarah Johnson",
        email: "sarah@company.com",
        avatar: "/diverse-woman-portrait.png",
        role: "admin",
        status: "online",
        lastActive: new Date(),
      },
      {
        id: "2",
        name: "Mike Chen",
        email: "mike@company.com",
        avatar: "/thoughtful-man.png",
        role: "editor",
        status: "online",
        lastActive: new Date(),
      },
      {
        id: "3",
        name: "Emily Davis",
        email: "emily@company.com",
        avatar: "/diverse-woman-portrait.png",
        role: "contributor",
        status: "away",
        lastActive: new Date(Date.now() - 30 * 60 * 1000),
      },
      {
        id: "4",
        name: "Alex Rodriguez",
        email: "alex@company.com",
        avatar: "/thoughtful-man.png",
        role: "editor",
        status: "offline",
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
    ]

    const mockProjects: Project[] = [
      {
        id: "1",
        title: "Q1 Content Strategy",
        description:
          "Develop comprehensive content strategy for Q1 2024 including blog posts, social media, and video content.",
        status: "active",
        priority: "high",
        dueDate: new Date("2024-03-31"),
        members: ["1", "2", "3"],
        progress: 65,
        createdAt: new Date("2024-01-01"),
      },
      {
        id: "2",
        title: "AI Tools Review Series",
        description: "Create a series of in-depth reviews of popular AI tools for content creators.",
        status: "active",
        priority: "medium",
        dueDate: new Date("2024-02-28"),
        members: ["2", "4"],
        progress: 30,
        createdAt: new Date("2024-01-15"),
      },
      {
        id: "3",
        title: "Brand Guidelines Update",
        description: "Update brand guidelines and style guide for consistent content creation.",
        status: "completed",
        priority: "medium",
        dueDate: new Date("2024-01-31"),
        members: ["1", "3"],
        progress: 100,
        createdAt: new Date("2024-01-05"),
      },
    ]

    const mockBrainstormSessions: BrainstormSession[] = [
      {
        id: "1",
        title: "Valentine's Day Campaign Ideas",
        description: "Brainstorm creative ideas for Valentine's Day marketing campaign",
        host: mockTeamMembers[0],
        participants: [mockTeamMembers[1], mockTeamMembers[2]],
        status: "scheduled",
        scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        ideas: [],
      },
      {
        id: "2",
        title: "Video Content Formats",
        description: "Explore new video content formats for social media",
        host: mockTeamMembers[1],
        participants: [mockTeamMembers[0], mockTeamMembers[3]],
        status: "completed",
        scheduledTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
        ideas: [
          {
            id: "1",
            content: "Behind-the-scenes content creation process",
            author: mockTeamMembers[0],
            votes: 8,
            timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
          },
          {
            id: "2",
            content: "Quick tip videos (60 seconds or less)",
            author: mockTeamMembers[1],
            votes: 12,
            timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
          },
          {
            id: "3",
            content: "Interactive Q&A sessions with audience",
            author: mockTeamMembers[3],
            votes: 6,
            timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000),
          },
        ],
      },
    ]

    setTeamMembers(mockTeamMembers)
    setProjects(mockProjects)
    setBrainstormSessions(mockBrainstormSessions)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "on-hold":
        return "bg-yellow-100 text-yellow-800"
      case "scheduled":
        return "bg-purple-100 text-purple-800"
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <div className="w-2 h-2 bg-green-500 rounded-full" />
      case "away":
        return <div className="w-2 h-2 bg-yellow-500 rounded-full" />
      case "offline":
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Collaboration Hub</h1>
          <p className="text-muted-foreground">Team brainstorming and collaborative content creation</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>Start a new collaborative project with your team</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Project title" />
                <Textarea placeholder="Project description" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full">Create Project</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Member
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="brainstorm">Brainstorm</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                        <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {project.members.slice(0, 3).map((memberId) => {
                            const member = teamMembers.find((m) => m.id === memberId)
                            return member ? (
                              <Avatar key={member.id} className="w-6 h-6 border-2 border-background">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            ) : null
                          })}
                          {project.members.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                              +{project.members.length - 3}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {project.dueDate.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedProject && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{selectedProject.title}</CardTitle>
                  <CardDescription>Project Details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground">{selectedProject.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Team Members</h4>
                    <div className="space-y-2">
                      {selectedProject.members.map((memberId) => {
                        const member = teamMembers.find((m) => m.id === memberId)
                        return member ? (
                          <div key={member.id} className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{member.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {member.role}
                            </Badge>
                          </div>
                        ) : null
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button size="sm" className="w-full justify-start">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Start Discussion
                      </Button>
                      <Button size="sm" variant="outline" className="w-full justify-start bg-transparent">
                        <Video className="h-4 w-4 mr-2" />
                        Schedule Meeting
                      </Button>
                      <Button size="sm" variant="outline" className="w-full justify-start bg-transparent">
                        <FileText className="h-4 w-4 mr-2" />
                        View Documents
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="brainstorm" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Brainstorm Sessions</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Brainstorm Session</DialogTitle>
                      <DialogDescription>Schedule a collaborative brainstorming session</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input placeholder="Session title" />
                      <Textarea placeholder="Session description" />
                      <Input type="datetime-local" />
                      <Button className="w-full">Schedule Session</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {brainstormSessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{session.title}</h4>
                        <p className="text-sm text-muted-foreground">{session.description}</p>
                      </div>
                      <Badge className={getStatusColor(session.status)}>{session.status}</Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src={session.host.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {session.host.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>Hosted by {session.host.name}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {session.scheduledTime.toLocaleString()}
                      </div>
                    </div>

                    {session.ideas.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Ideas Generated</span>
                          <Badge variant="secondary">{session.ideas.length}</Badge>
                        </div>
                        <div className="space-y-1">
                          {session.ideas.slice(0, 2).map((idea) => (
                            <div
                              key={idea.id}
                              className="text-sm text-muted-foreground flex items-center justify-between"
                            >
                              <span className="truncate">{idea.content}</span>
                              <div className="flex items-center gap-1 ml-2">
                                <Star className="h-3 w-3" />
                                <span>{idea.votes}</span>
                              </div>
                            </div>
                          ))}
                          {session.ideas.length > 2 && (
                            <div className="text-xs text-muted-foreground">+{session.ideas.length - 2} more ideas</div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Live Brainstorm</CardTitle>
                <CardDescription>Join an active brainstorming session</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No active sessions right now</p>
                  <Button>
                    <Zap className="h-4 w-4 mr-2" />
                    Start Quick Brainstorm
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1">{getStatusIcon(member.status)}</div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{member.role}</Badge>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="p-1 h-auto">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="p-1 h-auto">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-muted-foreground">
                    Last active: {member.status === "online" ? "Now" : member.lastActive.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your team</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {[
                    {
                      user: "Sarah Johnson",
                      action: "created a new project",
                      target: "Q1 Content Strategy",
                      time: "2 hours ago",
                      icon: Plus,
                    },
                    {
                      user: "Mike Chen",
                      action: "completed task",
                      target: "AI Tools Research",
                      time: "4 hours ago",
                      icon: CheckCircle,
                    },
                    {
                      user: "Emily Davis",
                      action: "added comment to",
                      target: "Brand Guidelines Update",
                      time: "6 hours ago",
                      icon: MessageCircle,
                    },
                    {
                      user: "Alex Rodriguez",
                      action: "scheduled brainstorm",
                      target: "Video Content Formats",
                      time: "1 day ago",
                      icon: Calendar,
                    },
                    {
                      user: "Sarah Johnson",
                      action: "invited new member",
                      target: "Team Collaboration",
                      time: "2 days ago",
                      icon: UserPlus,
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <activity.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
