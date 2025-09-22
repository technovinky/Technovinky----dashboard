"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Hash, Globe, Calendar, ArrowUp, ArrowDown, Minus } from "lucide-react"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"

const trendData = [
  { month: "Jan", ai: 65, marketing: 45, productivity: 30, wellness: 25 },
  { month: "Feb", ai: 72, marketing: 48, productivity: 35, wellness: 28 },
  { month: "Mar", ai: 78, marketing: 52, productivity: 40, wellness: 32 },
  { month: "Apr", ai: 85, marketing: 55, productivity: 45, wellness: 35 },
  { month: "May", ai: 92, marketing: 58, productivity: 50, wellness: 38 },
  { month: "Jun", ai: 98, marketing: 62, productivity: 55, wellness: 42 },
]

const keywordData = [
  { keyword: "AI automation", volume: 125000, trend: "up", change: 15 },
  { keyword: "remote work", volume: 89000, trend: "down", change: -8 },
  { keyword: "digital marketing", volume: 156000, trend: "up", change: 12 },
  { keyword: "productivity apps", volume: 67000, trend: "stable", change: 2 },
  { keyword: "content creation", volume: 78000, trend: "up", change: 18 },
  { keyword: "social media strategy", volume: 94000, trend: "up", change: 9 },
]

const industryData = [
  { name: "Technology", value: 35, color: "#00ADB5" },
  { name: "Marketing", value: 25, color: "#FF4757" },
  { name: "Business", value: 20, color: "#FFD369" },
  { name: "Health", value: 12, color: "#4ECDC4" },
  { name: "Education", value: 8, color: "#1D1E22" },
]

const engagementData = [
  { platform: "LinkedIn", engagement: 85, posts: 1200 },
  { platform: "Twitter", engagement: 72, posts: 2400 },
  { platform: "Medium", engagement: 68, posts: 800 },
  { platform: "YouTube", engagement: 91, posts: 150 },
  { platform: "Instagram", engagement: 76, posts: 900 },
]

export default function TrendsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-primary animate-pulse-glow" />
            <h1 className="text-3xl font-serif font-bold text-foreground">Trend & Keyword Insights</h1>
          </div>
          <p className="text-muted-foreground">
            Analyze current trends, keyword performance, and content opportunities across different platforms and
            industries.
          </p>
        </div>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="trends">Trending Topics</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="industries">Industries</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            {/* Trend Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Hot Topics</p>
                      <p className="text-2xl font-bold text-foreground">23</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Growth</p>
                      <p className="text-2xl font-bold text-foreground">+12%</p>
                    </div>
                    <ArrowUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Peak Season</p>
                      <p className="text-2xl font-bold text-foreground">Q2</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Opportunities</p>
                      <p className="text-2xl font-bold text-foreground">156</p>
                    </div>
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trend Chart */}
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Topic Trend Analysis</CardTitle>
                <CardDescription>Search volume trends over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
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
                    <Line type="monotone" dataKey="ai" stroke="#00ADB5" strokeWidth={2} name="AI & Automation" />
                    <Line
                      type="monotone"
                      dataKey="marketing"
                      stroke="#FF4757"
                      strokeWidth={2}
                      name="Digital Marketing"
                    />
                    <Line type="monotone" dataKey="productivity" stroke="#FFD369" strokeWidth={2} name="Productivity" />
                    <Line type="monotone" dataKey="wellness" stroke="#4ECDC4" strokeWidth={2} name="Wellness" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keywords" className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Keyword Performance</CardTitle>
                <CardDescription>Top performing keywords and their search volume trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keywordData.map((keyword, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border"
                    >
                      <div className="flex items-center space-x-3">
                        <Hash className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{keyword.keyword}</p>
                          <p className="text-sm text-muted-foreground">
                            {keyword.volume.toLocaleString()} searches/month
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            keyword.trend === "up" ? "default" : keyword.trend === "down" ? "destructive" : "secondary"
                          }
                          className="flex items-center space-x-1"
                        >
                          {keyword.trend === "up" ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : keyword.trend === "down" ? (
                            <ArrowDown className="h-3 w-3" />
                          ) : (
                            <Minus className="h-3 w-3" />
                          )}
                          <span>{Math.abs(keyword.change)}%</span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="industries" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Industry Distribution</CardTitle>
                  <CardDescription>Content opportunities by industry sector</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={industryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {industryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#393E46",
                          border: "1px solid #00ADB5",
                          borderRadius: "8px",
                          color: "#EEEEEE",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Industry Insights</CardTitle>
                  <CardDescription>Key trends and opportunities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {industryData.map((industry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: industry.color }} />
                        <span className="font-medium text-foreground">{industry.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{industry.value}%</p>
                        <p className="text-xs text-muted-foreground">Market share</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Platform Performance</CardTitle>
                <CardDescription>Engagement rates and content volume across platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#393E46" />
                    <XAxis dataKey="platform" stroke="#EEEEEE" />
                    <YAxis stroke="#EEEEEE" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#393E46",
                        border: "1px solid #00ADB5",
                        borderRadius: "8px",
                        color: "#EEEEEE",
                      }}
                    />
                    <Bar dataKey="engagement" fill="#00ADB5" name="Engagement Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {engagementData.map((platform, index) => (
                <Card key={index} className="border-border bg-card">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-serif font-semibold text-foreground">{platform.platform}</h3>
                        <Badge variant="outline">{platform.engagement}%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{platform.posts.toLocaleString()} posts analyzed</p>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${platform.engagement}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
