"use client"

import { ChatInterface } from "@/components/chat-agent/chat-interface"

export default function ChatAgentPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold">Chat Agent</h1>
        <p className="text-muted-foreground">
          Get instant help with development, debugging, and optimization from our AI assistant
        </p>
      </div>

      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  )
}
