/**
 * VIAMENTOR - Tenant Actions Dialog
 * Dialog pour actions suspend/activate tenants
 *
 * FEATURES:
 * - Suspend tenant avec raison
 * - Activate tenant
 * - Confirmation workflow
 * - Notifications email
 * - Audit log
 */

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import type { TenantOverview } from "@/viamentor/data/viamentor-super-admin-data";
import type { SuperAdminLocale } from "@/viamentor/data/viamentor-super-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface TenantActionsDialogProps {
  tenant: TenantOverview | null;
  action: "suspend" | "activate" | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (
    tenantId: string,
    action: "suspend" | "activate",
    data: ActionData
  ) => void;
  locale?: SuperAdminLocale;
}

interface ActionData {
  reason?: string;
  reasonCategory?: string;
  notifyUsers: boolean;
  notes?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function TenantActionsDialog({
  tenant,
  action,
  open,
  onOpenChange,
  onConfirm,
  locale = "fr",
}: TenantActionsDialogProps) {
  const [reasonCategory, setReasonCategory] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [notifyUsers, setNotifyUsers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = {
    fr: {
      suspend: {
        title: "Suspendre le Tenant",
        description:
          "Cette action suspendra l'accès pour tous les utilisateurs de ce tenant. Les données seront conservées.",
        reasonLabel: "Raison de la suspension",
        reasonPlaceholder: "Sélectionnez une raison...",
        reasons: {
          payment_overdue: "Paiement en retard",
          policy_violation: "Violation des conditions",
          security_concern: "Problème de sécurité",
          requested_by_client: "Demande du client",
          technical_issue: "Problème technique",
          other: "Autre",
        },
        notesLabel: "Notes internes (optionnel)",
        notesPlaceholder: "Ajoutez des notes pour l'équipe...",
        notifyLabel: "Notifier les utilisateurs par email",
        confirmButton: "Suspendre le Tenant",
        cancelButton: "Annuler",
      },
      activate: {
        title: "Activer le Tenant",
        description:
          "Cette action réactivera l'accès pour tous les utilisateurs de ce tenant.",
        notesLabel: "Notes internes (optionnel)",
        notesPlaceholder: "Ajoutez des notes pour l'équipe...",
        notifyLabel: "Notifier les utilisateurs par email",
        confirmButton: "Activer le Tenant",
        cancelButton: "Annuler",
      },
      warning: "Attention",
      impact: {
        suspend: [
          "Tous les utilisateurs perdront l'accès immédiatement",
          "Les données seront conservées mais inaccessibles",
          "Les paiements automatiques seront suspendus",
          "Un email de notification sera envoyé (si activé)",
        ],

        activate: [
          "Tous les utilisateurs retrouveront l'accès immédiatement",
          "Les fonctionnalités seront restaurées",
          "Les paiements automatiques reprendront",
          "Un email de notification sera envoyé (si activé)",
        ],
      },
      validation: {
        reasonRequired: "Veuillez sélectionner une raison",
      },
    },
    de: {
      suspend: {
        title: "Mandant sperren",
        description:
          "Diese Aktion sperrt den Zugriff für alle Benutzer dieses Mandanten. Die Daten werden beibehalten.",
        reasonLabel: "Grund für die Sperrung",
        reasonPlaceholder: "Grund auswählen...",
        reasons: {
          payment_overdue: "Zahlungsverzug",
          policy_violation: "Verstoß gegen Bedingungen",
          security_concern: "Sicherheitsproblem",
          requested_by_client: "Kundenanfrage",
          technical_issue: "Technisches Problem",
          other: "Andere",
        },
        notesLabel: "Interne Notizen (optional)",
        notesPlaceholder: "Notizen für das Team hinzufügen...",
        notifyLabel: "Benutzer per E-Mail benachrichtigen",
        confirmButton: "Mandant sperren",
        cancelButton: "Abbrechen",
      },
      activate: {
        title: "Mandant aktivieren",
        description:
          "Diese Aktion reaktiviert den Zugriff für alle Benutzer dieses Mandanten.",
        notesLabel: "Interne Notizen (optional)",
        notesPlaceholder: "Notizen für das Team hinzufügen...",
        notifyLabel: "Benutzer per E-Mail benachrichtigen",
        confirmButton: "Mandant aktivieren",
        cancelButton: "Abbrechen",
      },
      warning: "Warnung",
      impact: {
        suspend: [
          "Alle Benutzer verlieren sofort den Zugriff",
          "Daten werden gespeichert, aber unzugänglich",
          "Automatische Zahlungen werden ausgesetzt",
          "Eine Benachrichtigungs-E-Mail wird gesendet (falls aktiviert)",
        ],

        activate: [
          "Alle Benutzer erhalten sofort wieder Zugriff",
          "Funktionen werden wiederhergestellt",
          "Automatische Zahlungen werden fortgesetzt",
          "Eine Benachrichtigungs-E-Mail wird gesendet (falls aktiviert)",
        ],
      },
      validation: {
        reasonRequired: "Bitte wählen Sie einen Grund",
      },
    },
    it: {
      suspend: {
        title: "Sospendi Tenant",
        description:
          "Questa azione sospenderà l'accesso per tutti gli utenti di questo tenant. I dati saranno conservati.",
        reasonLabel: "Motivo della sospensione",
        reasonPlaceholder: "Seleziona un motivo...",
        reasons: {
          payment_overdue: "Pagamento in ritardo",
          policy_violation: "Violazione delle condizioni",
          security_concern: "Problema di sicurezza",
          requested_by_client: "Richiesta del cliente",
          technical_issue: "Problema tecnico",
          other: "Altro",
        },
        notesLabel: "Note interne (opzionale)",
        notesPlaceholder: "Aggiungi note per il team...",
        notifyLabel: "Notifica gli utenti via email",
        confirmButton: "Sospendi Tenant",
        cancelButton: "Annulla",
      },
      activate: {
        title: "Attiva Tenant",
        description:
          "Questa azione riattiverà l'accesso per tutti gli utenti di questo tenant.",
        notesLabel: "Note interne (opzionale)",
        notesPlaceholder: "Aggiungi note per il team...",
        notifyLabel: "Notifica gli utenti via email",
        confirmButton: "Attiva Tenant",
        cancelButton: "Annulla",
      },
      warning: "Attenzione",
      impact: {
        suspend: [
          "Tutti gli utenti perderanno l'accesso immediatamente",
          "I dati saranno conservati ma inaccessibili",
          "I pagamenti automatici saranno sospesi",
          "Verrà inviata un'email di notifica (se attivata)",
        ],

        activate: [
          "Tutti gli utenti riacquisteranno l'accesso immediatamente",
          "Le funzionalità saranno ripristinate",
          "I pagamenti automatici riprenderanno",
          "Verrà inviata un'email di notifica (se attivata)",
        ],
      },
      validation: {
        reasonRequired: "Seleziona un motivo",
      },
    },
    en: {
      suspend: {
        title: "Suspend Tenant",
        description:
          "This action will suspend access for all users of this tenant. Data will be retained.",
        reasonLabel: "Suspension reason",
        reasonPlaceholder: "Select a reason...",
        reasons: {
          payment_overdue: "Payment overdue",
          policy_violation: "Policy violation",
          security_concern: "Security concern",
          requested_by_client: "Client request",
          technical_issue: "Technical issue",
          other: "Other",
        },
        notesLabel: "Internal notes (optional)",
        notesPlaceholder: "Add notes for the team...",
        notifyLabel: "Notify users by email",
        confirmButton: "Suspend Tenant",
        cancelButton: "Cancel",
      },
      activate: {
        title: "Activate Tenant",
        description:
          "This action will reactivate access for all users of this tenant.",
        notesLabel: "Internal notes (optional)",
        notesPlaceholder: "Add notes for the team...",
        notifyLabel: "Notify users by email",
        confirmButton: "Activate Tenant",
        cancelButton: "Cancel",
      },
      warning: "Warning",
      impact: {
        suspend: [
          "All users will lose access immediately",
          "Data will be retained but inaccessible",
          "Automatic payments will be suspended",
          "A notification email will be sent (if enabled)",
        ],

        activate: [
          "All users will regain access immediately",
          "Features will be restored",
          "Automatic payments will resume",
          "A notification email will be sent (if enabled)",
        ],
      },
      validation: {
        reasonRequired: "Please select a reason",
      },
    },
  };

  const translations = t[locale];

  const handleConfirm = async () => {
    if (action === "suspend" && !reasonCategory) {
      alert(translations.validation.reasonRequired);
      return;
    }

    if (!tenant) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onConfirm(tenant.id, action!, {
      reasonCategory,
      notes,
      notifyUsers,
    });

    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    setReasonCategory("");
    setNotes("");
    setNotifyUsers(true);
    onOpenChange(false);
  };

  if (!tenant || !action) return null;

  const actionTranslations =
    action === "suspend" ? translations.suspend : translations.activate;
  const impactList = translations.impact[action];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {action === "suspend" ? (
              <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950">
                <XCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            ) : (
              <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950">
                <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            )}
            <div>
              <DialogTitle>{actionTranslations.title}</DialogTitle>
              <DialogDescription className="mt-1">
                {actionTranslations.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Tenant Info */}
          <div className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{tenant.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {tenant.users} utilisateurs • {tenant.students} élèves
                </p>
              </div>
              <Badge
                variant={
                  tenant.status === "active"
                    ? "default"
                    : tenant.status === "trial"
                      ? "secondary"
                      : "destructive"
                }
              >
                {tenant.status}
              </Badge>
            </div>
          </div>

          {/* Reason (for suspend only) */}
          {action === "suspend" && (
            <div className="space-y-2">
              <Label htmlFor="reason">{actionTranslations.reasonLabel}</Label>
              <Select value={reasonCategory} onValueChange={setReasonCategory}>
                <SelectTrigger id="reason">
                  <SelectValue
                    placeholder={actionTranslations.reasonPlaceholder}
                  />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(actionTranslations.reasons).map(
                    ([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">{actionTranslations.notesLabel}</Label>
            <Textarea
              id="notes"
              placeholder={actionTranslations.notesPlaceholder}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Notify Users */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="notify"
              checked={notifyUsers}
              onCheckedChange={(checked) => setNotifyUsers(checked as boolean)}
            />

            <Label
              htmlFor="notify"
              className="text-sm font-normal cursor-pointer"
            >
              {actionTranslations.notifyLabel}
            </Label>
          </div>

          {/* Impact Warning */}
          <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900">
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />

              <div className="space-y-2">
                <p className="font-medium text-orange-900 dark:text-orange-100">
                  {translations.warning}
                </p>
                <ul className="space-y-1 text-sm text-orange-800 dark:text-orange-200">
                  {impactList.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-600 dark:text-orange-400 mt-1">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            {actionTranslations.cancelButton}
          </Button>
          <Button
            variant={action === "suspend" ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "En cours..." : actionTranslations.confirmButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TenantActionsDialog;
