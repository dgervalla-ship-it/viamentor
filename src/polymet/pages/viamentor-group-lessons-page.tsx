/**
 * VIAMENTOR - Group Lessons Page
 * Page gestion cours collectifs avec stats, filtres, table/cards toggle et CRUD
 */

"use client";

import { useState } from "react";
import {
  Users,
  Calendar,
  Clock,
  MapPin,
  Plus,
  Search,
  Filter,
  Download,
  Grid3x3,
  List,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  UserPlus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

// ============================================================================
// TYPES
// ============================================================================

interface GroupLessonsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

type GroupLessonStatus = "scheduled" | "ongoing" | "completed" | "cancelled";
type ViewMode = "table" | "grid";

interface GroupLesson {
  id: string;
  title: string;
  type: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  location: string;
  capacity: number;
  enrolled: number;
  status: GroupLessonStatus;
  price: number;
  category: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockGroupLessons: GroupLesson[] = [
  {
    id: "1",
    title: "Conduite défensive - Niveau 1",
    type: "Théorie",
    instructor: {
      id: "i1",
      name: "Jean Dupont",
      avatar: "https://github.com/yusufhilmi.png",
    },
    date: new Date(2025, 0, 25),
    startTime: "09:00",
    endTime: "12:00",
    duration: 180,
    location: "Salle A - Bâtiment principal",
    capacity: 15,
    enrolled: 12,
    status: "scheduled",
    price: 120,
    category: "B",
  },
  {
    id: "2",
    title: "Code de la route - Session intensive",
    type: "Théorie",
    instructor: {
      id: "i2",
      name: "Marie Martin",
      avatar: "https://github.com/kdrnp.png",
    },
    date: new Date(2025, 0, 22),
    startTime: "14:00",
    endTime: "17:00",
    duration: 180,
    location: "Salle B - Bâtiment principal",
    capacity: 20,
    enrolled: 20,
    status: "ongoing",
    price: 150,
    category: "B",
  },
  {
    id: "3",
    title: "Manœuvres en groupe",
    type: "Pratique",
    instructor: {
      id: "i3",
      name: "Pierre Bernard",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    date: new Date(2025, 0, 20),
    startTime: "10:00",
    endTime: "12:00",
    duration: 120,
    location: "Parking école",
    capacity: 8,
    enrolled: 8,
    status: "completed",
    price: 80,
    category: "B",
  },
  {
    id: "4",
    title: "Premiers secours routiers",
    type: "Théorie",
    instructor: {
      id: "i1",
      name: "Jean Dupont",
      avatar: "https://github.com/yusufhilmi.png",
    },
    date: new Date(2025, 0, 28),
    startTime: "13:00",
    endTime: "16:00",
    duration: 180,
    location: "Salle C - Bâtiment annexe",
    capacity: 12,
    enrolled: 5,
    status: "scheduled",
    price: 100,
    category: "Tous",
  },
];

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Cours Collectifs",
    description: "Gestion des cours en groupe et sessions de formation",
    stats: {
      total: "Total cours",
      scheduled: "Planifiés",
      ongoing: "En cours",
      completed: "Terminés",
    },
    filters: {
      search: "Rechercher un cours...",
      status: "Statut",
      type: "Type",
      category: "Catégorie",
      all: "Tous",
    },
    actions: {
      create: "Nouveau cours",
      export: "Exporter",
      refresh: "Actualiser",
    },
    table: {
      title: "Titre",
      instructor: "Moniteur",
      date: "Date",
      time: "Horaire",
      location: "Lieu",
      participants: "Participants",
      status: "Statut",
      actions: "Actions",
    },
    status: {
      scheduled: "Planifié",
      ongoing: "En cours",
      completed: "Terminé",
      cancelled: "Annulé",
    },
    menu: {
      edit: "Modifier",
      duplicate: "Dupliquer",
      addParticipants: "Ajouter participants",
      cancel: "Annuler le cours",
      delete: "Supprimer",
    },
  },
  de: {
    title: "Gruppenkurse",
    description: "Verwaltung von Gruppenkursen und Schulungen",
    stats: {
      total: "Gesamt Kurse",
      scheduled: "Geplant",
      ongoing: "Laufend",
      completed: "Abgeschlossen",
    },
    filters: {
      search: "Kurs suchen...",
      status: "Status",
      type: "Typ",
      category: "Kategorie",
      all: "Alle",
    },
    actions: {
      create: "Neuer Kurs",
      export: "Exportieren",
      refresh: "Aktualisieren",
    },
    table: {
      title: "Titel",
      instructor: "Fahrlehrer",
      date: "Datum",
      time: "Uhrzeit",
      location: "Ort",
      participants: "Teilnehmer",
      status: "Status",
      actions: "Aktionen",
    },
    status: {
      scheduled: "Geplant",
      ongoing: "Laufend",
      completed: "Abgeschlossen",
      cancelled: "Abgesagt",
    },
    menu: {
      edit: "Bearbeiten",
      duplicate: "Duplizieren",
      addParticipants: "Teilnehmer hinzufügen",
      cancel: "Kurs absagen",
      delete: "Löschen",
    },
  },
  it: {
    title: "Corsi Collettivi",
    description: "Gestione corsi di gruppo e sessioni di formazione",
    stats: {
      total: "Totale corsi",
      scheduled: "Pianificati",
      ongoing: "In corso",
      completed: "Completati",
    },
    filters: {
      search: "Cerca corso...",
      status: "Stato",
      type: "Tipo",
      category: "Categoria",
      all: "Tutti",
    },
    actions: {
      create: "Nuovo corso",
      export: "Esporta",
      refresh: "Aggiorna",
    },
    table: {
      title: "Titolo",
      instructor: "Istruttore",
      date: "Data",
      time: "Orario",
      location: "Luogo",
      participants: "Partecipanti",
      status: "Stato",
      actions: "Azioni",
    },
    status: {
      scheduled: "Pianificato",
      ongoing: "In corso",
      completed: "Completato",
      cancelled: "Annullato",
    },
    menu: {
      edit: "Modifica",
      duplicate: "Duplica",
      addParticipants: "Aggiungi partecipanti",
      cancel: "Annulla corso",
      delete: "Elimina",
    },
  },
  en: {
    title: "Group Lessons",
    description: "Management of group courses and training sessions",
    stats: {
      total: "Total courses",
      scheduled: "Scheduled",
      ongoing: "Ongoing",
      completed: "Completed",
    },
    filters: {
      search: "Search course...",
      status: "Status",
      type: "Type",
      category: "Category",
      all: "All",
    },
    actions: {
      create: "New course",
      export: "Export",
      refresh: "Refresh",
    },
    table: {
      title: "Title",
      instructor: "Instructor",
      date: "Date",
      time: "Time",
      location: "Location",
      participants: "Participants",
      status: "Status",
      actions: "Actions",
    },
    status: {
      scheduled: "Scheduled",
      ongoing: "Ongoing",
      completed: "Completed",
      cancelled: "Cancelled",
    },
    menu: {
      edit: "Edit",
      duplicate: "Duplicate",
      addParticipants: "Add participants",
      cancel: "Cancel course",
      delete: "Delete",
    },
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const getStatusColor = (status: GroupLessonStatus) => {
  switch (status) {
    case "scheduled":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "ongoing":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "completed":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "cancelled":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: GroupLessonStatus) => {
  switch (status) {
    case "scheduled":
      return Clock;
    case "ongoing":
      return AlertCircle;
    case "completed":
      return CheckCircle2;
    case "cancelled":
      return XCircle;
    default:
      return Clock;
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

// ============================================================================
// COMPONENT
// ============================================================================

export function GroupLessonsPage({ locale = "fr" }: GroupLessonsPageProps) {
  const t = translations[locale];
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Stats calculation
  const stats = {
    total: mockGroupLessons.length,
    scheduled: mockGroupLessons.filter((l) => l.status === "scheduled").length,
    ongoing: mockGroupLessons.filter((l) => l.status === "ongoing").length,
    completed: mockGroupLessons.filter((l) => l.status === "completed").length,
  };

  // Filtered lessons
  const filteredLessons = mockGroupLessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || lesson.status === statusFilter;
    const matchesType = typeFilter === "all" || lesson.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />

            {t.actions.export}
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />

            {t.actions.create}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.total}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.scheduled}
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {stats.scheduled}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.ongoing}
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              {stats.ongoing}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.completed}
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {stats.completed}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder={t.filters.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t.filters.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.all}</SelectItem>
                <SelectItem value="scheduled">{t.status.scheduled}</SelectItem>
                <SelectItem value="ongoing">{t.status.ongoing}</SelectItem>
                <SelectItem value="completed">{t.status.completed}</SelectItem>
                <SelectItem value="cancelled">{t.status.cancelled}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t.filters.type} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.all}</SelectItem>
                <SelectItem value="Théorie">Théorie</SelectItem>
                <SelectItem value="Pratique">Pratique</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("table")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table View */}
      {viewMode === "table" && (
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.table.title}</TableHead>
                  <TableHead>{t.table.instructor}</TableHead>
                  <TableHead>{t.table.date}</TableHead>
                  <TableHead>{t.table.time}</TableHead>
                  <TableHead>{t.table.location}</TableHead>
                  <TableHead>{t.table.participants}</TableHead>
                  <TableHead>{t.table.status}</TableHead>
                  <TableHead className="text-right">
                    {t.table.actions}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLessons.map((lesson) => {
                  const StatusIcon = getStatusIcon(lesson.status);
                  const fillPercentage =
                    (lesson.enrolled / lesson.capacity) * 100;

                  return (
                    <TableRow key={lesson.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{lesson.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {lesson.type} • {lesson.category}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={lesson.instructor.avatar} />

                            <AvatarFallback>
                              {lesson.instructor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">
                            {lesson.instructor.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />

                          {formatDate(lesson.date)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {lesson.startTime} - {lesson.endTime}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {lesson.duration} min
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />

                          <span className="text-sm">{lesson.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            {lesson.enrolled}/{lesson.capacity}
                          </div>
                          <Progress value={fillPercentage} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusColor(lesson.status)}
                        >
                          <StatusIcon className="h-3 w-3 mr-1" />

                          {t.status[lesson.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />

                              {t.menu.edit}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />

                              {t.menu.duplicate}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserPlus className="h-4 w-4 mr-2" />

                              {t.menu.addParticipants}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem className="text-destructive">
                              <XCircle className="h-4 w-4 mr-2" />

                              {t.menu.cancel}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />

                              {t.menu.delete}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredLessons.map((lesson) => {
            const StatusIcon = getStatusIcon(lesson.status);
            const fillPercentage = (lesson.enrolled / lesson.capacity) * 100;

            return (
              <Card key={lesson.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {lesson.type} • {lesson.category}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />

                          {t.menu.edit}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />

                          {t.menu.duplicate}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserPlus className="h-4 w-4 mr-2" />

                          {t.menu.addParticipants}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-destructive">
                          <XCircle className="h-4 w-4 mr-2" />

                          {t.menu.cancel}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />

                          {t.menu.delete}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={lesson.instructor.avatar} />

                      <AvatarFallback>
                        {lesson.instructor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {lesson.instructor.name}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />

                      {formatDate(lesson.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {lesson.startTime} - {lesson.endTime} ({lesson.duration}{" "}
                      min)
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />

                      {lesson.location}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Participants
                      </span>
                      <span className="font-medium">
                        {lesson.enrolled}/{lesson.capacity}
                      </span>
                    </div>
                    <Progress value={fillPercentage} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <Badge
                      variant="outline"
                      className={getStatusColor(lesson.status)}
                    >
                      <StatusIcon className="h-3 w-3 mr-1" />

                      {t.status[lesson.status]}
                    </Badge>
                    <span className="text-sm font-medium">
                      CHF {lesson.price}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GroupLessonsPage;
