"use server"

import { createServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export interface CreateProjectData {
  name: string
  description: string
  type: "react" | "nextjs" | "react-native" | "automation"
}

export async function createProject(data: CreateProjectData) {
  const supabase = createServerClient()

  try {
    const { data: project, error } = await supabase
      .from("projects")
      .insert({
        name: data.name,
        description: data.description,
        type: data.type,
        status: "draft",
        progress: 0,
        user_id: "00000000-0000-0000-0000-000000000000", // Mock user ID for demo
      })
      .select()
      .single()

    if (error) throw error

    revalidatePath("/dashboard")
    return { success: true, data: project }
  } catch (error) {
    console.error("Error creating project:", error)
    return { success: false, error: "Failed to create project" }
  }
}

export async function updateProject(
  id: string,
  updates: Partial<CreateProjectData & { status: string; progress: number }>,
) {
  const supabase = createServerClient()

  try {
    const { data: project, error } = await supabase.from("projects").update(updates).eq("id", id).select().single()

    if (error) throw error

    revalidatePath("/dashboard")
    return { success: true, data: project }
  } catch (error) {
    console.error("Error updating project:", error)
    return { success: false, error: "Failed to update project" }
  }
}

export async function deleteProject(id: string) {
  const supabase = createServerClient()

  try {
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error deleting project:", error)
    return { success: false, error: "Failed to delete project" }
  }
}

export async function getProjects() {
  const supabase = createServerClient()

  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .order("updated_at", { ascending: false })

    if (error) throw error

    return { success: true, data: projects || [] }
  } catch (error) {
    console.error("Error fetching projects:", error)
    return { success: false, error: "Failed to fetch projects", data: [] }
  }
}
