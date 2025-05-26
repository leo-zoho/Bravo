"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Users,
  Plus,
  Share,
  MessageSquare,
  Clock,
  MoreHorizontal,
  Video,
  Mic,
  ScreenShareIcon as Screen,
  Settings,
} from "lucide-react"

const collaborators = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Owner",
    status: "online",
    lastSeen: "now",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Editor",
    status: "online",
    lastSeen: "2 minutes ago",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    role: "Viewer",
    status: "offline",
    lastSeen: "1 hour ago",
  },
]

const activities = [
  {
    id: "1",
    user: "Jane Smith",
    action: "edited the header component",
    time: "2 minutes ago",
    type: "edit",
  },
  {
    id: "2",
    user: "John Doe",
    action: "added a new automation workflow",
    time: "15 minutes ago",
    type: "create",
  },
  {
    id: "3",
    user: "Mike Johnson",
    action: "commented on the dashboard design",
    time: "1 hour ago",
    type: "comment",
  },
]

export default function CollaborationPage() {
  const [isLiveSession, setIsLiveSession] = useState(false)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Collaboration</h1>
          <p className="text-muted-foreground">Work together in real-time on your projects</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Share className="w-4 h-4 mr-2" />
            Share Project
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Invite Members
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Session */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Video className="w-5 h-5" />
                  <span>Live Collaboration Session</span>
                  {isLiveSession && (
                    <Badge className="bg-red-500">
                      <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                      Live
                    </Badge>
                  )}
                </div>
                <Button
                  variant={isLiveSession ? "destructive" : "default"}
                  onClick={() => setIsLiveSession(!isLiveSession)}
                >
                  {isLiveSession ? "End Session" : "Start Session"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLiveSession ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex -space-x-2">
                        {collaborators
                          .filter((c) => c.status === "online")
                          .map((user) => (
                            <Avatar key={user.id} className="border-2 border-background">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                      </div>
                      <span className="text-sm font-medium">
                        {collaborators.filter((c) => c.status === "online").length} participants
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Mic className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Screen className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Session started 15 minutes ago. All changes are being synced in real-time.
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">Start a Live Session</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Collaborate in real-time with voice, video, and screen sharing
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Comments & Feedback</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm">
                        The new dashboard layout looks great! Can we make the sidebar a bit wider?
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Jane Smith • 30 minutes ago</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input placeholder="Add a comment..." />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Team Members</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {collaborators.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                            user.status === "online" ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.role}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>Project Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Public Access</span>
                <Badge variant="outline">Private</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Link Sharing</span>
                <Badge variant="outline">Disabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Export Rights</span>
                <Badge variant="outline">Members Only</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Manage Permissions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
