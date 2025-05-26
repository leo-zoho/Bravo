"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  Mic,
  MicOff,
  Paperclip,
  Code,
  Bug,
  Lightbulb,
  Zap,
  MessageSquare,
  Clock,
  CheckCircle,
  Plus,
  Copy,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  attachments?: Array<{ type: string; name: string; url: string }>
  codeBlocks?: Array<{ language: string; code: string }>
  suggestions?: string[]
}

const quickActions = [
  {
    icon: Bug,
    label: "Debug Code",
    prompt: "Help me debug this error in my application",
    color: "bg-red-100 text-red-700",
  },
  {
    icon: Code,
    label: "Code Review",
    prompt: "Review my code and suggest improvements",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: Lightbulb,
    label: "Optimize",
    prompt: "How can I optimize this component for better performance?",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    icon: Zap,
    label: "Automate",
    prompt: "Create an automation workflow for this task",
    color: "bg-green-100 text-green-700",
  },
]

const conversationHistory = [
  {
    id: "1",
    title: "Debug Login Issue",
    lastMessage: "The authentication flow should work now",
    timestamp: "2 hours ago",
    status: "resolved",
  },
  {
    id: "2",
    title: "Optimize Dashboard Performance",
    lastMessage: "Let me analyze the component structure...",
    timestamp: "1 day ago",
    status: "active",
  },
  {
    id: "3",
    title: "Create Email Automation",
    lastMessage: "Automation workflow created successfully",
    timestamp: "3 days ago",
    status: "completed",
  },
]

export default function ChatAgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI assistant. I can help you debug code, optimize applications, create automations, and answer any questions about your projects. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "Debug my React component",
        "Optimize database queries",
        "Create an automation workflow",
        "Review my code architecture",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
        content: `I understand you're asking about: "${inputValue}". Let me help you with that. Based on your query, I can provide specific guidance and code examples. Would you like me to analyze your current implementation or provide a step-by-step solution?`,
        timestamp: new Date(),
        codeBlocks: inputValue.toLowerCase().includes("code")
          ? [
              {
                language: "javascript",
                code: `// Example solution for your query
function handleUserQuery(query) {
  // Process the query
  const result = processQuery(query);
  return result;
}`,
              },
            ]
          : undefined,
        suggestions: [
          "Show me the implementation",
          "Explain the approach",
          "Provide more examples",
          "Create a workflow for this",
        ],
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleQuickAction = (prompt: string) => {
    setInputValue(prompt)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const toggleVoice = () => {
    setIsListening(!isListening)
    // Voice recognition would be implemented here
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-700"
      case "active":
        return "bg-blue-100 text-blue-700"
      case "completed":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-3 h-3" />
      case "active":
        return <MessageSquare className="w-3 h-3" />
      case "completed":
        return <CheckCircle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-80 border-r bg-background flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Chat History</h2>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {conversationHistory.map((conversation) => (
              <Card key={conversation.id} className="cursor-pointer hover:shadow-sm transition-shadow">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-sm">{conversation.title}</h3>
                    <Badge className={`text-xs ${getStatusColor(conversation.status)}`}>
                      {getStatusIcon(conversation.status)}
                      <span className="ml-1 capitalize">{conversation.status}</span>
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{conversation.lastMessage}</p>
                  <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <Button className="w-full" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            New Conversation
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">AI Chat Agent</h1>
              <p className="text-muted-foreground">Get instant help with debugging, optimization, and automation</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                Online
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-3 flex flex-col items-center space-y-2"
                onClick={() => handleQuickAction(action.prompt)}
              >
                <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center`}>
                  <action.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex space-x-3 max-w-3xl ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{message.type === "user" ? "U" : "AI"}</AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg p-4 ${message.type === "user" ? "bg-blue-600 text-white" : "bg-muted"}`}>
                    <p className="text-sm">{message.content}</p>

                    {message.codeBlocks && (
                      <div className="mt-3 space-y-2">
                        {message.codeBlocks.map((block, index) => (
                          <div key={index} className="bg-gray-900 text-gray-100 rounded p-3 text-xs font-mono">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-gray-400">{block.language}</span>
                              <Button size="sm" variant="ghost" className="h-6 text-gray-400 hover:text-white">
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                            <pre className="whitespace-pre-wrap">{block.code}</pre>
                          </div>
                        ))}
                      </div>
                    )}

                    {message.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}

                    <p className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-3 max-w-3xl">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-4">
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
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about your code, automations, or projects..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Paperclip className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-6 w-6 p-0 ${isListening ? "text-red-500" : ""}`}
                  onClick={toggleVoice}
                >
                  {isListening ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                </Button>
              </div>
            </div>
            <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, or use voice commands for hands-free interaction
          </p>
        </div>
      </div>
    </div>
  )
}
