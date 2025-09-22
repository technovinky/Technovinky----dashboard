"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Sparkles,
  TrendingUp,
  Bookmark,
  BarChart3,
  ArrowRight,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useDashboard } from "@/contexts/dashboard-context";
import { NotificationToast } from "@/components/ui/notification-toast";
import { QuickActions } from "@/components/dashboard/quick-actions";

// Import Dialog
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const quickStats = [
  { label: "Ideas Generated", value: "142", change: "+12%", icon: Brain },
  { label: "Content Published", value: "28", change: "+8%", icon: Sparkles },
  {
    label: "Avg. Engagement",
    value: "11.2%",
    change: "+2.1%",
    icon: TrendingUp,
  },
  { label: "Total Views", value: "45.2K", change: "+18%", icon: BarChart3 },
];

const recentActivity = [
  {
    action: "Generated 5 new AI content ideas",
    time: "2 hours ago",
    type: "generation",
  },
  {
    action: "Published 'AI Tools for Productivity'",
    time: "1 day ago",
    type: "publish",
  },
  {
    action: "Analyzed trending keywords",
    time: "2 days ago",
    type: "analysis",
  },
  {
    action: "Collaborated on content strategy",
    time: "3 days ago",
    type: "collaboration",
  },
];

const quickActions = [
  {
    title: "Generate Ideas",
    description: "Create new content ideas with AI",
    href: "/generator",
    icon: Brain,
    color: "bg-blue-500",
  },
  {
    title: "Explore Angles",
    description: "Discover unique content perspectives",
    href: "/angles",
    icon: Sparkles,
    color: "bg-purple-500",
  },
  {
    title: "View Trends",
    description: "Analyze current market trends",
    href: "/trends",
    icon: TrendingUp,
    color: "bg-green-500",
  },
  {
    title: "Manage Ideas",
    description: "Organize your content pipeline",
    href: "/management",
    icon: Bookmark,
    color: "bg-orange-500",
  },
];

export default function DashboardPage() {
  const { savedItems, addNotification } = useDashboard();

  const handleAISuggestion = () => {
    addNotification(
      "AI suggestion generated! Check the Generator section.",
      "success"
    );
  };

  return (
    <DashboardLayout>
      <NotificationToast />

      <div className='space-y-8'>
        {/* Welcome Header + Settings Dialog */}
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h1 className='text-3xl font-serif font-bold text-foreground'>
              Welcome back!
            </h1>
            <p className='text-muted-foreground'>
              Here's what's happening with your content strategy today.
            </p>
          </div>

          {/* Settings Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button size='sm'>Settings</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
                <DialogDescription>
                  Update your dashboard preferences here.
                </DialogDescription>
              </DialogHeader>
              <div className='mt-4 space-y-4'>
                <label className='block'>
                  <span className='text-sm font-medium'>Username</span>
                  <input
                    type='text'
                    placeholder='Enter username'
                    className='mt-1 block w-full rounded border p-2'
                  />
                </label>
                <label className='block'>
                  <span className='text-sm font-medium'>Email</span>
                  <input
                    type='email'
                    placeholder='Enter email'
                    className='mt-1 block w-full rounded border p-2'
                  />
                </label>
              </div>
              <div className='mt-6 flex justify-end gap-2'>
                <DialogClose asChild>
                  <Button variant='outline'>Cancel</Button>
                </DialogClose>
                <Button>Save</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Stats */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className='border-border bg-card'>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm text-muted-foreground'>
                        {stat.label}
                      </p>
                      <p className='text-2xl font-bold text-foreground'>
                        {stat.value}
                      </p>
                      <p className='text-xs text-primary flex items-center mt-1'>
                        <TrendingUp className='h-3 w-3 mr-1' />
                        {stat.change} from last month
                      </p>
                    </div>
                    <Icon className='h-8 w-8 text-primary' />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Rest of your dashboard content ... */}
        {/* Quick Actions, AI Suggestion, Recent Activity, Content Pipeline remain unchanged */}
      </div>
    </DashboardLayout>
  );
}
