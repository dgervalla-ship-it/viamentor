/**
 * VIAMENTOR - Session Detail Sheet Component
 * Sheet slide-over détail séance avec informations et participants
 */

"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  EditIcon,
  CopyIcon,
  XCircleIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { ParticipantsTable } from "@/polymet/components/viamentor-participants-table";

// ============================================================================
// TYPES
// ============================================================================

interface SessionDetailSheetProps {
  sessionId: string;
  locale?: "fr" | "de" | "it" | "en";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    title: "Détail de la séance",
    sections: {
      info: "Informations",
      participants: "Participants",
    },
    fields: {
      category: "Catégorie",
      type: "Type de cours",
      date: "Date",
      time: "Horaire",
      location: "Lieu",
      instructor: "Moniteur",
      capacity: "Capacité",
      status: "Statut",
      notes: "Notes",
    },
    status: {
      scheduled: "Planifiée",
      ongoing: "En cours",
      completed: "Terminée",
      cancelled: "Annulée",
    },
    actions: {
      edit: "Modifier",
      duplicate: "Dupliquer",
      cancel: "Annuler la séance",
      delete: "Supprimer",
    },
  },
  de: {
    title: "Sitzungsdetails",
    sections: {
      info: "Informationen",
      participants: "Teilnehmer",
    },
    fields: {
      category: "Kategorie",
      type: "Kurstyp",
      date: "Datum",
      time: "Zeit",
      location: "Standort",
      instructor: "Fahrlehrer",
      capacity: "Kapazität",
      status: "Status",
      notes: "Notizen",
    },
    status: {
      scheduled: "Geplant",
      ongoing: "Laufend",
      completed: "Abgeschlossen",
      cancelled: "Abgesagt",
    },
    actions: {
      edit: "Bearbeiten",
      duplicate: "Duplizieren",
      cancel: "Sitzung abbrechen",
      delete: "Löschen",
    },
  },
  it: {
    title: "Dettagli sessione",
    sections: {
      info: "Informazioni",
      participants: "Partecipanti",
    },
    fields: {
      category: "Categoria",
      type: "Tipo di corso",
      date: "Data",
      time: "Orario",
      location: "Luogo",
      instructor: "Istruttore",
      capacity: "Capacità",
      status: "Stato",
      notes: "Note",
    },
    status: {
      scheduled: "Pianificata",
      ongoing: "In corso",
      completed: "Completata",
      cancelled: "Annullata",
    },
    actions: {
      edit: "Modifica",
      duplicate: "Duplica",
      cancel: "Annulla sessione",
      delete: "Elimina",
    },
  },
  en: {
    title: "Session details",
    sections: {
      info: "Information",
      participants: "Participants",
    },
    fields: {
      category: "Category",
      type: "Course type",
      date: "Date",
      time: "Time",
      location: "Location",
      instructor: "Instructor",
      capacity: "Capacity",
      status: "Status",
      notes: "Notes",
    },
    status: {
      scheduled: "Scheduled",
      ongoing: "Ongoing",
      completed: "Completed",
      cancelled: "Cancelled",
    },
    actions: {
      edit: "Edit",
      duplicate: "Duplicate",
      cancel: "Cancel session",
      delete: "Delete",
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const mockSessionDetail = {
  id: "1",
  category: {
    code: "CTC",
    name: "Cours de théorie de la circulation",
    color: "bg-blue-500",
  },
  type: "Cours semaine soir",
  part: "1/4",
  date: "05.10.2025",
  time: "18:30-20:30",
  location: "Salle A - Rue de Lausanne 45, 1003 Lausanne",
  instructor: {
    name: "Jean Dupont",
    avatar: "https://github.com/yusufhilmi.png",
  },
  capacity: { current: 12, max: 24 },
  status: "scheduled" as const,
  notes: "Prévoir projecteur et supports papier pour tous les participants",
};

// ============================================================================
// COMPONENT
// ============================================================================

export function SessionDetailSheet({
  sessionId,
  locale = "fr",
  open,
  onOpenChange,
}: SessionDetailSheetProps) {
  const t = translations[locale];
  const session = mockSessionDetail;

  const getStatusBadge = (status: typeof session.status) => {
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto"
      >
        <SheetHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>{session.category.code}</span>
            <span>·</span>
            <span>Partie {session.part}</span>
            <span>·</span>
            <span>{session.date}</span>
          </div>
          <SheetTitle>{t.title}</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <EditIcon className="h-4 w-4 mr-2" />

              {t.actions.edit}
            </Button>
            <Button variant="outline" size="sm">
              <CopyIcon className="h-4 w-4 mr-2" />

              {t.actions.duplicate}
            </Button>
            <Button variant="outline" size="sm" className="text-destructive">
              <XCircleIcon className="h-4 w-4 mr-2" />

              {t.actions.cancel}
            </Button>
            <Button variant="outline" size="sm" className="text-destructive">
              <TrashIcon className="h-4 w-4 mr-2" />

              {t.actions.delete}
            </Button>
          </div>

          <Separator />

          {/* Information Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">{t.sections.info}</h3>

            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-sm text-muted-foreground">
                  {t.fields.category}
                </div>
                <div className="col-span-2">
                  <Badge className={session.category.color}>
                    {session.category.code}
                  </Badge>
                  <div className="text-sm mt-1">{session.category.name}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-sm text-muted-foreground">
                  {t.fields.type}
                </div>
                <div className="col-span-2 text-sm">{session.type}</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-sm text-muted-foreground">
                  {t.fields.date}
                </div>
                <div className="col-span-2 flex items-center gap-2 text-sm">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />

                  {session.date}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-sm text-muted-foreground">
                  {t.fields.time}
                </div>
                <div className="col-span-2 flex items-center gap-2 text-sm">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />

                  {session.time}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-sm text-muted-foreground">
                  {t.fields.location}
                </div>
                <div className="col-span-2 flex items-center gap-2 text-sm">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />

                  {session.location}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-sm text-muted-foreground">
                  {t.fields.instructor}
                </div>
                <div className="col-span-2 flex items-center gap-2 text-sm">
                  <UserIcon className="h-4 w-4 text-muted-foreground" />

                  {session.instructor.name}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-sm text-muted-foreground">
                  {t.fields.capacity}
                </div>
                <div className="col-span-2 flex items-center gap-2 text-sm">
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  {session.capacity.current}/{session.capacity.max}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-sm text-muted-foreground">
                  {t.fields.status}
                </div>
                <div className="col-span-2">
                  {getStatusBadge(session.status)}
                </div>
              </div>

              {session.notes && (
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm text-muted-foreground">
                    {t.fields.notes}
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {session.notes}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Participants Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">
              {t.sections.participants} ({session.capacity.current})
            </h3>
            <ParticipantsTable
              sessionId={sessionId}
              locale={locale}
              sessionStatus={session.status}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
