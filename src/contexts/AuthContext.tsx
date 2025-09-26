import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'student' | 'instructor' | 'admin'

export interface User {
  id: string
  username: string
  email: string
  fullName: string
  role: UserRole
  avatar?: string
  studentId?: string
  department?: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
  hasRole: (role: UserRole) => boolean
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    username: 'student1',
    password: 'password',
    email: 'student1@csta.edu',
    fullName: 'John Doe',
    role: 'student',
    studentId: '2021-00001',
    department: 'Computer Science',
    avatar: '/img/csa.PNG'
  },
  {
    id: '2',
    username: 'instructor1',
    password: 'password',
    email: 'prof.johnson@csta.edu',
    fullName: 'Prof. Johnson',
    role: 'instructor',
    department: 'Computer Science'
  },
  {
    id: '3',
    username: 'admin1',
    password: 'password',
    email: 'admin@csta.edu',
    fullName: 'System Administrator',
    role: 'admin',
    department: 'IT Services'
  }
]

// Role-based permissions
const rolePermissions: Record<UserRole, string[]> = {
  student: [
    'view_grades',
    'view_modules',
    'submit_assignments',
    'use_focus_sessions',
    'view_notifications',
    'view_analytics'
  ],
  instructor: [
    'view_grades',
    'edit_grades',
    'view_modules',
    'create_modules',
    'edit_modules',
    'view_submissions',
    'grade_submissions',
    'view_student_analytics',
    'send_notifications'
  ],
  admin: [
    'view_all_data',
    'manage_users',
    'system_settings',
    'audit_logs',
    'bulk_operations',
    'advanced_analytics'
  ]
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('csta_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        console.error('Failed to parse saved user data:', error)
        localStorage.removeItem('csta_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const foundUser = mockUsers.find(
        u => u.username === username && u.password === password
      )
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem('csta_user', JSON.stringify(userWithoutPassword))
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('csta_user')
  }

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    
    const userPermissions = rolePermissions[user.role] || []
    return userPermissions.includes(permission) || user.role === 'admin'
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
    hasRole,
    hasPermission
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
interface PermissionGuardProps {
  permission: string
  fallback?: ReactNode
  children: ReactNode
}

export function PermissionGuard({ permission, fallback = null, children }: PermissionGuardProps) {
  const { hasPermission } = useAuth()
  
  if (!hasPermission(permission)) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}

// Role wrapper component
interface RoleGuardProps {
  roles: UserRole[]
  fallback?: ReactNode
  children: ReactNode
}

export function RoleGuard({ roles, fallback = null, children }: RoleGuardProps) {
  const { user } = useAuth()
  
  if (!user || !roles.includes(user.role)) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}
