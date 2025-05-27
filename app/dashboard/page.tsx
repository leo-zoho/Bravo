import { Header } from "@/components/shared/header"
import { Sidebar } from "@/components/shared/sidebar"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {/* existing dashboard content */}
          <div>Dashboard Content Here</div>
        </main>
      </div>
    </div>
  )
}
