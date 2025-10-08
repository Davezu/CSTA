import React, { useState } from 'react'

type Course = 'IT' | 'Educ'
type YearLevel = '1st' | '2nd' | '3rd' | '4th'

interface SubjectDef {
  name: string
  defaultCode: string
  units: number
}

const curriculum: Record<Course, Record<YearLevel, { sections: string[]; subjects: SubjectDef[] }>> = {
  IT: {
    '1st': { sections: ['A', 'B'], subjects: [
      { name: 'Intro to Computing', defaultCode: 'IT101', units: 3 },
      { name: 'Programming 1', defaultCode: 'IT102', units: 3 },
    ]},
    '2nd': { sections: ['A', 'B'], subjects: [
      { name: 'Data Structures', defaultCode: 'IT201', units: 3 },
      { name: 'Discrete Structures', defaultCode: 'IT202', units: 3 },
    ]},
    '3rd': { sections: ['A', 'B'], subjects: [
      { name: 'Web Development', defaultCode: 'IT301', units: 3 },
      { name: 'Database Systems', defaultCode: 'IT302', units: 3 },
    ]},
    '4th': { sections: ['A', 'B'], subjects: [
      { name: 'Capstone Project', defaultCode: 'IT401', units: 3 },
      { name: 'Systems Integration', defaultCode: 'IT402', units: 3 },
    ]},
  },
  Educ: {
    '1st': { sections: ['A', 'B'], subjects: [
      { name: 'Foundations of Education', defaultCode: 'ED101', units: 3 },
      { name: 'Child Development', defaultCode: 'ED102', units: 3 },
    ]},
    '2nd': { sections: ['A', 'B'], subjects: [
      { name: 'Curriculum Development', defaultCode: 'ED201', units: 3 },
      { name: 'Assessment of Learning', defaultCode: 'ED202', units: 3 },
    ]},
    '3rd': { sections: ['A', 'B'], subjects: [
      { name: 'Educational Technology', defaultCode: 'ED301', units: 3 },
      { name: 'Instructional Strategies', defaultCode: 'ED302', units: 3 },
    ]},
    '4th': { sections: ['A', 'B'], subjects: [
      { name: 'Practice Teaching', defaultCode: 'ED401', units: 6 },
      { name: 'Classroom Management', defaultCode: 'ED402', units: 3 },
    ]},
  }
}

function addSubject() {
  const [course, setCourse] = useState<Course | ''>('')
  const [yearLevel, setYearLevel] = useState<YearLevel | ''>('')
  const [section, setSection] = useState<string>('')
  const [subject, setSubject] = useState<SubjectDef | null>(null)

  const [subjectCode, setSubjectCode] = useState('')
  const [message, setMessage] = useState('')
  const [missingField, setMissingField] = useState<'course' | 'year' | 'section' | 'subject' | ''>('')

  const availableYears: YearLevel[] = ['1st','2nd','3rd','4th']
  const availableSections = course && yearLevel ? curriculum[course as Course][yearLevel as YearLevel].sections : []
  const availableSubjects = course && yearLevel ? curriculum[course as Course][yearLevel as YearLevel].subjects : []

  const onSelectSubject = (name: string) => {
    const picked = availableSubjects.find(s => s.name === name) || null
    setSubject(picked)
    setSubjectCode('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!course || !yearLevel || !section || !subject) {
      setMissingField(!course ? 'course' : !yearLevel ? 'year' : !section ? 'section' : 'subject')
      setMessage('Please complete course, year, section, and subject.')
      return
    }
    // Default derived fields
    const currentYear = new Date().getFullYear()
    const nextYear = currentYear + 1
    const academicYear = `${currentYear}-${nextYear}`

    const newGrade = {
      id: Date.now().toString(),
      subject: subject.name,
      subjectCode: subjectCode || subject.defaultCode,
      instructor: 'TBA',
      units: subject.units,
      midterm: null,
      final: null,
      classStanding: null,
      totalGrade: null,
      numericalGrade: null,
      remarks: null,
      status: 'in-progress',
      semester: '1st',
      year: academicYear
    }
    try {
      const existing = localStorage.getItem('user_grades')
      const parsed = existing ? JSON.parse(existing) : []
      localStorage.setItem('user_grades', JSON.stringify([...parsed, newGrade]))
      setMessage('Subject added to Grades. You can view it on the Grades page.')
      setSection(''); setSubject(null); setSubjectCode('');
    } catch (err) {
      console.error(err)
      setMessage('Failed to save. Please try again.')
    }
  }

  return (
    <div className="container-responsive max-w-xl space-y-4 pb-6">
      <h1 className="text-xl font-semibold">Add Subject to Grades</h1>
      {message && (
        <div className="text-sm text-yellow-600" aria-live="polite">{message}</div>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 bg-card border rounded-lg p-4">
        {/* Course */}
        <div className={`relative ${missingField==='course' ? 'ring-2 ring-red-500 rounded' : ''}`}>
          <select
            value={course}
            onChange={(e) => { setCourse(e.target.value as Course | ''); setYearLevel(''); setSection(''); setSubject(null); setMessage(''); setMissingField('') }}
            className="h-9 px-3 border rounded w-full cursor-pointer"
            aria-invalid={missingField==='course'}
            required>
            <option value="">Select Course</option>
            <option value="IT">IT</option>
            <option value="Educ">Educ</option>
          </select>
        </div>

        {/* Year */}
        <div className={`relative ${missingField==='year' ? 'ring-2 ring-red-500 rounded' : ''}`}>
          {!course && (
            <div
              className="absolute inset-0 z-10 cursor-not-allowed"
              onClick={() => { setMissingField('course'); setMessage('Please choose Course first.') }}
            />
          )}
          <select
            value={yearLevel}
            onChange={(e) => { setYearLevel(e.target.value as YearLevel | ''); setSection(''); setSubject(null); setMessage(''); setMissingField('') }}
            className={`cursor-pointer h-9 px-3 border rounded w-full ${!course ? 'opacity-50' : ''}`}
            disabled={!course}
            aria-invalid={missingField==='year'}
            required>
            <option value="">Select Year Level</option>
            {course && availableYears.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {!course && <p className="text-xs text-muted-foreground mt-1">Choose Course first</p>}
        </div>

        {/* Section */}
        <div className={`relative ${missingField==='section' ? 'ring-2 ring-red-500 rounded' : ''}`}>
          {(!course || !yearLevel) && (
            <div
              className="absolute inset-0 z-10 cursor-not-allowed"
              onClick={() => {
                if (!course) { setMissingField('course'); setMessage('Please choose Course first.'); return }
                if (!yearLevel) { setMissingField('year'); setMessage('Please choose Year Level first.'); return }
              }}
            />
          )}
          <select
            value={section}
            onChange={(e) => { setSection(e.target.value); setMessage(''); setMissingField('') }}
            className={`cursor-pointer h-9 px-3 border rounded w-full ${(!course || !yearLevel) ? 'opacity-50' : ''}`}
            disabled={!course || !yearLevel}
            aria-invalid={missingField==='section'}
            required>
            <option value="">Select Section</option>
            {yearLevel && availableSections.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {(!course || !yearLevel) && <p className="text-xs text-muted-foreground mt-1">Choose Course and Year first</p>}
        </div>

        {/* Subject */}
        <div className={`relative ${missingField==='subject' ? 'ring-2 ring-red-500 rounded' : ''}`}>
          {(!course || !yearLevel || !section) && (
            <div
              className="bsolute inset-0 z-10 cursor-not-allowed"
              onClick={() => {
                if (!course) { setMissingField('course'); setMessage('Please choose Course first.'); return }
                if (!yearLevel) { setMissingField('year'); setMessage('Please choose Year Level first.'); return }
                if (!section) { setMissingField('section'); setMessage('Please choose Section first.'); return }
              }}
            />
          )}
          <select
            value={subject?.name || ''}
            onChange={(e) => { onSelectSubject(e.target.value); setMessage(''); setMissingField('') }}
            className={`cursor-pointer h-9 px-3 border rounded w-full ${(!course || !yearLevel || !section) ? 'opacity-50' : ''}`}
            disabled={!course || !yearLevel || !section}
            aria-invalid={missingField==='subject'}
            required>
            <option value="">Select Subject</option>
            {section && availableSubjects.map(s => (
              <option key={s.name} value={s.name}>{s.name} ({s.units}u)</option>
            ))}
          </select>
          {(!course || !yearLevel || !section) && <p className="text-xs text-muted-foreground mt-1">Choose Course, Year and Section first</p>}
        </div>

        {/* Subject Code (editable) */}
        <input
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
          placeholder="Subject Code (e.g., IT301)"
          className="h-9 px-3 border rounded"
          required />

        <button type="submit" className="cursor-pointer h-9 px-4 rounded bg-primary text-primary-foreground">Add Subject</button>
      </form>
      <p className="text-sm text-muted-foreground">Flow: Choose Course → Year → Section → Subject → enter Code. Units are taken from curriculum; you can adjust the curriculum list in `list.tsx`.</p>
    </div>
  )
}

export default addSubject