import React from "react";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"
import { Module } from '@/lib/apiClient'

interface Deadline {
  id: string
  title: string
  date: Date
  description?: string
  priority: 'low' | 'medium' | 'high'
  source: 'manual' | 'module'
  moduleId?: string
}

const mockModules: Module[] = [
  {
    id: '1',
    title: 'Introduction to Data Structures',
    description: 'Learn fundamental data structures including arrays, linked lists, stacks, and queues.',
    subject: 'Data Structures',
    instructor: 'Prof. Doc',
    content: '',
    attachments: [],
    dueDate: '2025-10-20T23:59:00Z',
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-05T14:30:00Z',
    status: 'published'
  },
  {
    id: '2',
    title: 'Algorithm Analysis and Big O Notation',
    description: 'Understanding time and space complexity analysis for algorithms.',
    subject: 'Algorithms',
    instructor: 'Prof. Mark',
    content: '',
    attachments: [],
    dueDate: '2025-10-25T23:59:00Z',
    createdAt: '2025-10-02T09:00:00Z',
    updatedAt: '2025-10-02T09:00:00Z',
    status: 'published'
  },
  {
    id: '3',
    title: 'Database Design Principles',
    description: 'Learn the fundamentals of relational database design and normalization.',
    subject: 'Database Systems',
    instructor: 'Prof. Nice',
    content: '',
    attachments: [],
    dueDate: '2025-10-30T23:59:00Z',
    createdAt: '2024-12-03T11:00:00Z',
    updatedAt: '2024-12-03T11:00:00Z',
    status: 'published'
  }
]

function CalendarPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const [deadlines, setDeadlines] = React.useState<Deadline[]>([])

  React.useEffect(() => {
    const moduleDeadlines: Deadline[] = mockModules
      .filter(module => module.dueDate)
      .map(module => {
        const dueDate = new Date(module.dueDate!)
        const today = new Date()
        const daysUntil = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        
        let priority: 'low' | 'medium' | 'high' = 'low'
        if (daysUntil <= 3) priority = 'high'
        else if (daysUntil <= 7) priority = 'medium'
        
        return {
          id: `module-${module.id}`,
          title: module.title,
          date: dueDate,
          description: `${module.subject} - ${module.instructor}`,
          priority,
          source: 'module' as const,
          moduleId: module.id
        }
      })
    
    setDeadlines(moduleDeadlines)
  }, [])


  const getDaysUntilDeadline = (deadline: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const deadlineDate = new Date(deadline)
    deadlineDate.setHours(0, 0, 0, 0)
    const diff = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  const getDeadlinesForDate = (checkDate: Date) => {
    return deadlines.filter(d => {
      const dDate = new Date(d.date)
      return dDate.getDate() === checkDate.getDate() &&
             dDate.getMonth() === checkDate.getMonth() &&
             dDate.getFullYear() === checkDate.getFullYear()
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-600 border-red-500/20'
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  // Calendar generation
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    
    const days: (Date | null)[] = []
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    // Add all days in month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const changeMonth = (delta: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1))
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const isSelected = (date: Date) => {
    if (!selectedDate) return false
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear()
  }

  const calendarDays = generateCalendarDays()
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div className="h-screen flex flex-col p-2 overflow-hidden">
      <div className="flex-shrink-0 mb-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">My Work Calendar</h1>
            <p className="text-xs text-muted-foreground">Module deadlines and assignments</p>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-3 overflow-hidden min-h-0">
        {/* Calendar - Main Grid */}
        <div className="lg:col-span-3 bg-card rounded-lg border shadow-sm p-3 flex flex-col overflow-hidden min-h-0">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
              <h2 className="text-base font-bold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" onClick={() => changeMonth(-1)} className="h-7 w-7">
                  <ChevronLeft className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => changeMonth(1)} className="h-7 w-7">
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1.5 mb-1.5 flex-shrink-0">
              {weekDays.map(day => (
                <div key={day} className="text-center text-[11px] font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1.5 flex-1 overflow-hidden" style={{ gridTemplateRows: 'repeat(6, minmax(0, 1fr))' }}>
              {calendarDays.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} />
                }
                
                const dayDeadlines = getDeadlinesForDate(day)

                return (
                  <Popover key={index}>
                    <PopoverTrigger asChild>
                      <button
                        onClick={() => setSelectedDate(day)}
                        className={`
                          border rounded-md p-1.5 text-left transition-all hover:border-primary hover:shadow-md overflow-hidden min-h-0 w-full
                          ${isToday(day) ? 'bg-primary/5 border-primary font-semibold' : 'bg-card'}
                          ${isSelected(day) ? 'ring-2 ring-primary bg-primary/10' : ''}
                        `}
                      >
                        <div className="h-full flex flex-col min-h-0 overflow-hidden">
                          <span className="text-xs font-medium flex-shrink-0 mb-0.5">{day.getDate()}</span>
                          <div className="flex-1 space-y-0.5 overflow-hidden min-h-0">
                            {dayDeadlines.slice(0, 2).map(deadline => (
                              <div
                                key={deadline.id}
                                className="text-[9px] truncate px-0.5 py-0.5 rounded"
                                style={{
                                  backgroundColor: 
                                    deadline.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' :
                                    deadline.priority === 'medium' ? 'rgba(234, 179, 8, 0.1)' :
                                    'rgba(34, 197, 94, 0.1)',
                                  color:
                                    deadline.priority === 'high' ? 'rgb(220, 38, 38)' :
                                    deadline.priority === 'medium' ? 'rgb(161, 98, 7)' :
                                    'rgb(21, 128, 61)'
                                }}
                              >
                                {deadline.title}
                              </div>
                            ))}
                            {dayDeadlines.length > 2 && (
                              <div className="text-[8px] text-muted-foreground px-0.5">
                                +{dayDeadlines.length - 2}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </PopoverTrigger>
                    {dayDeadlines.length > 0 && (
                      <PopoverContent 
                        className="w-64 p-2 z-50" 
                        align="start" 
                        side="bottom" 
                        sideOffset={5}
                        alignOffset={-10}
                        avoidCollisions={true}
                        collisionPadding={10}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <AlertCircle className="h-3 w-3 text-primary" />
                            <h3 className="font-semibold text-xs">
                              {day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </h3>
                          </div>
                          <div className="space-y-1.5">
                            {dayDeadlines.map(deadline => (
                              <div key={deadline.id} className={`p-2 rounded-md border ${getPriorityColor(deadline.priority)}`}>
                                <h4 className="font-medium text-xs">{deadline.title}</h4>
                                {deadline.description && (
                                  <p className="text-[10px] mt-0.5 opacity-80 line-clamp-1">{deadline.description}</p>
                                )}
                                <Badge variant="outline" className="mt-1 text-[9px] px-1 py-0">
                                  {deadline.priority}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    )}
                  </Popover>
                )
              })}
            </div>

          {/* Legend */}
          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[9px] text-muted-foreground flex-shrink-0">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                <span>High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span>Low</span>
              </div>
            </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-2 overflow-hidden flex flex-col min-h-0">
          {/* Upcoming Deadlines */}
          <div className="bg-card rounded-lg border shadow-sm p-2 flex-1 min-h-0 overflow-hidden flex flex-col">
              <h2 className="font-semibold text-xs mb-2 flex-shrink-0">Upcoming This Week</h2>
              <div className="space-y-1.5 overflow-hidden">
                {deadlines
                  .filter(d => getDaysUntilDeadline(d.date) >= 0 && getDaysUntilDeadline(d.date) <= 7)
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 3)
                  .map(deadline => {
                    const daysUntil = getDaysUntilDeadline(deadline.date)
return (
                      <div key={deadline.id} className="flex items-center gap-2 p-1.5 rounded-lg bg-muted/50">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getPriorityDot(deadline.priority)}`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{deadline.title}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil}d`}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                {deadlines.filter(d => getDaysUntilDeadline(d.date) >= 0 && getDaysUntilDeadline(d.date) <= 7).length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-2">No upcoming deadlines</p>
                )}
                {deadlines.filter(d => getDaysUntilDeadline(d.date) >= 0 && getDaysUntilDeadline(d.date) <= 7).length > 3 && (
                  <p className="text-[10px] text-muted-foreground text-center pt-1">
                    +{deadlines.filter(d => getDaysUntilDeadline(d.date) >= 0 && getDaysUntilDeadline(d.date) <= 7).length - 3} more
                  </p>
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarPage