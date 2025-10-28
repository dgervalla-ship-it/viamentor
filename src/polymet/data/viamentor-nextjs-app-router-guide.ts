/**
 * VIAMENTOR - Next.js 14 App Router Guide
 * Guide complet pour migration vers Next.js 14 App Router
 *
 * Structure: Multi-tenant + i18n + Supabase Auth + RBAC
 * Pattern: app/[locale]/[tenant]/layout.tsx
 */

/**
 * ============================================================================
 * STRUCTURE DES DOSSIERS
 * ============================================================================
 */

/**
 * Structure complète App Router:
 *
 * app/
 * ├── layout.tsx                                    # Root layout global
 * ├── page.tsx                                      # Homepage redirect
 * ├── login/
 * │   └── page.tsx                                  # Login page (public)
 * ├── [locale]/                                     # i18n routing (fr, de, it, en)
 * │   ├── layout.tsx                                # Locale provider wrapper
 * │   └── [tenant]/                                 # Multi-tenant routing
 * │       ├── layout.tsx                            # 🔥 MAIN LAYOUT (Sidebar + Header)
 * │       ├── page.tsx                              # Redirect role-based dashboard
 * │       ├── dashboard/
 * │       │   └── page.tsx                          # Dashboard École (school_admin)
 * │       ├── instructor-dashboard/
 * │       │   └── page.tsx                          # Dashboard Moniteur (instructor)
 * │       ├── student-dashboard/
 * │       │   └── page.tsx                          # Dashboard Élève (student)
 * │       ├── students/
 * │       │   ├── page.tsx                          # Liste élèves
 * │       │   └── [id]/
 * │       │       └── page.tsx                      # Détail élève
 * │       ├── instructors/
 * │       │   ├── page.tsx                          # Liste moniteurs
 * │       │   └── [id]/
 * │       │       └── page.tsx                      # Détail moniteur
 * │       ├── finance/
 * │       │   ├── page.tsx                          # Finance dashboard
 * │       │   ├── invoices/
 * │       │   │   └── page.tsx                      # Invoices
 * │       │   └── analytics/
 * │       │       └── page.tsx                      # Revenue analytics
 * │       ├── compliance/
 * │       │   └── gdpr/
 * │       │       └── page.tsx                      # GDPR compliance
 * │       └── tenants/
 * │           ├── page.tsx                          # Liste tenants (platform_admin)
 * │           └── [id]/
 * │               └── page.tsx                      # Détail tenant
 * └── api/
 *     ├── auth/
 *     │   └── callback/
 *     │       └── route.ts                          # Supabase auth callback
 *     └── webhooks/
 *         └── supabase/
 *             └── route.ts                          # Supabase webhooks
 */

/**
 * ============================================================================
 * 1. ROOT LAYOUT (app/layout.tsx)
 * ============================================================================
 */

export const RootLayoutExample = `
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Viamentor - Plateforme SaaS pour auto-écoles suisses",
  description: "Gestion complète d'auto-écoles avec RBAC, multi-tenant, i18n",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
`;

/**
 * ============================================================================
 * 2. LOCALE LAYOUT (app/[locale]/layout.tsx)
 * ============================================================================
 */

export const LocaleLayoutExample = `
// app/[locale]/layout.tsx
import { notFound } from "next/navigation";
import { LocaleProvider } from "@/polymet/components/viamentor-locale-provider";

const locales = ["fr", "de", "it", "en"] as const;
type Locale = (typeof locales)[number];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <LocaleProvider initialLocale={locale as Locale}>
      {children}
    </LocaleProvider>
  );
}
`;

/**
 * ============================================================================
 * 3. TENANT LAYOUT (app/[locale]/[tenant]/layout.tsx) 🔥 MAIN LAYOUT
 * ============================================================================
 */

export const TenantLayoutExample = `
// app/[locale]/[tenant]/layout.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ViamentorMainLayout } from "@/polymet/layouts/viamentor-main-layout";
import { ThemeProvider } from "@/polymet/components/viamentor-theme-provider";

/**
 * Tenant Layout - Main Layout avec Sidebar + Header
 * 
 * Features:
 * - Supabase Auth check (redirect /login if not authenticated)
 * - Tenant validation (404 if tenant not found)
 * - RBAC permissions check
 * - i18n initialization
 * - Theme provider (dark/light/system)
 * - Realtime providers (WebSocket notifications)
 */
export default async function TenantLayout({
  children,
  params: { locale, tenant },
}: {
  children: React.ReactNode;
  params: { locale: string; tenant: string };
}) {
  // ============================================================================
  // 1. SUPABASE AUTH CHECK
  // ============================================================================
  const supabase = createServerComponentClient({ cookies });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to login if not authenticated
  if (!session) {
    redirect(\`/login?redirect=/\${locale}/\${tenant}\`);
  }

  // ============================================================================
  // 2. TENANT VALIDATION
  // ============================================================================
  const { data: tenantData, error: tenantError } = await supabase
    .from("tenants")
    .select("*")
    .eq("slug", tenant)
    .single();

  // 404 if tenant not found
  if (tenantError || !tenantData) {
    redirect("/404");
  }

  // Check if tenant is active
  if (tenantData.status !== "active") {
    redirect(\`/\${locale}/tenant-suspended?tenant=\${tenant}\`);
  }

  // ============================================================================
  // 3. USER PERMISSIONS (RBAC)
  // ============================================================================
  const { data: userRole } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", session.user.id)
    .eq("tenant_id", tenantData.id)
    .single();

  // Check if user has access to this tenant
  if (!userRole) {
    redirect(\`/\${locale}/unauthorized?tenant=\${tenant}\`);
  }

  // ============================================================================
  // 4. RENDER LAYOUT
  // ============================================================================
  return (
    <ThemeProvider initialTheme="system">
      <ViamentorMainLayout
        locale={locale}
        tenant={tenant}
        user={{
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name,
          role: userRole.role,
          avatar: session.user.user_metadata.avatar,
        }}
        tenantData={tenantData}
      >
        {children}
      </ViamentorMainLayout>
    </ThemeProvider>
  );
}
`;

/**
 * ============================================================================
 * 4. TENANT ROOT PAGE (app/[locale]/[tenant]/page.tsx)
 * ============================================================================
 */

export const TenantRootPageExample = `
// app/[locale]/[tenant]/page.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 * Tenant Root Page - Redirect to role-based dashboard
 */
export default async function TenantRootPage({
  params: { locale, tenant },
}: {
  params: { locale: string; tenant: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  // Get user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // Get user role
  const { data: userRole } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", session.user.id)
    .single();

  // Redirect based on role
  const roleRedirects: Record<string, string> = {
    platform_admin: \`/\${locale}/\${tenant}/tenants\`,
    school_admin: \`/\${locale}/\${tenant}/dashboard\`,
    instructor: \`/\${locale}/\${tenant}/instructor-dashboard\`,
    student: \`/\${locale}/\${tenant}/student-dashboard\`,
  };

  const redirectPath = roleRedirects[userRole?.role] || \`/\${locale}/\${tenant}/dashboard\`;
  redirect(redirectPath);
}
`;

/**
 * ============================================================================
 * 5. DASHBOARD PAGES
 * ============================================================================
 */

export const DashboardPageExample = `
// app/[locale]/[tenant]/dashboard/page.tsx
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { DashboardSchoolPage } from "@/polymet/pages/viamentor-dashboard-school-page";

/**
 * Dashboard École Page (school_admin)
 */
export default async function DashboardPage({
  params: { locale, tenant },
}: {
  params: { locale: string; tenant: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  // Fetch dashboard data
  const { data: stats } = await supabase
    .from("dashboard_stats")
    .select("*")
    .eq("tenant_slug", tenant)
    .single();

  return <DashboardSchoolPage locale={locale} stats={stats} />;
}

// Revalidate every 5 minutes
export const revalidate = 300;
`;

export const InstructorDashboardPageExample = `
// app/[locale]/[tenant]/instructor-dashboard/page.tsx
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { DashboardInstructorPage } from "@/polymet/pages/viamentor-dashboard-instructor-page";

/**
 * Dashboard Moniteur Page (instructor)
 */
export default async function InstructorDashboardPage({
  params: { locale, tenant },
}: {
  params: { locale: string; tenant: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Fetch instructor data
  const { data: instructor } = await supabase
    .from("instructors")
    .select("*, lessons(*), students(*)")
    .eq("user_id", session?.user.id)
    .single();

  return <DashboardInstructorPage locale={locale} instructor={instructor} />;
}

export const revalidate = 60;
`;

export const StudentDashboardPageExample = `
// app/[locale]/[tenant]/student-dashboard/page.tsx
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { DashboardStudentPage } from "@/polymet/pages/viamentor-dashboard-student-page";

/**
 * Dashboard Élève Page (student)
 */
export default async function StudentDashboardPage({
  params: { locale, tenant },
}: {
  params: { locale: string; tenant: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Fetch student data
  const { data: student } = await supabase
    .from("students")
    .select("*, lessons(*), invoices(*), progression(*)")
    .eq("user_id", session?.user.id)
    .single();

  return <DashboardStudentPage locale={locale} student={student} />;
}

export const revalidate = 60;
`;

/**
 * ============================================================================
 * 6. STUDENTS PAGES
 * ============================================================================
 */

export const StudentsListPageExample = `
// app/[locale]/[tenant]/students/page.tsx
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { StudentsPage } from "@/polymet/pages/viamentor-students-page";

/**
 * Students List Page
 */
export default async function StudentsListPage({
  params: { locale, tenant },
  searchParams,
}: {
  params: { locale: string; tenant: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createServerComponentClient({ cookies });

  // Fetch students with filters
  let query = supabase
    .from("students")
    .select("*, instructor:instructors(*)")
    .eq("tenant_slug", tenant);

  // Apply filters from searchParams
  if (searchParams.status) {
    query = query.eq("status", searchParams.status);
  }
  if (searchParams.category) {
    query = query.contains("categories", [searchParams.category]);
  }

  const { data: students } = await query;

  return <StudentsPage locale={locale} students={students} />;
}

export const revalidate = 60;
`;

export const StudentDetailPageExample = `
// app/[locale]/[tenant]/students/[id]/page.tsx
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import { StudentDetailPage } from "@/polymet/pages/viamentor-student-detail-page";

/**
 * Student Detail Page
 */
export default async function StudentDetailPageRoute({
  params: { locale, tenant, id },
}: {
  params: { locale: string; tenant: string; id: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  // Fetch student with all relations
  const { data: student, error } = await supabase
    .from("students")
    .select(\`
      *,
      instructor:instructors(*),
      lessons(*),
      documents(*),
      invoices(*),
      progression(*)
    \`)
    .eq("id", id)
    .eq("tenant_slug", tenant)
    .single();

  if (error || !student) {
    notFound();
  }

  return <StudentDetailPage locale={locale} student={student} />;
}

export const revalidate = 30;
`;

/**
 * ============================================================================
 * 7. SUPABASE AUTH CALLBACK
 * ============================================================================
 */

export const AuthCallbackExample = `
// app/api/auth/callback/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to the redirect URL or default to home
  const redirectTo = requestUrl.searchParams.get("redirect") || "/";
  return NextResponse.redirect(new URL(redirectTo, request.url));
}
`;

/**
 * ============================================================================
 * 8. MIDDLEWARE (middleware.ts)
 * ============================================================================
 */

export const MiddlewareExample = `
// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes
  const protectedPaths = ["/dashboard", "/students", "/instructors", "/finance"];
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.includes(path)
  );

  // Redirect to login if not authenticated
  if (isProtectedPath && !session) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
`;

/**
 * ============================================================================
 * 9. SUPABASE CLIENT UTILITIES
 * ============================================================================
 */

export const SupabaseClientsExample = `
// lib/supabase/server.ts
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export function createClient() {
  return createServerComponentClient({ cookies });
}

// lib/supabase/client.ts
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function createClient() {
  return createClientComponentClient();
}

// lib/supabase/middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest, NextResponse } from "next/server";

export function createClient(req: NextRequest, res: NextResponse) {
  return createMiddlewareClient({ req, res });
}
`;

/**
 * ============================================================================
 * 10. ENVIRONMENT VARIABLES
 * ============================================================================
 */

export const EnvironmentVariablesExample = `
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=fr

# Feature Flags
NEXT_PUBLIC_ENABLE_REALTIME=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
`;

/**
 * ============================================================================
 * 11. MIGRATION CHECKLIST
 * ============================================================================
 */

export const MigrationChecklist = `
# Migration Checklist: React Router → Next.js 14 App Router

## Phase 1: Setup
- [ ] Install Next.js 14 dependencies
- [ ] Install Supabase Auth Helpers
- [ ] Configure next.config.js
- [ ] Setup environment variables
- [ ] Create app directory structure

## Phase 2: Layouts
- [ ] Create root layout (app/layout.tsx)
- [ ] Create locale layout (app/[locale]/layout.tsx)
- [ ] Create tenant layout (app/[locale]/[tenant]/layout.tsx)
- [ ] Migrate Sidebar component
- [ ] Migrate Header component
- [ ] Setup ErrorBoundary
- [ ] Setup Suspense boundaries

## Phase 3: Authentication
- [ ] Setup Supabase client utilities
- [ ] Create auth callback route
- [ ] Create middleware for protected routes
- [ ] Implement auth check in tenant layout
- [ ] Create login page
- [ ] Test authentication flow

## Phase 4: Pages Migration
- [ ] Migrate dashboard pages
- [ ] Migrate students pages
- [ ] Migrate instructors pages
- [ ] Migrate finance pages
- [ ] Migrate tenants pages
- [ ] Migrate GDPR pages

## Phase 5: Data Fetching
- [ ] Replace React Query with Server Components
- [ ] Implement ISR (Incremental Static Regeneration)
- [ ] Setup revalidation strategies
- [ ] Optimize data fetching patterns

## Phase 6: Routing
- [ ] Replace react-router Link with next/link
- [ ] Replace useNavigate with useRouter
- [ ] Replace useParams with params prop
- [ ] Replace useSearchParams with searchParams prop
- [ ] Update all navigation logic

## Phase 7: Testing
- [ ] Test all routes
- [ ] Test authentication flow
- [ ] Test RBAC permissions
- [ ] Test multi-tenant routing
- [ ] Test i18n switching
- [ ] Test theme switching

## Phase 8: Optimization
- [ ] Implement route groups
- [ ] Setup parallel routes
- [ ] Setup intercepting routes
- [ ] Optimize images with next/image
- [ ] Setup metadata for SEO
- [ ] Implement loading.tsx files
- [ ] Implement error.tsx files

## Phase 9: Deployment
- [ ] Configure Vercel deployment
- [ ] Setup environment variables
- [ ] Test production build
- [ ] Setup monitoring
- [ ] Setup analytics
`;

/**
 * ============================================================================
 * 12. KEY DIFFERENCES: React Router vs Next.js App Router
 * ============================================================================
 */

export const KeyDifferences = {
  routing: {
    reactRouter: "Client-side routing with BrowserRouter",
    nextjs: "File-system based routing with Server Components",
  },
  navigation: {
    reactRouter: "useNavigate() hook",
    nextjs: "useRouter() from next/navigation or Link component",
  },
  params: {
    reactRouter: "useParams() hook",
    nextjs: "params prop in Server Components",
  },
  searchParams: {
    reactRouter: "useSearchParams() hook",
    nextjs: "searchParams prop in Server Components",
  },
  dataFetching: {
    reactRouter: "React Query / useEffect",
    nextjs: "Server Components with async/await",
  },
  layouts: {
    reactRouter: "Outlet component",
    nextjs: "layout.tsx with children prop",
  },
  authentication: {
    reactRouter: "Client-side auth check",
    nextjs: "Server-side auth check in layout.tsx",
  },
  metadata: {
    reactRouter: "react-helmet",
    nextjs: "Metadata API or generateMetadata()",
  },
};

/**
 * ============================================================================
 * 13. BEST PRACTICES
 * ============================================================================
 */

export const BestPractices = `
# Next.js 14 App Router Best Practices

## 1. Server Components by Default
- Use Server Components for data fetching
- Only use "use client" when necessary (interactivity, hooks)
- Keep client components small and focused

## 2. Data Fetching
- Fetch data in Server Components
- Use parallel data fetching with Promise.all()
- Implement proper error handling
- Use revalidate for ISR

## 3. Layouts
- Keep layouts minimal and focused
- Use loading.tsx for loading states
- Use error.tsx for error boundaries
- Implement proper Suspense boundaries

## 4. Authentication
- Check auth in layout.tsx (server-side)
- Use middleware for route protection
- Implement proper session management
- Handle auth errors gracefully

## 5. Performance
- Use next/image for images
- Implement proper caching strategies
- Use route groups for organization
- Optimize bundle size with dynamic imports

## 6. SEO
- Implement proper metadata
- Use generateMetadata() for dynamic pages
- Add structured data (JSON-LD)
- Optimize for Core Web Vitals

## 7. Multi-tenant
- Validate tenant in layout.tsx
- Use tenant slug in all queries
- Implement proper tenant isolation
- Handle tenant switching

## 8. i18n
- Use [locale] dynamic segment
- Implement locale provider
- Handle locale switching
- Provide fallback translations

## 9. RBAC
- Check permissions in layout.tsx
- Implement role-based redirects
- Hide/show UI based on permissions
- Handle unauthorized access

## 10. Error Handling
- Use error.tsx for error boundaries
- Implement proper error messages
- Log errors to monitoring service
- Provide recovery actions
`;

/**
 * Export all examples
 */
export default {
  RootLayoutExample,
  LocaleLayoutExample,
  TenantLayoutExample,
  TenantRootPageExample,
  DashboardPageExample,
  InstructorDashboardPageExample,
  StudentDashboardPageExample,
  StudentsListPageExample,
  StudentDetailPageExample,
  AuthCallbackExample,
  MiddlewareExample,
  SupabaseClientsExample,
  EnvironmentVariablesExample,
  MigrationChecklist,
  KeyDifferences,
  BestPractices,
};
