"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Mail, Database, FileText, Zap, Clock, Bot } from "lucide-react"

const automationTemplates = [
  {
    id: "email-processing",
    name: "Email Processing",
    description: "Automatically process and categorize incoming emails",
    icon: Mail,
    color: "bg-blue-500",
    complexity: "Medium",
    triggers: ["Email Received", "Attachment Detected"],
    actions: ["AI Classification", "Auto Response", "Task Creation", "File Organization"],
    useCase: "Process customer support emails and create tickets automatically",
  },
  {
    id: "data-sync",
    name: "Data Synchronization",
    description: "Keep data synchronized between multiple systems",
    icon: Database,
    color: "bg-green-500",
    complexity: "High",
    triggers: ["Database Change", "API Webhook", "Schedule"],
    actions: ["Data Extraction", "Transformation", "Validation", "Sync"],
    useCase: "Sync customer data between CRM and marketing platform",
  },
  {
    id: "document-processing",
    name: "Document Processing",
    description: "Extract and process information from documents",
    icon: FileText,
    color: "bg-purple-500",
    complexity: "High",
    triggers: ["File Upload", "Email Attachment"],
    actions: ["OCR Processing", "Data Extraction", "Validation", "Storage"],
    useCase: "Process invoices and extract key information automatically",
  },
  {
    id: "task-automation",
    name: "Task Automation",
    description: "Automate repetitive tasks and workflows",
    icon: Zap,
    color: "bg-yellow-500",
    complexity: "Low",
    triggers: ["Manual Trigger", "Schedule", "Condition Met"],
    actions: ["Task Execution", "Notification", "Status Update"],
    useCase: "Automate daily report generation and distribution",
  },
  {
    id: "smart-scheduling",
    name: "Smart Scheduling",
    description: "Intelligent scheduling and calendar management",
    icon: Clock,
    color: "bg-indigo-500",
    complexity: "Medium",
    triggers: ["Calendar Event", "Meeting Request"],
    actions: ["Availability Check", "Scheduling", "Notification", "Reminder"],
    useCase: "Automatically schedule meetings based on availability",
  },
  {
    id: "ai-assistant",
    name: "AI Assistant Tasks",
    description: "AI-powered task automation and decision making",
    icon: Bot,
    color: "bg-orange-500",
    complexity: "High",
    triggers: ["Voice Command", "Text Input", "Condition"],
    actions: ["AI Processing", "Decision Making", "Task Execution", "Response"],
    useCase: "AI assistant that handles routine tasks and queries",
  },
]

interface AutomationCreationModalProps {
  onAutomationCreate: (automation: any) => void
}

export function AutomationCreationModal({ onAutomationCreate }: AutomationCreationModalProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [automationData, setAutomationData] = useState({
    name: "",
    description: "",
    template: "",
    triggers: [] as string[],
    actions: [] as string[],
    schedule: "",
    priority: "medium",
    enabled: true,
  })

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = automationTemplates.find((t) => t.id === templateId)
    setAutomationData((prev) => ({
      ...prev,
      template: templateId,
      name: template?.name || "",
      description: template?.description || "",
      triggers: template?.triggers || [],
      actions: template?.actions || [],
    }))
    setStep(2)
  }

  const handleCreateAutomation = () => {
    const template = automationTemplates.find((t) => t.id === selectedTemplate)

    const newAutomation = {
      id: Date.now().toString(),
      ...automationData,
      status: automationData.enabled ? "active" : "draft",
      lastRun: "Never",
      nextRun: automationData.schedule ? "In 1 hour" : "Manual trigger",
      runs: 0,
      successRate: 100,
      createdAt: new Date(),
      complexity: template?.complexity || "Medium",
      useCase: template?.useCase || "",
    }

    onAutomationCreate(newAutomation)
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setStep(1)
    setSelectedTemplate(null)
    setAutomationData({
      name: "",
      description: "",
      template: "",
      triggers: [],
      actions: [],
      schedule: "",
      priority: "medium",
      enabled: true,
    })
  }

  const selectedTemplateData = automationTemplates.find((t) => t.id === selectedTemplate)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Automation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Automation</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose an automation template</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {automationTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-yellow-500"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-12 h-12 rounded-lg ${template.color} flex items-center justify-center`}>
                          <template.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{template.name}</h4>
                          <Badge variant="outline" className="text-xs mt-1">
                            {template.complexity}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{template.description}</p>

                      <div className="bg-muted/50 p-3 rounded-lg mb-4">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Use Case:</p>
                        <p className="text-sm">{template.useCase}</p>
                      </div>

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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && selectedTemplateData && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
              <div className={`w-10 h-10 rounded-lg ${selectedTemplateData.color} flex items-center justify-center`}>
                <selectedTemplateData.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{selectedTemplateData.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedTemplateData.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="automation-name">Automation Name</Label>
                  <Input
                    id="automation-name"
                    value={automationData.name}
                    onChange={(e) => setAutomationData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="My Automation"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="automation-description">Description</Label>
                  <Textarea
                    id="automation-description"
                    value={automationData.description}
                    onChange={(e) => setAutomationData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this automation does..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={automationData.priority}
                    onValueChange={(value) => setAutomationData((prev) => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Schedule (Optional)</Label>
                  <Select
                    value={automationData.schedule}
                    onValueChange={(value) => setAutomationData((prev) => ({ ...prev, schedule: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Trigger-based only" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trigger">Trigger-based only</SelectItem>
                      <SelectItem value="continuous">Continuous monitoring</SelectItem>
                      <SelectItem value="hourly">Every Hour</SelectItem>
                      <SelectItem value="daily">Daily at 9 AM</SelectItem>
                      <SelectItem value="weekly">Weekly on Monday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Automation Components</Label>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-2">Triggers ({automationData.triggers.length})</p>
                      <div className="flex flex-wrap gap-1">
                        {automationData.triggers.map((trigger) => (
                          <Badge key={trigger} variant="outline" className="text-xs">
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-2">Actions ({automationData.actions.length})</p>
                      <div className="flex flex-wrap gap-1">
                        {automationData.actions.map((action) => (
                          <Badge key={action} variant="secondary" className="text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="enabled"
                    checked={automationData.enabled}
                    onChange={(e) => setAutomationData((prev) => ({ ...prev, enabled: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="enabled">Enable automation immediately</Label>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleCreateAutomation} disabled={!automationData.name.trim()}>
                Create Automation
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
