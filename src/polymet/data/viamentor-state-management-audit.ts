/**
 * VIAMENTOR - STATE MANAGEMENT AUDIT
 * Audit complet de la gestion d'état avec stratégie unifiée
 */

// ============================================================================
// 3. GESTION DES DONNÉES
// ============================================================================

export const STATE_MANAGEMENT_AUDIT = {
  score: "6.5/10",
  lastUpdate: "2025-01-18",
  category: "Data Management",
  severity: "HIGH",

  // ============================================================================
  // PROBLÈME MAJEUR : FRAGMENTATION
  // ============================================================================

  problem: {
    title: "Fragmentation des systèmes de state management",
    description:
      "Le projet utilise 4 systèmes différents sans stratégie claire",
    impact: {
      confusion: "Développeurs ne savent pas où stocker l'état",
      duplication: "Logique dupliquée entre systèmes",
      bugs: "Risques de synchronisation entre états",
      complexity: "Complexité accrue, courbe d'apprentissage longue",
      maintenance: "Difficile de maintenir et débugger",
    },
  },

  // ============================================================================
  // ÉTAT ACTUEL : 4 SYSTÈMES COEXISTENT
  // ============================================================================

  currentSystems: {
    reactState: {
      usage: "useState, useReducer",
      where: "Partout dans les composants",
      examples: [
        {
          file: "pages/viamentor-students-page",
          code: `const [students, setStudents] = useState([])
const [filters, setFilters] = useState({})
const [selectedIds, setSelectedIds] = useState<string[]>([])`,
          issues: [
            "État local qui devrait être global",
            "Duplication entre composants",
            "Pas de persistence",
          ],
        },
        {
          file: "components/viamentor-student-wizard",
          code: `const [currentStep, setCurrentStep] = useState(0)
const [formData, setFormData] = useState({})`,
          issues: ["Perte de données si navigation", "Pas de sauvegarde auto"],
        },
      ],

      appropriate: [
        "UI state local (isOpen, isHovered, isExpanded)",
        "Form state temporaire",
        "Animations state",
        "Component-specific state",
      ],

      inappropriate: [
        "Server data (students, lessons, invoices)",
        "Global UI state (theme, locale, sidebar collapsed)",
        "User session (user, role, permissions)",
        "Filters/pagination (devrait être URL query params)",
      ],
    },

    tanstackQuery: {
      usage: "useQuery, useMutation",
      where: "Quelques pages (inconsistant)",
      examples: [
        {
          file: "data/viamentor-query-hooks",
          code: `export function useStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  })
}

export function useCreateStudent() {
  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}`,
          status: "✅ CORRECT",
          note: "Mais utilisé seulement dans viamentor-complete-demo",
        },
      ],

      appropriate: [
        "Server state (data from API)",
        "Caching",
        "Background refetching",
        "Optimistic updates",
        "Mutations",
      ],

      currentUsage: "~5% du projet",
      targetUsage: "100% pour server data",
    },

    zustand: {
      usage: "Store global",
      where: "User store, Theme store, Locale store",
      examples: [
        {
          file: "data/viamentor-user-store",
          code: `import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  user: User | null
  role: Role | null
  setUser: (user: User) => void
  setRole: (role: Role) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      setUser: (user) => set({ user }),
      setRole: (role) => set({ role }),
      logout: () => set({ user: null, role: null }),
    }),
    {
      name: 'user-storage',
    }
  )
)`,
          status: "✅ CORRECT",
          note: "Bon usage pour global client state",
        },
        {
          file: "data/viamentor-theme-store",
          code: `export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'viamentor',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
)`,
          status: "✅ CORRECT",
        },
      ],

      appropriate: [
        "Global client state (user, theme, locale)",
        "UI state partagé (sidebar collapsed, notifications)",
        "Preferences utilisateur",
        "State qui nécessite persistence",
      ],

      currentUsage: "~10% du projet",
      targetUsage: "100% pour global client state",
    },

    contextAPI: {
      usage: "React Context",
      where: "Theme provider, Locale provider",
      examples: [
        {
          file: "components/viamentor-theme-provider",
          code: `const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('viamentor')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}`,
          status: "⚠️ REDONDANT avec Zustand",
          note: "Devrait utiliser Zustand directement",
        },
      ],

      appropriate: [
        "Providers uniquement (QueryClientProvider, etc.)",
        "Dependency injection",
        "Rarement pour state management",
      ],

      inappropriate: [
        "State management (utiliser Zustand à la place)",
        "Server data (utiliser TanStack Query)",
      ],

      currentUsage: "~5% du projet",
      targetUsage: "Providers uniquement, pas de state",
    },
  },

  // ============================================================================
  // STRATÉGIE UNIFIÉE RECOMMANDÉE
  // ============================================================================

  unifiedStrategy: {
    title: "Stratégie claire et cohérente",
    description: "Chaque type d'état a son système dédié",

    rules: [
      {
        type: "Server State",
        system: "TanStack Query UNIQUEMENT",
        why: "Optimisé pour server data (cache, refetch, mutations)",
        examples: [
          "Students, Lessons, Invoices",
          "Instructors, Vehicles, Tenants",
          "Analytics, Reports",
        ],

        pattern: `// ✅ CORRECT: TanStack Query pour server data
import { useQuery, useMutation } from '@tanstack/react-query'

// Query
export function useStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Mutation
export function useCreateStudent() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
    },
  })
}

// Usage dans composant
function StudentsPage() {
  const { data: students, isLoading } = useStudents()
  const { mutate: createStudent } = useCreateStudent()
  
  if (isLoading) return <Skeleton />
  
  return (
    <div>
      {students.map(student => (
        <StudentCard key={student.id} student={student} />
      ))}
      <Button onClick={() => createStudent(newStudent)}>
        Créer
      </Button>
    </div>
  )
}`,

        benefits: [
          "Cache automatique",
          "Background refetching",
          "Optimistic updates",
          "Error handling intégré",
          "Loading states automatiques",
          "Deduplication requests",
        ],
      },
      {
        type: "Global Client State",
        system: "Zustand UNIQUEMENT",
        why: "Simple, performant, persistence facile",
        examples: [
          "User session (user, role, permissions)",
          "Theme (light/dark)",
          "Locale (fr/de/it/en)",
          "Sidebar collapsed",
          "Notifications unread count",
        ],

        pattern: `// ✅ CORRECT: Zustand pour global client state
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Auth store
interface AuthState {
  user: User | null
  role: Role | null
  permissions: Permission[]
  setUser: (user: User) => void
  setRole: (role: Role) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      permissions: [],
      setUser: (user) => set({ user }),
      setRole: (role) => set({ role }),
      logout: () => set({ user: null, role: null, permissions: [] }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

// Theme store
interface ThemeState {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'viamentor',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
)

// Usage dans composant
function Header() {
  const { user, logout } = useAuthStore()
  const { theme, setTheme } = useThemeStore()
  
  return (
    <header>
      <span>{user?.name}</span>
      <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </Button>
      <Button onClick={logout}>Logout</Button>
    </header>
  )
}`,

        benefits: [
          "Performance (pas de re-renders inutiles)",
          "Persistence localStorage facile",
          "DevTools intégrés",
          "TypeScript support excellent",
          "Middleware (persist, devtools, immer)",
        ],
      },
      {
        type: "Local UI State",
        system: "useState UNIQUEMENT",
        why: "Simple, pas besoin de complexité",
        examples: [
          "Modal open/closed",
          "Dropdown expanded",
          "Form field values (temporaire)",
          "Hover state",
          "Focus state",
        ],

        pattern: `// ✅ CORRECT: useState pour local UI state
function StudentCard({ student }: { student: Student }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <CardTitle>{student.name}</CardTitle>
        <Button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Réduire' : 'Développer'}
        </Button>
      </CardHeader>
      
      {isExpanded && (
        <CardContent>
          {/* Détails */}
        </CardContent>
      )}
    </Card>
  )
}

// ✅ CORRECT: useState pour form temporaire
function CreateStudentDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Créer élève</Button>
      </DialogTrigger>
      <DialogContent>
        <form>
          <Input
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          {/* ... */}
        </form>
      </DialogContent>
    </Dialog>
  )
}`,

        benefits: [
          "Simple à comprendre",
          "Pas de boilerplate",
          "Scope limité au composant",
          "Garbage collected automatiquement",
        ],
      },
      {
        type: "URL State",
        system: "URL Query Params",
        why: "Shareable, bookmarkable, back/forward browser",
        examples: [
          "Filters (status, category, search)",
          "Pagination (page, limit)",
          "Sorting (sortBy, order)",
          "Selected tabs",
        ],

        pattern: `// ✅ CORRECT: URL query params pour filters
import { useSearchParams, useRouter } from 'next/navigation'

function StudentsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Lire filters depuis URL
  const filters = {
    status: searchParams.get('status') || 'all',
    category: searchParams.get('category') || 'all',
    search: searchParams.get('search') || '',
    page: parseInt(searchParams.get('page') || '1'),
  }
  
  // Mettre à jour filters dans URL
  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const params = new URLSearchParams(searchParams)
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString())
      } else {
        params.delete(key)
      }
    })
    router.push(\`/students?\${params.toString()}\`)
  }
  
  // Fetch data avec filters
  const { data: students } = useQuery({
    queryKey: ['students', filters],
    queryFn: () => fetchStudents(filters),
  })
  
  return (
    <div>
      <Filters filters={filters} onChange={updateFilters} />
      <StudentsList students={students} />
    </div>
  )
}`,

        benefits: [
          "URLs shareable",
          "Bookmarkable",
          "Back/forward browser",
          "SEO friendly",
          "Deep linking",
        ],
      },
      {
        type: "Form State",
        system: "React Hook Form + Zod",
        why: "Validation, performance, UX",
        examples: [
          "Create student wizard",
          "Edit instructor form",
          "Invoice creation",
          "Settings forms",
        ],

        pattern: `// ✅ CORRECT: React Hook Form + Zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const studentSchema = z.object({
  firstName: z.string().min(2, 'Minimum 2 caractères'),
  lastName: z.string().min(2, 'Minimum 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^\\+41\\d{9}$/, 'Format: +41XXXXXXXXX'),
})

type StudentFormData = z.infer<typeof studentSchema>

function CreateStudentForm() {
  const { mutate: createStudent } = useCreateStudent()
  
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  })
  
  const onSubmit = (data: StudentFormData) => {
    createStudent(data, {
      onSuccess: () => {
        toast.success('Élève créé')
        form.reset()
      },
    })
  }
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input
        {...form.register('firstName')}
        error={form.formState.errors.firstName?.message}
      />
      <Input
        {...form.register('lastName')}
        error={form.formState.errors.lastName?.message}
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        Créer
      </Button>
    </form>
  )
}`,

        benefits: [
          "Validation TypeScript",
          "Performance (moins de re-renders)",
          "Error handling automatique",
          "Dirty/touched tracking",
          "Submit handling",
        ],
      },
      {
        type: "Providers",
        system: "Context API UNIQUEMENT",
        why: "Dependency injection, pas de state",
        examples: ["QueryClientProvider", "TooltipProvider", "ErrorBoundary"],

        pattern: `// ✅ CORRECT: Context pour providers uniquement
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

// ❌ INCORRECT: Context pour state management
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light') // ❌ Utiliser Zustand à la place
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}`,

        benefits: [
          "Dependency injection propre",
          "Pas de prop drilling",
          "Testable",
        ],
      },
    ],
  },

  // ============================================================================
  // PLAN DE MIGRATION
  // ============================================================================

  migrationPlan: {
    title: "Plan de migration vers stratégie unifiée",
    duration: "2-3 semaines",
    priority: "HIGH",

    phases: [
      {
        phase: 1,
        title: "Setup infrastructure",
        duration: "2 jours",
        tasks: [
          {
            task: "Configurer TanStack Query globalement",
            code: `// app/providers.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}`,
          },
          {
            task: "Créer Zustand stores centralisés",
            code: `// stores/auth-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  role: Role | null
  permissions: Permission[]
  setUser: (user: User) => void
  setRole: (role: Role) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      permissions: [],
      setUser: (user) => set({ user }),
      setRole: (role) => set({ role }),
      logout: () => set({ user: null, role: null, permissions: [] }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

// stores/ui-store.ts
interface UIState {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  notifications: Notification[]
  addNotification: (notification: Notification) => void
  removeNotification: (id: string) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      notifications: [],
      addNotification: (notification) =>
        set((state) => ({ notifications: [...state.notifications, notification] })),
      removeNotification: (id) =>
        set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),
    }),
    {
      name: 'ui-storage',
    }
  )
)`,
          },
          {
            task: "Créer hooks TanStack Query réutilisables",
            code: `// hooks/use-students.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useStudents(filters?: StudentFilters) {
  return useQuery({
    queryKey: ['students', filters],
    queryFn: () => fetchStudents(filters),
  })
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: ['students', id],
    queryFn: () => fetchStudent(id),
    enabled: !!id,
  })
}

export function useCreateStudent() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success('Élève créé')
    },
    onError: (error) => {
      toast.error('Erreur lors de la création')
    },
  })
}

export function useUpdateStudent() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Student> }) =>
      updateStudent(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['students', id] })
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success('Élève mis à jour')
    },
  })
}

export function useDeleteStudent() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success('Élève supprimé')
    },
  })
}`,
          },
        ],
      },
      {
        phase: 2,
        title: "Migrer server data vers TanStack Query",
        duration: "1 semaine",
        priority: "HIGH",
        tasks: [
          {
            task: "Identifier tous les useState avec server data",
            command: `# Rechercher useState avec data
grep -r "useState.*students" src/
grep -r "useState.*lessons" src/
grep -r "useState.*invoices" src/
grep -r "useState.*instructors" src/`,
          },
          {
            task: "Remplacer par hooks TanStack Query",
            before: `// ❌ AVANT
function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    fetchStudents()
      .then(setStudents)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [])
  
  if (isLoading) return <Skeleton />
  if (error) return <Error message={error} />
  
  return <StudentsList students={students} />
}`,
            after: `// ✅ APRÈS
function StudentsPage() {
  const { data: students, isLoading, error } = useStudents()
  
  if (isLoading) return <Skeleton />
  if (error) return <Error message={error.message} />
  
  return <StudentsList students={students} />
}`,
          },
          {
            task: "Migrer mutations",
            before: `// ❌ AVANT
function CreateStudentButton() {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleCreate = async () => {
    setIsLoading(true)
    try {
      await createStudent(data)
      toast.success('Élève créé')
      // Refetch manually
      fetchStudents()
    } catch (error) {
      toast.error('Erreur')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Button onClick={handleCreate} disabled={isLoading}>
      Créer
    </Button>
  )
}`,
            after: `// ✅ APRÈS
function CreateStudentButton() {
  const { mutate: createStudent, isPending } = useCreateStudent()
  
  const handleCreate = () => {
    createStudent(data)
    // Toast + invalidation automatiques
  }
  
  return (
    <Button onClick={handleCreate} disabled={isPending}>
      Créer
    </Button>
  )
}`,
          },
        ],
      },
      {
        phase: 3,
        title: "Migrer global state vers Zustand",
        duration: "3 jours",
        tasks: [
          {
            task: "Remplacer Context API par Zustand",
            before: `// ❌ AVANT: Context API
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<ThemeMode>('viamentor')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

// Usage
function Header() {
  const { theme, setTheme } = useTheme()
  return <Button onClick={() => setTheme('dark')}>Toggle</Button>
}`,
            after: `// ✅ APRÈS: Zustand
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'viamentor',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
)

// Usage (pas besoin de Provider!)
function Header() {
  const { theme, setTheme } = useThemeStore()
  return <Button onClick={() => setTheme('dark')}>Toggle</Button>
}`,
          },
          {
            task: "Supprimer providers redondants",
            files: [
              "components/viamentor-theme-provider → DELETE",
              "components/viamentor-locale-provider → DELETE",
              "data/viamentor-theme-store → KEEP (Zustand)",
              "data/viamentor-locale-store → KEEP (Zustand)",
            ],
          },
        ],
      },
      {
        phase: 4,
        title: "Migrer filters vers URL query params",
        duration: "2 jours",
        tasks: [
          {
            task: "Créer hook useQueryParams réutilisable",
            code: `// hooks/use-query-params.ts
import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useQueryParams<T extends Record<string, any>>(
  defaults: T
): [T, (updates: Partial<T>) => void] {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  // Parse current params
  const params = Object.keys(defaults).reduce((acc, key) => {
    const value = searchParams.get(key)
    acc[key] = value !== null ? value : defaults[key]
    return acc
  }, {} as T)
  
  // Update params
  const setParams = useCallback(
    (updates: Partial<T>) => {
      const newParams = new URLSearchParams(searchParams)
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== defaults[key]) {
          newParams.set(key, String(value))
        } else {
          newParams.delete(key)
        }
      })
      
      router.push(\`?\${newParams.toString()}\`)
    },
    [searchParams, router, defaults]
  )
  
  return [params, setParams]
}`,
          },
          {
            task: "Migrer filters pages",
            before: `// ❌ AVANT: useState pour filters
function StudentsPage() {
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    search: '',
  })
  
  const { data: students } = useStudents(filters)
  
  return (
    <div>
      <Filters filters={filters} onChange={setFilters} />
      <StudentsList students={students} />
    </div>
  )
}`,
            after: `// ✅ APRÈS: URL query params
function StudentsPage() {
  const [filters, setFilters] = useQueryParams({
    status: 'all',
    category: 'all',
    search: '',
    page: 1,
  })
  
  const { data: students } = useStudents(filters)
  
  return (
    <div>
      <Filters filters={filters} onChange={setFilters} />
      <StudentsList students={students} />
    </div>
  )
}

// Maintenant les filters sont dans l'URL:
// /students?status=active&category=B&search=jean&page=2`,
          },
        ],
      },
      {
        phase: 5,
        title: "Documentation et formation",
        duration: "2 jours",
        tasks: [
          "Créer documentation state management",
          "Exemples pour chaque cas d'usage",
          "Formation équipe développement",
          "Code review guidelines",
          "Linting rules (ESLint)",
        ],
      },
    ],
  },

  // ============================================================================
  // BEST PRACTICES
  // ============================================================================

  bestPractices: {
    tanstackQuery: [
      "✅ Toujours définir queryKey unique",
      "✅ Utiliser staleTime pour éviter refetch inutiles",
      "✅ Invalider queries après mutations",
      "✅ Optimistic updates pour UX instantané",
      "✅ Error boundaries pour gérer erreurs",
      "✅ Suspense boundaries pour loading",
      "✅ Prefetch data pour navigation rapide",
      "❌ Ne jamais stocker server data dans useState",
      "❌ Ne jamais dupliquer data entre cache et state",
    ],

    zustand: [
      "✅ Un store par domaine (auth, ui, preferences)",
      "✅ Utiliser persist middleware pour localStorage",
      "✅ Utiliser devtools middleware en dev",
      "✅ Actions dans le store (pas de setters externes)",
      "✅ TypeScript strict pour type safety",
      "❌ Ne pas stocker server data dans Zustand",
      "❌ Ne pas créer trop de stores (max 5-6)",
    ],

    reactState: [
      "✅ Uniquement pour UI state local",
      "✅ Colocate state avec composant qui l'utilise",
      "✅ Lift state up si partagé entre siblings",
      "✅ useReducer pour state complexe",
      "❌ Ne jamais stocker server data",
      "❌ Ne jamais stocker global state",
      "❌ Ne jamais stocker filters (utiliser URL)",
    ],

    urlParams: [
      "✅ Toujours pour filters, pagination, sorting",
      "✅ Shareable URLs",
      "✅ Bookmarkable",
      "✅ Back/forward browser",
      "❌ Ne pas stocker données sensibles",
      "❌ Ne pas stocker trop de données (limite URL)",
    ],
  },

  // ============================================================================
  // OUTILS ET DEBUGGING
  // ============================================================================

  tools: {
    development: [
      "TanStack Query DevTools (visualiser cache)",
      "Zustand DevTools (Redux DevTools compatible)",
      "React DevTools (components tree)",
      "Network tab (API calls)",
    ],

    debugging: [
      {
        issue: "Data pas à jour",
        solution: "Vérifier staleTime et invalidation queries",
      },
      {
        issue: "Re-renders excessifs",
        solution: "React DevTools Profiler, vérifier selectors Zustand",
      },
      {
        issue: "Memory leaks",
        solution: "Cleanup useEffect, unsubscribe Zustand",
      },
      {
        issue: "State synchronisation",
        solution: "Ne jamais dupliquer state, single source of truth",
      },
    ],

    testing: [
      {
        library: "TanStack Query",
        setup: `import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

export function wrapper({ children }) {
  const testQueryClient = createTestQueryClient()
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  )
}`,
      },
      {
        library: "Zustand",
        setup: `import { act, renderHook } from '@testing-library/react'
import { useAuthStore } from '@/stores/auth-store'

describe('Auth Store', () => {
  beforeEach(() => {
    // Reset store avant chaque test
    useAuthStore.setState({ user: null, role: null })
  })
  
  it('should set user', () => {
    const { result } = renderHook(() => useAuthStore())
    
    act(() => {
      result.current.setUser({ id: '1', name: 'John' })
    })
    
    expect(result.current.user).toEqual({ id: '1', name: 'John' })
  })
})`,
      },
    ],
  },

  // ============================================================================
  // MÉTRIQUES DE SUCCÈS
  // ============================================================================

  successMetrics: {
    current: {
      tanstackQueryUsage: "5%",
      zustandUsage: "10%",
      contextAPIUsage: "5%",
      reactStateUsage: "80%",
      consistency: "3/10",
      maintainability: "4/10",
      performance: "6/10",
    },
    target: {
      tanstackQueryUsage: "100% (server data)",
      zustandUsage: "100% (global client state)",
      contextAPIUsage: "0% (providers uniquement)",
      reactStateUsage: "100% (local UI state uniquement)",
      consistency: "10/10",
      maintainability: "9/10",
      performance: "9/10",
    },
    benefits: [
      "Cohérence totale dans le code",
      "Onboarding développeurs plus rapide",
      "Moins de bugs de synchronisation",
      "Performance améliorée (cache, optimistic updates)",
      "Code plus maintenable",
      "Tests plus faciles",
    ],
  },
};

// ============================================================================
// EXPORT
// ============================================================================

export default STATE_MANAGEMENT_AUDIT;
