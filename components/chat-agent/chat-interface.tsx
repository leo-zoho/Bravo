"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  Send,
  Paperclip,
  Mic,
  MoreHorizontal,
  Code2,
  Sparkles,
  FileText,
  Database,
  Zap,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  attachments?: Array<{ name: string; type: string }>
  codeBlocks?: Array<{ language: string; code: string }>
  suggestions?: string[]
}

const quickActions = [
  { label: "Generate Component", icon: Code2, prompt: "Create a React component for a user profile card" },
  { label: "Debug Code", icon: Zap, prompt: "Help me debug this JavaScript function" },
  { label: "Optimize Query", icon: Database, prompt: "Optimize this SQL query for better performance" },
  { label: "Write Documentation", icon: FileText, prompt: "Write documentation for this API endpoint" },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI development assistant. I can help you with code generation, debugging, optimization, and much more. What would you like to work on today?",
      timestamp: new Date(),
      suggestions: ["Generate a React component", "Debug my code", "Optimize database queries", "Write unit tests"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
        content: `I understand you want to ${inputValue.toLowerCase()}. Here's how I can help you with that:

This is a comprehensive solution that addresses your request. I've included best practices and modern approaches to ensure the code is maintainable and efficient.`,
        timestamp: new Date(),
        codeBlocks: [
          {
            language: "typescript",
            code: `// Example React component
import React from 'react';

interface Props {
  title: string;
  description: string;
}

export const ExampleComponent: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};`,
          },
        ],
        suggestions: ["Explain this code", "Add error handling", "Create tests", "Optimize performance"],
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleQuickAction = (prompt: string) => {
    setInputValue(prompt)
    textareaRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>
                <Sparkles className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">Bravo AI Assistant</h2>
              <p className="text-sm text-muted-foreground">{isTyping ? "Typing..." : "Online • Ready to help"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">
              <Sparkles className="w-3 h-3 mr-1" />
              GPT-4
            </Badge>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                <div
                  className={`p-4 rounded-lg ${
                    message.type === "user" ? "bg-blue-600 text-white ml-4" : "bg-muted border mr-4"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>

                  {message.codeBlocks && (
                    <div className="mt-4 space-y-2">
                      {message.codeBlocks.map((block, index) => (
                        <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                            <span className="text-sm text-gray-300">{block.language}</span>
                            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
                            <code>{block.code}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  )}

                  {message.suggestions && message.type === "assistant" && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleQuickAction(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>

                {message.type === "assistant" && (
                  <div className="flex items-center space-x-2 mt-2 ml-4">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDown className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                    <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</span>
                  </div>
                )}
              </div>

              {message.type === "assistant" && (
                <Avatar className="order-1">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>
                    <Sparkles className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <Avatar className="mr-3">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>
                  <Sparkles className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted border rounded-lg p-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Quick Actions */}
      <div className="p-4 border-t bg-muted/30">
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="flex-shrink-0"
              onClick={() => handleQuickAction(action.prompt)}
            >
              <action.icon className="w-4 h-4 mr-2" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-background">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about development, debugging, or optimization..."
              className="min-h-[60px] max-h-32 resize-none pr-12"
              rows={2}
            />
            <div className="absolute bottom-2 right-2 flex space-x-1">
              <Button variant="ghost" size="sm">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mic className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
      </div>
    </div>
  )
}
