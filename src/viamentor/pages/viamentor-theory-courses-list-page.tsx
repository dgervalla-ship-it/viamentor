/**
 * VIAMENTOR - Theory Courses List Page
 * Page principale liste cours théoriques avec stats KPIs, filtres avancés, table/cards toggle
 *
 * @module pages/viamentor-theory-courses-list-page
 * @version 1.0.0
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  UsersIcon,
  ClockIcon,
  BookOpenIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  LayoutGridIcon,
  LayoutListIcon,
  MapPinIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  MoreHorizontalIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
  UserPlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  type TheoryCourse,
  type TheoryCoursesLocale,
  mockTheoryCourses,
} from "@/viamentor/data/viamentor-theory-courses-data";
import { theoryCoursesTranslations } from "@/viamentor/data/viamentor-theory-courses-i18n";
import { CreateTheoryCourseWizard } from "@/viamentor/components/viamentor-create-theory-course-wizard";

// ============================================================================
// TYPES
// ============================================================================

interface TheoryCoursesListPageProps {
  locale?: TheoryCoursesLocale;
}

type ViewMode = "table" | "cards";

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Cours Théoriques",
    subtitle: "Gestion des cours théoriques et de sensibilisation",
    participants: "participants",
    stats: {
      totalCourses: "Total cours",
      totalParticipants: "Total participants",
      fillRate: "Taux de remplissage",
      upcomingCourses: "Cours à venir",
      thisMonth: "ce mois",
      thisWeek: "cette semaine",
      vsLastMonth: "vs mois dernier",
      nextWeek: "semaine prochaine",
    },
    filters: {
      searchPlaceholder: "Rechercher un cours...",
      category: "Catégorie",
      allCategories: "Toutes catégories",
      status: "Statut",
      allStatuses: "Tous statuts",
      period: "Période",
      allPeriods: "Toutes périodes",
      today: "Aujourd'hui",
      thisWeek: "Cette semaine",
      thisMonth: "Ce mois",
    },
    status: {
      scheduled: "Prévu",
      in_progress: "En cours",
      completed: "Terminé",
      canceled: "Annulé",
    },
    table: {
      title: "Titre",
      dateTime: "Date & Heure",
      category: "Catégorie",
      room: "Salle",
      instructor: "Moniteur",
      participants: "Participants",
      status: "Statut",
      actions: "Actions",
    },
    actions: {
      createCourse: "Créer un cours",
      viewDetails: "Voir détails",
      enrollStudent: "Inscrire élève",
      edit: "Modifier",
      cancel: "Annuler",
    },
  },
  de: {
    title: "Theoriekurse",
    subtitle: "Verwaltung von Theorie- und Sensibilisierungskursen",
    participants: "Teilnehmer",
    stats: {
      totalCourses: "Kurse gesamt",
      totalParticipants: "Teilnehmer gesamt",
      fillRate: "Auslastung",
      upcomingCourses: "Kommende Kurse",
      thisMonth: "diesen Monat",
      thisWeek: "diese Woche",
      vsLastMonth: "vs letzten Monat",
      nextWeek: "nächste Woche",
    },
    filters: {
      searchPlaceholder: "Kurs suchen...",
      category: "Kategorie",
      allCategories: "Alle Kategorien",
      status: "Status",
      allStatuses: "Alle Status",
      period: "Zeitraum",
      allPeriods: "Alle Zeiträume",
      today: "Heute",
      thisWeek: "Diese Woche",
      thisMonth: "Dieser Monat",
    },
    status: {
      scheduled: "Geplant",
      in_progress: "Im Gang",
      completed: "Abgeschlossen",
      canceled: "Abgesagt",
    },
    table: {
      title: "Titel",
      dateTime: "Datum & Zeit",
      category: "Kategorie",
      room: "Raum",
      instructor: "Fahrlehrer",
      participants: "Teilnehmer",
      status: "Status",
      actions: "Aktionen",
    },
    actions: {
      createCourse: "Kurs erstellen",
      viewDetails: "Details anzeigen",
      enrollStudent: "Schüler einschreiben",
      edit: "Bearbeiten",
      cancel: "Absagen",
    },
  },
  it: {
    title: "Corsi Teorici",
    subtitle: "Gestione dei corsi teorici e di sensibilizzazione",
    participants: "partecipanti",
    stats: {
      totalCourses: "Corsi totali",
      totalParticipants: "Partecipanti totali",
      fillRate: "Tasso di riempimento",
      upcomingCourses: "Corsi in arrivo",
      thisMonth: "questo mese",
      thisWeek: "questa settimana",
      vsLastMonth: "vs mese scorso",
      nextWeek: "prossima settimana",
    },
    filters: {
      searchPlaceholder: "Cerca un corso...",
      category: "Categoria",
      allCategories: "Tutte le categorie",
      status: "Stato",
      allStatuses: "Tutti gli stati",
      period: "Periodo",
      allPeriods: "Tutti i periodi",
      today: "Oggi",
      thisWeek: "Questa settimana",
      thisMonth: "Questo mese",
    },
    status: {
      scheduled: "Programmato",
      in_progress: "In corso",
      completed: "Completato",
      canceled: "Annullato",
    },
    table: {
      title: "Titolo",
      dateTime: "Data & Ora",
      category: "Categoria",
      room: "Sala",
      instructor: "Istruttore",
      participants: "Partecipanti",
      status: "Stato",
      actions: "Azioni",
    },
    actions: {
      createCourse: "Crea corso",
      viewDetails: "Vedi dettagli",
      enrollStudent: "Iscrivi studente",
      edit: "Modifica",
      cancel: "Annulla",
    },
  },
  en: {
    title: "Theory Courses",
    subtitle: "Management of theory and awareness courses",
    participants: "participants",
    stats: {
      totalCourses: "Total courses",
      totalParticipants: "Total participants",
      fillRate: "Fill rate",
      upcomingCourses: "Upcoming courses",
      thisMonth: "this month",
      thisWeek: "this week",
      vsLastMonth: "vs last month",
      nextWeek: "next week",
    },
    filters: {
      searchPlaceholder: "Search a course...",
      category: "Category",
      allCategories: "All categories",
      status: "Status",
      allStatuses: "All statuses",
      period: "Period",
      allPeriods: "All periods",
      today: "Today",
      thisWeek: "This week",
      thisMonth: "This month",
    },
    status: {
      scheduled: "Scheduled",
      in_progress: "In progress",
      completed: "Completed",
      canceled: "Canceled",
    },
    table: {
      title: "Title",
      dateTime: "Date & Time",
      category: "Category",
      room: "Room",
      instructor: "Instructor",
      participants: "Participants",
      status: "Status",
      actions: "Actions",
    },
    actions: {
      createCourse: "Create course",
      viewDetails: "View details",
      enrollStudent: "Enroll student",
      edit: "Edit",
      cancel: "Cancel",
    },
  },
};

// ============================================================================
// STATS CARDS
// ============================================================================

function StatsCards({ locale = "fr" }: { locale?: TheoryCoursesLocale }) {
  const t = translations[locale];

  const stats = [
    {
      title: t.stats.totalCourses,
      value: "24",
      icon: BookOpenIcon,
      trend: "+3",
      trendLabel: t.stats.thisMonth,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: t.stats.totalParticipants,
      value: "186",
      icon: UsersIcon,
      trend: "+12",
      trendLabel: t.stats.thisWeek,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/30",
    },
    {
      title: t.stats.fillRate,
      value: "78%",
      icon: CheckCircleIcon,
      trend: "+5%",
      trendLabel: t.stats.vsLastMonth,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      title: t.stats.upcomingCourses,
      value: "8",
      icon: CalendarIcon,
      trend: "2",
      trendLabel: t.stats.nextWeek,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {stat.trend}
                    </span>
                    <span>{stat.trendLabel}</span>
                  </div>
                </div>
                <div className={`p-2 sm:p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// ============================================================================
// FILTERS
// ============================================================================

function Filters({ locale = "fr" }: { locale?: TheoryCoursesLocale }) {
  const t = translations[locale];

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder={t.filters.searchPlaceholder}
                className="pl-9 h-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="h-10">
              <SelectValue placeholder={t.filters.category} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.filters.allCategories}</SelectItem>
              <SelectItem value="B">Catégorie B</SelectItem>
              <SelectItem value="A">Catégorie A</SelectItem>
              <SelectItem value="C">Catégorie C</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="h-10">
              <SelectValue placeholder={t.filters.status} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.filters.allStatuses}</SelectItem>
              <SelectItem value="scheduled">{t.status.scheduled}</SelectItem>
              <SelectItem value="in_progress">
                {t.status.in_progress}
              </SelectItem>
              <SelectItem value="completed">{t.status.completed}</SelectItem>
              <SelectItem value="canceled">{t.status.canceled}</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Filter */}
          <Select defaultValue="all">
            <SelectTrigger className="h-10">
              <SelectValue placeholder={t.filters.period} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.filters.allPeriods}</SelectItem>
              <SelectItem value="today">{t.filters.today}</SelectItem>
              <SelectItem value="week">{t.filters.thisWeek}</SelectItem>
              <SelectItem value="month">{t.filters.thisMonth}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// TABLE VIEW
// ============================================================================

function TableView({
  courses,
  locale = "fr",
}: {
  courses: TheoryCourse[];
  locale?: TheoryCoursesLocale;
}) {
  const t = translations[locale];

  const getStatusBadge = (status: TheoryCourse["status"]) => {
    const variants = {
      scheduled:
        "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
      in_progress:
        "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
      completed:
        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      canceled: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    };

    return (
      <Badge variant="secondary" className={variants[status]}>
        {t.status[status]}
      </Badge>
    );
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.table.title}</TableHead>
                <TableHead>{t.table.dateTime}</TableHead>
                <TableHead>{t.table.category}</TableHead>
                <TableHead>{t.table.room}</TableHead>
                <TableHead>{t.table.instructor}</TableHead>
                <TableHead>{t.table.participants}</TableHead>
                <TableHead>{t.table.status}</TableHead>
                <TableHead className="text-right">{t.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    <Link
                      to={`/theory-courses/${course.id}`}
                      className="hover:underline"
                    >
                      {course.topic}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm">
                        {new Date(course.startDate).toLocaleDateString(locale)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {course.startTime} - {course.endTime}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {course.categories?.map((cat) => (
                        <Badge key={cat} variant="outline">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPinIcon className="h-3 w-3 text-muted-foreground" />

                      {course.room.number}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <UserIcon className="h-3 w-3 text-muted-foreground" />
                      {course.instructor.firstName} {course.instructor.lastName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <UsersIcon className="h-3 w-3 text-muted-foreground" />

                      <span className="text-sm">
                        {course.enrolled}/{course.capacity}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(course.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/theory-courses/${course.id}`}>
                            <EyeIcon className="mr-2 h-4 w-4" />

                            {t.actions.viewDetails}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlusIcon className="mr-2 h-4 w-4" />

                          {t.actions.enrollStudent}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                          <EditIcon className="mr-2 h-4 w-4" />

                          {t.actions.edit}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <TrashIcon className="mr-2 h-4 w-4" />

                          {t.actions.cancel}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// CARDS VIEW
// ============================================================================

function CardsView({
  courses,
  locale = "fr",
}: {
  courses: TheoryCourse[];
  locale?: TheoryCoursesLocale;
}) {
  const t = translations[locale];

  const getStatusBadge = (status: TheoryCourse["status"]) => {
    const variants = {
      scheduled:
        "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
      in_progress:
        "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
      completed:
        "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
      canceled: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
    };

    return (
      <Badge variant="secondary" className={variants[status]}>
        {t.status[status]}
      </Badge>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base sm:text-lg line-clamp-2">
                <Link
                  to={`/theory-courses/${course.id}`}
                  className="hover:underline"
                >
                  {course.topic}
                </Link>
              </CardTitle>
              {getStatusBadge(course.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Date & Time */}
            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />

              <span>
                {new Date(course.startDate).toLocaleDateString(locale)}
              </span>
              <ClockIcon className="h-4 w-4 text-muted-foreground ml-2" />

              <span>
                {course.startTime} - {course.endTime}
              </span>
            </div>

            {/* Category */}
            <div className="flex flex-wrap gap-1">
              {course.categories?.map((cat) => (
                <Badge key={cat} variant="outline">
                  {cat}
                </Badge>
              ))}
            </div>

            {/* Room & Instructor */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-muted-foreground" />

                <span>{course.room.number}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />

                <span>
                  {course.instructor.firstName} {course.instructor.lastName}
                </span>
              </div>
            </div>

            {/* Participants */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-2 text-sm">
                <UsersIcon className="h-4 w-4 text-muted-foreground" />

                <span>
                  {course.enrolled}/{course.capacity} {t.participants}
                </span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/theory-courses/${course.id}`}>
                    <EyeIcon className="h-4 w-4" />
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <UserPlusIcon className="mr-2 h-4 w-4" />

                      {t.actions.enrollStudent}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <EditIcon className="mr-2 h-4 w-4" />

                      {t.actions.edit}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="text-destructive">
                      <TrashIcon className="mr-2 h-4 w-4" />

                      {t.actions.cancel}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

export function TheoryCoursesListPage({
  locale = "fr",
}: TheoryCoursesListPageProps) {
  const t = translations[locale];
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [showCreateWizard, setShowCreateWizard] = useState(false);

  // Handler pour créer un nouveau cours
  const handleCreateCourse = () => {
    setShowCreateWizard(true);
  };

  // Handler après création réussie
  const handleCourseCreated = (courseId: string) => {
    console.log("Cours créé avec succès:", courseId);
    // Dans une vraie application, on rechargerait la liste des cours
    // ou on naviguerait vers la page de détail du nouveau cours
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
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            <Button
              variant={viewMode === "table" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              <LayoutListIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "cards" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("cards")}
            >
              <LayoutGridIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Create Button */}
          <Button onClick={handleCreateCourse}>
            <PlusIcon className="mr-2 h-4 w-4" />

            {t.actions.createCourse}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <StatsCards locale={locale} />

      {/* Filters */}
      <Filters locale={locale} />

      {/* Content */}
      {viewMode === "table" ? (
        <TableView courses={mockTheoryCourses} locale={locale} />
      ) : (
        <CardsView courses={mockTheoryCourses} locale={locale} />
      )}

      {/* Create Course Wizard */}
      <CreateTheoryCourseWizard
        open={showCreateWizard}
        onOpenChange={setShowCreateWizard}
        locale={locale}
        onSuccess={handleCourseCreated}
      />
    </div>
  );
}
