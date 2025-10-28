/**
 * Page Ma Semaine Moniteur
 * Vue d'ensemble hebdomadaire avec planning, statistiques et objectifs
 *
 * @module pages/viamentor-instructor-week-page
 */

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  TargetIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorWeekPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Ma Semaine",
    subtitle: "Vue d'ensemble de votre semaine",
    weekOf: "Semaine du",
    previousWeek: "Semaine précédente",
    nextWeek: "Semaine suivante",
    stats: {
      totalLessons: "Leçons totales",
      totalHours: "Heures totales",
      studentsCount: "Élèves différents",
      completionRate: "Taux de complétion",
    },
    objectives: {
      title: "Objectifs de la semaine",
      lessons: "Leçons",
      hours: "Heures",
      students: "Élèves",
      evaluations: "Évaluations",
    },
    dailyBreakdown: "Répartition journalière",
    days: {
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      friday: "Vendredi",
      saturday: "Samedi",
      sunday: "Dimanche",
    },
    daysShort: {
      monday: "Lun",
      tuesday: "Mar",
      wednesday: "Mer",
      thursday: "Jeu",
      friday: "Ven",
      saturday: "Sam",
      sunday: "Dim",
    },
    lessons: "leçons",
    hours: "heures",
    students: "élèves",
    noLessons: "Aucune leçon",
    viewDay: "Voir la journée",
    performance: {
      title: "Performance",
      vsLastWeek: "vs semaine dernière",
      increase: "Augmentation",
      decrease: "Diminution",
      stable: "Stable",
    },
    topStudents: {
      title: "Élèves les plus actifs",
      lessonsThisWeek: "leçons cette semaine",
    },
    notes: {
      title: "Notes de la semaine",
      placeholder: "Ajoutez vos notes pour cette semaine...",
    },
  },
  de: {
    title: "Meine Woche",
    subtitle: "Übersicht über Ihre Woche",
    weekOf: "Woche vom",
    previousWeek: "Vorherige Woche",
    nextWeek: "Nächste Woche",
    stats: {
      totalLessons: "Gesamte Lektionen",
      totalHours: "Gesamte Stunden",
      studentsCount: "Verschiedene Schüler",
      completionRate: "Abschlussrate",
    },
    objectives: {
      title: "Wochenziele",
      lessons: "Lektionen",
      hours: "Stunden",
      students: "Schüler",
      evaluations: "Bewertungen",
    },
    dailyBreakdown: "Tägliche Aufschlüsselung",
    days: {
      monday: "Montag",
      tuesday: "Dienstag",
      wednesday: "Mittwoch",
      thursday: "Donnerstag",
      friday: "Freitag",
      saturday: "Samstag",
      sunday: "Sonntag",
    },
    daysShort: {
      monday: "Mo",
      tuesday: "Di",
      wednesday: "Mi",
      thursday: "Do",
      friday: "Fr",
      saturday: "Sa",
      sunday: "So",
    },
    lessons: "Lektionen",
    hours: "Stunden",
    students: "Schüler",
    noLessons: "Keine Lektionen",
    viewDay: "Tag anzeigen",
    performance: {
      title: "Leistung",
      vsLastWeek: "vs letzte Woche",
      increase: "Zunahme",
      decrease: "Abnahme",
      stable: "Stabil",
    },
    topStudents: {
      title: "Aktivste Schüler",
      lessonsThisWeek: "Lektionen diese Woche",
    },
    notes: {
      title: "Wochennotizen",
      placeholder: "Fügen Sie Ihre Notizen für diese Woche hinzu...",
    },
  },
  it: {
    title: "La Mia Settimana",
    subtitle: "Panoramica della tua settimana",
    weekOf: "Settimana del",
    previousWeek: "Settimana precedente",
    nextWeek: "Settimana successiva",
    stats: {
      totalLessons: "Lezioni totali",
      totalHours: "Ore totali",
      studentsCount: "Allievi diversi",
      completionRate: "Tasso di completamento",
    },
    objectives: {
      title: "Obiettivi della settimana",
      lessons: "Lezioni",
      hours: "Ore",
      students: "Allievi",
      evaluations: "Valutazioni",
    },
    dailyBreakdown: "Ripartizione giornaliera",
    days: {
      monday: "Lunedì",
      tuesday: "Martedì",
      wednesday: "Mercoledì",
      thursday: "Giovedì",
      friday: "Venerdì",
      saturday: "Sabato",
      sunday: "Domenica",
    },
    daysShort: {
      monday: "Lun",
      tuesday: "Mar",
      wednesday: "Mer",
      thursday: "Gio",
      friday: "Ven",
      saturday: "Sab",
      sunday: "Dom",
    },
    lessons: "lezioni",
    hours: "ore",
    students: "allievi",
    noLessons: "Nessuna lezione",
    viewDay: "Vedi giornata",
    performance: {
      title: "Prestazioni",
      vsLastWeek: "vs settimana scorsa",
      increase: "Aumento",
      decrease: "Diminuzione",
      stable: "Stabile",
    },
    topStudents: {
      title: "Allievi più attivi",
      lessonsThisWeek: "lezioni questa settimana",
    },
    notes: {
      title: "Note della settimana",
      placeholder: "Aggiungi le tue note per questa settimana...",
    },
  },
  en: {
    title: "My Week",
    subtitle: "Overview of your week",
    weekOf: "Week of",
    previousWeek: "Previous week",
    nextWeek: "Next week",
    stats: {
      totalLessons: "Total lessons",
      totalHours: "Total hours",
      studentsCount: "Different students",
      completionRate: "Completion rate",
    },
    objectives: {
      title: "Weekly objectives",
      lessons: "Lessons",
      hours: "Hours",
      students: "Students",
      evaluations: "Evaluations",
    },
    dailyBreakdown: "Daily breakdown",
    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
    },
    daysShort: {
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun",
    },
    lessons: "lessons",
    hours: "hours",
    students: "students",
    noLessons: "No lessons",
    viewDay: "View day",
    performance: {
      title: "Performance",
      vsLastWeek: "vs last week",
      increase: "Increase",
      decrease: "Decrease",
      stable: "Stable",
    },
    topStudents: {
      title: "Most active students",
      lessonsThisWeek: "lessons this week",
    },
    notes: {
      title: "Week notes",
      placeholder: "Add your notes for this week...",
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const mockData = {
  weekStats: {
    totalLessons: 28,
    totalHours: 42,
    studentsCount: 15,
    completionRate: 92,
    lastWeekLessons: 25,
    lastWeekHours: 38,
    lastWeekStudents: 14,
  },
  objectives: {
    lessons: { current: 28, target: 30 },
    hours: { current: 42, target: 45 },
    students: { current: 15, target: 15 },
    evaluations: { current: 24, target: 28 },
  },
  dailyData: [
    {
      day: "monday",
      date: "18 Nov",
      lessons: 5,
      hours: 7.5,
      students: 4,
      completed: true,
    },
    {
      day: "tuesday",
      date: "19 Nov",
      lessons: 6,
      hours: 9,
      students: 5,
      completed: true,
    },
    {
      day: "wednesday",
      date: "20 Nov",
      lessons: 4,
      hours: 6,
      students: 3,
      completed: true,
    },
    {
      day: "thursday",
      date: "21 Nov",
      lessons: 5,
      hours: 7.5,
      students: 4,
      completed: true,
    },
    {
      day: "friday",
      date: "22 Nov",
      lessons: 6,
      hours: 9,
      students: 5,
      completed: false,
    },
    {
      day: "saturday",
      date: "23 Nov",
      lessons: 2,
      hours: 3,
      students: 2,
      completed: false,
    },
    {
      day: "sunday",
      date: "24 Nov",
      lessons: 0,
      hours: 0,
      students: 0,
      completed: false,
    },
  ],

  topStudents: [
    {
      id: "S001",
      name: "Sophie Martin",
      avatar: "https://github.com/yahyabedirhan.png",
      lessonsThisWeek: 4,
      progress: 65,
    },
    {
      id: "S002",
      name: "Marc Dubois",
      avatar: "https://github.com/kdrnp.png",
      lessonsThisWeek: 3,
      progress: 45,
    },
    {
      id: "S003",
      name: "Julie Roux",
      avatar: "https://github.com/denizbuyuktas.png",
      lessonsThisWeek: 3,
      progress: 85,
    },
    {
      id: "S004",
      name: "Pierre Favre",
      avatar: "https://github.com/yusufhilmi.png",
      lessonsThisWeek: 2,
      progress: 55,
    },
  ],
};

// ============================================================================
// COMPONENT
// ============================================================================

export function InstructorWeekPage({ locale = "fr" }: InstructorWeekPageProps) {
  const t = translations[locale];
  const [currentWeek, setCurrentWeek] = useState(0);

  const getPerformanceChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(0),
      trend: change > 0 ? "increase" : change < 0 ? "decrease" : "stable",
    };
  };

  const lessonsChange = getPerformanceChange(
    mockData.weekStats.totalLessons,
    mockData.weekStats.lastWeekLessons
  );
  const hoursChange = getPerformanceChange(
    mockData.weekStats.totalHours,
    mockData.weekStats.lastWeekHours
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentWeek(currentWeek - 1)}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 rounded-lg border px-4 py-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />

              <span className="text-sm font-medium">
                {t.weekOf} 18 - 24 Nov 2024
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentWeek(currentWeek + 1)}
              disabled={currentWeek >= 0}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.totalLessons}
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.weekStats.totalLessons}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs">
              {lessonsChange.trend === "increase" && (
                <>
                  <TrendingUpIcon className="h-3 w-3 text-green-500" />

                  <span className="text-green-500">
                    +{lessonsChange.value}%
                  </span>
                </>
              )}
              {lessonsChange.trend === "decrease" && (
                <>
                  <TrendingDownIcon className="h-3 w-3 text-red-500" />

                  <span className="text-red-500">-{lessonsChange.value}%</span>
                </>
              )}
              <span className="text-muted-foreground">
                {t.performance.vsLastWeek}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.totalHours}
            </CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.weekStats.totalHours}h
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs">
              {hoursChange.trend === "increase" && (
                <>
                  <TrendingUpIcon className="h-3 w-3 text-green-500" />

                  <span className="text-green-500">+{hoursChange.value}%</span>
                </>
              )}
              {hoursChange.trend === "decrease" && (
                <>
                  <TrendingDownIcon className="h-3 w-3 text-red-500" />

                  <span className="text-red-500">-{hoursChange.value}%</span>
                </>
              )}
              <span className="text-muted-foreground">
                {t.performance.vsLastWeek}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.studentsCount}
            </CardTitle>
            <UserIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.weekStats.studentsCount}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              {mockData.weekStats.studentsCount ===
              mockData.weekStats.lastWeekStudents
                ? t.performance.stable
                : `+${mockData.weekStats.studentsCount - mockData.weekStats.lastWeekStudents}`}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.completionRate}
            </CardTitle>
            <CheckCircle2Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockData.weekStats.completionRate}%
            </div>
            <Progress
              value={mockData.weekStats.completionRate}
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Objectives */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TargetIcon className="h-5 w-5" />

              {t.objectives.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(mockData.objectives).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {t.objectives[key as keyof typeof t.objectives]}
                  </span>
                  <span className="text-muted-foreground">
                    {value.current} / {value.target}
                  </span>
                </div>
                <Progress value={(value.current / value.target) * 100} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Students */}
        <Card>
          <CardHeader>
            <CardTitle>{t.topStudents.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockData.topStudents.map((student) => (
              <div key={student.id} className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={student.avatar} />

                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{student.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {student.lessonsThisWeek} {t.topStudents.lessonsThisWeek}
                  </p>
                </div>
                <Badge variant="outline">{student.progress}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Daily Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>{t.dailyBreakdown}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-7">
            {mockData.dailyData.map((day) => (
              <div
                key={day.day}
                className={`rounded-lg border p-4 ${
                  day.completed
                    ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950"
                    : "border-border"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      {t.daysShort[day.day as keyof typeof t.daysShort]}
                    </p>
                    <p className="text-xs text-muted-foreground">{day.date}</p>
                  </div>
                  {day.completed && (
                    <CheckCircle2Icon className="h-4 w-4 text-green-500" />
                  )}
                  {!day.completed && day.lessons > 0 && (
                    <AlertCircleIcon className="h-4 w-4 text-orange-500" />
                  )}
                </div>

                {day.lessons > 0 ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{t.lessons}</span>
                      <span className="font-semibold">{day.lessons}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{t.hours}</span>
                      <span className="font-semibold">{day.hours}h</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {t.students}
                      </span>
                      <span className="font-semibold">{day.students}</span>
                    </div>
                    <Button size="sm" variant="outline" className="mt-2 w-full">
                      {t.viewDay}
                    </Button>
                  </div>
                ) : (
                  <div className="flex h-20 items-center justify-center">
                    <p className="text-xs text-muted-foreground">
                      {t.noLessons}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>{t.notes.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            className="min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder={t.notes.placeholder}
          />
        </CardContent>
      </Card>
    </div>
  );
}
