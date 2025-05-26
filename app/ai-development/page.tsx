"use client"

import { CodeGenerator } from "@/components/ai-development/code-generator"

export default function AIDevelopmentPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">AI Development</h1>
        <p className="text-muted-foreground">Transform your ideas into production-ready code with advanced AI models</p>
      </div>

      <CodeGenerator />
    </div>
  )
}
