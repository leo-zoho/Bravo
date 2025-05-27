"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MissionCanvas } from "@/components/missions/mission-canvas"
import { MissionControlCenter } from "@/components/missions/mission-control-center"
import { MissionAnalytics } from "@/components/missions/mission-analytics"
import { Header } from "@/components/shared/header"
import { Sidebar } from "@/components/shared/sidebar"

export default function MissionsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="canvas" className="h-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="canvas">Mission Canvas</TabsTrigger>
              <TabsTrigger value="control">Mission Control</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="canvas" className="h-full">
              <MissionCanvas />
            </TabsContent>

            <TabsContent value="control" className="h-full">
              <MissionControlCenter />
            </TabsContent>

            <TabsContent value="analytics" className="h-full">
              <MissionAnalytics />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
