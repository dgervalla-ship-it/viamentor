/**
 * VIAMENTOR - GDPR User Rights Actions
 *
 * Composant complet pour les 4 actions RGPD obligatoires :
 * 1. Consentement explicite
 * 2. Droit à l'oubli
 * 3. Portabilité des données
 * 4. Notification des violations
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircleIcon,
  TrashIcon,
  DownloadIcon,
  AlertTriangleIcon,
  ShieldCheckIcon,
  FileTextIcon,
  ClockIcon,
  InfoIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

export type GDPRLocale = "fr" | "de" | "it" | "en";

interface GDPRUserRightsActionsProps {
  locale?: GDPRLocale;
  userId: string;
  userEmail: string;
  onConsentUpdate?: (consents: ConsentPreferences) => void;
  onDataDeletion?: (reason: string) => void;
  onDataExport?: (format: "json" | "csv" | "pdf") => void;
  onBreachAcknowledge?: (breachId: string) => void;
}

interface ConsentPreferences {
  marketing: boolean;
  analytics: boolean;
  thirdParty: boolean;
  profiling: boolean;
}

interface DataBreach {
  id: string;
  date: string;
  severity: "high" | "medium" | "low";
  description: string;
  affectedData: string[];
  actions: string[];
  acknowledged: boolean;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Mes Droits RGPD",
    description: "Gérez vos données personnelles et vos droits",

    consent: {
      title: "Gestion des Consentements",
      description: "Contrôlez l'utilisation de vos données",
      marketing: "Emails marketing et promotions",
      analytics: "Analyse et amélioration du service",
      thirdParty: "Partage avec des partenaires",
      profiling: "Profilage et personnalisation",
      save: "Enregistrer mes préférences",
      saved: "Préférences enregistrées",
    },

    deletion: {
      title: "Droit à l'Oubli",
      description: "Demander la suppression de vos données",
      warning: "Cette action est irréversible",
      reason: "Raison de la suppression (optionnel)",
      confirm: "Je confirme vouloir supprimer mes données",
      button: "Demander la suppression",
      dialog: {
        title: "Confirmer la suppression",
        description:
          "Êtes-vous sûr de vouloir supprimer toutes vos données ? Cette action est irréversible.",
        cancel: "Annuler",
        confirm: "Confirmer la suppression",
      },
      success: "Demande de suppression envoyée",
    },

    portability: {
      title: "Portabilité des Données",
      description: "Téléchargez vos données personnelles",
      formats: "Formats disponibles",
      json: "JSON (développeurs)",
      csv: "CSV (tableur)",
      pdf: "PDF (lecture)",
      button: "Télécharger mes données",
      processing: "Préparation en cours...",
      ready: "Téléchargement prêt",
    },

    breaches: {
      title: "Notifications de Violations",
      description: "Incidents de sécurité vous concernant",
      noBreaches: "Aucune violation détectée",
      severity: {
        high: "Critique",
        medium: "Modérée",
        low: "Faible",
      },
      affectedData: "Données concernées",
      actions: "Actions entreprises",
      acknowledge: "J'ai pris connaissance",
      acknowledged: "Pris en compte",
    },
  },

  de: {
    title: "Meine DSGVO-Rechte",
    description: "Verwalten Sie Ihre persönlichen Daten und Rechte",

    consent: {
      title: "Einwilligungsverwaltung",
      description: "Kontrollieren Sie die Nutzung Ihrer Daten",
      marketing: "Marketing-E-Mails und Werbeaktionen",
      analytics: "Analyse und Serviceverbesserung",
      thirdParty: "Weitergabe an Partner",
      profiling: "Profiling und Personalisierung",
      save: "Einstellungen speichern",
      saved: "Einstellungen gespeichert",
    },

    deletion: {
      title: "Recht auf Vergessenwerden",
      description: "Löschung Ihrer Daten beantragen",
      warning: "Diese Aktion ist unwiderruflich",
      reason: "Grund für die Löschung (optional)",
      confirm: "Ich bestätige die Löschung meiner Daten",
      button: "Löschung beantragen",
      dialog: {
        title: "Löschung bestätigen",
        description:
          "Sind Sie sicher, dass Sie alle Ihre Daten löschen möchten? Diese Aktion ist unwiderruflich.",
        cancel: "Abbrechen",
        confirm: "Löschung bestätigen",
      },
      success: "Löschungsantrag gesendet",
    },

    portability: {
      title: "Datenportabilität",
      description: "Laden Sie Ihre persönlichen Daten herunter",
      formats: "Verfügbare Formate",
      json: "JSON (Entwickler)",
      csv: "CSV (Tabelle)",
      pdf: "PDF (Lesen)",
      button: "Meine Daten herunterladen",
      processing: "Vorbereitung läuft...",
      ready: "Download bereit",
    },

    breaches: {
      title: "Verletzungsmeldungen",
      description: "Sicherheitsvorfälle, die Sie betreffen",
      noBreaches: "Keine Verletzungen festgestellt",
      severity: {
        high: "Kritisch",
        medium: "Mittel",
        low: "Niedrig",
      },
      affectedData: "Betroffene Daten",
      actions: "Ergriffene Maßnahmen",
      acknowledge: "Zur Kenntnis genommen",
      acknowledged: "Bestätigt",
    },
  },

  it: {
    title: "I Miei Diritti GDPR",
    description: "Gestisci i tuoi dati personali e i tuoi diritti",

    consent: {
      title: "Gestione Consensi",
      description: "Controlla l'utilizzo dei tuoi dati",
      marketing: "Email marketing e promozioni",
      analytics: "Analisi e miglioramento del servizio",
      thirdParty: "Condivisione con partner",
      profiling: "Profilazione e personalizzazione",
      save: "Salva preferenze",
      saved: "Preferenze salvate",
    },

    deletion: {
      title: "Diritto all'Oblio",
      description: "Richiedi la cancellazione dei tuoi dati",
      warning: "Questa azione è irreversibile",
      reason: "Motivo della cancellazione (opzionale)",
      confirm: "Confermo di voler cancellare i miei dati",
      button: "Richiedi cancellazione",
      dialog: {
        title: "Conferma cancellazione",
        description:
          "Sei sicuro di voler cancellare tutti i tuoi dati? Questa azione è irreversibile.",
        cancel: "Annulla",
        confirm: "Conferma cancellazione",
      },
      success: "Richiesta di cancellazione inviata",
    },

    portability: {
      title: "Portabilità dei Dati",
      description: "Scarica i tuoi dati personali",
      formats: "Formati disponibili",
      json: "JSON (sviluppatori)",
      csv: "CSV (foglio di calcolo)",
      pdf: "PDF (lettura)",
      button: "Scarica i miei dati",
      processing: "Preparazione in corso...",
      ready: "Download pronto",
    },

    breaches: {
      title: "Notifiche di Violazioni",
      description: "Incidenti di sicurezza che ti riguardano",
      noBreaches: "Nessuna violazione rilevata",
      severity: {
        high: "Critica",
        medium: "Moderata",
        low: "Bassa",
      },
      affectedData: "Dati interessati",
      actions: "Azioni intraprese",
      acknowledge: "Ho preso visione",
      acknowledged: "Preso in carico",
    },
  },

  en: {
    title: "My GDPR Rights",
    description: "Manage your personal data and rights",

    consent: {
      title: "Consent Management",
      description: "Control how your data is used",
      marketing: "Marketing emails and promotions",
      analytics: "Analytics and service improvement",
      thirdParty: "Sharing with partners",
      profiling: "Profiling and personalization",
      save: "Save preferences",
      saved: "Preferences saved",
    },

    deletion: {
      title: "Right to be Forgotten",
      description: "Request deletion of your data",
      warning: "This action is irreversible",
      reason: "Reason for deletion (optional)",
      confirm: "I confirm I want to delete my data",
      button: "Request deletion",
      dialog: {
        title: "Confirm deletion",
        description:
          "Are you sure you want to delete all your data? This action is irreversible.",
        cancel: "Cancel",
        confirm: "Confirm deletion",
      },
      success: "Deletion request sent",
    },

    portability: {
      title: "Data Portability",
      description: "Download your personal data",
      formats: "Available formats",
      json: "JSON (developers)",
      csv: "CSV (spreadsheet)",
      pdf: "PDF (reading)",
      button: "Download my data",
      processing: "Preparing...",
      ready: "Download ready",
    },

    breaches: {
      title: "Breach Notifications",
      description: "Security incidents affecting you",
      noBreaches: "No breaches detected",
      severity: {
        high: "Critical",
        medium: "Moderate",
        low: "Low",
      },
      affectedData: "Affected data",
      actions: "Actions taken",
      acknowledge: "I acknowledge",
      acknowledged: "Acknowledged",
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_BREACHES: DataBreach[] = [
  {
    id: "breach_001",
    date: "2024-12-15T10:30:00Z",
    severity: "medium",
    description: "Tentative d'accès non autorisé détectée et bloquée",
    affectedData: ["Adresse email", "Nom d'utilisateur"],
    actions: [
      "Accès bloqué immédiatement",
      "Mot de passe réinitialisé",
      "Surveillance renforcée activée",
    ],

    acknowledged: false,
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function GDPRUserRightsActions({
  locale = "fr",
  userId,
  userEmail,
  onConsentUpdate,
  onDataDeletion,
  onDataExport,
  onBreachAcknowledge,
}: GDPRUserRightsActionsProps) {
  const t = translations[locale];

  // State
  const [consents, setConsents] = useState<ConsentPreferences>({
    marketing: false,
    analytics: true,
    thirdParty: false,
    profiling: false,
  });

  const [deletionReason, setDeletionReason] = useState("");
  const [deletionConfirm, setDeletionConfirm] = useState(false);
  const [showDeletionDialog, setShowDeletionDialog] = useState(false);

  const [exportFormat, setExportFormat] = useState<"json" | "csv" | "pdf">(
    "json"
  );
  const [isExporting, setIsExporting] = useState(false);

  const [breaches] = useState<DataBreach[]>(MOCK_BREACHES);

  // Handlers
  const handleSaveConsents = () => {
    onConsentUpdate?.(consents);
    // Show success toast
  };

  const handleRequestDeletion = () => {
    if (!deletionConfirm) return;
    onDataDeletion?.(deletionReason);
    setShowDeletionDialog(false);
    setDeletionReason("");
    setDeletionConfirm(false);
  };

  const handleExportData = async () => {
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate processing
    onDataExport?.(exportFormat);
    setIsExporting(false);
  };

  const handleAcknowledgeBreach = (breachId: string) => {
    onBreachAcknowledge?.(breachId);
  };

  return (
    <div className="space-y-6">
      {/* 1. CONSENTEMENT EXPLICITE */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <CheckCircleIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>{t.consent.title}</CardTitle>
              <CardDescription>{t.consent.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="marketing"
                  checked={consents.marketing}
                  onCheckedChange={(checked) =>
                    setConsents({ ...consents, marketing: checked as boolean })
                  }
                />

                <Label htmlFor="marketing" className="cursor-pointer">
                  {t.consent.marketing}
                </Label>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="analytics"
                  checked={consents.analytics}
                  onCheckedChange={(checked) =>
                    setConsents({ ...consents, analytics: checked as boolean })
                  }
                />

                <Label htmlFor="analytics" className="cursor-pointer">
                  {t.consent.analytics}
                </Label>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="thirdParty"
                  checked={consents.thirdParty}
                  onCheckedChange={(checked) =>
                    setConsents({ ...consents, thirdParty: checked as boolean })
                  }
                />

                <Label htmlFor="thirdParty" className="cursor-pointer">
                  {t.consent.thirdParty}
                </Label>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="profiling"
                  checked={consents.profiling}
                  onCheckedChange={(checked) =>
                    setConsents({ ...consents, profiling: checked as boolean })
                  }
                />

                <Label htmlFor="profiling" className="cursor-pointer">
                  {t.consent.profiling}
                </Label>
              </div>
            </div>
          </div>

          <Button onClick={handleSaveConsents} className="w-full">
            <ShieldCheckIcon className="h-4 w-4 mr-2" />

            {t.consent.save}
          </Button>
        </CardContent>
      </Card>

      {/* 2. DROIT À L'OUBLI */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <TrashIcon className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <CardTitle>{t.deletion.title}</CardTitle>
              <CardDescription>{t.deletion.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangleIcon className="h-4 w-4" />

            <AlertDescription>{t.deletion.warning}</AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="reason">{t.deletion.reason}</Label>
            <Textarea
              id="reason"
              value={deletionReason}
              onChange={(e) => setDeletionReason(e.target.value)}
              placeholder="Ex: Je n'utilise plus le service..."
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="confirm"
              checked={deletionConfirm}
              onCheckedChange={(checked) =>
                setDeletionConfirm(checked as boolean)
              }
            />

            <Label htmlFor="confirm" className="cursor-pointer text-sm">
              {t.deletion.confirm}
            </Label>
          </div>

          <Button
            variant="destructive"
            onClick={() => setShowDeletionDialog(true)}
            disabled={!deletionConfirm}
            className="w-full"
          >
            <TrashIcon className="h-4 w-4 mr-2" />

            {t.deletion.button}
          </Button>
        </CardContent>
      </Card>

      {/* 3. PORTABILITÉ DES DONNÉES */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <DownloadIcon className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <CardTitle>{t.portability.title}</CardTitle>
              <CardDescription>{t.portability.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t.portability.formats}</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={exportFormat === "json" ? "default" : "outline"}
                onClick={() => setExportFormat("json")}
                className="flex flex-col h-auto py-3"
              >
                <FileTextIcon className="h-5 w-5 mb-1" />

                <span className="text-xs">{t.portability.json}</span>
              </Button>
              <Button
                variant={exportFormat === "csv" ? "default" : "outline"}
                onClick={() => setExportFormat("csv")}
                className="flex flex-col h-auto py-3"
              >
                <FileTextIcon className="h-5 w-5 mb-1" />

                <span className="text-xs">{t.portability.csv}</span>
              </Button>
              <Button
                variant={exportFormat === "pdf" ? "default" : "outline"}
                onClick={() => setExportFormat("pdf")}
                className="flex flex-col h-auto py-3"
              >
                <FileTextIcon className="h-5 w-5 mb-1" />

                <span className="text-xs">{t.portability.pdf}</span>
              </Button>
            </div>
          </div>

          <Button
            onClick={handleExportData}
            disabled={isExporting}
            className="w-full"
          >
            {isExporting ? (
              <>
                <ClockIcon className="h-4 w-4 mr-2 animate-spin" />

                {t.portability.processing}
              </>
            ) : (
              <>
                <DownloadIcon className="h-4 w-4 mr-2" />

                {t.portability.button}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* 4. NOTIFICATIONS DE VIOLATIONS */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <AlertTriangleIcon className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <CardTitle>{t.breaches.title}</CardTitle>
              <CardDescription>{t.breaches.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {breaches.length === 0 ? (
            <div className="text-center py-8">
              <ShieldCheckIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />

              <p className="text-muted-foreground">{t.breaches.noBreaches}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {breaches.map((breach) => (
                <div
                  key={breach.id}
                  className="p-4 border border-border rounded-lg space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          breach.severity === "high"
                            ? "destructive"
                            : breach.severity === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {t.breaches.severity[breach.severity]}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(breach.date).toLocaleDateString(locale)}
                      </span>
                    </div>
                    {breach.acknowledged && (
                      <Badge variant="outline" className="text-green-600">
                        <CheckCircleIcon className="h-3 w-3 mr-1" />

                        {t.breaches.acknowledged}
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm">{breach.description}</p>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium mb-1">
                        {t.breaches.affectedData}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {breach.affectedData.map((data, idx) => (
                          <Badge key={idx} variant="secondary">
                            {data}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-1">
                        {t.breaches.actions}
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {breach.actions.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />

                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {!breach.acknowledged && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAcknowledgeBreach(breach.id)}
                      className="w-full"
                    >
                      <InfoIcon className="h-4 w-4 mr-2" />

                      {t.breaches.acknowledge}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deletion Confirmation Dialog */}
      <Dialog open={showDeletionDialog} onOpenChange={setShowDeletionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.deletion.dialog.title}</DialogTitle>
            <DialogDescription>
              {t.deletion.dialog.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeletionDialog(false)}
            >
              {t.deletion.dialog.cancel}
            </Button>
            <Button variant="destructive" onClick={handleRequestDeletion}>
              {t.deletion.dialog.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
