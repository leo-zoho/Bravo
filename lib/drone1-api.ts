// drone1 Autonomous Agent Orchestrator API Integration
// This file contains the API client for integrating with drone1 services

export interface HumanObjective {
  id: string
  description: string
  kpis: string[]
  constraints: string[]
  priority: "low" | "medium" | "high" | "critical"
  deadline?: Date
}

export interface AnnotatedIntent {
  id: string
  originalObjective: string
  parsedIntent: {
    goals: string[]
    requirements: string[]
    constraints: string[]
    success_criteria: string[]
  }
  confidence: number
  metadata: Record<string, any>
}

export interface SmartGoal {
  id: string
  specific: string
  measurable: string[]
  achievable: boolean
  relevant: string
  timebound: Date
  dependencies: string[]
  requiredCapabilities: string[]
}

export interface ActivationPackage {
  id: string
  curriculum: {
    tasks: Task[]
    workflows: Workflow[]
    learning_objectives: string[]
  }
  constraints: {
    resource_limits: ResourceLimits
    time_constraints: TimeConstraints
    quality_requirements: QualityRequirements
  }
  execution_plan: ExecutionPlan
}

export interface Agent {
  id: string
  archetype: string
  capabilities: string[]
  status: "idle" | "active" | "busy" | "offline"
  current_task?: string
  performance_metrics: {
    success_rate: number
    avg_completion_time: number
    quality_score: number
  }
}

export interface Task {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed" | "failed"
  assigned_agent?: string
  estimated_duration: number
  actual_duration?: number
  dependencies: string[]
  progress: number
}

export interface Workflow {
  id: string
  name: string
  tasks: Task[]
  status: "draft" | "active" | "paused" | "completed"
  progress: number
}

export interface ResourceLimits {
  max_cpu: number
  max_memory: number
  max_api_tokens: number
}

export interface TimeConstraints {
  start_time: Date
  deadline: Date
  max_duration: number
}

export interface QualityRequirements {
  min_accuracy: number
  max_error_rate: number
  required_validations: string[]
}

export interface ExecutionPlan {
  phases: ExecutionPhase[]
  milestones: Milestone[]
  rollback_strategy: string
}

export interface ExecutionPhase {
  id: string
  name: string
  tasks: string[]
  estimated_duration: number
  dependencies: string[]
}

export interface Milestone {
  id: string
  name: string
  criteria: string[]
  deadline: Date
}

export interface PerformanceMetrics {
  mission_id: string
  kpis: {
    [key: string]: {
      current_value: number
      target_value: number
      trend: "up" | "down" | "stable"
    }
  }
  anomalies: Anomaly[]
  overall_health: number
}

export interface Anomaly {
  id: string
  type: "performance" | "resource" | "quality"
  severity: "low" | "medium" | "high" | "critical"
  description: string
  detected_at: Date
  suggested_actions: string[]
}

export class Drone1ApiClient {
  private baseUrl: string
  private apiKey: string

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl
    this.apiKey = apiKey
  }

  // HumanObjectiveHub
  async submitObjective(objective: HumanObjective): Promise<AnnotatedIntent> {
    const response = await fetch(`${this.baseUrl}/objectives`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(objective),
    })
    return response.json()
  }

  // GoalInterpreter
  async parseGoal(goal: string): Promise<AnnotatedIntent> {
    const response = await fetch(`${this.baseUrl}/goals/parse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ goal }),
    })
    return response.json()
  }

  // MetaGoalTranslationLayer
  async decomposeGoal(intentId: string): Promise<SmartGoal[]> {
    const response = await fetch(`${this.baseUrl}/goals/${intentId}/decompose`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    })
    return response.json()
  }

  // ActivationPackager
  async generateActivationPackage(goals: SmartGoal[]): Promise<ActivationPackage> {
    const response = await fetch(`${this.baseUrl}/activation/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ goals }),
    })
    return response.json()
  }

  // AgentSwarmManager
  async getAvailableAgents(): Promise<Agent[]> {
    const response = await fetch(`${this.baseUrl}/agents`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    })
    return response.json()
  }

  async assignTask(taskId: string, agentId: string): Promise<void> {
    await fetch(`${this.baseUrl}/tasks/${taskId}/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ agent_id: agentId }),
    })
  }

  // ExecutionAndCollaborationEngine
  async executeActivationPackage(packageId: string): Promise<{ execution_id: string }> {
    const response = await fetch(`${this.baseUrl}/execution/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ package_id: packageId }),
    })
    return response.json()
  }

  async getExecutionStatus(executionId: string): Promise<{
    status: string
    progress: number
    current_phase: string
    tasks: Task[]
  }> {
    const response = await fetch(`${this.baseUrl}/execution/${executionId}/status`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    })
    return response.json()
  }

  // PerformanceMonitor
  async getPerformanceMetrics(missionId: string): Promise<PerformanceMetrics> {
    const response = await fetch(`${this.baseUrl}/performance/${missionId}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    })
    return response.json()
  }

  // FeedbackEngine
  async submitFeedback(
    executionId: string,
    feedback: {
      rating: number
      comments: string
      suggestions: string[]
    },
  ): Promise<void> {
    await fetch(`${this.baseUrl}/feedback/${executionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(feedback),
    })
  }

  // Real-time updates via WebSocket
  connectToUpdates(missionId: string, onUpdate: (data: any) => void): WebSocket {
    const ws = new WebSocket(`${this.baseUrl.replace("http", "ws")}/missions/${missionId}/updates`)

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      onUpdate(data)
    }

    return ws
  }
}

// Singleton instance
export const drone1Client = new Drone1ApiClient(
  process.env.NEXT_PUBLIC_DRONE1_API_URL || "https://api.drone1.example.com",
  process.env.DRONE1_API_KEY || "demo-key",
)
