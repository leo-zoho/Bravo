"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Bell,
  Plus,
  Command,
  HelpCircle,
  User,
  Settings,
  LogOut,
  Zap,
  Bot,
  Workflow,
  Globe,
  Sparkles,
  Palette,
} from "lucide-react"

export function Header() {
  const [notifications] = useState(3)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Search */}
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search projects, automations, or ask AI..." className="pl-10 pr-4" />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <Command className="w-3 h-3" />K
              </kbd>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Quick Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Create New</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Projects */}
              <div className="p-2">
                <p className="text-xs font-medium text-muted-foreground mb-2">PROJECTS</p>
                <DropdownMenuItem className="flex items-center space-x-3 p-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Application</p>
                    <p className="text-xs text-muted-foreground">Web, mobile, or desktop app</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-3 p-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Research Project</p>
                    <p className="text-xs text-muted-foreground">Data analysis and insights</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-3 p-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">AI Agent</p>
                    <p className="text-xs text-muted-foreground">Intelligent chatbot or assistant</p>
                  </div>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator />

              {/* Development Tools */}
              <div className="p-2">
                <p className="text-xs font-medium text-muted-foreground mb-2">DEVELOPMENT</p>
                <DropdownMenuItem className="flex items-center space-x-3 p-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">AI Code Generation</p>
                    <p className="text-xs text-muted-foreground">Generate code with AI</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-3 p-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Palette className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Visual Design</p>
                    <p className="text-xs text-muted-foreground">Drag & drop interface</p>
                  </div>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator />

              {/* Automation */}
              <div className="p-2">
                <p className="text-xs font-medium text-muted-foreground mb-2">AUTOMATION</p>
                <DropdownMenuItem className="flex items-center space-x-3 p-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Automation</p>
                    <p className="text-xs text-muted-foreground">Task automation workflow</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-3 p-3">
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                    <Workflow className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Business Workflow</p>
                    <p className="text-xs text-muted-foreground">Complex process workflow</p>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Help */}
          <Button variant="ghost" size="sm">
            <HelpCircle className="w-4 h-4" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">{notifications}</Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
