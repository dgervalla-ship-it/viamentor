/**
 * ============================================================================
 * VIAMENTOR - ARCHITECTURE.md
 * ============================================================================
 *
 * Documentation complète de l'architecture Viamentor
 *
 * @version 1.0.0
 * @date 2025-01-19
 */

export const ARCHITECTURE_MD = `
# 📐 Architecture Viamentor

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture technique](#architecture-technique)
3. [Structure du projet](#structure-du-projet)
4. [Patterns et conventions](#patterns-et-conventions)
5. [Flux de données](#flux-de-données)
6. [Sécurité](#sécurité)
7. [Performance](#performance)
8. [Décisions architecturales](#décisions-architecturales)

---

## 1. Vue d'ensemble

### 1.1 Description

Viamentor est une **plateforme SaaS multi-tenant** pour la gestion complète d'auto-écoles suisses, conforme aux réglementations OAC (Ordonnance sur l'admission à la circulation).

### 1.2 Caractéristiques principales

- 🏢 **Multi-tenant** : Isolation complète des données par école
- 🔐 **RBAC** : 15 rôles hiérarchiques avec permissions granulaires
- 🌍 **i18n** : Support FR/DE/IT/EN avec namespaces
- 📱 **Responsive** : Mobile-first avec touch gestures
- ♿ **Accessible** : WCAG 2.1 AA compliance
- 🎨 **Themable** : Light/Dark mode avec design tokens

### 1.3 Stack technique

\`\`\`
Frontend:
├── React 18.3.1
├── TypeScript 5.x
├── Tailwind CSS 3.x
├── Shadcn UI (Hero UI)
├── React Router DOM 7.x
├── TanStack Query 5.x
├── Zustand 5.x
├── React Hook Form + Zod
└── Recharts 2.x

Backend (Future):
├── Next.js 15 App Router
├── Supabase (Auth + DB + Storage)
├── PostgreSQL 15+
├── Prisma ORM
└── Edge Functions
\`\`\`

---

## 2. Architecture technique

### 2.1 Architecture globale

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT BROWSER                          │
├─────────────────────────────────────────────────────────────┤
│  React SPA (Vite)                                           │
│  ├── React Router (Routing)                                 │
│  ├── Zustand (Client State)                                 │
│  ├── TanStack Query (Server State)                          │
│  └── LocaleProvider + ThemeProvider (Context)               │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                     API LAYER (Future)                       │
├─────────────────────────────────────────────────────────────┤
│  Next.js 15 App Router                                      │
│  ├── Server Components                                      │
│  ├── Server Actions                                         │
│  ├── API Routes                                             │
│  └── Middleware (Auth + RBAC)                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     SUPABASE                                 │
├─────────────────────────────────────────────────────────────┤
│  ├── Auth (JWT + Row Level Security)                        │
│  ├── PostgreSQL (Multi-tenant DB)                           │
│  ├── Storage (Documents + Images)                           │
│  ├── Realtime (WebSocket subscriptions)                     │
│  └── Edge Functions (Business logic)                        │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### 2.2 Architecture multi-tenant

\`\`\`sql
-- Stratégie: Shared Database + Row Level Security (RLS)

┌─────────────────────────────────────────────────────────────┐
│                     POSTGRESQL DATABASE                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Tenant 1   │  │   Tenant 2   │  │   Tenant N   │      │
│  │  (École A)   │  │  (École B)   │  │  (École N)   │      │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤      │
│  │ • Students   │  │ • Students   │  │ • Students   │      │
│  │ • Instructors│  │ • Instructors│  │ • Instructors│      │
│  │ • Lessons    │  │ • Lessons    │  │ • Lessons    │      │
│  │ • Invoices   │  │ • Invoices   │  │ • Invoices   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  RLS Policies: WHERE tenant_id = auth.jwt() ->> 'tenant_id' │
└─────────────────────────────────────────────────────────────┘
\`\`\`

**Avantages:**
- ✅ Coûts réduits (une seule DB)
- ✅ Maintenance simplifiée
- ✅ Migrations centralisées
- ✅ Sécurité renforcée (RLS PostgreSQL)

**Inconvénients:**
- ⚠️ Performance partagée
- ⚠️ Risque de fuite de données (mitigé par RLS)

### 2.3 Architecture RBAC

\`\`\`typescript
// Hiérarchie des rôles (15 rôles)

SUPER_ADMIN (Niveau 0)
  └── PLATFORM_ADMIN (Niveau 1)
        ├── SCHOOL_ADMIN (Niveau 2)
        │     ├── INSTRUCTOR_MANAGER (Niveau 3)
        │     ├── MARKETING_MANAGER (Niveau 3)
        │     ├── FINANCE_MANAGER (Niveau 3)
        │     ├── ACCOUNTANT (Niveau 3)
        │     ├── SECRETARY (Niveau 3)
        │     ├── INSTRUCTOR (Niveau 4)
        │     └── STUDENT (Niveau 5)
        ├── SECURITY_OFFICER (Niveau 2)
        ├── FINANCE_ADMIN (Niveau 2)
        ├── SUPPORT_AGENT (Niveau 2)
        ├── CONTENT_MANAGER (Niveau 2)
        └── ANALYST (Niveau 2)

// Matrice de permissions
Permissions = {
  resource: "students" | "instructors" | "lessons" | ...,
  actions: ["create", "read", "update", "delete"],
  scope: "own" | "team" | "tenant" | "global"
}
\`\`\`

---

## 3. Structure du projet

### 3.1 Organisation des fichiers

\`\`\`
polymet/
├── 📁 data/              # Mock data, types, hooks, stores
│   ├── viamentor-*-data.tsx        # Mock data
│   ├── viamentor-*-i18n.tsx        # Traductions
│   ├── viamentor-*-schemas.tsx     # Zod schemas
│   ├── viamentor-*-store.tsx       # Zustand stores
│   └── viamentor-*-hooks.tsx       # Custom hooks
│
├── 📁 components/        # Composants réutilisables
│   ├── viamentor-header.tsx
│   ├── viamentor-sidebar.tsx
│   ├── viamentor-*-table.tsx
│   ├── viamentor-*-wizard.tsx
│   └── viamentor-*-card.tsx
│
├── 📁 pages/             # Pages de l'application
│   ├── viamentor-dashboard-*.tsx
│   ├── viamentor-*-page.tsx
│   └── viamentor-*-detail-page.tsx
│
├── 📁 layouts/           # Layouts réutilisables
│   └── viamentor-main-layout.tsx
│
└── 📁 prototypes/        # Routing et navigation
    └── viamentor-system-prototype.tsx
\`\`\`

### 3.2 Conventions de nommage

\`\`\`typescript
// Fichiers
viamentor-[module]-[type].tsx
  ├── module: students, instructors, lessons, etc.
  └── type: page, data, i18n, schemas, store, etc.

// Composants
export function ViamentorStudentsTable() {}
export function ViamentorCreateStudentWizard() {}

// Types
export interface Student {}
export type StudentsLocale = {}

// Constantes
export const STUDENTS_DATA: Student[] = []
export const STUDENTS_I18N = {}
\`\`\`

### 3.3 Séparation des responsabilités

| Type | Responsabilité | Exemple |
|------|----------------|---------|
| **Pages** | Composition, layout, routing | \`viamentor-students-page.tsx\` |
| **Components** | UI réutilisable, logique isolée | \`viamentor-students-table.tsx\` |
| **Data** | Mock data, types, business logic | \`viamentor-students-data.tsx\` |
| **Layouts** | Structure globale, navigation | \`viamentor-main-layout.tsx\` |
| **Prototypes** | Routing, navigation, guards | \`viamentor-system-prototype.tsx\` |

---

## 4. Patterns et conventions

### 4.1 Component patterns

#### 4.1.1 Compound Components

\`\`\`typescript
// ❌ Mauvais: Props drilling
<Wizard
  steps={steps}
  currentStep={currentStep}
  onNext={onNext}
  onPrev={onPrev}
  onSubmit={onSubmit}
/>

// ✅ Bon: Compound components
<Wizard>
  <Wizard.Step1 />
  <Wizard.Step2 />
  <Wizard.Step3 />
  <Wizard.Summary />
</Wizard>
\`\`\`

#### 4.1.2 Render Props

\`\`\`typescript
// ✅ Bon: Render props pour flexibilité
<DataTable
  data={students}
  columns={columns}
  renderRow={(student) => (
    <StudentRow student={student} />
  )}
  renderEmpty={() => <EmptyState />}
/>
\`\`\`

#### 4.1.3 Custom Hooks

\`\`\`typescript
// ✅ Bon: Logique réutilisable
function useStudents(filters?: StudentsFilters) {
  return useQuery({
    queryKey: ['students', filters],
    queryFn: () => fetchStudents(filters),
  })
}

// Usage
const { data: students, isLoading } = useStudents({ status: 'active' })
\`\`\`

### 4.2 State management patterns

#### 4.2.1 Server State (TanStack Query)

\`\`\`typescript
// ✅ Bon: Server state avec TanStack Query
const { data, isLoading, error } = useQuery({
  queryKey: ['students', filters],
  queryFn: () => api.students.list(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
})

// Mutations
const mutation = useMutation({
  mutationFn: (student: Student) => api.students.create(student),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['students'] })
  },
})
\`\`\`

#### 4.2.2 Client State (Zustand)

\`\`\`typescript
// ✅ Bon: Client state avec Zustand
interface UserStore {
  user: User | null
  role: Role | null
  tenant: string | null
  setUser: (user: User) => void
  logout: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  role: null,
  tenant: null,
  setUser: (user) => set({ user, role: user.role, tenant: user.tenant_id }),
  logout: () => set({ user: null, role: null, tenant: null }),
}))
\`\`\`

#### 4.2.3 UI State (React useState)

\`\`\`typescript
// ✅ Bon: UI state local
function StudentsPage() {
  const [view, setView] = useState<'table' | 'grid'>('table')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  
  // ...
}
\`\`\`

### 4.3 Form patterns

\`\`\`typescript
// ✅ Bon: React Hook Form + Zod
const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
})

type FormData = z.infer<typeof schema>

function StudentForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* ... */}
    </form>
  )
}
\`\`\`

### 4.4 Error handling patterns

\`\`\`typescript
// ✅ Bon: Error boundaries + fallbacks
<ErrorBoundary
  fallback={(error) => <ErrorPage error={error} />}
>
  <Suspense fallback={<LoadingPage />}>
    <StudentsPage />
  </Suspense>
</ErrorBoundary>

// Query error handling
const { data, error } = useQuery({
  queryKey: ['students'],
  queryFn: fetchStudents,
  retry: 3,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
})

if (error) {
  return <ErrorState error={error} />
}
\`\`\`

---

## 5. Flux de données

### 5.1 Flux d'authentification

\`\`\`
┌─────────────┐
│   Login     │
│   Page      │
└──────┬──────┘
       │ 1. Submit credentials
       ↓
┌─────────────┐
│  Supabase   │
│   Auth      │
└──────┬──────┘
       │ 2. Return JWT + user
       ↓
┌─────────────┐
│  UserStore  │
│  (Zustand)  │
└──────┬──────┘
       │ 3. Store user + role + tenant
       ↓
┌─────────────┐
│  Protected  │
│   Routes    │
└──────┬──────┘
       │ 4. Check permissions
       ↓
┌─────────────┐
│  Dashboard  │
│   Page      │
└─────────────┘
\`\`\`

### 5.2 Flux de données CRUD

\`\`\`
┌─────────────┐
│  Component  │
└──────┬──────┘
       │ 1. useQuery
       ↓
┌─────────────┐
│  TanStack   │
│   Query     │
└──────┬──────┘
       │ 2. Check cache
       ↓
┌─────────────┐
│  API Call   │
│  (Future)   │
└──────┬──────┘
       │ 3. Fetch data
       ↓
┌─────────────┐
│  Supabase   │
│   Database  │
└──────┬──────┘
       │ 4. Return data
       ↓
┌─────────────┐
│  Component  │
│  Re-render  │
└─────────────┘
\`\`\`

### 5.3 Flux de mutations

\`\`\`
┌─────────────┐
│  Component  │
└──────┬──────┘
       │ 1. useMutation
       ↓
┌─────────────┐
│  Optimistic │
│   Update    │
└──────┬──────┘
       │ 2. Update UI immediately
       ↓
┌─────────────┐
│  API Call   │
└──────┬──────┘
       │ 3. Send mutation
       ↓
┌─────────────┐
│  Supabase   │
└──────┬──────┘
       │ 4. Success/Error
       ↓
┌─────────────┐
│  Invalidate │
│   Queries   │
└──────┬──────┘
       │ 5. Refetch data
       ↓
┌─────────────┐
│  Component  │
│  Re-render  │
└─────────────┘
\`\`\`

---

## 6. Sécurité

### 6.1 Authentification

\`\`\`typescript
// JWT Token structure
{
  sub: "user-uuid",
  email: "admin@viamentor.ch",
  role: "SCHOOL_ADMIN",
  tenant_id: "tenant-uuid",
  permissions: ["students:read", "students:write", ...],
  exp: 1234567890
}
\`\`\`

### 6.2 Autorisation (RBAC)

\`\`\`typescript
// Middleware protection
export async function middleware(request: NextRequest) {
  const token = await getToken(request)
  
  // Check authentication
  if (!token) {
    return NextResponse.redirect('/login')
  }
  
  // Check authorization
  const hasPermission = checkPermission(
    token.role,
    request.nextUrl.pathname
  )
  
  if (!hasPermission) {
    return NextResponse.redirect('/unauthorized')
  }
  
  return NextResponse.next()
}
\`\`\`

### 6.3 Row Level Security (RLS)

\`\`\`sql
-- Politique RLS pour students
CREATE POLICY "Students are viewable by same tenant"
  ON students
  FOR SELECT
  USING (tenant_id = auth.jwt() ->> 'tenant_id');

CREATE POLICY "Students are insertable by same tenant"
  ON students
  FOR INSERT
  WITH CHECK (tenant_id = auth.jwt() ->> 'tenant_id');
\`\`\`

### 6.4 Validation

\`\`\`typescript
// Client-side validation (Zod)
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

// Server-side validation (Zod)
export async function createStudent(data: unknown) {
  const validated = schema.parse(data) // Throws if invalid
  
  // Insert to DB
  return await db.students.create(validated)
}
\`\`\`

---

## 7. Performance

### 7.1 Optimisations React

\`\`\`typescript
// ✅ Memoization
const MemoizedStudentRow = memo(StudentRow)

// ✅ useMemo pour calculs coûteux
const filteredStudents = useMemo(
  () => students.filter(s => s.status === 'active'),
  [students]
)

// ✅ useCallback pour fonctions
const handleClick = useCallback(
  (id: string) => {
    console.log(id)
  },
  []
)

// ✅ Lazy loading
const StudentsPage = lazy(() => import('./pages/viamentor-students-page'))
\`\`\`

### 7.2 Optimisations TanStack Query

\`\`\`typescript
// ✅ Stale time
useQuery({
  queryKey: ['students'],
  queryFn: fetchStudents,
  staleTime: 5 * 60 * 1000, // 5 minutes
})

// ✅ Prefetching
queryClient.prefetchQuery({
  queryKey: ['student', id],
  queryFn: () => fetchStudent(id),
})

// ✅ Pagination
useInfiniteQuery({
  queryKey: ['students'],
  queryFn: ({ pageParam = 0 }) => fetchStudents(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
})
\`\`\`

### 7.3 Optimisations bundle

\`\`\`typescript
// ✅ Code splitting
const routes = [
  {
    path: '/students',
    component: lazy(() => import('./pages/viamentor-students-page')),
  },
]

// ✅ Tree shaking
import { Button } from '@/components/ui/button' // ✅
import * as UI from '@/components/ui' // ❌
\`\`\`

---

## 8. Décisions architecturales

### 8.1 ADR-001: Multi-tenant strategy

**Contexte:** Besoin d'isoler les données par école

**Décision:** Shared Database + Row Level Security

**Alternatives considérées:**
- ❌ Database per tenant (coûts élevés)
- ❌ Schema per tenant (complexité migrations)

**Conséquences:**
- ✅ Coûts réduits
- ✅ Maintenance simplifiée
- ⚠️ Performance partagée

### 8.2 ADR-002: State management

**Contexte:** Besoin de gérer server state et client state

**Décision:** TanStack Query + Zustand

**Alternatives considérées:**
- ❌ Redux (trop verbeux)
- ❌ MobX (courbe d'apprentissage)

**Conséquences:**
- ✅ Séparation claire server/client state
- ✅ Cache automatique
- ✅ Optimistic updates

### 8.3 ADR-003: UI Framework

**Contexte:** Besoin d'un design system cohérent

**Décision:** Shadcn UI (Hero UI) + Tailwind CSS

**Alternatives considérées:**
- ❌ Material UI (trop opinionated)
- ❌ Ant Design (bundle size)

**Conséquences:**
- ✅ Composants accessibles
- ✅ Customisation facile
- ✅ Bundle size optimisé

### 8.4 ADR-004: i18n Strategy

**Contexte:** Support FR/DE/IT/EN requis

**Décision:** Context API + namespaces

**Alternatives considérées:**
- ❌ react-i18next (bundle size)
- ❌ next-intl (dépendance Next.js)

**Conséquences:**
- ✅ Léger et performant
- ✅ Type-safe
- ⚠️ Pas de pluralization avancée

---

## Conclusion

Cette architecture est conçue pour:
- ✅ **Scalabilité** : Multi-tenant, lazy loading, code splitting
- ✅ **Maintenabilité** : Patterns clairs, séparation des responsabilités
- ✅ **Sécurité** : RBAC, RLS, validation
- ✅ **Performance** : Memoization, caching, optimistic updates
- ✅ **DX** : TypeScript, conventions, documentation

---

**Dernière mise à jour:** 2025-01-19  
**Version:** 1.0.0  
**Auteur:** Viamentor Team
`;

export default ARCHITECTURE_MD;
