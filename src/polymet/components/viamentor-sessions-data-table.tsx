/**
 * VIAMENTOR - Sessions DataTable Component
 * DataTable séances avec filtres avancés, colonnes détaillées et actions
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
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
  SearchIcon,
  MoreVerticalIcon,
  EyeIcon,
  EditIcon,
  CheckCircle2Icon,
  XCircleIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface SessionsDataTableProps {
  locale?: "fr" | "de" | "it" | "en";
  showFilters?: boolean;
  onSessionSelect?: (sessionId: string) => void;
}

interface CourseSession {
  id: string;
  date: string;
  time: string;
  category: {
    code: string;
    color: string;
  };
  type: string;
  part: string;
  location: string;
  instructor: {
    name: string;
    avatar: string;
  };
  participants: {
    current: number;
    max: number;
  };
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  attendance?: {
    present: number;
    total: number;
  };
}

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    filters: {
      search: "Rechercher...",
      searchButton: "Rechercher",
      reset: "Réinitialiser",
    },
    columns: {
      date: "Date",
      time: "Heure",
      category: "Catégorie",
      type: "Type",
      part: "Partie",
      location: "Lieu",
      instructor: "Moniteur",
      participants: "Participants",
      status: "Statut",
      attendance: "Présences",
      actions: "Actions",
    },
    status: {
      scheduled: "Planifiée",
      ongoing: "En cours",
      completed: "Terminée",
      cancelled: "Annulée",
    },
    actions: {
      view: "Voir détails",
      edit: "Modifier",
      validate: "Valider présences",
      cancel: "Annuler",
      delete: "Supprimer",
    },
    pagination: {
      previous: "Précédent",
      next: "Suivant",
      page: "Page",
      of: "sur",
    },
  },
  de: {
    filters: {
      search: "Suchen...",
      searchButton: "Suchen",
      reset: "Zurücksetzen",
    },
    columns: {
      date: "Datum",
      time: "Zeit",
      category: "Kategorie",
      type: "Typ",
      part: "Teil",
      location: "Standort",
      instructor: "Fahrlehrer",
      participants: "Teilnehmer",
      status: "Status",
      attendance: "Anwesenheit",
      actions: "Aktionen",
    },
    status: {
      scheduled: "Geplant",
      ongoing: "Laufend",
      completed: "Abgeschlossen",
      cancelled: "Abgesagt",
    },
    actions: {
      view: "Details anzeigen",
      edit: "Bearbeiten",
      validate: "Anwesenheit validieren",
      cancel: "Abbrechen",
      delete: "Löschen",
    },
    pagination: {
      previous: "Zurück",
      next: "Weiter",
      page: "Seite",
      of: "von",
    },
  },
  it: {
    filters: {
      search: "Cerca...",
      searchButton: "Cerca",
      reset: "Reimposta",
    },
    columns: {
      date: "Data",
      time: "Ora",
      category: "Categoria",
      type: "Tipo",
      part: "Parte",
      location: "Luogo",
      instructor: "Istruttore",
      participants: "Partecipanti",
      status: "Stato",
      attendance: "Presenze",
      actions: "Azioni",
    },
    status: {
      scheduled: "Pianificata",
      ongoing: "In corso",
      completed: "Completata",
      cancelled: "Annullata",
    },
    actions: {
      view: "Vedi dettagli",
      edit: "Modifica",
      validate: "Valida presenze",
      cancel: "Annulla",
      delete: "Elimina",
    },
    pagination: {
      previous: "Precedente",
      next: "Successivo",
      page: "Pagina",
      of: "di",
    },
  },
  en: {
    filters: {
      search: "Search...",
      searchButton: "Search",
      reset: "Reset",
    },
    columns: {
      date: "Date",
      time: "Time",
      category: "Category",
      type: "Type",
      part: "Part",
      location: "Location",
      instructor: "Instructor",
      participants: "Participants",
      status: "Status",
      attendance: "Attendance",
      actions: "Actions",
    },
    status: {
      scheduled: "Scheduled",
      ongoing: "Ongoing",
      completed: "Completed",
      cancelled: "Cancelled",
    },
    actions: {
      view: "View details",
      edit: "Edit",
      validate: "Validate attendance",
      cancel: "Cancel",
      delete: "Delete",
    },
    pagination: {
      previous: "Previous",
      next: "Next",
      page: "Page",
      of: "of",
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const mockSessions: CourseSession[] = [
  {
    id: "1",
    date: "05.10.2025",
    time: "18:30-20:30",
    category: { code: "CTC", color: "bg-blue-500" },
    type: "Cours semaine",
    part: "1/4",
    location: "Salle A - Lausanne",
    instructor: {
      name: "Jean Dupont",
      avatar: "https://github.com/yusufhilmi.png",
    },
    participants: { current: 12, max: 24 },
    status: "scheduled",
  },
  {
    id: "2",
    date: "06.10.2025",
    time: "19:00-21:00",
    category: { code: "CTC", color: "bg-blue-500" },
    type: "Cours semaine",
    part: "2/4",
    location: "Salle B - Genève",
    instructor: {
      name: "Marie Martin",
      avatar: "https://github.com/kdrnp.png",
    },
    participants: { current: 18, max: 20 },
    status: "ongoing",
  },
  {
    id: "3",
    date: "03.10.2025",
    time: "18:00-20:00",
    category: { code: "CTC", color: "bg-blue-500" },
    type: "Cours semaine",
    part: "1/4",
    location: "Salle A - Lausanne",
    instructor: {
      name: "Jean Dupont",
      avatar: "https://github.com/yusufhilmi.png",
    },
    participants: { current: 15, max: 24 },
    status: "completed",
    attendance: { present: 13, total: 15 },
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function SessionsDataTable({
  locale = "fr",
  showFilters = true,
  onSessionSelect,
}: SessionsDataTableProps) {
  const t = translations[locale];
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const getStatusBadge = (status: CourseSession["status"]) => {
    const variants = {
      scheduled: { variant: "secondary" as const, label: t.status.scheduled },
      ongoing: {
        variant: "default" as const,
        label: t.status.ongoing,
        className: "bg-green-500",
      },
      completed: {
        variant: "default" as const,
        label: t.status.completed,
        className: "bg-blue-500",
      },
      cancelled: { variant: "destructive" as const, label: t.status.cancelled },
    };
    const config = variants[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Filters Card */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Filtres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  placeholder={t.filters.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline">{t.filters.reset}</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* DataTable */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.columns.date}</TableHead>
                <TableHead>{t.columns.time}</TableHead>
                <TableHead>{t.columns.category}</TableHead>
                <TableHead>{t.columns.type}</TableHead>
                <TableHead>{t.columns.part}</TableHead>
                <TableHead>{t.columns.location}</TableHead>
                <TableHead>{t.columns.instructor}</TableHead>
                <TableHead>{t.columns.participants}</TableHead>
                <TableHead>{t.columns.status}</TableHead>
                <TableHead>{t.columns.attendance}</TableHead>
                <TableHead className="w-[50px]">{t.columns.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.date}</TableCell>
                  <TableCell>{session.time}</TableCell>
                  <TableCell>
                    <Badge className={session.category.color}>
                      {session.category.code}
                    </Badge>
                  </TableCell>
                  <TableCell>{session.type}</TableCell>
                  <TableCell>{session.part}</TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {session.location}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={session.instructor.avatar} />

                        <AvatarFallback>
                          {session.instructor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{session.instructor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {session.participants.current}/
                        {session.participants.max}
                      </div>
                      <Progress
                        value={
                          (session.participants.current /
                            session.participants.max) *
                          100
                        }
                        className="h-1"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(session.status)}</TableCell>
                  <TableCell>
                    {session.attendance && (
                      <span className="text-sm">
                        {session.attendance.present}/{session.attendance.total}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onSessionSelect?.(session.id)}
                        >
                          <EyeIcon className="h-4 w-4 mr-2" />

                          {t.actions.view}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <EditIcon className="h-4 w-4 mr-2" />

                          {t.actions.edit}
                        </DropdownMenuItem>
                        {session.status === "completed" && (
                          <DropdownMenuItem>
                            <CheckCircle2Icon className="h-4 w-4 mr-2" />

                            {t.actions.validate}
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-destructive">
                          <XCircleIcon className="h-4 w-4 mr-2" />

                          {t.actions.cancel}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <TrashIcon className="h-4 w-4 mr-2" />

                          {t.actions.delete}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {t.pagination.page} {currentPage} {t.pagination.of} 3
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="h-4 w-4 mr-1" />

            {t.pagination.previous}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            {t.pagination.next}
            <ChevronRightIcon className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
