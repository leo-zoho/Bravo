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
import { Plus, Database, MessageSquare, Brain, Shield, Users } from "lucide-react"

const workflowCategories = [
  {
    id: "data",
    name: "Data Processing",
    description: "ETL, data transformation, and analysis workflows",
    icon: Database,
    color: "bg-blue-500",
    templates: [
      {
        id: "etl-pipeline",
        name: "ETL Pipeline",
        description: "Extract, transform, and load data between systems",
        complexity: "Medium",
        triggers: ["Schedule", "File Upload", "API Call"],
        actions: ["Data Extraction", "Transformation", "Database Insert", "Notifications"],
        useCase: "Sync customer data from CRM to analytics platform daily",
      },
      {
        id: "data-validation",
        name: "Data Validation",
        description: "Validate and clean incoming data streams",
        complexity: "Low",
        triggers: ["Webhook", "Database Change"],
        actions: ["Validation Rules", "Error Logging", "Data Cleaning", "Alerts"],
        useCase: "Validate user registrations and flag suspicious entries",
      },
      {
        id: "report-generation",
        name: "Automated Reports",
        description: "Generate and distribute periodic reports",
        complexity: "Medium",
        triggers: ["Schedule", "Manual Trigger"],
        actions: ["Data Aggregation", "Chart Generation", "PDF Creation", "Email Distribution"],
        useCase: "Weekly sales reports sent to management team",
      },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    description: "Email, messaging, and notification workflows",
    icon: MessageSquare,
    color: "bg-green-500",
    templates: [
      {
        id: "email-campaign",
        name: "Email Campaign",
        description: "Automated email marketing and follow-ups",
        complexity: "Medium",
        triggers: ["User Action", "Schedule", "Segment Update"],
        actions: ["Email Composition", "Personalization", "Send Email", "Track Opens"],
        useCase: "Welcome series for new users with personalized content",
      },
      {
        id: "slack-integration",
        name: "Slack Notifications",
        description: "Send alerts and updates to Slack channels",
        complexity: "Low",
        triggers: ["System Alert", "Threshold Breach", "Manual Trigger"],
        actions: ["Format Message", "Channel Selection", "Send to Slack", "Thread Management"],
        useCase: "Alert dev team when server CPU usage exceeds 80%",
      },
      {
        id: "customer-support",
        name: "Support Automation",
        description: "Automate customer support ticket routing",
        complexity: "High",
        triggers: ["Ticket Creation", "Email Received"],
        actions: ["Sentiment Analysis", "Category Classification", "Agent Assignment", "Auto-Response"],
        useCase: "Route support tickets to appropriate teams based on content",
      },
    ],
  },
  {
    id: "business",
    name: "Business Process",
    description: "Approval workflows, task management, and operations",
    icon: Users,
    color: "bg-purple-500",
    templates: [
      {
        id: "approval-workflow",
        name: "Approval Process",
        description: "Multi-step approval workflows with escalation",
        complexity: "High",
        triggers: ["Form Submission", "Request Creation"],
        actions: ["Approval Request", "Escalation Logic", "Status Updates", "Final Notification"],
        useCase: "Expense approval workflow with manager and finance review",
      },
      {
        id: "onboarding",
        name: "Employee Onboarding",
        description: "Automate new employee setup and training",
        complexity: "Medium",
        triggers: ["HR System Update", "Start Date"],
        actions: ["Account Creation", "Access Provisioning", "Training Assignment", "Welcome Email"],
        useCase: "Complete onboarding checklist for new hires",
      },
      {
        id: "invoice-processing",
        name: "Invoice Processing",
        description: "Automated invoice handling and payment",
        complexity: "High",
        triggers: ["Invoice Receipt", "Email Attachment"],
        actions: ["OCR Processing", "Data Extraction", "Approval Routing", "Payment Processing"],
        useCase: "Process vendor invoices from email to payment automatically",
      },
    ],
  },
  {
    id: "monitoring",
    name: "Monitoring & Alerts",
    description: "System monitoring, health checks, and alerting",
    icon: Shield,
    color: "bg-red-500",
    templates: [
      {
        id: "health-monitoring",
        name: "System Health Check",
        description: "Monitor system health and performance metrics",
        complexity: "Medium",
        triggers: ["Schedule", "Threshold Breach"],
        actions: ["Health Check", "Metric Collection", "Alert Generation", "Dashboard Update"],
        useCase: "Monitor website uptime and alert team if down for >5 minutes",
      },
      {
        id: "security-monitoring",
        name: "Security Alerts",
        description: "Monitor for security threats and anomalies",
        complexity: "High",
        triggers: ["Log Analysis", "Failed Login", "Suspicious Activity"],
        actions: ["Threat Detection", "Risk Assessment", "Alert Escalation", "Auto-Response"],
        useCase: "Detect and respond to potential security breaches",
      },
      {
        id: "performance-tracking",
        name: "Performance Tracking",
        description: "Track KPIs and business metrics",
        complexity: "Medium",
        triggers: ["Schedule", "Data Update"],
        actions: ["Metric Calculation", "Trend Analysis", "Threshold Checking", "Report Generation"],
        useCase: "Track daily active users and alert if 20% drop detected",
      },
    ],
  },
  {
    id: "ai",
    name: "AI & Machine Learning",
    description: "AI-powered workflows and intelligent automation",
    icon: Brain,
    color: "bg-indigo-500",
    templates: [
      {
        id: "content-moderation",
        name: "Content Moderation",
        description: "AI-powered content review and moderation",
        complexity: "High",
        triggers: ["Content Upload", "User Report"],
        actions: ["AI Analysis", "Content Scoring", "Auto-Moderation", "Human Review Queue"],
        useCase: "Automatically moderate user-generated content for policy violations",
      },
      {
        id: "sentiment-analysis",
        name: "Sentiment Analysis",
        description: "Analyze customer feedback and social mentions",
        complexity: "Medium",
        triggers: ["Review Submission", "Social Mention", "Survey Response"],
        actions: ["Text Analysis", "Sentiment Scoring", "Category Classification", "Alert Generation"],
        useCase: "Monitor product reviews and alert team to negative sentiment trends",
      },
      {
        id: "predictive-maintenance",
        name: "Predictive Maintenance",
        description: "Predict equipment failures using ML models",
        complexity: "High",
        triggers: ["Sensor Data", "Schedule"],
        actions: ["Data Processing", "ML Prediction", "Risk Assessment", "Maintenance Scheduling"],
        useCase: "Predict when manufacturing equipment needs maintenance",
      },
    ],
  },
]

interface WorkflowCreationModalProps {
  onWorkflowCreate: (workflow: any) => void
}

export function WorkflowCreationModal({ onWorkflowCreate }: WorkflowCreationModalProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [workflowData, setWorkflowData] = useState({
    name: "",
    description: "",
    category: "",
    template: "",
    triggers: [] as string[],
    actions: [] as string[],
    schedule: "",
    priority: "medium",
    enabled: true,
  })

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setWorkflowData((prev) => ({ ...prev, category: categoryId }))
    setStep(2)
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const category = workflowCategories.find((c) => c.id === selectedCategory)
    const template = category?.templates.find((t) => t.id === templateId)
    setWorkflowData((prev) => ({
      ...prev,
      template: templateId,
      name: template?.name || "",
      description: template?.description || "",
      triggers: template?.triggers || [],
      actions: template?.actions || [],
    }))
    setStep(3)
  }

  const handleCreateWorkflow = () => {
    const category = workflowCategories.find((c) => c.id === selectedCategory)
    const template = category?.templates.find((t) => t.id === selectedTemplate)

    const newWorkflow = {
      id: Date.now().toString(),
      ...workflowData,
      status: workflowData.enabled ? "active" : "draft",
      lastRun: "Never",
      nextRun: workflowData.schedule ? "In 1 hour" : "Manual trigger",
      runs: 0,
      successRate: 100,
      createdAt: new Date(),
      categoryIcon: category?.icon,
      categoryColor: category?.color,
      complexity: template?.complexity || "Medium",
      useCase: template?.useCase || "",
    }

    onWorkflowCreate(newWorkflow)
    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setStep(1)
    setSelectedCategory(null)
    setSelectedTemplate(null)
    setWorkflowData({
      name: "",
      description: "",
      category: "",
      template: "",
      triggers: [],
      actions: [],
      schedule: "",
      priority: "medium",
      enabled: true,
    })
  }

  const selectedCategoryData = workflowCategories.find((c) => c.id === selectedCategory)
  const selectedTemplateData = selectedCategoryData?.templates.find((t) => t.id === selectedTemplate)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Workflow
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Workflow</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">What type of workflow do you need?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workflowCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-purple-500 group"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{category.name}</h4>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {category.templates.length} templates
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && selectedCategoryData && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
              <div className={`w-10 h-10 rounded-lg ${selectedCategoryData.color} flex items-center justify-center`}>
                <selectedCategoryData.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{selectedCategoryData.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedCategoryData.description}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Choose a workflow template</h3>
              <div className="space-y-4">
                {selectedCategoryData.templates.map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-purple-500"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{template.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {template.complexity}
                        </Badge>
                      </div>

                      <div className="bg-muted/50 p-3 rounded-lg mb-4">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Use Case:</p>
                        <p className="text-sm">{template.useCase}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Triggers:</p>
                          <div className="flex flex-wrap gap-1">
                            {template.triggers.map((trigger) => (
                              <Badge key={trigger} variant="outline" className="text-xs">
                                {trigger}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Actions:</p>
                          <div className="flex flex-wrap gap-1">
                            {template.actions.slice(0, 3).map((action) => (
                              <Badge key={action} variant="secondary" className="text-xs">
                                {action}
                              </Badge>
                            ))}
                            {template.actions.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{template.actions.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
            </div>
          </div>
        )}

        {step === 3 && selectedTemplateData && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
              <div className={`w-10 h-10 rounded-lg ${selectedCategoryData?.color} flex items-center justify-center`}>
                {selectedCategoryData?.icon && <selectedCategoryData.icon className="w-5 h-5 text-white" />}
              </div>
              <div>
                <h3 className="font-semibold">{selectedTemplateData.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedTemplateData.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="workflow-name">Workflow Name</Label>
                  <Input
                    id="workflow-name"
                    value={workflowData.name}
                    onChange={(e) => setWorkflowData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="My Workflow"
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

                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={workflowData.priority}
                    onValueChange={(value) => setWorkflowData((prev) => ({ ...prev, priority: value }))}
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
                    value={workflowData.schedule}
                    onValueChange={(value) => setWorkflowData((prev) => ({ ...prev, schedule: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Manual trigger only" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual trigger only</SelectItem>
                      <SelectItem value="hourly">Every Hour</SelectItem>
                      <SelectItem value="daily">Daily at 9 AM</SelectItem>
                      <SelectItem value="weekly">Weekly on Monday</SelectItem>
                      <SelectItem value="monthly">Monthly on 1st</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Workflow Components</Label>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-2">Triggers ({workflowData.triggers.length})</p>
                      <div className="flex flex-wrap gap-1">
                        {workflowData.triggers.map((trigger) => (
                          <Badge key={trigger} variant="outline" className="text-xs">
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-2">Actions ({workflowData.actions.length})</p>
                      <div className="flex flex-wrap gap-1">
                        {workflowData.actions.map((action) => (
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
                    checked={workflowData.enabled}
                    onChange={(e) => setWorkflowData((prev) => ({ ...prev, enabled: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="enabled">Enable workflow immediately</Label>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)}>
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
