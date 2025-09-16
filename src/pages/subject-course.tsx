import React from 'react'
import { CheckIcon, ChevronsUpDownIcon, BookOpen, Users, Calendar, Plus,} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input"
type EnrolledSubject = {
  id: number
  subject: string
  course: string
  section: string
}
type Courses = {
  value: string;
  label: string;
}

const course: Courses[] = [
  {
    value: "BSIT",
    label: "BSIT",
  },
  {
    value: "BSTM",
    label: "BSTM",
  },
  {
    value: "BSEd Major in English",
    label: "BSEd Major in English",
  },
  {
    value: "BSEd Major in Mathematics",
    label: "BSEd Major in Mathematics",
  },
  {
    value: "BSEd Major in Filipino",
    label: "BSEd Major in Filipino",
  },
  {
    value: "BSHM",
    label: "BSHM",
  },
]

const sectionsByCourse: Record<string, { value: string; label: string }[]> = {
  BSIT: [
    { value: "4-2", label: "4-2" }, 
    { value: "4-3", label: "4-3" }, 
    { value: "4-4", label: "4-4" }
  ],
  BSHM: [
    { value: "2-1", label: "2-2" }, 
    { value: "2-2", label: "2-2" }
  ],
  BSTM: [
    { value: "1-2", label: "1-1" }
  ],
  "BSEd Major in English": [
    { value: "3-1", label: "3-1" },
    { value: "3-2", label: "3-2" },
  ],
  "BSEd Major in Mathematics": [
    { value: "1-1", label: "1-1" },
    { value: "1-2", label: "1-2" },
    { value: "1-3", label: "1-3" },
    { value: "1-4", label: "1-4" },
  ],
  "BSEd Major in Filipino": [
    { value: "2-2", label: "2-2" },
    { value: "2-3", label: "2-3" },
  ],
}
  const subjectsByCourseSection: Record<string, { value: string; label: string }[]> = {
    "BSIT-4-2": [
      { value: "Web Development", label: "Web Development" },
      { value: "Mobile App Development", label: "Mobile App Development" },
      { value: "Database Management", label: "Database Management" },
    ],
    "BSIT-4-3": [
      { value: "Network Security", label: "Network Security" },
      { value: "Cloud Computing", label: "Cloud Computing" },
      { value: "Software Engineering", label: "Software Engineering" },
    ],
    "BSIT-4-4": [
      { value: "Artificial Intelligence", label: "Artificial Intelligence" },
      { value: "Machine Learning", label: "Machine Learning" },
      { value: "Data Science", label: "Data Science" },
    ],
    "BSEd Major in English-3-1": [
      { value: "Literature", label: "Literature" },
      { value: "Linguistics", label: "Linguistics" },
      { value: "Creative Writing", label: "Creative Writing" },
    ],
  }

function SubjectCourse() {
  const navigate = useNavigate()
  const [courseOpen, setCourseOpen] = React.useState(false)
  const [courseValue, setCourseValue] = React.useState("")

  const [sectionOpen, setSectionOpen] = React.useState(false)
  const [sectionValue, setSectionValue] = React.useState("")

  const [subjectOpen, setSubjectOpen] = React.useState(false)
  const [subjectValue, setSubjectValue] = React.useState("")
  const [enrolledSubjects, setEnrolledSubjects] = React.useState<EnrolledSubject[]>(() => {
      const subjectData = localStorage.getItem("enrolledSubjects")
      return subjectData ? (JSON.parse(subjectData) as EnrolledSubject[]) : []
  })
 
  React.useEffect(() => {
      localStorage.setItem("enrolledSubjects", JSON.stringify(enrolledSubjects))
  }, [enrolledSubjects])
 
  const handleJoinCourse = () => {
    if (!subjectValue || !sectionValue || !courseValue) return
    const newSubject: EnrolledSubject = {
      id: Date.now(),
      subject: subjectValue,
      course: courseValue,
      section: sectionValue,
    }
    setEnrolledSubjects((prev) => [...prev, newSubject])
    setSubjectValue("")
    setSectionValue("")
    setCourseValue("")
  }

  const handleLeaveSubject = (id: number) => {
    setEnrolledSubjects((prev) => prev.filter((subject) => subject.id !== id))
  }


  const availableSections = sectionsByCourse[courseValue] ?? []
  const availableSubjects = subjectsByCourseSection[`${courseValue}-${sectionValue}`] ?? []
  const sectionDisabled = courseValue === ""
  const subjectDisabled = sectionValue === ""

  return (
    <div className="pt-0 pb-20 px-6 md:px-10 max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Course & Subject Management</h1>
        <p className="text-sm text-white/60">Enroll in courses and manage your subjects</p>
      </div>
      
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-start">
      {/*Course BTN*/}
      <div className="col-span-12 md:col-span-4">
        <div className="text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
          <BookOpen className="h-3 w-3" />
          Course
        </div>
        <Popover 
          open={courseOpen} 
          onOpenChange={setCourseOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={courseOpen}
              className="w-full justify-between h-12 bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-200">
              {courseValue
                ? course.find((c) => c.value === courseValue)?.label
                : "Select Course..."}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No Course Found.</CommandEmpty>
                <CommandGroup>
                  {course.map((c) => (
                    <CommandItem
                      key={c.value}
                      value={c.value}
                      onSelect={(currentValue) => {
                        const next = currentValue === courseValue ? "" : currentValue
                        setCourseValue(next)
                        setCourseOpen(false)
                        setSectionValue("")
                        setSubjectValue("")
                      }}>
                      <CheckIcon
                        className={cn(
                          "mr-6 h-4 w-4",
                          courseValue === c.value ? "opacity-100" : "opacity-0"
                        )}/>
                      {c.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {/*Section BTN*/}
      <div className="col-span-12 md:col-span-4">
        <div className="text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
          <Users className="h-3 w-3" />
          Section
        </div>
        <Popover
          open={!sectionDisabled && sectionOpen}
          onOpenChange={(open) => {
            if (sectionDisabled) return
            setSectionOpen(open)
          }}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={sectionOpen}
              className={cn(
                "w-full justify-between h-12 bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-200",
                sectionDisabled && "cursor-not-allowed opacity-60"
              )}
              disabled={sectionDisabled}>
              {sectionValue
                ? availableSections.find((s) => s.value === sectionValue)?.label
                : "Select Section..."}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-0">
            <Command>
              <CommandList>
                {availableSections.length === 0 ? (
                  <CommandEmpty>
                    {sectionDisabled ? "Pick a course first" : "No Section Found."}
                  </CommandEmpty>
                ) : (
                  <CommandGroup>
                    {availableSections.map((s) => (
                      <CommandItem
                        key={s.value}
                        value={s.value}
                        onSelect={(currentValue) => {
                          const next = currentValue === sectionValue ? "" : currentValue
                          setSectionValue(next)
                          setSectionOpen(false)
                          setSubjectValue("")
                        }}>
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            sectionValue === s.value ? "opacity-100" : "opacity-0"
                          )}/>
                        {s.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {/*Subject BTN*/}
      <div className="col-span-12 md:col-span-4">
        <div className="text-sm font-medium text-white/80 mb-2 flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          Subject
        </div>
        <Popover
          open={!subjectDisabled && subjectOpen}
          onOpenChange={(open) => {
            if (subjectDisabled) return
            setSubjectOpen(open)
          }}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={subjectOpen}
              className={cn(
                "w-full justify-between h-12 bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-200",
                subjectDisabled && "cursor-not-allowed opacity-60"
              )}
              disabled={subjectDisabled}>
              {subjectValue
                ? availableSubjects.find((sj) => sj.value === subjectValue)?.label
                : "Select Subject..."}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-0">
            <Command>
              <CommandList>
                {availableSubjects.length === 0 ? (
                  <CommandEmpty>
                    {sectionDisabled ? "Pick a course first" : "No Subject Found."}
                  </CommandEmpty>
                ) : (
                  <CommandGroup>
                    {availableSubjects.map((sj) => (
                      <CommandItem
                        key={sj.value}
                        value={sj.value}
                        onSelect={(currentValue) => {
                          setSubjectValue(currentValue)
                          setSubjectOpen(false)
                        }}>
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            subjectValue === sj.value ? "opacity-100" : "opacity-0"
                          )}/>
                        {sj.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="col-span-12 md:col-span-3">
        <div className="text-sm opacity-70 mb-2">Subject Code</div>
        <Input
          placeholder="Subject Code..."
          className="h-12 md:w-44 w-full text-center tracking-wider bg-white/5 border-white/20 focus:border-white/40 focus:bg-white/10 transition-all duration-200"
          maxLength={6}/>
      </div>
      <div className="col-span-12 md:col-span-2">
        <div className="text-sm opacity-70 mb-2">&nbsp;</div>
        <Button 
          className="h-12 w-full md:w-36 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-600/50 hover:border-slate-500/70 cursor-pointer" 
          onClick={handleJoinCourse}>
          <Plus className="  w-2" />
          Join Course
        </Button>
      </div>
      </div>
      
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Enrolled Subjects
        </h2>
        <div className="space-y-3">
          {enrolledSubjects.map((s) => (
            <div key={s.id} className="p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-medium">{s.subject}</h3>
                  <p className="text-xs text-white/60">{s.course} - {s.section}</p>
                </div>
                <Button variant='default' size='sm' className="text-xs px-3 py-1 cursor-pointer"
                onClick={() => navigate('/list')}>View List
                </Button>
                <Button variant="destructive" size="sm" className="text-xs px-3 py-1 cursor-pointer"
                  onClick={() => handleLeaveSubject(s.id)}>Leave
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div>
          {enrolledSubjects.length === 0 && (
            <p className="text-sm text-white/60">No enrolled subjects yet.</p>
          )}
        </div>
        <div className="div">
          {enrolledSubjects.map((view) =>(
            <div key={view.id}></div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default SubjectCourse