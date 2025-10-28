/**
 * ============================================================================
 * VIAMENTOR - CONVENTIONS.md
 * ============================================================================
 *
 * Conventions de code ViaMenutor
 *
 * @version 1.0.0
 * @date 2025-01-19
 */

export const CONVENTIONS_MD = `
# 📋 Conventions de code ViaMenutor

Ce document définit les conventions de code à suivre pour maintenir la cohérence du projet.

## Table des matières

1. [Naming Conventions](#naming-conventions)
2. [File Structure](#file-structure)
3. [TypeScript](#typescript)
4. [React](#react)
5. [Styling](#styling)
6. [State Management](#state-management)
7. [API Calls](#api-calls)
8. [Testing](#testing)

---

## 1. Naming Conventions

### 1.1 Files

\`\`\`
# Format: viamentor-[module]-[type].tsx

# Pages
viamentor-students-page.tsx
viamentor-dashboard-school-page.tsx

# Components
viamentor-students-table.tsx
viamentor-create-student-wizard.tsx

# Data
viamentor-students-data.tsx
viamentor-students-i18n.tsx
viamentor-students-schemas.tsx

# Layouts
viamentor-main-layout.tsx

# Prototypes
viamentor-system-prototype.tsx
\`\`\`

### 1.2 Components

\`\`\`typescript
// PascalCase pour composants
export function StudentCard() {}
export function CreateStudentWizard() {}
export function StudentsTable() {}

// Préfixe "Viamentor" pour exports
export function ViamentorStudentCard() {}
\`\`\`

### 1.3 Functions

\`\`\`typescript
// camelCase pour fonctions
function fetchStudents() {}
function calculateProgression() {}
function formatCurrency() {}

// Préfixe "use" pour hooks
function useStudents() {}
function useStudentDetail() {}
\`\`\`

### 1.4 Variables

\`\`\`typescript
// camelCase pour variables
const studentId = "123"
const isLoading = true
const totalCount = 100

// UPPER_SNAKE_CASE pour constantes
const MAX_STUDENTS = 100
const API_BASE_URL = "https://api.viamentor.ch"
const DEFAULT_LOCALE = "fr"
\`\`\`

### 1.5 Types & Interfaces

\`\`\`typescript
// PascalCase pour types et interfaces
interface Student {}
type StudentStatus = "active" | "inactive"
interface StudentsPageProps {}

// Suffix "Props" pour props de composants
interface StudentCardProps {}
interface CreateStudentWizardProps {}

// Suffix "Locale" pour traductions
type StudentsLocale = {}
type InvoicesLocale = {}
\`\`\`

---

## 2. File Structure

### 2.1 Import Order

\`\`\`typescript
// 1. React & External libraries
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"

// 2. UI Components (Shadcn)
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// 3. Internal Components
import { ViamentorStudentsTable } from "@/polymet/components/viamentor-students-table"
import { ViamentorStudentCard } from "@/polymet/components/viamentor-student-card"

// 4. Data & Types
import { STUDENTS_DATA } from "@/polymet/data/viamentor-students-data"
import { STUDENTS_I18N } from "@/polymet/data/viamentor-students-i18n"
import type { Student, StudentsLocale } from "@/polymet/data/viamentor-students-data"

// 5. Utils & Helpers
import { cn } from "@/lib/utils"
import { formatDate, formatCurrency } from "@/polymet/data/viamentor-utils"
\`\`\`

### 2.2 Component Structure

\`\`\`typescript
/**
 * ============================================================================
 * VIAMENTOR - Student Card Component
 * ============================================================================
 */

// 1. Imports
import { Card } from "@/components/ui/card"
import type { Student } from "@/polymet/data/viamentor-students-data"

// 2. Types
interface StudentCardProps {
  student: Student
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

// 3. Component
export function ViamentorStudentCard({ 
  student, 
  onEdit, 
  onDelete 
}: StudentCardProps) {
  // 3.1 Hooks
  const [isExpanded, setIsExpanded] = useState(false)
  
  // 3.2 Handlers
  const handleEdit = () => {
    onEdit?.(student.id)
  }
  
  // 3.3 Render
  return (
    <Card>
      {/* Content */}
    </Card>
  )
}

// 4. Default export (pour render)
export default ViamentorStudentCard
\`\`\`

---

## 3. TypeScript

### 3.1 Types vs Interfaces

\`\`\`typescript
// ✅ Interface pour objets
interface Student {
  id: string
  firstName: string
  lastName: string
}

// ✅ Type pour unions, intersections, primitives
type StudentStatus = "active" | "inactive" | "suspended"
type StudentWithInstructor = Student & { instructor: Instructor }

// ✅ Type pour props de composants (convention)
type StudentCardProps = {
  student: Student
  onEdit?: (id: string) => void
}
\`\`\`

### 3.2 Avoid any

\`\`\`typescript
// ❌ Mauvais
function processData(data: any) {
  return data.map((item: any) => item.name)
}

// ✅ Bon
function processData(data: Student[]) {
  return data.map((item) => item.firstName)
}

// ✅ Bon (si type vraiment inconnu)
function processData(data: unknown) {
  if (Array.isArray(data)) {
    // Type guard
  }
}
\`\`\`

### 3.3 Utility Types

\`\`\`typescript
// ✅ Utiliser les utility types TypeScript
type PartialStudent = Partial<Student>
type RequiredStudent = Required<Student>
type StudentKeys = keyof Student
type StudentValues = Student[keyof Student]

// ✅ Pick & Omit
type StudentBasicInfo = Pick<Student, "id" | "firstName" | "lastName">
type StudentWithoutId = Omit<Student, "id">
\`\`\`

### 3.4 Generics

\`\`\`typescript
// ✅ Bon: Fonctions génériques
function createArray<T>(items: T[]): T[] {
  return [...items]
}

// ✅ Bon: Composants génériques
interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
}

function DataTable<T>({ data, columns }: DataTableProps<T>) {
  // ...
}
\`\`\`

---

## 4. React

### 4.1 Function Components

\`\`\`typescript
// ✅ Bon: Function component avec types
interface StudentCardProps {
  student: Student
}

export function StudentCard({ student }: StudentCardProps) {
  return <div>{student.firstName}</div>
}

// ❌ Mauvais: React.FC (deprecated)
export const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return <div>{student.firstName}</div>
}
\`\`\`

### 4.2 Hooks Order

\`\`\`typescript
export function StudentsPage() {
  // 1. State hooks
  const [view, setView] = useState<"table" | "grid">("table")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  
  // 2. Context hooks
  const { locale } = useLocale()
  const { user } = useUser()
  
  // 3. Query hooks
  const { data: students, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  })
  
  // 4. Effect hooks
  useEffect(() => {
    // Side effects
  }, [])
  
  // 5. Handlers
  const handleViewChange = (newView: "table" | "grid") => {
    setView(newView)
  }
  
  // 6. Render
  return <div>...</div>
}
\`\`\`

### 4.3 Conditional Rendering

\`\`\`typescript
// ✅ Bon: Early return
if (isLoading) {
  return <LoadingSpinner />
}

if (error) {
  return <ErrorMessage error={error} />
}

return <StudentsList students={students} />

// ✅ Bon: Ternary pour simple condition
return (
  <div>
    {isLoading ? <LoadingSpinner /> : <StudentsList />}
  </div>
)

// ❌ Mauvais: Nested ternaries
return (
  <div>
    {isLoading ? (
      <LoadingSpinner />
    ) : error ? (
      <ErrorMessage />
    ) : (
      <StudentsList />
    )}
  </div>
)
\`\`\`

### 4.4 Props Destructuring

\`\`\`typescript
// ✅ Bon: Destructure dans params
export function StudentCard({ student, onEdit, onDelete }: StudentCardProps) {
  return <div>{student.firstName}</div>
}

// ❌ Mauvais: Destructure dans body
export function StudentCard(props: StudentCardProps) {
  const { student, onEdit, onDelete } = props
  return <div>{student.firstName}</div>
}
\`\`\`

### 4.5 Event Handlers

\`\`\`typescript
// ✅ Bon: Inline pour simple handlers
<Button onClick={() => setOpen(true)}>Open</Button>

// ✅ Bon: Fonction pour complex handlers
const handleSubmit = (data: FormData) => {
  // Complex logic
  mutation.mutate(data)
}

<form onSubmit={handleSubmit}>...</form>

// ✅ Bon: useCallback pour optimisation
const handleEdit = useCallback((id: string) => {
  // Logic
}, [])
\`\`\`

---

## 5. Styling

### 5.1 Tailwind Classes

\`\`\`typescript
// ✅ Bon: Semantic classes
<div className="bg-background text-foreground">
<Button className="bg-primary text-primary-foreground">

// ✅ Bon: Responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ✅ Bon: Dark mode
<div className="bg-white dark:bg-gray-900">

// ❌ Mauvais: Hardcoded colors
<div className="bg-blue-500 text-white">
\`\`\`

### 5.2 cn() Utility

\`\`\`typescript
import { cn } from "@/lib/utils"

// ✅ Bon: Conditional classes
<div className={cn(
  "rounded-lg p-4",
  isActive && "bg-primary",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>

// ✅ Bon: Merge classes
<Button className={cn("w-full", className)}>
\`\`\`

### 5.3 Component Variants

\`\`\`typescript
// ✅ Bon: Variants avec cva (class-variance-authority)
import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "rounded-lg font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-input bg-background",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)
\`\`\`

---

## 6. State Management

### 6.1 Server State (TanStack Query)

\`\`\`typescript
// ✅ Bon: useQuery pour fetching
const { data, isLoading, error } = useQuery({
  queryKey: ['students', filters],
  queryFn: () => fetchStudents(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
})

// ✅ Bon: useMutation pour updates
const mutation = useMutation({
  mutationFn: (student: Student) => createStudent(student),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['students'] })
  },
})
\`\`\`

### 6.2 Client State (Zustand)

\`\`\`typescript
// ✅ Bon: Zustand store
interface UserStore {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))

// Usage
const { user, setUser } = useUserStore()
\`\`\`

### 6.3 UI State (useState)

\`\`\`typescript
// ✅ Bon: Local UI state
const [isOpen, setIsOpen] = useState(false)
const [selectedIds, setSelectedIds] = useState<string[]>([])
\`\`\`

---

## 7. API Calls

### 7.1 API Functions

\`\`\`typescript
// ✅ Bon: Typed API functions
export async function fetchStudents(
  filters?: StudentsFilters
): Promise<Student[]> {
  const response = await fetch('/api/students', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch students')
  }
  
  return response.json()
}
\`\`\`

### 7.2 Error Handling

\`\`\`typescript
// ✅ Bon: Try-catch avec types
try {
  const students = await fetchStudents()
  return students
} catch (error) {
  if (error instanceof Error) {
    console.error('Error:', error.message)
  }
  throw error
}
\`\`\`

---

## 8. Testing

### 8.1 Test Files

\`\`\`
# Format: [filename].test.tsx

viamentor-students-utils.test.ts
viamentor-student-card.test.tsx
\`\`\`

### 8.2 Test Structure

\`\`\`typescript
import { describe, it, expect } from 'vitest'

describe('calculateProgression', () => {
  it('should calculate percentage correctly', () => {
    const result = calculateProgression(15, 25)
    expect(result).toBe(60)
  })
  
  it('should return 0 for no lessons', () => {
    const result = calculateProgression(0, 0)
    expect(result).toBe(0)
  })
  
  it('should handle edge cases', () => {
    expect(calculateProgression(0, 25)).toBe(0)
    expect(calculateProgression(25, 25)).toBe(100)
  })
})
\`\`\`

---

## Résumé des conventions

### ✅ À faire

- Utiliser TypeScript strict
- Typer toutes les props et fonctions
- Suivre les naming conventions
- Organiser les imports
- Utiliser semantic Tailwind classes
- Documenter les fonctions complexes
- Écrire des tests

### ❌ À éviter

- any type
- Inline styles
- Hardcoded values
- Magic numbers
- Nested ternaries
- Props drilling
- Large components (> 300 lignes)

---

**Dernière mise à jour:** 2025-01-19  
**Version:** 1.0.0  
**Auteur:** ViaMenutor Team
`;

export default CONVENTIONS_MD;
