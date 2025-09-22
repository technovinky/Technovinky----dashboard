"use client"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  LogOut,
  Save,
  Upload,
  Key,
  Moon,
  Sun,
  Monitor,
  SettingsIcon,
  Crown,
  Zap,
} from "lucide-react"

export function Settings() {
  const { user, logout } = useAuth()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
    updates: true,
  })
  const [theme, setTheme] = useState("dark")
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 gradient-accent rounded-xl animate-float">
            <SettingsIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent animate-pulse-slow" />
              Manage your account preferences and application settings
            </p>
          </div>
        </div>
      </div>

      {saved && (
        <Alert className="border-green-500/50 bg-green-500/10 glass-effect" style={{ backgroundColor: '#272F40' }}>
          <Save className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-400">Settings saved successfully!</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 glass-effect border-primary/20" style={{ backgroundColor: '#272F40' }}>
          <TabsTrigger value="profile" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            Preferences
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            Billing
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="glass-effect border-primary/20 glow-primary" style={{ backgroundColor: '#272F40' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and profile settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 gradient-primary rounded-full opacity-20 animate-pulse-slow"></div>
                  <Avatar className="h-20 w-20 ring-2 ring-primary/30">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10 bg-transparent">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Avatar
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              <Separator className="bg-primary/20" />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    defaultValue={user?.name}
                    className="bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email}
                    className="bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Your company name"
                    className="bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    placeholder="Content Manager"
                    className="bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="w-full min-h-[100px] px-3 py-2 text-sm border border-primary/30 bg-background/50 backdrop-blur-sm rounded-md placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <Button onClick={handleSave} className="w-full md:w-auto gradient-primary hover:opacity-90 glow-primary">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="glass-effect border-primary/20" style={{ backgroundColor: '#272F40' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-secondary" />
                Appearance
              </CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "light", icon: Sun, label: "Light", gradient: "from-yellow-400 to-orange-400" },
                    { value: "dark", icon: Moon, label: "Dark", gradient: "from-primary to-secondary" },
                    { value: "system", icon: Monitor, label: "System", gradient: "from-accent to-primary" },
                  ].map((option) => {
                    const Icon = option.icon
                    return (
                      <Button
                        key={option.value}
                        variant={theme === option.value ? "default" : "outline"}
                        className={`h-auto p-4 flex flex-col gap-2 relative overflow-hidden ${
                          theme === option.value
                            ? `bg-gradient-to-r ${option.gradient} text-white glow-primary`
                            : "border-primary/30 hover:bg-primary/10"
                        }`}
                        onClick={() => setTheme(option.value)}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm">{option.label}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-primary/20" style={{ backgroundColor: '#272F40' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" />
                Notifications
              </CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: "email",
                  label: "Email Notifications",
                  description: "Receive notifications via email",
                },
                {
                  key: "push",
                  label: "Push Notifications",
                  description: "Receive push notifications in your browser",
                },
                {
                  key: "marketing",
                  label: "Marketing Emails",
                  description: "Receive updates about new features and tips",
                },
                {
                  key: "updates",
                  label: "Product Updates",
                  description: "Get notified about important product changes",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between space-x-2 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [item.key]: checked }))}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="glass-effect border-primary/20" style={{ backgroundColor: '#272F40' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    className="bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary focus:ring-primary/20"
                  />
                </div>
                <Button
                  variant="outline"
                  className="border-green-500/30 hover:bg-green-500/10 text-green-400 bg-transparent"
                >
                  <Key className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </div>

              <Separator className="bg-primary/20" />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-3 rounded-lg border border-primary/20">
                  <div className="space-y-0.5">
                    <p className="text-sm">Enable 2FA for enhanced security</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                    Not Enabled
                  </Badge>
                </div>
                <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10 bg-transparent">
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card className="glass-effect border-primary/20" style={{ backgroundColor: '#272F40' }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-secondary" />
                Subscription & Billing
              </CardTitle>
              <CardDescription>Manage your subscription and billing information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-primary/30 rounded-lg glass-effect glow-primary">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-secondary" />
                    <h4 className="font-medium">Pro Plan</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Unlimited AI generations and premium features</p>
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30">Active</Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 p-3 rounded-lg bg-primary/5">
                  <Label>Next Billing Date</Label>
                  <p className="text-sm text-muted-foreground">January 15, 2025</p>
                </div>
                <div className="space-y-2 p-3 rounded-lg bg-secondary/5">
                  <Label>Amount</Label>
                  <p className="text-sm text-muted-foreground">$29.99/month</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="border-primary/30 hover:bg-primary/10 bg-transparent">
                  Manage Subscription
                </Button>
                <Button variant="outline" className="border-secondary/30 hover:bg-secondary/10 bg-transparent">
                  Download Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-accent/50 glass-effect glow-accent" style={{ backgroundColor: '#272F40' }}>
        <CardHeader>
          <CardTitle className="text-accent flex items-center gap-2">
            <LogOut className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full md:w-auto bg-gradient-to-r from-accent to-red-500 hover:opacity-90 glow-accent"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}