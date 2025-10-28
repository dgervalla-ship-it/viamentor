/**
 * VIAMENTOR Complete Demo Page
 * Architecture modulaire avec composants réutilisables
 *
 * Démonstration complète de tous les systèmes intégrés :
 * - TanStack Query (data fetching)
 * - React Hook Form + Zod (formulaires)
 * - Zustand (state management)
 * - RBAC (permissions)
 * - i18n (internationalisation)
 * - Theme (personnalisation)
 */

import { ThemeProvider } from "@/polymet/components/viamentor-theme-provider";
import { LocaleProvider } from "@/polymet/components/viamentor-locale-provider";
import { QueryProvider } from "@/polymet/data/viamentor-query-provider";
import { DemoHeader } from "@/polymet/components/viamentor-demo-header";
import { DemoSection } from "@/polymet/components/viamentor-demo-section";
import { DemoFeatureList } from "@/polymet/components/viamentor-demo-feature-list";
import { ThemeControls } from "@/polymet/components/viamentor-theme-controls";
import { LocaleControls } from "@/polymet/components/viamentor-locale-controls";
import { RoleSelector } from "@/polymet/components/viamentor-role-selector";
import { UserForm } from "@/polymet/components/viamentor-user-form";
import { LoginForm } from "@/polymet/components/viamentor-login-form";
import {
  useStudents,
  useCreateStudent,
} from "@/polymet/data/viamentor-query-hooks";
import { useUserStore } from "@/polymet/data/viamentor-user-store";
import { UserFormData } from "@/polymet/data/viamentor-validation-schemas";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SparklesIcon,
  ShieldIcon,
  DatabaseIcon,
  FileTextIcon,
} from "lucide-react";

// ============================================================================
// STUDENTS SECTION - TanStack Query Demo
// ============================================================================

function StudentsSection() {
  const studentsQuery = useStudents();
  const createStudent = useCreateStudent();

  return (
    <DemoSection
      title="TanStack Query - Students"
      description="Data fetching avec cache automatique"
      icon={DatabaseIcon}
    >
      <div className="space-y-4">
        {studentsQuery.isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-16 w-full bg-muted" />

            <Skeleton className="h-16 w-full bg-muted" />
          </div>
        ) : studentsQuery.isError ? (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md text-sm">
            Erreur : {studentsQuery.error.message}
          </div>
        ) : (
          <div className="space-y-2">
            {studentsQuery.data?.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-3 bg-muted rounded-md"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={student.avatar}
                    alt={student.firstName}
                    className="h-10 w-10 rounded-full"
                  />

                  <div>
                    <p className="font-medium text-sm">
                      {student.firstName} {student.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {student.studentNumber}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">{student.licenseCategory}</Badge>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {studentsQuery.isFetching ? "Fetching..." : "Cached"}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {studentsQuery.data?.length || 0} étudiants
          </Badge>
        </div>
      </div>
    </DemoSection>
  );
}

// ============================================================================
// FORMS SECTION - React Hook Form + Zod Demo
// ============================================================================

function FormsSection() {
  const handleUserSubmit = async (data: UserFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("User created:", data);
  };

  const handleLoginSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Login:", data);
  };

  return (
    <DemoSection
      title="React Hook Form + Zod"
      description="Validation en temps réel avec TypeScript strict"
      icon={FileTextIcon}
    >
      <Tabs defaultValue="user">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">User Form</TabsTrigger>
          <TabsTrigger value="login">Login Form</TabsTrigger>
        </TabsList>
        <TabsContent value="user" className="mt-4">
          <UserForm mode="create" onSubmit={handleUserSubmit} />
        </TabsContent>
        <TabsContent value="login" className="mt-4">
          <LoginForm onSubmit={handleLoginSubmit} />
        </TabsContent>
      </Tabs>
    </DemoSection>
  );
}

// ============================================================================
// SYSTEMS SECTION - Overview of integrated systems
// ============================================================================

function SystemsSection() {
  const systemFeatures = [
    { title: "TanStack Query v5 (cache + mutations)", badge: "✓" },
    { title: "React Hook Form + Zod", badge: "✓" },
    { title: "Zustand (theme, locale, user)", badge: "✓" },
    { title: "RBAC 15 rôles hiérarchiques", badge: "✓" },
    { title: "i18n FR/DE/IT/EN", badge: "✓" },
    { title: "Tests Vitest + Playwright", badge: "✓" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ThemeControls />

      <LocaleControls />

      <RoleSelector />

      <DemoSection title="Systèmes Intégrés">
        <DemoFeatureList features={systemFeatures} variant="compact" />
      </DemoSection>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ViaMenutorCompleteDemo() {
  const { isAuthenticated, user } = useUserStore();

  const userActions =
    isAuthenticated && user ? (
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.firstName}
          className="h-10 w-10 rounded-full"
        />

        <div>
          <p className="text-sm font-medium">
            {user.firstName} {user.lastName}
          </p>
          <Badge variant="outline" className="text-xs">
            {user.role.replace(/_/g, " ")}
          </Badge>
        </div>
      </div>
    ) : null;

  return (
    <ThemeProvider initialTheme="light">
      <LocaleProvider initialLocale="fr">
        <QueryProvider>
          <div className="min-h-screen bg-background">
            <DemoHeader
              title="VIAMENTOR System"
              description="Démonstration complète - Stack technique 100%"
              icon={SparklesIcon}
              badges={[
                { label: "Clean Code", variant: "secondary" },
                { label: "Modulaire", variant: "outline" },
              ]}
              actions={userActions}
            />

            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Tabs defaultValue="systems" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="systems">
                    <ShieldIcon className="h-4 w-4 mr-2" />
                    Systèmes
                  </TabsTrigger>
                  <TabsTrigger value="data">
                    <DatabaseIcon className="h-4 w-4 mr-2" />
                    Data Fetching
                  </TabsTrigger>
                  <TabsTrigger value="forms">
                    <FileTextIcon className="h-4 w-4 mr-2" />
                    Formulaires
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="systems" className="space-y-6">
                  <SystemsSection />
                </TabsContent>

                <TabsContent value="data" className="space-y-6">
                  <StudentsSection />
                </TabsContent>

                <TabsContent value="forms" className="space-y-6">
                  <FormsSection />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </QueryProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
