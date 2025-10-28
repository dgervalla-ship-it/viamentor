/**
 * VIAMENTOR - Student Exams Page
 * Page Mes Examens élève avec liste examens théoriques/pratiques, résultats, prochains examens
 *
 * @module pages/viamentor-student-exams-page
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  FileTextIcon,
  CarIcon,
  AlertCircleIcon,
  TrendingUpIcon,
  BookOpenIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface StudentExamsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface Exam {
  id: string;
  type: "theory" | "practical";
  category: string;
  date: Date;
  status: "scheduled" | "passed" | "failed" | "pending";
  score?: number;
  location: string;
  examiner?: string;
  attempts: number;
  notes?: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockExams: Exam[] = [
  {
    id: "1",
    type: "theory",
    category: "B",
    date: new Date("2024-11-15"),
    status: "scheduled",
    location: "Centre d'examen Genève",
    attempts: 1,
  },
  {
    id: "2",
    type: "theory",
    category: "B",
    date: new Date("2024-09-20"),
    status: "passed",
    score: 48,
    location: "Centre d'examen Genève",
    attempts: 1,
    notes: "Excellent résultat, félicitations !",
  },
  {
    id: "3",
    type: "practical",
    category: "B",
    date: new Date("2024-12-10"),
    status: "scheduled",
    location: "Auto-école Genève",
    examiner: "Expert Dupont",
    attempts: 1,
  },
];

const translations = {
  fr: {
    title: "Mes Examens",
    description: "Suivi de mes examens théoriques et pratiques",
    tabs: {
      upcoming: "À venir",
      history: "Historique",
      preparation: "Préparation",
    },
    types: {
      theory: "Théorique",
      practical: "Pratique",
    },
    status: {
      scheduled: "Planifié",
      passed: "Réussi",
      failed: "Échoué",
      pending: "En attente",
    },
    fields: {
      date: "Date",
      location: "Lieu",
      examiner: "Expert",
      score: "Score",
      attempts: "Tentative",
      notes: "Notes",
    },
    actions: {
      reschedule: "Reprogrammer",
      cancel: "Annuler",
      viewDetails: "Voir détails",
      bookExam: "Réserver un examen",
    },
    preparation: {
      title: "Préparation aux examens",
      theoryTests: "Tests théoriques",
      practicalTips: "Conseils pratiques",
      requirements: "Prérequis",
    },
    stats: {
      totalExams: "Examens passés",
      passRate: "Taux de réussite",
      nextExam: "Prochain examen",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function StudentExamsPage({ locale = "fr" }: StudentExamsPageProps) {
  const t = translations[locale];
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingExams = mockExams.filter((e) => e.status === "scheduled");
  const pastExams = mockExams.filter(
    (e) => e.status === "passed" || e.status === "failed"
  );

  const getStatusIcon = (status: Exam["status"]) => {
    switch (status) {
      case "passed":
        return <CheckCircle2Icon className="h-5 w-5 text-green-600" />;

      case "failed":
        return <XCircleIcon className="h-5 w-5 text-red-600" />;

      case "scheduled":
        return <ClockIcon className="h-5 w-5 text-blue-600" />;

      default:
        return <AlertCircleIcon className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: Exam["status"]) => {
    const variants: Record<
      Exam["status"],
      "default" | "secondary" | "destructive" | "outline"
    > = {
      scheduled: "default",
      passed: "secondary",
      failed: "destructive",
      pending: "outline",
    };

    return (
      <Badge variant={variants[status]}>
        {t.status[status as keyof typeof t.status]}
      </Badge>
    );
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
        <p className="text-muted-foreground">{t.description}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FileTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t.stats.totalExams}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {pastExams.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <TrendingUpIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t.stats.passRate}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {Math.round(
                  (pastExams.filter((e) => e.status === "passed").length /
                    pastExams.length) *
                    100
                )}
                %
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t.stats.nextExam}
              </p>
              <p className="text-lg font-semibold text-foreground">
                {upcomingExams.length > 0
                  ? new Date(upcomingExams[0].date).toLocaleDateString(locale)
                  : "-"}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">{t.tabs.upcoming}</TabsTrigger>
          <TabsTrigger value="history">{t.tabs.history}</TabsTrigger>
          <TabsTrigger value="preparation">{t.tabs.preparation}</TabsTrigger>
        </TabsList>

        {/* Upcoming Exams */}
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingExams.length === 0 ? (
            <Card className="p-12">
              <div className="flex flex-col items-center gap-4 text-center">
                <CalendarIcon className="h-12 w-12 text-muted-foreground" />

                <div>
                  <p className="font-semibold text-foreground">
                    Aucun examen planifié
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Réservez votre prochain examen
                  </p>
                </div>
                <Button>{t.actions.bookExam}</Button>
              </div>
            </Card>
          ) : (
            upcomingExams.map((exam) => (
              <Card key={exam.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                      {exam.type === "theory" ? (
                        <FileTextIcon className="h-6 w-6 text-foreground" />
                      ) : (
                        <CarIcon className="h-6 w-6 text-foreground" />
                      )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">
                            Examen {t.types[exam.type]} - Catégorie{" "}
                            {exam.category}
                          </h3>
                          {getStatusBadge(exam.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Tentative n°{exam.attempts}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            {t.fields.date}
                          </p>
                          <p className="font-medium text-foreground">
                            {new Date(exam.date).toLocaleDateString(locale, {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            {t.fields.location}
                          </p>
                          <p className="font-medium text-foreground">
                            {exam.location}
                          </p>
                        </div>
                        {exam.examiner && (
                          <div>
                            <p className="text-muted-foreground">
                              {t.fields.examiner}
                            </p>
                            <p className="font-medium text-foreground">
                              {exam.examiner}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      {t.actions.reschedule}
                    </Button>
                    <Button variant="ghost" size="sm">
                      {t.actions.cancel}
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="space-y-4">
          {pastExams.map((exam) => (
            <Card key={exam.id} className="p-6">
              <div className="flex items-start gap-4">
                {getStatusIcon(exam.status)}
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        Examen {t.types[exam.type]} - Catégorie {exam.category}
                      </h3>
                      {getStatusBadge(exam.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(exam.date).toLocaleDateString(locale)} •
                      Tentative n°{exam.attempts}
                    </p>
                  </div>

                  {exam.score !== undefined && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t.fields.score}
                      </p>
                      <p className="text-lg font-semibold text-foreground">
                        {exam.score}/50 points
                      </p>
                    </div>
                  )}

                  {exam.notes && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-foreground">{exam.notes}</p>
                    </div>
                  )}
                </div>

                <Button variant="outline" size="sm">
                  {t.actions.viewDetails}
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        {/* Preparation */}
        <TabsContent value="preparation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <BookOpenIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    {t.preparation.theoryTests}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Entraînez-vous avec des tests théoriques en ligne
                  </p>
                  <Button size="sm">Commencer un test</Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <CarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    {t.preparation.practicalTips}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Conseils pour réussir l'examen pratique
                  </p>
                  <Button size="sm" variant="outline">
                    Voir les conseils
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">
              {t.preparation.requirements}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2Icon className="h-5 w-5 text-green-600 mt-0.5" />

                <div>
                  <p className="font-medium text-foreground">
                    Cours théoriques complétés
                  </p>
                  <p className="text-sm text-muted-foreground">
                    8/8 heures validées
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2Icon className="h-5 w-5 text-green-600 mt-0.5" />

                <div>
                  <p className="font-medium text-foreground">
                    Leçons pratiques minimum
                  </p>
                  <p className="text-sm text-muted-foreground">
                    25/20 heures effectuées
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircleIcon className="h-5 w-5 text-orange-600 mt-0.5" />

                <div>
                  <p className="font-medium text-foreground">
                    Cours de sensibilisation
                  </p>
                  <p className="text-sm text-muted-foreground">
                    À planifier avant l'examen pratique
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
