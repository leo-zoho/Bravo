"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Target, FileText, Upload, Link, Sparkles, MessageSquare, Plus, X, CheckCircle, ArrowRight } from "lucide-react"

interface ProjectDefinitionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedItem: any
  onProjectCreate: (project: any) => void
}

export function ProjectDefinitionModal({
  open,
  onOpenChange,
  selectedItem,
  onProjectCreate,
}: ProjectDefinitionModalProps) {
  const [step, setStep] = useState(1)
  const [projectData, setProjectData] = useState({
    name: selectedItem?.name || "",
    description: "",
    objectives: [""],
    references: [""],
    assets: [] as Array<{ type: "file" | "url"; name: string; url?: string }>,
    outputs: [""],
    timeline: "",
    priority: "medium",
    team: [""],
    requirements: "",
    constraints: "",
    successCriteria: "",
    useAI: true,
    aiPlan: "",
    approvedPlan: false,
  })

  const addField = (field: "objectives" | "references" | "outputs" | "team") => {
    setProjectData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }))
  }

  const updateField = (field: "objectives" | "references" | "outputs" | "team", index: number, value: string) => {
    setProjectData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const removeField = (field: "objectives" | "references" | "outputs" | "team", index: number) => {
    setProjectData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }))
  }

  const generateAIPlan = async () => {
    // Simulate AI plan generation
    const mockPlan = `## Project Plan: ${projectData.name}

### Phase 1: Planning & Setup (Week 1)
- Set up development environment
- Create project structure
- Define technical architecture
- Set up version control and CI/CD

### Phase 2: Core Development (Weeks 2-3)
- Implement core functionality
- Build user interface components
- Integrate APIs and data sources
- Implement authentication system

### Phase 3: Testing & Refinement (Week 4)
- Unit and integration testing
- User acceptance testing
- Performance optimization
- Bug fixes and refinements

### Phase 4: Deployment & Launch (Week 5)
- Production deployment
- Documentation completion
- User training materials
- Go-live and monitoring

### Key Deliverables:
${projectData.outputs
  .filter((o) => o.trim())
  .map((output) => `- ${output}`)
  .join("\n")}

### Success Metrics:
- ${projectData.successCriteria || "User adoption and satisfaction"}
- Performance benchmarks met
- All objectives achieved

### Recommended Tools:
- AI Development for rapid prototyping
- Visual Editor for UI design
- Collaboration tools for team coordination`

    setProjectData((prev) => ({ ...prev, aiPlan: mockPlan }))
  }

  const handleCreateProject = () => {
    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      category: selectedItem?.category || "app",
      template: selectedItem?.id,
      status: "planning",
      progress: 0,
      createdAt: new Date(),
      lastModified: "Just now",
      collaborators: projectData.team.filter((t) => t.trim()),
      categoryIcon: selectedItem?.icon,
      categoryColor: "bg-blue-500",
      complexity: selectedItem?.complexity || "Medium",
      timeEstimate: selectedItem?.timeEstimate || "2-4 weeks",
    }

    onProjectCreate(newProject)
    onOpenChange(false)

    // Navigate to project view
    window.location.href = `/projects/${newProject.id}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-blue-600" />
            <span>Define Your Project</span>
            <Badge variant="secondary">{selectedItem?.name}</Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={step.toString()} onValueChange={(value) => setStep(Number.parseInt(value))} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="1">Project Details</TabsTrigger>
            <TabsTrigger value="2">Resources & Assets</TabsTrigger>
            <TabsTrigger value="3">AI Planning</TabsTrigger>
          </TabsList>

          <TabsContent value="1" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={projectData.name}
                    onChange={(e) => setProjectData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter project name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={projectData.description}
                    onChange={(e) => setProjectData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your project..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Project Objectives</Label>
                  {projectData.objectives.map((objective, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={objective}
                        onChange={(e) => updateField("objectives", index, e.target.value)}
                        placeholder="Enter objective..."
                      />
                      {projectData.objectives.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeField("objectives", index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addField("objectives")} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Objective
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Expected Outputs</Label>
                  {projectData.outputs.map((output, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={output}
                        onChange={(e) => updateField("outputs", index, e.target.value)}
                        placeholder="Enter expected output..."
                      />
                      {projectData.outputs.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeField("outputs", index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addField("outputs")} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Output
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={projectData.priority}
                      onValueChange={(value) => setProjectData((prev) => ({ ...prev, priority: value }))}
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

                  <div className="space-y-2">
                    <Label>Timeline</Label>
                    <Select
                      value={projectData.timeline}
                      onValueChange={(value) => setProjectData((prev) => ({ ...prev, timeline: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-week">1 Week</SelectItem>
                        <SelectItem value="2-weeks">2 Weeks</SelectItem>
                        <SelectItem value="1-month">1 Month</SelectItem>
                        <SelectItem value="3-months">3 Months</SelectItem>
                        <SelectItem value="6-months">6 Months</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Team Members</Label>
                  {projectData.team.map((member, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={member}
                        onChange={(e) => updateField("team", index, e.target.value)}
                        placeholder="Enter team member..."
                      />
                      {projectData.team.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeField("team", index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addField("team")} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Team Member
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={projectData.requirements}
                    onChange={(e) => setProjectData((prev) => ({ ...prev, requirements: e.target.value }))}
                    placeholder="List technical and business requirements..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="success-criteria">Success Criteria</Label>
                  <Textarea
                    id="success-criteria"
                    value={projectData.successCriteria}
                    onChange={(e) => setProjectData((prev) => ({ ...prev, successCriteria: e.target.value }))}
                    placeholder="How will you measure success..."
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)}>
                Next: Resources & Assets
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="2" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>References & Documentation</Label>
                  {projectData.references.map((reference, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={reference}
                        onChange={(e) => updateField("references", index, e.target.value)}
                        placeholder="URL, document name, or reference..."
                      />
                      {projectData.references.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeField("references", index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addField("references")} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Reference
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Assets & Resources</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Upload files or add URLs to assets</p>
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Files
                      </Button>
                      <Button variant="outline" size="sm">
                        <Link className="w-4 h-4 mr-2" />
                        Add URL
                      </Button>
                    </div>
                  </div>

                  {projectData.assets.length > 0 && (
                    <div className="space-y-2">
                      {projectData.assets.map((asset, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm">{asset.name}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="constraints">Constraints & Limitations</Label>
                  <Textarea
                    id="constraints"
                    value={projectData.constraints}
                    onChange={(e) => setProjectData((prev) => ({ ...prev, constraints: e.target.value }))}
                    placeholder="Budget, time, technical, or resource constraints..."
                    rows={4}
                  />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Project Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span>{selectedItem?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Complexity:</span>
                      <Badge variant="outline" className="text-xs">
                        {selectedItem?.complexity}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Est. Time:</span>
                      <span>{selectedItem?.timeEstimate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Objectives:</span>
                      <span>{projectData.objectives.filter((o) => o.trim()).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Team Size:</span>
                      <span>{projectData.team.filter((t) => t.trim()).length}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)}>
                Next: AI Planning
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="3" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">AI-Powered Project Planning</h3>
                  <p className="text-muted-foreground">
                    Let AI create a detailed project plan based on your requirements
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="use-ai"
                    checked={projectData.useAI}
                    onChange={(e) => setProjectData((prev) => ({ ...prev, useAI: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="use-ai">Use AI Planning</Label>
                </div>
              </div>

              {projectData.useAI && (
                <div className="space-y-4">
                  {!projectData.aiPlan ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <Sparkles className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                        <h4 className="font-semibold mb-2">Generate AI Project Plan</h4>
                        <p className="text-muted-foreground mb-4">
                          AI will analyze your project requirements and create a comprehensive plan with phases, tasks,
                          and timelines.
                        </p>
                        <Button onClick={generateAIPlan} className="bg-gradient-to-r from-blue-600 to-purple-600">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Plan
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span>AI-Generated Project Plan</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-muted p-4 rounded-lg">
                            <pre className="whitespace-pre-wrap text-sm">{projectData.aiPlan}</pre>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="approve-plan"
                            checked={projectData.approvedPlan}
                            onChange={(e) => setProjectData((prev) => ({ ...prev, approvedPlan: e.target.checked }))}
                            className="rounded"
                          />
                          <Label htmlFor="approve-plan">I approve this plan</Label>
                        </div>
                        <Button variant="outline" size="sm" onClick={generateAIPlan}>
                          Regenerate Plan
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Chat with AI
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                onClick={handleCreateProject}
                disabled={projectData.useAI && !projectData.approvedPlan && projectData.aiPlan}
                className="bg-gradient-to-r from-green-600 to-blue-600"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
