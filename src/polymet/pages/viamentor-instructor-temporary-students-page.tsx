/**
 * VIAMENTOR - Instructor Temporary Students Page
 * Page moniteur élèves avec accès temporaire
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  InfoIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  BookOpenIcon,
  AlertTriangleIcon,
  ExternalLinkIcon,
} from "lucide-react";
import {
  MOCK_TEMPORARY_STUDENTS,
  ASSIGNMENTS_TRANSLATIONS,
  type AssignmentLocale,
  type TemporaryStudent,
} from "@/polymet/data/viamentor-assignments-data";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorTemporaryStudentsPageProps {
  locale?: AssignmentLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function InstructorTemporaryStudentsPage({
  locale = "fr",
}: InstructorTemporaryStudentsPageProps) {
  const t = ASSIGNMENTS_TRANSLATIONS[locale].temporaryAccess;

  // State
  const [temporaryStudents] = useState<TemporaryStudent[]>(
    MOCK_TEMPORARY_STUDENTS
  );

  // Handlers
  const handleBookLesson = (studentId: string) => {
    console.log("Book lesson for student:", studentId);
  };

  const handleRequestExtension = (studentId: string) => {
    console.log("Request extension for student:", studentId);
  };

  const handleViewPlanning = (studentId: string) => {
    console.log("View planning for student:", studentId);
  };

  // Calculate days remaining
  const getDaysRemaining = (endDate: string): number => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Get initials
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {t.temporaryStudents}
              </h1>
              <p className="text-sm text-muted-foreground">
                {temporaryStudents.length} {t.temporaryStudents.toLowerCase()}
              </p>
            </div>
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
              {t.temporaryStudentsInfo}
            </AlertDescription>
          </Alert>

          {/* Temporary Students Table */}
          {temporaryStudents.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>{t.temporaryStudents}</CardTitle>
                <CardDescription>
                  Liste des élèves avec autorisation temporaire
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Élève</TableHead>
                        <TableHead>Moniteur principal</TableHead>
                        <TableHead>Période</TableHead>
                        <TableHead>Leçons</TableHead>
                        <TableHead>Catégories</TableHead>
                        <TableHead>Raison</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {temporaryStudents.map((student) => {
                        const daysRemaining = getDaysRemaining(student.endDate);
                        const progress =
                          ((student.maxLessons - student.remainingLessons) /
                            student.maxLessons) *
                          100;

                        return (
                          <TableRow key={student.id}>
                            {/* Élève */}
                            <TableCell>
                              <Link
                                to={`/students/${student.studentId}`}
                                className="flex items-center gap-3 hover:underline"
                              >
                                <Avatar className="w-10 h-10">
                                  <AvatarImage
                                    src={student.studentAvatar}
                                    alt={student.studentName}
                                  />

                                  <AvatarFallback>
                                    {getInitials(student.studentName)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-foreground">
                                    {student.studentName}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    ID: {student.studentId}
                                  </div>
                                </div>
                              </Link>
                            </TableCell>

                            {/* Moniteur principal */}
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage
                                    src={student.primaryInstructorAvatar}
                                    alt={student.primaryInstructorName}
                                  />

                                  <AvatarFallback>
                                    {getInitials(student.primaryInstructorName)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-foreground">
                                  {student.primaryInstructorName}
                                </span>
                              </div>
                            </TableCell>

                            {/* Période */}
                            <TableCell>
                              <div className="space-y-1">
                                <div className="text-sm text-foreground">
                                  {new Date(
                                    student.startDate
                                  ).toLocaleDateString(locale)}{" "}
                                  -{" "}
                                  {new Date(student.endDate).toLocaleDateString(
                                    locale
                                  )}
                                </div>
                                <Badge
                                  variant={
                                    daysRemaining <= 3
                                      ? "destructive"
                                      : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  <ClockIcon className="w-3 h-3 mr-1" />

                                  {t.expiresIn.replace(
                                    "{days}",
                                    String(daysRemaining)
                                  )}
                                </Badge>
                              </div>
                            </TableCell>

                            {/* Leçons */}
                            <TableCell>
                              <div className="space-y-2 min-w-[120px]">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">
                                    {t.remainingLessons}:
                                  </span>
                                  <span className="font-medium text-foreground">
                                    {student.remainingLessons}/
                                    {student.maxLessons}
                                  </span>
                                </div>
                                <Progress value={progress} className="h-2" />
                              </div>
                            </TableCell>

                            {/* Catégories */}
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {student.authorizedCategories.map((cat) => (
                                  <Badge key={cat} variant="outline">
                                    {cat}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>

                            {/* Raison */}
                            <TableCell>
                              <div className="max-w-[200px]">
                                <p className="text-sm text-muted-foreground italic line-clamp-2">
                                  {student.reason}
                                </p>
                              </div>
                            </TableCell>

                            {/* Actions */}
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                {student.allowDirectBooking && (
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleBookLesson(student.studentId)
                                    }
                                  >
                                    <CalendarIcon className="w-4 h-4 mr-1" />

                                    {t.bookLesson}
                                  </Button>
                                )}

                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleViewPlanning(student.studentId)
                                  }
                                >
                                  <ExternalLinkIcon className="w-4 h-4 mr-1" />

                                  {t.viewPlanning}
                                </Button>

                                {daysRemaining <= 3 && (
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() =>
                                      handleRequestExtension(student.studentId)
                                    }
                                  >
                                    <ClockIcon className="w-4 h-4 mr-1" />

                                    {t.requestExtension}
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Empty State */
            <Card>
              <CardContent className="py-12">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <UserIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Aucun élève temporaire
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Vous n'avez actuellement aucun élève avec accès
                      temporaire. Les élèves temporaires apparaîtront ici
                      lorsqu'une école vous autorisera à donner des leçons à
                      leurs élèves.
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
