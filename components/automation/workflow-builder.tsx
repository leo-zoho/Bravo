"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Play,
  Plus,
  Trash2,
  Settings,
  Clock,
  Zap,
  Mail,
  Database,
  Globe,
  MessageSquare,
  FileText,
  Calendar,
  ArrowRight,
  Copy,
} from "lucide-react"

const triggerTypes = [
  { value: "schedule", label: "Schedule", icon: Clock, description: "Run on a schedule" },
  { value: "webhook", label: "Webhook", icon: Globe, description: "Trigger via HTTP request" },
  { value: "email", label: "Email", icon: Mail, description: "When email is received" },
  { value: "database", label: "Database", icon: Database, description: "When data changes" },
]

const actionTypes = [
  { value: "email", label: "Send Email", icon: Mail, description: "Send an email message" },
  { value: "slack", label: "Slack Message", icon: MessageSquare, description: "Post to Slack channel" },
  { value: "database", label: "Database Update", icon: Database, description: "Update database records" },
  { value: "api", label: "API Call", icon: Globe, description: "Make HTTP API request" },
  { value: "file", label: "File Operation", icon: FileText, description: "Create or modify files" },
  { value: "ai", label: "AI Processing", icon: Zap, description: "Process with AI models" },
]

interface WorkflowStep {
  id: string
  type: "trigger" | "action"
  category: string
  name: string
  config: Record<string, any>
}

export function WorkflowBuilder() {
  const [workflowName, setWorkflowName] = useState("New Workflow")
  const [isActive, setIsActive] = useState(false)
  const [steps, setSteps] = useState<WorkflowStep[]>([
    {
      id: "1",
      type: "trigger",
      category: "schedule",
      name: "Every Day at 9 AM",
      config: { schedule: "0 9 * * *" },
    },
  ])
  const [selectedStep, setSelectedStep] = useState<string | null>("1")

  const addStep = (type: "trigger" | "action") => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      type,
      category: type === "trigger" ? "webhook" : "email",
      name: type === "trigger" ? "New Trigger" : "New Action",
      config: {},
    }
    setSteps([...steps, newStep])
    setSelectedStep(newStep.id)
  }

  const removeStep = (stepId: string) => {
    setSteps(steps.filter((step) => step.id !== stepId))
    if (selectedStep === stepId) {
      setSelectedStep(null)
    }
  }

  const updateStep = (stepId: string, updates: Partial<WorkflowStep>) => {
    setSteps(steps.map((step) => (step.id === stepId ? { ...step, ...updates } : step)))
  }

  const selectedStepData = steps.find((step) => step.id === selectedStep)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Workflow Canvas */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Input
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="text-lg font-semibold border-none p-0 h-auto"
                />
                <div className="flex items-center space-x-2">
                  <Switch checked={isActive} onCheckedChange={setIsActive} />
                  <Label>{isActive ? "Active" : "Inactive"}</Label>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </Button>
                <Button size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Test Run
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {steps.map((step, index) => {
                const isSelected = selectedStep === step.id
                const stepType = step.type === "trigger" ? triggerTypes : actionTypes
                const stepInfo = stepType.find((t) => t.value === step.category)

                return (
                  <div key={step.id} className="flex items-center space-x-4">
                    <div
                      className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedStep(step.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              step.type === "trigger" ? "bg-green-100" : "bg-blue-100"
                            }`}
                          >
                            {stepInfo?.icon && (
                              <stepInfo.icon
                                className={`w-5 h-5 ${step.type === "trigger" ? "text-green-600" : "text-blue-600"}`}
                              />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{step.name}</h3>
                            <p className="text-sm text-muted-foreground">{stepInfo?.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={step.type === "trigger" ? "default" : "secondary"}>{step.type}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeStep(step.id)
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < steps.length - 1 && <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
                  </div>
                )
              })}

              <div className="flex justify-center space-x-2">
                <Button variant="outline" onClick={() => addStep("trigger")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Trigger
                </Button>
                <Button variant="outline" onClick={() => addStep("action")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Action
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Panel */}
      <div className="space-y-6">
        {selectedStepData ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Configure Step</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Step Name</Label>
                <Input
                  value={selectedStepData.name}
                  onChange={(e) => updateStep(selectedStepData.id, { name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={selectedStepData.category}
                  onValueChange={(value) => updateStep(selectedStepData.id, { category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(selectedStepData.type === "trigger" ? triggerTypes : actionTypes).map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-2">
                          <type.icon className="w-4 h-4" />
                          <span>{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedStepData.category === "schedule" && (
                <div className="space-y-2">
                  <Label>Schedule (Cron)</Label>
                  <Input placeholder="0 9 * * *" />
                  <p className="text-xs text-muted-foreground">Every day at 9 AM</p>
                </div>
              )}

              {selectedStepData.category === "email" && selectedStepData.type === "action" && (
                <>
                  <div className="space-y-2">
                    <Label>To Email</Label>
                    <Input placeholder="recipient@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input placeholder="Email subject" />
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea placeholder="Email content..." rows={4} />
                  </div>
                </>
              )}

              {selectedStepData.category === "webhook" && (
                <>
                  <div className="space-y-2">
                    <Label>Webhook URL</Label>
                    <Input placeholder="https://api.example.com/webhook" />
                  </div>
                  <div className="space-y-2">
                    <Label>Method</Label>
                    <Select defaultValue="POST">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GET">GET</SelectItem>
                        <SelectItem value="POST">POST</SelectItem>
                        <SelectItem value="PUT">PUT</SelectItem>
                        <SelectItem value="DELETE">DELETE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <Button className="w-full">Save Configuration</Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <Settings className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">No Step Selected</h3>
              <p className="text-sm text-muted-foreground">Select a step from the workflow to configure its settings</p>
            </CardContent>
          </Card>
        )}

        {/* Quick Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Mail className="w-4 h-4 mr-2" />
              Email Automation
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Database className="w-4 h-4 mr-2" />
              Data Sync
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Slack Notifications
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Daily Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
