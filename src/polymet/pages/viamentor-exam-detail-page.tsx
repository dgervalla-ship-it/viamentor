/**
 * ============================================================================
 * VIAMENTOR - Exam Detail Page
 * Page détail examen avec résultats et documents
 * ============================================================================
 */

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  CarIcon,
  FileTextIcon,
  DownloadIcon,
  CheckCircle2Icon,
  XCircleIcon,
  AlertCircleIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockExams, type Exam } from "@/polymet/data/viamentor-exams-data";
import {
  examsLocales,
  type ExamsLocale,
} from "@/polymet/data/viamentor-exams-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ExamDetailPageProps {
  locale?: ExamsLocale;
}

// ============================================================================
// HEADER
// ============================================================================

function ExamHeader({ exam, locale }: { exam: Exam; locale: ExamsLocale }) {
  const getStatusBadge = () => {
    if (exam.status === "passed") {
      return (
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle2Icon className="h-3 w-3 mr-1" />

          {locale.status.passed}
        </Badge>
      );
    }
    if (exam.status === "failed") {
      return (
        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
          <XCircleIcon className="h-3 w-3 mr-1" />

          {locale.status.failed}
        </Badge>
      );
    }
    if (exam.status === "scheduled") {
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          <ClockIcon className="h-3 w-3 mr-1" />

          {locale.status.scheduled}
        </Badge>
      );
    }
    return <Badge variant="secondary">{locale.status[exam.status]}</Badge>;
  };

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" asChild>
        <Link to="/exams">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Retour à la liste
        </Link>
      </Button>

      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">
              {locale.detail.title}
            </h1>
            {getStatusBadge()}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>ID: {exam.id}</span>
            <span>•</span>
            <span>
              {locale.types[exam.type as keyof typeof locale.types]} - Cat.{" "}
              {exam.category}
            </span>
            <span>•</span>
            <span>Tentative #{exam.attemptNumber}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <EditIcon className="h-4 w-4 mr-2" />
            Modifier
          </Button>
          <Button variant="outline">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// INFORMATION TAB
// ============================================================================

function InformationTab({ exam, locale }: { exam: Exam; locale: ExamsLocale }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Élève */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />

            {locale.detail.student}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-sm text-muted-foreground">Nom</div>
            <div className="font-medium">{exam.studentName}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Email</div>
            <div className="font-medium">{exam.studentEmail}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Téléphone</div>
            <div className="font-medium">{exam.studentPhone}</div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/students/${exam.studentId}`}>Voir le profil</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Planification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />

            {locale.detail.scheduling}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-sm text-muted-foreground">Date</div>
            <div className="font-medium">
              {exam.scheduledDate.toLocaleDateString("fr-CH", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Heure</div>
            <div className="font-medium">{exam.scheduledTime}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Durée</div>
            <div className="font-medium">{exam.duration} minutes</div>
          </div>
        </CardContent>
      </Card>

      {/* Lieu */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5" />

            {locale.detail.location}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-sm text-muted-foreground">Centre</div>
            <div className="font-medium">{exam.location}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Adresse</div>
            <div className="font-medium">{exam.locationAddress}</div>
          </div>
        </CardContent>
      </Card>

      {/* Détails pratique */}
      {exam.type === "practical" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CarIcon className="h-5 w-5" />
              Détails pratique
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {exam.examinerName && (
              <div>
                <div className="text-sm text-muted-foreground">
                  {locale.detail.examiner}
                </div>
                <div className="font-medium">{exam.examinerName}</div>
              </div>
            )}
            {exam.instructorName && (
              <div>
                <div className="text-sm text-muted-foreground">
                  {locale.detail.instructor}
                </div>
                <div className="font-medium">{exam.instructorName}</div>
              </div>
            )}
            {exam.vehiclePlate && (
              <div>
                <div className="text-sm text-muted-foreground">
                  {locale.detail.vehicle}
                </div>
                <div className="font-medium">{exam.vehiclePlate}</div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Financier */}
      <Card>
        <CardHeader>
          <CardTitle>Informations financières</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="text-sm text-muted-foreground">Frais d'examen</div>
            <div className="font-medium">CHF {exam.fee.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Statut paiement</div>
            <Badge variant={exam.paid ? "default" : "destructive"}>
              {exam.paid ? "Payé" : "Non payé"}
            </Badge>
          </div>
          {exam.invoiceId && (
            <Button variant="outline" size="sm" asChild>
              <Link to={`/invoices/${exam.invoiceId}`}>Voir la facture</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================================
// RESULT TAB
// ============================================================================

function ResultTab({ exam, locale }: { exam: Exam; locale: ExamsLocale }) {
  if (!exam.result) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <AlertCircleIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

          <p className="text-muted-foreground">
            Aucun résultat disponible pour cet examen
          </p>
        </CardContent>
      </Card>
    );
  }

  const result = exam.result;

  return (
    <div className="space-y-6">
      {/* Score global */}
      <Card>
        <CardHeader>
          <CardTitle>{locale.result.score}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-foreground">
                {result.score}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {result.passed ? locale.result.passed : locale.result.failed}
              </div>
            </div>
            <div
              className={`p-4 rounded-full ${
                result.passed
                  ? "bg-green-100 dark:bg-green-900/30"
                  : "bg-red-100 dark:bg-red-900/30"
              }`}
            >
              {result.passed ? (
                <CheckCircle2Icon className="h-8 w-8 text-green-600" />
              ) : (
                <XCircleIcon className="h-8 w-8 text-red-600" />
              )}
            </div>
          </div>

          <Progress value={result.score} className="h-2" />

          {result.totalQuestions && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div>
                <div className="text-sm text-muted-foreground">
                  {locale.result.totalQuestions}
                </div>
                <div className="text-xl font-bold">{result.totalQuestions}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  {locale.result.correctAnswers}
                </div>
                <div className="text-xl font-bold text-green-600">
                  {result.correctAnswers}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">
                  {locale.result.passingScore}
                </div>
                <div className="text-xl font-bold">{result.passingScore}%</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Résultats par thème */}
      {result.themeResults && result.themeResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{locale.result.themeResults}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.themeResults.map((theme) => (
              <div key={theme.themeId} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{theme.themeName}</div>
                    <div className="text-sm text-muted-foreground">
                      {theme.correctAnswers}/{theme.questionsCount} correctes
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{theme.score}%</div>
                    <Badge
                      variant={theme.passed ? "default" : "destructive"}
                      className={
                        theme.passed
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : ""
                      }
                    >
                      {theme.passed ? "✓" : "✗"}
                    </Badge>
                  </div>
                </div>
                <Progress value={theme.score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Points forts/faibles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {result.strongPoints && result.strongPoints.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">
                {locale.result.strongPoints}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.strongPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2Icon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />

                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {result.weakPoints && result.weakPoints.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">
                {locale.result.weakPoints}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.weakPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircleIcon className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />

                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Notes examinateur */}
      {result.evaluatorNotes && (
        <Card>
          <CardHeader>
            <CardTitle>{locale.result.evaluatorNotes}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {result.evaluatorNotes}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ============================================================================
// DOCUMENTS TAB
// ============================================================================

function DocumentsTab({ exam, locale }: { exam: Exam; locale: ExamsLocale }) {
  if (exam.documents.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <FileTextIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

          <p className="text-muted-foreground">Aucun document disponible</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {exam.documents.map((doc) => (
        <Card key={doc.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <FileTextIcon className="h-8 w-8 text-muted-foreground" />

                <Badge variant="outline">
                  {locale.documents[doc.type as keyof typeof locale.documents]}
                </Badge>
              </div>

              <div>
                <div className="font-medium text-foreground">{doc.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {(doc.size / 1024).toFixed(0)} KB
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {doc.uploadedAt.toLocaleDateString("fr-CH")}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <DownloadIcon className="h-4 w-4 mr-2" />

                  {locale.documents.download}
                </Button>
                <Button variant="ghost" size="icon">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ExamDetailPage({
  locale = examsLocales.fr,
}: ExamDetailPageProps) {
  const { id } = useParams();
  const exam = mockExams.find((e) => e.id === id) || mockExams[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <ExamHeader exam={exam} locale={locale} />

        <Tabs defaultValue="information" className="space-y-6">
          <TabsList>
            <TabsTrigger value="information">
              {locale.detail.information}
            </TabsTrigger>
            <TabsTrigger value="result">{locale.detail.result}</TabsTrigger>
            <TabsTrigger value="documents">
              {locale.detail.documents}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="information">
            <InformationTab exam={exam} locale={locale} />
          </TabsContent>

          <TabsContent value="result">
            <ResultTab exam={exam} locale={locale} />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsTab exam={exam} locale={locale} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
