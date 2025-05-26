"use client"

import { Switch } from "@/components/ui/switch"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  Database,
  Mail,
  Calendar,
  MessageSquare,
  CreditCard,
  Cloud,
  Code,
  Zap,
} from "lucide-react"

const integrationCategories = [
  { value: "all", label: "All Categories" },
  { value: "database", label: "Database" },
  { value: "email", label: "Email" },
  { value: "productivity", label: "Productivity" },
  { value: "payment", label: "Payment" },
  { value: "ai", label: "AI & ML" },
  { value: "storage", label: "Storage" },
  { value: "communication", label: "Communication" },
]

const availableIntegrations = [
  {
    id: "supabase",
    name: "Supabase",
    description: "Open source Firebase alternative with real-time database",
    category: "database",
    icon: Database,
    status: "available",
    popular: true,
    features: ["Real-time Database", "Authentication", "Storage", "Edge Functions"],
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Complete payment processing platform",
    category: "payment",
    icon: CreditCard,
    status: "available",
    popular: true,
    features: ["Payment Processing", "Subscriptions", "Invoicing", "Connect"],
  },
  {
    id: "resend",
    name: "Resend",
    description: "Email API for developers",
    category: "email",
    icon: Mail,
    status: "available",
    popular: false,
    features: ["Transactional Emails", "Templates", "Analytics", "Webhooks"],
  },
  {
    id: "openai",
    name: "OpenAI",
    description: "Advanced AI models and APIs",
    category: "ai",
    icon: Zap,
    status: "available",
    popular: true,
    features: ["GPT Models", "DALL-E", "Whisper", "Embeddings"],
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Calendar integration and scheduling",
    category: "productivity",
    icon: Calendar,
    status: "available",
    popular: false,
    features: ["Event Management", "Scheduling", "Reminders", "Sharing"],
  },
  {
    id: "slack",
    name: "Slack",
    description: "Team communication and collaboration",
    category: "communication",
    icon: MessageSquare,
    status: "available",
    popular: false,
    features: ["Messaging", "File Sharing", "Workflows", "Apps"],
  },
  {
    id: "vercel-blob",
    name: "Vercel Blob",
    description: "Fast and reliable file storage",
    category: "storage",
    icon: Cloud,
    status: "available",
    popular: false,
    features: ["File Storage", "CDN", "Image Optimization", "Edge Network"],
  },
  {
    id: "github",
    name: "GitHub",
    description: "Version control and collaboration",
    category: "productivity",
    icon: Code,
    status: "available",
    popular: true,
    features: ["Repositories", "Actions", "Issues", "Pull Requests"],
  },
]

const connectedIntegrations = [
  {
    id: "supabase",
    name: "Supabase",
    status: "connected",
    lastSync: "2 minutes ago",
    health: "healthy",
    usage: "847 requests today",
  },
  {
    id: "stripe",
    name: "Stripe",
    status: "connected",
    lastSync: "1 hour ago",
    health: "healthy",
    usage: "23 transactions today",
  },
  {
    id: "openai",
    name: "OpenAI",
    status: "error",
    lastSync: "Failed",
    health: "error",
    usage: "API key expired",
  },
  {
    id: "resend",
    name: "Resend",
    status: "connected",
    lastSync: "30 minutes ago",
    health: "healthy",
    usage: "156 emails sent today",
  },
]

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showConnectModal, setShowConnectModal] = useState<string | null>(null)

  const filteredIntegrations = availableIntegrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-700"
      case "error":
        return "bg-red-100 text-red-700"
      case "warning":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-3 h-3" />
      case "error":
        return <AlertCircle className="w-3 h-3" />
      case "warning":
        return <AlertCircle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case "healthy":
        return "text-green-600"
      case "error":
        return "text-red-600"
      case "warning":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground">Connect your favorite tools and services to enhance your workflow</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Request Integration
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Active integrations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100+</div>
            <p className="text-xs text-muted-foreground">Ready to connect</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="connected" className="space-y-6">
        <TabsList>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="connected" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {connectedIntegrations.map((integration) => {
              const integrationData = availableIntegrations.find((i) => i.id === integration.id)
              return (
                <Card key={integration.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {integrationData && (
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <integrationData.icon className="w-5 h-5 text-blue-600" />
                          </div>
                        )}
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <Badge className={`text-xs ${getStatusColor(integration.status)}`}>
                            {getStatusIcon(integration.status)}
                            <span className="ml-1 capitalize">{integration.status}</span>
                          </Badge>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Last Sync:</span>
                        <p className="font-medium">{integration.lastSync}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Health:</span>
                        <p className={`font-medium ${getHealthColor(integration.health)}`}>{integration.health}</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-muted-foreground text-sm">Usage:</span>
                      <p className="font-medium">{integration.usage}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Disconnect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {integrationCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Popular Integrations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Integrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations
                .filter((integration) => integration.popular)
                .map((integration) => (
                  <Card key={integration.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                          <integration.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {integration.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{integration.description}</p>

                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Features:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {integration.features.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {integration.features.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{integration.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button className="flex-1" onClick={() => setShowConnectModal(integration.id)}>
                          Connect
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* All Integrations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">All Integrations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations
                .filter((integration) => !integration.popular)
                .map((integration) => (
                  <Card key={integration.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                          <integration.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {integration.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{integration.description}</p>

                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Features:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {integration.features.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {integration.features.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{integration.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button className="flex-1" onClick={() => setShowConnectModal(integration.id)}>
                          Connect
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-sync</h4>
                    <p className="text-sm text-muted-foreground">Automatically sync data every hour</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Error notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified when integrations fail</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Usage analytics</h4>
                    <p className="text-sm text-muted-foreground">Track integration usage and performance</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Connect Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Connect Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You'll be redirected to authenticate with the service. Make sure to grant the necessary permissions.
              </p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowConnectModal(null)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowConnectModal(null)}>Continue</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
