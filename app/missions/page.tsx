"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MissionCanvas } from "@/components/missions/mission-canvas"
import { MissionControlCenter } from "@/components/missions/mission-control-center"
import { MissionAnalytics } from "@/components/missions/mission-analytics"

export default function MissionsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Missions</h1>
        <p className="text-muted-foreground">Create and manage autonomous agent missions with drone1 orchestrator</p>
      </div>

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
    </div>
  )
}
