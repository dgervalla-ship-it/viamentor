/**
 * VIAMENTOR - Student Assignment History Page
 * Page historique des attributions d'un élève avec timeline et analytics
 */

import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftIcon } from "lucide-react";
import { AssignmentTimeline } from "@/polymet/components/viamentor-assignment-timeline";
import { AssignmentAnalytics } from "@/polymet/components/viamentor-assignment-analytics";
import {
  MOCK_ASSIGNMENT_HISTORY,
  MOCK_ASSIGNMENT_ANALYTICS,
  ASSIGNMENTS_TRANSLATIONS,
  type AssignmentLocale,
} from "@/polymet/data/viamentor-assignments-data";

// ============================================================================
// TYPES
// ============================================================================

interface StudentAssignmentHistoryPageProps {
  locale?: AssignmentLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function StudentAssignmentHistoryPage({
  locale = "fr",
}: StudentAssignmentHistoryPageProps) {
  const { studentId } = useParams<{ studentId: string }>();
  const t = ASSIGNMENTS_TRANSLATIONS[locale].assignmentHistory;

  // Mock student data
  const student = {
    id: studentId || "1",
    firstName: "Jean",
    lastName: "Dupont",
    avatar: "https://github.com/yusufhilmi.png",
  };

  // Filter history for this student
  const studentHistory = MOCK_ASSIGNMENT_HISTORY.filter(
    (event) => event.studentId === studentId
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link
              to="/students"
              className="hover:text-foreground transition-colors"
            >
              Élèves
            </Link>
            <span>/</span>
            <Link
              to={`/students/${studentId}`}
              className="hover:text-foreground transition-colors"
            >
              {student.firstName} {student.lastName}
            </Link>
            <span>/</span>
            <span className="text-foreground">{t.title}</span>
          </div>

          {/* Title & Student Info */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <img
                src={student.avatar}
                alt={`${student.firstName} ${student.lastName}`}
                className="w-16 h-16 rounded-full border-2 border-border"
              />

              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {t.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span>Élève:</span>
                    <span className="font-medium text-foreground">
                      {student.firstName} {student.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Événements:</span>
                    <span className="font-medium text-foreground">
                      {studentHistory.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Button asChild variant="outline">
              <Link to={`/students/${studentId}`}>
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Retour au profil
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="timeline" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="timeline">{t.timeline}</TabsTrigger>
              <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
            </TabsList>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.timeline}</CardTitle>
                  <CardDescription>
                    Chronologie complète des attributions et modifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AssignmentTimeline events={studentHistory} locale={locale} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <AssignmentAnalytics
                analytics={MOCK_ASSIGNMENT_ANALYTICS}
                locale={locale}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
