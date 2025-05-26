"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ObjectChatModal } from "@/components/shared/object-chat-modal"
import {
  ArrowLeft,
  Edit,
  Share,
  MessageSquare,
  FileText,
  Target,
  Upload,
  Link,
  Plus,
  Trash2,
  Code2,
  Palette,
  Sparkles,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

interface ProjectViewerProps {
  project: any
  onBack: () => void
  onEdit: (updates: any) => void
}

export function ProjectViewer({ project, onBack, onEdit }: ProjectViewerProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [objectives, setObjectives] = useState(
    project.objectives || [
      "Create a modern, responsive user interface",
      "Implement secure user authentication",
      "Build scalable backend architecture",
    ],
  )
  const [references, setReferences] = useState(
    project.references || [
      { type: "url", name: "Design inspiration", url: "https://dribbble.com/shots/example" },
      { type: "file", name: "Brand guidelines.pdf", size: "2.4 MB" },
    ],
  )
  const [outputs, setOutputs] = useState(
    project.outputs || [
      { type: "web-app", name: "Production web application", status: "planned" },
      { type: "mobile-app", name: "iOS/Android mobile app", status: "planned" },
      { type: "documentation", name: "Technical documentation", status: "planned" },
    ],
  )

  const CategoryIcon = project.categoryIcon

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "planned":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-3 h-3" />
      case "in-progress":
        return <Clock className="w-3 h-3" />
      case "planned":
        return <AlertCircle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const addObjective = () => {
    setObjectives([...objectives, ""])
  }

  const updateObjective = (index: number, value: string) => {
    const updated = [...objectives]
    updated[index] = value
    setObjectives(updated)
  }

  const removeObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index))
  }

  const addReference = (type: "url" | "file") => {
    const newRef = type === "url" ? { type: "url", name: "", url: "" } : { type: "file", name: "", size: "" }
    setReferences([...references, newRef])
  }

  const addOutput = () => {
    setOutputs([...outputs, { type: "deliverable", name: "", status: "planned" }])
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg ${project.categoryColor} flex items-center justify-center`}>
              <CategoryIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{project.category}</Badge>
                <Badge variant="outline">{project.framework}</Badge>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                  <span className="capitalize">{project.status}</span>
                </div>
              </div>
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
                AI Assistant
              </Button>
            }
          />
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

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl font-bold">{project.progress}%</span>
                  <span className="text-sm text-muted-foreground">Complete</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Team Members</p>
              <div className="flex -space-x-1 mt-2">
                {project.collaborators.map((collaborator: string, index: number) => (
                  <Avatar key={index} className="w-8 h-8 border-2 border-background">
                    <AvatarFallback className="text-xs">{collaborator}</AvatarFallback>
                  </Avatar>
                ))}
                <Button variant="outline" size="sm" className="w-8 h-8 rounded-full p-0 ml-2">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Last Modified</p>
              <p className="text-lg font-semibold mt-1">{project.lastModified}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Created</p>
              <p className="text-lg font-semibold mt-1">
                {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "Recently"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="definition">Definition</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="files">Files & Assets</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Development Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">AI Development</div>
                        <div className="text-xs text-muted-foreground">Generate code</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Palette className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">Visual Editor</div>
                        <div className="text-xs text-muted-foreground">Design interface</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Code2 className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">Code Editor</div>
                        <div className="text-xs text-muted-foreground">Manual coding</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Features & Components</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Project Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Framework</span>
                    <Badge variant="outline">{project.framework}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Complexity</span>
                    <Badge variant="outline">{project.complexity || "Medium"}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Estimated Time</span>
                    <span className="text-sm">{project.timeEstimate || "2-4 weeks"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      <div>
                        <p className="text-sm">Project created</p>
                        <p className="text-xs text-muted-foreground">{project.lastModified}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <div>
                        <p className="text-sm">Initial setup completed</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="definition" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Objectives */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Project Objectives</span>
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={addObjective}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={objective}
                      onChange={(e) => updateObjective(index, e.target.value)}
                      placeholder="Enter project objective..."
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeObjective(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Expected Outputs */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Expected Outputs</span>
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={addOutput}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {outputs.map((output, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(output.status)}`} />
                      <div>
                        <p className="font-medium">{output.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{output.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        {getStatusIcon(output.status)}
                        <span className="capitalize">{output.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* References & Resources */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Link className="w-5 h-5" />
                  <span>References & Resources</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => addReference("url")}>
                    <Link className="w-4 h-4 mr-2" />
                    Add URL
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => addReference("file")}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {references.map((reference, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      {reference.type === "url" ? <Link className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{reference.name}</p>
                      {reference.type === "url" ? (
                        <p className="text-xs text-muted-foreground">{reference.url}</p>
                      ) : (
                        <p className="text-xs text-muted-foreground">{reference.size}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Planning Assistant */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span>AI Planning Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe your project requirements, goals, or ask for planning assistance..."
                rows={3}
              />
              <div className="flex space-x-2">
                <Button>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Project Plan
                </Button>
                <Button variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  Suggest Objectives
                </Button>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Define Outputs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="development" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">AI Code Generation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate components and features using natural language descriptions
                </p>
                <Button className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start AI Development
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Visual Design</h3>
                <p className="text-sm text-muted-foreground mb-4">Design interfaces with drag-and-drop visual editor</p>
                <Button className="w-full">
                  <Palette className="w-4 h-4 mr-2" />
                  Open Visual Editor
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Code Editor</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Write and edit code manually with full IDE features
                </p>
                <Button className="w-full">
                  <Code2 className="w-4 h-4 mr-2" />
                  Open Code Editor
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Development Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Development Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Project Setup", progress: 100, status: "completed" },
                  { name: "UI Components", progress: 60, status: "in-progress" },
                  { name: "Backend API", progress: 30, status: "in-progress" },
                  { name: "Authentication", progress: 0, status: "planned" },
                  { name: "Testing", progress: 0, status: "planned" },
                ].map((task, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{task.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{task.progress}%</span>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
                      </div>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Project Files & Assets</CardTitle>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No files uploaded yet</h3>
                <p className="text-muted-foreground mb-4">Upload project assets, documentation, and resources</p>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Your First File
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Project created", user: "You", time: project.lastModified, type: "create" },
                  { action: "Added project objectives", user: "You", time: "1 hour ago", type: "update" },
                  { action: "Uploaded design assets", user: "Jane Smith", time: "2 hours ago", type: "upload" },
                  { action: "Started AI development", user: "You", time: "3 hours ago", type: "development" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
