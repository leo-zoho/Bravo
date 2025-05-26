"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Code2,
  Palette,
  Globe,
  Smartphone,
  Database,
  Search,
  Bot,
  Puzzle,
  FileCode,
  Sparkles,
  Zap,
  MessageSquare,
  ArrowRight,
  Brain,
} from "lucide-react"

const creationCategories = [
  {
    id: "projects",
    name: "Projects",
    description: "Complete applications and systems",
    icon: Code2,
    color: "bg-blue-500",
    items: [
      {
        id: "web-app",
        name: "Web Application",
        description: "Full-stack web application",
        icon: Globe,
        tools: ["AI Development", "Visual Editor", "Manual Code"],
        complexity: "Medium",
        timeEstimate: "2-4 weeks",
      },
      {
        id: "mobile-app",
        name: "Mobile App",
        description: "Cross-platform mobile application",
        icon: Smartphone,
        tools: ["AI Development", "Visual Editor"],
        complexity: "High",
        timeEstimate: "4-8 weeks",
      },
      {
        id: "dashboard",
        name: "Analytics Dashboard",
        description: "Data visualization and reporting",
        icon: Database,
        tools: ["AI Development", "Visual Editor"],
        complexity: "Medium",
        timeEstimate: "1-3 weeks",
      },
      {
        id: "research-project",
        name: "Research Project",
        description: "Data analysis and research",
        icon: Search,
        tools: ["AI Development", "Chat Agent"],
        complexity: "Medium",
        timeEstimate: "1-2 weeks",
      },
    ],
  },
  {
    id: "components",
    name: "Components",
    description: "Reusable UI elements and widgets",
    icon: Puzzle,
    color: "bg-green-500",
    items: [
      {
        id: "ui-component",
        name: "UI Component",
        description: "Reusable interface element",
        icon: Palette,
        tools: ["Visual Editor", "AI Development"],
        complexity: "Low",
        timeEstimate: "1-3 days",
      },
      {
        id: "widget",
        name: "Interactive Widget",
        description: "Embeddable interactive element",
        icon: Puzzle,
        tools: ["Visual Editor", "AI Development"],
        complexity: "Medium",
        timeEstimate: "3-7 days",
      },
    ],
  },
  {
    id: "agents",
    name: "AI Agents",
    description: "Intelligent assistants and bots",
    icon: Bot,
    color: "bg-orange-500",
    items: [
      {
        id: "chatbot",
        name: "Chatbot",
        description: "Conversational AI assistant",
        icon: MessageSquare,
        tools: ["Chat Agent", "AI Development"],
        complexity: "High",
        timeEstimate: "2-4 weeks",
      },
      {
        id: "ai-assistant",
        name: "AI Assistant",
        description: "Task-oriented AI helper",
        icon: Brain,
        tools: ["Chat Agent", "AI Development"],
        complexity: "High",
        timeEstimate: "3-6 weeks",
      },
    ],
  },
  {
    id: "functions",
    name: "Functions",
    description: "Serverless functions and APIs",
    icon: FileCode,
    color: "bg-indigo-500",
    items: [
      {
        id: "api-endpoint",
        name: "API Endpoint",
        description: "RESTful API service",
        icon: FileCode,
        tools: ["AI Development"],
        complexity: "Medium",
        timeEstimate: "3-7 days",
      },
      {
        id: "data-processor",
        name: "Data Processor",
        description: "Data transformation function",
        icon: Database,
        tools: ["AI Development"],
        complexity: "Medium",
        timeEstimate: "2-5 days",
      },
    ],
  },
  {
    id: "automations",
    name: "Automations",
    description: "Task automation and workflows",
    icon: Zap,
    color: "bg-yellow-500",
    items: [
      {
        id: "task-automation",
        name: "Task Automation",
        description: "Automated task execution",
        icon: Zap,
        tools: ["Automation Builder"],
        complexity: "Low",
        timeEstimate: "1-2 days",
      },
      {
        id: "data-pipeline",
        name: "Data Pipeline",
        description: "Automated data processing",
        icon: Database,
        tools: ["Automation Builder"],
        complexity: "Medium",
        timeEstimate: "3-7 days",
      },
      {
        id: "notification-system",
        name: "Notification System",
        description: "Automated alerts and messages",
        icon: MessageSquare,
        tools: ["Automation Builder"],
        complexity: "Low",
        timeEstimate: "1-3 days",
      },
    ],
  },
]

interface CentralCreateHubProps {
  onItemSelect: (category: string, item: any) => void
}

export function CentralCreateHub({ onItemSelect }: CentralCreateHubProps) {
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("projects")

  const handleItemSelect = (item: any) => {
    onItemSelect(selectedCategory, item)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <span>What would you like to create?</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {creationCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                <category.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {creationCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item) => (
                    <Card
                      key={item.id}
                      className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-blue-500 group"
                      onClick={() => handleItemSelect(item)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <item.icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Complexity:</span>
                            <Badge variant="outline" className="text-xs">
                              {item.complexity}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Time:</span>
                            <span className="text-xs">{item.timeEstimate}</span>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Available tools:</p>
                            <div className="flex flex-wrap gap-1">
                              {item.tools.map((tool) => (
                                <Badge key={tool} variant="secondary" className="text-xs">
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-3 border-t">
                          <span className="text-sm font-medium text-blue-600">Get Started</span>
                          <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
