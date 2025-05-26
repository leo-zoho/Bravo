"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  Plus,
  Search,
  Mail,
  Database,
  MessageSquare,
  Calendar,
  Shield,
} from "lucide-react"

const automationTemplates = [
  {
    id: "email-automation",
    name: "Email Automation",
    description: "Automatically process and respond to emails",
    icon: Mail,
    color: "bg-blue-500",
    category: "communication",
    complexity: "Medium",
    triggers: ["Email Received", "Schedule"],
    actions: ["AI Processing", "Send Response", "File Attachment"],
  },
  {
    id: "data-sync",
    name: "Data Synchronization",
    description: "Keep data in sync between multiple systems",
    icon: Database,
    color: "bg-green-500",
    category: "data",
    complexity: "High",
    triggers: ["Database Change", "API Webhook"],
    actions: ["Data Transform", "API Call", "Update Records"],
  },
  {
    id: "slack-notifications",
    name: "Slack Notifications",
    description: "Send automated notifications to Slack channels",
    icon: MessageSquare,
    color: "bg-purple-500",
    category: "communication",
    complexity: "Low",
    triggers: ["Threshold Breach", "Schedule", "Manual"],
    actions: ["Format Message", "Send to Slack", "Thread Reply"],
  },
  {
    id: "daily-reports",
    name: "Daily Reports",
    description: "Generate and send daily analytics reports",
    icon: Calendar,
    color: "bg-orange-500",
    category: "reporting",
    complexity: "Medium",
    triggers: ["Schedule"],
    actions: ["Data Collection", "Report Generation", "Email Send"],
  },
  {
    id: "security-monitoring",
    name: "Security Monitoring",
    description: "Monitor for security threats and respond automatically",
    icon: Shield,
    color: "bg-red-500",
    category: "security",
    complexity: "High",
    triggers: ["Log Analysis", "Failed Login", "Anomaly Detection"],
    actions: ["Alert Generation", "Block IP", "Escalate to Team"],
  },
]

const initialAutomations = [
  {
    id: "1",
    name: "Customer Email Responses",
    description: "Automatically categorize and respond to customer emails",
    status: "active",
    lastRun: "5 minutes ago",
    nextRun: "Continuous",
    runs: 1247,
    successRate: 96.8,
    category: "communication",
    triggers: ["Email Received"],
    actions: ["AI Analysis", "Auto Response"],
  },
  {
    id: "2",
    name: "Database Backup",
    description: "Automated daily backup of critical databases",
    status: "active",
    lastRun: "2 hours ago",
    nextRun: "Tomorrow at 2:00 AM",
    runs: 89,
    successRate: 100,
    category: "data",
    triggers: ["Schedule"],
    actions: ["Database Export", "Cloud Upload", "Verify Backup"],
  },
  {
    id: "3",
    name: "Server Health Alerts",
    description: "Monitor server metrics and alert team of issues",
    status: "active",
    lastRun: "1 minute ago",
    nextRun: "Continuous",
    runs: 5432,
    successRate: 99.2,
    category: "monitoring",
    triggers: ["Metric Threshold"],
    actions: ["Slack Alert", "Email Team", "Create Ticket"],
  },
  {
    id: "4",
    name: "Lead Processing",
    description: "Process new leads and assign to sales team",
    status: "paused",
    lastRun: "1 day ago",
    nextRun: "Paused",
    runs: 156,
    successRate: 94.2,
    category: "business",
    triggers: ["Form Submit"],
    actions: ["Lead Scoring", "CRM Update", "Assign Sales Rep"],
  },
]

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [automations, setAutomations] = useState(initialAutomations)

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

  const filteredAutomations = automations.filter((automation) =>
    automation.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automation</h1>
          <p className="text-muted-foreground">Create and manage intelligent task automation</p>
        </div>
        <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Automation
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="automations">Automations</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Automations</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{automations.length}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2</span> this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
                <Play className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{automations.filter((a) => a.status === "active").length}</div>
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
                  {automations.reduce((acc, a) => acc + a.runs, 0).toLocaleString()}
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
                  {Math.round(automations.reduce((acc, a) => acc + a.successRate, 0) / automations.length)}%
                </div>
                <p className="text-xs text-muted-foreground">Excellent performance</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Automations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Automations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automations.slice(0, 3).map((automation) => (
                  <div key={automation.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(automation.status)}`} />
                      <div>
                        <h3 className="font-medium">{automation.name}</h3>
                        <p className="text-sm text-muted-foreground">{automation.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-muted-foreground">Last run: {automation.lastRun}</span>
                          <span className="text-xs text-muted-foreground">Success: {automation.successRate}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {automation.runs} runs
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

        <TabsContent value="automations" className="space-y-6">
          {/* Search */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search automations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">All Status</Button>
            <Button variant="outline">All Categories</Button>
          </div>

          {/* Automations List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredAutomations.map((automation) => (
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
                      <span className="text-muted-foreground">Last run:</span>
                      <p className="font-medium">{automation.lastRun}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Next run:</span>
                      <p className="font-medium">{automation.nextRun}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total runs:</span>
                      <p className="font-medium">{automation.runs}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Success rate:</span>
                      <p className="font-medium">{automation.successRate}%</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-muted-foreground">Triggers:</span>
                      {automation.triggers.map((trigger, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {trigger}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-muted-foreground">Actions:</span>
                      {automation.actions.map((action, index) => (
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

        <TabsContent value="templates" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Automation Templates</h2>
            <p className="text-muted-foreground mb-6">Get started quickly with pre-built automation templates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automationTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg ${template.color} flex items-center justify-center`}>
                      <template.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <Badge variant="outline" className="text-xs mt-1">
                        {template.complexity}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-muted-foreground">Triggers:</span>
                      {template.triggers.slice(0, 2).map((trigger) => (
                        <Badge key={trigger} variant="outline" className="text-xs">
                          {trigger}
                        </Badge>
                      ))}
                      {template.triggers.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.triggers.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-muted-foreground">Actions:</span>
                      {template.actions.slice(0, 2).map((action) => (
                        <Badge key={action} variant="secondary" className="text-xs">
                          {action}
                        </Badge>
                      ))}
                      {template.actions.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.actions.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button className="w-full mt-4" variant="outline">
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
