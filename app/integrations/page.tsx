"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  Settings,
  ExternalLink,
  CheckCircle,
  Clock,
  Zap,
  Database,
  Mail,
  MessageSquare,
  ImageIcon,
  Calendar,
  CreditCard,
  Shield,
  Code2,
} from "lucide-react"

const integrationCategories = [
  { id: "all", name: "All", count: 47 },
  { id: "communication", name: "Communication", count: 8 },
  { id: "database", name: "Database", count: 6 },
  { id: "payment", name: "Payment", count: 5 },
  { id: "storage", name: "Storage", count: 7 },
  { id: "analytics", name: "Analytics", count: 4 },
  { id: "ai", name: "AI/ML", count: 9 },
  { id: "development", name: "Development", count: 8 },
]

const availableIntegrations = [
  {
    id: "slack",
    name: "Slack",
    description: "Team communication and collaboration platform",
    category: "communication",
    icon: MessageSquare,
    color: "bg-purple-500",
    popular: true,
    connected: false,
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Online payment processing platform",
    category: "payment",
    icon: CreditCard,
    color: "bg-blue-500",
    popular: true,
    connected: false,
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    description: "Advanced open source relational database",
    category: "database",
    icon: Database,
    color: "bg-blue-600",
    popular: false,
    connected: true,
  },
  {
    id: "sendgrid",
    name: "SendGrid",
    description: "Email delivery and marketing platform",
    category: "communication",
    icon: Mail,
    color: "bg-blue-400",
    popular: false,
    connected: true,
  },
  {
    id: "openai",
    name: "OpenAI",
    description: "Advanced AI models and APIs",
    category: "ai",
    icon: Zap,
    color: "bg-green-500",
    popular: true,
    connected: true,
  },
  {
    id: "github",
    name: "GitHub",
    description: "Version control and collaboration platform",
    category: "development",
    icon: Code2,
    color: "bg-gray-800",
    popular: true,
    connected: false,
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Calendar and scheduling service",
    category: "productivity",
    icon: Calendar,
    color: "bg-red-500",
    popular: false,
    connected: false,
  },
  {
    id: "aws-s3",
    name: "AWS S3",
    description: "Cloud object storage service",
    category: "storage",
    icon: Database,
    color: "bg-orange-500",
    popular: true,
    connected: false,
  },
]

const connectedIntegrations = availableIntegrations.filter((integration) => integration.connected)

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("browse")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredIntegrations = availableIntegrations.filter((integration) => {
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory
    const matchesSearch =
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getStatusIcon = (connected: boolean) => {
    return connected ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Clock className="w-4 h-4 text-gray-400" />
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="connected">Connected ({connectedIntegrations.length})</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {integrationCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Popular Integrations */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Popular Integrations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations
                .filter((integration) => integration.popular)
                .map((integration) => (
                  <Card key={integration.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg ${integration.color} flex items-center justify-center`}>
                            <ImageIcon className="w-5 h-5 text-white" as={integration.icon} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{integration.name}</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              Popular
                            </Badge>
                          </div>
                        </div>
                        {getStatusIcon(integration.connected)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                      <div className="flex items-center space-x-2">
                        {integration.connected ? (
                          <>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Settings className="w-4 h-4 mr-2" />
                              Configure
                            </Button>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" className="flex-1">
                            <Plus className="w-4 h-4 mr-2" />
                            Connect
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* All Integrations */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">All Integrations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => (
                <Card key={integration.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${integration.color} flex items-center justify-center`}>
                          <ImageIcon className="w-5 h-5 text-white" as={integration.icon} />
                        </div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                      </div>
                      {getStatusIcon(integration.connected)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                    <div className="flex items-center space-x-2">
                      {integration.connected ? (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Settings className="w-4 h-4 mr-2" />
                            Configure
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="flex-1">
                          <Plus className="w-4 h-4 mr-2" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="connected" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {connectedIntegrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${integration.color} flex items-center justify-center`}>
                        <integration.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">Connected</span>
                        </div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-green-600">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Connected:</span>
                      <span>2 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last used:</span>
                      <span>1 hour ago</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      Disconnect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Auto-sync data</h4>
                    <p className="text-sm text-muted-foreground">Automatically sync data between integrations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Real-time notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified when integrations trigger</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Error reporting</h4>
                    <p className="text-sm text-muted-foreground">Send error reports for failed integrations</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security & Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-green-500" />
                  <div>
                    <h4 className="font-medium">All connections encrypted</h4>
                    <p className="text-sm text-muted-foreground">Your data is protected with end-to-end encryption</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <h4 className="font-medium">SOC 2 Type II compliant</h4>
                    <p className="text-sm text-muted-foreground">We meet the highest security standards</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Security Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
