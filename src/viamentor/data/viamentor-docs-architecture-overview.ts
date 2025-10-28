/**
 * VIAMENTOR - Architecture Overview
 * Guide complet de l'architecture système avec stack technique et design patterns
 */

// ============================================================================
// TABLE DES MATIÈRES
// ============================================================================

/**
 * 1. Vue d'ensemble de l'architecture
 * 2. Stack technique
 * 3. Structure du projet
 * 4. Architecture des composants
 * 5. Gestion de l'état
 * 6. Routing et navigation
 * 7. Internationalisation (i18n)
 * 8. Authentification et RBAC
 * 9. Data fetching et caching
 * 10. Styling et theming
 * 11. Performance et optimisation
 * 12. Sécurité
 * 13. Testing
 * 14. Deployment
 * 15. Best practices
 */

// ============================================================================
// 1. VUE D'ENSEMBLE DE L'ARCHITECTURE
// ============================================================================

/**
 * Viamentor est une application web moderne construite avec:
 * - React 18 pour l'UI
 * - TypeScript pour la type safety
 * - Tailwind CSS pour le styling
 * - Shadcn UI pour les composants
 * - React Router v6 pour le routing
 * - TanStack Query pour le data fetching
 * - Zustand pour le state management
 * - Zod pour la validation
 * - React Hook Form pour les formulaires
 * - Recharts pour les graphiques
 * - Lucide React pour les icônes
 *
 * Architecture Pattern: Component-Based Architecture
 * - Composants réutilisables
 * - Séparation des responsabilités
 * - Composition over inheritance
 * - Props drilling minimal
 * - Context API pour state global
 */

export const ARCHITECTURE_OVERVIEW = {
  pattern: "Component-Based Architecture",
  framework: "React 18",
  language: "TypeScript",
  styling: "Tailwind CSS + Shadcn UI",
  routing: "React Router v6",
  stateManagement: "Zustand + TanStack Query",
  validation: "Zod",
  forms: "React Hook Form",
  charts: "Recharts",
  icons: "Lucide React",
};

// ============================================================================
// 2. STACK TECHNIQUE
// ============================================================================

/**
 * 2.1 FRONTEND CORE
 */

export const FRONTEND_STACK = {
  // Framework & Language
  react: "^18.3.1",
  typescript: "^5.6.3",
  
  // Build Tool
  vite: "^6.0.3",
  
  // Routing
  reactRouter: "^7.1.1",
  
  // State Management
  zustand: "^5.0.2",
  tanstackQuery: "^5.62.11",
  
  // Forms & Validation
  reactHookForm: "^7.54.2",
  zod: "^3.24.1",
  
  // UI Components
  shadcnUI: "latest",
  radixUI: "latest",
  
  // Styling
  tailwindCSS: "^3.4.17",
  
  // Charts
  recharts: "^2.15.0",
  
  // Icons
  lucideReact: "^0.468.0",
  
  // Utilities
  clsx: "^2.1.1",
  tailwindMerge: "^2.6.0",
  dateF ns: "^4.1.0",
};

/**
 * 2.2 DEVELOPMENT TOOLS
 */

export const DEV_TOOLS = {
  // Linting & Formatting
  eslint: "^9.17.0",
  prettier: "^3.4.2",
  
  // Type Checking
  typescript: "^5.6.3",
  
  // Git Hooks
  husky: "^9.1.7",
  lintStaged: "^15.2.11",
  
  // Testing (à venir)
  vitest: "future",
  testingLibrary: "future",
};

/**
 * 2.3 BACKEND & DATABASE (Mock pour développement)
 */

export const BACKEND_STACK = {
  // Backend (Production)
  nextjs: "future", // Next.js 15 App Router
  supabase: "future", // Auth + Database + Storage
  
  // Mock (Développement)
  mockData: "current",
  mockAuth: "current",
  mockAPI: "current",
};

// ============================================================================
// 3. STRUCTURE DU PROJET
// ============================================================================

/**
 * Structure des dossiers Viamentor:
 */

export const PROJECT_STRUCTURE = `
viamentor/
├── components/          # Composants réutilisables
│   ├── viamentor-header
│   ├── viamentor-sidebar
│   ├── viamentor-students-table
│   └── ...
│
├── pages/              # Pages de l'application
│   ├── viamentor-students-page
│   ├── viamentor-student-detail-page
│   └── ...
│
├── layouts/            # Layouts de l'application
│   └── viamentor-main-layout
│
├── data/               # Data, hooks, stores, utils
│   ├── viamentor-students-data
│   ├── viamentor-students-i18n
│   ├── viamentor-user-store
│   ├── viamentor-use-students-query
│   └── ...
│
└── prototypes/         # Prototypes avec routing
    └── viamentor-system-prototype
`;

/**
 * Règles de structure:
 * - Composants: Réutilisables, sans logique métier
 * - Pages: Composent les composants, gèrent la logique
 * - Layouts: Wrappent les pages, gèrent la structure
 * - Data: Mock data, hooks, stores, utils
 * - Prototypes: Routing et navigation
 */

// ============================================================================
// 4. ARCHITECTURE DES COMPOSANTS
// ============================================================================

/**
 * 4.1 HIÉRARCHIE DES COMPOSANTS
 */

export const COMPONENT_HIERARCHY = `
Prototype (Routing)
  └── Layout (Structure)
      └── Page (Composition)
          └── Sections (Organisation)
              └── Components (UI)
                  └── Primitives (Shadcn)
`;

/**
 * 4.2 TYPES DE COMPOSANTS
 */

export const COMPONENT_TYPES = {
  // Composants de présentation (Presentational)
  presentational: {
    description: "Composants purement visuels sans logique",
    examples: [
      "StudentCard",
      "InstructorAvatar",
      "LessonBadge",
      "StatCard",
    ],
    rules: [
      "Pas de state management",
      "Pas de data fetching",
      "Props uniquement",
      "Réutilisables",
    ],
  },

  // Composants conteneurs (Container)
  container: {
    description: "Composants avec logique métier",
    examples: [
      "StudentsTable",
      "CreateStudentWizard",
      "LessonCalendar",
      "InvoicesList",
    ],
    rules: [
      "Gèrent le state",
      "Fetchent les données",
      "Composent les presentational",
      "Gèrent les interactions",
    ],
  },

  // Composants de layout
  layout: {
    description: "Composants de structure",
    examples: [
      "MainLayout",
      "AuthLayout",
      "PublicLayout",
    ],
    rules: [
      "Wrappent les pages",
      "Gèrent la structure globale",
      "Header, Sidebar, Footer",
      "Navigation globale",
    ],
  },

  // Composants de page
  page: {
    description: "Composants de page complète",
    examples: [
      "StudentsPage",
      "StudentDetailPage",
      "DashboardSchoolPage",
    ],
    rules: [
      "Composent les sections",
      "Gèrent le routing",
      "Indépendants du layout",
      "Un par route",
    ],
  },
};

/**
 * 4.3 PATTERNS DE COMPOSITION
 */

// Pattern 1: Composition avec children
function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

// Pattern 2: Composition avec render props
function DataTable({ 
  data, 
  renderRow 
}: { 
  data: any[]; 
  renderRow: (item: any) => ReactNode 
}) {
  return (
    <table>
      <tbody>
        {data.map((item) => renderRow(item))}
      </tbody>
    </table>
  );
}

// Pattern 3: Composition avec slots
function Card({ 
  header, 
  content, 
  footer 
}: { 
  header?: ReactNode; 
  content: ReactNode; 
  footer?: ReactNode 
}) {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-content">{content}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// ============================================================================
// 5. GESTION DE L'ÉTAT
// ============================================================================

/**
 * 5.1 STRATÉGIE DE STATE MANAGEMENT
 */

export const STATE_MANAGEMENT_STRATEGY = {
  // State local (useState)
  local: {
    usage: "État UI local, temporaire",
    examples: [
      "isOpen (modal)",
      "currentStep (wizard)",
      "selectedTab",
      "formValues (temporaire)",
    ],
    tool: "useState",
  },

  // State global (Zustand)
  global: {
    usage: "État partagé entre composants",
    examples: [
      "currentUser",
      "theme",
      "locale",
      "sidebarCollapsed",
    ],
    tool: "Zustand",
  },

  // Server state (TanStack Query)
  server: {
    usage: "Données du serveur avec cache",
    examples: [
      "students",
      "instructors",
      "lessons",
      "invoices",
    ],
    tool: "TanStack Query",
  },

  // Form state (React Hook Form)
  form: {
    usage: "État des formulaires",
    examples: [
      "createStudentForm",
      "editInstructorForm",
      "bookLessonForm",
    ],
    tool: "React Hook Form",
  },
};

/**
 * 5.2 ZUSTAND STORES
 */

// Exemple de store Zustand
import { create } from "zustand";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

/**
 * 5.3 TANSTACK QUERY HOOKS
 */

// Exemple de hook TanStack Query
import { useQuery } from "@tanstack/react-query";

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: ["students", id],
    queryFn: () => fetchStudent(id),
    enabled: !!id,
  });
}

// ============================================================================
// 6. ROUTING ET NAVIGATION
// ============================================================================

/**
 * 6.1 ARCHITECTURE ROUTING
 */

export const ROUTING_ARCHITECTURE = {
  library: "React Router v6",
  pattern: "Declarative Routing",
  structure: "Flat Routes",
  
  features: [
    "Nested routes",
    "Dynamic routes",
    "Query parameters",
    "Redirects",
    "Guards (RBAC)",
    "Lazy loading",
  ],
};

/**
 * 6.2 STRUCTURE DES ROUTES
 */

// Prototype avec routes
function SystemPrototype() {
  return (
    <Router>
      <Routes>
        {/* Route simple */}
        <Route 
          path="/students" 
          element={
            <MainLayout>
              <StudentsPage />
            </MainLayout>
          } 
        />

        {/* Route avec paramètre */}
        <Route 
          path="/students/:id" 
          element={
            <MainLayout>
              <StudentDetailPage />
            </MainLayout>
          } 
        />

        {/* Route avec guard RBAC */}
        <Route 
          path="/super-admin" 
          element={
            <RBACGuard allowedRoles={["super_admin"]}>
              <MainLayout>
                <SuperAdminPage />
              </MainLayout>
            </RBACGuard>
          } 
        />

        {/* Redirection */}
        <Route 
          path="/dashboard" 
          element={<Navigate to="/school/dashboard" replace />} 
        />

        {/* 404 */}
        <Route 
          path="*" 
          element={
            <MainLayout>
              <NotFoundPage />
            </MainLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

// ============================================================================
// 7. INTERNATIONALISATION (I18N)
// ============================================================================

/**
 * 7.1 ARCHITECTURE I18N
 */

export const I18N_ARCHITECTURE = {
  languages: ["fr", "de", "it", "en"],
  defaultLanguage: "fr",
  fallbackLanguage: "fr",
  
  features: [
    "Namespaces par domaine",
    "Traductions contextuelles",
    "Pluriels et genres",
    "Formats dates/nombres/devises",
    "Lazy loading des traductions",
  ],
};

/**
 * 7.2 STRUCTURE I18N
 */

// Fichier i18n par domaine
export const studentsI18n = {
  fr: {
    list: {
      title: "Gestion des élèves",
      subtitle: "Liste complète des élèves",
    },
    actions: {
      create: "Créer un élève",
      edit: "Modifier",
      delete: "Supprimer",
    },
  },
  de: {
    list: {
      title: "Schülerverwaltung",
      subtitle: "Vollständige Schülerliste",
    },
    actions: {
      create: "Schüler erstellen",
      edit: "Bearbeiten",
      delete: "Löschen",
    },
  },
  // ... it, en
};

// Utilisation avec Context
import { useLocale } from "@/viamentor/data/viamentor-locale-provider";

function StudentsPage() {
  const { t } = useLocale();
  
  return (
    <div>
      <h1>{t("students.list.title")}</h1>
      <Button>{t("students.actions.create")}</Button>
    </div>
  );
}

// ============================================================================
// 8. AUTHENTIFICATION ET RBAC
// ============================================================================

/**
 * 8.1 ARCHITECTURE AUTH
 */

export const AUTH_ARCHITECTURE = {
  provider: "Supabase (production) / Mock (dev)",
  strategy: "JWT + Refresh Tokens",
  storage: "localStorage + httpOnly cookies",
  
  features: [
    "Login/Logout",
    "Session management",
    "Token refresh",
    "RBAC permissions",
    "Route guards",
  ],
};

/**
 * 8.2 RÔLES RBAC
 */

export const RBAC_ROLES = {
  // Super Admin (Viamentor)
  super_admin: {
    level: 1,
    permissions: ["*"],
    description: "Accès complet système",
  },

  // Platform Admin (Viamentor)
  platform_admin: {
    level: 2,
    permissions: ["manage_tenants", "view_analytics", "manage_billing"],
    description: "Gestion plateforme",
  },

  // School Admin (École)
  school_admin: {
    level: 3,
    permissions: ["manage_students", "manage_instructors", "manage_lessons"],
    description: "Gestion école",
  },

  // Instructor (Moniteur)
  instructor: {
    level: 4,
    permissions: ["view_students", "manage_lessons", "evaluate_students"],
    description: "Moniteur auto-école",
  },

  // Student (Élève)
  student: {
    level: 5,
    permissions: ["view_profile", "book_lessons", "view_progression"],
    description: "Élève auto-école",
  },

  // Secretary (Secrétaire)
  secretary: {
    level: 4,
    permissions: ["manage_students", "manage_planning", "view_invoices"],
    description: "Secrétariat",
  },
};

/**
 * 8.3 GUARDS ET PROTECTION
 */

// Guard RBAC
function RBACGuard({ 
  children, 
  allowedRoles 
}: { 
  children: ReactNode; 
  allowedRoles: UserRole[] 
}) {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

// ============================================================================
// 9. DATA FETCHING ET CACHING
// ============================================================================

/**
 * 9.1 ARCHITECTURE DATA FETCHING
 */

export const DATA_FETCHING_ARCHITECTURE = {
  library: "TanStack Query v5",
  strategy: "Stale-While-Revalidate",
  caching: "In-memory cache with persistence",
  
  features: [
    "Automatic caching",
    "Background refetching",
    "Optimistic updates",
    "Pagination",
    "Infinite scroll",
    "Mutations",
  ],
};

/**
 * 9.2 PATTERNS DATA FETCHING
 */

// Query simple
export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,
    staleTime: 5 * 60 * 1000,
  });
}

// Query avec paramètres
export function useStudent(id: string) {
  return useQuery({
    queryKey: ["students", id],
    queryFn: () => fetchStudent(id),
    enabled: !!id,
  });
}

// Mutation
export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
}

// Optimistic update
export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudent,
    onMutate: async (newStudent) => {
      await queryClient.cancelQueries({ queryKey: ["students", newStudent.id] });
      const previousStudent = queryClient.getQueryData(["students", newStudent.id]);
      queryClient.setQueryData(["students", newStudent.id], newStudent);
      return { previousStudent };
    },
    onError: (err, newStudent, context) => {
      queryClient.setQueryData(
        ["students", newStudent.id],
        context?.previousStudent
      );
    },
  });
}

// ============================================================================
// 10. STYLING ET THEMING
// ============================================================================

/**
 * 10.1 ARCHITECTURE STYLING
 */

export const STYLING_ARCHITECTURE = {
  framework: "Tailwind CSS",
  components: "Shadcn UI",
  theme: "CSS Variables + Tailwind Config",
  darkMode: "class-based",
  
  features: [
    "Utility-first CSS",
    "Design tokens",
    "Dark mode support",
    "Responsive design",
    "Custom components",
  ],
};

/**
 * 10.2 DESIGN TOKENS
 */

export const DESIGN_TOKENS = {
  colors: {
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    muted: "hsl(var(--muted))",
    accent: "hsl(var(--accent))",
    destructive: "hsl(var(--destructive))",
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },

  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
    },
  },
};

// ============================================================================
// 11. PERFORMANCE ET OPTIMISATION
// ============================================================================

/**
 * 11.1 STRATÉGIES D'OPTIMISATION
 */

export const PERFORMANCE_STRATEGIES = {
  // Code splitting
  codeSplitting: {
    method: "React.lazy + Suspense",
    target: "Routes et composants lourds",
  },

  // Lazy loading
  lazyLoading: {
    method: "Intersection Observer",
    target: "Images, composants hors viewport",
  },

  // Memoization
  memoization: {
    method: "React.memo, useMemo, useCallback",
    target: "Composants coûteux, calculs lourds",
  },

  // Virtualization
  virtualization: {
    method: "React Virtual",
    target: "Listes longues, tables",
  },

  // Debouncing
  debouncing: {
    method: "useDebounce hook",
    target: "Search, filters, API calls",
  },
};

/**
 * 11.2 EXEMPLES D'OPTIMISATION
 */

// Code splitting
const StudentsPage = lazy(() => import("@/viamentor/pages/viamentor-students-page"));

// Memoization
const StudentCard = memo(({ student }: { student: Student }) => {
  return <Card>...</Card>;
});

// useMemo
const filteredStudents = useMemo(() => {
  return students.filter((s) => s.status === "active");
}, [students]);

// useCallback
const handleStudentClick = useCallback((id: string) => {
  navigate(`/students/${id}`);
}, [navigate]);

// ============================================================================
// 12. SÉCURITÉ
// ============================================================================

/**
 * 12.1 MESURES DE SÉCURITÉ
 */

export const SECURITY_MEASURES = {
  // Authentication
  auth: [
    "JWT tokens",
    "Refresh tokens",
    "httpOnly cookies",
    "CSRF protection",
  ],

  // Authorization
  authz: [
    "RBAC permissions",
    "Route guards",
    "API guards",
    "Field-level permissions",
  ],

  // Data validation
  validation: [
    "Zod schemas",
    "Input sanitization",
    "XSS prevention",
    "SQL injection prevention",
  ],

  // API security
  api: [
    "Rate limiting",
    "CORS configuration",
    "API keys",
    "Request signing",
  ],
};

// ============================================================================
// 13. TESTING
// ============================================================================

/**
 * 13.1 STRATÉGIE DE TESTING
 */

export const TESTING_STRATEGY = {
  // Tests manuels (actuel)
  manual: {
    priority: "HIGH",
    coverage: "Pages, composants, navigation",
    tools: ["Chrome DevTools", "React DevTools"],
  },

  // Tests unitaires (futur)
  unit: {
    priority: "MEDIUM",
    coverage: "Fonctions, hooks, utils",
    tools: ["Vitest", "Testing Library"],
  },

  // Tests d'intégration (futur)
  integration: {
    priority: "MEDIUM",
    coverage: "Flux utilisateur, API calls",
    tools: ["Vitest", "Testing Library"],
  },

  // Tests E2E (futur)
  e2e: {
    priority: "LOW",
    coverage: "Parcours complets",
    tools: ["Playwright", "Cypress"],
  },
};

// ============================================================================
// 14. DEPLOYMENT
// ============================================================================

/**
 * 14.1 STRATÉGIE DE DEPLOYMENT
 */

export const DEPLOYMENT_STRATEGY = {
  // Développement
  development: {
    platform: "Local (Vite dev server)",
    url: "http://localhost:5173",
    features: ["Hot reload", "Mock data", "DevTools"],
  },

  // Staging (futur)
  staging: {
    platform: "Vercel / Netlify",
    url: "https://staging.viamentor.ch",
    features: ["Preview deployments", "Real data", "Testing"],
  },

  // Production (futur)
  production: {
    platform: "Vercel / Netlify",
    url: "https://viamentor.ch",
    features: ["CDN", "SSL", "Monitoring", "Analytics"],
  },
};

// ============================================================================
// 15. BEST PRACTICES
// ============================================================================

/**
 * 15.1 BEST PRACTICES GÉNÉRALES
 */

export const BEST_PRACTICES = {
  // Code quality
  codeQuality: [
    "TypeScript strict mode",
    "ESLint + Prettier",
    "Code reviews",
    "Documentation",
  ],

  // Component design
  componentDesign: [
    "Single responsibility",
    "Composition over inheritance",
    "Props drilling minimal",
    "Reusable components",
  ],

  // State management
  stateManagement: [
    "Local state par défaut",
    "Global state si nécessaire",
    "Server state avec TanStack Query",
    "Form state avec React Hook Form",
  ],

  // Performance
  performance: [
    "Code splitting",
    "Lazy loading",
    "Memoization",
    "Debouncing",
  ],

  // Accessibility
  accessibility: [
    "Semantic HTML",
    "ARIA labels",
    "Keyboard navigation",
    "Screen reader support",
  ],

  // Security
  security: [
    "Input validation",
    "XSS prevention",
    "CSRF protection",
    "RBAC enforcement",
  ],
};

// ============================================================================
// RESSOURCES
// ============================================================================

/**
 * Documentation de référence:
 * - React: https://react.dev/
 * - TypeScript: https://www.typescriptlang.org/
 * - Tailwind CSS: https://tailwindcss.com/
 * - Shadcn UI: https://ui.shadcn.com/
 * - React Router: https://reactrouter.com/
 * - TanStack Query: https://tanstack.com/query/
 * - Zustand: https://zustand-demo.pmnd.rs/
 * - Zod: https://zod.dev/
 * - React Hook Form: https://react-hook-form.com/
 */

export const ARCHITECTURE_GUIDE_VERSION = "1.0.0";
export const ARCHITECTURE_GUIDE_LAST_UPDATE = "2025-01-20";
