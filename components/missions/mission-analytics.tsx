"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, Activity, Clock, CheckCircle, AlertTriangle, Users, Zap } from "lucide-react"

const missionStatusData = [
  { name: "Active", value: 12, color: "#3b82f6" },
  { name: "Completed", value: 28, color: "#10b981" },
  { name: "Paused", value: 5, color: "#f59e0b" },
  { name: "Failed", value: 2, color: "#ef4444" },
]

const performanceData = [
  { month: "Jan", missions: 15, success: 92, avgTime: 4.2 },
  { month: "Feb", missions: 22, success: 89, avgTime: 3.8 },
  { month: "Mar", missions: 18, success: 94, avgTime: 3.5 },
  { month: "Apr", missions: 25, success: 91, avgTime: 4.1 },
  { month: "May", missions: 30, success: 96, avgTime: 3.2 },
  { month: "Jun", missions: 28, success: 93, avgTime: 3.6 },
]

const agentUtilizationData = [
  { agent: "DataAgent", utilization: 85, tasks: 24 },
  { agent: "MLAgent", utilization: 92, tasks: 18 },
  { agent: "ReportAgent", utilization: 78, tasks: 15 },
  { agent: "ProcessorAgent", utilization: 88, tasks: 21 },
  { agent: "ValidatorAgent", utilization: 76, tasks: 12 },
]

const resourceUsageData = [
  { time: "00:00", cpu: 45, memory: 62, tokens: 1200 },
  { time: "04:00", cpu: 52, memory: 68, tokens: 1450 },
  { time: "08:00", cpu: 78, memory: 85, tokens: 2100 },
  { time: "12:00", cpu: 85, memory: 92, tokens: 2800 },
  { time: "16:00", cpu: 72, memory: 78, tokens: 2200 },
  { time: "20:00", cpu: 58, memory: 65, tokens: 1600 },
]

export function MissionAnalytics() {
  const totalMissions = missionStatusData.reduce((sum, item) => sum + item.value, 0)
  const activeMissions = missionStatusData.find((item) => item.name === "Active")?.value || 0
  const completedMissions = missionStatusData.find((item) => item.name === "Completed")?.value || 0
  const successRate = Math.round((completedMissions / totalMissions) * 100)

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Missions</p>
                <p className="text-2xl font-bold">{totalMissions}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Missions</p>
                <p className="text-2xl font-bold">{activeMissions}</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  Avg 3.4h remaining
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{successRate}%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +3% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Agents</p>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-orange-600 flex items-center mt-1">
                  <AlertTriangle className="w-3 h-3 mr-1" />2 agents offline
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mission Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Mission Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={missionStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {missionStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {missionStatusData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} name="Success Rate (%)" />
                  <Line type="monotone" dataKey="missions" stroke="#3b82f6" strokeWidth={2} name="Total Missions" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="agents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="agents">Agent Utilization</TabsTrigger>
          <TabsTrigger value="resources">Resource Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="agents">
          <Card>
            <CardHeader>
              <CardTitle>Agent Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentUtilizationData.map((agent) => (
                  <div key={agent.agent} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{agent.agent}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{agent.tasks} tasks</Badge>
                        <span className="text-sm">{agent.utilization}%</span>
                      </div>
                    </div>
                    <Progress value={agent.utilization} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resource Usage (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={resourceUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="cpu"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                      name="CPU (%)"
                    />
                    <Area
                      type="monotone"
                      dataKey="memory"
                      stackId="2"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                      name="Memory (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
