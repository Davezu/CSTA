import React, { useState, useEffect } from 'react'
import { 
  Play, 
  Pause, 
  Square,
  RotateCcw,
  Clock,
  BookOpen,
  Target,
  TrendingUp,
  Flame,
  Award,
  Coffee,
  Brain
} from 'lucide-react'
import { Button } from "@/components/ui/button"

interface FocusSession {
  id: string
  subject: string
  duration: number // in minutes
  completed: boolean
  date: string
  type: 'focus' | 'break'
}

interface StudyStreak {
  current: number
  longest: number
  lastSessionDate: string
}

const mockSessions: FocusSession[] = [
  { id: '1', subject: 'Data Structures', duration: 25, completed: true, date: '2024-12-10', type: 'focus' },
  { id: '2', subject: 'Algorithms', duration: 25, completed: true, date: '2024-12-10', type: 'focus' },
  { id: '3', subject: 'Database Systems', duration: 25, completed: true, date: '2024-12-09', type: 'focus' },
  { id: '4', subject: 'Web Development', duration: 25, completed: true, date: '2024-12-09', type: 'focus' },
]

const subjects = [
  'Data Structures',
  'Algorithms',
  'Database Systems',
  'Web Development',
  'Machine Learning',
  'Software Engineering',
  'Computer Networks',
  'Operating Systems'
]

function Focus() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0])
  const [sessionType, setSessionType] = useState<'focus' | 'break'>('focus')
  const [duration, setDuration] = useState(25) // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60) // seconds
  const [isRunning, setIsRunning] = useState(false)
  const [sessions, setSessions] = useState<FocusSession[]>(mockSessions)
  
  const streak: StudyStreak = {
    current: 3,
    longest: 7,
    lastSessionDate: '2024-12-10'
  }

  const todaySessions = sessions.filter(s => s.date === new Date().toISOString().split('T')[0])
  const totalFocusTime = sessions.reduce((acc, s) => s.type === 'focus' ? acc + s.duration : acc, 0)
  const completedSessions = sessions.filter(s => s.completed).length

  useEffect(() => {
    setTimeLeft(duration * 60)
  }, [duration])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsRunning(false)
            handleSessionComplete()
            return 0
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft])

  const handleSessionComplete = () => {
    const newSession: FocusSession = {
      id: Date.now().toString(),
      subject: selectedSubject,
      duration,
      completed: true,
      date: new Date().toISOString().split('T')[0],
      type: sessionType
    }
    
    setSessions(prev => [newSession, ...prev])
    
    // Auto-switch between focus and break
    if (sessionType === 'focus') {
      setSessionType('break')
      setDuration(5)
    } else {
      setSessionType('focus')
      setDuration(25)
    }
    
    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`${sessionType === 'focus' ? 'Focus' : 'Break'} session complete!`, {
        body: sessionType === 'focus' ? 'Time for a break!' : 'Ready for another focus session?',
        icon: '/img/csa.PNG'
      })
    }
  }

  const startTimer = () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
    setIsRunning(true)
  }

  const pauseTimer = () => setIsRunning(false)
  
  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(duration * 60)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getSessionTypeIcon = (type: 'focus' | 'break') => {
    return type === 'focus' ? <Brain className="h-4 w-4" /> : <Coffee className="h-4 w-4" />
  }

  return (
    <div className="w-full px-6 md:px-10 max-w-4xl mx-auto space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Target className="h-6 w-6" />
            Focus Sessions
          </h1>
          <p className="text-sm text-muted-foreground">Boost productivity with focused study sessions</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <h3 className="font-medium text-sm">Current Streak</h3>
          </div>
          <div className="text-2xl font-bold">{streak.current}</div>
          <p className="text-xs text-muted-foreground">days</p>
        </div>
        
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-4 w-4 text-yellow-500" />
            <h3 className="font-medium text-sm">Longest Streak</h3>
          </div>
          <div className="text-2xl font-bold">{streak.longest}</div>
          <p className="text-xs text-muted-foreground">days</p>
        </div>

        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <h3 className="font-medium text-sm">Total Focus Time</h3>
          </div>
          <div className="text-2xl font-bold">{Math.floor(totalFocusTime / 60)}</div>
          <p className="text-xs text-muted-foreground">hours</p>
        </div>

        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <h3 className="font-medium text-sm">Sessions Today</h3>
          </div>
          <div className="text-2xl font-bold">{todaySessions.length}</div>
          <p className="text-xs text-muted-foreground">completed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timer */}
        <div className="lg:col-span-2 bg-card rounded-lg border p-6">
          <div className="text-center space-y-6">
            {/* Session Type Toggle */}
            <div className="flex justify-center">
              <div className="bg-muted rounded-lg p-1 flex">
                <button
                  onClick={() => {
                    setSessionType('focus')
                    setDuration(25)
                    setIsRunning(false)
                    setTimeLeft(25 * 60)
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    sessionType === 'focus' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Brain className="h-4 w-4 inline mr-2" />
                  Focus (25 min)
                </button>
                <button
                  onClick={() => {
                    setSessionType('break')
                    setDuration(5)
                    setIsRunning(false)
                    setTimeLeft(5 * 60)
                  }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    sessionType === 'break' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Coffee className="h-4 w-4 inline mr-2" />
                  Break (5 min)
                </button>
              </div>
            </div>

            {/* Subject Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Study Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full max-w-xs mx-auto h-10 px-3 border rounded-md bg-background"
                disabled={isRunning}
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* Timer Display */}
            <div className="space-y-4">
              <div className={`text-6xl font-mono font-bold ${
                sessionType === 'focus' ? 'text-primary' : 'text-orange-500'
              }`}>
                {formatTime(timeLeft)}
              </div>
              
              {/* Progress Ring */}
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-muted/20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (timeLeft / (duration * 60))}`}
                      className={sessionType === 'focus' ? 'text-primary' : 'text-orange-500'}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {getSessionTypeIcon(sessionType)}
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3">
              <Button
                onClick={startTimer}
                disabled={isRunning || timeLeft === 0}
                size="lg"
                className="px-6"
              >
                <Play className="h-5 w-5 mr-2" />
                Start
              </Button>
              <Button
                onClick={pauseTimer}
                disabled={!isRunning}
                variant="outline"
                size="lg"
              >
                <Pause className="h-5 w-5 mr-2" />
                Pause
              </Button>
              <Button
                onClick={resetTimer}
                variant="outline"
                size="lg"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-4 w-4" />
            <h2 className="font-semibold">Recent Sessions</h2>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sessions.slice(0, 10).map(session => (
              <div key={session.id} className="flex items-center gap-3 p-2 bg-muted/20 rounded">
                <div className={`p-1.5 rounded-full ${
                  session.type === 'focus' ? 'bg-primary/20 text-primary' : 'bg-orange-500/20 text-orange-500'
                }`}>
                  {getSessionTypeIcon(session.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{session.subject}</div>
                  <div className="text-xs text-muted-foreground">
                    {session.duration} min • {session.date}
                  </div>
                </div>
                <div className="text-xs text-green-600 font-medium">✓</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Focus
