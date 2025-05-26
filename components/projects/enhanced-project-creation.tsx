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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Code2, Palette, Globe, Search, Bot, Puzzle, FileCode, Brain, Sparkles, ArrowRight } from "lucide-react"

const projectCategories = [
  {
    id: "app",
    name: "Application",
    description: "Full-featured applications and websites",
    icon: Globe,
    color: "bg-blue-500",
    templates: [
      {
        id: "web-app",
        name: "Web Application",
        description: "Modern web app with React/Next.js",
        complexity: "Medium",
        timeEstimate: "2-4 weeks",
        features: ["Authentication", "Database", "API", "Responsive Design"],
      },
      {
        id: "mobile-app",
        name: "Mobile Application",
        description: "Cross-platform mobile app",
        complexity: "High",
        timeEstimate: "4-8 weeks",
        features: ["Native Performance", "Push Notifications", "Offline Support"],
      },
      {
        id: "dashboard",
        name: "Analytics Dashboard",
        description: "Data visualization and reporting",
        complexity: "Medium",
        timeEstimate: "1-3 weeks",
        features: ["Charts", "Real-time Data", "Export", "Filters"],
      },
      {
        id: "ecommerce",
        name: "E-commerce Platform",
        description: "Online store with payment processing",
        complexity: "High",
        timeEstimate: "6-12 weeks",
        features: ["Product Catalog", "Shopping Cart", "Payments", "Inventory"],
      },
    ],
  },
  {
    id: "research",
    name: "Research",
    description: "Data analysis and research projects",
    icon: Search,
    color: "bg-purple-500",
    templates: [
      {
        id: "data-analysis",
        name: "Data Analysis",
        description: "Statistical analysis and insights",
        complexity: "Medium",
        timeEstimate: "1-2 weeks",
        features: ["Data Processing", "Visualization", "Statistical Models", "Reports"],
      },
      {
        id: "market-research",
        name: "Market Research",
        description: "Competitive analysis and market insights",
        complexity: "Low",
        timeEstimate: "1 week",
        features: ["Web Scraping", "Data Collection", "Analysis", "Presentation"],
      },
      {
        id: "academic-research",
        name: "Academic Research",
        description: "Literature review and academic analysis",
        complexity: "High",
        timeEstimate: "2-4 weeks",
        features: ["Literature Mining", "Citation Analysis", "Methodology", "Publication"],
      },
    ],
  },
  {
    id: "component",
    name: "Component",
    description: "Reusable UI components and libraries",
    icon: Puzzle,
    color: "bg-green-500",
    templates: [
      {
        id: "ui-library",
        name: "UI Component Library",
        description: "Design system and component collection",
        complexity: "Medium",
        timeEstimate: "2-3 weeks",
        features: ["Storybook", "Documentation", "Testing", "Theming"],
      },
      {
        id: "widget",
        name: "Interactive Widget",
        description: "Embeddable interactive component",
        complexity: "Low",
        timeEstimate: "3-5 days",
        features: ["Lightweight", "Customizable", "Responsive", "API Integration"],
      },
      {
        id: "plugin",
        name: "Plugin/Extension",
        description: "Browser or platform extension",
        complexity: "Medium",
        timeEstimate: "1-2 weeks",
        features: ["Cross-platform", "Settings", "Permissions", "Updates"],
      },
    ],
  },
  {
    id: "agent",
    name: "AI Agent",
    description: "Intelligent agents and chatbots",
    icon: Bot,
    color: "bg-orange-500",
    templates: [
      {
        id: "chatbot",
        name: "Conversational Agent",
        description: "AI-powered chatbot for customer service",
        complexity: "High",
        timeEstimate: "3-6 weeks",
        features: ["NLP", "Context Memory", "Multi-channel", "Analytics"],
      },
      {
        id: "assistant",
        name: "Virtual Assistant",
        description: "Personal or business AI assistant",
        complexity: "High",
        timeEstimate: "4-8 weeks",
        features: ["Task Automation", "Calendar", "Email", "Integrations"],
      },
      {
        id: "recommendation",
        name: "Recommendation Engine",
        description: "AI-powered recommendation system",
        complexity: "High",
        timeEstimate: "2-4 weeks",
        features: ["Machine Learning", "Personalization", "A/B Testing", "Analytics"],
      },
    ],
  },
  {
    id: "functions",
    name: "Functions",
    description: "Serverless functions and microservices",
    icon: FileCode,
    color: "bg-indigo-500",
    templates: [
      {
        id: "api-service",
        name: "API Service",
        description: "RESTful API with database integration",
        complexity: "Medium",
        timeEstimate: "1-2 weeks",
        features: ["REST/GraphQL", "Authentication", "Rate Limiting", "Documentation"],
      },
      {
        id: "data-processor",
        name: "Data Processing Function",
        description: "Serverless data transformation pipeline",
        complexity: "Medium",
        timeEstimate: "1 week",
        features: ["Event-driven", "Scalable", "Error Handling", "Monitoring"],
      },
      {
        id: "webhook-handler",
        name: "Webhook Handler",
        description: "Process incoming webhooks and events",
        complexity: "Low",
        timeEstimate: "2-3 days",
        features: ["Validation", "Routing", "Transformation", "Delivery"],
      },
    ],
  },
]

interface EnhancedProjectCreationProps {
  onProjectCreate: (project: any) => void
}

export function EnhancedProjectCreation({ onProjectCreate }: EnhancedProjectCreationProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    category: "",
    template: "",
    framework: "",
    features: [] as string[],
    aiGenerated: false,
    useVisualEditor: false,
  })

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setProjectData((prev) => ({ ...prev, category: categoryId }))
    setStep(2)
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const category = projectCategories.find((c) => c.id === selectedCategory)
    const template = category?.templates.find((t) => t.id === templateId)
    setProjectData((prev) => ({
      ...prev,
      template: templateId,
      name: template?.name || "",
      description: template?.description || "",
    }))
    setStep(3)
  }

  const handleCreateProject = () => {
    const category = projectCategories.find((c) => c.id === selectedCategory)
    const template = category?.templates.find((t) => t.id === selectedTemplate)

    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      status: "draft",
      progress: 0,
      createdAt: new Date(),
      lastModified: "Just now",
      collaborators: ["You"],
      complexity: template?.complexity || "Medium",
      timeEstimate: template?.timeEstimate || "1-2 weeks",
      categoryIcon: category?.icon,
      categoryColor: category?.color,
    }

    onProjectCreate(newProject)

    // Navigate to appropriate tool based on selection
    if (projectData.aiGenerated && projectData.category === "app") {
      // Navigate to AI Development with project context
      window.location.href = `/ai-development?project=${newProject.id}`
    } else if (projectData.useVisualEditor) {
      // Navigate to Visual Editor with project context
      window.location.href = `/visual-editor?project=${newProject.id}`
    }

    setOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setStep(1)
    setSelectedCategory(null)
    setSelectedTemplate(null)
    setProjectData({
      name: "",
      description: "",
      category: "",
      template: "",
      framework: "",
      features: [],
      aiGenerated: false,
      useVisualEditor: false,
    })
  }

  const selectedCategoryData = projectCategories.find((c) => c.id === selectedCategory)
  const selectedTemplateData = selectedCategoryData?.templates.find((t) => t.id === selectedTemplate)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">What type of project are you building?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectCategories.map((category) => (
                  <Card
                    key={category.id}
                    className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-blue-500 group"
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
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {category.templates.length} templates
                        </Badge>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                      </div>
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
              <h3 className="text-lg font-semibold mb-4">Choose a template</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedCategoryData.templates.map((template) => (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-500"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{template.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs mb-1">
                            {template.complexity}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{template.timeEstimate}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {template.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {template.features.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{template.features.length - 3}
                          </Badge>
                        )}
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

            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Project Details</TabsTrigger>
                <TabsTrigger value="development">Development Path</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
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
                        placeholder="Describe your project goals and requirements..."
                        rows={3}
                      />
                    </div>

                    {(selectedCategory === "app" || selectedCategory === "component") && (
                      <div className="space-y-2">
                        <Label>Framework</Label>
                        <Select
                          value={projectData.framework}
                          onValueChange={(value) => setProjectData((prev) => ({ ...prev, framework: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select framework" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="react">React 18</SelectItem>
                            <SelectItem value="nextjs">Next.js 14</SelectItem>
                            <SelectItem value="vue">Vue 3</SelectItem>
                            <SelectItem value="svelte">Svelte</SelectItem>
                            <SelectItem value="react-native">React Native</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Features to Include</Label>
                      <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                        {selectedTemplateData.features.map((feature) => (
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
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="development" className="space-y-4">
                <div className="space-y-4">
                  <h4 className="font-semibold">How would you like to build this project?</h4>

                  {selectedCategory === "app" && (
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <input
                          type="radio"
                          name="buildMethod"
                          checked={projectData.aiGenerated}
                          onChange={(e) =>
                            setProjectData((prev) => ({
                              ...prev,
                              aiGenerated: e.target.checked,
                              useVisualEditor: false,
                            }))
                          }
                          className="rounded"
                        />
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">AI Code Generation</p>
                            <p className="text-sm text-muted-foreground">
                              Generate code using natural language descriptions
                            </p>
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <input
                          type="radio"
                          name="buildMethod"
                          checked={projectData.useVisualEditor}
                          onChange={(e) =>
                            setProjectData((prev) => ({
                              ...prev,
                              useVisualEditor: e.target.checked,
                              aiGenerated: false,
                            }))
                          }
                          className="rounded"
                        />
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Palette className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">Visual Editor</p>
                            <p className="text-sm text-muted-foreground">Design with drag-and-drop interface</p>
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <input
                          type="radio"
                          name="buildMethod"
                          checked={!projectData.aiGenerated && !projectData.useVisualEditor}
                          onChange={() =>
                            setProjectData((prev) => ({
                              ...prev,
                              aiGenerated: false,
                              useVisualEditor: false,
                            }))
                          }
                          className="rounded"
                        />
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <Code2 className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">Manual Development</p>
                            <p className="text-sm text-muted-foreground">Start with empty project structure</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  )}

                  {selectedCategory === "research" && (
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <h5 className="font-medium">Research Assistant</h5>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your research project will include AI-powered data collection, analysis tools, and automated
                        report generation.
                      </p>
                    </div>
                  )}

                  {selectedCategory === "agent" && (
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Bot className="w-5 h-5 text-orange-600" />
                        <h5 className="font-medium">AI Agent Builder</h5>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your agent will be built with conversation flows, knowledge base integration, and deployment
                        options.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={handleCreateProject} disabled={!projectData.name.trim()}>
                Create Project
                {(projectData.aiGenerated || projectData.useVisualEditor) && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
