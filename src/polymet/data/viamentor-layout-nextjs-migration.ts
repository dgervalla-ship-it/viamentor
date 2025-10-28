/**
 * VIAMENTOR - Migration Next.js 14 App Router
 * Guide rapide pour migrer le Layout Principal vers Next.js 14
 */

/**
 * ============================================================================
 * STRUCTURE APP ROUTER
 * ============================================================================
 */

export const appStructure = `
app/
├── layout.tsx                              # Root layout global
├── page.tsx                                # Homepage redirect
├── login/page.tsx                          # Login (public)
├── [locale]/                               # i18n (fr, de, it, en)
│   ├── layout.tsx                          # Locale provider
│   └── [tenant]/                           # Multi-tenant
│       ├── layout.tsx                      # 🔥 MAIN LAYOUT (Sidebar + Header)
│       ├── page.tsx                        # Redirect role-based
│       ├── dashboard/page.tsx              # Dashboard École
│       ├── instructor-dashboard/page.tsx   # Dashboard Moniteur
│       ├── student-dashboard/page.tsx      # Dashboard Élève
│       ├── students/
│       │   ├── page.tsx                    # Liste élèves
│       │   └── [id]/page.tsx               # Détail élève
│       └── instructors/
│           ├── page.tsx                    # Liste moniteurs
│           └── [id]/page.tsx               # Détail moniteur
`;

/**
 * ============================================================================
 * TENANT LAYOUT (Main Layout)
 * ============================================================================
 */

export const tenantLayoutCode = `
// app/[locale]/[tenant]/layout.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ViaMenutorMainLayout } from "@/polymet/layouts/viamentor-main-layout";

export default async function TenantLayout({
  children,
  params: { locale, tenant }
}: {
  children: React.ReactNode;
  params: { locale: string; tenant: string };
}) {
  // 1. AUTH CHECK
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect(\`/login?redirect=/\${locale}/\${tenant}\`);
  }

  // 2. TENANT VALIDATION
  const { data: tenantData } = await supabase
    .from("tenants")
    .select("*")
    .eq("slug", tenant)
    .single();

  if (!tenantData) redirect("/404");

  // 3. RBAC CHECK
  const { data: userRole } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", session.user.id)
    .eq("tenant_id", tenantData.id)
    .single();

  if (!userRole) redirect(\`/\${locale}/unauthorized\`);

  // 4. RENDER LAYOUT
  return (
    <ViaMenutorMainLayout
      locale={locale}
      tenant={tenant}
      user={{
        id: session.user.id,
        email: session.user.email!,
        name: session.user.user_metadata.name,
        role: userRole.role,
      }}
    >
      {children}
    </ViaMenutorMainLayout>
  );
}
`;

/**
 * ============================================================================
 * DASHBOARD PAGE
 * ============================================================================
 */

export const dashboardPageCode = `
// app/[locale]/[tenant]/dashboard/page.tsx
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { DashboardSchoolPage } from "@/polymet/pages/viamentor-dashboard-school-page";

export default async function DashboardPage({
  params: { locale, tenant }
}: {
  params: { locale: string; tenant: string };
}) {
  const supabase = createServerComponentClient({ cookies });

  // Fetch data server-side
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

/**
 * ============================================================================
 * MIDDLEWARE
 * ============================================================================
 */

export const middlewareCode = `
// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();

  // Protected routes
  const protectedPaths = ["/dashboard", "/students", "/instructors"];
  const isProtected = protectedPaths.some(path => 
    req.nextUrl.pathname.includes(path)
  );

  if (isProtected && !session) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}
`;

/**
 * ============================================================================
 * MIGRATION CHECKLIST
 * ============================================================================
 */

export const migrationChecklist = [
  {
    phase: "Setup",
    tasks: [
      "Install Next.js 14 + Supabase Auth Helpers",
      "Create app directory structure",
      "Configure environment variables",
    ],
  },
  {
    phase: "Layouts",
    tasks: [
      "Create root layout (app/layout.tsx)",
      "Create locale layout (app/[locale]/layout.tsx)",
      "Create tenant layout (app/[locale]/[tenant]/layout.tsx)",
      "Setup ErrorBoundary + Suspense",
    ],
  },
  {
    phase: "Authentication",
    tasks: [
      "Setup Supabase client utilities",
      "Create auth callback route",
      "Create middleware for protected routes",
      "Test authentication flow",
    ],
  },
  {
    phase: "Pages",
    tasks: [
      "Migrate dashboard pages",
      "Migrate students pages",
      "Migrate instructors pages",
      "Replace React Router with Next.js routing",
    ],
  },
  {
    phase: "Testing",
    tasks: [
      "Test all routes",
      "Test authentication + RBAC",
      "Test multi-tenant routing",
      "Test i18n switching",
    ],
  },
];

/**
 * ============================================================================
 * KEY DIFFERENCES
 * ============================================================================
 */

export const keyDifferences = {
  navigation: {
    before: "useNavigate() from react-router-dom",
    after: "useRouter() from next/navigation",
  },
  params: {
    before: "useParams() hook",
    after: "params prop in Server Components",
  },
  dataFetching: {
    before: "React Query / useEffect",
    after: "Server Components with async/await",
  },
  layouts: {
    before: "Outlet component",
    after: "layout.tsx with children prop",
  },
};

export default {
  appStructure,
  tenantLayoutCode,
  dashboardPageCode,
  middlewareCode,
  migrationChecklist,
  keyDifferences,
};
