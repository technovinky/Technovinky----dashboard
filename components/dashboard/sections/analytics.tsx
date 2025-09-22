"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Eye, Heart, Share2, Clock, Globe, Smartphone } from "lucide-react"

interface AnalyticsData {
  overview: {
    totalViews: number
    totalEngagement: number
    totalShares: number
    totalComments: number
    avgReadTime: string
    bounceRate: number
    conversionRate: number
    growthRate: number
  }
  timeSeriesData: Array<{
    date: string
    views: number
    engagement: number
    shares: number
    comments: number
  }>
  contentPerformance: Array<{
    title: string
    views: number
    engagement: number
    shares: number
    category: string
    publishDate: string
  }>
  audienceData: Array<{
    demographic: string
    percentage: number
    color: string
  }>
  deviceData: Array<{
    device: string
    users: number
    percentage: number
  }>
  topKeywords: Array<{
    keyword: string
    impressions: number
    clicks: number
    ctr: number
  }>
}

export function Analytics() {
  const [timeRange, setTimeRange] = useState("30d")
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)

  useEffect(() => {
    // Mock analytics data - in real app this would come from API
    const mockData: AnalyticsData = {
      overview: {
        totalViews: 45672,
        totalEngagement: 3421,
        totalShares: 892,
        totalComments: 234,
        avgReadTime: "4:32",
        bounceRate: 32.5,
        conversionRate: 8.7,
        growthRate: 15.3,
      },
      timeSeriesData: [
        { date: "Jan 1", views: 1200, engagement: 89, shares: 23, comments: 12 },
        { date: "Jan 8", views: 1450, engagement: 102, shares: 31, comments: 18 },
        { date: "Jan 15", views: 1680, engagement: 125, shares: 28, comments: 15 },
        { date: "Jan 22", views: 1890, engagement: 143, shares: 35, comments: 22 },
        { date: "Jan 29", views: 2100, engagement: 167, shares: 42, comments: 28 },
        { date: "Feb 5", views: 1950, engagement: 134, shares: 38, comments: 19 },
        { date: "Feb 12", views: 2250, engagement: 189, shares: 45, comments: 31 },
      ],
      contentPerformance: [
        {
          title: "AI in Healthcare Guide",
          views: 8934,
          engagement: 567,
          shares: 123,
          category: "Educational",
          publishDate: "2024-01-15",
        },
        {
          title: "Digital Marketing Mistakes",
          views: 6721,
          engagement: 423,
          shares: 89,
          category: "Practical",
          publishDate: "2024-01-10",
        },
        {
          title: "Future of Remote Work",
          views: 9876,
          engagement: 678,
          shares: 156,
          category: "Trending",
          publishDate: "2024-01-08",
        },
        {
          title: "Productivity Tools Review",
          views: 5432,
          engagement: 321,
          shares: 67,
          category: "Resources",
          publishDate: "2024-01-05",
        },
        {
          title: "Startup Success Stories",
          views: 7654,
          engagement: 489,
          shares: 98,
          category: "Case Study",
          publishDate: "2024-01-03",
        },
      ],
      audienceData: [
        { demographic: "25-34", percentage: 35, color: "#8884d8" },
        { demographic: "35-44", percentage: 28, color: "#82ca9d" },
        { demographic: "18-24", percentage: 20, color: "#ffc658" },
        { demographic: "45-54", percentage: 12, color: "#ff7300" },
        { demographic: "55+", percentage: 5, color: "#00ff00" },
      ],
      deviceData: [
        { device: "Desktop", users: 18500, percentage: 62 },
        { device: "Mobile", users: 9200, percentage: 31 },
        { device: "Tablet", users: 2100, percentage: 7 },
      ],
      topKeywords: [
        { keyword: "artificial intelligence", impressions: 12500, clicks: 890, ctr: 7.1 },
        { keyword: "digital marketing", impressions: 9800, clicks: 654, ctr: 6.7 },
        { keyword: "remote work", impressions: 8900, clicks: 567, ctr: 6.4 },
        { keyword: "productivity tools", impressions: 7600, clicks: 432, ctr: 5.7 },
        { keyword: "startup guide", impressions: 6400, clicks: 321, ctr: 5.0 },
      ],
    }
    setAnalyticsData(mockData)
  }, [timeRange])

  if (!analyticsData) {
    return <div>Loading analytics...</div>
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track performance and insights for your content</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{formatNumber(analyticsData.overview.totalViews)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+{analyticsData.overview.growthRate}%</span>
                </div>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Engagement</p>
                <p className="text-2xl font-bold">{formatNumber(analyticsData.overview.totalEngagement)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+12.3%</span>
                </div>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Shares</p>
                <p className="text-2xl font-bold">{formatNumber(analyticsData.overview.totalShares)}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+8.7%</span>
                </div>
              </div>
              <Share2 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Read Time</p>
                <p className="text-2xl font-bold">{analyticsData.overview.avgReadTime}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+5.2%</span>
                </div>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Traffic Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Trends</CardTitle>
                <CardDescription>Views and engagement over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData.timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="engagement"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Engagement Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Breakdown</CardTitle>
                <CardDescription>Shares and comments over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsData.timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="shares" stroke="#ffc658" strokeWidth={2} />
                    <Line type="monotone" dataKey="comments" stroke="#ff7300" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Bounce Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{analyticsData.overview.bounceRate}%</span>
                    <Badge variant="secondary" className="text-green-600">
                      Good
                    </Badge>
                  </div>
                  <Progress value={analyticsData.overview.bounceRate} className="h-2" />
                  <p className="text-xs text-muted-foreground">Lower is better</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{analyticsData.overview.conversionRate}%</span>
                    <Badge variant="secondary" className="text-green-600">
                      Excellent
                    </Badge>
                  </div>
                  <Progress value={analyticsData.overview.conversionRate * 10} className="h-2" />
                  <p className="text-xs text-muted-foreground">Industry avg: 2.3%</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Growth Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">+{analyticsData.overview.growthRate}%</span>
                    <Badge variant="secondary" className="text-green-600">
                      Strong
                    </Badge>
                  </div>
                  <Progress value={analyticsData.overview.growthRate * 5} className="h-2" />
                  <p className="text-xs text-muted-foreground">Month over month</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>Your best performing articles and posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.contentPerformance.map((content, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{content.title}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {formatNumber(content.views)} views
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          {content.engagement} engagements
                        </span>
                        <span className="flex items-center">
                          <Share2 className="h-4 w-4 mr-1" />
                          {content.shares} shares
                        </span>
                        <Badge variant="outline">{content.category}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{index + 1}</div>
                      <div className="text-xs text-muted-foreground">{content.publishDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Age Demographics</CardTitle>
                <CardDescription>Audience breakdown by age group</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.audienceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ demographic, percentage }) => `${demographic}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {analyticsData.audienceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>How users access your content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.deviceData.map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {device.device === "Desktop" && <Globe className="h-5 w-5 text-blue-500" />}
                        {device.device === "Mobile" && <Smartphone className="h-5 w-5 text-green-500" />}
                        {device.device === "Tablet" && <Smartphone className="h-5 w-5 text-orange-500" />}
                        <span className="font-medium">{device.device}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24">
                          <Progress value={device.percentage} className="h-2" />
                        </div>
                        <span className="text-sm font-medium w-12">{device.percentage}%</span>
                        <span className="text-sm text-muted-foreground w-16">{formatNumber(device.users)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Keywords</CardTitle>
              <CardDescription>Keywords driving traffic to your content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topKeywords.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{keyword.keyword}</h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{formatNumber(keyword.impressions)} impressions</span>
                        <span>{formatNumber(keyword.clicks)} clicks</span>
                        <span>{keyword.ctr}% CTR</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">#{index + 1}</div>
                      <Badge variant={keyword.ctr > 6 ? "default" : "secondary"}>
                        {keyword.ctr > 6 ? "High CTR" : "Average"}
                      </Badge>
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
