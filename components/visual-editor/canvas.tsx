"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Smartphone,
  Tablet,
  Monitor,
  MousePointer,
  Move,
  Type,
  Square,
  Circle,
  ImageIcon,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
} from "lucide-react"

const viewports = [
  { value: "mobile", label: "Mobile", icon: Smartphone, width: 375, height: 667 },
  { value: "tablet", label: "Tablet", icon: Tablet, width: 768, height: 1024 },
  { value: "desktop", label: "Desktop", icon: Monitor, width: 1200, height: 800 },
]

const tools = [
  { id: "select", icon: MousePointer, label: "Select" },
  { id: "move", icon: Move, label: "Move" },
  { id: "text", icon: Type, label: "Text" },
  { id: "rectangle", icon: Square, label: "Rectangle" },
  { id: "circle", icon: Circle, label: "Circle" },
  { id: "image", icon: ImageIcon, label: "Image" },
]

interface CanvasElement {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  content?: string
  styles: Record<string, string>
}

export function Canvas() {
  const [viewport, setViewport] = useState("desktop")
  const [selectedTool, setSelectedTool] = useState("select")
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [zoom, setZoom] = useState(100)
  const [elements, setElements] = useState<CanvasElement[]>([
    {
      id: "1",
      type: "text",
      x: 50,
      y: 50,
      width: 200,
      height: 40,
      content: "Welcome to Bravo",
      styles: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#1f2937",
      },
    },
    {
      id: "2",
      type: "rectangle",
      x: 50,
      y: 120,
      width: 300,
      height: 200,
      styles: {
        backgroundColor: "#f3f4f6",
        border: "1px solid #d1d5db",
        borderRadius: "8px",
      },
    },
  ])

  const canvasRef = useRef<HTMLDivElement>(null)
  const currentViewport = viewports.find((v) => v.value === viewport)!

  const handleElementClick = (elementId: string) => {
    setSelectedElement(elementId)
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (selectedTool === "text") {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const newElement: CanvasElement = {
          id: Date.now().toString(),
          type: "text",
          x,
          y,
          width: 150,
          height: 30,
          content: "New Text",
          styles: {
            fontSize: "16px",
            color: "#1f2937",
          },
        }

        setElements([...elements, newElement])
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center space-x-4">
          {/* Tools */}
          <div className="flex items-center space-x-1 p-1 bg-muted rounded-lg">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                variant={selectedTool === tool.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTool(tool.id)}
                className="h-8 w-8 p-0"
              >
                <tool.icon className="w-4 h-4" />
              </Button>
            ))}
          </div>

          {/* Viewport Selector */}
          <Select value={viewport} onValueChange={setViewport}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {viewports.map((vp) => (
                <SelectItem key={vp.value} value={vp.value}>
                  <div className="flex items-center space-x-2">
                    <vp.icon className="w-4 h-4" />
                    <span>{vp.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Badge variant="outline">
            {currentViewport.width} × {currentViewport.height}
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          {/* History */}
          <Button variant="ghost" size="sm">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Redo className="w-4 h-4" />
          </Button>

          {/* Zoom */}
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={() => setZoom(Math.max(25, zoom - 25))}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
            <Button variant="ghost" size="sm" onClick={() => setZoom(Math.min(200, zoom + 25))}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-muted/30 p-8 overflow-auto">
        <div className="flex justify-center">
          <div
            className="bg-white shadow-lg relative overflow-hidden"
            style={{
              width: currentViewport.width,
              height: currentViewport.height,
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
          >
            <div ref={canvasRef} className="w-full h-full relative cursor-crosshair" onClick={handleCanvasClick}>
              {elements.map((element) => (
                <div
                  key={element.id}
                  className={`absolute cursor-pointer ${selectedElement === element.id ? "ring-2 ring-blue-500" : ""}`}
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    ...element.styles,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleElementClick(element.id)
                  }}
                >
                  {element.type === "text" && <div className="w-full h-full flex items-center">{element.content}</div>}
                  {element.type === "rectangle" && <div className="w-full h-full" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
