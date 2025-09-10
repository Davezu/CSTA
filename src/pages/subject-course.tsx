import React from 'react'
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"
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
type Courses = {
  value: string;
  label: string;
}
type Random = {
  generate: string & number;
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
  const [courseOpen, setCourseOpen] = React.useState(false)
  const [courseValue, setCourseValue] = React.useState("")

  const [sectionOpen, setSectionOpen] = React.useState(false)
  const [sectionValue, setSectionValue] = React.useState("")

  const [subjectOpen, setSubjectOpen] = React.useState(false)
  const [subjectValue, setSubjectValue] = React.useState("")


  const availableSections = sectionsByCourse[courseValue] ?? []
  const availableSubjects = subjectsByCourseSection[`${courseValue}-${sectionValue}`] ?? []
  const sectionDisabled = courseValue === ""
  const subjectDisabled = sectionValue === ""

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Course/Subjects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {/*Course BTN*/}
      <Popover 
        open={courseOpen} 
        onOpenChange={setCourseOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={courseOpen}
            className="w-full justify-between">
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
      {/*Section BTN*/}
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
              "w-full justify-between",
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
      {/*Subject BTN*/}
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
              "w-full justify-between",
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
      <Input placeholder="Enter Your Subject Code..."/>
      </div>
    </div>
  )
}
export default SubjectCourse