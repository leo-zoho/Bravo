"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ProjectCreationModal } from "@/components/projects/project-creation-modal"
import {
  Search,
  Filter,
  MoreHorizontal,
  Play,
  Pause,
  Edit,
  Share,
  Download,
  Trash2,
  Eye,
  Code2,
  Palette,
  Zap,
  Globe,
  Smartphone,
  Database,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const initialProjects = [
  {
    id: "1",
    name: "E-commerce Dashboard",
    description: "Modern e-commerce platform with analytics and inventory management",
    template: "react-app",
    status: "active",
    progress: 85,
    lastModified: "2 hours ago",
    collaborators: ["JD", "JS", "MJ"],
    framework: "React 18",
    features: ["Authentication", "Database", "Analytics"],
  },
  {
    id: "2",
    name: "Task Automation Bot",
    description: "Automated email categorization and response system",
    template: "automation",
    status: "running",
    progress: 100,
    lastModified: "30 minutes ago",
    collaborators: ["JD"],
    framework: "Node.js",
    features: ["AI Processing", "Email Integration"],
  },
  {
    id: "3",
    name: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication",
    template: "mobile-app",
    status: "draft",
    progress: 45,
    lastModified: "1 day ago",
    collaborators: ["JS", "MJ"],
    framework: "React Native",
    features: ["Authentication", "Security", "Real-time Updates"],
  },
]

const getTemplateIcon = (template: string) => {
  switch (template) {
    case "react-app":
      return Code2
    case "nextjs-app":
      return Globe
    case "mobile-app":
      return Smartphone
    case "automation":
      return Zap
    case "dashboard":
      return Database
    case "design-system":
      return Palette
    default:
      return Code2
  }
}

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
    case "error":
      return "bg-red-500"
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
    case "error":
      return <AlertCircle className="w-3 h-3" />
    default:
      return <Clock className="w-3 h-3" />
  }
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const handleProjectCreate = (newProject: any) => {
    setProjects((prev) => [newProject, ...prev])
  }

  const handleProjectAction = (projectId: string, action: string) => {
    switch (action) {
      case "delete":
        setProjects((prev) => prev.filter((p) => p.id !== projectId))
        break
      case "duplicate":
        const projectToDuplicate = projects.find((p) => p.id === projectId)
        if (projectToDuplicate) {
          const duplicatedProject = {
            ...projectToDuplicate,
            id: Date.now().toString(),
            name: `${projectToDuplicate.name} (Copy)`,
            progress: 0,
            lastModified: "Just now",
          }
          setProjects((prev) => [duplicatedProject, ...prev])
        }
        break
      default:
        console.log(`Action ${action} for project ${projectId}`)
    }
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || project.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage and organize all your development projects</p>
        </div>
        <ProjectCreationModal onProjectCreate={handleProjectCreate} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Code2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">
                +{projects.filter((p) => p.lastModified.includes("hour") || p.lastModified.includes("minute")).length}
              </span>{" "}
              recently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.filter((p) => p.status === "active" || p.status === "running").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently in development</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.filter((p) => p.progress === 100).length}</div>
            <p className="text-xs text-muted-foreground">Ready for deployment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              {filterStatus === "all" ? "All Status" : filterStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Status</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("running")}>Running</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("draft")}>Draft</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("paused")}>Paused</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const TemplateIcon = getTemplateIcon(project.template)

          return (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <TemplateIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          {getStatusIcon(project.status)}
                          <span className="capitalize">{project.status}</span>
                        </div>
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
                      <DropdownMenuItem onClick={() => handleProjectAction(project.id, "duplicate")}>
                        <Share className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleProjectAction(project.id, "delete")}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{project.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Framework:</span>
                    <Badge variant="outline" className="text-xs">
                      {project.framework}
                    </Badge>
                  </div>
                  <span className="text-muted-foreground">{project.lastModified}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-1">
                    {project.collaborators.map((collaborator, index) => (
                      <Avatar key={index} className="w-6 h-6 border-2 border-background">
                        <AvatarFallback className="text-xs">{collaborator}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {project.features.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.features.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Code2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "Try adjusting your search terms" : "Create your first project to get started"}
          </p>
          {!searchQuery && <ProjectCreationModal onProjectCreate={handleProjectCreate} />}
        </div>
      )}
    </div>
  )
}
