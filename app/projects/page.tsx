import { Header } from "@/components/shared/header"
import { Sidebar } from "@/components/shared/sidebar"

export default function ProjectsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {/* existing projects content */}
          <div>
            <h1>Projects</h1>
            <p>This is the projects page.</p>
          </div>
        </main>
      </div>
    </div>
  )
}
