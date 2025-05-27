"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Play,
  Pause,
  Zap,
  Brain,
  Target,
  Clock,
  Users,
  AlertTriangle,
  Activity,
  Lightbulb,
  TrendingUp,
} from "lucide-react"

interface MissionObjective {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed" | "blocked"
  progress: number
  assignedAgents: string[]
  estimatedTime: string
  dependencies: string[]
}

interface AIInsight {
  id: string
  type: "recommendation" | "alert" | "optimization"
  title: string
  description: string
  confidence: number
  timestamp: Date
}

export function MissionCanvas() {
  const [missionGoal, setMissionGoal] = useState("")
  const [missionStatus, setMissionStatus] = useState<"idle" | "planning" | "executing" | "paused" | "completed">("idle")
  const [objectives, setObjectives] = useState<MissionObjective[]>([])
  const [insights, setInsights] = useState<AIInsight[]>([
    {
      id: "1",
      type: "recommendation",
      title: "Optimize Resource Allocation",
      description: "Consider allocating additional compute resources to Task 3 for 15% faster completion",
      confidence: 0.87,
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "alert",
      title: "Dependency Risk Detected",
      description: "Task 2 dependency on external API may cause delays. Backup strategy recommended",
      confidence: 0.92,
      timestamp: new Date(),
    },
  ])

  const canvasRef = useRef<HTMLDivElement>(null)

  const handleGenerateMission = useCallback(async () => {
    if (!missionGoal.trim()) return

    setMissionStatus("planning")

    // Simulate API call to drone1 HumanObjectiveHub and GoalInterpreter
    setTimeout(() => {
      const generatedObjectives: MissionObjective[] = [
        {
          id: "obj-1",
          title: "Data Collection Phase",
          description: "Gather and validate required data sources",
          status: "pending",
          progress: 0,
          assignedAgents: ["DataAgent-001", "ValidatorAgent-002"],
          estimatedTime: "2 hours",
          dependencies: [],
        },
        {
          id: "obj-2",
          title: "Analysis & Processing",
          description: "Process collected data using ML models",
          status: "pending",
          progress: 0,
          assignedAgents: ["MLAgent-003", "ProcessorAgent-004"],
          estimatedTime: "4 hours",
          dependencies: ["obj-1"],
        },
        {
          id: "obj-3",
          title: "Report Generation",
          description: "Generate comprehensive mission report",
          status: "pending",
          progress: 0,
          assignedAgents: ["ReportAgent-005"],
          estimatedTime: "1 hour",
          dependencies: ["obj-2"],
        },
      ]

      setObjectives(generatedObjectives)
      setMissionStatus("idle")
    }, 2000)
  }, [missionGoal])

  const handleExecuteMission = useCallback(() => {
    setMissionStatus("executing")
    // Simulate mission execution with progress updates
    let currentObjective = 0
    const interval = setInterval(() => {
      setObjectives((prev) => {
        const updated = [...prev]
        if (updated[currentObjective]) {
          updated[currentObjective].status = "in-progress"
          updated[currentObjective].progress += 20

          if (updated[currentObjective].progress >= 100) {
            updated[currentObjective].status = "completed"
            updated[currentObjective].progress = 100
            currentObjective++
          }
        }

        if (currentObjective >= updated.length) {
          clearInterval(interval)
          setMissionStatus("completed")
        }

        return updated
      })
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "blocked":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "recommendation":
        return <Lightbulb className="w-4 h-4" />
      case "alert":
        return <AlertTriangle className="w-4 h-4" />
      case "optimization":
        return <TrendingUp className="w-4 h-4" />
      default:
        return <Brain className="w-4 h-4" />
    }
  }

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Mission Definition */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Mission Definition</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe your mission goal in natural language... (e.g., 'Analyze customer feedback data and generate actionable insights for product improvement')"
            value={missionGoal}
            onChange={(e) => setMissionGoal(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex space-x-2">
            <Button
              onClick={handleGenerateMission}
              disabled={!missionGoal.trim() || missionStatus === "planning"}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              {missionStatus === "planning" ? (
                <>
                  <Brain className="w-4 h-4 mr-2 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Generate Mission Plan
                </>
              )}
            </Button>
            {objectives.length > 0 && (
              <Button onClick={handleExecuteMission} disabled={missionStatus === "executing"} variant="outline">
                {missionStatus === "executing" ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Executing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Execute Mission
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mission Plan */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Mission Plan</span>
                <Badge variant={missionStatus === "executing" ? "default" : "secondary"}>
                  {missionStatus.charAt(0).toUpperCase() + missionStatus.slice(1)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                {objectives.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Define a mission goal to generate your plan</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {objectives.map((objective, index) => (
                      <Card
                        key={objective.id}
                        className="border-l-4"
                        style={{ borderLeftColor: getStatusColor(objective.status).replace("bg-", "#") }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold">{objective.title}</h4>
                              <p className="text-sm text-muted-foreground">{objective.description}</p>
                            </div>
                            <Badge variant="outline" className="ml-2">
                              {objective.status}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <Progress value={objective.progress} className="h-2" />

                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {objective.estimatedTime}
                                </span>
                                <span className="flex items-center">
                                  <Users className="w-3 h-3 mr-1" />
                                  {objective.assignedAgents.length} agents
                                </span>
                              </div>
                              <span>{objective.progress}% complete</span>
                            </div>

                            {objective.assignedAgents.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {objective.assignedAgents.map((agent) => (
                                  <Badge key={agent} variant="secondary" className="text-xs">
                                    {agent}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Panel */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>AI Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="insights" className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                  <TabsTrigger value="agents">Agents</TabsTrigger>
                </TabsList>

                <TabsContent value="insights" className="mt-4">
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {insights.map((insight) => (
                        <Card key={insight.id} className="p-3">
                          <div className="flex items-start space-x-2">
                            <div
                              className={`p-1 rounded ${
                                insight.type === "alert"
                                  ? "bg-red-100 text-red-600"
                                  : insight.type === "recommendation"
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-green-100 text-green-600"
                              }`}
                            >
                              {getInsightIcon(insight.type)}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{insight.title}</h5>
                              <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                              <div className="flex items-center justify-between mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {Math.round(insight.confidence * 100)}% confidence
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {insight.timestamp.toLocaleTimeString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="agents" className="mt-4">
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      <Card className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-sm">Agent Swarm Status</h5>
                            <p className="text-xs text-muted-foreground">5 agents active</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs">Healthy</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-sm">Resource Usage</h5>
                            <p className="text-xs text-muted-foreground">CPU: 45% | Memory: 62%</p>
                          </div>
                          <Activity className="w-4 h-4 text-blue-500" />
                        </div>
                      </Card>

                      <Card className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-sm">API Tokens</h5>
                            <p className="text-xs text-muted-foreground">2,847 / 10,000 used</p>
                          </div>
                          <Progress value={28.47} className="w-16 h-2" />
                        </div>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
