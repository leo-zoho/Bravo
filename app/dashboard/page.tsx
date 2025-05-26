"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Code2,
  Palette,
  Zap,
  MessageSquare,
  MoreHorizontal,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Eye,
  Edit,
  Trash2,
  Share,
  Download,
} from "lucide-react"

const projects = [
  {
    id: "1",
    name: "E-commerce Dashboard",
    type: "React App",
    status: "active",
    progress: 85,
    lastModified: "2 hours ago",
    collaborators: ["JD", "JS", "MJ"],
    description: "Modern e-commerce platform with analytics",
  },
  {
    id: "2",
    name: "Task Automation Bot",
    type: "Automation",
    status: "running",
    progress: 100,
    lastModified: "30 minutes ago",
    collaborators: ["JD"],
    description: "Automated email categorization and response",
  },
  {
    id: "3",
    name: "Mobile Banking App",
    type: "React Native",
    status: "draft",
    progress: 45,
    lastModified: "1 day ago",
    collaborators: ["JS", "MJ"],
    description: "Secure mobile banking application",
  },
  {
    id: "4",
    name: "Content Generator",
    type: "AI Workflow",
    status: "paused",
    progress: 60,
    lastModified: "3 hours ago",
    collaborators: ["JD", "JS"],
    description: "AI-powered content creation pipeline",
  },
]

const recentActivity = [
  {
    id: "1",
    user: "Jane Smith",
    action: "deployed E-commerce Dashboard to production",
    time: "30 minutes ago",
    type: "deployment",
  },
  {
    id: "2",
    user: "You",
    action: "created new automation workflow",
    time: "1 hour ago",
    type: "create",
  },
  {
    id: "3",
    user: "Mike Johnson",
    action: "commented on Mobile Banking App",
    time: "2 hours ago",
    type: "comment",
  },
  {
    id: "4",
    user: "System",
    action: "Task Automation Bot completed 50 tasks",
    time: "3 hours ago",
    type: "automation",
  },
]

const quickActions = [
  {
    title: "AI Development",
    description: "Generate code with AI",
    icon: Code2,
    href: "/ai-development",
    color: "bg-blue-500",
  },
  {
    title: "Visual Editor",
    description: "Design with drag & drop",
    icon: Palette,
    href: "/visual-editor",
    color: "bg-purple-500",
  },
  {
    title: "Automation",
    description: "Create workflows",
    icon: Zap,
    href: "/automation",
    color: "bg-yellow-500",
  },
  {
    title: "Chat Agent",
    description: "Get AI assistance",
    icon: MessageSquare,
    href: "/chat-agent",
    color: "bg-green-500",
  },
]

export default function DashboardPage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "running":
        return "bg-blue-500"
      case "paused":
        return "bg-yellow-500"
      case "draft":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Edit className="w-3 h-3" />
      case "running":
        return <Play className="w-3 h-3" />
      case "paused":
        return <Pause className="w-3 h-3" />
      case "draft":
        return <Clock className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your projects.</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Code2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+1</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">2</span> online now
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23</span> today
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 hover:shadow-md transition-shadow"
                  >
                    <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{project.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {project.type}
                          </Badge>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            {getStatusIcon(project.status)}
                            <span className="capitalize">{project.status}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <Progress value={project.progress} className="w-20 h-2" />
                            <span className="text-xs text-muted-foreground">{project.progress}%</span>
                          </div>
                          <div className="flex -space-x-1">
                            {project.collaborators.map((collaborator, index) => (
                              <Avatar key={index} className="w-6 h-6 border-2 border-background">
                                <AvatarFallback className="text-xs">{collaborator}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{project.lastModified}</span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Services</span>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Automation Engine</span>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">Running</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Collaboration</span>
                <div className="flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-yellow-600">Maintenance</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Integrations</span>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">Connected</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Usage This Month</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>AI Generations</span>
                  <span>847 / 1000</span>
                </div>
                <Progress value={84.7} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Automation Runs</span>
                  <span>1,234 / 2000</span>
                </div>
                <Progress value={61.7} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Storage Used</span>
                  <span>2.3 GB / 10 GB</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
