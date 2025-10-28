/**
 * VIAMENTOR - Quick Create Modal
 * Modal création rapide cours avec aperçu séances générées
 */

"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  CheckCircle2Icon,
  AlertTriangleIcon,
  XCircleIcon,
  CalendarIcon,
} from "lucide-react";
import { CourseType } from "@/viamentor/data/viamentor-courses-types-data";
import { CalendarInstructor } from "@/viamentor/data/viamentor-courses-calendar-data";
import {
  CoursesDragDropService,
  DragDropSession,
  GeneratedSession,
} from "@/viamentor/data/viamentor-courses-drag-drop-service";

// ============================================================================
// TYPES
// ============================================================================

interface QuickCreateModalProps {
  open: boolean;
  type: CourseType | null;
  dropDate: Date | null;
  instructors: CalendarInstructor[];
  locations: { id: string; name: string }[];
  locale?: "fr" | "de" | "it" | "en";
  onClose: () => void;
  onCreate: (sessions: Partial<any>[]) => void;
}

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    title: "Nouveau cours",
    subtitle: "Séances créées automatiquement",
    startDate: "Date de début",
    startTime: "Heure de début",
    location: "Lieu",
    selectLocation: "Sélectionner un lieu",
    instructor: "Moniteur principal",
    selectInstructor: "Sélectionner un moniteur",
    maxParticipants: "Participants max",
    notes: "Notes",
    notesPlaceholder: "Groupe octobre...",
    preview: "Séances générées",
    sessionNumber: "N°",
    date: "Date",
    time: "Heure",
    conflicts: "Conflits",
    noConflicts: "Aucun conflit",
    create: "Créer",
    createSessions: "séances",
    cancel: "Annuler",
    days: {
      0: "Dim",
      1: "Lun",
      2: "Mar",
      3: "Mer",
      4: "Jeu",
      5: "Ven",
      6: "Sam",
    },
    conflictTypes: {
      instructor_busy: "Moniteur occupé",
      room_unavailable: "Salle indisponible",
      capacity_exceeded: "Capacité élevée",
    },
  },
  de: {
    title: "Neuer Kurs",
    subtitle: "Sitzungen automatisch erstellt",
    startDate: "Startdatum",
    startTime: "Startzeit",
    location: "Ort",
    selectLocation: "Ort auswählen",
    instructor: "Hauptlehrer",
    selectInstructor: "Lehrer auswählen",
    maxParticipants: "Max. Teilnehmer",
    notes: "Notizen",
    notesPlaceholder: "Gruppe Oktober...",
    preview: "Generierte Sitzungen",
    sessionNumber: "Nr.",
    date: "Datum",
    time: "Zeit",
    conflicts: "Konflikte",
    noConflicts: "Keine Konflikte",
    create: "Erstellen",
    createSessions: "Sitzungen",
    cancel: "Abbrechen",
    days: {
      0: "So",
      1: "Mo",
      2: "Di",
      3: "Mi",
      4: "Do",
      5: "Fr",
      6: "Sa",
    },
    conflictTypes: {
      instructor_busy: "Lehrer beschäftigt",
      room_unavailable: "Raum nicht verfügbar",
      capacity_exceeded: "Hohe Kapazität",
    },
  },
  it: {
    title: "Nuovo corso",
    subtitle: "Sessioni create automaticamente",
    startDate: "Data di inizio",
    startTime: "Ora di inizio",
    location: "Luogo",
    selectLocation: "Seleziona luogo",
    instructor: "Istruttore principale",
    selectInstructor: "Seleziona istruttore",
    maxParticipants: "Partecipanti max",
    notes: "Note",
    notesPlaceholder: "Gruppo ottobre...",
    preview: "Sessioni generate",
    sessionNumber: "N°",
    date: "Data",
    time: "Ora",
    conflicts: "Conflitti",
    noConflicts: "Nessun conflitto",
    create: "Crea",
    createSessions: "sessioni",
    cancel: "Annulla",
    days: {
      0: "Dom",
      1: "Lun",
      2: "Mar",
      3: "Mer",
      4: "Gio",
      5: "Ven",
      6: "Sab",
    },
    conflictTypes: {
      instructor_busy: "Istruttore occupato",
      room_unavailable: "Sala non disponibile",
      capacity_exceeded: "Capacità elevata",
    },
  },
  en: {
    title: "New course",
    subtitle: "Sessions created automatically",
    startDate: "Start date",
    startTime: "Start time",
    location: "Location",
    selectLocation: "Select location",
    instructor: "Main instructor",
    selectInstructor: "Select instructor",
    maxParticipants: "Max participants",
    notes: "Notes",
    notesPlaceholder: "October group...",
    preview: "Generated sessions",
    sessionNumber: "#",
    date: "Date",
    time: "Time",
    conflicts: "Conflicts",
    noConflicts: "No conflicts",
    create: "Create",
    createSessions: "sessions",
    cancel: "Cancel",
    days: {
      0: "Sun",
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat",
    },
    conflictTypes: {
      instructor_busy: "Instructor busy",
      room_unavailable: "Room unavailable",
      capacity_exceeded: "High capacity",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function QuickCreateModal({
  open,
  type,
  dropDate,
  instructors,
  locations,
  locale = "fr",
  onClose,
  onCreate,
}: QuickCreateModalProps) {
  const t = translations[locale];

  // Form state
  const [startDate, setStartDate] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [locationId, setLocationId] = React.useState("");
  const [instructorId, setInstructorId] = React.useState("");
  const [maxParticipants, setMaxParticipants] = React.useState("");
  const [notes, setNotes] = React.useState("");

  // Generated sessions
  const [sessions, setSessions] = React.useState<GeneratedSession[]>([]);

  // Initialize form
  React.useEffect(() => {
    if (open && type && dropDate) {
      setStartDate(dropDate.toISOString().split("T")[0]);
      setStartTime(type.schedule.defaultStartTime || "09:00");
      setMaxParticipants(String(type.capacity.default));
      setLocationId("");
      setInstructorId("");
      setNotes("");
    }
  }, [open, type, dropDate]);

  // Generate sessions when form changes
  React.useEffect(() => {
    if (!type || !startDate || !startTime || !instructorId || !locationId) {
      setSessions([]);
      return;
    }

    const session: DragDropSession = {
      type,
      startDate: new Date(startDate),
      startTime,
      locationId,
      instructorId,
      maxParticipants: Number(maxParticipants),
      notes,
    };

    const generated = CoursesDragDropService.generateSessions(
      session,
      instructors,
      []
    );
    setSessions(generated);
  }, [
    type,
    startDate,
    startTime,
    locationId,
    instructorId,
    maxParticipants,
    notes,
    instructors,
  ]);

  // Handle create
  const handleCreate = () => {
    if (!type || sessions.length === 0) return;

    const session: DragDropSession = {
      type,
      startDate: new Date(startDate),
      startTime,
      locationId,
      instructorId,
      maxParticipants: Number(maxParticipants),
      notes,
    };

    const events = CoursesDragDropService.createCalendarEvents(
      sessions,
      session
    );
    onCreate(events);
    onClose();
  };

  // Format date
  const formatDate = (date: Date) => {
    const day = t.days[date.getDay() as keyof typeof t.days];
    const dayNum = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day} ${dayNum}.${month}`;
  };

  // Check if can create
  const canCreate =
    startDate && startTime && locationId && instructorId && sessions.length > 0;
  const hasErrors = sessions.some((s) =>
    s.conflicts.some((c) => c.severity === "error")
  );

  if (!type || !dropDate) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {t.title} {type.name}
          </DialogTitle>
          <DialogDescription>
            <Alert className="mt-2">
              <CheckCircle2Icon className="h-4 w-4" />

              <AlertDescription>{t.subtitle}</AlertDescription>
            </Alert>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Form */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="startDate">{t.startDate}</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* Start Time */}
            <div className="space-y-2">
              <Label htmlFor="startTime">{t.startTime}</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">{t.location}</Label>
              <Select value={locationId} onValueChange={setLocationId}>
                <SelectTrigger id="location">
                  <SelectValue placeholder={t.selectLocation} />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc.id} value={loc.id}>
                      {loc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Instructor */}
            <div className="space-y-2">
              <Label htmlFor="instructor">{t.instructor}</Label>
              <Select value={instructorId} onValueChange={setInstructorId}>
                <SelectTrigger id="instructor">
                  <SelectValue placeholder={t.selectInstructor} />
                </SelectTrigger>
                <SelectContent>
                  {instructors.map((inst) => (
                    <SelectItem key={inst.id} value={inst.id}>
                      {inst.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Max Participants */}
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">{t.maxParticipants}</Label>
              <Input
                id="maxParticipants"
                type="number"
                min={type.capacity.min}
                max={type.capacity.max}
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="notes">{t.notes}</Label>
              <Textarea
                id="notes"
                placeholder={t.notesPlaceholder}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
              />
            </div>
          </div>

          {/* Preview Sessions */}
          {sessions.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />

                <h4 className="text-sm font-semibold">{t.preview}</h4>
                <Badge variant="secondary">{sessions.length}</Badge>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">{t.sessionNumber}</TableHead>
                      <TableHead>{t.date}</TableHead>
                      <TableHead>{t.time}</TableHead>
                      <TableHead>{t.conflicts}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((session) => (
                      <TableRow key={session.sessionNumber}>
                        <TableCell className="font-medium">
                          #{session.sessionNumber}
                        </TableCell>
                        <TableCell>{formatDate(session.date)}</TableCell>
                        <TableCell className="text-sm">
                          {session.startTime} - {session.endTime}
                        </TableCell>
                        <TableCell>
                          {session.conflicts.length === 0 ? (
                            <div className="flex items-center gap-1.5 text-xs text-green-600">
                              <CheckCircle2Icon className="h-3.5 w-3.5" />

                              <span>{t.noConflicts}</span>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              {session.conflicts.map((conflict, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-1.5 text-xs"
                                >
                                  {conflict.severity === "error" ? (
                                    <XCircleIcon className="h-3.5 w-3.5 text-destructive" />
                                  ) : (
                                    <AlertTriangleIcon className="h-3.5 w-3.5 text-yellow-600" />
                                  )}
                                  <span
                                    className={
                                      conflict.severity === "error"
                                        ? "text-destructive"
                                        : "text-yellow-600"
                                    }
                                  >
                                    {
                                      t.conflictTypes[
                                        conflict.type as keyof typeof t.conflictTypes
                                      ]
                                    }
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t.cancel}
          </Button>
          <Button onClick={handleCreate} disabled={!canCreate || hasErrors}>
            {t.create} {sessions.length} {t.createSessions}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
