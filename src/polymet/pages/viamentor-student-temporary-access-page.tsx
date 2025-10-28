/**
 * VIAMENTOR - Student Temporary Access Page
 * Page autorisation accès temporaire moniteur pour un élève
 */

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeftIcon,
  InfoIcon,
  CheckCircleIcon,
  UserPlusIcon,
  CalendarIcon,
  ClockIcon,
  BookOpenIcon,
  CarIcon,
  AlertTriangleIcon,
} from "lucide-react";
import { TemporaryAccessForm } from "@/polymet/components/viamentor-temporary-access-form";
import { TemporaryAccessList } from "@/polymet/components/viamentor-temporary-access-list";
import {
  MOCK_TEMPORARY_ACCESS,
  ASSIGNMENTS_TRANSLATIONS,
  type AssignmentLocale,
  type TemporaryAccess,
} from "@/polymet/data/viamentor-assignments-data";

// ============================================================================
// TYPES
// ============================================================================

interface StudentTemporaryAccessPageProps {
  locale?: AssignmentLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function StudentTemporaryAccessPage({
  locale = "fr",
}: StudentTemporaryAccessPageProps) {
  const { studentId } = useParams<{ studentId: string }>();
  const t = ASSIGNMENTS_TRANSLATIONS[locale].temporaryAccess;

  // State
  const [showForm, setShowForm] = useState(false);
  const [temporaryAccess, setTemporaryAccess] = useState<TemporaryAccess[]>(
    MOCK_TEMPORARY_ACCESS.filter((access) => access.studentId === studentId)
  );

  // Mock student data
  const student = {
    id: studentId || "1",
    firstName: "Jean",
    lastName: "Dupont",
    avatar: "https://github.com/yusufhilmi.png",
    primaryInstructor: {
      id: "1",
      firstName: "Marc",
      lastName: "Martin",
      avatar: "https://github.com/kdrnp.png",
    },
    categories: ["B"],
  };

  // Handlers
  const handleCreateAccess = (data: any) => {
    console.log("Create temporary access:", data);
    setShowForm(false);
    // Refresh list
  };

  const handleExtend = (accessId: string) => {
    console.log("Extend access:", accessId);
  };

  const handleRevoke = (accessId: string) => {
    console.log("Revoke access:", accessId);
  };

  const handleViewHistory = (accessId: string) => {
    console.log("View history:", accessId);
  };

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
              {t.breadcrumb.students}
            </Link>
            <span>/</span>
            <Link
              to={`/students/${studentId}`}
              className="hover:text-foreground transition-colors"
            >
              {student.firstName} {student.lastName}
            </Link>
            <span>/</span>
            <span className="text-foreground">
              {t.breadcrumb.temporaryAccess}
            </span>
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
                    <span>{t.student}:</span>
                    <span className="font-medium text-foreground">
                      {student.firstName} {student.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{t.primaryInstructor}:</span>
                    <div className="flex items-center gap-2">
                      <img
                        src={student.primaryInstructor.avatar}
                        alt={`${student.primaryInstructor.firstName} ${student.primaryInstructor.lastName}`}
                        className="w-5 h-5 rounded-full"
                      />

                      <span className="font-medium text-foreground">
                        {student.primaryInstructor.firstName}{" "}
                        {student.primaryInstructor.lastName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button asChild variant="outline">
              <Link to={`/students/${studentId}`}>
                <ArrowLeftIcon className="w-4 h-4 mr-2" />

                {t.backToStudent}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Info Alert */}
          <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
            <InfoIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />

            <AlertDescription className="text-blue-900 dark:text-blue-100">
              {t.infoMessage}
            </AlertDescription>
          </Alert>

          {/* Use Cases Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-primary" />

                {t.useCases.title}
              </CardTitle>
              <CardDescription>{t.useCases.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {t.useCases.examples.map((example, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />

                    <span className="text-sm text-muted-foreground">
                      {example}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Form or Button */}
          {showForm ? (
            <TemporaryAccessForm
              studentId={student.id}
              locale={locale}
              onSubmit={handleCreateAccess}
              onCancel={() => setShowForm(false)}
            />
          ) : (
            <div className="flex justify-center">
              <Button size="lg" onClick={() => setShowForm(true)}>
                <UserPlusIcon className="w-5 h-5 mr-2" />

                {t.authorizeInstructor}
              </Button>
            </div>
          )}

          {/* Active Temporary Access List */}
          {temporaryAccess.length > 0 && (
            <TemporaryAccessList
              temporaryAccess={temporaryAccess}
              locale={locale}
              onExtend={handleExtend}
              onRevoke={handleRevoke}
              onViewHistory={handleViewHistory}
            />
          )}

          {/* Empty State */}
          {temporaryAccess.length === 0 && !showForm && (
            <Card>
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <UserPlusIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {t.emptyState.title}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      {t.emptyState.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
