"use server"

import { createServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export interface CreateAutomationData {
  name: string
  description: string
  trigger_type: "schedule" | "webhook" | "manual" | "event"
  trigger_config: Record<string, any>
  actions: Array<{ type: string; config: Record<string, any> }>
}

export async function createAutomation(data: CreateAutomationData) {
  const supabase = createServerClient()

  try {
    const { data: automation, error } = await supabase
      .from("automations")
      .insert({
        name: data.name,
        description: data.description,
        trigger_type: data.trigger_type,
        trigger_config: data.trigger_config,
        actions: data.actions,
        status: "paused",
        success_rate: 0,
        run_count: 0,
        user_id: "00000000-0000-0000-0000-000000000000", // Mock user ID for demo
      })
      .select()
      .single()

    if (error) throw error

    revalidatePath("/automation")
    return { success: true, data: automation }
  } catch (error) {
    console.error("Error creating automation:", error)
    return { success: false, error: "Failed to create automation" }
  }
}

export async function updateAutomationStatus(id: string, status: "active" | "paused" | "stopped") {
  const supabase = createServerClient()

  try {
    const { data: automation, error } = await supabase
      .from("automations")
      .update({ status })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    revalidatePath("/automation")
    return { success: true, data: automation }
  } catch (error) {
    console.error("Error updating automation status:", error)
    return { success: false, error: "Failed to update automation status" }
  }
}

export async function getAutomations() {
  const supabase = createServerClient()

  try {
    const { data: automations, error } = await supabase
      .from("automations")
      .select("*")
      .order("updated_at", { ascending: false })

    if (error) throw error

    return { success: true, data: automations || [] }
  } catch (error) {
    console.error("Error fetching automations:", error)
    return { success: false, error: "Failed to fetch automations", data: [] }
  }
}

export async function runAutomation(id: string) {
  const supabase = createServerClient()

  try {
    // Create automation run record
    const { data: run, error: runError } = await supabase
      .from("automation_runs")
      .insert({
        automation_id: id,
        status: "running",
        user_id: "00000000-0000-0000-0000-000000000000", // Mock user ID for demo
      })
      .select()
      .single()

    if (runError) throw runError

    // Simulate automation execution
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Update run as completed
    const { error: updateError } = await supabase
      .from("automation_runs")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        output: { message: "Automation completed successfully" },
      })
      .eq("id", run.id)

    if (updateError) throw updateError

    // Update automation stats
    const { error: statsError } = await supabase
      .from("automations")
      .update({
        last_run: new Date().toISOString(),
        run_count: supabase.raw("run_count + 1"),
      })
      .eq("id", id)

    if (statsError) throw statsError

    revalidatePath("/automation")
    return { success: true, data: run }
  } catch (error) {
    console.error("Error running automation:", error)
    return { success: false, error: "Failed to run automation" }
  }
}
