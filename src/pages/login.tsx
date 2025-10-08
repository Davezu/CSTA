import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Lock, User, GraduationCap, AlertCircle } from 'lucide-react'

function Login() {
  const { login, isLoading } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [selectedRole, setSelectedRole] = useState<'student' | 'instructor' | 'admin'>('student')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Please enter both username and password')
      return
    }

    const success = await login(username, password)
    if (!success) {
      setError('Invalid username or password')
    }
  }

  const demoAccounts = {
    student: { username: 'student1', password: 'password' },
    instructor: { username: 'instructor1', password: 'password' },
    admin: { username: 'admin1', password: 'password' }
  }

  const fillDemoCredentials = (role: 'student' | 'instructor' | 'admin') => {
    const account = demoAccounts[role]
    setUsername(account.username)
    setPassword(account.password)
    setSelectedRole(role)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-400 to-amber-700 dark:from-gray-900 dark:to-amber-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <GraduationCap className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CSTA LMS</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to your account
          </p>
        </div>

        {/* Demo Accounts */}
        <div className="bg-card rounded-lg border p-4 space-y-3">
          <h3 className="font-medium text-sm text-center">Demo Accounts</h3>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={selectedRole === 'student' ? 'default' : 'outline'}
              size="sm"
              onClick={() => fillDemoCredentials('student')}
              className="text-xs">
              Student
            </Button>
            <Button
              variant={selectedRole === 'instructor' ? 'default' : 'outline'}
              size="sm"
              onClick={() => fillDemoCredentials('instructor')}
              className="text-xs">
              Instructor
            </Button>
            <Button
              variant={selectedRole === 'admin' ? 'default' : 'outline'}
              size="sm"
              onClick={() => fillDemoCredentials('admin')}
              className="text-xs">
              Admin
            </Button>
          </div>
          <div className="text-xs text-muted-foreground text-center">
            Click to auto-fill credentials
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-card rounded-lg border p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  placeholder="Enter your username"
                  disabled={isLoading}/>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  placeholder="Enter your password"
                  disabled={isLoading}/>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={isLoading}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 CSTA Learning Management System</p>
          <p className="mt-1">Built with modern web technologies</p>
        </div>
      </div>
    </div>
  )
}

export default Login
