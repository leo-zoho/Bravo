"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette, Type, Layout, Sparkles } from "lucide-react"

export function PropertiesPanel() {
  const [selectedElement, setSelectedElement] = useState("text-1")
  const [aiPrompt, setAiPrompt] = useState("")

  return (
    <div className="w-80 border-l bg-background flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Properties</h3>
        <p className="text-sm text-muted-foreground">
          {selectedElement ? "Text Element Selected" : "No element selected"}
        </p>
      </div>

      <div className="flex-1 overflow-auto">
        {selectedElement && (
          <Tabs defaultValue="style" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
              <TabsTrigger value="style">
                <Palette className="w-4 h-4 mr-1" />
                Style
              </TabsTrigger>
              <TabsTrigger value="layout">
                <Layout className="w-4 h-4 mr-1" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="content">
                <Type className="w-4 h-4 mr-1" />
                Content
              </TabsTrigger>
            </TabsList>

            <div className="p-4 space-y-4">
              <TabsContent value="style" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <div className="flex items-center space-x-2">
                    <Slider defaultValue={[16]} max={72} min={8} step={1} className="flex-1" />
                    <span className="text-sm w-8">16px</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Font Weight</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="bold">Bold</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-900 rounded border cursor-pointer"></div>
                    <Input
                      value="#1f2937"
                      onChange={(e) => {
                        /* handle color change */
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-transparent border-2 border-dashed border-gray-300 rounded cursor-pointer"></div>
                    <Input
                      placeholder="transparent"
                      onChange={(e) => {
                        /* handle background change */
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="layout" className="space-y-4 mt-0">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label>X Position</Label>
                    <Input
                      type="number"
                      defaultValue="50"
                      onChange={(e) => {
                        /* handle x position change */
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Y Position</Label>
                    <Input
                      type="number"
                      defaultValue="50"
                      onChange={(e) => {
                        /* handle y position change */
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label>Width</Label>
                    <Input
                      type="number"
                      defaultValue="200"
                      onChange={(e) => {
                        /* handle width change */
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Height</Label>
                    <Input
                      type="number"
                      defaultValue="40"
                      onChange={(e) => {
                        /* handle height change */
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Padding</Label>
                  <div className="grid grid-cols-4 gap-1">
                    <Input
                      placeholder="T"
                      className="text-center"
                      onChange={(e) => {
                        /* handle padding top */
                      }}
                    />
                    <Input
                      placeholder="R"
                      className="text-center"
                      onChange={(e) => {
                        /* handle padding right */
                      }}
                    />
                    <Input
                      placeholder="B"
                      className="text-center"
                      onChange={(e) => {
                        /* handle padding bottom */
                      }}
                    />
                    <Input
                      placeholder="L"
                      className="text-center"
                      onChange={(e) => {
                        /* handle padding left */
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Margin</Label>
                  <div className="grid grid-cols-4 gap-1">
                    <Input
                      placeholder="T"
                      className="text-center"
                      onChange={(e) => {
                        /* handle margin top */
                      }}
                    />
                    <Input
                      placeholder="R"
                      className="text-center"
                      onChange={(e) => {
                        /* handle margin right */
                      }}
                    />
                    <Input
                      placeholder="B"
                      className="text-center"
                      onChange={(e) => {
                        /* handle margin bottom */
                      }}
                    />
                    <Input
                      placeholder="L"
                      className="text-center"
                      onChange={(e) => {
                        /* handle margin left */
                      }}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label>Text Content</Label>
                  <Textarea
                    defaultValue="Welcome to Bravo"
                    placeholder="Enter text content..."
                    rows={3}
                    onChange={(e) => {
                      /* handle content change */
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Text Alignment</Label>
                  <Select defaultValue="left">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                      <SelectItem value="justify">Justify</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        )}
      </div>

      {/* AI Assistant */}
      <Card className="m-4 mt-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
            AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Describe changes you want to make..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            rows={2}
            className="text-sm"
          />
          <Button size="sm" className="w-full">
            Apply Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
