"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Sparkles, Lightbulb, Lock, Mail, User } from "lucide-react"

export function LoginForm() {
  const { login, signup, isLoading } = useAuth()
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("login")

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const success = await login(email, password)
    if (!success) {
      setError("Invalid credentials. Try admin@technovinky.com / admin123")
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const name = formData.get("name") as string

    const success = await signup(email, password, name)
    if (!success) {
      setError("User already exists or signup failed")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,173,181,0.1),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="TechnoVinky Logo" 
              className="h-24 w-auto drop-shadow-lg"
            />
          </div>

          <div className="space-y-3">
            <p className="text-gray-300 text-lg">Content Idea Generator</p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-cyan-400">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Lightbulb className="h-4 w-4" />
                <span>Smart Ideas</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="border-slate-700/50 bg-slate-800/80 backdrop-blur-xl shadow-2xl shadow-black/50">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <CardHeader className="space-y-4 pb-6">
              <TabsList className="grid w-full grid-cols-2 bg-slate-700/50 p-1 rounded-lg">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-gray-300 font-medium"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white text-gray-300 font-medium"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive" className="border-red-500/50 bg-red-500/10 text-red-300">
                  <AlertDescription className="font-medium">{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="login" className="space-y-6">
                <div className="space-y-2 text-center">
                  <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
                  <CardDescription className="text-gray-400">
                    Sign in to access your AI content dashboard
                  </CardDescription>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300 font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="admin@technovinky.com"
                        required
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300 font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="admin123"
                        required
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 h-12"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/25 transition-all duration-200 transform hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In to Dashboard"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-6">
                <div className="space-y-2 text-center">
                  <CardTitle className="text-2xl text-white">Create Account</CardTitle>
                  <CardDescription className="text-gray-400">
                    Join TechnoVinky and start generating amazing content ideas
                  </CardDescription>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-gray-300 font-medium">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-300 font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-300 font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        placeholder="Create a strong password"
                        required
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/20 h-12"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/25 transition-all duration-200 transform hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Your Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <div className="text-center space-y-3">
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
            <p className="text-cyan-400 font-semibold mb-2">Demo Credentials</p>
            <div className="space-y-1 text-sm">
              <p className="text-gray-300">
                <span className="text-gray-400">Email:</span>{" "}
                <span className="text-white font-mono">admin@technovinky.com</span>
              </p>
              <p className="text-gray-300">
                <span className="text-gray-400">Password:</span> <span className="text-white font-mono">admin123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}