"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Code2, Palette, Zap, Globe, Smartphone, Database } from "lucide-react"

const projectTemplates = [
  {
    id: "react-app",
    name: "React Application",
    description: "Modern React app with TypeScript and Tailwind CSS",
    icon: Code2,
    color: "bg-blue-500",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: "nextjs-app",
    name: "Next.js Application",
    description: "Full-stack Next.js app with API routes",
    icon: Globe,
    color: "bg-black",
    tags: ["Next.js", "React", "API"],
  },
  {
    id: "mobile-app",
    name: "Mobile Application",
    description: "Cross-platform mobile app with React Native",
    icon: Smartphone,
    color: "bg-purple-500",
    tags: ["React Native", "Mobile", "Cross-platform"],
  },
  {
    id: "automation",
    name: "Automation Workflow",
    description: "Intelligent automation and task workflows",
    icon: Zap,
    color: "bg-yellow-500",
    tags: ["Automation", "Workflows", "AI"],
  },
  {
    id: "dashboard",
    name: "Analytics Dashboard",
    description: "Data visualization and analytics dashboard",
    icon: Database,
    color: "bg-green-500",
    tags: ["Analytics", "Charts", "Data"],
  },
  {
    id: "design-system",
    name: "Design System",
    description: "Component library and design system",
    icon: Palette,
    color: "bg-pink-500",
    tags: ["Components", "Design", "UI"],
  },
]

interface ProjectCreationModalProps {
  onProjectCreate: (project: any) => void
}

export function ProjectCreationModal({ onProjectCreate }: ProjectCreationModalProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    template: "",
    framework: "",
    features: [] as string[],
  })

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = projectTemplates.find((t) => t.id === templateId)
    setProjectData((prev) => ({
      ...prev,
      template: templateId,
      name: template?.name || "",
    }))
    setStep(2)
  }

  const handleCreateProject = () => {
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      status: "active",
      progress: 0,
      createdAt: new Date(),
      lastModified: "Just now",
      collaborators: ["You"],
    }

    onProjectCreate(newProject)
    setOpen(false)
    setStep(1)
    setSelectedTemplate(null)
    setProjectData({
      name: "",
      description: "",
      template: "",
      framework: "",
      features: [],
    })
  }

  const selectedTemplateData = projectTemplates.find((t) => t.id === selectedTemplate)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose a template</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectTemplates.map((template) => (
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
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
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
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={projectData.name}
                    onChange={(e) => setProjectData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="My Awesome Project"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    value={projectData.description}
                    onChange={(e) => setProjectData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your project..."
                    rows={3}
                  />
                </div>

                {selectedTemplate === "react-app" || selectedTemplate === "nextjs-app" ? (
                  <div className="space-y-2">
                    <Label>Framework Version</Label>
                    <Select
                      value={projectData.framework}
                      onValueChange={(value) => setProjectData((prev) => ({ ...prev, framework: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select framework version" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="react-18">React 18</SelectItem>
                        <SelectItem value="nextjs-14">Next.js 14</SelectItem>
                        <SelectItem value="nextjs-13">Next.js 13</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : null}
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Features to Include</Label>
                  <div className="mt-2 space-y-2">
                    {["Authentication", "Database", "API Integration", "Real-time Updates", "Analytics", "Testing"].map(
                      (feature) => (
                        <label key={feature} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={projectData.features.includes(feature)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setProjectData((prev) => ({ ...prev, features: [...prev.features, feature] }))
                              } else {
                                setProjectData((prev) => ({
                                  ...prev,
                                  features: prev.features.filter((f) => f !== feature),
                                }))
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">{feature}</span>
                        </label>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleCreateProject} disabled={!projectData.name.trim()}>
                Create Project
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
