import React, { useState } from 'react'
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { 
  BookOpen, 
  Search, 
  Download,
  Calculator,
  Award,
  Target,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

]

function Grades() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null)
  const [grades] = useState<Grade[]>(mockGrades)
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'in-progress' | 'pending'>('all')
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6
  const listRef = React.useRef<HTMLDivElement | null>(null)
  const [, setListHeight] = useState<number | undefined>(undefined)

  const recalcPageSize = React.useCallback(() => {
    setListHeight(undefined)
  }, [])

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.subjectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || grade.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const totalPages = Math.max(1, Math.ceil(filteredGrades.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedGrades = filteredGrades.slice(startIndex, endIndex)

  React.useEffect(() => {
    setCurrentPage(1)
    recalcPageSize()
  }, [searchTerm, filterStatus, recalcPageSize])

  React.useEffect(() => {
    recalcPageSize()
    const onResize = () => recalcPageSize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [recalcPageSize])

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

  const handleExportGrades = () => {
    const csvContent = [
      ['Subject', 'Code', 'Instructor', 'Units', 'Midterm', 'Final', 'Class Standing', 'Total Grade', 'Numerical Grade', 'Remarks', 'Status', 'Semester', 'Year'],
      ...grades.map(grade => [
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
    a.download = 'grades_export.csv'
    a.click()
    URL.revokeObjectURL(url)
    alert('Grades exported successfully!')
  }

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
            <Button onClick={handleExportGrades} size="sm" variant="outline" className="flex-shrink-0">
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="ml-1 text-xs sm:text-sm">Export</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="flex-shrink-0">
              <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="ml-1 text-xs sm:text-sm">Refresh</span>
            </Button>
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

        {/* Search and Filter */}
        <div className="space-y-2 sm:space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            <Input
              placeholder="Search subjects, codes, or instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 sm:pl-10 text-xs sm:text-sm"
            />
          </div>
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
        </div>

        {/* Main Content */}
        <div className="space-y-2">
          {/* Grades List */}
          <div className="bg-card rounded-lg border">
            <div ref={listRef} className="divide-y">
              {paginatedGrades.map((grade) => (
                <div
                  key={grade.id}
                  data-row="grade-item"
                  className={`flex items-start gap-2 sm:gap-2 p-1.5 sm:p-2 hover:bg-muted/50 cursor-pointer transition-colors ${
                    selectedGrade?.id === grade.id ? 'bg-muted/50' : ''}`}
                  onClick={() => {
                    setSelectedGrade(grade)
                    setIsDetailOpen(true)
                  }}>
                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5">
                      <div className="min-w-0">
                        <h3 className="font-medium text-xs sm:text-sm truncate">{grade.subject} <span className="text-muted-foreground">({grade.subjectCode})</span></h3>
                        <p className="text-[11px] sm:text-xs text-muted-foreground truncate">{grade.instructor} • {grade.units} units • {grade.semester} {grade.year}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(grade.status)}`}>
                          {grade.status === 'in-progress' ? 'In Progress' : grade.status}
                        </span>
                        
                        <div className="text-right whitespace-nowrap">
                          {grade.numericalGrade ? (
                            <div>
                              <div className={`text-xs sm:text-sm font-semibold ${getNumericalGradeColor(grade.numericalGrade)}`}>
                                {grade.numericalGrade}
                              </div>
                              <div className={`text-xs font-medium ${getRemarksColor(grade.remarks)}`}>
                                {grade.remarks}
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground">
                              {grade.status === 'pending' ? 'Not Started' : 'In Progress'}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {filteredGrades.length > pageSize && (
              <div className="flex items-center justify-between p-2 border-t sticky bottom-0 z-10 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
                <div className="text-xs text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredGrades.length)} of {filteredGrades.length}
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

            {filteredGrades.length === 0 && (
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
