import React, { useState } from 'react'
import { 
  BookOpen, 
  Search, 
  Download,
  Calculator,
  Award,
  Target,
  RefreshCw,
  FileText,
  TrendingUp
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
  }
]

function Grades() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null)
  const [grades] = useState<Grade[]>(mockGrades)
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'in-progress' | 'pending'>('all')

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.subjectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === 'all' || grade.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

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
    <div className="w-full px-4 sm:px-6 md:px-10 max-w-7xl mx-auto space-y-4 pb-6 min-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Grades</h1>
          <p className="text-sm text-muted-foreground">Track your academic progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleExportGrades} size="sm" className='cursor-pointer' variant="outline">
            <Download className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button variant="outline" size="sm" className='cursor-pointer' onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-card rounded-lg border p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Subjects</p>
              <p className="text-lg sm:text-2xl font-semibold">{stats.totalSubjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Award className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Passed</p>
              <p className="text-lg sm:text-2xl font-semibold">{stats.passedSubjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Calculator className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">GWA</p>
              <p className="text-lg sm:text-2xl font-semibold">{stats.gwa.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Target className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Units</p>
              <p className="text-lg sm:text-2xl font-semibold">{stats.completedUnits}/{stats.totalUnits}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subjects, codes, or instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'completed', 'in-progress', 'pending'] as const).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className="capitalize cursor-pointer text-xs sm:text-sm">
              {status === 'all' ? 'All' : status === 'in-progress' ? 'In Progress' : status}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 h-[70vh] min-h-[400px] max-h-[800px]">
        {/* Grades List */}
        <div className="flex-1 bg-card rounded-lg border flex flex-col h-full">
          <div className="divide-y flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {filteredGrades.map((grade) => (
              <div
                key={grade.id}
                className={`flex items-center gap-2 sm:gap-3 lg:gap-4 p-2 sm:p-3 lg:p-4 hover:bg-muted/50 cursor-pointer ${
                  selectedGrade?.id === grade.id ? 'bg-muted/50' : ''}`}
                onClick={() => setSelectedGrade(grade)}>
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="font-semibold text-sm sm:text-base truncate">{grade.subject}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">({grade.subjectCode})</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(grade.status)} self-start sm:self-auto`}>
                      {grade.status === 'in-progress' ? 'In Progress' : grade.status}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 lg:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <span>{grade.instructor}</span>
                    <span>{grade.units} units</span>
                    <span>{grade.semester} {grade.year}</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  {grade.numericalGrade ? (
                    <div>
                      <div className={`text-sm sm:text-lg font-semibold ${getNumericalGradeColor(grade.numericalGrade)}`}>
                        {grade.numericalGrade}
                      </div>
                      <div className={`text-xs sm:text-sm font-medium ${getRemarksColor(grade.remarks)}`}>
                        {grade.remarks}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {grade.status === 'pending' ? 'Not Started' : 'In Progress'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredGrades.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No grades found</h3>
              <p className="text-muted-foreground text-center">
                {searchTerm ? 'Try adjusting your search terms' : 'No grades available'}
              </p>
            </div>
          )}
        </div>

        {/* Grade Detail */}
        {selectedGrade && (
          <div className="w-full lg:w-80 xl:w-96 bg-card rounded-lg border p-3 flex flex-col h-full flex-shrink-0">
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <Button variant="ghost" size="sm" onClick={() => setSelectedGrade(null)} className="cursor-pointer">
                ← Back
              </Button>
            </div>

            <div className="flex-1 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
              <div className="text-center mb-2">
                <h2 className="text-sm sm:text-base font-semibold mb-1">{selectedGrade.subject}</h2>
                <p className="text-xs text-muted-foreground">{selectedGrade.subjectCode} • {selectedGrade.units} units</p>
                <p className="text-xs text-muted-foreground">{selectedGrade.instructor}</p>
                <p className="text-xs text-muted-foreground">{selectedGrade.semester} {selectedGrade.year}</p>
              </div>

              <div className="space-y-1 mb-2">
                <div className="flex justify-between items-center p-1.5 bg-muted/30 rounded">
                  <span className="text-xs font-medium">Midterm Exam</span>
                  <span className={`text-xs font-semibold ${getGradeColor(selectedGrade.midterm)}`}>
                    {selectedGrade.midterm ? `${selectedGrade.midterm}%` : 'N/A'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-1.5 bg-muted/30 rounded">
                  <span className="text-xs font-medium">Final Exam</span>
                  <span className={`text-xs font-semibold ${getGradeColor(selectedGrade.final)}`}>
                    {selectedGrade.final ? `${selectedGrade.final}%` : 'N/A'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-1.5 bg-muted/30 rounded">
                  <span className="text-xs font-medium">Class Standing</span>
                  <span className={`text-xs font-semibold ${getGradeColor(selectedGrade.classStanding)}`}>
                    {selectedGrade.classStanding ? `${selectedGrade.classStanding}%` : 'N/A'}
                  </span>
                </div>

                {selectedGrade.totalGrade && selectedGrade.numericalGrade && (
                  <div className="border-t pt-1">
                    <div className="flex justify-between items-center p-1.5 bg-muted/30 rounded">
                      <span className="text-xs font-semibold">Final Grade</span>
                      <div className="text-right">
                        <div className={`text-xs sm:text-sm font-bold ${getGradeColor(selectedGrade.totalGrade)}`}>
                          {selectedGrade.totalGrade.toFixed(1)}%
                        </div>
                        <div className={`text-xs font-bold ${getNumericalGradeColor(selectedGrade.numericalGrade)}`}>
                          {selectedGrade.numericalGrade}
                        </div>
                        <div className={`text-xs font-medium ${getRemarksColor(selectedGrade.remarks)}`}>
                          {selectedGrade.remarks}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Course Information */}
              <div className="bg-muted/20 rounded p-2 border mb-2">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <FileText className="h-3 w-3 text-primary" />
                    <h3 className="font-semibold text-xs">Course Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-1 bg-muted/30 rounded">
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="text-xs font-semibold capitalize">{selectedGrade.status.replace('-', ' ')}</p>
                    </div>
                    <div className="p-1 bg-muted/30 rounded">
                      <p className="text-xs text-muted-foreground">Progress</p>
                      <p className="text-xs font-semibold">
                        {selectedGrade.midterm && selectedGrade.final && selectedGrade.classStanding ? 'Complete' : 'In Progress'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grade Statistics */}
              <div className="bg-muted/20 rounded p-2 border mb-2">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Calculator className="h-3 w-3 text-primary" />
                    <h3 className="font-semibold text-xs">Grade Statistics</h3>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between items-center p-1 bg-muted/30 rounded">
                      <span className="text-xs text-muted-foreground">Average Score</span>
                      <span className="text-xs font-semibold">
                        {selectedGrade.midterm && selectedGrade.final && selectedGrade.classStanding 
                          ? `${((selectedGrade.midterm + selectedGrade.final + selectedGrade.classStanding) / 3).toFixed(1)}%`
                          : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-1 bg-muted/30 rounded">
                      <span className="text-xs text-muted-foreground">Highest Score</span>
                      <span className="text-xs font-semibold">
                        {selectedGrade.midterm && selectedGrade.final && selectedGrade.classStanding 
                          ? `${Math.max(selectedGrade.midterm, selectedGrade.final, selectedGrade.classStanding)}%`
                          : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-1 bg-muted/30 rounded">
                      <span className="text-xs text-muted-foreground">Lowest Score</span>
                      <span className="text-xs font-semibold">
                        {selectedGrade.midterm && selectedGrade.final && selectedGrade.classStanding 
                          ? `${Math.min(selectedGrade.midterm, selectedGrade.final, selectedGrade.classStanding)}%`
                          : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Insights */}
              <div className="bg-muted/20 rounded p-2 border mb-2">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <h3 className="font-semibold text-xs">Performance Insights</h3>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="p-1 bg-muted/30 rounded">
                      <p className="text-xs text-muted-foreground">Grade Trend</p>
                      <p className="text-xs font-semibold">
                        {selectedGrade.midterm && selectedGrade.final 
                          ? (selectedGrade.final > selectedGrade.midterm ? '📈 Improving' : 
                             selectedGrade.final < selectedGrade.midterm ? '📉 Declining' : '➡️ Stable')
                          : 'N/A'}
                      </p>
                    </div>
                    <div className="p-1 bg-muted/30 rounded">
                      <p className="text-xs text-muted-foreground">Class Standing</p>
                      <p className="text-xs font-semibold">
                        {selectedGrade.classStanding 
                          ? (selectedGrade.classStanding >= 90 ? '🌟 Excellent' :
                             selectedGrade.classStanding >= 80 ? '👍 Good' :
                             selectedGrade.classStanding >= 70 ? '⚠️ Needs Improvement' : '❌ Poor')
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Progress */}
              <div className="bg-muted/20 rounded p-2 border">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Target className="h-3 w-3 text-primary" />
                    <h3 className="font-semibold text-xs">Course Progress</h3>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="p-1 bg-muted/30 rounded">
                      <p className="text-xs text-muted-foreground">Completion</p>
                      <div className="w-full bg-muted/50 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-primary h-1.5 rounded-full" 
                          style={{ 
                            width: selectedGrade.midterm && selectedGrade.final && selectedGrade.classStanding 
                              ? '100%' : '60%' 
                          }}
                        ></div>
                      </div>
                      <p className="text-xs font-semibold mt-1">
                        {selectedGrade.midterm && selectedGrade.final && selectedGrade.classStanding 
                          ? '100% Complete' : '60% Complete'}
                      </p>
                    </div>
                    <div className="p-1 bg-muted/30 rounded">
                      <p className="text-xs text-muted-foreground">Units Earned</p>
                      <p className="text-xs font-semibold">
                        {selectedGrade.status === 'completed' ? `${selectedGrade.units} units` : '0 units'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Grades
