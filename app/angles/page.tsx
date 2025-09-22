"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Search, Lightbulb, Target, TrendingUp, Users, BookOpen, Moon, Sun } from "lucide-react";

interface ContentAngle {
  id: string;
  title: string;
  description: string;
  type: "Educational" | "Emotional" | "Practical" | "Trending" | "Controversial";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  engagement: number;
  examples: string[];
}

const mockAngles: ContentAngle[] = [
  {
    id: "1",
    title: "The Beginner's Perspective",
    description:
      "Approach the topic from a complete newcomer's viewpoint, addressing basic questions and concerns.",
    type: "Educational",
    difficulty: "Beginner",
    engagement: 85,
    examples: [
      "AI for Complete Beginners: What You Need to Know",
      "Starting Your First Business: A Step-by-Step Guide",
      "Coding 101: Your First Programming Language",
    ],
  },
  {
    id: "2",
    title: "Behind the Scenes",
    description: "Reveal the hidden processes, challenges, and stories that audiences don't usually see.",
    type: "Emotional",
    difficulty: "Intermediate",
    engagement: 92,
    examples: [
      "What Really Happens During a Product Launch",
      "The Hidden Costs of Running a Startup",
      "A Day in the Life of a Remote Developer",
    ],
  },
  {
    id: "3",
    title: "Myth Busting",
    description: "Challenge common misconceptions and provide evidence-based corrections.",
    type: "Controversial",
    difficulty: "Advanced",
    engagement: 88,
    examples: [
      "5 AI Myths That Are Completely Wrong",
      "Why 'Follow Your Passion' is Bad Career Advice",
      "The Truth About Overnight Success Stories",
    ],
  },
  {
    id: "4",
    title: "Future Predictions",
    description: "Analyze current trends to make educated predictions about future developments.",
    type: "Trending",
    difficulty: "Advanced",
    engagement: 90,
    examples: [
      "How AI Will Change Jobs in the Next 5 Years",
      "The Future of Remote Work Post-2024",
      "Emerging Technologies to Watch in 2025",
    ],
  },
  {
    id: "5",
    title: "Step-by-Step Tutorials",
    description: "Break down complex processes into actionable, easy-to-follow steps.",
    type: "Practical",
    difficulty: "Intermediate",
    engagement: 87,
    examples: [
      "How to Build Your First AI Chatbot",
      "Setting Up Analytics for Your Website",
      "Creating a Content Calendar That Works",
    ],
  },
  {
    id: "6",
    title: "Case Study Analysis",
    description: "Deep dive into real examples, successes, and failures with detailed analysis.",
    type: "Educational",
    difficulty: "Advanced",
    engagement: 89,
    examples: [
      "How Netflix Used Data to Create Hit Shows",
      "Why Google+ Failed: A Complete Analysis",
      "Tesla's Marketing Strategy Breakdown",
    ],
  },
];

export default function ContentAnglesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isDark, setIsDark] = useState(false);

  const filteredAngles = mockAngles.filter(
    (angle) =>
      angle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      angle.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      angle.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateAnglesForTopic = () => {
    console.log("Generating angles for:", selectedTopic);
  };

  const theme = isDark
    ? {
        bg: "bg-[#222831]",
        cardBg: "bg-[#393E46]",
        text: "text-[#EEEEEE]",
        textMuted: "text-[#EEEEEE]/70",
        primary: "bg-[#00ADB5]",
        primaryText: "text-[#EEEEEE]",
        primaryHover: "hover:bg-[#00ADB5]/90",
        border: "border-[#393E46]",
        input:
          "bg-[#393E46] border-[#393E46] text-[#EEEEEE] placeholder:text-[#EEEEEE]/50",
        accent: "text-[#00ADB5]",
        hoverCard: "hover:bg-[#393E46]/80",
      }
    : {
        bg: "bg-[#EEEEEE]",
        cardBg: "bg-white",
        text: "text-[#222831]",
        textMuted: "text-[#393E46]",
        primary: "bg-[#00ADB5]",
        primaryText: "text-white",
        primaryHover: "hover:bg-[#00ADB5]/90",
        border: "border-gray-200",
        input:
          "bg-white border-gray-300 text-[#222831] placeholder:text-[#393E46]/70",
        accent: "text-[#00ADB5]",
        hoverCard: "hover:bg-gray-50",
      };

  const getBadgeStyles = (
    type: string,
    variant: "type" | "difficulty" = "type"
  ) => {
    if (variant === "difficulty") {
      return isDark
        ? "bg-[#393E46]/50 text-[#EEEEEE] border-[#393E46]"
        : "bg-gray-100 text-[#393E46] border-gray-200";
    }

    const styles = {
      Educational: isDark
        ? "bg-[#00ADB5]/20 text-[#00ADB5] border-[#00ADB5]/30"
        : "bg-[#00ADB5]/10 text-[#00ADB5] border-[#00ADB5]/30",
      Emotional: isDark
        ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
        : "bg-purple-100 text-purple-700 border-purple-200",
      Practical: isDark
        ? "bg-green-500/20 text-green-300 border-green-500/30"
        : "bg-green-100 text-green-700 border-green-200",
      Trending: isDark
        ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
        : "bg-orange-100 text-orange-700 border-orange-200",
      Controversial: isDark
        ? "bg-red-500/20 text-red-300 border-red-500/30"
        : "bg-red-100 text-red-700 border-red-200",
    };
    return styles[type as keyof typeof styles] || styles.Educational;
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme.bg}`}>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Sparkles className={`h-6 w-6 ${theme.accent} animate-pulse`} />
              <h1 className={`text-3xl font-serif font-bold ${theme.text}`}>
                Content Angles
              </h1>
            </div>
            <p className={theme.textMuted}>
              Explore different perspectives and approaches to make your content
              more engaging and unique.
            </p>
          </div>

          {/* Theme Toggle */}
          <Button
            onClick={() => setIsDark(!isDark)}
            variant="outline"
            size="sm"
            className={`${theme.border} ${theme.cardBg} ${theme.text} hover:${theme.cardBg}/80`}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        <Tabs defaultValue="explore" className="space-y-6">
          <TabsList
            className={`grid w-full grid-cols-2 lg:w-[400px] ${theme.cardBg} ${theme.border}`}
          >
            <TabsTrigger
              value="explore"
              className={`${theme.text} data-[state=active]:${theme.primary} data-[state=active]:${theme.primaryText}`}
            >
              Explore Angles
            </TabsTrigger>
            <TabsTrigger
              value="generate"
              className={`${theme.text} data-[state=active]:${theme.primary} data-[state=active]:${theme.primaryText}`}
            >
              Generate Custom
            </TabsTrigger>
          </TabsList>

          {/* Explore Tab */}
          <TabsContent value="explore" className="space-y-6">
            <Card className={`${theme.border} ${theme.cardBg} shadow-lg`}>
              <CardHeader>
                <CardTitle className={`text-lg font-serif ${theme.text}`}>
                  Discover Content Angles
                </CardTitle>
                <CardDescription className={theme.textMuted}>
                  Browse proven content angles that drive engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme.textMuted}`}
                  />
                  <Input
                    placeholder="Search angles by type, difficulty, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 ${theme.input} focus:border-[#00ADB5] focus:ring-1 focus:ring-[#00ADB5]`}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAngles.map((angle) => (
                <Card
                  key={angle.id}
                  className={`${theme.border} ${theme.cardBg} ${theme.hoverCard} transition-all duration-200 shadow-lg hover:shadow-xl`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle
                          className={`text-lg font-serif text-balance ${theme.text}`}
                        >
                          {angle.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge
                            className={`text-xs border ${getBadgeStyles(
                              angle.type
                            )}`}
                          >
                            {angle.type}
                          </Badge>
                          <Badge
                            className={`text-xs border ${getBadgeStyles(
                              angle.difficulty,
                              "difficulty"
                            )}`}
                          >
                            {angle.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${theme.accent}`}>
                          {angle.engagement}%
                        </div>
                        <div className={`text-xs ${theme.textMuted}`}>
                          Engagement
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className={`text-sm ${theme.textMuted} text-pretty`}>
                      {angle.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className={`text-sm font-medium ${theme.text}`}>
                        Example Titles:
                      </h4>
                      <div className="space-y-1">
                        {angle.examples.slice(0, 2).map((example, index) => (
                          <p
                            key={index}
                            className={`text-xs ${theme.textMuted} italic`}
                          >
                            "{example}"
                          </p>
                        ))}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className={`w-full ${theme.primary} ${theme.primaryHover} ${theme.primaryText} shadow-md`}
                    >
                      <Lightbulb className="mr-2 h-3 w-3" />
                      Use This Angle
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Generate Tab */}
          <TabsContent value="generate" className="space-y-6">
            <Card className={`${theme.border} ${theme.cardBg} shadow-lg`}>
              <CardHeader>
                <CardTitle className={`text-lg font-serif ${theme.text}`}>
                  Generate Custom Angles
                </CardTitle>
                <CardDescription className={theme.textMuted}>
                  Enter your topic and let AI generate unique content angles
                  tailored to your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${theme.text}`}>
                    Topic or Subject
                  </label>
                  <Input
                    placeholder="e.g., Artificial Intelligence, Digital Marketing, Productivity"
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className={`${theme.input} focus:border-[#00ADB5] focus:ring-1 focus:ring-[#00ADB5]`}
                  />
                </div>

                <Button
                  onClick={generateAnglesForTopic}
                  disabled={!selectedTopic.trim()}
                  className={`w-full ${theme.primary} ${theme.primaryHover} ${theme.primaryText} shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Custom Angles
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card
                className={`${theme.border} ${theme.cardBg} ${theme.hoverCard} text-center p-4 shadow-lg transition-all duration-200`}
              >
                <BookOpen className={`h-8 w-8 ${theme.accent} mx-auto mb-2`} />
                <h3 className={`font-serif font-semibold ${theme.text}`}>
                  Educational
                </h3>
                <p className={`text-xs ${theme.textMuted} mt-1`}>
                  Teach and inform your audience
                </p>
              </Card>
              <Card
                className={`${theme.border} ${theme.cardBg} ${theme.hoverCard} text-center p-4 shadow-lg transition-all duration-200`}
              >
                <Target className={`h-8 w-8 ${theme.accent} mx-auto mb-2`} />
                <h3 className={`font-serif font-semibold ${theme.text}`}>
                  Practical
                </h3>
                <p className={`text-xs ${theme.textMuted} mt-1`}>
                  Actionable tips and tutorials
                </p>
              </Card>
              <Card
                className={`${theme.border} ${theme.cardBg} ${theme.hoverCard} text-center p-4 shadow-lg transition-all duration-200`}
              >
                <TrendingUp
                  className={`h-8 w-8 ${theme.accent} mx-auto mb-2`}
                />
                <h3 className={`font-serif font-semibold ${theme.text}`}>
                  Trending
                </h3>
                <p className={`text-xs ${theme.textMuted} mt-1`}>
                  Current events and hot topics
                </p>
              </Card>
              <Card
                className={`${theme.border} ${theme.cardBg} ${theme.hoverCard} text-center p-4 shadow-lg transition-all duration-200`}
              >
                <Users className={`h-8 w-8 ${theme.accent} mx-auto mb-2`} />
                <h3 className={`font-serif font-semibold ${theme.text}`}>
                  Emotional
                </h3>
                <p className={`text-xs ${theme.textMuted} mt-1`}>
                  Stories that connect and inspire
                </p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
