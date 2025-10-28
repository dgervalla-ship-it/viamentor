/**
 * VIAMENTOR - Attendance Validation Modal
 * Modal validation présences batch avec génération attestations
 */

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2Icon, XCircleIcon, AlertTriangleIcon } from "lucide-react";
import { toast } from "sonner";

// ============================================================================
// TYPES
// ============================================================================

interface AttendanceValidationModalProps {
  sessionId: string;
  participants: Array<{
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    attendance: boolean;
  }>;
  locale?: "fr" | "de" | "it" | "en";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: (data: {
    sessionId: string;
    participants: Array<{ id: string; attendance: boolean }>;
    sendEmail: boolean;
    notifyInstructor: boolean;
  }) => Promise<void>;
}

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    title: "Validation des présences",
    description: "Confirmez les présences pour générer les attestations",
    warning: {
      title: "Action définitive",
      description:
        "Cette action est définitive et génèrera automatiquement les attestations pour les participants présents.",
    },
    stats: {
      present: "Présents",
      absent: "Absents",
      certificates: "Attestations",
      rate: "Taux de présence",
    },
    columns: {
      participant: "Participant",
      attendance: "Présence",
    },
    attendance: {
      present: "Présent",
      absent: "Absent",
    },
    options: {
      sendEmail: "Envoyer les attestations par email automatiquement",
      notifyInstructor: "Notifier le moniteur",
    },
    actions: {
      confirm: "Confirmer la validation",
      cancel: "Annuler",
    },
    toast: {
      success: "Présences validées et attestations générées avec succès",
      error: "Erreur lors de la validation des présences",
    },
  },
  de: {
    title: "Anwesenheitsbestätigung",
    description:
      "Bestätigen Sie die Anwesenheit zur Erstellung der Bescheinigungen",
    warning: {
      title: "Endgültige Aktion",
      description:
        "Diese Aktion ist endgültig und erstellt automatisch Bescheinigungen für anwesende Teilnehmer.",
    },
    stats: {
      present: "Anwesend",
      absent: "Abwesend",
      certificates: "Bescheinigungen",
      rate: "Anwesenheitsrate",
    },
    columns: {
      participant: "Teilnehmer",
      attendance: "Anwesenheit",
    },
    attendance: {
      present: "Anwesend",
      absent: "Abwesend",
    },
    options: {
      sendEmail: "Bescheinigungen automatisch per E-Mail senden",
      notifyInstructor: "Fahrlehrer benachrichtigen",
    },
    actions: {
      confirm: "Bestätigung bestätigen",
      cancel: "Abbrechen",
    },
    toast: {
      success: "Anwesenheit bestätigt und Bescheinigungen erfolgreich erstellt",
      error: "Fehler bei der Bestätigung der Anwesenheit",
    },
  },
  it: {
    title: "Convalida presenze",
    description: "Conferma le presenze per generare gli attestati",
    warning: {
      title: "Azione definitiva",
      description:
        "Questa azione è definitiva e genererà automaticamente gli attestati per i partecipanti presenti.",
    },
    stats: {
      present: "Presenti",
      absent: "Assenti",
      certificates: "Attestati",
      rate: "Tasso di presenza",
    },
    columns: {
      participant: "Partecipante",
      attendance: "Presenza",
    },
    attendance: {
      present: "Presente",
      absent: "Assente",
    },
    options: {
      sendEmail: "Inviare gli attestati via email automaticamente",
      notifyInstructor: "Notificare l'istruttore",
    },
    actions: {
      confirm: "Conferma convalida",
      cancel: "Annulla",
    },
    toast: {
      success: "Presenze convalidate e attestati generati con successo",
      error: "Errore durante la convalida delle presenze",
    },
  },
  en: {
    title: "Attendance validation",
    description: "Confirm attendance to generate certificates",
    warning: {
      title: "Final action",
      description:
        "This action is final and will automatically generate certificates for present participants.",
    },
    stats: {
      present: "Present",
      absent: "Absent",
      certificates: "Certificates",
      rate: "Attendance rate",
    },
    columns: {
      participant: "Participant",
      attendance: "Attendance",
    },
    attendance: {
      present: "Present",
      absent: "Absent",
    },
    options: {
      sendEmail: "Send certificates by email automatically",
      notifyInstructor: "Notify instructor",
    },
    actions: {
      confirm: "Confirm validation",
      cancel: "Cancel",
    },
    toast: {
      success: "Attendance validated and certificates generated successfully",
      error: "Error validating attendance",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function AttendanceValidationModal({
  sessionId,
  participants,
  locale = "fr",
  open,
  onOpenChange,
  onConfirm,
}: AttendanceValidationModalProps) {
  const t = translations[locale];
  const [sendEmail, setSendEmail] = useState(true);
  const [notifyInstructor, setNotifyInstructor] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate stats
  const presentCount = participants.filter((p) => p.attendance).length;
  const absentCount = participants.length - presentCount;
  const attendanceRate = Math.round((presentCount / participants.length) * 100);

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true);

      if (onConfirm) {
        await onConfirm({
          sessionId,
          participants: participants.map((p) => ({
            id: p.id,
            attendance: p.attendance,
          })),
          sendEmail,
          notifyInstructor,
        });
      }

      toast.success(t.toast.success);
      onOpenChange(false);
    } catch (error) {
      toast.error(t.toast.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Warning Alert */}
          <Alert variant="destructive">
            <AlertTriangleIcon className="h-4 w-4" />

            <AlertDescription>
              <div className="font-semibold">{t.warning.title}</div>
              <div className="text-sm mt-1">{t.warning.description}</div>
            </AlertDescription>
          </Alert>

          {/* Stats Summary */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">
                {t.stats.present}
              </div>
              <div className="text-2xl font-bold text-green-600">
                {presentCount}
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">
                {t.stats.absent}
              </div>
              <div className="text-2xl font-bold text-red-600">
                {absentCount}
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">
                {t.stats.certificates}
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {presentCount}
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground">
                {t.stats.rate}
              </div>
              <div className="text-2xl font-bold">{attendanceRate}%</div>
            </div>
          </div>

          {/* Participants Preview */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.columns.participant}</TableHead>
                  <TableHead className="text-right">
                    {t.columns.attendance}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((participant) => (
                  <TableRow key={participant.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.avatar} />

                          <AvatarFallback>
                            {participant.firstName[0]}
                            {participant.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium">
                          {participant.firstName} {participant.lastName}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {participant.attendance ? (
                        <Badge className="bg-green-500">
                          <CheckCircle2Icon className="h-3 w-3 mr-1" />

                          {t.attendance.present}
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <XCircleIcon className="h-3 w-3 mr-1" />

                          {t.attendance.absent}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sendEmail"
                checked={sendEmail}
                onCheckedChange={(checked) => setSendEmail(checked as boolean)}
              />

              <label
                htmlFor="sendEmail"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t.options.sendEmail}
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notifyInstructor"
                checked={notifyInstructor}
                onCheckedChange={(checked) =>
                  setNotifyInstructor(checked as boolean)
                }
              />

              <label
                htmlFor="notifyInstructor"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t.options.notifyInstructor}
              </label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            {t.actions.cancel}
          </Button>
          <Button onClick={handleConfirm} disabled={isSubmitting}>
            {t.actions.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
