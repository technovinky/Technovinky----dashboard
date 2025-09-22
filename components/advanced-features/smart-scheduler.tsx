"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, TrendingUp, Zap, CheckCircle, AlertCircle } from "lucide-react"

interface ScheduledContent {
  id: string
  title: string
  platform: string
  scheduledTime: Date
  status: "scheduled" | "published" | "failed"
  engagement: {
    predicted: number
    actual?: number
  }
  audience: {
    size: number
    timezone: string
  }
}

interface OptimalTime {
  time: string
  day: string
  engagement: number
  audience: number
  confidence: number
}

export function SmartScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [scheduledContent, setScheduledContent] = useState<ScheduledContent[]>([
    {
      id: "1",
      title: "AI Tools for Productivity",
      platform: "LinkedIn",
      scheduledTime: new Date(2024, 1, 15, 9, 0),
      status: "scheduled",
      engagement: { predicted: 85 },
      audience: { size: 1250, timezone: "EST" },
    },
    {
      id: "2",
      title: "Remote Work Best Practices",
      platform: "Twitter",
      scheduledTime: new Date(2024, 1, 15, 14, 30),
      status: "published",
      engagement: { predicted: 72, actual: 78 },
      audience: { size: 890, timezone: "PST" },
    },
    {
      id: "3",
      title: "Digital Marketing Trends",
      platform: "Instagram",
      scheduledTime: new Date(2024, 1, 16, 11, 15),
      status: "scheduled",
      engagement: { predicted: 91 },
      audience: { size: 2100, timezone: "EST" },
    },
  ])

  const [optimalTimes, setOptimalTimes] = useState<OptimalTime[]>([
    { time: "9:00 AM", day: "Tuesday", engagement: 94, audience: 1850, confidence: 92 },
    { time: "2:30 PM", day: "Wednesday", engagement: 89, audience: 1650, confidence: 88 },
    { time: "11:15 AM", day: "Thursday", engagement: 87, audience: 1720, confidence: 85 },
    { time: "4:45 PM", day: "Friday", engagement: 82, audience: 1420, confidence: 79 },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "published":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Clock className="h-4 w-4" />
      case "published":
        return <CheckCircle className="h-4 w-4" />
      case "failed":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return "bg-blue-600"
      case "twitter":
        return "bg-sky-500"
      case "instagram":
        return "bg-pink-500"
      case "facebook":
        return "bg-blue-700"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Smart Scheduler</h1>
        <p className="text-muted-foreground">AI-powered content scheduling for optimal engagement</p>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule">Schedule Content</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Optimal Times */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  AI-Recommended Times
                </CardTitle>
                <CardDescription>Best times to post based on your audience data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimalTimes.map((time, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {time.day} at {time.time}
                          </div>
                          <div className="text-sm text-muted-foreground">{time.audience} active users</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{time.engagement}% engagement</div>
                        <div className="text-xs text-muted-foreground">{time.confidence}% confidence</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Schedule</CardTitle>
                <CardDescription>Schedule content for optimal times</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Content title" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose optimal time" />
                  </SelectTrigger>
                  <SelectContent>
                    {optimalTimes.map((time, index) => (
                      <SelectItem key={index} value={`${time.day}-${time.time}`}>
                        {time.day} at {time.time} ({time.engagement}% engagement)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="w-full">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Schedule Content
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Content Calendar</CardTitle>
                <CardDescription>View and manage your scheduled content</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scheduled Content</CardTitle>
                <CardDescription>Content scheduled for selected date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheduledContent
                    .filter(
                      (content) => selectedDate && content.scheduledTime.toDateString() === selectedDate.toDateString(),
                    )
                    .map((content) => (
                      <div key={content.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{content.title}</h4>
                          <Badge className={getStatusColor(content.status)}>
                            {getStatusIcon(content.status)}
                            <span className="ml-1">{content.status}</span>
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${getPlatformColor(content.platform)}`} />
                            {content.platform}
                          </div>
                          <span>{content.scheduledTime.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))}
                  {scheduledContent.filter(
                    (content) => selectedDate && content.scheduledTime.toDateString() === selectedDate.toDateString(),
                  ).length === 0 && (
                    <div className="text-center py-8">
                      <CalendarIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No content scheduled for this date</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Engagement</p>
                    <p className="text-2xl font-bold">84.2%</p>
                    <p className="text-xs text-green-600">+12.3% vs manual</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Optimal Hits</p>
                    <p className="text-2xl font-bold">92%</p>
                    <p className="text-xs text-green-600">AI accuracy</p>
                  </div>
                  <Zap className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Time Saved</p>
                    <p className="text-2xl font-bold">15.2h</p>
                    <p className="text-xs text-green-600">This month</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance by Platform</CardTitle>
              <CardDescription>Engagement rates across different platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { platform: "LinkedIn", engagement: 89, posts: 12, color: "bg-blue-600" },
                  { platform: "Instagram", engagement: 85, posts: 18, color: "bg-pink-500" },
                  { platform: "Twitter", engagement: 76, posts: 24, color: "bg-sky-500" },
                  { platform: "Facebook", engagement: 71, posts: 8, color: "bg-blue-700" },
                ].map((platform) => (
                  <div key={platform.platform} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                      <span className="font-medium">{platform.platform}</span>
                      <Badge variant="secondary">{platform.posts} posts</Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{platform.engagement}%</div>
                      <div className="text-xs text-muted-foreground">avg. engagement</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
