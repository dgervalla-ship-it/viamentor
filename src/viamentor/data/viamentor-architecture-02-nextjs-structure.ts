/**
 * VIAMENTOR - ARCHITECTURE PARTIE 2/6
 * Structure Next.js 15 Détaillée
 */

export const NEXTJS_STRUCTURE = `
viamentor-nextjs/
├── src/
│   ├── app/                        # App Router
│   │   ├── [locale]/               # i18n routing
│   │   │   ├── layout.tsx          # Root layout
│   │   │   ├── page.tsx            # Home
│   │   │   ├── (public)/           # Pages publiques
│   │   │   │   ├── contact/
│   │   │   │   └── merci/
│   │   │   ├── (auth)/             # Auth pages
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   └── [tenant]/           # Multi-tenant
│   │   │       ├── (dashboard)/    # Dashboards
│   │   │       ├── (management)/   # Gestion
│   │   │       ├── (finance)/      # Finance
│   │   │       ├── (analytics)/    # Analytics
│   │   │       └── (settings)/     # Settings
│   │   └── api/                    # API Routes
│   ├── actions/                    # Server Actions
│   ├── components/                 # Components
│   ├── lib/                        # Utils & configs
│   ├── hooks/                      # Custom hooks
│   ├── stores/                     # Zustand stores
│   ├── types/                      # TypeScript types
│   └── i18n/                       # i18n config
├── prisma/                         # Prisma ORM
├── public/                         # Static assets
└── middleware.ts                   # Middleware
`;

export const CONVENTIONS = {
  files: {
    page: "page.tsx - Route accessible",
    layout: "layout.tsx - Layout partagé",
    loading: "loading.tsx - Loading state",
    error: "error.tsx - Error boundary",
    notFound: "not-found.tsx - 404 page",
  },
  folders: {
    route: "kebab-case/",
    group: "(group)/ - N'affecte pas URL",
    dynamic: "[param]/ - Dynamic segment",
    parallel: "@slot/ - Parallel route",
  },
};

export default { NEXTJS_STRUCTURE, CONVENTIONS };
