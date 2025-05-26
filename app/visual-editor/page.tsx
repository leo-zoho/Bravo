"use client"

import { Canvas } from "@/components/visual-editor/canvas"
import { PropertiesPanel } from "@/components/visual-editor/properties-panel"

export default function VisualEditorPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold">Visual Editor</h1>
        <p className="text-muted-foreground">
          Design and customize your applications with our intuitive drag-and-drop interface
        </p>
      </div>

      <div className="flex-1 flex">
        <Canvas />
        <PropertiesPanel />
      </div>
    </div>
  )
}
