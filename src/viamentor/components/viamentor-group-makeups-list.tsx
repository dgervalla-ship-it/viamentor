/**
 * VIAMENTOR - Group Makeups List
 * Liste cours collectifs rattrapages planifiés
 */

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UsersIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  MoreVerticalIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon as PendingIcon,
  MailIcon,
  TrashIcon,
} from "lucide-react";
import type { InstructorMakeupsLocale } from "@/viamentor/data/viamentor-instructor-makeups-i18n";

// ============================================================================
// TYPES
// ============================================================================

export type ParticipantStatus = "pending" | "accepted" | "declined";

export interface GroupMakeupParticipant {
  studentId: string;
  studentName: string;
  studentAvatar: string;
  status: ParticipantStatus;
  respondedAt?: string;
}

export interface GroupMakeup {
  id: string;
  topic: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  category: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  participants: GroupMakeupParticipant[];
  createdAt: string;
  status: "scheduled" | "confirmed" | "canceled";
}

interface GroupMakeupsListProps {
  groupMakeups: GroupMakeup[];
  locale?: InstructorMakeupsLocale;
  onCancel?: (groupMakeupId: string) => void;
  onRemind?: (groupMakeupId: string) => void;
  onViewDetails?: (groupMakeup: GroupMakeup) => void;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Cours Collectifs Planifiés",
    description: "Cours théoriques collectifs proposés pour rattrapages",
    empty: "Aucun cours collectif planifié",
    emptyDescription:
      "Utilisez le bouton ci-dessus pour proposer un cours collectif",
    participants: "participants",
    status: {
      scheduled: "Planifié",
      confirmed: "Confirmé",
      canceled: "Annulé",
    },
    participantStatus: {
      pending: "En attente",
      accepted: "Accepté",
      declined: "Refusé",
    },
    actions: {
      viewDetails: "Voir détails",
      remind: "Relancer",
      cancel: "Annuler le cours",
    },
    stats: {
      accepted: "accepté(s)",
      pending: "en attente",
      declined: "refusé(s)",
    },
  },
  de: {
    title: "Geplante Gruppenkurse",
    description: "Vorgeschlagene theoretische Gruppenkurse für Nachholstunden",
    empty: "Keine geplanten Gruppenkurse",
    emptyDescription:
      "Verwenden Sie die Schaltfläche oben, um einen Gruppenkurs vorzuschlagen",
    participants: "Teilnehmer",
    status: {
      scheduled: "Geplant",
      confirmed: "Bestätigt",
      canceled: "Abgesagt",
    },
    participantStatus: {
      pending: "Ausstehend",
      accepted: "Angenommen",
      declined: "Abgelehnt",
    },
    actions: {
      viewDetails: "Details anzeigen",
      remind: "Erinnern",
      cancel: "Kurs absagen",
    },
    stats: {
      accepted: "angenommen",
      pending: "ausstehend",
      declined: "abgelehnt",
    },
  },
  it: {
    title: "Corsi Collettivi Pianificati",
    description: "Corsi teorici collettivi proposti per recuperi",
    empty: "Nessun corso collettivo pianificato",
    emptyDescription: "Usa il pulsante sopra per proporre un corso collettivo",
    participants: "partecipanti",
    status: {
      scheduled: "Pianificato",
      confirmed: "Confermato",
      canceled: "Annullato",
    },
    participantStatus: {
      pending: "In attesa",
      accepted: "Accettato",
      declined: "Rifiutato",
    },
    actions: {
      viewDetails: "Vedi dettagli",
      remind: "Ricorda",
      cancel: "Annulla corso",
    },
    stats: {
      accepted: "accettato/i",
      pending: "in attesa",
      declined: "rifiutato/i",
    },
  },
  en: {
    title: "Scheduled Group Courses",
    description: "Proposed group theory courses for makeups",
    empty: "No scheduled group courses",
    emptyDescription: "Use the button above to propose a group course",
    participants: "participants",
    status: {
      scheduled: "Scheduled",
      confirmed: "Confirmed",
      canceled: "Canceled",
    },
    participantStatus: {
      pending: "Pending",
      accepted: "Accepted",
      declined: "Declined",
    },
    actions: {
      viewDetails: "View details",
      remind: "Remind",
      cancel: "Cancel course",
    },
    stats: {
      accepted: "accepted",
      pending: "pending",
      declined: "declined",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function GroupMakeupsList({
  groupMakeups,
  locale = "fr",
  onCancel,
  onRemind,
  onViewDetails,
}: GroupMakeupsListProps) {
  const t = translations[locale];

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Get status badge variant
  const getStatusVariant = (
    status: ParticipantStatus
  ): "default" | "secondary" | "destructive" => {
    switch (status) {
      case "accepted":
        return "default";
      case "pending":
        return "secondary";
      case "declined":
        return "destructive";
    }
  };

  // Get status icon
  const getStatusIcon = (status: ParticipantStatus) => {
    switch (status) {
      case "accepted":
        return <CheckCircle2Icon className="w-3 h-3" />;

      case "pending":
        return <PendingIcon className="w-3 h-3" />;

      case "declined":
        return <XCircleIcon className="w-3 h-3" />;
    }
  };

  // Calculate stats
  const getStats = (participants: GroupMakeupParticipant[]) => {
    const accepted = participants.filter((p) => p.status === "accepted").length;
    const pending = participants.filter((p) => p.status === "pending").length;
    const declined = participants.filter((p) => p.status === "declined").length;
    return { accepted, pending, declined };
  };

  if (groupMakeups.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5" />

            {t.title}
          </CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <UsersIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />

            <p className="text-muted-foreground font-medium">{t.empty}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {t.emptyDescription}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <UsersIcon className="w-5 h-5" />

          {t.title}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
      </div>

      <div className="grid gap-4">
        {groupMakeups.map((groupMakeup) => {
          const stats = getStats(groupMakeup.participants);

          return (
            <Card key={groupMakeup.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {groupMakeup.topic}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {groupMakeup.description}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {t.status[groupMakeup.status]}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVerticalIcon className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onViewDetails?.(groupMakeup)}
                        >
                          <UsersIcon className="w-4 h-4 mr-2" />

                          {t.actions.viewDetails}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onRemind?.(groupMakeup.id)}
                        >
                          <MailIcon className="w-4 h-4 mr-2" />

                          {t.actions.remind}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onCancel?.(groupMakeup.id)}
                          className="text-destructive"
                        >
                          <TrashIcon className="w-4 h-4 mr-2" />

                          {t.actions.cancel}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Course Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarIcon className="w-4 h-4" />

                    <span>{formatDate(groupMakeup.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ClockIcon className="w-4 h-4" />

                    <span>
                      {groupMakeup.startTime} - {groupMakeup.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPinIcon className="w-4 h-4" />

                    <span>{groupMakeup.room}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Badge variant="outline">{groupMakeup.category}</Badge>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2Icon className="w-4 h-4 text-green-600" />

                    <span className="font-medium">{stats.accepted}</span>
                    <span className="text-muted-foreground">
                      {t.stats.accepted}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PendingIcon className="w-4 h-4 text-orange-600" />

                    <span className="font-medium">{stats.pending}</span>
                    <span className="text-muted-foreground">
                      {t.stats.pending}
                    </span>
                  </div>
                  {stats.declined > 0 && (
                    <div className="flex items-center gap-2">
                      <XCircleIcon className="w-4 h-4 text-destructive" />

                      <span className="font-medium">{stats.declined}</span>
                      <span className="text-muted-foreground">
                        {t.stats.declined}
                      </span>
                    </div>
                  )}
                </div>

                {/* Participants */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {groupMakeup.participants.length} {t.participants}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {groupMakeup.participants.map((participant) => (
                      <div
                        key={participant.studentId}
                        className="flex items-center gap-2 px-3 py-2 bg-accent rounded-lg"
                      >
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={participant.studentAvatar} />

                          <AvatarFallback>
                            {participant.studentName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {participant.studentName}
                        </span>
                        <Badge
                          variant={getStatusVariant(participant.status)}
                          className="text-xs"
                        >
                          {getStatusIcon(participant.status)}
                          <span className="ml-1">
                            {t.participantStatus[participant.status]}
                          </span>
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
