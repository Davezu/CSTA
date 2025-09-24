import React, { useState } from 'react'
import { 
  BookOpen, 
  Calendar,
  Clock,
  FileText,
  Download,
  Upload,
  AlertCircle,
  User,
  Search
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Module } from '@/lib/apiClient'

// Mock modules data
const mockModules: Module[] = [
  {
    id: '1',
    title: 'Introduction to Data Structures',
    description: 'Learn fundamental data structures including arrays, linked lists, stacks, and queues.',
    subject: 'Data Structures',
    instructor: 'Prof. Johnson',
    content: `# Introduction to Data Structures

## Overview
Data structures are fundamental building blocks in computer science that allow us to organize and store data efficiently.

## Learning Objectives
- Understand different types of data structures
- Learn when to use each data structure
- Implement basic data structures in code

## Topics Covered
1. Arrays and Dynamic Arrays
2. Linked Lists
3. Stacks and Queues
4. Trees and Binary Trees
5. Hash Tables

## Assignment
Create implementations of the basic data structures discussed in class.`,
    attachments: [
      {
        id: 'a1',
        name: 'DataStructures_Slides.pdf',
        url: '/attachments/ds_slides.pdf',
        size: 2048576,
        type: 'application/pdf'
      },
      {
        id: 'a2',
        name: 'sample_code.zip',
        url: '/attachments/sample_code.zip',
        size: 512000,
        type: 'application/zip'
      }
    ],
    dueDate: '2024-12-20T23:59:00Z',
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-05T14:30:00Z',
    status: 'published'
  },
  {
    id: '2',
    title: 'Algorithm Analysis and Big O Notation',
    description: 'Understanding time and space complexity analysis for algorithms.',
    subject: 'Algorithms',
    instructor: 'Prof. Martinez',
    content: `# Algorithm Analysis and Big O Notation

## Introduction
Algorithm analysis is crucial for writing efficient code and understanding performance characteristics.

## Key Concepts
- Time Complexity
- Space Complexity
- Big O, Big Ω, and Big Θ notations
- Best, Average, and Worst Case Analysis

## Common Complexities
- O(1) - Constant
- O(log n) - Logarithmic
- O(n) - Linear
- O(n log n) - Linearithmic
- O(n²) - Quadratic
- O(2ⁿ) - Exponential

## Practice Problems
Analyze the complexity of various sorting algorithms.`,
    attachments: [
      {
        id: 'a3',
        name: 'BigO_Examples.pdf',
        url: '/attachments/bigo_examples.pdf',
        size: 1024000,
        type: 'application/pdf'
      }
    ],
    dueDate: '2024-12-25T23:59:00Z',
    createdAt: '2024-12-02T09:00:00Z',
    updatedAt: '2024-12-02T09:00:00Z',
    status: 'published'
  },
  {
    id: '3',
    title: 'Database Design Principles',
    description: 'Learn the fundamentals of relational database design and normalization.',
    subject: 'Database Systems',
    instructor: 'Prof. Chen',
    content: `# Database Design Principles

## Database Design Process
1. Requirements Analysis
2. Conceptual Design (ER Modeling)
3. Logical Design (Relational Schema)
4. Physical Design

## Normalization
- First Normal Form (1NF)
- Second Normal Form (2NF)
- Third Normal Form (3NF)
- Boyce-Codd Normal Form (BCNF)

## ER Modeling
- Entities and Attributes
- Relationships
- Cardinality Constraints

## Assignment
Design a database schema for a library management system.`,
    attachments: [],
    dueDate: '2024-12-30T23:59:00Z',
    createdAt: '2024-12-03T11:00:00Z',
    updatedAt: '2024-12-03T11:00:00Z',
    status: 'published'
  }
]

function Modules() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [filterSubject, setFilterSubject] = useState<string>('all')
  const [modules] = useState<Module[]>(mockModules)

  const subjects = Array.from(new Set(modules.map(m => m.subject)))
  
  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSubject = filterSubject === 'all' || module.subject === filterSubject
    
    return matchesSearch && matchesSubject
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date()
  }

  return (
    <div className="w-full px-6 md:px-10 max-w-7xl mx-auto space-y-6 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Learning Modules
          </h1>
          <p className="text-sm text-muted-foreground">Access course materials and assignments</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search modules, instructors, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="h-10 px-3 border rounded-md bg-background min-w-[150px]"
        >
          <option value="all">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Modules List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Modules ({filteredModules.length})</h2>
          </div>
          
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredModules.map(module => (
              <div
                key={module.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedModule?.id === module.id 
                    ? 'bg-primary/10 border-primary/30' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedModule(module)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{module.title}</h3>
                    <p className="text-xs text-muted-foreground truncate">{module.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{module.instructor}</span>
                      </div>
                      {module.dueDate && (
                        <div className={`flex items-center gap-1 ${
                          isOverdue(module.dueDate) ? 'text-red-600' : 'text-muted-foreground'
                        }`}>
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">
                            Due {formatDate(module.dueDate)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        {module.subject}
                      </span>
                      {module.attachments.length > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {module.attachments.length} attachment{module.attachments.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredModules.length === 0 && (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No modules found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? 'Try adjusting your search terms' : 'No modules available'}
              </p>
            </div>
          )}
        </div>

        {/* Module Content */}
        <div className="lg:col-span-2">
          {selectedModule ? (
            <div className="bg-card rounded-lg border">
              {/* Module Header */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-xl font-semibold mb-2">{selectedModule.title}</h1>
                    <p className="text-muted-foreground mb-4">{selectedModule.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {selectedModule.instructor}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Created {formatDate(selectedModule.createdAt)}
                      </div>
                      {selectedModule.dueDate && (
                        <div className={`flex items-center gap-1 ${
                          isOverdue(selectedModule.dueDate) ? 'text-red-600' : ''
                        }`}>
                          <Clock className="h-4 w-4" />
                          Due {formatDate(selectedModule.dueDate)}
                          {isOverdue(selectedModule.dueDate) && (
                            <AlertCircle className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Submit
                    </Button>
                  </div>
                </div>

                {/* Attachments */}
                {selectedModule.attachments.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Attachments</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedModule.attachments.map(attachment => (
                        <div key={attachment.id} className="flex items-center gap-2 p-2 bg-muted/20 rounded">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">{attachment.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatFileSize(attachment.size)}
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Module Content */}
              <div className="p-6">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap">{selectedModule.content}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-lg border p-8 text-center">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Select a Module</h2>
              <p className="text-muted-foreground">
                Choose a module from the list to view its content and assignments
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Modules