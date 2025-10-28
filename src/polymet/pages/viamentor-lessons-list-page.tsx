/**
 * VIAMENTOR - Lessons List Page
 * Page principale liste leçons avec filtres avancés, stats, table/grid et bulk actions
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  PlusIcon,
  LayoutGridIcon,
  LayoutListIcon,
  MoreVerticalIcon,
  ClockIcon,
  CheckCircle2Icon,
  XCircleIcon,
  PlayCircleIcon,
  UserIcon,
  CarIcon,
  MapPinIcon,
} from "lucide-react";
import {
  MOCK_LESSONS,
  type Lesson,
  type LessonStatus,
} from "@/polymet/data/viamentor-lessons-data";
import {
  getLessonsTranslations,
  type LessonsLocale,
} from "@/polymet/data/viamentor-lessons-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface LessonsListPageProps {
  locale?: LessonsLocale;
}

// ============================================================================
// STATS CARDS
// ============================================================================

function StatsCards({
  lessons,
  locale,
}: {
  lessons: Lesson[];
  locale: LessonsLocale;
}) {
  const t = getLessonsTranslations(locale);

  const stats = {
    scheduled: lessons.filter((l) => l.status === "scheduled").length,
    inProgress: lessons.filter((l) => l.status === "in_progress").length,
    completed: lessons.filter((l) => l.status === "completed").length,
    canceled: lessons.filter((l) => l.status === "canceled").length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {t.status.scheduled}
            </p>
            <p className="text-2xl font-bold">{stats.scheduled}</p>
          </div>
          <ClockIcon className="h-8 w-8 text-blue-500" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {t.status.in_progress}
            </p>
            <p className="text-2xl font-bold">{stats.inProgress}</p>
          </div>
          <PlayCircleIcon className="h-8 w-8 text-orange-500" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {t.status.completed}
            </p>
            <p className="text-2xl font-bold">{stats.completed}</p>
          </div>
          <CheckCircle2Icon className="h-8 w-8 text-green-500" />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{t.status.canceled}</p>
            <p className="text-2xl font-bold">{stats.canceled}</p>
          </div>
          <XCircleIcon className="h-8 w-8 text-red-500" />
        </div>
      </Card>
    </div>
  );
}

// ============================================================================
// LESSON CARD (GRID VIEW)
// ============================================================================

function LessonCard({
  lesson,
  locale,
}: {
  lesson: Lesson;
  locale: LessonsLocale;
}) {
  const t = getLessonsTranslations(locale);

  const statusColors = {
    scheduled: "bg-blue-500",
    in_progress: "bg-orange-500",
    completed: "bg-green-500",
    canceled: "bg-red-500",
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${statusColors[lesson.status]}`}
          />

          <Badge variant="secondary">{lesson.category}</Badge>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`/lessons/${lesson.id}`}>{t.actions.edit}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>{t.actions.viewStudent}</DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive">
              {t.actions.cancel}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />

          <span>{new Date(lesson.startDate).toLocaleDateString(locale)}</span>
          <span className="text-muted-foreground">
            {new Date(lesson.startDate).toLocaleTimeString(locale, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <UserIcon className="h-4 w-4 text-muted-foreground" />

          <span className="font-medium">{lesson.studentName}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <UserIcon className="h-4 w-4 text-muted-foreground" />

          <span className="text-muted-foreground">{lesson.instructorName}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <CarIcon className="h-4 w-4 text-muted-foreground" />

          <span className="text-muted-foreground">{lesson.vehicleModel}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPinIcon className="h-4 w-4 text-muted-foreground" />

          <span className="text-muted-foreground truncate">
            {lesson.meetingPoint.name}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
        <span className="text-sm font-medium">{lesson.price} CHF</span>
        <Badge variant={lesson.isPaid ? "default" : "destructive"}>
          {lesson.isPaid ? t.details.paid : t.details.unpaid}
        </Badge>
      </div>
    </Card>
  );
}

// ============================================================================
// LESSON ROW (TABLE VIEW)
// ============================================================================

function LessonRow({
  lesson,
  locale,
}: {
  lesson: Lesson;
  locale: LessonsLocale;
}) {
  const t = getLessonsTranslations(locale);

  const statusColors = {
    scheduled: "text-blue-500",
    in_progress: "text-orange-500",
    completed: "text-green-500",
    canceled: "text-red-500",
  };

  return (
    <tr className="border-b border-border hover:bg-muted/50">
      <td className="p-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${statusColors[lesson.status].replace("text-", "bg-")}`}
          />

          <span className="font-medium">{lesson.studentName}</span>
        </div>
      </td>
      <td className="p-4">
        <div className="text-sm">
          <div>{new Date(lesson.startDate).toLocaleDateString(locale)}</div>
          <div className="text-muted-foreground">
            {new Date(lesson.startDate).toLocaleTimeString(locale, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </td>
      <td className="p-4">
        <span className="text-sm">{lesson.instructorName}</span>
      </td>
      <td className="p-4">
        <Badge variant="secondary">{lesson.category}</Badge>
      </td>
      <td className="p-4">
        <span className="text-sm">{lesson.vehicleModel}</span>
      </td>
      <td className="p-4">
        <span className={`text-sm font-medium ${statusColors[lesson.status]}`}>
          {t.status[lesson.status]}
        </span>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{lesson.price} CHF</span>
          <Badge
            variant={lesson.isPaid ? "default" : "destructive"}
            className="text-xs"
          >
            {lesson.isPaid ? t.details.paid : t.details.unpaid}
          </Badge>
        </div>
      </td>
      <td className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`/lessons/${lesson.id}`}>{t.actions.edit}</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>{t.actions.viewStudent}</DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive">
              {t.actions.cancel}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function LessonsListPage({ locale = "fr" }: LessonsListPageProps) {
  const t = getLessonsTranslations(locale);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [statusFilter, setStatusFilter] = useState<LessonStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter lessons
  const filteredLessons = MOCK_LESSONS.filter((lesson) => {
    const matchesStatus =
      statusFilter === "all" || lesson.status === statusFilter;
    const matchesSearch =
      searchQuery === "" ||
      lesson.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leçons</h1>
          <p className="text-muted-foreground">
            Gérez toutes les leçons pratiques et théoriques
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to="/lessons/calendar">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendrier
            </Link>
          </Button>
          <Button asChild>
            <Link to="/lessons/book">
              <PlusIcon className="h-4 w-4 mr-2" />
              Nouvelle leçon
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <StatsCards lessons={MOCK_LESSONS} locale={locale} />

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Rechercher élève, moniteur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Tabs
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as any)}
            >
              <TabsList>
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="scheduled">Planifiées</TabsTrigger>
                <TabsTrigger value="in_progress">En cours</TabsTrigger>
                <TabsTrigger value="completed">Terminées</TabsTrigger>
                <TabsTrigger value="canceled">Annulées</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filtres
            </Button>
            <Button variant="outline" size="sm">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export
            </Button>
            <div className="flex items-center border border-border rounded-md">
              <Button
                variant={viewMode === "table" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <LayoutListIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGridIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Content */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} locale={locale} />
          ))}
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="p-4 text-left text-sm font-medium">Élève</th>
                  <th className="p-4 text-left text-sm font-medium">
                    Date & Heure
                  </th>
                  <th className="p-4 text-left text-sm font-medium">
                    Moniteur
                  </th>
                  <th className="p-4 text-left text-sm font-medium">
                    Catégorie
                  </th>
                  <th className="p-4 text-left text-sm font-medium">
                    Véhicule
                  </th>
                  <th className="p-4 text-left text-sm font-medium">Statut</th>
                  <th className="p-4 text-left text-sm font-medium">Prix</th>
                  <th className="p-4 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLessons.map((lesson) => (
                  <LessonRow key={lesson.id} lesson={lesson} locale={locale} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {filteredLessons.length === 0 && (
        <Card className="p-12 text-center">
          <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />

          <h3 className="text-lg font-medium mb-2">Aucune leçon trouvée</h3>
          <p className="text-muted-foreground mb-4">
            Aucune leçon ne correspond à vos critères de recherche
          </p>
          <Button asChild>
            <Link to="/lessons/book">
              <PlusIcon className="h-4 w-4 mr-2" />
              Créer une leçon
            </Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
