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
  BSIT: [{ value: "4-2", label: "4-2" }, { value: "4-3", label: "4-3" }, { value: "4-4", label: "4-4" }],
  BSHM: [{ value: "2-1", label: "2-2" }, { value: "2-2", label: "2-2" }],
  BSTM: [{ value: "1-2", label: "1-1" }],
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

function SubjectCourse() {
  const [courseOpen, setCourseOpen] = React.useState(false)
  const [courseValue, setCourseValue] = React.useState("")

  const [sectionOpen, setSectionOpen] = React.useState(false)
  const [sectionValue, setSectionValue] = React.useState("")

  const availableSections = sectionsByCourse[courseValue] ?? []
  const sectionDisabled = courseValue === ""

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Course/Subjects</h1>
      <Popover open={courseOpen} onOpenChange={setCourseOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={courseOpen}
              className="w-[240px] justify-between mr-4">
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
              "w-[240px] justify-between",
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
  )
}

export default SubjectCourse