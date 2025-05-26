import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Project {
  id: string
  name: string
  description: string
  type: "react" | "nextjs" | "react-native" | "automation"
  status: "active" | "draft" | "paused" | "completed"
  progress: number
  created_at: string
  updated_at: string
  user_id: string
  collaborators: string[]
  code?: string
  config?: Record<string, any>
}

export interface Automation {
  id: string
  name: string
  description: string
  trigger_type: "schedule" | "webhook" | "manual" | "event"
  trigger_config: Record<string, any>
  actions: Array<{
    type: string
    config: Record<string, any>
  }>
  status: "active" | "paused" | "stopped"
  last_run?: string
  next_run?: string
  success_rate: number
  created_at: string
  updated_at: string
  user_id: string
}

export interface Integration {
  id: string
  name: string
  type: string
  status: "connected" | "error" | "disconnected"
  config: Record<string, any>
  last_sync?: string
  created_at: string
  updated_at: string
  user_id: string
}

export interface ChatMessage {
  id: string
  conversation_id: string
  type: "user" | "assistant"
  content: string
  metadata?: Record<string, any>
  created_at: string
  user_id: string
}

export interface Conversation {
  id: string
  title: string
  status: "active" | "resolved" | "archived"
  created_at: string
  updated_at: string
  user_id: string
}
