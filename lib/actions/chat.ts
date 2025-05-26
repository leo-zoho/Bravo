"use server"

import { createServerClient } from "@/lib/supabase"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface CreateConversationData {
  title: string
}

export interface SendMessageData {
  conversationId: string
  content: string
}

export async function createConversation(data: CreateConversationData) {
  const supabase = createServerClient()

  try {
    const { data: conversation, error } = await supabase
      .from("conversations")
      .insert({
        title: data.title,
        status: "active",
        user_id: "00000000-0000-0000-0000-000000000000", // Mock user ID for demo
      })
      .select()
      .single()

    if (error) throw error

    return { success: true, data: conversation }
  } catch (error) {
    console.error("Error creating conversation:", error)
    return { success: false, error: "Failed to create conversation" }
  }
}

export async function sendMessage(data: SendMessageData) {
  const supabase = createServerClient()

  try {
    // Save user message
    const { data: userMessage, error: userError } = await supabase
      .from("chat_messages")
      .insert({
        conversation_id: data.conversationId,
        type: "user",
        content: data.content,
        user_id: "00000000-0000-0000-0000-000000000000", // Mock user ID for demo
      })
      .select()
      .single()

    if (userError) throw userError

    // Generate AI response
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an AI assistant for the Bravo Platform, a comprehensive development and automation platform. 
      You help users with:
      - Debugging code and applications
      - Optimizing performance
      - Creating automation workflows
      - Code reviews and suggestions
      - Platform guidance and best practices
      
      Be helpful, concise, and provide actionable advice. When discussing code, provide specific examples.`,
      prompt: data.content,
    })

    // Save AI response
    const { data: aiMessage, error: aiError } = await supabase
      .from("chat_messages")
      .insert({
        conversation_id: data.conversationId,
        type: "assistant",
        content: text,
        user_id: "00000000-0000-0000-0000-000000000000", // Mock user ID for demo
      })
      .select()
      .single()

    if (aiError) throw aiError

    return { success: true, data: { userMessage, aiMessage } }
  } catch (error) {
    console.error("Error sending message:", error)
    return { success: false, error: "Failed to send message" }
  }
}

export async function getConversations() {
  const supabase = createServerClient()

  try {
    const { data: conversations, error } = await supabase
      .from("conversations")
      .select(`
        *,
        chat_messages(content, created_at, type)
      `)
      .order("updated_at", { ascending: false })

    if (error) throw error

    return { success: true, data: conversations || [] }
  } catch (error) {
    console.error("Error fetching conversations:", error)
    return { success: false, error: "Failed to fetch conversations", data: [] }
  }
}

export async function getMessages(conversationId: string) {
  const supabase = createServerClient()

  try {
    const { data: messages, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })

    if (error) throw error

    return { success: true, data: messages || [] }
  } catch (error) {
    console.error("Error fetching messages:", error)
    return { success: false, error: "Failed to fetch messages", data: [] }
  }
}
