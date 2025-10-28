/**
 * VIAMENTOR - Page Mes Leçons Moniteur
 * Liste complète des leçons du moniteur avec filtres et actions
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalendarIcon,
  ClockIcon,
  SearchIcon,
  FilterIcon,
  LayoutGridIcon,
  LayoutListIcon,
  CheckCircle2Icon,
  XCircleIcon,
  AlertCircleIcon,
  UserIcon,
  CarIcon,
  MapPinIcon,
  PlusIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorLessonsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

type LessonStatus = "scheduled" | "completed" | "cancelled" | "in_progress";
type ViewMode = "table" | "grid";

interface Lesson {
  id: string;
  date: Date;
  time: string;
  duration: number;
  student: {
    id: string;
    name: string;
    avatar: string;
  };
  vehicle: string;
  category: string;
  type: string;
  location: string;
  status: LessonStatus;
  notes?: string;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Mes Leçons",
    subtitle: "Gérez vos leçons pratiques et suivez votre planning",
    stats: {
      today: "Aujourd'hui",
      thisWeek: "Cette semaine",
      completed: "Complétées",
      upcoming: "À venir",
    },
    filters: {
      search: "Rechercher un élève...",
      status: "Statut",
      category: "Catégorie",
      all: "Tous",
      scheduled: "Planifiées",
      completed: "Complétées",
      cancelled: "Annulées",
      inProgress: "En cours",
    },
    actions: {
      newLesson: "Nouvelle leçon",
      viewDetails: "Voir détails",
      startLesson: "Démarrer",
      completeLesson: "Terminer",
      cancelLesson: "Annuler",
      evaluate: "Évaluer",
    },
    table: {
      date: "Date",
      time: "Heure",
      student: "Élève",
      vehicle: "Véhicule",
      category: "Catégorie",
      type: "Type",
      status: "Statut",
      actions: "Actions",
    },
    status: {
      scheduled: "Planifiée",
      completed: "Complétée",
      cancelled: "Annulée",
      in_progress: "En cours",
    },
    empty: {
      title: "Aucune leçon trouvée",
      description: "Aucune leçon ne correspond à vos critères de recherche",
    },
  },
  de: {
    title: "Meine Fahrstunden",
    subtitle: "Verwalten Sie Ihre Fahrstunden und verfolgen Sie Ihren Zeitplan",
    stats: {
      today: "Heute",
      thisWeek: "Diese Woche",
      completed: "Abgeschlossen",
      upcoming: "Bevorstehend",
    },
    filters: {
      search: "Schüler suchen...",
      status: "Status",
      category: "Kategorie",
      all: "Alle",
      scheduled: "Geplant",
      completed: "Abgeschlossen",
      cancelled: "Storniert",
      inProgress: "In Bearbeitung",
    },
    actions: {
      newLesson: "Neue Fahrstunde",
      viewDetails: "Details anzeigen",
      startLesson: "Starten",
      completeLesson: "Beenden",
      cancelLesson: "Stornieren",
      evaluate: "Bewerten",
    },
    table: {
      date: "Datum",
      time: "Uhrzeit",
      student: "Schüler",
      vehicle: "Fahrzeug",
      category: "Kategorie",
      type: "Typ",
      status: "Status",
      actions: "Aktionen",
    },
    status: {
      scheduled: "Geplant",
      completed: "Abgeschlossen",
      cancelled: "Storniert",
      in_progress: "In Bearbeitung",
    },
    empty: {
      title: "Keine Fahrstunden gefunden",
      description: "Keine Fahrstunden entsprechen Ihren Suchkriterien",
    },
  },
  it: {
    title: "Le Mie Lezioni",
    subtitle: "Gestisci le tue lezioni pratiche e segui il tuo programma",
    stats: {
      today: "Oggi",
      thisWeek: "Questa settimana",
      completed: "Completate",
      upcoming: "In programma",
    },
    filters: {
      search: "Cerca allievo...",
      status: "Stato",
      category: "Categoria",
      all: "Tutti",
      scheduled: "Pianificate",
      completed: "Completate",
      cancelled: "Annullate",
      inProgress: "In corso",
    },
    actions: {
      newLesson: "Nuova lezione",
      viewDetails: "Vedi dettagli",
      startLesson: "Inizia",
      completeLesson: "Termina",
      cancelLesson: "Annulla",
      evaluate: "Valuta",
    },
    table: {
      date: "Data",
      time: "Ora",
      student: "Allievo",
      vehicle: "Veicolo",
      category: "Categoria",
      type: "Tipo",
      status: "Stato",
      actions: "Azioni",
    },
    status: {
      scheduled: "Pianificata",
      completed: "Completata",
      cancelled: "Annullata",
      in_progress: "In corso",
    },
    empty: {
      title: "Nessuna lezione trovata",
      description: "Nessuna lezione corrisponde ai tuoi criteri di ricerca",
    },
  },
  en: {
    title: "My Lessons",
    subtitle: "Manage your practical lessons and track your schedule",
    stats: {
      today: "Today",
      thisWeek: "This week",
      completed: "Completed",
      upcoming: "Upcoming",
    },
    filters: {
      search: "Search student...",
      status: "Status",
      category: "Category",
      all: "All",
      scheduled: "Scheduled",
      completed: "Completed",
      cancelled: "Cancelled",
      inProgress: "In progress",
    },
    actions: {
      newLesson: "New lesson",
      viewDetails: "View details",
      startLesson: "Start",
      completeLesson: "Complete",
      cancelLesson: "Cancel",
      evaluate: "Evaluate",
    },
    table: {
      date: "Date",
      time: "Time",
      student: "Student",
      vehicle: "Vehicle",
      category: "Category",
      type: "Type",
      status: "Status",
      actions: "Actions",
    },
    status: {
      scheduled: "Scheduled",
      completed: "Completed",
      cancelled: "Cancelled",
      in_progress: "In progress",
    },
    empty: {
      title: "No lessons found",
      description: "No lessons match your search criteria",
    },
  },
} as const;

// ============================================================================
// MOCK DATA
// ============================================================================

const mockStats = {
  today: 4,
  thisWeek: 18,
  completed: 156,
  upcoming: 24,
};

const mockLessons: Lesson[] = [
  {
    id: "lesson-1",
    date: new Date(),
    time: "09:00",
    duration: 90,
    student: {
      id: "student-1",
      name: "Sophie Martin",
      avatar: "https://github.com/kdrnp.png",
    },
    vehicle: "VW Golf - GE 12345",
    category: "B",
    type: "Circulation urbaine",
    location: "Rue du Rhône 15, Genève",
    status: "scheduled",
  },
  {
    id: "lesson-2",
    date: new Date(),
    time: "11:00",
    duration: 90,
    student: {
      id: "student-2",
      name: "Lucas Dubois",
      avatar: "https://github.com/yusufhilmi.png",
    },
    vehicle: "VW Golf - GE 12345",
    category: "B",
    type: "Autoroute",
    location: "Rue du Rhône 15, Genève",
    status: "in_progress",
  },
  {
    id: "lesson-3",
    date: new Date(),
    time: "14:00",
    duration: 90,
    student: {
      id: "student-3",
      name: "Emma Rousseau",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    vehicle: "VW Golf - GE 12345",
    category: "B",
    type: "Stationnement",
    location: "Rue du Rhône 15, Genève",
    status: "scheduled",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function InstructorLessonsPage({
  locale = "fr",
}: InstructorLessonsPageProps) {
  const t = translations[locale];
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const getStatusColor = (status: LessonStatus) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "completed":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "cancelled":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      case "in_progress":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
    }
  };

  const getStatusIcon = (status: LessonStatus) => {
    switch (status) {
      case "scheduled":
        return <ClockIcon className="h-4 w-4" />;

      case "completed":
        return <CheckCircle2Icon className="h-4 w-4" />;

      case "cancelled":
        return <XCircleIcon className="h-4 w-4" />;

      case "in_progress":
        return <AlertCircleIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />

          {t.actions.newLesson}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t.stats.today}</p>
              <p className="text-2xl font-bold text-foreground">
                {mockStats.today}
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
                {t.stats.thisWeek}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {mockStats.thisWeek}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <ClockIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.stats.completed}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {mockStats.completed}
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
                {t.stats.upcoming}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {mockStats.upcoming}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <AlertCircleIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              placeholder={t.filters.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t.filters.status} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.filters.all}</SelectItem>
              <SelectItem value="scheduled">{t.filters.scheduled}</SelectItem>
              <SelectItem value="in_progress">
                {t.filters.inProgress}
              </SelectItem>
              <SelectItem value="completed">{t.filters.completed}</SelectItem>
              <SelectItem value="cancelled">{t.filters.cancelled}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-32">
              <SelectValue placeholder={t.filters.category} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.filters.all}</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="C">C</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("table")}
            >
              <LayoutListIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGridIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Lessons Table */}
      {viewMode === "table" ? (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.table.date}</TableHead>
                <TableHead>{t.table.time}</TableHead>
                <TableHead>{t.table.student}</TableHead>
                <TableHead>{t.table.vehicle}</TableHead>
                <TableHead>{t.table.category}</TableHead>
                <TableHead>{t.table.type}</TableHead>
                <TableHead>{t.table.status}</TableHead>
                <TableHead className="text-right">{t.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLessons.map((lesson) => (
                <TableRow key={lesson.id}>
                  <TableCell>
                    {lesson.date.toLocaleDateString(locale, {
                      day: "2-digit",
                      month: "short",
                    })}
                  </TableCell>
                  <TableCell>{lesson.time}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        src={lesson.student.avatar}
                        alt={lesson.student.name}
                        className="h-8 w-8 rounded-full"
                      />

                      <span className="font-medium">{lesson.student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{lesson.vehicle}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{lesson.category}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {lesson.type}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(lesson.status)}
                    >
                      {getStatusIcon(lesson.status)}
                      <span className="ml-1">{t.status[lesson.status]}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {lesson.status === "scheduled" && (
                        <Button size="sm" variant="outline">
                          {t.actions.startLesson}
                        </Button>
                      )}
                      {lesson.status === "in_progress" && (
                        <Button size="sm">{t.actions.completeLesson}</Button>
                      )}
                      {lesson.status === "completed" && (
                        <Button size="sm" variant="outline">
                          {t.actions.evaluate}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockLessons.map((lesson) => (
            <Card key={lesson.id} className="p-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={lesson.student.avatar}
                      alt={lesson.student.name}
                      className="h-12 w-12 rounded-full"
                    />

                    <div>
                      <p className="font-semibold text-foreground">
                        {lesson.student.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {lesson.category} • {lesson.type}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(lesson.status)}
                  >
                    {getStatusIcon(lesson.status)}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />

                    <span>
                      {lesson.date.toLocaleDateString(locale, {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ClockIcon className="h-4 w-4" />

                    <span>
                      {lesson.time} • {lesson.duration} min
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CarIcon className="h-4 w-4" />

                    <span>{lesson.vehicle}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPinIcon className="h-4 w-4" />

                    <span className="line-clamp-1">{lesson.location}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  {lesson.status === "scheduled" && (
                    <Button size="sm" className="flex-1">
                      {t.actions.startLesson}
                    </Button>
                  )}
                  {lesson.status === "in_progress" && (
                    <Button size="sm" className="flex-1">
                      {t.actions.completeLesson}
                    </Button>
                  )}
                  {lesson.status === "completed" && (
                    <Button size="sm" variant="outline" className="flex-1">
                      {t.actions.evaluate}
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    {t.actions.viewDetails}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
