/**
 * VIAMENTOR - State Management Migration Guide
 * Guide complet de migration vers stratégie unifiée
 */

// ============================================================================
// INTRODUCTION
// ============================================================================

export const MIGRATION_GUIDE = {
  title: "Guide de Migration State Management Viamentor",
  version: "1.0.0",
  lastUpdate: "2025-01-18",
  duration: "2-3 semaines",
  priority: "CRITICAL",

  // ============================================================================
  // STRATÉGIE UNIFIÉE
  // ============================================================================

  strategy: {
    title: "Stratégie Unifiée - 6 Règles Claires",
    rules: [
      {
        rule: 1,
        type: "Server State",
        system: "TanStack Query UNIQUEMENT",
        why: "Optimisé pour server data (cache, refetch, mutations)",
        examples: [
          "Students",
          "Lessons",
          "Invoices",
          "Instructors",
          "Vehicles",
        ],

        hook: "useStudents(), useStudent(id), useCreateStudent()",
      },
      {
        rule: 2,
        type: "Global Client State",
        system: "Zustand UNIQUEMENT",
        why: "Simple, performant, persistence facile",
        examples: [
          "User session",
          "Theme",
          "Locale",
          "Sidebar collapsed",
          "Notifications",
        ],

        hook: "useAuthStore(), useUIStore(), useThemeStore()",
      },
      {
        rule: 3,
        type: "Local UI State",
        system: "useState UNIQUEMENT",
        why: "Simple, pas besoin de complexité",
        examples: [
          "Modal open",
          "Hover state",
          "Form temporaire",
          "Dropdown expanded",
        ],

        hook: "useState(false), useState('')",
      },
      {
        rule: 4,
        type: "URL State",
        system: "URL Query Params",
        why: "Shareable, bookmarkable, back/forward browser",
        examples: ["Filters", "Pagination", "Sorting", "Selected tabs"],
        hook: "useSearchParams(), useQueryParams()",
      },
      {
        rule: 5,
        type: "Form State",
        system: "React Hook Form + Zod",
        why: "Validation, performance, UX",
        examples: [
          "Create student wizard",
          "Edit instructor",
          "Invoice creation",
        ],

        hook: "useForm(), zodResolver()",
      },
      {
        rule: 6,
        type: "Providers",
        system: "Context API UNIQUEMENT",
        why: "Dependency injection, pas de state",
        examples: ["QueryClientProvider", "TooltipProvider", "ErrorBoundary"],
        hook: "createContext(), useContext()",
      },
    ],
  },

  // ============================================================================
  // EXEMPLES MIGRATION
  // ============================================================================

  examples: {
    // ========================================
    // 1. SERVER STATE → TanStack Query
    // ========================================
    serverState: {
      title: "Migration Server State vers TanStack Query",

      before: `// ❌ AVANT: useState pour server data
import { useState, useEffect } from 'react'

function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    setIsLoading(true)
    fetchStudents()
      .then(setStudents)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [])
  
  const handleCreate = async (data: CreateStudentData) => {
    try {
      await createStudent(data)
      // Refetch manually
      const updated = await fetchStudents()
      setStudents(updated)
      toast.success('Élève créé')
    } catch (error) {
      toast.error('Erreur')
    }
  }
  
  if (isLoading) return <Skeleton />
  if (error) return <Error message={error} />
  
  return (
    <div>
      <Button onClick={() => handleCreate(data)}>Créer</Button>
      <StudentsList students={students} />
    </div>
  )
}`,

      after: `// ✅ APRÈS: TanStack Query
import { useStudents, useCreateStudent } from '@/polymet/data/viamentor-use-students-query'

function StudentsPage() {
  const { data: students, isLoading, error } = useStudents()
  const { mutate: createStudent, isPending } = useCreateStudent()
  
  const handleCreate = (data: CreateStudentData) => {
    createStudent(data)
    // Toast + invalidation automatiques
  }
  
  if (isLoading) return <Skeleton />
  if (error) return <Error message={error.message} />
  
  return (
    <div>
      <Button onClick={() => handleCreate(data)} disabled={isPending}>
        Créer
      </Button>
      <StudentsList students={students} />
    </div>
  )
}`,

      benefits: [
        "✅ Cache automatique (pas de refetch inutiles)",
        "✅ Loading/error states automatiques",
        "✅ Invalidation automatique après mutations",
        "✅ Background refetching",
        "✅ Deduplication requests",
        "✅ Moins de code boilerplate",
      ],
    },

    // ========================================
    // 2. GLOBAL STATE → Zustand
    // ========================================
    globalState: {
      title: "Migration Global State vers Zustand",

      before: `// ❌ AVANT: Context API pour state
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('viamentor')
  
  useEffect(() => {
    // Persist to localStorage
    localStorage.setItem('theme', theme)
  }, [theme])
  
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

      after: `// ✅ APRÈS: Zustand avec persistence
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

      benefits: [
        "✅ Pas besoin de Provider",
        "✅ Persistence localStorage automatique",
        "✅ Performance (pas de re-renders inutiles)",
        "✅ DevTools intégrés",
        "✅ TypeScript support excellent",
        "✅ Moins de boilerplate",
      ],
    },

    // ========================================
    // 3. FILTERS → URL Query Params
    // ========================================
    urlState: {
      title: "Migration Filters vers URL Query Params",

      before: `// ❌ AVANT: useState pour filters
function StudentsPage() {
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    search: '',
    page: 1,
  })
  
  const { data: students } = useStudents(filters)
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value })
  }
  
  return (
    <div>
      <Filters filters={filters} onChange={handleFilterChange} />
      <StudentsList students={students} />
    </div>
  )
}

// Problèmes:
// ❌ Filters perdus au refresh
// ❌ Impossible de partager l'URL
// ❌ Pas de back/forward browser`,

      after: `// ✅ APRÈS: URL Query Params
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
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(\`/students?\${params.toString()}\`)
  }
  
  const { data: students } = useStudents(filters)
  
  return (
    <div>
      <Filters filters={filters} onChange={handleFilterChange} />
      <StudentsList students={students} />
    </div>
  )
}

// URL: /students?status=active&category=B&search=jean&page=2`,

      benefits: [
        "✅ URLs shareable",
        "✅ Bookmarkable",
        "✅ Back/forward browser",
        "✅ Filters persistés au refresh",
        "✅ SEO friendly",
        "✅ Deep linking",
      ],
    },

    // ========================================
    // 4. OPTIMISTIC UPDATES (Phase 3)
    // ========================================
    optimisticUpdates: {
      title: "Optimistic Updates pour UX Instantané",

      before: `// ❌ AVANT: Attendre réponse serveur
function StudentCard({ student }: { student: Student }) {
  const { mutate: updateStudent, isPending } = useUpdateStudent()
  
  const handleToggleStatus = () => {
    updateStudent({ id: student.id, status: 'active' })
    // UI se met à jour seulement après réponse serveur (500ms)
  }
  
  return (
    <Card>
      <Badge>{student.status}</Badge>
      <Button onClick={handleToggleStatus} disabled={isPending}>
        {isPending ? 'Updating...' : 'Toggle Status'}
      </Button>
    </Card>
  )
}`,

      after: `// ✅ APRÈS: Optimistic Update
import { useUpdateStudentOptimistic } from '@/polymet/data/viamentor-use-students-query'

function StudentCard({ student }: { student: Student }) {
  const { mutate: updateStudent } = useUpdateStudentOptimistic()
  
  const handleToggleStatus = () => {
    updateStudent({ id: student.id, status: 'active' })
    // UI se met à jour INSTANTANÉMENT (0ms)
    // Si erreur serveur, rollback automatique
  }
  
  return (
    <Card>
      <Badge>{student.status}</Badge>
      <Button onClick={handleToggleStatus}>
        Toggle Status
      </Button>
    </Card>
  )
}`,

      benefits: [
        "✅ UX instantané (<100ms perceived speed)",
        "✅ Pas de spinner/loading",
        "✅ Rollback automatique si erreur",
        "✅ Confiance utilisateur élevée",
        "✅ Application feels faster",
      ],
    },

    // ========================================
    // 5. UNDO/REDO (Phase 3)
    // ========================================
    undoRedo: {
      title: "Undo/Redo avec Toast 5 secondes",

      before: `// ❌ AVANT: Suppression immédiate
function StudentCard({ student }: { student: Student }) {
  const { mutate: deleteStudent } = useDeleteStudent()
  
  const handleDelete = () => {
    if (confirm('Supprimer cet élève ?')) {
      deleteStudent(student.id)
      toast.success('Élève supprimé')
      // Impossible d'annuler
    }
  }
  
  return (
    <Button onClick={handleDelete} variant="destructive">
      Supprimer
    </Button>
  )
}`,

      after: `// ✅ APRÈS: Undo/Redo avec toast
import { useDeleteStudentWithUndo } from '@/polymet/data/viamentor-use-students-query'

function StudentCard({ student }: { student: Student }) {
  const { mutate: deleteStudent } = useDeleteStudentWithUndo()
  
  const handleDelete = () => {
    deleteStudent(student.id)
    
    // Toast avec bouton "Annuler" pendant 5s
    toast.success(
      <div className="flex items-center justify-between gap-4">
        <span>Élève supprimé</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            // Annuler la suppression
            toast.dismiss()
          }}
        >
          Annuler
        </Button>
      </div>,
      { duration: 5000 }
    )
  }
  
  return (
    <Button onClick={handleDelete} variant="destructive">
      Supprimer
    </Button>
  )
}`,

      benefits: [
        "✅ Sécurité: possibilité d'annuler",
        "✅ UX: pas de confirmation dialog",
        "✅ Confiance utilisateur",
        "✅ Moins d'erreurs",
        "✅ Pattern moderne",
      ],
    },
  },

  // ============================================================================
  // CHECKLIST MIGRATION
  // ============================================================================

  checklist: {
    phase1: {
      title: "Phase 1 - Setup Infrastructure (2 jours)",
      tasks: [
        {
          task: "Configurer TanStack Query globalement",
          status: "✅ DONE",
          file: "@/polymet/data/viamentor-query-provider",
        },
        {
          task: "Créer stores Zustand centralisés",
          status: "✅ DONE",
          files: [
            "@/polymet/data/viamentor-auth-store-unified",
            "@/polymet/data/viamentor-ui-store-unified",
          ],
        },
        {
          task: "Créer hooks TanStack Query réutilisables",
          status: "✅ DONE",
          file: "@/polymet/data/viamentor-use-students-query",
        },
        {
          task: "Créer API client centralisé",
          status: "⏳ TODO",
          file: "@/polymet/lib/api-client",
        },
        {
          task: "Tester infrastructure avec page exemple",
          status: "⏳ TODO",
          file: "@/polymet/pages/viamentor-migration-demo-page",
        },
      ],
    },

    phase2: {
      title: "Phase 2 - Migration Server Data (1 semaine)",
      tasks: [
        {
          task: "Identifier tous les useState avec server data",
          status: "⏳ TODO",
          command: "grep -r 'useState.*students' src/",
        },
        {
          task: "Migrer pages principales",
          status: "⏳ TODO",
          files: [
            "@/polymet/pages/viamentor-students-page",
            "@/polymet/pages/viamentor-instructors-page",
            "@/polymet/pages/viamentor-invoices-list-page",
            "@/polymet/pages/viamentor-planning-page",
          ],
        },
        {
          task: "Migrer pages détails",
          status: "⏳ TODO",
          files: [
            "@/polymet/pages/viamentor-student-detail-page",
            "@/polymet/pages/viamentor-instructor-detail-page",
          ],
        },
        {
          task: "Migrer mutations",
          status: "⏳ TODO",
          note: "Remplacer tous les useState + fetch par useMutation",
        },
        {
          task: "Tester toutes les pages migrées",
          status: "⏳ TODO",
          note: "Vérifier cache, invalidation, loading states",
        },
        {
          task: "Supprimer code obsolète",
          status: "⏳ TODO",
          note: "Supprimer useState server data, useEffect fetch",
        },
      ],
    },

    phase3: {
      title: "Phase 3 - Optimistic Updates & Undo/Redo (HIGH)",
      tasks: [
        {
          task: "Implémenter optimistic updates",
          status: "✅ DONE",
          file: "@/polymet/data/viamentor-use-students-query (useUpdateStudentOptimistic)",
        },
        {
          task: "Implémenter Undo/Redo",
          status: "✅ DONE",
          file: "@/polymet/data/viamentor-use-students-query (useDeleteStudentWithUndo)",
        },
        {
          task: "Tester UX instantané",
          status: "⏳ TODO",
          note: "Vérifier perceived speed <100ms",
        },
      ],
    },

    phase4: {
      title: "Phase 4 - Documentation (MEDIUM)",
      tasks: [
        {
          task: "Créer guide state management",
          status: "✅ DONE",
          file: "@/polymet/data/viamentor-state-management-migration-guide",
        },
        {
          task: "Créer exemples code",
          status: "✅ DONE",
          note: "Exemples avant/après dans ce guide",
        },
        {
          task: "Formation équipe",
          status: "⏳ TODO",
          note: "Session 2h avec démo live",
        },
        {
          task: "Code review guidelines",
          status: "⏳ TODO",
          file: "@/docs/code-review-state-management.md",
        },
        {
          task: "ESLint rules",
          status: "⏳ TODO",
          file: ".eslintrc.js",
        },
      ],
    },
  },

  // ============================================================================
  // BEST PRACTICES
  // ============================================================================

  bestPractices: {
    tanstackQuery: [
      "✅ Toujours définir queryKey unique et descriptive",
      "✅ Utiliser staleTime pour éviter refetch inutiles (5min par défaut)",
      "✅ Invalider queries après mutations (invalidateQueries)",
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
      "✅ Selectors pour optimiser re-renders",
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
  },

  // ============================================================================
  // OUTILS
  // ============================================================================

  tools: {
    development: [
      "TanStack Query DevTools (visualiser cache)",
      "Zustand DevTools (Redux DevTools compatible)",
      "React DevTools (components tree)",
      "Network tab (API calls)",
    ],

    testing: [
      "Jest + React Testing Library",
      "TanStack Query test utils",
      "Zustand test utils",
      "MSW (Mock Service Worker) pour API mocking",
    ],
  },
};

// ============================================================================
// EXPORT
// ============================================================================

export default MIGRATION_GUIDE;
