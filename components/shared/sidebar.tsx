"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  FolderOpen,
  Code2,
  Palette,
  Zap,
  MessageSquare,
  Plug,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: FolderOpen,
    badge: null,
  },
  {
    name: "AI Development",
    href: "/ai-development",
    icon: Code2,
    badge: "AI",
  },
  {
    name: "Visual Editor",
    href: "/visual-editor",
    icon: Palette,
    badge: null,
  },
  {
    name: "Automation",
    href: "/automation",
    icon: Zap,
    badge: "3",
  },
  {
    name: "Chat Agent",
    href: "/chat-agent",
    icon: MessageSquare,
    badge: "Beta",
  },
  {
    name: "Integrations",
    href: "/integrations",
    icon: Plug,
    badge: null,
  },
  {
    name: "Collaboration",
    href: "/collaboration",
    icon: Users,
    badge: "New",
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">Bravo</span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-10",
                    collapsed && "px-2",
                    isActive && "bg-primary/10 text-primary",
                  )}
                >
                  <item.icon className={cn("w-4 h-4", !collapsed && "mr-3")} />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-3">
        <Link href="/settings">
          <Button variant="ghost" className={cn("w-full justify-start h-10", collapsed && "px-2")}>
            <Settings className={cn("w-4 h-4", !collapsed && "mr-3")} />
            {!collapsed && <span>Settings</span>}
          </Button>
        </Link>
      </div>
    </div>
  )
}
