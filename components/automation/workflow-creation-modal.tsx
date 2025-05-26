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
import { Plus, Clock, Mail, Database, MessageSquare } from "lucide-react"

const workflowTemplates = [
  {
    id: "email-automation",
    name: "Email Automation",
    description: "Automatically process and respond to emails",
    icon: Mail,
    color: "bg-blue-500",
    triggers: ["Email Received"],
    actions: ["AI Processing", "Send Response"],
  },
  {
    id: "data-sync",
    name: "Data Synchronization",
    description: "Keep data in sync between multiple systems",
    icon: Database,
    color: "bg-green-500",
    triggers: ["Database Change"],
    actions: ["API Call", "Update Records"],
  },
  {
    id: "slack-notifications",
    name: "Slack Notifications",
    description: "Send automated notifications to Slack channels",
    icon: MessageSquare,
    color: "bg-purple-500",
    triggers: ["Webhook", "Schedule"],
    actions: ["Slack Message", "Format Data"],
  },
  {
    id: "daily-reports",
    name: "Daily Reports",
    description: "Generate and send daily analytics reports",
    icon: Clock,
    color: "bg-orange-500",
    triggers: ["Schedule"],
    actions: ["Generate Report", "Email", "Save to Database"],
  },
]

interface WorkflowCreationModalProps {
  onWorkflowCreate: (workflow: any) => void
}

export function WorkflowCreationModal({ onWorkflowCreate }: WorkflowCreationModalProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [workflowData, setWorkflowData] = useState({
    name: "",
    description: "",
    template: "",
    schedule: "",
    enabled: true,
  })

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = workflowTemplates.find((t) => t.id === templateId)
    setWorkflowData((prev) => ({
      ...prev,
      template: templateId,
      name: template?.name || "",
      description: template?.description || "",
    }))
    setStep(2)
  }

  const handleCreateWorkflow = () => {
    const newWorkflow = {
      id: Date.now().toString(),
      ...workflowData,
      status: workflowData.enabled ? "active" : "paused",
      lastRun: "Never",
      nextRun: workflowData.schedule ? "In 1 hour" : "Manual trigger",
      runs: 0,
      successRate: 100,
      createdAt: new Date(),
    }

    onWorkflowCreate(newWorkflow)
    setOpen(false)
    setStep(1)
    setSelectedTemplate(null)
    setWorkflowData({
      name: "",
      description: "",
      template: "",
      schedule: "",
      enabled: true,
    })
  }

  const selectedTemplateData = workflowTemplates.find((t) => t.id === selectedTemplate)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Workflow
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Workflow</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose a workflow template</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workflowTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-500"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg ${template.color} flex items-center justify-center`}>
                          <template.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{template.name}</h4>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs text-muted-foreground">Triggers:</span>
                          {template.triggers.map((trigger) => (
                            <Badge key={trigger} variant="outline" className="text-xs">
                              {trigger}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          <span className="text-xs text-muted-foreground">Actions:</span>
                          {template.actions.map((action) => (
                            <Badge key={action} variant="secondary" className="text-xs">
                              {action}
                            </Badge>
                          ))}
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

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workflow-name">Workflow Name</Label>
                <Input
                  id="workflow-name"
                  value={workflowData.name}
                  onChange={(e) => setWorkflowData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="My Automation Workflow"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workflow-description">Description</Label>
                <Textarea
                  id="workflow-description"
                  value={workflowData.description}
                  onChange={(e) => setWorkflowData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this workflow does..."
                  rows={3}
                />
              </div>

              {selectedTemplate === "daily-reports" || selectedTemplate === "slack-notifications" ? (
                <div className="space-y-2">
                  <Label>Schedule</Label>
                  <Select
                    value={workflowData.schedule}
                    onValueChange={(value) => setWorkflowData((prev) => ({ ...prev, schedule: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Every Hour</SelectItem>
                      <SelectItem value="daily">Daily at 9 AM</SelectItem>
                      <SelectItem value="weekly">Weekly on Monday</SelectItem>
                      <SelectItem value="monthly">Monthly on 1st</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : null}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="enabled"
                  checked={workflowData.enabled}
                  onChange={(e) => setWorkflowData((prev) => ({ ...prev, enabled: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="enabled">Enable workflow immediately</Label>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleCreateWorkflow} disabled={!workflowData.name.trim()}>
                Create Workflow
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
