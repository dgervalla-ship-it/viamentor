/**
 * VIAMENTOR - Instructor Performance Page
 * Page statistiques performance moniteur
 */

"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  AwardIcon,
  UsersIcon,
  ClockIcon,
  CheckCircle2Icon,
  XCircleIcon,
  StarIcon,
  TargetIcon,
  DownloadIcon,
  CalendarIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorPerformancePageProps {
  locale?: "fr" | "de" | "it" | "en";
}

type TimePeriod = "week" | "month" | "quarter" | "year";

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    breadcrumb: {
      instructor: "Moniteur",
      performance: "Mes Statistiques",
    },
    title: "Mes Statistiques",
    description: "Suivez votre performance et votre progression",
    periods: {
      week: "Cette semaine",
      month: "Ce mois",
      quarter: "Ce trimestre",
      year: "Cette année",
    },
    tabs: {
      overview: "Vue d'ensemble",
      students: "Élèves",
      lessons: "Leçons",
      exams: "Examens",
    },
    kpis: {
      totalLessons: "Leçons données",
      totalHours: "Heures enseignées",
      activeStudents: "Élèves actifs",
      successRate: "Taux de réussite",
      avgRating: "Note moyenne",
      completionRate: "Taux de complétion",
    },
    charts: {
      lessonsEvolution: "Évolution des leçons",
      studentProgress: "Progression des élèves",
      examResults: "Résultats aux examens",
      timeDistribution: "Répartition du temps",
    },
    actions: {
      export: "Exporter",
      compare: "Comparer",
      details: "Voir détails",
    },
    comparison: {
      title: "Comparaison",
      vsAverage: "vs Moyenne école",
      vsLastPeriod: "vs Période précédente",
    },
    students: {
      total: "Total élèves",
      active: "Actifs",
      completed: "Terminés",
      avgProgress: "Progression moyenne",
    },
    lessons: {
      practical: "Pratiques",
      theory: "Théoriques",
      cancelled: "Annulées",
      avgDuration: "Durée moyenne",
    },
    exams: {
      passed: "Réussis",
      failed: "Échoués",
      pending: "En attente",
      successRate: "Taux de réussite",
    },
  },
  de: {
    breadcrumb: {
      instructor: "Fahrlehrer",
      performance: "Meine Statistiken",
    },
    title: "Meine Statistiken",
    description: "Verfolgen Sie Ihre Leistung und Ihren Fortschritt",
    periods: {
      week: "Diese Woche",
      month: "Dieser Monat",
      quarter: "Dieses Quartal",
      year: "Dieses Jahr",
    },
    tabs: {
      overview: "Übersicht",
      students: "Schüler",
      lessons: "Lektionen",
      exams: "Prüfungen",
    },
    kpis: {
      totalLessons: "Gegebene Lektionen",
      totalHours: "Unterrichtete Stunden",
      activeStudents: "Aktive Schüler",
      successRate: "Erfolgsquote",
      avgRating: "Durchschnittliche Bewertung",
      completionRate: "Abschlussquote",
    },
    charts: {
      lessonsEvolution: "Entwicklung der Lektionen",
      studentProgress: "Schülerfortschritt",
      examResults: "Prüfungsergebnisse",
      timeDistribution: "Zeitverteilung",
    },
    actions: {
      export: "Exportieren",
      compare: "Vergleichen",
      details: "Details anzeigen",
    },
    comparison: {
      title: "Vergleich",
      vsAverage: "vs Schuldurchschnitt",
      vsLastPeriod: "vs Vorperiode",
    },
    students: {
      total: "Gesamt Schüler",
      active: "Aktiv",
      completed: "Abgeschlossen",
      avgProgress: "Durchschnittlicher Fortschritt",
    },
    lessons: {
      practical: "Praktisch",
      theory: "Theoretisch",
      cancelled: "Abgesagt",
      avgDuration: "Durchschnittliche Dauer",
    },
    exams: {
      passed: "Bestanden",
      failed: "Nicht bestanden",
      pending: "Ausstehend",
      successRate: "Erfolgsquote",
    },
  },
  it: {
    breadcrumb: {
      instructor: "Istruttore",
      performance: "Le mie Statistiche",
    },
    title: "Le mie Statistiche",
    description: "Monitora le tue prestazioni e i tuoi progressi",
    periods: {
      week: "Questa settimana",
      month: "Questo mese",
      quarter: "Questo trimestre",
      year: "Quest'anno",
    },
    tabs: {
      overview: "Panoramica",
      students: "Allievi",
      lessons: "Lezioni",
      exams: "Esami",
    },
    kpis: {
      totalLessons: "Lezioni date",
      totalHours: "Ore insegnate",
      activeStudents: "Allievi attivi",
      successRate: "Tasso di successo",
      avgRating: "Valutazione media",
      completionRate: "Tasso di completamento",
    },
    charts: {
      lessonsEvolution: "Evoluzione delle lezioni",
      studentProgress: "Progresso degli allievi",
      examResults: "Risultati degli esami",
      timeDistribution: "Distribuzione del tempo",
    },
    actions: {
      export: "Esporta",
      compare: "Confronta",
      details: "Vedi dettagli",
    },
    comparison: {
      title: "Confronto",
      vsAverage: "vs Media scuola",
      vsLastPeriod: "vs Periodo precedente",
    },
    students: {
      total: "Totale allievi",
      active: "Attivi",
      completed: "Completati",
      avgProgress: "Progresso medio",
    },
    lessons: {
      practical: "Pratiche",
      theory: "Teoriche",
      cancelled: "Annullate",
      avgDuration: "Durata media",
    },
    exams: {
      passed: "Superati",
      failed: "Falliti",
      pending: "In attesa",
      successRate: "Tasso di successo",
    },
  },
  en: {
    breadcrumb: {
      instructor: "Instructor",
      performance: "My Statistics",
    },
    title: "My Statistics",
    description: "Track your performance and progress",
    periods: {
      week: "This week",
      month: "This month",
      quarter: "This quarter",
      year: "This year",
    },
    tabs: {
      overview: "Overview",
      students: "Students",
      lessons: "Lessons",
      exams: "Exams",
    },
    kpis: {
      totalLessons: "Lessons given",
      totalHours: "Hours taught",
      activeStudents: "Active students",
      successRate: "Success rate",
      avgRating: "Average rating",
      completionRate: "Completion rate",
    },
    charts: {
      lessonsEvolution: "Lessons evolution",
      studentProgress: "Student progress",
      examResults: "Exam results",
      timeDistribution: "Time distribution",
    },
    actions: {
      export: "Export",
      compare: "Compare",
      details: "View details",
    },
    comparison: {
      title: "Comparison",
      vsAverage: "vs School average",
      vsLastPeriod: "vs Previous period",
    },
    students: {
      total: "Total students",
      active: "Active",
      completed: "Completed",
      avgProgress: "Average progress",
    },
    lessons: {
      practical: "Practical",
      theory: "Theory",
      cancelled: "Cancelled",
      avgDuration: "Average duration",
    },
    exams: {
      passed: "Passed",
      failed: "Failed",
      pending: "Pending",
      successRate: "Success rate",
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_STATS = {
  totalLessons: 156,
  totalHours: 234,
  activeStudents: 18,
  successRate: 87,
  avgRating: 4.8,
  completionRate: 92,
  trends: {
    lessons: 12,
    hours: 8,
    students: 3,
    successRate: 5,
    rating: 0.2,
    completion: -2,
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function InstructorPerformancePage({
  locale = "fr",
}: InstructorPerformancePageProps) {
  const t = translations[locale];

  const [period, setPeriod] = useState<TimePeriod>("month");

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/instructor/dashboard">
              {t.breadcrumb.instructor}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{t.breadcrumb.performance}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={period}
            onValueChange={(v) => setPeriod(v as TimePeriod)}
          >
            <SelectTrigger className="w-[180px]">
              <CalendarIcon className="w-4 h-4 mr-2" />

              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">{t.periods.week}</SelectItem>
              <SelectItem value="month">{t.periods.month}</SelectItem>
              <SelectItem value="quarter">{t.periods.quarter}</SelectItem>
              <SelectItem value="year">{t.periods.year}</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <DownloadIcon className="w-4 h-4 mr-2" />

            {t.actions.export}
          </Button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Lessons */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.kpis.totalLessons}
            </CardTitle>
            <ClockIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {MOCK_STATS.totalLessons}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {MOCK_STATS.trends.lessons > 0 ? (
                <TrendingUpIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDownIcon className="w-4 h-4 text-red-600 dark:text-red-400" />
              )}
              <span
                className={`text-xs ${
                  MOCK_STATS.trends.lessons > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {MOCK_STATS.trends.lessons > 0 ? "+" : ""}
                {MOCK_STATS.trends.lessons}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                {t.comparison.vsLastPeriod}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Total Hours */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.kpis.totalHours}
            </CardTitle>
            <ClockIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {MOCK_STATS.totalHours}h
            </div>
            <div className="flex items-center gap-1 mt-1">
              {MOCK_STATS.trends.hours > 0 ? (
                <TrendingUpIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDownIcon className="w-4 h-4 text-red-600 dark:text-red-400" />
              )}
              <span
                className={`text-xs ${
                  MOCK_STATS.trends.hours > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {MOCK_STATS.trends.hours > 0 ? "+" : ""}
                {MOCK_STATS.trends.hours}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                {t.comparison.vsLastPeriod}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Active Students */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.kpis.activeStudents}
            </CardTitle>
            <UsersIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {MOCK_STATS.activeStudents}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {MOCK_STATS.trends.students > 0 ? (
                <TrendingUpIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDownIcon className="w-4 h-4 text-red-600 dark:text-red-400" />
              )}
              <span
                className={`text-xs ${
                  MOCK_STATS.trends.students > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {MOCK_STATS.trends.students > 0 ? "+" : ""}
                {MOCK_STATS.trends.students}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                {t.comparison.vsLastPeriod}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Success Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.kpis.successRate}
            </CardTitle>
            <TargetIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {MOCK_STATS.successRate}%
            </div>
            <Progress value={MOCK_STATS.successRate} className="mt-2" />
          </CardContent>
        </Card>

        {/* Average Rating */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.kpis.avgRating}
            </CardTitle>
            <StarIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-foreground">
                {MOCK_STATS.avgRating}
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.floor(MOCK_STATS.avgRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Completion Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.kpis.completionRate}
            </CardTitle>
            <AwardIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {MOCK_STATS.completionRate}%
            </div>
            <Progress value={MOCK_STATS.completionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t.tabs.overview}</TabsTrigger>
          <TabsTrigger value="students">{t.tabs.students}</TabsTrigger>
          <TabsTrigger value="lessons">{t.tabs.lessons}</TabsTrigger>
          <TabsTrigger value="exams">{t.tabs.exams}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.charts.lessonsEvolution}</CardTitle>
                <CardDescription>
                  Évolution du nombre de leçons données
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Chart placeholder - Recharts Line Chart
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.charts.studentProgress}</CardTitle>
                <CardDescription>
                  Progression moyenne de vos élèves
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Chart placeholder - Recharts Bar Chart
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.students.total}</CardTitle>
              <CardDescription>
                Répartition et progression de vos élèves
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t.students.active}
                  </span>
                  <Badge variant="secondary">18</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t.students.completed}
                  </span>
                  <Badge variant="secondary">45</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t.students.avgProgress}
                  </span>
                  <Badge variant="secondary">68%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lessons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.lessons.practical}</CardTitle>
              <CardDescription>
                Statistiques de vos leçons pratiques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t.lessons.practical}
                  </span>
                  <Badge variant="secondary">142</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t.lessons.theory}
                  </span>
                  <Badge variant="secondary">14</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t.lessons.cancelled}
                  </span>
                  <Badge variant="destructive">8</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.exams.successRate}</CardTitle>
              <CardDescription>
                Résultats aux examens de vos élèves
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2Icon className="w-4 h-4 text-green-600 dark:text-green-400" />

                    <span className="text-sm text-muted-foreground">
                      {t.exams.passed}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    39
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircleIcon className="w-4 h-4 text-red-600 dark:text-red-400" />

                    <span className="text-sm text-muted-foreground">
                      {t.exams.failed}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  >
                    6
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {t.exams.pending}
                  </span>
                  <Badge variant="secondary">12</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
