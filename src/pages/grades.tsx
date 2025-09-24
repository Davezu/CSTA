import React, { useState } from 'react'
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { usePersistentState } from '@/hooks/usePersistentState'
import { 
  BookOpen, 
  Search, 
  Download,
  Calculator,
  Award,
  Target,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Settings
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Grade {
  id: string
  subject: string
  subjectCode: string
  instructor: string
  units: number
  midterm: number | null
  final: number | null
  classStanding: number | null
  totalGrade: number | null
  numericalGrade: number | null 
  status: 'completed' | 'in-progress' | 'pending'
  semester: string
  year: string
  remarks: string | null
}

interface GradeStats {
  totalUnits: number
  completedUnits: number
  gwa: number
  totalSubjects: number
  completedSubjects: number
  passedSubjects: number
  failedSubjects: number
}

const mockGrades: Grade[] = [
  {
    id: '1',
    subject: 'Computer Programming I',
    subjectCode: 'CS101',
    instructor: 'Prof. URADA',
    units: 3,
    midterm: 85,
    final: 88,
    classStanding: 90,
    totalGrade: 87.5,
    numericalGrade: 2.25,
    status: 'completed',
    semester: '1st',
    year: '2024-2025',
    remarks: 'Passed'
  },
  {
    id: '2',
    subject: 'Data Structures',
    subjectCode: 'CS201',
    instructor: 'Prof. Dave',
    units: 3,
    midterm: 92,
    final: null,
    classStanding: 88,
    totalGrade: null,
    numericalGrade: null,
    status: 'in-progress',
    semester: '1st',
    year: '2024-2025',
    remarks: null
  },
  {
    id: '3',
    subject: 'Database Systems',
    subjectCode: 'CS301',
    instructor: 'Prof. Foreman',
    units: 3,
    midterm: 78,
    final: 82,
    classStanding: 85,
    totalGrade: 81.2,
    numericalGrade: 2.5,
    status: 'completed',
    semester: '2nd',
    year: '2023-2024',
    remarks: 'Passed'
  },
  {
    id: '4',
    subject: 'Web Development',
    subjectCode: 'CS401',
    instructor: 'Prof. IU',
    units: 3,
    midterm: null,
    final: null,
    classStanding: null,
    totalGrade: null,
    numericalGrade: null,
    status: 'pending',
    semester: '2nd',
    year: '2024-2025',
    remarks: null
  },
  {
    id: '5',
    subject: 'Software Engineering',
    subjectCode: 'CS501',
    instructor: 'Prof. Jiwon',
    units: 3,
    midterm: 95,
    final: 92,
    classStanding: 98,
    totalGrade: 94.2,
    numericalGrade: 1.75,
    status: 'completed',
    semester: '2nd',
    year: '2023-2024',
    remarks: 'Passed'
  },
  {
    id: '6',
    subject: 'Mathematics',
    subjectCode: 'MATH101',
    instructor: 'Prof. Han So Hee',
    units: 3,
    midterm: 65,
    final: 58,
    classStanding: 62,
    totalGrade: 61.5,
    numericalGrade: 3.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Passed'
  },
  {
    id: '7',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '8',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '9',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '10',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '11',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '12',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '13',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '14',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '9',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '9',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '9',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '9',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '9',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '9',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '9',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '9',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '9',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
  {
    id: '9',
    subject: 'Physics',
    subjectCode: 'PHYS101',
    instructor: 'Prof. Song Hye Kyo',
    units: 3,
    midterm: 45,
    final: 38,
    classStanding: 42,
    totalGrade: 41.5,
    numericalGrade: 5.0,
    status: 'completed',
    semester: '1st',
    year: '2023-2024',
    remarks: 'Failed'
  },
]

type SortField = 'subject' | 'instructor' | 'units' | 'status' | 'numericalGrade' | 'semester'
type SortOrder = 'asc' | 'desc'
type DensityMode = 'comfortable' | 'compact'

interface ColumnVisibility {
  instructor: boolean
  units: boolean
  semester: boolean
  status: boolean
  grade: boolean
}

function Grades() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null)
  const [grades] = useState<Grade[]>(mockGrades)
  const [filterStatus, setFilterStatus] = usePersistentState<'all' | 'completed' | 'in-progress' | 'pending'>('grades-filter-status', 'all')
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = usePersistentState<number>('grades-page-size', 6)
  const [sortField, setSortField] = usePersistentState<SortField | null>('grades-sort-field', null)
  const [sortOrder, setSortOrder] = usePersistentState<SortOrder>('grades-sort-order', 'asc')
  const [density, setDensity] = usePersistentState<DensityMode>('grades-density', 'comfortable')
  const [columnVisibility, setColumnVisibility] = usePersistentState<ColumnVisibility>('grades-columns', {
    instructor: true,
    units: true,
    semester: true,
    status: true,
    grade: true
  })
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showWhatIfSimulator, setShowWhatIfSimulator] = useState(false)
  const [whatIfGrades, setWhatIfGrades] = useState<Record<string, number>>({})
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const [sixRowHeight, setSixRowHeight] = useState<number | undefined>(undefined)

  const recalcPageSize = React.useCallback(() => {
    const firstRow = listRef.current?.querySelector('[data-row="grade-item"]') as HTMLElement | null
    if (firstRow) {
      const rowH = firstRow.getBoundingClientRect().height
      const dividerTotal = 5
      const headerHeight = 40 // Account for sort header
      setSixRowHeight(Math.max(48, Math.round(rowH * 6 + dividerTotal + headerHeight)))
    } else {
      setSixRowHeight(6 * 64 + 5 + 40) // Include header in fallback
    }
  }, [])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
    setCurrentPage(1)
  }

  const sortGrades = (grades: Grade[]): Grade[] => {
    if (!sortField) return grades
    
    return [...grades].sort((a, b) => {
      let aValue: string | number = a[sortField] as string | number
      let bValue: string | number = b[sortField] as string | number
      
      // Handle null values for numerical grade
      if (sortField === 'numericalGrade') {
        aValue = (aValue as number | null) ?? Infinity
        bValue = (bValue as number | null) ?? Infinity
      }
      
      // Convert to string for consistent comparison
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
      }
      if (typeof bValue === 'string') {
        bValue = bValue.toLowerCase()
      }
      
      let result = 0
      if (aValue < bValue) result = -1
      else if (aValue > bValue) result = 1
      
      return sortOrder === 'desc' ? -result : result
    })
  }

  const filteredAndSortedGrades = sortGrades(
    grades.filter(grade => {
    const matchesSearch = grade.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.subjectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || grade.status === filterStatus
    
    return matchesSearch && matchesFilter
  })
  )

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedGrades.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedGrades = filteredAndSortedGrades.slice(startIndex, endIndex)
  const needsPagination = !isLoading && !error && filteredAndSortedGrades.length > pageSize

  React.useEffect(() => {
    setCurrentPage(1)
    recalcPageSize()
  }, [searchTerm, filterStatus, pageSize, sortField, sortOrder, recalcPageSize])

  React.useEffect(() => {
    recalcPageSize()
    const onResize = () => recalcPageSize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [recalcPageSize])

  React.useEffect(() => {
    recalcPageSize()
  }, [currentPage, recalcPageSize])

  const calculateStats = (): GradeStats => {
    const completedGrades = grades.filter(grade => grade.status === 'completed' && grade.numericalGrade !== null)
    const totalUnits = grades.reduce((sum, grade) => sum + grade.units, 0)
    const completedUnits = completedGrades.reduce((sum, grade) => sum + grade.units, 0)
    
    const gwa = completedGrades.length > 0 
      ? completedGrades.reduce((sum, grade) => {
          return sum + (grade.numericalGrade! * grade.units)
        }, 0) / completedUnits
      : 0

    const passedSubjects = completedGrades.filter(grade => grade.numericalGrade! < 3.0).length
    const failedSubjects = completedGrades.filter(grade => grade.numericalGrade! >= 3.0).length

    return {
      totalUnits,
      completedUnits,
      gwa: Math.round(gwa * 100) / 100,
      totalSubjects: grades.length,
      completedSubjects: completedGrades.length,
      passedSubjects,
      failedSubjects
    }
  }

  const stats = calculateStats()

  const getGradeColor = (grade: number | null) => {
    if (grade === null) return 'text-muted-foreground'
    return 'text-foreground'
  }

  const getNumericalGradeColor = (numericalGrade: number | null) => {
    if (numericalGrade === null) return 'text-muted-foreground'
    return 'text-foreground'
  }

  const getRemarksColor = (remarks: string | null) => {
    if (!remarks) return 'text-muted-foreground'
    return 'text-foreground'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-muted text-muted-foreground'
      case 'in-progress': return 'bg-muted text-muted-foreground'
      case 'pending': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const handleExportGrades = (selectedOnly = false) => {
    const gradesToExport = selectedOnly 
      ? grades.filter(grade => selectedRows.has(grade.id))
      : grades
      
    const csvContent = [
      ['Subject', 'Code', 'Instructor', 'Units', 'Midterm', 'Final', 'Class Standing', 'Total Grade', 'Numerical Grade', 'Remarks', 'Status', 'Semester', 'Year'],
      ...gradesToExport.map(grade => [
        grade.subject,
        grade.subjectCode,
        grade.instructor,
        grade.units,
        grade.midterm || '',
        grade.final || '',
        grade.classStanding || '',
        grade.totalGrade || '',
        grade.numericalGrade || '',
        grade.remarks || '',
        grade.status,
        grade.semester,
        grade.year
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = selectedOnly ? 'selected_grades.csv' : 'grades_export.csv'
    a.click()
    URL.revokeObjectURL(url)
    alert(`${selectedOnly ? 'Selected grades' : 'All grades'} exported successfully!`)
  }

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedGrades.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(paginatedGrades.map(grade => grade.id)))
    }
  }

  const handleSelectRow = (gradeId: string) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(gradeId)) {
      newSelected.delete(gradeId)
    } else {
      newSelected.add(gradeId)
    }
    setSelectedRows(newSelected)
  }

  // const selectedGrades = grades.filter(grade => selectedRows.has(grade.id)) // For future bulk status updates

  const calculateGWA = (gradesData: Grade[], whatIfOverrides?: Record<string, number>) => {
    let totalWeightedGrade = 0
    let totalUnits = 0
    
    gradesData.forEach(grade => {
      if (grade.numericalGrade || whatIfOverrides?.[grade.id]) {
        const gradeValue = whatIfOverrides?.[grade.id] ?? grade.numericalGrade ?? 0
        const units = grade.units
        totalWeightedGrade += gradeValue * units
        totalUnits += units
      }
    })
    
    return totalUnits > 0 ? totalWeightedGrade / totalUnits : 0
  }

  const currentGWA = calculateGWA(grades)
  const projectedGWA = calculateGWA(grades, whatIfGrades)

  const getGradeEquivalent = (gwa: number) => {
    if (gwa >= 1.0 && gwa <= 1.2) return 'Summa Cum Laude'
    if (gwa >= 1.21 && gwa <= 1.45) return 'Magna Cum Laude'
    if (gwa >= 1.46 && gwa <= 1.75) return 'Cum Laude'
    if (gwa >= 1.76 && gwa <= 2.0) return 'Very Good'
    if (gwa >= 2.01 && gwa <= 2.5) return 'Good'
    if (gwa >= 2.51 && gwa <= 3.0) return 'Satisfactory'
    return 'Needs Improvement'
  }

  const GradeSkeleton = () => (
    <div className="flex items-start gap-2 sm:gap-2 p-1.5 sm:p-2">
      <Skeleton className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5">
          <div className="min-w-0 space-y-1">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Skeleton className="h-5 w-16 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const ErrorState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12">
      <div className="h-8 w-8 sm:h-12 sm:w-12 text-destructive mb-3 sm:mb-4">
        <RefreshCw className="h-full w-full" />
      </div>
      <h3 className="text-sm sm:text-lg font-semibold mb-2">Error loading grades</h3>
      <p className="text-xs sm:text-sm text-muted-foreground text-center mb-4">{message}</p>
      <Button variant="outline" size="sm" onClick={() => setError(null)}>
        Try Again
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen pt-0 pb-2 px-2 sm:px-1 lg:px-2">
      <div className="max-w-7xl mx-auto space-y-1 sm:space-y-2 -mt-2 sm:-mt-2 lg">
      {/* Header */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold">Grades</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Track your academic progress</p>
        </div>
        <div className="flex items-center gap-2">
            <Button onClick={() => handleExportGrades()} size="sm" variant="outline" className="flex-shrink-0">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="ml-1 text-xs sm:text-sm">Export</span>
            </Button>
            <Button 
              onClick={() => setShowWhatIfSimulator(!showWhatIfSimulator)} 
              size="sm" 
              variant={showWhatIfSimulator ? "default" : "outline"} 
              className="flex-shrink-0"
            >
              <Calculator className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="ml-1 text-xs sm:text-sm">What-If</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="flex-shrink-0">
              <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="ml-1 text-xs sm:text-sm">Refresh</span>
            </Button>
            {/* Demo buttons for testing states */}
            <Button variant="outline" size="sm" onClick={() => setIsLoading(!isLoading)} className="flex-shrink-0">
              <span className="text-xs sm:text-sm">{isLoading ? 'Stop Loading' : 'Demo Loading'}</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setError(error ? null : 'Failed to load grades from server')} className="flex-shrink-0">
              <span className="text-xs sm:text-sm">{error ? 'Clear Error' : 'Demo Error'}</span>
          </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                  <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="ml-1 text-xs sm:text-sm">View</span>
          </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Density</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={density} onValueChange={(value) => setDensity(value as DensityMode)}>
                  <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Columns</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={columnVisibility.instructor}
                  onCheckedChange={(checked) => 
                    setColumnVisibility(prev => ({ ...prev, instructor: checked ?? false }))
                  }
                >
                  Instructor
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={columnVisibility.units}
                  onCheckedChange={(checked) => 
                    setColumnVisibility(prev => ({ ...prev, units: checked ?? false }))
                  }
                >
                  Units
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={columnVisibility.semester}
                  onCheckedChange={(checked) => 
                    setColumnVisibility(prev => ({ ...prev, semester: checked ?? false }))
                  }
                >
                  Semester
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={columnVisibility.status}
                  onCheckedChange={(checked) => 
                    setColumnVisibility(prev => ({ ...prev, status: checked ?? false }))
                  }
                >
                  Status
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={columnVisibility.grade}
                  onCheckedChange={(checked) => 
                    setColumnVisibility(prev => ({ ...prev, grade: checked ?? false }))
                  }
                >
                  Grade
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
      </div>

      {/* Stats Cards */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <div className="bg-card rounded-lg border p-2 sm:p-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground truncate">Total</p>
                <p className="text-sm sm:text-lg font-semibold">{stats.totalSubjects}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-2 sm:p-3">
            <div className="flex items-center gap-2">
              <Award className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground truncate">Passed</p>
                <p className="text-sm sm:text-lg font-semibold">{stats.passedSubjects}</p>
        </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-2 sm:p-3">
            <div className="flex items-center gap-2">
              <Calculator className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground truncate">GWA</p>
                <p className="text-sm sm:text-lg font-semibold">{stats.gwa.toFixed(2)}</p>
        </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-2 sm:p-3">
            <div className="flex items-center gap-2">
              <Target className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground truncate">Units</p>
                <p className="text-sm sm:text-lg font-semibold">{stats.completedUnits}/{stats.totalUnits}</p>
            </div>
          </div>
        </div>
        </div>

        {/* What-If Grade Simulator */}
        {showWhatIfSimulator && (
          <div className="bg-card rounded-lg border p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Grade Simulator</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setWhatIfGrades({})}
                className="text-xs"
              >
                Reset All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Current vs Projected GWA */}
              <div className="space-y-3">
                <div className="bg-muted/30 rounded-lg p-3">
                  <h3 className="font-medium text-sm mb-2">Current GWA</h3>
                  <div className="text-2xl font-bold text-primary">
                    {currentGWA.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getGradeEquivalent(currentGWA)}
                  </div>
                </div>
                
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                  <h3 className="font-medium text-sm mb-2">Projected GWA</h3>
                  <div className="text-2xl font-bold text-primary">
                    {projectedGWA.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getGradeEquivalent(projectedGWA)}
                  </div>
                  {Math.abs(projectedGWA - currentGWA) > 0.01 && (
                    <div className={`text-xs mt-1 font-medium ${
                      projectedGWA > currentGWA ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {projectedGWA > currentGWA ? '+' : ''}{(projectedGWA - currentGWA).toFixed(2)} change
                    </div>
                  )}
                </div>
              </div>

              {/* Grade Inputs */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <h3 className="font-medium text-sm">Simulate Grades</h3>
                {grades.filter(grade => !grade.numericalGrade || grade.status === 'in-progress').map(grade => (
                  <div key={grade.id} className="flex items-center gap-2 p-2 bg-muted/20 rounded">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{grade.subject}</div>
                      <div className="text-xs text-muted-foreground">{grade.units} units</div>
                    </div>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.01"
                      placeholder={grade.numericalGrade?.toString() || "Grade"}
                      value={whatIfGrades[grade.id] || ''}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value)
                        if (!isNaN(value)) {
                          setWhatIfGrades(prev => ({ ...prev, [grade.id]: value }))
                        } else {
                          setWhatIfGrades(prev => {
                            const newGrades = { ...prev }
                            delete newGrades[grade.id]
                            return newGrades
                          })
                        }
                      }}
                      className="w-20 h-8 px-2 text-xs border rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              💡 Enter hypothetical grades to see how they would affect your GWA. Lower numbers are better (1.0 = highest, 5.0 = lowest).
            </div>
          </div>
        )}

        {/* Search and Filter - Sticky */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b pb-2 space-y-2 sm:space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          <Input
            placeholder="Search subjects, codes, or instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 sm:pl-10 text-xs sm:text-sm"
          />
        </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1">
          {(['all', 'completed', 'in-progress', 'pending'] as const).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(status)}
                  className="capitalize text-xs flex-shrink-0">
              {status === 'all' ? 'All' : status === 'in-progress' ? 'In Progress' : status}
            </Button>
          ))}
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-xs text-muted-foreground">Show</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="h-7 text-xs bg-background border rounded px-2"
              >
                {[6, 10, 15, 20, 50].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span className="text-xs text-muted-foreground">per page</span>
            </div>
        </div>
      </div>

        {/* Bulk Action Bar */}
        {selectedRows.size > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-2 flex items-center justify-between">
            <span className="text-sm font-medium">
              {selectedRows.size} item{selectedRows.size > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => handleExportGrades(true)}>
                <Download className="h-3 w-3 mr-1" />
                Export Selected
              </Button>
              <Button size="sm" variant="outline" onClick={() => setSelectedRows(new Set())}>
                Clear Selection
              </Button>
            </div>
          </div>
        )}

      {/* Main Content */}
        <div className="space-y-2">
        {/* Grades List */}
          <div className="bg-card rounded-lg border">
            {/* Sort Header - Sticky */}
            <div className="sticky top-[120px] z-10 flex items-center gap-2 p-2 border-b bg-muted/95 backdrop-blur supports-[backdrop-filter]:bg-muted/80 text-xs font-medium text-muted-foreground">
              <Checkbox
                checked={selectedRows.size === paginatedGrades.length && paginatedGrades.length > 0}
                onCheckedChange={handleSelectAll}
                className="h-3 w-3"
              />
                <div className="flex-1 min-w-0">
                <button
                  onClick={() => handleSort('subject')}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  Subject
                  {sortField === 'subject' ? (
                    sortOrder === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                  ) : (
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  Status
                  {sortField === 'status' ? (
                    sortOrder === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                  ) : (
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  )}
                </button>
                <button
                  onClick={() => handleSort('numericalGrade')}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  Grade
                  {sortField === 'numericalGrade' ? (
                    sortOrder === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                  ) : (
                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                  )}
                </button>
              </div>
                  </div>
            <div
              ref={listRef}
              className={`divide-y ${pageSize > 6 ? 'overflow-y-auto' : ''} ${needsPagination ? 'pb-16' : ''}`}
              style={pageSize > 6 && sixRowHeight ? { maxHeight: `${sixRowHeight}px` } : undefined}
            >
              {isLoading ? (
                Array.from({ length: pageSize }).map((_, i) => (
                  <GradeSkeleton key={i} />
                ))
              ) : error ? (
                <ErrorState message={error} />
              ) : (
                paginatedGrades.map((grade, i) => (
                <div
                  key={`${grade.id}-${startIndex + i}`}
                  data-row="grade-item"
                  className={`flex items-start gap-2 sm:gap-2 ${density === 'compact' ? 'p-1' : 'p-1.5 sm:p-2'} hover:bg-muted/50 transition-colors ${
                    selectedGrade?.id === grade.id ? 'bg-muted/50' : ''}`}>
                  <Checkbox
                    checked={selectedRows.has(grade.id)}
                    onCheckedChange={() => handleSelectRow(grade.id)}
                    className="h-3 w-3 mt-0.5 flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div 
                    className="flex items-start gap-2 flex-1 cursor-pointer"
                    onClick={() => {
                      setSelectedGrade(grade)
                      setIsDetailOpen(true)
                    }}
                  >
                    <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5">
                      <div className="min-w-0">
                        <h3 className={`font-medium truncate ${density === 'compact' ? 'text-xs' : 'text-xs sm:text-sm'}`}>
                          {grade.subject} <span className="text-muted-foreground">({grade.subjectCode})</span>
                        </h3>
                        <div className={`text-muted-foreground truncate ${density === 'compact' ? 'text-[10px]' : 'text-[11px] sm:text-xs'}`}>
                          {columnVisibility.instructor && <span>{grade.instructor}</span>}
                          {columnVisibility.instructor && columnVisibility.units && <span> • </span>}
                          {columnVisibility.units && <span>{grade.units} units</span>}
                          {(columnVisibility.instructor || columnVisibility.units) && columnVisibility.semester && <span> • </span>}
                          {columnVisibility.semester && <span>{grade.semester} {grade.year}</span>}
                  </div>
                </div>

                      <div className="flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
                        {columnVisibility.status && (
                          <span className={`px-2 py-0.5 rounded-full font-medium ${density === 'compact' ? 'text-[10px]' : 'text-xs'} ${getStatusColor(grade.status)}`}>
                            {grade.status === 'in-progress' ? 'In Progress' : grade.status}
                          </span>
                        )}
                        
                        {columnVisibility.grade && (
                          <div className="text-right whitespace-nowrap">
                  {grade.numericalGrade ? (
                    <div>
                                <div className={`font-semibold ${density === 'compact' ? 'text-xs' : 'text-xs sm:text-sm'} ${getNumericalGradeColor(grade.numericalGrade)}`}>
                        {grade.numericalGrade}
                      </div>
                                <div className={`font-medium ${density === 'compact' ? 'text-[10px]' : 'text-xs'} ${getRemarksColor(grade.remarks)}`}>
                        {grade.remarks}
                      </div>
                    </div>
                  ) : (
                              <div className={`text-muted-foreground ${density === 'compact' ? 'text-[10px]' : 'text-xs'}`}>
                      {grade.status === 'pending' ? 'Not Started' : 'In Progress'}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {needsPagination && (
              <div className="flex items-center justify-between p-2 border-t sticky bottom-0 z-10 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
                <div className="text-xs text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedGrades.length)} of {filteredAndSortedGrades.length}
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" className="h-7 px-2 cursor-pointer" disabled={safePage === 1} onClick={() => setCurrentPage(safePage - 1)}>
                    <ChevronLeft className="h-3 w-3" />
                  </Button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button key={i} variant={safePage === i + 1 ? 'default' : 'outline'} size="sm" className="h-7 px-2 text-xs cursor-pointer" onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" className="h-7 px-2 cursor-pointer" disabled={safePage === totalPages} onClick={() => setCurrentPage(safePage + 1)}>
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}

            {!isLoading && !error && filteredAndSortedGrades.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                <BookOpen className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
                <h3 className="text-sm sm:text-lg font-semibold mb-2">No grades found</h3>
                <p className="text-xs sm:text-sm text-muted-foreground text-center">
                {searchTerm ? 'Try adjusting your search terms' : 'No grades available'}
              </p>
            </div>
          )}
          </div>
        </div>

        {/* Mobile/Tablet Detail Drawer */}
        {selectedGrade && (
          <Sheet open={isDetailOpen} onOpenChange={(open)=>{ setIsDetailOpen(open); if(!open){ setSelectedGrade(null) } }}>
            <SheetContent side="right" className="sm:max-w-md p-0">
              <div className="bg-card h-full overflow-y-auto p-3">
                <div className="flex items-center justify-between mb-3">
                  <Button variant="ghost" size="sm" onClick={() => setIsDetailOpen(false)} className="text-xs">
                ← Back
              </Button>
                </div>
                {/* Reuse same content structure as inline panel */}
                <div className="space-y-3">
                  <div className="text-center space-y-1">
                    <h2 className="text-sm font-semibold">{selectedGrade.subject}</h2>
                    <p className="text-xs text-muted-foreground">{selectedGrade.subjectCode} • {selectedGrade.units} units</p>
                    <p className="text-xs text-muted-foreground">{selectedGrade.instructor}</p>
                    <p className="text-xs text-muted-foreground">{selectedGrade.semester} {selectedGrade.year}</p>
                </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-muted/30 rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Midterm</p>
                      <p className={`text-sm font-semibold ${getGradeColor(selectedGrade.midterm)}`}>{selectedGrade.midterm ? `${selectedGrade.midterm}%` : 'N/A'}</p>
                    </div>
                    <div className="bg-muted/30 rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Final</p>
                      <p className={`text-sm font-semibold ${getGradeColor(selectedGrade.final)}`}>{selectedGrade.final ? `${selectedGrade.final}%` : 'N/A'}</p>
                    </div>
                    <div className="bg-muted/30 rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Standing</p>
                      <p className={`text-sm font-semibold ${getGradeColor(selectedGrade.classStanding)}`}>{selectedGrade.classStanding ? `${selectedGrade.classStanding}%` : 'N/A'}</p>
                    </div>
                </div>

                {selectedGrade.totalGrade && selectedGrade.numericalGrade && (
                    <div className="bg-primary/10 rounded p-3 text-center border">
                      <p className="text-xs text-muted-foreground mb-1">Final Grade</p>
                      <div className="space-y-1">
                        <p className={`text-lg font-bold ${getGradeColor(selectedGrade.totalGrade)}`}>{selectedGrade.totalGrade.toFixed(1)}%</p>
                        <p className={`text-sm font-bold ${getNumericalGradeColor(selectedGrade.numericalGrade)}`}>{selectedGrade.numericalGrade}</p>
                        <p className={`text-xs font-medium ${getRemarksColor(selectedGrade.remarks)}`}>{selectedGrade.remarks}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3">
                    <div className="bg-muted/20 rounded p-2 border">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-medium capitalize">{selectedGrade.status.replace('-', ' ')}</span>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{selectedGrade.midterm && selectedGrade.final && selectedGrade.classStanding ? 'Complete' : 'In Progress'}</span>
                      </div>
                    </div>
                    <div className="bg-muted/20 rounded p-2 border">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Average</span>
                        <span className="font-medium">{selectedGrade.midterm && selectedGrade.final && selectedGrade.classStanding ? `${((selectedGrade.midterm + selectedGrade.final + selectedGrade.classStanding) / 3).toFixed(1)}%` : 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-muted-foreground">Highest</span>
                        <span className="font-medium">{selectedGrade.midterm && selectedGrade.final && selectedGrade.classStanding ? `${Math.max(selectedGrade.midterm, selectedGrade.final, selectedGrade.classStanding)}%` : 'N/A'}</span>
                        </div>
                        </div>
                    <div className="bg-muted/20 rounded p-2 border">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Completion</span>
                        <span className="font-medium">{selectedGrade.midterm && selectedGrade.final && selectedGrade.classStanding ? '100%' : '60%'}</span>
                        </div>
                      <div className="w-full bg-muted/50 rounded-full h-1">
                        <div className="bg-primary h-1 rounded-full" style={{ width: selectedGrade.midterm && selectedGrade.final && selectedGrade.classStanding ? '100%' : '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  )
}

export default Grades
