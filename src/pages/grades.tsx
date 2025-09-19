import React, { useState } from 'react'
import { 
  BookOpen, 
  Search, 
  Download,
  Eye,
  Calculator,
  Award,
  Target,
  RefreshCw
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
  numericalGrade: number | null // 1.0-5.0 scale
  status: 'completed' | 'in-progress' | 'pending'
  semester: string
  year: string
  remarks: string | null
}

interface GradeStats {
  totalUnits: number
  completedUnits: number
  gwa: number // General Weighted Average (1.0-5.0)
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
    instructor: 'Prof. Johnson',
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
    instructor: 'Prof. Smith',
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
    instructor: 'Prof. Wilson',
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
    instructor: 'Prof. Davis',
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
    instructor: 'Prof. Brown',
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
    instructor: 'Prof. Garcia',
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
    instructor: 'Prof. Santos',
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
    
    // Calculate GWA (General Weighted Average) - lower is better in PH system
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
    <div className="w-full px-6 md:px-10 max-w-6xl mx-auto space-y-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Grades</h1>
          <p className="text-sm text-muted-foreground">Track your academic progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleExportGrades} size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Total Subjects</p>
              <p className="text-2xl font-semibold">{stats.totalSubjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Passed</p>
              <p className="text-2xl font-semibold">{stats.passedSubjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <Calculator className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">GWA</p>
              <p className="text-2xl font-semibold">{stats.gwa.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Units</p>
              <p className="text-2xl font-semibold">{stats.completedUnits}/{stats.totalUnits}</p>
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
        <div className="flex gap-2">
          {(['all', 'completed', 'in-progress', 'pending'] as const).map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className="capitalize"
            >
              {status === 'all' ? 'All' : status === 'in-progress' ? 'In Progress' : status}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-4 h-[calc(100vh-400px)]">
        {/* Grades List */}
        <div className="flex-1 bg-card rounded-lg border flex flex-col">
          <div className="divide-y flex-1 overflow-y-auto">
            {filteredGrades.map((grade) => (
              <div
                key={grade.id}
                className={`flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer ${
                  selectedGrade?.id === grade.id ? 'bg-muted/50' : ''
                }`}
                onClick={() => setSelectedGrade(grade)}
              >
                <BookOpen className="h-5 w-5 text-muted-foreground" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{grade.subject}</span>
                    <span className="text-sm text-muted-foreground">({grade.subjectCode})</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(grade.status)}`}>
                      {grade.status === 'in-progress' ? 'In Progress' : grade.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{grade.instructor}</span>
                    <span>{grade.units} units</span>
                    <span>{grade.semester} {grade.year}</span>
                  </div>
                </div>

                <div className="text-right">
                  {grade.numericalGrade ? (
                    <div>
                      <div className={`text-lg font-semibold ${getNumericalGradeColor(grade.numericalGrade)}`}>
                        {grade.numericalGrade}
                      </div>
                      <div className={`text-sm font-medium ${getRemarksColor(grade.remarks)}`}>
                        {grade.remarks}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
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
          <div className="w-96 bg-card rounded-lg border p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <Button variant="ghost" size="sm" onClick={() => setSelectedGrade(null)} className="cursor-pointer">
                ← Back
              </Button>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="cursor-pointer" title="View detailed breakdown">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="cursor-pointer" title="Calculate grade">
                  <Calculator className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">{selectedGrade.subject}</h2>
                <p className="text-sm text-muted-foreground">{selectedGrade.subjectCode} • {selectedGrade.units} units</p>
                <p className="text-sm text-muted-foreground">{selectedGrade.instructor}</p>
                <p className="text-sm text-muted-foreground">{selectedGrade.semester} {selectedGrade.year}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">Midterm Exam</span>
                  <span className={`font-semibold ${getGradeColor(selectedGrade.midterm)}`}>
                    {selectedGrade.midterm ? `${selectedGrade.midterm}%` : 'N/A'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">Final Exam</span>
                  <span className={`font-semibold ${getGradeColor(selectedGrade.final)}`}>
                    {selectedGrade.final ? `${selectedGrade.final}%` : 'N/A'}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium">Class Standing</span>
                  <span className={`font-semibold ${getGradeColor(selectedGrade.classStanding)}`}>
                    {selectedGrade.classStanding ? `${selectedGrade.classStanding}%` : 'N/A'}
                  </span>
                </div>

                {selectedGrade.totalGrade && selectedGrade.numericalGrade && (
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="font-semibold">Final Grade</span>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${getGradeColor(selectedGrade.totalGrade)}`}>
                          {selectedGrade.totalGrade.toFixed(1)}%
                        </div>
                        <div className={`text-lg font-bold ${getNumericalGradeColor(selectedGrade.numericalGrade)}`}>
                          {selectedGrade.numericalGrade}
                        </div>
                        <div className={`text-sm font-medium ${getRemarksColor(selectedGrade.remarks)}`}>
                          {selectedGrade.remarks}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Grades
