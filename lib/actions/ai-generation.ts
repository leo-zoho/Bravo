"use server"

import { generateText, generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const ComponentSchema = z.object({
  name: z.string(),
  description: z.string(),
  code: z.string(),
  dependencies: z.array(z.string()),
  props: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      required: z.boolean(),
      description: z.string(),
    }),
  ),
})

export interface GenerateCodeData {
  prompt: string
  framework: "react" | "nextjs" | "react-native"
  type: "component" | "page" | "hook" | "utility"
}

export async function generateCode(data: GenerateCodeData) {
  try {
    const systemPrompt = `You are an expert ${data.framework} developer. Generate high-quality, production-ready code based on the user's requirements.

Guidelines:
- Use TypeScript
- Follow best practices and modern patterns
- Include proper error handling
- Add helpful comments
- Use appropriate hooks and patterns
- Ensure accessibility when applicable
- Make components reusable and well-structured

Framework: ${data.framework}
Type: ${data.type}`

    if (data.type === "component") {
      const result = await generateObject({
        model: openai("gpt-4o"),
        system: systemPrompt,
        prompt: `Generate a ${data.framework} ${data.type} based on this description: ${data.prompt}`,
        schema: ComponentSchema,
      })

      return { success: true, data: result.object }
    } else {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        prompt: `Generate a ${data.framework} ${data.type} based on this description: ${data.prompt}

Return the code with proper formatting and include any necessary imports.`,
      })

      return {
        success: true,
        data: {
          name: `Generated${data.type.charAt(0).toUpperCase() + data.type.slice(1)}`,
          description: `Generated ${data.type} based on user prompt`,
          code: text,
          dependencies: [],
          props: [],
        },
      }
    }
  } catch (error) {
    console.error("Error generating code:", error)
    return { success: false, error: "Failed to generate code" }
  }
}

export async function optimizeCode(code: string, context?: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an expert code optimizer. Analyze the provided code and suggest optimizations for:
      - Performance improvements
      - Better patterns and practices
      - Accessibility enhancements
      - Code readability
      - Security considerations
      
      Provide the optimized code with explanations of the changes made.`,
      prompt: `Optimize this code:

\`\`\`
${code}
\`\`\`

${context ? `Additional context: ${context}` : ""}

Return the optimized code with explanations of improvements.`,
    })

    return { success: true, data: text }
  } catch (error) {
    console.error("Error optimizing code:", error)
    return { success: false, error: "Failed to optimize code" }
  }
}

export async function debugCode(code: string, error: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an expert debugger. Analyze the provided code and error to:
      - Identify the root cause of the issue
      - Provide a clear explanation of what's wrong
      - Suggest specific fixes
      - Offer preventive measures for similar issues
      
      Be thorough but concise in your analysis.`,
      prompt: `Debug this code that's producing an error:

Code:
\`\`\`
${code}
\`\`\`

Error:
\`\`\`
${error}
\`\`\`

Provide a detailed analysis and solution.`,
    })

    return { success: true, data: text }
  } catch (error) {
    console.error("Error debugging code:", error)
    return { success: false, error: "Failed to debug code" }
  }
}
