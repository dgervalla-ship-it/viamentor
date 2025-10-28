/**
 * VIAMENTOR - Exams Calendar Page
 * Page calendrier examens avec vue mensuelle, filtres et réservation
 *
 * @module pages/viamentor-exams-calendar-page
 * @version 1.0.0
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  FilterIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ============================================================================
// TYPES
// ============================================================================

interface ExamsCalendarPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Calendrier Examens",
    subtitle: "Vue d'ensemble des examens planifiés",
    filters: {
      type: "Type",
      allTypes: "Tous types",
      theory: "Théorique",
      practical: "Pratique",
      mock: "Blanc",
      category: "Catégorie",
      allCategories: "Toutes",
      status: "Statut",
      allStatuses: "Tous",
    },
    actions: {
      bookExam: "Réserver examen",
      today: "Aujourd'hui",
    },
    upcoming: {
      title: "Prochains examens",
      noExams: "Aucun examen prévu",
    },
    months: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],

    days: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  },
  de: {
    title: "Prüfungskalender",
    subtitle: "Übersicht der geplanten Prüfungen",
    filters: {
      type: "Typ",
      allTypes: "Alle Typen",
      theory: "Theoretisch",
      practical: "Praktisch",
      mock: "Probe",
      category: "Kategorie",
      allCategories: "Alle",
      status: "Status",
      allStatuses: "Alle",
    },
    actions: {
      bookExam: "Prüfung buchen",
      today: "Heute",
    },
    upcoming: {
      title: "Kommende Prüfungen",
      noExams: "Keine Prüfungen geplant",
    },
    months: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ],

    days: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  },
  it: {
    title: "Calendario Esami",
    subtitle: "Panoramica degli esami pianificati",
    filters: {
      type: "Tipo",
      allTypes: "Tutti i tipi",
      theory: "Teorico",
      practical: "Pratico",
      mock: "Simulazione",
      category: "Categoria",
      allCategories: "Tutte",
      status: "Stato",
      allStatuses: "Tutti",
    },
    actions: {
      bookExam: "Prenota esame",
      today: "Oggi",
    },
    upcoming: {
      title: "Prossimi esami",
      noExams: "Nessun esame previsto",
    },
    months: [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ],

    days: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
  },
  en: {
    title: "Exams Calendar",
    subtitle: "Overview of scheduled exams",
    filters: {
      type: "Type",
      allTypes: "All types",
      theory: "Theory",
      practical: "Practical",
      mock: "Mock",
      category: "Category",
      allCategories: "All",
      status: "Status",
      allStatuses: "All",
    },
    actions: {
      bookExam: "Book exam",
      today: "Today",
    },
    upcoming: {
      title: "Upcoming exams",
      noExams: "No exams scheduled",
    },
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],

    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const mockExams = [
  {
    id: "1",
    date: new Date(2024, 0, 15),
    type: "theory",
    category: "B",
    time: "09:00",
    location: "Salle A",
    students: 12,
  },
  {
    id: "2",
    date: new Date(2024, 0, 18),
    type: "practical",
    category: "B",
    time: "14:00",
    location: "Circuit",
    students: 3,
  },
  {
    id: "3",
    date: new Date(2024, 0, 22),
    type: "mock",
    category: "A",
    time: "10:00",
    location: "Salle B",
    students: 8,
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ExamsCalendarPage({ locale = "fr" }: ExamsCalendarPageProps) {
  const t = translations[locale];
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generate calendar days
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const calendarDays = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getExamsForDay = (day: number) => {
    return mockExams.filter(
      (exam) =>
        exam.date.getDate() === day &&
        exam.date.getMonth() === currentDate.getMonth() &&
        exam.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const getExamColor = (type: string) => {
    switch (type) {
      case "theory":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
      case "practical":
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300";
      case "mock":
        return "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{t.title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            {t.subtitle}
          </p>
        </div>
        <Button asChild>
          <Link to="/exams/book">
            <PlusIcon className="mr-2 h-4 w-4" />

            {t.actions.bookExam}
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {t.months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={goToToday}>
                    {t.actions.today}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPreviousMonth}
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={goToNextMonth}>
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.filters.allTypes}</SelectItem>
                    <SelectItem value="theory">{t.filters.theory}</SelectItem>
                    <SelectItem value="practical">
                      {t.filters.practical}
                    </SelectItem>
                    <SelectItem value="mock">{t.filters.mock}</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t.filters.allCategories}
                    </SelectItem>
                    <SelectItem value="B">Catégorie B</SelectItem>
                    <SelectItem value="A">Catégorie A</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.filters.allStatuses}</SelectItem>
                    <SelectItem value="scheduled">Prévu</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Day headers */}
                {t.days.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-muted-foreground p-2"
                  >
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {calendarDays.map((day, index) => {
                  const exams = day ? getExamsForDay(day) : [];
                  const isToday =
                    day === new Date().getDate() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getFullYear() === new Date().getFullYear();

                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border rounded-lg ${
                        day
                          ? "bg-background hover:bg-accent/50 cursor-pointer"
                          : "bg-muted/30"
                      } ${
                        isToday ? "border-primary border-2" : "border-border"
                      }`}
                    >
                      {day && (
                        <>
                          <div
                            className={`text-sm font-medium mb-1 ${
                              isToday ? "text-primary" : ""
                            }`}
                          >
                            {day}
                          </div>
                          <div className="space-y-1">
                            {exams.map((exam) => (
                              <div
                                key={exam.id}
                                className={`text-xs p-1 rounded ${getExamColor(
                                  exam.type
                                )}`}
                              >
                                <div className="font-medium truncate">
                                  {exam.time}
                                </div>
                                <div className="truncate">
                                  {exam.category} - {exam.students}
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Exams */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.upcoming.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockExams.slice(0, 3).map((exam) => (
                <div
                  key={exam.id}
                  className="p-3 border border-border rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={getExamColor(exam.type)}
                    >
                      {exam.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {exam.date.toLocaleDateString(locale)}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-3 w-3 text-muted-foreground" />

                      <span>{exam.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-3 w-3 text-muted-foreground" />

                      <span>{exam.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="h-3 w-3 text-muted-foreground" />

                      <span>{exam.students} élèves</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Légende</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-100 dark:bg-blue-950" />

                <span className="text-sm">{t.filters.theory}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-950" />

                <span className="text-sm">{t.filters.practical}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-orange-100 dark:bg-orange-950" />

                <span className="text-sm">{t.filters.mock}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
