// ============================================================================
// VIAMENTOR - Events Preview Table
// DataTable virtualisée pour preview événements ICS
// ============================================================================

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  SearchIcon,
  RepeatIcon,
  EyeIcon,
  EditIcon,
  XIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  ClockIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

type EventsLocale = "fr" | "de" | "it" | "en";

interface ParsedEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  description?: string;
  attendees: string[];
  organizer?: string;
  recurrence?: string;
  status: "new" | "duplicate" | "conflict";
  selected: boolean;
}

interface EventsPreviewTableProps {
  events: ParsedEvent[];
  locale?: EventsLocale;
  onEventsChange?: (events: ParsedEvent[]) => void;
}

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    title: "Événements à importer",
    description: "Sélectionnez les événements à importer",
    search: "Rechercher...",
    filters: {
      all: "Tous",
      new: "Nouveaux uniquement",
      conflicts: "Avec conflits",
      status: "Statut",
    },
    columns: {
      select: "Sélectionner",
      title: "Titre",
      startDate: "Date début",
      endDate: "Date fin",
      duration: "Durée",
      location: "Lieu",
      attendees: "Participants",
      recurrence: "Récurrence",
      status: "Statut",
      actions: "Actions",
    },
    status: {
      new: "Nouveau",
      duplicate: "Doublon",
      conflict: "Conflit",
    },
    recurrence: {
      daily: "Quotidien",
      weekly: "Hebdomadaire",
      monthly: "Mensuel",
      yearly: "Annuel",
    },
    actions: {
      view: "Voir détail",
      edit: "Modifier",
      exclude: "Exclure",
      selectAll: "Tout sélectionner",
      deselectAll: "Tout désélectionner",
    },
    detail: {
      title: "Détail de l'événement",
      description: "Description",
      organizer: "Organisateur",
      noDescription: "Aucune description",
    },
    stats: {
      total: "Total",
      selected: "Sélectionnés",
      new: "Nouveaux",
      duplicates: "Doublons",
      conflicts: "Conflits",
    },
  },
  de: {
    title: "Zu importierende Ereignisse",
    description: "Wählen Sie die zu importierenden Ereignisse aus",
    search: "Suchen...",
    filters: {
      all: "Alle",
      new: "Nur neue",
      conflicts: "Mit Konflikten",
      status: "Status",
    },
    columns: {
      select: "Auswählen",
      title: "Titel",
      startDate: "Startdatum",
      endDate: "Enddatum",
      duration: "Dauer",
      location: "Ort",
      attendees: "Teilnehmer",
      recurrence: "Wiederholung",
      status: "Status",
      actions: "Aktionen",
    },
    status: {
      new: "Neu",
      duplicate: "Duplikat",
      conflict: "Konflikt",
    },
    recurrence: {
      daily: "Täglich",
      weekly: "Wöchentlich",
      monthly: "Monatlich",
      yearly: "Jährlich",
    },
    actions: {
      view: "Details anzeigen",
      edit: "Bearbeiten",
      exclude: "Ausschließen",
      selectAll: "Alle auswählen",
      deselectAll: "Alle abwählen",
    },
    detail: {
      title: "Ereignisdetails",
      description: "Beschreibung",
      organizer: "Organisator",
      noDescription: "Keine Beschreibung",
    },
    stats: {
      total: "Gesamt",
      selected: "Ausgewählt",
      new: "Neu",
      duplicates: "Duplikate",
      conflicts: "Konflikte",
    },
  },
  it: {
    title: "Eventi da importare",
    description: "Seleziona gli eventi da importare",
    search: "Cerca...",
    filters: {
      all: "Tutti",
      new: "Solo nuovi",
      conflicts: "Con conflitti",
      status: "Stato",
    },
    columns: {
      select: "Seleziona",
      title: "Titolo",
      startDate: "Data inizio",
      endDate: "Data fine",
      duration: "Durata",
      location: "Luogo",
      attendees: "Partecipanti",
      recurrence: "Ricorrenza",
      status: "Stato",
      actions: "Azioni",
    },
    status: {
      new: "Nuovo",
      duplicate: "Duplicato",
      conflict: "Conflitto",
    },
    recurrence: {
      daily: "Giornaliero",
      weekly: "Settimanale",
      monthly: "Mensile",
      yearly: "Annuale",
    },
    actions: {
      view: "Vedi dettagli",
      edit: "Modifica",
      exclude: "Escludi",
      selectAll: "Seleziona tutto",
      deselectAll: "Deseleziona tutto",
    },
    detail: {
      title: "Dettagli evento",
      description: "Descrizione",
      organizer: "Organizzatore",
      noDescription: "Nessuna descrizione",
    },
    stats: {
      total: "Totale",
      selected: "Selezionati",
      new: "Nuovi",
      duplicates: "Duplicati",
      conflicts: "Conflitti",
    },
  },
  en: {
    title: "Events to import",
    description: "Select events to import",
    search: "Search...",
    filters: {
      all: "All",
      new: "New only",
      conflicts: "With conflicts",
      status: "Status",
    },
    columns: {
      select: "Select",
      title: "Title",
      startDate: "Start date",
      endDate: "End date",
      duration: "Duration",
      location: "Location",
      attendees: "Attendees",
      recurrence: "Recurrence",
      status: "Status",
      actions: "Actions",
    },
    status: {
      new: "New",
      duplicate: "Duplicate",
      conflict: "Conflict",
    },
    recurrence: {
      daily: "Daily",
      weekly: "Weekly",
      monthly: "Monthly",
      yearly: "Yearly",
    },
    actions: {
      view: "View details",
      edit: "Edit",
      exclude: "Exclude",
      selectAll: "Select all",
      deselectAll: "Deselect all",
    },
    detail: {
      title: "Event details",
      description: "Description",
      organizer: "Organizer",
      noDescription: "No description",
    },
    stats: {
      total: "Total",
      selected: "Selected",
      new: "New",
      duplicates: "Duplicates",
      conflicts: "Conflicts",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function EventsPreviewTable({
  events: initialEvents,
  locale = "fr",
  onEventsChange,
}: EventsPreviewTableProps) {
  const t = translations[locale];
  const [events, setEvents] = useState<ParsedEvent[]>(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "conflicts">(
    "all"
  );
  const [selectedEvent, setSelectedEvent] = useState<ParsedEvent | null>(null);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getDuration = (start: Date, end: Date) => {
    const minutes = Math.round((end.getTime() - start.getTime()) / 60000);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h${remainingMinutes}` : `${hours}h`;
  };

  const handleToggleEvent = (eventId: string) => {
    const updatedEvents = events.map((e) =>
      e.id === eventId ? { ...e, selected: !e.selected } : e
    );
    setEvents(updatedEvents);
    onEventsChange?.(updatedEvents);
  };

  const handleSelectAll = () => {
    const updatedEvents = events.map((e) => ({ ...e, selected: true }));
    setEvents(updatedEvents);
    onEventsChange?.(updatedEvents);
  };

  const handleDeselectAll = () => {
    const updatedEvents = events.map((e) => ({ ...e, selected: false }));
    setEvents(updatedEvents);
    onEventsChange?.(updatedEvents);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "new" && event.status === "new") ||
      (statusFilter === "conflicts" && event.status === "conflict");
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: events.length,
    selected: events.filter((e) => e.selected).length,
    new: events.filter((e) => e.status === "new").length,
    duplicates: events.filter((e) => e.status === "duplicate").length,
    conflicts: events.filter((e) => e.status === "conflict").length,
  };

  const getStatusBadge = (status: ParsedEvent["status"]) => {
    switch (status) {
      case "new":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {t.status.new}
          </Badge>
        );

      case "duplicate":
        return (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            {t.status.duplicate}
          </Badge>
        );

      case "conflict":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            {t.status.conflict}
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t.title}</CardTitle>
            <CardDescription>{t.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              {t.actions.selectAll}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDeselectAll}>
              {t.actions.deselectAll}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <p className="text-lg font-bold text-foreground">{stats.total}</p>
            <p className="text-xs text-muted-foreground">{t.stats.total}</p>
          </div>
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <p className="text-lg font-bold text-primary">{stats.selected}</p>
            <p className="text-xs text-primary">{t.stats.selected}</p>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {stats.new}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              {t.stats.new}
            </p>
          </div>
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {stats.duplicates}
            </p>
            <p className="text-xs text-orange-600 dark:text-orange-400">
              {t.stats.duplicates}
            </p>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-950 rounded-lg">
            <p className="text-lg font-bold text-red-600 dark:text-red-400">
              {stats.conflicts}
            </p>
            <p className="text-xs text-red-600 dark:text-red-400">
              {t.stats.conflicts}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(v: any) => setStatusFilter(v)}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.filters.all}</SelectItem>
              <SelectItem value="new">{t.filters.new}</SelectItem>
              <SelectItem value="conflicts">{t.filters.conflicts}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">{t.columns.select}</TableHead>
                <TableHead>{t.columns.title}</TableHead>
                <TableHead>{t.columns.startDate}</TableHead>
                <TableHead>{t.columns.duration}</TableHead>
                <TableHead>{t.columns.location}</TableHead>
                <TableHead>{t.columns.attendees}</TableHead>
                <TableHead>{t.columns.status}</TableHead>
                <TableHead className="w-32">{t.columns.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <Checkbox
                      checked={event.selected}
                      onCheckedChange={() => handleToggleEvent(event.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {event.title}
                      {event.recurrence && (
                        <RepeatIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(event.startDate)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {getDuration(event.startDate, event.endDate)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {event.location || "-"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {event.attendees.length}{" "}
                    {event.attendees.length > 1 ? "personnes" : "personne"}
                  </TableCell>
                  <TableCell>{getStatusBadge(event.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedEvent(event)}
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{t.detail.title}</DialogTitle>
                            <DialogDescription>{event.title}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <CalendarIcon className="h-4 w-4 text-muted-foreground mt-0.5" />

                              <div className="flex-1">
                                <p className="text-sm font-medium">Date</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(event.startDate)} -{" "}
                                  {formatDate(event.endDate)}
                                </p>
                              </div>
                            </div>
                            {event.location && (
                              <div className="flex items-start gap-3">
                                <MapPinIcon className="h-4 w-4 text-muted-foreground mt-0.5" />

                                <div className="flex-1">
                                  <p className="text-sm font-medium">Lieu</p>
                                  <p className="text-sm text-muted-foreground">
                                    {event.location}
                                  </p>
                                </div>
                              </div>
                            )}
                            <div className="flex items-start gap-3">
                              <UsersIcon className="h-4 w-4 text-muted-foreground mt-0.5" />

                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  Participants
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {event.attendees.join(", ")}
                                </p>
                              </div>
                            </div>
                            {event.description && (
                              <div>
                                <p className="text-sm font-medium mb-1">
                                  {t.detail.description}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {event.description}
                                </p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm">
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
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
