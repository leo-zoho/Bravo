"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { WorkflowCreationModal } from "@/components/workflows/workflow-creation-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Play,
  Settings,
  Copy,
  MoreHorizontal,
  CheckCircle,
  Workflow,
  TrendingUp,
  Database,
  MessageSquare,
  Users,
  Shield,
  Brain,
} from "lucide-react"

const initialWorkflows = [
  {
    id: "1",
    name: "Customer Data ETL",
    description: "Extract customer data from CRM and sync to analytics platform",
    category: "data",
    status: "active",
    lastRun: "2 hours ago",
    nextRun: "Tomorrow at 2:00 AM",
    runs: 156,
    successRate: 98.7,
    priority: "high",
    triggers: ["Schedule", "API Webhook"],
    actions: ["Data Extraction", "Transformation", "Database Insert"],
    categoryColor: "bg-blue-500",
  },
  {
    id: "2",
    name: "Support Ticket Routing",
    description: "Automatically route support tickets based on content analysis",
    category: "ai",
    status: "active",
    lastRun: "15 minutes ago",
    nextRun: "Continuous",
    runs: 2341,
    successRate: 94.2,
    priority: "critical",
    triggers: ["Ticket Creation", "Email Received"],
    actions: ["AI Analysis", "Category Classification", "Agent Assignment"],
    categoryColor: "bg-indigo-500",
  },
  {
    id: "3",
    name: "Weekly Sales Reports",
    description: "Generate and distribute weekly sales performance reports",
    category: "business",
    status: "active",
    lastRun: "3 days ago",
    nextRun: "Monday at 9:00 AM",
    runs: 24,
    successRate: 100,
    priority: "medium",
    triggers: ["Schedule"],
    actions: ["Data Aggregation", "Report Generation", "Email Distribution"],
    categoryColor: "bg-purple-500",
  },
  {
    id: "4",
    name: "Security Alert System",
    description: "Monitor for security threats and send immediate alerts",
    category: "monitoring",
    status: "active",
    lastRun: "5 minutes ago",
    nextRun: "Continuous",
    runs: 8934,
    successRate: 99.8,
    priority: "critical",
    triggers: ["Log Analysis", "Threshold Breach"],
    actions: ["Threat Detection", "Alert Generation", "Escalation"],
    categoryColor: "bg-red-500",
  },
]

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState(initialWorkflows)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")

  const handleWorkflowCreate = (newWorkflow: any) => {
    setWorkflows((prev) => [newWorkflow, ...prev])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "paused":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
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

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch =
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || workflow.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Design and manage complex business process workflows</p>
        </div>
        <WorkflowCreationModal onWorkflowCreate={handleWorkflowCreate} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workflows">All Workflows</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
                <Workflow className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{workflows.length}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3</span> this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
                <Play className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{workflows.filter((w) => w.status === "active").length}</div>
                <p className="text-xs text-muted-foreground">Running smoothly</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Executions</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {workflows.reduce((acc, w) => acc + w.runs, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+15%</span> this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Success Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(workflows.reduce((acc, w) => acc + w.successRate, 0) / workflows.length)}%
                </div>
                <p className="text-xs text-muted-foreground">Excellent performance</p>
              </CardContent>
            </Card>
          </div>

          {/* Category Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                id: "data",
                name: "Data Processing",
                icon: Database,
                color: "bg-blue-500",
                count: workflows.filter((w) => w.category === "data").length,
              },
              {
                id: "communication",
                name: "Communication",
                icon: MessageSquare,
                color: "bg-green-500",
                count: workflows.filter((w) => w.category === "communication").length,
              },
              {
                id: "business",
                name: "Business Process",
                icon: Users,
                color: "bg-purple-500",
                count: workflows.filter((w) => w.category === "business").length,
              },
              {
                id: "monitoring",
                name: "Monitoring",
                icon: Shield,
                color: "bg-red-500",
                count: workflows.filter((w) => w.category === "monitoring").length,
              },
              {
                id: "ai",
                name: "AI & ML",
                icon: Brain,
                color: "bg-indigo-500",
                count: workflows.filter((w) => w.category === "ai").length,
              },
            ].map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center`}>
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-muted-foreground">{category.count} workflows</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Workflow Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflows.slice(0, 4).map((workflow) => (
                  <div key={workflow.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(workflow.status)}`} />
                      <div>
                        <p className="font-medium">{workflow.name}</p>
                        <p className="text-sm text-muted-foreground">Last run: {workflow.lastRun}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getPriorityColor(workflow.priority)}>
                        {workflow.priority}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {workflow.successRate}% success
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search workflows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="data">Data Processing</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="business">Business Process</SelectItem>
                <SelectItem value="monitoring">Monitoring</SelectItem>
                <SelectItem value="ai">AI & ML</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Workflows Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredWorkflows.map((workflow) => (
              <Card key={workflow.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(workflow.status)}`} />
                      <div>
                        <CardTitle className="text-lg">{workflow.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className={getPriorityColor(workflow.priority)}>
                            {workflow.priority}
                          </Badge>
                          <span className="text-sm text-muted-foreground capitalize">{workflow.status}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{workflow.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Last run:</span>
                      <p className="font-medium">{workflow.lastRun}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Next run:</span>
                      <p className="font-medium">{workflow.nextRun}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Executions:</span>
                      <p className="font-medium">{workflow.runs.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Success rate:</span>
                      <p className="font-medium">{workflow.successRate}%</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-muted-foreground">Triggers:</span>
                      {workflow.triggers.map((trigger, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {trigger}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-muted-foreground">Actions:</span>
                      {workflow.actions.map((action, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Button size="sm" variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Run Now
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredWorkflows.length === 0 && (
            <div className="text-center py-12">
              <Workflow className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No workflows found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Try adjusting your search terms" : "Create your first workflow to get started"}
              </p>
              {!searchQuery && <WorkflowCreationModal onWorkflowCreate={handleWorkflowCreate} />}
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Workflow Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <TrendingUp className="w-8 h-8 mr-2" />
                  Performance analytics would be displayed here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success Rate Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <CheckCircle className="w-8 h-8 mr-2" />
                  Success rate trends would be displayed here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
