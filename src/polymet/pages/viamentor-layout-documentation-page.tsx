/**
 * VIAMENTOR - Layout Documentation Page
 * Documentation complète du Layout Principal avec Next.js 14 App Router
 */

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2Icon,
  CodeIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  ShieldCheckIcon,
  GlobeIcon,
  UsersIcon,
  ArrowRightIcon,
  CopyIcon,
  CheckIcon,
} from "lucide-react";

export function LayoutDocumentationPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b border-border bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-6 py-16">
          <div className="flex items-start gap-6">
            <div className="rounded-2xl bg-primary/10 p-4">
              <LayoutDashboardIcon className="h-12 w-12 text-primary" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-4xl font-bold">
                  Layout Principal Viamentor
                </h1>
                <p className="mt-2 text-xl text-muted-foreground">
                  Next.js 14 App Router • TypeScript • Supabase • Multi-tenant •
                  i18n
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-1">
                  <ShieldCheckIcon className="h-3 w-3" />
                  Supabase Auth
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <UsersIcon className="h-3 w-3" />
                  Multi-tenant
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <GlobeIcon className="h-3 w-3" />
                  i18n FR/DE/IT/EN
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <ShieldCheckIcon className="h-3 w-3" />
                  RBAC 15 rôles
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="structure">Structure</TabsTrigger>
            <TabsTrigger value="code">Code Examples</TabsTrigger>
            <TabsTrigger value="migration">Migration</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Architecture du Layout</CardTitle>
                <CardDescription>
                  Structure Sidebar + Header avec auth, tenant validation et
                  RBAC
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border bg-muted/50 p-6 font-mono text-sm">
                  <pre className="overflow-x-auto">
                    {`┌─────────────────────────────────────────────────────────────┐
│                         Header                              │
│  Breadcrumb | Search | Notifications | Messages | User     │
├──────────┬──────────────────────────────────────────────────┤
│          │                                                  │
│          │                                                  │
│ Sidebar  │              Main Content                       │
│  280px   │              (Scrollable)                       │
│          │                                                  │
│          │                                                  │
│          │                                                  │
└──────────┴──────────────────────────────────────────────────┘`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheckIcon className="h-5 w-5 text-primary" />
                    Authentification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2Icon className="mt-0.5 h-4 w-4 text-green-500" />

                    <div>
                      <p className="font-medium">Supabase Auth</p>
                      <p className="text-sm text-muted-foreground">
                        Session check server-side avec redirect automatique
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2Icon className="mt-0.5 h-4 w-4 text-green-500" />

                    <div>
                      <p className="font-medium">Mode Mock</p>
                      <p className="text-sm text-muted-foreground">
                        Développement sans connexion réelle (password:
                        viamentor2025)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2Icon className="mt-0.5 h-4 w-4 text-green-500" />

                    <div>
                      <p className="font-medium">Auto-login</p>
                      <p className="text-sm text-muted-foreground">
                        Connexion automatique pour développement rapide
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UsersIcon className="h-5 w-5 text-primary" />
                    Multi-tenant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2Icon className="mt-0.5 h-4 w-4 text-green-500" />

                    <div>
                      <p className="font-medium">Validation tenant</p>
                      <p className="text-sm text-muted-foreground">
                        Vérification existence et status du tenant
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2Icon className="mt-0.5 h-4 w-4 text-green-500" />

                    <div>
                      <p className="font-medium">Isolation données</p>
                      <p className="text-sm text-muted-foreground">
                        Toutes les queries filtrées par tenant_id
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2Icon className="mt-0.5 h-4 w-4 text-green-500" />

                    <div>
                      <p className="font-medium">Routing dynamique</p>
                      <p className="text-sm text-muted-foreground">
                        Pattern: /[locale]/[tenant]/[...path]
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GlobeIcon className="h-5 w-5 text-primary" />
                    Internationalisation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2Icon className="mt-0.5 h-4 w-4 text-green-500" />

                    <div>
                      <p className="font-medium">4 langues</p>
                      <p className="text-sm text-muted-foreground">
                        Français, Allemand, Italien, Anglais
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2Icon className="mt-0.5 h-4 w-4 text-green-500" />

                    <div>
                      <p className="font-medium">Formats localisés</p>
                      <p className="text-sm text-muted-foreground">
                        Nombres, devises, dates selon la locale
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2Icon className="mt-0.5 h-4 w-4 text-green-500" />

                    <div>
                      <p className="font-medium">Routing i18n</p>
                      <p className="text-sm text-muted-foreground">
                        URLs avec préfixe locale (/fr/*, /de/*)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheckIcon className="h-5 w-5 text-primary" />
                    RBAC Permissions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2Icon className="mt-0.5 h-4 w-4 text-green-500" />

                    <div>
                      <p className="font-medium">15 rôles hiérarchiques</p>
                      <p className="text-sm text-muted-foreground">
                        De platform_admin à student_trial
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2Icon className="mt-0.5 h-4 w-4 text-green-500" />

                    <div>
                      <p className="font-medium">Redirects automatiques</p>
                      <p className="text-sm text-muted-foreground">
                        Chaque rôle vers son dashboard approprié
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2Icon className="mt-0.5 h-4 w-4 text-green-500" />

                    <div>
                      <p className="font-medium">Navigation filtrée</p>
                      <p className="text-sm text-muted-foreground">
                        Sidebar affiche uniquement les items autorisés
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Structure Tab */}
          <TabsContent value="structure" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Structure App Router Next.js 14</CardTitle>
                <CardDescription>
                  Organisation des dossiers et fichiers pour multi-tenant + i18n
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border bg-muted/50 p-6 font-mono text-sm">
                  <pre className="overflow-x-auto">
                    {`app/
├── layout.tsx                              # Root layout global
├── page.tsx                                # Homepage redirect
├── login/page.tsx                          # Login (public)
├── [locale]/                               # i18n (fr, de, it, en)
│   ├── layout.tsx                          # Locale provider
│   └── [tenant]/                           # Multi-tenant
│       ├── layout.tsx                      # 🔥 MAIN LAYOUT
│       ├── page.tsx                        # Redirect role-based
│       ├── dashboard/page.tsx              # Dashboard École
│       ├── instructor-dashboard/page.tsx   # Dashboard Moniteur
│       ├── student-dashboard/page.tsx      # Dashboard Élève
│       ├── students/
│       │   ├── page.tsx                    # Liste élèves
│       │   └── [id]/page.tsx               # Détail élève
│       └── instructors/
│           ├── page.tsx                    # Liste moniteurs
│           └── [id]/page.tsx               # Détail moniteur`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Composants du Layout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "ViamentorMainLayout",
                      path: "layouts/viamentor-main-layout",
                      desc: "Layout principal avec auth check et tenant validation",
                    },
                    {
                      name: "Sidebar",
                      path: "components/viamentor-sidebar",
                      desc: "Sidebar 280px collapsible avec navigation RBAC",
                    },
                    {
                      name: "Header",
                      path: "components/viamentor-header",
                      desc: "Header avec breadcrumb, search, notifications",
                    },
                    {
                      name: "ErrorBoundary",
                      path: "components/viamentor-error-boundary",
                      desc: "Gestion des erreurs React avec fallback UI",
                    },
                    {
                      name: "LoadingPage",
                      path: "components/viamentor-loading-page",
                      desc: "Page de chargement avec spinner",
                    },
                  ].map((component, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 rounded-lg border border-border p-4"
                    >
                      <div className="rounded-lg bg-primary/10 p-2">
                        <CodeIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{component.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {component.desc}
                        </p>
                        <code className="mt-1 text-xs text-muted-foreground">
                          @/polymet/{component.path}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code Examples Tab */}
          <TabsContent value="code" className="space-y-6">
            {[
              {
                id: "tenant-layout",
                title: "Tenant Layout (Main Layout)",
                description: "app/[locale]/[tenant]/layout.tsx",
                code: `// app/[locale]/[tenant]/layout.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ViamentorMainLayout } from "@/polymet/layouts/viamentor-main-layout";

export default async function TenantLayout({
  children,
  params: { locale, tenant }
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

  // 4. RENDER LAYOUT
  return (
    <ViamentorMainLayout
      locale={locale}
      tenant={tenant}
      user={session.user}
      role={userRole.role}
    >
      {children}
    </ViamentorMainLayout>
  );
}`,
              },
              {
                id: "dashboard-page",
                title: "Dashboard Page",
                description: "app/[locale]/[tenant]/dashboard/page.tsx",
                code: `// app/[locale]/[tenant]/dashboard/page.tsx
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { DashboardSchoolPage } from "@/polymet/pages/viamentor-dashboard-school-page";

export default async function DashboardPage({
  params: { locale, tenant }
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
export const revalidate = 300;`,
              },
              {
                id: "middleware",
                title: "Middleware",
                description: "middleware.ts",
                code: `// middleware.ts
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
}`,
              },
            ].map((example) => (
              <Card key={example.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{example.title}</CardTitle>
                      <CardDescription>{example.description}</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyCode(example.code, example.id)}
                    >
                      {copiedCode === example.id ? (
                        <>
                          <CheckIcon className="mr-2 h-4 w-4" />
                          Copié
                        </>
                      ) : (
                        <>
                          <CopyIcon className="mr-2 h-4 w-4" />
                          Copier
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <pre className="overflow-x-auto text-xs">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Migration Tab */}
          <TabsContent value="migration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Checklist de Migration</CardTitle>
                <CardDescription>
                  Étapes pour migrer de React Router vers Next.js 14 App Router
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
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
                      phase: "Pages Migration",
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
                  ].map((phase, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                          {i + 1}
                        </div>
                        <h3 className="text-lg font-semibold">{phase.phase}</h3>
                      </div>
                      <div className="ml-11 space-y-2">
                        {phase.tasks.map((task, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-border"
                            />

                            <span className="text-sm">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Différences Clés</CardTitle>
                <CardDescription>
                  React Router vs Next.js App Router
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-lg border border-border">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-3 text-left font-semibold">Feature</th>
                        <th className="p-3 text-left font-semibold">
                          React Router
                        </th>
                        <th className="p-3 text-left font-semibold">
                          Next.js App Router
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        ["Navigation", "useNavigate()", "useRouter() / Link"],
                        ["Params", "useParams()", "params prop"],
                        [
                          "Search Params",
                          "useSearchParams()",
                          "searchParams prop",
                        ],

                        ["Data Fetching", "React Query", "Server Components"],
                        ["Layouts", "Outlet", "layout.tsx"],
                        ["Auth Check", "Client-side", "Server-side"],
                      ].map(([feature, before, after], i) => (
                        <tr key={i}>
                          <td className="p-3 font-medium">{feature}</td>
                          <td className="p-3 text-sm text-muted-foreground">
                            {before}
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">
                            {after}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuration Tab */}
          <TabsContent value="config" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Variables d'Environnement</CardTitle>
                <CardDescription>
                  Configuration .env.local pour développement et production
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">
                    Développement (.env.local)
                  </h4>
                  <div className="rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm">
                    <pre>
                      {`# Supabase Mock (pas besoin de vraies credentials)
NEXT_PUBLIC_SUPABASE_MOCK=true

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=fr
NEXT_PUBLIC_DEFAULT_TENANT=auto-ecole-geneve`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 font-semibold">
                    Production (.env.production)
                  </h4>
                  <div className="rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm">
                    <pre>
                      {`# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=https://viamentor.ch
NEXT_PUBLIC_DEFAULT_LOCALE=fr`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Utilisateurs de Test (Mode Mock)</CardTitle>
                <CardDescription>
                  Tous les utilisateurs utilisent le mot de passe: viamentor2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-hidden rounded-lg border border-border">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-3 text-left font-semibold">Email</th>
                        <th className="p-3 text-left font-semibold">Rôle</th>
                        <th className="p-3 text-left font-semibold">
                          Dashboard
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        ["admin@viamentor.ch", "platform_admin", "/tenants"],
                        ["school@viamentor.ch", "school_admin", "/dashboard"],
                        [
                          "instructor@viamentor.ch",
                          "instructor",
                          "/instructor-dashboard",
                        ],

                        [
                          "student@viamentor.ch",
                          "student",
                          "/student-dashboard",
                        ],
                      ].map(([email, role, dashboard], i) => (
                        <tr key={i}>
                          <td className="p-3 font-mono text-sm">{email}</td>
                          <td className="p-3">
                            <Badge variant="secondary">{role}</Badge>
                          </td>
                          <td className="p-3 font-mono text-sm text-muted-foreground">
                            {dashboard}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Card className="mt-12 border-primary/20 bg-primary/5">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-semibold">Documentation Complète</h3>
              <p className="text-sm text-muted-foreground">
                Consultez les fichiers de documentation pour plus de détails
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileTextIcon className="mr-2 h-4 w-4" />
                Next.js Guide
              </Button>
              <Button variant="outline" size="sm">
                <FileTextIcon className="mr-2 h-4 w-4" />
                Supabase Mock
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LayoutDocumentationPage;
