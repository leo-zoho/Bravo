"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreHorizontal,
  Play,
  Pause,
  Square,
  Eye,
  Edit,
  Trash2,
  Users,
  Target,
  CheckCircle,
  AlertTriangle,
  Calendar,
} from "lucide-react"

interface Mission {
  id: string
  title: string
  description: string
  status: "draft" | "active" | "paused" | "completed" | "failed"
  progress: number
  priority: "low" | "medium" | "high" | "critical"
  createdAt: Date
  updatedAt: Date
  estimatedCompletion: Date
  assignedAgents: number
  objectives: number
  completedObjectives: number
  creator: string
  tags: string[]
}

const sampleMissions: Mission[] = [
  {
    id: "mission-1",
    title: "Customer Sentiment Analysis",
    description: "Analyze customer feedback across all channels to identify improvement opportunities",
    status: "active",
    progress: 65,
    priority: "high",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    estimatedCompletion: new Date("2024-01-25"),
    assignedAgents: 4,
    objectives: 5,
    completedObjectives: 3,
    creator: "Sarah Chen",
    tags: ["analytics", "customer", "sentiment"],
  },
  {
    id: "mission-2",
    title: "Automated Report Generation",
    description: "Generate weekly performance reports for all departments automatically",
    status: "completed",
    progress: 100,
    priority: "medium",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
    estimatedCompletion: new Date("2024-01-18"),
    assignedAgents: 2,
    objectives: 3,
    completedObjectives: 3,
    creator: "Marcus Rodriguez",
    tags: ["automation", "reports", "analytics"],
  },
  {
    id: "mission-3",
    title: "Data Pipeline Optimization",
    description: "Optimize data processing pipeline for 50% performance improvement",
    status: "paused",
    progress: 30,
    priority: "critical",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-19"),
    estimatedCompletion: new Date("2024-01-30"),
    assignedAgents: 6,
    objectives: 8,
    completedObjectives: 2,
    creator: "Emily Watson",
    tags: ["optimization", "pipeline", "performance"],
  },
]

export function MissionControlCenter() {
  const [missions, setMissions] = useState<Mission[]>(sampleMissions)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")

  const filteredMissions = missions.filter((mission) => {
    const matchesSearch =
      mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus = statusFilter === "all" || mission.status === statusFilter
    const matchesPriority = priorityFilter === "all" || mission.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "paused":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-600 bg-red-50"
      case "high":
        return "text-orange-600 bg-orange-50"
      case "medium":
        return "text-blue-600 bg-blue-50"
      case "low":
        return "text-gray-600 bg-gray-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="w-3 h-3" />
      case "completed":
        return <CheckCircle className="w-3 h-3" />
      case "paused":
        return <Pause className="w-3 h-3" />
      case "failed":
        return <AlertTriangle className="w-3 h-3" />
      default:
        return <Square className="w-3 h-3" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mission Control Center</h1>
          <p className="text-muted-foreground">Monitor and manage all autonomous missions</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Target className="w-4 h-4 mr-2" />
          New Mission
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search missions, tags, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMissions.map((mission) => (
          <Card key={mission.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{mission.title}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">{mission.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Mission
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Mission
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Status and Priority */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="flex items-center space-x-1">
                  {getStatusIcon(mission.status)}
                  <span className="capitalize">{mission.status}</span>
                </Badge>
                <Badge className={getPriorityColor(mission.priority)}>{mission.priority.toUpperCase()}</Badge>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{mission.progress}%</span>
                </div>
                <Progress value={mission.progress} className="h-2" />
              </div>

              {/* Objectives */}
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <Target className="w-3 h-3 mr-1" />
                  Objectives
                </span>
                <span>
                  {mission.completedObjectives}/{mission.objectives}
                </span>
              </div>

              {/* Agents */}
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  Agents
                </span>
                <span>{mission.assignedAgents} active</span>
              </div>

              {/* Timeline */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  Due
                </span>
                <span>{mission.estimatedCompletion.toLocaleDateString()}</span>
              </div>

              {/* Tags */}
              {mission.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {mission.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {mission.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{mission.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              {/* Creator */}
              <div className="text-xs text-muted-foreground">Created by {mission.creator}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMissions.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No missions found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
