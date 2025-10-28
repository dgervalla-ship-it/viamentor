/**
 * VIAMENTOR - Instructor Manager Page
 * Dashboard Responsable des Moniteurs avec ResponsivePageWrapper
 */

import {
  UsersIcon,
  CalendarIcon,
  TrendingUpIcon,
  ClipboardCheckIcon,
  UserCheckIcon,
  BarChart3Icon,
  PlusIcon,
  FilterIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResponsivePageWrapper } from "@/polymet/components/viamentor-responsive-page-wrapper";
import { InstructorManagerTeamSection } from "@/polymet/components/viamentor-instructor-manager-team-section";
import { InstructorManagerPerformanceSection } from "@/polymet/components/viamentor-instructor-manager-performance-section";
import { InstructorManagerRequestsSection } from "@/polymet/components/viamentor-instructor-manager-requests-section";
import {
  INSTRUCTOR_MANAGER_I18N,
  type InstructorManagerLocale,
} from "@/polymet/data/viamentor-instructor-manager-i18n";
import {
  MOCK_INSTRUCTOR_MANAGER_KPIS,
  MOCK_STUDENT_ASSIGNMENTS,
} from "@/polymet/data/viamentor-instructor-manager-data";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorManagerPageProps {
  locale?: InstructorManagerLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function InstructorManagerPage({
  locale = "fr",
}: InstructorManagerPageProps) {
  const t = INSTRUCTOR_MANAGER_I18N[locale];

  // Header Actions
  const headerActions = (
    <div className="flex gap-2">
      <Button variant="outline">
        <FilterIcon className="h-4 w-4 mr-2" />

        {t.actions.export}
      </Button>
      <Button>
        <PlusIcon className="h-4 w-4 mr-2" />

        {t.team.addInstructor}
      </Button>
    </div>
  );

  // KPIs Section
  const kpisSection = (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {t.kpis.totalInstructors}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {MOCK_INSTRUCTOR_MANAGER_KPIS.totalInstructors}
          </div>
          <UsersIcon className="h-4 w-4 text-muted-foreground mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {t.kpis.availableToday}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {MOCK_INSTRUCTOR_MANAGER_KPIS.availableToday}
          </div>
          <UserCheckIcon className="h-4 w-4 text-muted-foreground mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {t.kpis.lessonsToday}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {MOCK_INSTRUCTOR_MANAGER_KPIS.lessonsToday}
          </div>
          <CalendarIcon className="h-4 w-4 text-muted-foreground mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {t.kpis.avgSatisfaction}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {MOCK_INSTRUCTOR_MANAGER_KPIS.avgSatisfaction}/5
          </div>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {t.kpis.utilizationRate}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {MOCK_INSTRUCTOR_MANAGER_KPIS.utilizationRate}%
          </div>
          <Progress
            value={MOCK_INSTRUCTOR_MANAGER_KPIS.utilizationRate}
            className="mt-2"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {t.kpis.pendingRequests}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {MOCK_INSTRUCTOR_MANAGER_KPIS.pendingRequests}
          </div>
          <ClipboardCheckIcon className="h-4 w-4 text-muted-foreground mt-2" />
        </CardContent>
      </Card>
    </div>
  );

  // Assignments Section
  const assignmentsSection = (
    <Card>
      <CardHeader>
        <CardTitle>{t.assignments.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {t.assignments.subtitle}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {MOCK_STUDENT_ASSIGNMENTS.map((assignment) => (
            <div
              key={assignment.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">{assignment.studentName}</p>
                <p className="text-sm text-muted-foreground">
                  {assignment.instructorName} • {assignment.category} •{" "}
                  {assignment.lessonsCompleted} leçons
                </p>
              </div>

              <div className="flex items-center gap-4">
                {assignment.satisfaction && (
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      ⭐ {assignment.satisfaction}
                    </p>
                  </div>
                )}
                <Badge
                  variant={
                    assignment.status === "active"
                      ? "success"
                      : assignment.status === "completed"
                        ? "default"
                        : "warning"
                  }
                >
                  {t.assignments[assignment.status]}
                </Badge>
                <Button variant="outline" size="sm">
                  {t.actions.viewDetails}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <ResponsivePageWrapper
      title={t.pageTitle}
      description={t.pageDescription}
      actions={headerActions}
      sections={[
        {
          id: "kpis",
          label: "KPIs",
          icon: <BarChart3Icon className="h-4 w-4" />,

          badge: "6",
          content: kpisSection,
        },
        {
          id: "team",
          label: t.team.title,
          icon: <UsersIcon className="h-4 w-4" />,

          content: <InstructorManagerTeamSection locale={locale} />,
        },
        {
          id: "performance",
          label: t.performance.title,
          icon: <TrendingUpIcon className="h-4 w-4" />,

          content: <InstructorManagerPerformanceSection locale={locale} />,
        },
        {
          id: "requests",
          label: t.requests.title,
          icon: <ClipboardCheckIcon className="h-4 w-4" />,

          badge: MOCK_INSTRUCTOR_MANAGER_KPIS.pendingRequests.toString(),
          content: <InstructorManagerRequestsSection locale={locale} />,
        },
        {
          id: "assignments",
          label: t.assignments.title,
          icon: <UserCheckIcon className="h-4 w-4" />,

          content: assignmentsSection,
        },
      ]}
      mobileTabsEnabled={true}
      mobileTabsBreakpoint="lg"
      swipeEnabled={true}
      layout="stacked"
    />
  );
}

export default InstructorManagerPage;
