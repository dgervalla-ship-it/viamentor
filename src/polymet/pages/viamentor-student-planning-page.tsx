/**
 * VIAMENTOR - Page Mon Planning Élève
 * Vue calendrier personnalisée pour l'élève avec ses leçons et cours théoriques
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  ClockIcon,
  CarIcon,
  BookOpenIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  XCircleIcon,
  FilterIcon,
} from "lucide-react";
import { PlanningCalendar } from "@/polymet/components/viamentor-planning-calendar";
import {
  planningTranslations,
  type PlanningLocale,
} from "@/polymet/data/viamentor-planning-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface StudentPlanningPageProps {
  locale?: PlanningLocale;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const studentPlanningTranslations = {
  fr: {
    title: "Mon Planning",
    subtitle: "Visualisez vos leçons et cours théoriques à venir",
    stats: {
      upcomingLessons: "Leçons à venir",
      completedLessons: "Leçons complétées",
      theoryCourses: "Cours théoriques",
      nextLesson: "Prochaine leçon",
    },
    filters: {
      all: "Tous mes événements",
      practical: "Leçons pratiques",
      theory: "Cours théoriques",
      completed: "Complétés",
      upcoming: "À venir",
    },
    actions: {
      bookLesson: "Réserver une leçon",
      viewDetails: "Voir les détails",
    },
    nextLesson: {
      title: "Prochaine leçon",
      noLesson: "Aucune leçon planifiée",
      instructor: "Moniteur",
      vehicle: "Véhicule",
      duration: "Durée",
      location: "Lieu de rendez-vous",
      in: "Dans",
      days: "jours",
      hours: "heures",
      minutes: "minutes",
    },
    tips: {
      title: "Conseils",
      tip1: "Arrivez 5 minutes avant l'heure prévue",
      tip2: "N'oubliez pas votre permis d'élève conducteur",
      tip3: "Consultez la météo avant votre leçon",
    },
  },
  de: {
    title: "Meine Planung",
    subtitle: "Sehen Sie Ihre bevorstehenden Fahrstunden und Theoriekurse",
    stats: {
      upcomingLessons: "Bevorstehende Fahrstunden",
      completedLessons: "Abgeschlossene Fahrstunden",
      theoryCourses: "Theoriekurse",
      nextLesson: "Nächste Fahrstunde",
    },
    filters: {
      all: "Alle meine Ereignisse",
      practical: "Fahrstunden",
      theory: "Theoriekurse",
      completed: "Abgeschlossen",
      upcoming: "Bevorstehend",
    },
    actions: {
      bookLesson: "Fahrstunde buchen",
      viewDetails: "Details anzeigen",
    },
    nextLesson: {
      title: "Nächste Fahrstunde",
      noLesson: "Keine Fahrstunde geplant",
      instructor: "Fahrlehrer",
      vehicle: "Fahrzeug",
      duration: "Dauer",
      location: "Treffpunkt",
      in: "In",
      days: "Tagen",
      hours: "Stunden",
      minutes: "Minuten",
    },
    tips: {
      title: "Tipps",
      tip1: "Kommen Sie 5 Minuten vor der geplanten Zeit an",
      tip2: "Vergessen Sie Ihren Lernfahrausweis nicht",
      tip3: "Prüfen Sie das Wetter vor Ihrer Fahrstunde",
    },
  },
  it: {
    title: "La Mia Pianificazione",
    subtitle: "Visualizza le tue lezioni e corsi teorici in programma",
    stats: {
      upcomingLessons: "Lezioni in programma",
      completedLessons: "Lezioni completate",
      theoryCourses: "Corsi teorici",
      nextLesson: "Prossima lezione",
    },
    filters: {
      all: "Tutti i miei eventi",
      practical: "Lezioni pratiche",
      theory: "Corsi teorici",
      completed: "Completati",
      upcoming: "In programma",
    },
    actions: {
      bookLesson: "Prenota una lezione",
      viewDetails: "Vedi dettagli",
    },
    nextLesson: {
      title: "Prossima lezione",
      noLesson: "Nessuna lezione pianificata",
      instructor: "Istruttore",
      vehicle: "Veicolo",
      duration: "Durata",
      location: "Punto d'incontro",
      in: "Tra",
      days: "giorni",
      hours: "ore",
      minutes: "minuti",
    },
    tips: {
      title: "Consigli",
      tip1: "Arriva 5 minuti prima dell'orario previsto",
      tip2: "Non dimenticare la tua licenza di allievo conducente",
      tip3: "Controlla il meteo prima della tua lezione",
    },
  },
  en: {
    title: "My Planning",
    subtitle: "View your upcoming lessons and theory courses",
    stats: {
      upcomingLessons: "Upcoming lessons",
      completedLessons: "Completed lessons",
      theoryCourses: "Theory courses",
      nextLesson: "Next lesson",
    },
    filters: {
      all: "All my events",
      practical: "Practical lessons",
      theory: "Theory courses",
      completed: "Completed",
      upcoming: "Upcoming",
    },
    actions: {
      bookLesson: "Book a lesson",
      viewDetails: "View details",
    },
    nextLesson: {
      title: "Next lesson",
      noLesson: "No lesson scheduled",
      instructor: "Instructor",
      vehicle: "Vehicle",
      duration: "Duration",
      location: "Meeting point",
      in: "In",
      days: "days",
      hours: "hours",
      minutes: "minutes",
    },
    tips: {
      title: "Tips",
      tip1: "Arrive 5 minutes before the scheduled time",
      tip2: "Don't forget your learner's permit",
      tip3: "Check the weather before your lesson",
    },
  },
} as const;

// ============================================================================
// MOCK DATA
// ============================================================================

const mockStudentStats = {
  upcomingLessons: 8,
  completedLessons: 24,
  theoryCourses: 3,
  totalHours: 32,
};

const mockNextLesson = {
  id: "lesson-next-1",
  date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Dans 2 jours
  time: "14:00",
  duration: 90,
  instructor: "Marc Dubois",
  instructorAvatar: "https://github.com/yusufhilmi.png",
  vehicle: "VW Golf - GE 12345",
  category: "B",
  location: "Auto-école ViaMenutor, Rue du Rhône 15, 1204 Genève",
  type: "Circulation urbaine",
  status: "scheduled" as const,
};

// ============================================================================
// COMPONENT
// ============================================================================

export function StudentPlanningPage({
  locale = "fr",
}: StudentPlanningPageProps) {
  const t = studentPlanningTranslations[locale];
  const planningT = planningTranslations[locale];
  const [filterType, setFilterType] = useState<"all" | "practical" | "theory">(
    "all"
  );
  const [filterStatus, setFilterStatus] = useState<
    "all" | "upcoming" | "completed"
  >("all");

  // Calculate time until next lesson
  const getTimeUntilLesson = () => {
    if (!mockNextLesson) return null;

    const now = new Date();
    const lessonDate = new Date(mockNextLesson.date);
    const diff = lessonDate.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return `${days} ${t.nextLesson.days}`;
    } else if (hours > 0) {
      return `${hours} ${t.nextLesson.hours}`;
    } else {
      return `${minutes} ${t.nextLesson.minutes}`;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.stats.upcomingLessons}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {mockStudentStats.upcomingLessons}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <CalendarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.stats.completedLessons}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {mockStudentStats.completedLessons}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <CheckCircle2Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.stats.theoryCourses}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {mockStudentStats.theoryCourses}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <BookOpenIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.stats.nextLesson}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {getTimeUntilLesson() || "-"}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <ClockIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Next Lesson Card */}
      {mockNextLesson && (
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <AlertCircleIcon className="h-5 w-5 text-primary" />

                  {t.nextLesson.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.nextLesson.in} {getTimeUntilLesson()}
                </p>
              </div>
              <Badge variant="default" className="text-sm">
                {mockNextLesson.category}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {mockNextLesson.date.toLocaleDateString(locale, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {mockNextLesson.time} • {mockNextLesson.duration} min
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={mockNextLesson.instructorAvatar}
                    alt={mockNextLesson.instructor}
                    className="h-8 w-8 rounded-full"
                  />

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {mockNextLesson.instructor}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.nextLesson.instructor}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <CarIcon className="h-4 w-4 text-muted-foreground" />

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {mockNextLesson.vehicle}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.nextLesson.vehicle}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    {t.nextLesson.location}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {mockNextLesson.location}
                  </p>
                </div>

                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <p className="text-sm font-semibold text-foreground">
                    {t.tips.title}
                  </p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• {t.tips.tip1}</li>
                    <li>• {t.tips.tip2}</li>
                    <li>• {t.tips.tip3}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="default" size="sm">
                {t.actions.viewDetails}
              </Button>
              <Button variant="outline" size="sm">
                <XCircleIcon className="h-4 w-4 mr-2" />
                Annuler
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <FilterIcon className="h-4 w-4 text-muted-foreground" />

          <span className="text-sm font-medium text-foreground mr-2">
            {planningT.filters.title}:
          </span>

          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
          >
            {t.filters.all}
          </Button>
          <Button
            variant={filterType === "practical" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("practical")}
          >
            {t.filters.practical}
          </Button>
          <Button
            variant={filterType === "theory" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("theory")}
          >
            {t.filters.theory}
          </Button>

          <div className="h-4 w-px bg-border mx-2" />

          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
          >
            {planningT.filters.all}
          </Button>
          <Button
            variant={filterStatus === "upcoming" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("upcoming")}
          >
            {t.filters.upcoming}
          </Button>
          <Button
            variant={filterStatus === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("completed")}
          >
            {t.filters.completed}
          </Button>
        </div>
      </Card>

      {/* Calendar */}
      <PlanningCalendar
        locale={locale}
        filters={{
          type:
            filterType === "all"
              ? "all"
              : filterType === "practical"
                ? "practical"
                : "theory",
          status:
            filterStatus === "all"
              ? "all"
              : filterStatus === "upcoming"
                ? "scheduled"
                : "completed",
          category: "all",
          instructor: "all",
        }}
      />
    </div>
  );
}
