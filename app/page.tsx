import { Header } from "@/components/shared/header"
import { Sidebar } from "@/components/shared/sidebar"

export default function Home() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {/* existing page content */}
          <div>
            <h1>Welcome to the Dashboard</h1>
            <p>This is the main page content.</p>
          </div>
        </main>
      </div>
    </div>
  )
}
