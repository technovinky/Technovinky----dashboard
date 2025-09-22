"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Eye, Heart, MessageCircle, Share, Calendar, Target } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts"

const performanceData = [
  { month: "Jan", views: 12500, engagement: 8.5, shares: 450, comments: 230 },
  { month: "Feb", views: 15200, engagement: 9.2, shares: 520, comments: 280 },
  { month: "Mar", views: 18900, engagement: 10.1, shares: 680, comments: 340 },
  { month: "Apr", views: 22100, engagement: 11.3, shares: 750, comments: 420 },
  { month: "May", views: 25800, engagement: 12.8, shares: 890, comments: 510 },
  { month: "Jun", views: 28400, engagement: 13.5, shares: 960, comments: 580 },
]

const contentTypeData = [
  { type: "Blog Posts", performance: 85, count: 24 },
  { type: "Social Media", performance: 72, count: 156 },
  { type: "Videos", performance: 91, count: 8 },
  { type: "Infographics", performance: 78, count: 12 },
  { type: "Tutorials", performance: 88, count: 16 },
]

const topPerformingContent = [
  {
    title: "10 AI Tools That Will Transform Your Workflow",
    type: "Blog Post",
    views: 15400,
    engagement: 18.5,
    shares: 340,
    publishDate: "2024-01-15",
  },
  {
    title: "The Future of Remote Work in 2024",
    type: "Video",
    views: 12800,
    engagement: 22.1,
    shares: 280,
    publishDate: "2024-01-20",
  },
  {
    title: "Productivity Hacks for Entrepreneurs",
    type: "Infographic",
    views: 9600,
    engagement: 16.3,
    shares: 195,
    publishDate: "2024-01-25",
  },
]

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-primary animate-pulse-glow" />
              <h1 className="text-3xl font-serif font-bold text-foreground">Analytics & Performance</h1>
            </div>
            <Select defaultValue="30">
              <SelectTrigger className="w-32 bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-muted-foreground">
            Track your content performance, engagement metrics, and audience insights to optimize your strategy.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold text-foreground">142.8K</p>
                  <p className="text-xs text-primary flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5% from last month
                  </p>
                </div>
                <Eye className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Engagement</p>
                  <p className="text-2xl font-bold text-foreground">11.2%</p>
                  <p className="text-xs text-primary flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2.1% from last month
                  </p>
                </div>
                <Heart className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Shares</p>
                  <p className="text-2xl font-bold text-foreground">4.2K</p>
                  <p className="text-xs text-primary flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +18.3% from last month
                  </p>
                </div>
                <Share className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Comments</p>
                  <p className="text-2xl font-bold text-foreground">1.8K</p>
                  <p className="text-xs text-primary flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8.7% from last month
                  </p>
                </div>
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content Types</TabsTrigger>
            <TabsTrigger value="performance">Top Performing</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Performance Chart */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Performance Overview</CardTitle>
                <CardDescription>Views, engagement, and interaction metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#393E46" />
                    <XAxis dataKey="month" stroke="#EEEEEE" />
                    <YAxis stroke="#EEEEEE" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#393E46",
                        border: "1px solid #00ADB5",
                        borderRadius: "8px",
                        color: "#EEEEEE",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stackId="1"
                      stroke="#00ADB5"
                      fill="#00ADB5"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="shares"
                      stackId="2"
                      stroke="#FF4757"
                      fill="#FF4757"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Engagement Trends */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Engagement Trends</CardTitle>
                <CardDescription>Engagement rate and comments over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#393E46" />
                    <XAxis dataKey="month" stroke="#EEEEEE" />
                    <YAxis stroke="#EEEEEE" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#393E46",
                        border: "1px solid #00ADB5",
                        borderRadius: "8px",
                        color: "#EEEEEE",
                      }}
                    />
                    <Line type="monotone" dataKey="engagement" stroke="#00ADB5" strokeWidth={2} name="Engagement %" />
                    <Line type="monotone" dataKey="comments" stroke="#FFD369" strokeWidth={2} name="Comments" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Content Type Performance</CardTitle>
                  <CardDescription>Performance scores by content type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={contentTypeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#393E46" />
                      <XAxis dataKey="type" stroke="#EEEEEE" />
                      <YAxis stroke="#EEEEEE" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#393E46",
                          border: "1px solid #00ADB5",
                          borderRadius: "8px",
                          color: "#EEEEEE",
                        }}
                      />
                      <Bar dataKey="performance" fill="#00ADB5" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Content Distribution</CardTitle>
                  <CardDescription>Number of pieces by content type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contentTypeData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border"
                    >
                      <div className="flex items-center space-x-3">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="font-medium text-foreground">{item.type}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{item.count} pieces</Badge>
                        <Badge
                          variant={item.performance > 85 ? "default" : item.performance > 75 ? "secondary" : "outline"}
                        >
                          {item.performance}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Top Performing Content</CardTitle>
                <CardDescription>Your best performing content pieces this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformingContent.map((content, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/20 border border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-serif font-semibold text-foreground text-balance">{content.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{content.type}</Badge>
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(content.publishDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="default" className="ml-4">
                          #{index + 1}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-muted-foreground">Views</p>
                          <p className="font-semibold text-foreground">{content.views.toLocaleString()}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Engagement</p>
                          <p className="font-semibold text-primary">{content.engagement}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Shares</p>
                          <p className="font-semibold text-foreground">{content.shares}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Audience Growth</CardTitle>
                  <CardDescription>Follower growth across platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border">
                    <span className="font-medium text-foreground">LinkedIn</span>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">12.4K</p>
                      <p className="text-xs text-primary">+8.2%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border">
                    <span className="font-medium text-foreground">Twitter</span>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">8.9K</p>
                      <p className="text-xs text-primary">+12.1%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border">
                    <span className="font-medium text-foreground">Medium</span>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">5.2K</p>
                      <p className="text-xs text-primary">+6.8%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Engagement Insights</CardTitle>
                  <CardDescription>Key audience engagement metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Average Session</span>
                      <span className="font-medium text-foreground">4m 32s</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-3/4" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Return Visitors</span>
                      <span className="font-medium text-foreground">68%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-2/3" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Content Completion</span>
                      <span className="font-medium text-foreground">82%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-4/5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
