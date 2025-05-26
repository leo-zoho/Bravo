"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  Play,
  Pause,
  CircleStopIcon as Stop,
  Settings,
  Clock,
  Zap,
  Mail,
  Calendar,
  FileText,
  Database,
  MoreHorizontal,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Edit,
  Copy,
} from "lucide-react"

const automationTemplates = [
  {
    id: "email-categorizer",
    name: "Email Categorizer",
    description: "Automatically categorize and respond to emails",
    category: "Email",
    icon: Mail,
    triggers: ["New Email"],
    actions: ["Categorize", "Auto-respond"],
  },
  {
    id: "calendar-summary",
    name: "Daily Calendar Summary",
    description: "Generate daily calendar summaries and send via email",
    category: "Productivity",
    icon: Calendar,
    triggers: ["Schedule"],
    actions: ["Generate Report", "Send Email"],
  },
  {
    id: "content-generator",
    name: "Content Generator",
    description: "Generate blog posts and social media content",
    category: "Content",
    icon: FileText,
    triggers: ["Schedule", "Manual"],
    actions: ["Generate Content", "Post to Social"],
  },
  {
    id: "data-sync",
    name: "Data Synchronization",
    description: "Sync data between different platforms and databases",
    category: "Data",
    icon: Database,
    triggers: ["Data Change", "Schedule"],
    actions: ["Sync Data", "Validate"],
  },
]

const activeAutomations = [
  {
    id: "1",
    name: "Email Newsletter Generator",
    status: "running",
    lastRun: "2 hours ago",
    nextRun: "Tomorrow 9:00 AM",
    runsToday: 3,
    successRate: 98,
    description: "Generates weekly newsletter from curated content",
  },
  {
    id: "2",
    name: "Customer Support Bot",
    status: "running",
    lastRun: "5 minutes ago",
    nextRun: "Continuous",
    runsToday: 47,
    successRate: 94,
    description: "Handles customer inquiries and tickets",
  },
  {
    id: "3",
    name: "Social Media Scheduler",
    status: "paused",
    lastRun: "1 day ago",
    nextRun: "Paused",
    runsToday: 0,
    successRate: 100,
    description: "Schedules and posts social media content",
  },
  {
    id: "4",
    name: "Data Backup Automation",
    status: "running",
    lastRun: "6 hours ago",
    nextRun: "Tonight 12:00 AM",
    runsToday: 1,
    successRate: 100,
    description: "Automated database backups and validation",
  },
]

export default function AutomationPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500"
      case "paused":
        return "bg-yellow-500"
      case "stopped":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Play className="w-3 h-3" />
      case "paused":
        return <Pause className="w-3 h-3" />
      case "stopped":
        return <Stop className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automation</h1>
          <p className="text-muted-foreground">Create and manage intelligent workflows and task automation</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Automation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+51</span> today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Automations</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeAutomations.map((automation) => (
              <Card key={automation.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(automation.status)}`} />
                      <CardTitle className="text-lg">{automation.name}</CardTitle>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        {getStatusIcon(automation.status)}
                        <span className="capitalize">{automation.status}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{automation.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Last Run:</span>
                      <p className="font-medium">{automation.lastRun}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Next Run:</span>
                      <p className="font-medium">{automation.nextRun}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Runs Today:</span>
                      <p className="font-medium">{automation.runsToday}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Success Rate:</span>
                      <p className="font-medium text-green-600">{automation.successRate}%</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Clone
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationTemplates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <template.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{template.description}</p>

                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Triggers:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.triggers.map((trigger) => (
                          <Badge key={trigger} variant="secondary" className="text-xs">
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Actions:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.actions.map((action) => (
                          <Badge key={action} variant="outline" className="text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" onClick={() => setSelectedTemplate(template.id)}>
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Automation Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeAutomations.map((automation) => (
                    <div key={automation.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{automation.name}</span>
                        <span>{automation.successRate}%</span>
                      </div>
                      <Progress value={automation.successRate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm">Email Newsletter Generator completed successfully</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm">Social Media Scheduler paused by user</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm">Customer Support Bot handled 15 tickets</p>
                      <p className="text-xs text-muted-foreground">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Automation Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>Create New Automation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Automation Name</label>
                <Input placeholder="Enter automation name..." />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Describe what this automation does..." rows={3} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Trigger</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="schedule">Schedule</SelectItem>
                      <SelectItem value="webhook">Webhook</SelectItem>
                      <SelectItem value="email">New Email</SelectItem>
                      <SelectItem value="file">File Upload</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="content">Content</SelectItem>
                      <SelectItem value="data">Data</SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="enabled" />
                <label htmlFor="enabled" className="text-sm">
                  Enable automation immediately
                </label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowCreateForm(false)}>Create Automation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
