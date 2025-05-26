"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Play, Download, Copy, Eye, Code2, Smartphone, Globe, Database } from "lucide-react"
import { generateCode } from "@/lib/actions/ai-generation"

const frameworks = [
  { value: "react", label: "React", icon: Code2 },
  { value: "nextjs", label: "Next.js", icon: Globe },
  { value: "react-native", label: "React Native", icon: Smartphone },
]

const templates = [
  {
    id: "dashboard",
    name: "Admin Dashboard",
    description: "Complete admin panel with charts and tables",
    tags: ["React", "Charts", "Tables"],
  },
  {
    id: "ecommerce",
    name: "E-commerce Store",
    description: "Full-featured online store with cart and checkout",
    tags: ["Next.js", "Stripe", "Commerce"],
  },
  {
    id: "blog",
    name: "Blog Platform",
    description: "Modern blog with CMS integration",
    tags: ["Next.js", "CMS", "SEO"],
  },
  {
    id: "mobile-app",
    name: "Mobile App",
    description: "Cross-platform mobile application",
    tags: ["React Native", "Mobile", "Navigation"],
  },
]

export function CodeGenerator() {
  const [prompt, setPrompt] = useState("")
  const [selectedFramework, setSelectedFramework] = useState("react")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedCode, setGeneratedCode] = useState("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    setProgress(0)

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 20, 90))
      }, 500)

      const result = await generateCode({
        prompt,
        framework: selectedFramework as "react" | "nextjs" | "react-native",
        type: "component",
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (result.success) {
        setGeneratedCode(result.data.code)
      } else {
        console.error("Generation failed:", result.error)
        // Fallback to mock code
        setGeneratedCode(`// Generation failed, showing mock code
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function GeneratedComponent() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generated Component</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This component was generated based on your prompt:</p>
          <p className="font-mono text-sm bg-muted p-2 rounded mt-2">
            "${prompt}"
          </p>
          <Button className="mt-4">
            Click me!
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}`)
      }
    } catch (error) {
      console.error("Error generating code:", error)
      setGeneratedCode(`// Error generating code
// Please try again or check your connection`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleTemplateSelect = (template: (typeof templates)[0]) => {
    setPrompt(`Create a ${template.name.toLowerCase()} - ${template.description}`)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>AI Code Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Framework</label>
              <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.map((framework) => (
                    <SelectItem key={framework.value} value={framework.value}>
                      <div className="flex items-center space-x-2">
                        <framework.icon className="w-4 h-4" />
                        <span>{framework.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Describe what you want to build</label>
            <Textarea
              placeholder="e.g., Create a modern dashboard with user analytics, charts, and a sidebar navigation..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
            />
          </div>

          <Button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating} className="w-full">
            <Play className="w-4 h-4 mr-2" />
            {isGenerating ? "Generating..." : "Generate Code"}
          </Button>

          {isGenerating && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">Generating your application...</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4" onClick={() => handleTemplateSelect(template)}>
                  <h3 className="font-semibold mb-2">{template.name}</h3>
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
        </CardContent>
      </Card>

      {/* Generated Code */}
      {generatedCode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Code</span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="code" className="w-full">
              <TabsList>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
              </TabsList>
              <TabsContent value="code" className="mt-4">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{generatedCode}</code>
                </pre>
              </TabsContent>
              <TabsContent value="preview" className="mt-4">
                <div className="border rounded-lg p-4 bg-background">
                  <p className="text-muted-foreground">Preview would render here...</p>
                </div>
              </TabsContent>
              <TabsContent value="files" className="mt-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                    <Code2 className="w-4 h-4" />
                    <span className="text-sm">components/GeneratedComponent.tsx</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-muted rounded">
                    <Database className="w-4 h-4" />
                    <span className="text-sm">lib/types.ts</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
