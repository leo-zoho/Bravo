"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Sparkles, Code2, Zap, Settings, FileText } from "lucide-react"

interface ObjectChatModalProps {
  objectType: "project" | "workflow" | "automation" | "app"
  objectName: string
  objectId: string
  trigger?: React.ReactNode
}

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

export function ObjectChatModal({ objectType, objectName, objectId, trigger }: ObjectChatModalProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: `Hi! I'm here to help you with your ${objectType} "${objectName}". I can assist with debugging, optimization, feature suggestions, and more. What would you like to work on?`,
      timestamp: new Date(),
      suggestions: [
        `Debug ${objectType} issues`,
        `Optimize performance`,
        `Add new features`,
        `Generate documentation`,
        `Review code quality`,
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const getObjectIcon = () => {
    switch (objectType) {
      case "project":
        return Code2
      case "workflow":
        return Zap
      case "automation":
        return Settings
      case "app":
        return FileText
      default:
        return Code2
    }
  }

  const getObjectColor = () => {
    switch (objectType) {
      case "project":
        return "bg-blue-500"
      case "workflow":
        return "bg-purple-500"
      case "automation":
        return "bg-yellow-500"
      case "app":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `I understand you want to ${inputValue.toLowerCase()} for your ${objectType} "${objectName}". Here's what I recommend:

Based on the current state of your ${objectType}, I can help you implement this change. This approach will ensure compatibility with your existing setup and follow best practices.

Would you like me to generate the specific code or configuration needed for this?`,
        timestamp: new Date(),
        suggestions: [
          "Generate the code",
          "Show implementation steps",
          "Explain the approach",
          "Consider alternatives",
        ],
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const ObjectIcon = getObjectIcon()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg ${getObjectColor()} flex items-center justify-center`}>
              <ObjectIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <span>Chat about {objectName}</span>
              <Badge variant="secondary" className="ml-2 text-xs">
                {objectType}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === "user" ? "bg-blue-600 text-white ml-4" : "bg-muted border mr-4"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>

                    {message.suggestions && message.type === "assistant" && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-4">{message.timestamp.toLocaleTimeString()}</p>
                </div>

                {message.type === "assistant" && (
                  <Avatar className="order-1 w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500">
                      <Sparkles className="w-4 h-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <Avatar className="mr-3 w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500">
                    <Sparkles className="w-4 h-4 text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted border rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t pt-4">
          <div className="flex items-end space-x-2">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask about ${objectName}...`}
              className="min-h-[60px] max-h-32 resize-none"
              rows={2}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
