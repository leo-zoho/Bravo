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
import { toast } from "@/hooks/use-toast"
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
  ArrowRight,
  Copy,
  Save,
  AlertCircle,
} from "lucide-react"

const triggerTypes = [
  { value: "schedule", label: "Schedule", icon: Clock, description: "Run on a schedule" },
  { value: "webhook", label: "Webhook", icon: Globe, description: "Trigger via HTTP request" },
  { value: "email", label: "Email", icon: Mail, description: "When email is received" },
  { value: "database", label: "Database", icon: Database, description: "When data changes" },
  { value: "form", label: "Form Submit", icon: FileText, description: "When form is submitted" },
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
  isValid: boolean
}

export function WorkflowBuilder() {
  const [workflowName, setWorkflowName] = useState("New Workflow")
  const [isActive, setIsActive] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isTestRunning, setIsTestRunning] = useState(false)
  const [steps, setSteps] = useState<WorkflowStep[]>([
    {
      id: "1",
      type: "trigger",
      category: "schedule",
      name: "Every Day at 9 AM",
      config: { schedule: "0 9 * * *", timezone: "UTC" },
      isValid: true,
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
      isValid: false,
    }
    setSteps([...steps, newStep])
    setSelectedStep(newStep.id)

    toast({
      title: `${type === "trigger" ? "Trigger" : "Action"} Added`,
      description: `New ${type} step has been added to your workflow.`,
    })
  }

  const removeStep = (stepId: string) => {
    if (steps.length <= 1) {
      toast({
        title: "Cannot Remove Step",
        description: "A workflow must have at least one step.",
        variant: "destructive",
      })
      return
    }

    setSteps(steps.filter((step) => step.id !== stepId))
    if (selectedStep === stepId) {
      setSelectedStep(steps.find((s) => s.id !== stepId)?.id || null)
    }

    toast({
      title: "Step Removed",
      description: "The workflow step has been removed.",
    })
  }

  const updateStep = (stepId: string, updates: Partial<WorkflowStep>) => {
    setSteps(steps.map((step) => (step.id === stepId ? { ...step, ...updates } : step)))
  }

  const updateStepConfig = (stepId: string, configKey: string, value: any) => {
    setSteps(
      steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              config: { ...step.config, [configKey]: value },
              isValid: validateStepConfig(step.category, { ...step.config, [configKey]: value }),
            }
          : step,
      ),
    )
  }

  const validateStepConfig = (category: string, config: Record<string, any>): boolean => {
    switch (category) {
      case "schedule":
        return !!config.schedule
      case "webhook":
        return !!config.url
      case "email":
        return !!config.to && !!config.subject
      case "slack":
        return !!config.channel && !!config.message
      case "database":
        return !!config.table && !!config.operation
      case "api":
        return !!config.url && !!config.method
      default:
        return true
    }
  }

  const duplicateWorkflow = () => {
    const duplicatedSteps = steps.map((step) => ({
      ...step,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    }))

    setSteps(duplicatedSteps)
    setWorkflowName(`${workflowName} (Copy)`)
    setSelectedStep(duplicatedSteps[0]?.id || null)

    toast({
      title: "Workflow Duplicated",
      description: "A copy of your workflow has been created.",
    })
  }

  const saveWorkflow = async () => {
    setIsSaving(true)

    // Validate all steps
    const invalidSteps = steps.filter((step) => !step.isValid)
    if (invalidSteps.length > 0) {
      toast({
        title: "Validation Error",
        description: `Please complete configuration for ${invalidSteps.length} step(s).`,
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Workflow Saved",
      description: "Your workflow has been saved successfully.",
    })

    setIsSaving(false)
  }

  const testRun = async () => {
    setIsTestRunning(true)

    // Simulate test run
    await new Promise((resolve) => setTimeout(resolve, 3000))

    toast({
      title: "Test Run Complete",
      description: "Your workflow executed successfully in test mode.",
    })

    setIsTestRunning(false)
  }

  const selectedStepData = steps.find((step) => step.id === selectedStep)
  const hasInvalidSteps = steps.some((step) => !step.isValid)

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
                  className="text-lg font-semibold border-none p-0 h-auto bg-transparent"
                />
                <div className="flex items-center space-x-2">
                  <Switch checked={isActive} onCheckedChange={setIsActive} />
                  <Label>{isActive ? "Active" : "Inactive"}</Label>
                </div>
                {hasInvalidSteps && (
                  <div className="flex items-center space-x-1 text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Incomplete</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={duplicateWorkflow}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </Button>
                <Button size="sm" onClick={testRun} disabled={isTestRunning || hasInvalidSteps}>
                  <Play className="w-4 h-4 mr-2" />
                  {isTestRunning ? "Testing..." : "Test Run"}
                </Button>
                <Button
                  size="sm"
                  onClick={saveWorkflow}
                  disabled={isSaving || hasInvalidSteps}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save"}
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
                      className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : step.isValid
                            ? "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                            : "border-red-200 bg-red-50"
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
                            {!step.isValid && <p className="text-xs text-red-600 mt-1">Configuration required</p>}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={step.type === "trigger" ? "default" : "secondary"}>{step.type}</Badge>
                          {!step.isValid && <AlertCircle className="w-4 h-4 text-red-500" />}
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

              <div className="flex justify-center space-x-2 pt-4">
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
                  onValueChange={(value) => {
                    updateStep(selectedStepData.id, {
                      category: value,
                      config: {},
                      isValid: false,
                    })
                  }}
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

              {/* Schedule Configuration */}
              {selectedStepData.category === "schedule" && (
                <>
                  <div className="space-y-2">
                    <Label>Schedule (Cron Expression)</Label>
                    <Input
                      placeholder="0 9 * * *"
                      value={selectedStepData.config.schedule || ""}
                      onChange={(e) => updateStepConfig(selectedStepData.id, "schedule", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      {selectedStepData.config.schedule === "0 9 * * *" && "Every day at 9 AM"}
                      {selectedStepData.config.schedule === "0 */6 * * *" && "Every 6 hours"}
                      {selectedStepData.config.schedule === "0 0 * * 1" && "Every Monday at midnight"}
                      {!selectedStepData.config.schedule && "Enter a cron expression"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select
                      value={selectedStepData.config.timezone || "UTC"}
                      onValueChange={(value) => updateStepConfig(selectedStepData.id, "timezone", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="Europe/London">London</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Email Action Configuration */}
              {selectedStepData.category === "email" && selectedStepData.type === "action" && (
                <>
                  <div className="space-y-2">
                    <Label>To Email *</Label>
                    <Input
                      placeholder="recipient@example.com"
                      value={selectedStepData.config.to || ""}
                      onChange={(e) => updateStepConfig(selectedStepData.id, "to", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subject *</Label>
                    <Input
                      placeholder="Email subject"
                      value={selectedStepData.config.subject || ""}
                      onChange={(e) => updateStepConfig(selectedStepData.id, "subject", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea
                      placeholder="Email content..."
                      rows={4}
                      value={selectedStepData.config.message || ""}
                      onChange={(e) => updateStepConfig(selectedStepData.id, "message", e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Webhook Configuration */}
              {selectedStepData.category === "webhook" && (
                <>
                  <div className="space-y-2">
                    <Label>Webhook URL *</Label>
                    <Input
                      placeholder="https://api.example.com/webhook"
                      value={selectedStepData.config.url || ""}
                      onChange={(e) => updateStepConfig(selectedStepData.id, "url", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Method</Label>
                    <Select
                      value={selectedStepData.config.method || "POST"}
                      onValueChange={(value) => updateStepConfig(selectedStepData.id, "method", value)}
                    >
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

              {/* Slack Configuration */}
              {selectedStepData.category === "slack" && (
                <>
                  <div className="space-y-2">
                    <Label>Channel *</Label>
                    <Input
                      placeholder="#general"
                      value={selectedStepData.config.channel || ""}
                      onChange={(e) => updateStepConfig(selectedStepData.id, "channel", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Message *</Label>
                    <Textarea
                      placeholder="Slack message..."
                      rows={3}
                      value={selectedStepData.config.message || ""}
                      onChange={(e) => updateStepConfig(selectedStepData.id, "message", e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm">
                  {selectedStepData.isValid ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-green-600">Configuration complete</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-red-600">Configuration required</span>
                    </>
                  )}
                </div>
              </div>
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
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                const emailSteps: WorkflowStep[] = [
                  {
                    id: Date.now().toString(),
                    type: "trigger",
                    category: "schedule",
                    name: "Daily at 9 AM",
                    config: { schedule: "0 9 * * *", timezone: "UTC" },
                    isValid: true,
                  },
                  {
                    id: (Date.now() + 1).toString(),
                    type: "action",
                    category: "email",
                    name: "Send Daily Report",
                    config: { to: "", subject: "Daily Report", message: "Your daily report is ready." },
                    isValid: false,
                  },
                ]
                setSteps(emailSteps)
                setWorkflowName("Daily Email Report")
                setSelectedStep(emailSteps[1].id)
                toast({
                  title: "Template Applied",
                  description: "Email automation template has been loaded.",
                })
              }}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Automation
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                const slackSteps: WorkflowStep[] = [
                  {
                    id: Date.now().toString(),
                    type: "trigger",
                    category: "webhook",
                    name: "Form Submission",
                    config: { url: "", method: "POST" },
                    isValid: false,
                  },
                  {
                    id: (Date.now() + 1).toString(),
                    type: "action",
                    category: "slack",
                    name: "Notify Team",
                    config: { channel: "#general", message: "New form submission received!" },
                    isValid: false,
                  },
                ]
                setSteps(slackSteps)
                setWorkflowName("Slack Notifications")
                setSelectedStep(slackSteps[0].id)
                toast({
                  title: "Template Applied",
                  description: "Slack notification template has been loaded.",
                })
              }}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Slack Notifications
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
