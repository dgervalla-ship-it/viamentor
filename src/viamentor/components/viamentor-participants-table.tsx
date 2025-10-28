/**
 * VIAMENTOR - Participants Table Component
 * Table participants inscrits avec gestion présences et attestations
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  PlusIcon,
  MoreVerticalIcon,
  EditIcon,
  XCircleIcon,
  BellIcon,
  UserIcon,
  FileTextIcon,
  SearchIcon,
  CheckCircle2Icon,
} from "lucide-react";
import { toast } from "sonner";
import { AttendanceValidationModal } from "@/viamentor/components/viamentor-attendance-validation-modal";
import { CertificatesHistoryTable } from "@/viamentor/components/viamentor-certificates-history-table";

// ============================================================================
// TYPES
// ============================================================================

interface ParticipantsTableProps {
  sessionId: string;
  locale?: "fr" | "de" | "it" | "en";
  sessionStatus: "scheduled" | "ongoing" | "completed" | "cancelled";
}

interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  status: "confirmed" | "waiting" | "cancelled";
  attendance?: boolean;
}

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    actions: {
      enroll: "Inscrire",
      enrollTitle: "Inscrire un participant",
      enrollDescription: "Recherchez et sélectionnez un élève à inscrire",
      search: "Rechercher un élève...",
      confirm: "Inscrire",
      cancel: "Annuler",
    },
    columns: {
      select: "Sélectionner",
      participant: "Participant",
      email: "Email",
      phone: "Téléphone",
      status: "Statut",
      attendance: "Présence",
      certificate: "Attestation",
      actions: "Actions",
    },
    status: {
      confirmed: "Confirmé",
      waiting: "En attente",
      cancelled: "Annulé",
    },
    menu: {
      edit: "Modifier",
      cancel: "Annuler inscription",
      reminder: "Envoyer rappel",
      profile: "Voir profil",
    },
    toast: {
      enrolled: "Participant inscrit avec succès",
      attendanceUpdated: "Présence mise à jour",
      certificateGenerated: "Attestation générée",
    },
    validation: {
      validateAttendance: "Valider les présences",
    },
  },
  de: {
    actions: {
      enroll: "Anmelden",
      enrollTitle: "Teilnehmer anmelden",
      enrollDescription: "Suchen und wählen Sie einen Schüler zur Anmeldung",
      search: "Schüler suchen...",
      confirm: "Anmelden",
      cancel: "Abbrechen",
    },
    columns: {
      select: "Auswählen",
      participant: "Teilnehmer",
      email: "E-Mail",
      phone: "Telefon",
      status: "Status",
      attendance: "Anwesenheit",
      certificate: "Bescheinigung",
      actions: "Aktionen",
    },
    status: {
      confirmed: "Bestätigt",
      waiting: "Wartend",
      cancelled: "Abgesagt",
    },
    menu: {
      edit: "Bearbeiten",
      cancel: "Anmeldung stornieren",
      reminder: "Erinnerung senden",
      profile: "Profil anzeigen",
    },
    toast: {
      enrolled: "Teilnehmer erfolgreich angemeldet",
      attendanceUpdated: "Anwesenheit aktualisiert",
      certificateGenerated: "Bescheinigung erstellt",
    },
    validation: {
      validateAttendance: "Anwesenheit bestätigen",
    },
  },
  it: {
    actions: {
      enroll: "Iscrivere",
      enrollTitle: "Iscrivere un partecipante",
      enrollDescription: "Cerca e seleziona uno studente da iscrivere",
      search: "Cerca uno studente...",
      confirm: "Iscrivere",
      cancel: "Annulla",
    },
    columns: {
      select: "Seleziona",
      participant: "Partecipante",
      email: "Email",
      phone: "Telefono",
      status: "Stato",
      attendance: "Presenza",
      certificate: "Attestato",
      actions: "Azioni",
    },
    status: {
      confirmed: "Confermato",
      waiting: "In attesa",
      cancelled: "Annullato",
    },
    menu: {
      edit: "Modifica",
      cancel: "Annulla iscrizione",
      reminder: "Invia promemoria",
      profile: "Vedi profilo",
    },
    toast: {
      enrolled: "Partecipante iscritto con successo",
      attendanceUpdated: "Presenza aggiornata",
      certificateGenerated: "Attestato generato",
    },
    validation: {
      validateAttendance: "Convalida presenze",
    },
  },
  en: {
    actions: {
      enroll: "Enroll",
      enrollTitle: "Enroll a participant",
      enrollDescription: "Search and select a student to enroll",
      search: "Search for a student...",
      confirm: "Enroll",
      cancel: "Cancel",
    },
    columns: {
      select: "Select",
      participant: "Participant",
      email: "Email",
      phone: "Phone",
      status: "Status",
      attendance: "Attendance",
      certificate: "Certificate",
      actions: "Actions",
    },
    status: {
      confirmed: "Confirmed",
      waiting: "Waiting",
      cancelled: "Cancelled",
    },
    menu: {
      edit: "Edit",
      cancel: "Cancel enrollment",
      reminder: "Send reminder",
      profile: "View profile",
    },
    toast: {
      enrolled: "Participant enrolled successfully",
      attendanceUpdated: "Attendance updated",
      certificateGenerated: "Certificate generated",
    },
    validation: {
      validateAttendance: "Validate attendance",
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const mockParticipants: Participant[] = [
  {
    id: "1",
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@email.com",
    phone: "+41 79 123 45 67",
    avatar: "https://github.com/kdrnp.png",
    status: "confirmed",
    attendance: true,
  },
  {
    id: "2",
    firstName: "Lucas",
    lastName: "Dubois",
    email: "lucas.dubois@email.com",
    phone: "+41 79 234 56 78",
    avatar: "https://github.com/yusufhilmi.png",
    status: "confirmed",
    attendance: true,
  },
  {
    id: "3",
    firstName: "Emma",
    lastName: "Lefebvre",
    email: "emma.lefebvre@email.com",
    phone: "+41 79 345 67 89",
    avatar: "https://github.com/yahyabedirhan.png",
    status: "waiting",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function ParticipantsTable({
  sessionId,
  locale = "fr",
  sessionStatus,
}: ParticipantsTableProps) {
  const t = translations[locale];
  const [participants, setParticipants] = useState(mockParticipants);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [certificatesGenerated, setCertificatesGenerated] = useState(false);

  const isCompleted = sessionStatus === "completed";
  const hasAttendanceData = participants.some(
    (p) => p.attendance !== undefined
  );

  const getStatusBadge = (status: Participant["status"]) => {
    const variants = {
      confirmed: {
        variant: "default" as const,
        label: t.status.confirmed,
        className: "bg-green-500",
      },
      waiting: { variant: "secondary" as const, label: t.status.waiting },
      cancelled: { variant: "destructive" as const, label: t.status.cancelled },
    };
    const config = variants[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const handleAttendanceToggle = (participantId: string) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === participantId ? { ...p, attendance: !p.attendance } : p
      )
    );
    toast.success(t.toast.attendanceUpdated);
  };

  const handleGenerateCertificate = (participantId: string) => {
    toast.success(t.toast.certificateGenerated);
  };

  const handleValidationConfirm = async (data: any) => {
    console.log("Validation confirmed:", data);
    setCertificatesGenerated(true);
  };

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusIcon className="h-4 w-4 mr-2" />

              {t.actions.enroll}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.actions.enrollTitle}</DialogTitle>
              <DialogDescription>
                {t.actions.enrollDescription}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  placeholder={t.actions.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowEnrollDialog(false)}
                >
                  {t.actions.cancel}
                </Button>
                <Button
                  onClick={() => {
                    setShowEnrollDialog(false);
                    toast.success(t.toast.enrolled);
                  }}
                >
                  {t.actions.confirm}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {isCompleted && hasAttendanceData && !certificatesGenerated && (
          <Button
            onClick={() => setShowValidationModal(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle2Icon className="h-4 w-4 mr-2" />

            {t.validation.validateAttendance}
          </Button>
        )}
      </div>

      {/* Participants Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>{t.columns.participant}</TableHead>
              <TableHead>{t.columns.email}</TableHead>
              <TableHead>{t.columns.phone}</TableHead>
              <TableHead>{t.columns.status}</TableHead>
              {isCompleted && <TableHead>{t.columns.attendance}</TableHead>}
              {isCompleted && <TableHead>{t.columns.certificate}</TableHead>}
              <TableHead className="w-[50px]">{t.columns.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={participant.avatar} />

                      <AvatarFallback>
                        {participant.firstName[0]}
                        {participant.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {participant.firstName} {participant.lastName}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {participant.email}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {participant.phone}
                </TableCell>
                <TableCell>{getStatusBadge(participant.status)}</TableCell>
                {isCompleted && (
                  <TableCell>
                    <Checkbox
                      checked={participant.attendance}
                      onCheckedChange={() =>
                        handleAttendanceToggle(participant.id)
                      }
                    />
                  </TableCell>
                )}
                {isCompleted && participant.attendance && (
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleGenerateCertificate(participant.id)}
                    >
                      <FileTextIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                )}
                {isCompleted && !participant.attendance && (
                  <TableCell></TableCell>
                )}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <EditIcon className="h-4 w-4 mr-2" />

                        {t.menu.edit}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BellIcon className="h-4 w-4 mr-2" />

                        {t.menu.reminder}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserIcon className="h-4 w-4 mr-2" />

                        {t.menu.profile}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem className="text-destructive">
                        <XCircleIcon className="h-4 w-4 mr-2" />

                        {t.menu.cancel}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Attendance Validation Modal */}
      <AttendanceValidationModal
        sessionId={sessionId}
        participants={participants.map((p) => ({
          id: p.id,
          firstName: p.firstName,
          lastName: p.lastName,
          avatar: p.avatar,
          attendance: p.attendance || false,
        }))}
        locale={locale}
        open={showValidationModal}
        onOpenChange={setShowValidationModal}
        onConfirm={handleValidationConfirm}
      />

      {/* Certificates History */}
      {certificatesGenerated && (
        <CertificatesHistoryTable sessionId={sessionId} locale={locale} />
      )}
    </div>
  );
}
