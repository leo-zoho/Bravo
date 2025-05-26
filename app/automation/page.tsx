"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { WorkflowBuilder } from "@/components/automation/workflow-builder"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  Settings,
  Copy,
  MoreHorizontal,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  TrendingUp,
} from "lucide-react"
import { WorkflowCreationModal } from "@/components/automation/workflow-creation-modal"

const initialWorkflows = [
  {
    id: "1",
    name: "Daily Email Reports",
    description: "Automatically generate and send daily analytics reports",
    status: "active",
    lastRun: "2 hours ago",
    nextRun: "Tomorrow at 9:00 AM",
    runs: 247,
    successRate: 98.8,
    triggers: ["Schedule"],
    actions: ["Email", "Database"],
  },
  {
    id: "2",
    name: "Slack Notifications",
    description: "Send project updates to team Slack channels",
    status: "active",
    lastRun: "15 minutes ago",
    nextRun: "In 45 minutes",
    runs: 1834,
    successRate: 99.2,
    triggers: ["Webhook"],
    actions: ["Slack", "Database"],
  },
  {
    id: "3",
    name: "Data Backup",
    description: "Backup critical data to cloud storage",
    status: "paused",
    lastRun: "1 day ago",
    nextRun: "Paused",
    runs: 89,
    successRate: 100,
    triggers: ["Schedule"],
    actions: ["File", "Cloud Storage"],
  },
  {
    id: "4",
    name: "Lead Processing",
    description: "Process new leads and assign to sales team",
    status: "error",
    lastRun: "3 hours ago",
    nextRun: "Retrying in 30 minutes",
    runs: 156,
    successRate: 94.2,
    triggers: ["Form Submit"],
    actions: ["CRM", "Email", "Slack"],
  },
]

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [workflows, setWorkflows] = useState(initialWorkflows)

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="w-3 h-3" />
      case "paused":
        return <Pause className="w-3 h-3" />
      case "error":
        return <AlertCircle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const filteredWorkflows = workflows.filter((workflow) =>
    workflow.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automation</h1>
          <p className="text-muted-foreground">Create and manage intelligent workflows and automations</p>
        </div>
        <WorkflowCreationModal onWorkflowCreate={handleWorkflowCreate} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Workflows</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
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
                <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
                <Play className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">Running smoothly</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,326</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.5%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+0.3%</span> improvement
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Workflows */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflows.slice(0, 3).map((workflow) => (
                  <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(workflow.status)}`} />
                      <div>
                        <h3 className="font-medium">{workflow.name}</h3>
                        <p className="text-sm text-muted-foreground">{workflow.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-muted-foreground">Last run: {workflow.lastRun}</span>
                          <span className="text-xs text-muted-foreground">Success: {workflow.successRate}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {workflow.runs} runs
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Search workflows..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Button variant="outline">All Status</Button>
            <Button variant="outline">All Types</Button>
          </div>

          {/* Workflows List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredWorkflows.map((workflow) => (
              <Card key={workflow.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(workflow.status)}`} />
                      <CardTitle className="text-lg">{workflow.name}</CardTitle>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        {getStatusIcon(workflow.status)}
                        <span className="capitalize">{workflow.status}</span>
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
                      <span className="text-muted-foreground">Total runs:</span>
                      <p className="font-medium">{workflow.runs}</p>
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
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <WorkflowBuilder />
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
                  Performance chart would be displayed here
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
