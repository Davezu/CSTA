import { z } from 'zod'

// Base API configuration
const API_BASE_URL = process.env.VITE_API_URL || '/api'

// Common schemas
export const PaginationSchema = z.object({
  page: z.number().min(1),
  pageSize: z.number().min(1).max(100),
  total: z.number(),
  totalPages: z.number()
})

export const ErrorSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  details: z.any().optional()
})

// Grade schemas
export const GradeSchema = z.object({
  id: z.string(),
  subject: z.string(),
  subjectCode: z.string(),
  instructor: z.string(),
  units: z.number(),
  midterm: z.number().optional(),
  final: z.number().optional(),
  classStanding: z.number().optional(),
  totalGrade: z.number().optional(),
  numericalGrade: z.number().optional(),
  remarks: z.string().optional(),
  status: z.enum(['completed', 'in-progress', 'pending']),
  semester: z.string(),
  year: z.string()
})

export const GradesResponseSchema = z.object({
  data: z.array(GradeSchema),
  pagination: PaginationSchema
})

// Module schemas
export const ModuleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  subject: z.string(),
  instructor: z.string(),
  content: z.string(),
  attachments: z.array(z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    size: z.number(),
    type: z.string()
  })),
  dueDate: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  status: z.enum(['draft', 'published', 'archived'])
})

export const ModulesResponseSchema = z.object({
  data: z.array(ModuleSchema),
  pagination: PaginationSchema
})

// Submission schemas
export const SubmissionSchema = z.object({
  id: z.string(),
  moduleId: z.string(),
  studentId: z.string(),
  content: z.string(),
  attachments: z.array(z.object({
    id: z.string(),
    name: z.string(),
    url: z.string(),
    size: z.number(),
    type: z.string()
  })),
  grade: z.number().optional(),
  feedback: z.string().optional(),
  status: z.enum(['draft', 'submitted', 'graded', 'returned']),
  submittedAt: z.string().optional(),
  gradedAt: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
})

// Notification schemas
export const NotificationSchema = z.object({
  id: z.string(),
  type: z.enum(['email', 'grade', 'announcement', 'deadline', 'system']),
  title: z.string(),
  message: z.string(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  isRead: z.boolean(),
  createdAt: z.string(),
  data: z.any().optional()
})

export const NotificationsResponseSchema = z.object({
  data: z.array(NotificationSchema),
  pagination: PaginationSchema
})

// Focus session schemas
export const FocusSessionSchema = z.object({
  id: z.string(),
  subject: z.string(),
  duration: z.number(),
  type: z.enum(['focus', 'break']),
  completed: z.boolean(),
  startedAt: z.string(),
  completedAt: z.string().optional(),
  createdAt: z.string()
})

// Type exports
export type Grade = z.infer<typeof GradeSchema>
export type GradesResponse = z.infer<typeof GradesResponseSchema>
export type Module = z.infer<typeof ModuleSchema>
export type ModulesResponse = z.infer<typeof ModulesResponseSchema>
export type Submission = z.infer<typeof SubmissionSchema>
export type Notification = z.infer<typeof NotificationSchema>
export type NotificationsResponse = z.infer<typeof NotificationsResponseSchema>
export type FocusSession = z.infer<typeof FocusSessionSchema>
export type Pagination = z.infer<typeof PaginationSchema>
export type ApiError = z.infer<typeof ErrorSchema>

// API Client class
export class ApiClient {
  private baseUrl: string
  private defaultHeaders: HeadersInit

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  // Set authorization token
  setToken(token: string) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      'Authorization': `Bearer ${token}`
    }
  }

  // Generic fetch wrapper with validation
  private async fetchWithValidation<T>(
    endpoint: string,
    schema: z.ZodSchema<T>,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const error = ErrorSchema.safeParse(errorData)
      
      if (error.success) {
        throw new Error(error.data.message || error.data.error)
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    }

    const data = await response.json()
    const validated = schema.safeParse(data)
    
    if (!validated.success) {
      console.error('API validation error:', validated.error)
      throw new Error('Invalid response format from server')
    }

    return validated.data
  }

  // Grades API
  async getGrades(params: {
    page?: number
    pageSize?: number
    search?: string
    status?: string
    sort?: string
    order?: 'asc' | 'desc'
  } = {}): Promise<GradesResponse> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString())
      }
    })

    return this.fetchWithValidation(
      `/grades?${searchParams.toString()}`,
      GradesResponseSchema
    )
  }

  async exportGrades(filters: any = {}): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/grades/export`, {
      method: 'POST',
      headers: this.defaultHeaders,
      body: JSON.stringify(filters)
    })

    if (!response.ok) {
      throw new Error('Failed to export grades')
    }

    return response.blob()
  }

  // Modules API
  async getModules(params: {
    page?: number
    pageSize?: number
    subject?: string
    status?: string
  } = {}): Promise<ModulesResponse> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString())
      }
    })

    return this.fetchWithValidation(
      `/modules?${searchParams.toString()}`,
      ModulesResponseSchema
    )
  }

  async getModule(id: string): Promise<Module> {
    return this.fetchWithValidation(`/modules/${id}`, ModuleSchema)
  }

  async createSubmission(moduleId: string, data: {
    content: string
    attachments?: File[]
  }): Promise<Submission> {
    const formData = new FormData()
    formData.append('content', data.content)
    
    if (data.attachments) {
      data.attachments.forEach((file, index) => {
        formData.append(`attachment_${index}`, file)
      })
    }

    const response = await fetch(`${this.baseUrl}/modules/${moduleId}/submissions`, {
      method: 'POST',
      headers: {
        ...this.defaultHeaders,
        'Content-Type': undefined // Let browser set multipart boundary
      } as any,
      body: formData
    })

    if (!response.ok) {
      throw new Error('Failed to create submission')
    }

    const data_response = await response.json()
    const validated = SubmissionSchema.safeParse(data_response)
    
    if (!validated.success) {
      throw new Error('Invalid submission response')
    }

    return validated.data
  }

  // Notifications API
  async getNotifications(params: {
    page?: number
    pageSize?: number
    type?: string
    isRead?: boolean
  } = {}): Promise<NotificationsResponse> {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString())
      }
    })

    return this.fetchWithValidation(
      `/notifications?${searchParams.toString()}`,
      NotificationsResponseSchema
    )
  }

  async markNotificationRead(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/notifications/${id}/read`, {
      method: 'POST',
      headers: this.defaultHeaders
    })
  }

  // Focus Sessions API
  async createFocusSession(data: {
    subject: string
    duration: number
    type: 'focus' | 'break'
  }): Promise<FocusSession> {
    return this.fetchWithValidation(
      '/focus-sessions',
      FocusSessionSchema,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    )
  }

  async completeFocusSession(id: string): Promise<FocusSession> {
    return this.fetchWithValidation(
      `/focus-sessions/${id}/complete`,
      FocusSessionSchema,
      { method: 'POST' }
    )
  }

  // Analytics API
  async getAnalytics(): Promise<any> {
    return this.fetchWithValidation('/analytics', z.any())
  }

  // What-If Simulation API
  async simulateGrades(whatIfGrades: Record<string, number>): Promise<{
    currentGWA: number
    projectedGWA: number
    improvement: number
    recommendations: string[]
  }> {
    const schema = z.object({
      currentGWA: z.number(),
      projectedGWA: z.number(),
      improvement: z.number(),
      recommendations: z.array(z.string())
    })

    return this.fetchWithValidation(
      '/grades/simulate',
      schema,
      {
        method: 'POST',
        body: JSON.stringify({ whatIfGrades })
      }
    )
  }
}

// Default API client instance
export const apiClient = new ApiClient()

// Helper hooks for common operations
export const useApiClient = () => {
  return {
    client: apiClient,
    
    // Common error handler
    handleError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('API Error:', error.message)
        return error.message
      }
      console.error('Unknown error:', error)
      return 'An unexpected error occurred'
    },
    
    // Loading state manager
    withLoading: async <T>(
      operation: () => Promise<T>,
      setLoading: (loading: boolean) => void
    ): Promise<T | null> => {
      try {
        setLoading(true)
        return await operation()
      } catch (error) {
        console.error(error)
        return null
      } finally {
        setLoading(false)
      }
    }
  }
}
