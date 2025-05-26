"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ObjectChatModal } from "@/components/shared/object-chat-modal"
import {
  ArrowLeft,
  Edit,
  Share,
  MessageSquare,
  FileText,
  Target,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Code2,
  Palette,
  Sparkles,
  Download,
  ExternalLink,
  Plus,
} from "lucide-react"

// Mock project data - in real app this would come from API
const mockProject = {
  id: "1",
  name: "E-commerce Dashboard",
  description: "Modern e-commerce platform with analytics and inventory management",
  category: "app",
  template: "web-app",
  status: "active",
  progress: 65,
  lastModified: "2 hours ago",
  createdAt: new Date("2024-01-15"),
  collaborators: ["John Doe", "Jane Smith", "Mike Johnson"],
  framework: "React 18",
  priority: "high",
  timeline: "6 weeks",
  objectives: [
    "Create intuitive admin dashboard for e-commerce management",
    "Implement real-time analytics and reporting",
    "Build inventory management system",
    "Integrate payment processing",
  ],
  outputs: ["Responsive web application", "Admin dashboard", "API documentation", "User manual"],
  requirements: "React 18, TypeScript, Tailwind CSS, Node.js backend, PostgreSQL database, Stripe integration",
  successCriteria: "User adoption rate >80%, page load time <2s, 99.9% uptime",
  constraints: "Budget: $50k, Timeline: 6 weeks, Team: 3 developers",
  features: ["Authentication", "Database", "Analytics", "Payment Processing"],
  tasks: [
    { id: "1", title: "Set up project structure", status: "completed", assignee: "John Doe", dueDate: "2024-01-20" },
    { id: "2", title: "Design database schema", status: "completed", assignee: "Jane Smith", dueDate: "2024-01-25" },
    { id: "3", title: "Implement authentication", status: "in-progress", assignee: "John Doe", dueDate: "2024-02-01" },
    { id: "4", title: "Build dashboard UI", status: "in-progress", assignee: "Mike Johnson", dueDate: "2024-02-05" },
    { id: "5", title: "Integrate analytics", status: "pending", assignee: "Jane Smith", dueDate: "2024-02-10" },
    { id: "6", title: "Payment integration", status: "pending", assignee: "John Doe", dueDate: "2024-02-15" },
  ],
  files: [
    {
      name: "Project Requirements.pdf",
      type: "document",
      size: "2.4 MB",
      uploadedBy: "John Doe",
      uploadedAt: "2024-01-15",
    },
    { name: "UI Mockups.fig", type: "design", size: "15.2 MB", uploadedBy: "Mike Johnson", uploadedAt: "2024-01-18" },
    { name: "API Specification.yaml", type: "code", size: "45 KB", uploadedBy: "Jane Smith", uploadedAt: "2024-01-20" },
  ],
  aiPlan: `## Project Plan: E-commerce Dashboard

### Phase 1: Foundation (Weeks 1-2)
- Project setup and configuration
- Database design and implementation
- Authentication system
- Basic UI framework

### Phase 2: Core Features (Weeks 3-4)
- Dashboard implementation
- Inventory management
- User management
- Basic analytics

### Phase 3: Advanced Features (Weeks 5-6)
- Payment integration
- Advanced analytics
- Reporting system
- Testing and optimization

### Key Milestones:
- Week 2: Authentication complete
- Week 4: Core dashboard functional
- Week 6: Full system deployed`,
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500"
    case "in-progress":
      return "bg-blue-500"
    case "pending":
      return "bg-gray-400"
    case "blocked":
      return "bg-red-500"
    default:
      return "bg-gray-400"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4" />
    case "in-progress":
      return <Clock className="w-4 h-4" />
    case "pending":
      return <Clock className="w-4 h-4" />
    case "blocked":
      return <AlertCircle className="w-4 h-4" />
    default:
      return <Clock className="w-4 h-4" />
  }
}

export default function ProjectViewPage() {
  const params = useParams()
  const [project, setProject] = useState(mockProject)
  const [activeTab, setActiveTab] = useState("overview")

  const completedTasks = project.tasks.filter((t) => t.status === "completed").length
  const totalTasks = project.tasks.length
  const taskProgress = (completedTasks / totalTasks) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{project.name}</h1>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{project.category}</Badge>
                <Badge variant="secondary">{project.status}</Badge>
                <span className="text-sm text-muted-foreground">Last updated {project.lastModified}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ObjectChatModal
              objectType="project"
              objectName={project.name}
              objectId={project.id}
              trigger={
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with AI
                </Button>
              }
            />
            <Button variant="outline">
              <Code2 className="w-4 h-4 mr-2" />
              AI Development
            </Button>
            <Button variant="outline">
              <Palette className="w-4 h-4 mr-2" />
              Visual Editor
            </Button>
            <Button variant="outline">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              Edit Project
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks & Progress</TabsTrigger>
            <TabsTrigger value="planning">Planning & AI</TabsTrigger>
            <TabsTrigger value="files">Files & Assets</TabsTrigger>
            <TabsTrigger value="team">Team & Collaboration</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Project Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Progress</p>
                          <p className="text-2xl font-bold">{project.progress}%</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <Progress value={project.progress} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Tasks</p>
                          <p className="text-2xl font-bold">
                            {completedTasks}/{totalTasks}
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <Target className="w-6 h-6 text-green-600" />
                        </div>
                      </div>
                      <Progress value={taskProgress} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Team</p>
                          <p className="text-2xl font-bold">{project.collaborators.length}</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                      </div>
                      <div className="flex -space-x-1 mt-2">
                        {project.collaborators.slice(0, 3).map((collaborator, index) => (
                          <Avatar key={index} className="w-6 h-6 border-2 border-background">
                            <AvatarFallback className="text-xs">
                              {collaborator
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Project Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature) => (
                        <Badge key={feature} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Objectives */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>Project Objectives</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.objectives.map((objective, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                          </div>
                          <p className="text-sm">{objective}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                        <div>
                          <p className="text-sm">Task "Design database schema" completed by Jane Smith</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                        <div>
                          <p className="text-sm">Mike Johnson uploaded UI Mockups.fig</p>
                          <p className="text-xs text-muted-foreground">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                        <div>
                          <p className="text-sm">Project created by John Doe</p>
                          <p className="text-xs text-muted-foreground">1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Project Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="secondary">{project.status}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Priority:</span>
                      <Badge variant="outline">{project.priority}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Timeline:</span>
                      <span>{project.timeline}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Framework:</span>
                      <span>{project.framework}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Created:</span>
                      <span>{project.createdAt.toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Code with AI
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Palette className="w-4 h-4 mr-2" />
                      Open Visual Editor
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Documentation
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export Project
                    </Button>
                  </CardContent>
                </Card>

                {/* Expected Outputs */}
                <Card>
                  <CardHeader>
                    <CardTitle>Expected Outputs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {project.outputs.map((output, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{output}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Tasks & Progress</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {["pending", "in-progress", "completed", "blocked"].map((status) => (
                <Card key={status}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
                      <span className="capitalize">{status.replace("-", " ")}</span>
                      <Badge variant="secondary" className="text-xs">
                        {project.tasks.filter((t) => t.status === status).length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {project.tasks
                      .filter((task) => task.status === status)
                      .map((task) => (
                        <Card key={task.id} className="p-3">
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{task.assignee}</span>
                              <span>{task.dueDate}</span>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="planning" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <span>AI-Generated Plan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">{project.aiPlan}</pre>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat about Plan
                    </Button>
                    <Button variant="outline" size="sm">
                      Regenerate Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{project.requirements}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Success Criteria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{project.successCriteria}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Constraints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{project.constraints}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Files & Assets</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Upload File
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.files.map((file, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{file.name}</h4>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p>Uploaded by {file.uploadedBy}</p>
                      <p>{file.uploadedAt}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Team & Collaboration</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.collaborators.map((collaborator, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {collaborator
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{collaborator}</h4>
                        <p className="text-sm text-muted-foreground">{index === 0 ? "Project Owner" : "Developer"}</p>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <p>Tasks: {project.tasks.filter((t) => t.assignee === collaborator).length}</p>
                      <p>Last active: 2 hours ago</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
