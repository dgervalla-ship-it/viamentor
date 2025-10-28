// ============================================================================
// VIAMENTOR - ICS Import Wizard
// Wizard complet import calendrier avec 4 steps
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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  UploadIcon,
  FileIcon,
  CheckCircle2Icon,
  AlertTriangleIcon,
  Loader2Icon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

type ImportLocale = "fr" | "de" | "it" | "en";

interface ICSImportWizardProps {
  locale?: ImportLocale;
  tenant?: string;
  onImportComplete?: (count: number) => void;
  onImportError?: () => void;
}

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
}

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    steps: {
      upload: "Télécharger",
      preview: "Prévisualiser",
      configure: "Configurer",
      validate: "Valider",
    },
    upload: {
      title: "Sélectionner fichier",
      description:
        "Glissez-déposez votre fichier ICS ou cliquez pour parcourir",
      browse: "Parcourir",
      formats: "Formats: .ics, .ical (Google/Outlook/Apple)",
      maxSize: "Taille maximale: 10 MB",
      uploading: "Téléchargement en cours...",
      parsing: "Analyse du fichier...",
    },
    configure: {
      title: "Configuration",
      description: "Configurez les paramètres d'import",
      eventType: "Type d'événement par défaut",
      instructor: "Moniteur par défaut",
      vehicle: "Véhicule par défaut",
      createStudents: "Créer les élèves manquants",
      sendNotifications: "Envoyer les notifications",
      importRecurrences: "Importer les récurrences",
    },
    validate: {
      title: "Résumé",
      description: "Vérifiez les événements avant l'import",
      events: "événements",
      new: "Nouveaux",
      duplicates: "Doublons",
      conflicts: "Conflits à résoudre",
      estimate: "Import estimé",
      confirm: "Confirmer l'import",
      importing: "Import en cours...",
    },
    actions: {
      next: "Suivant",
      previous: "Précédent",
      cancel: "Annuler",
      import: "Importer",
    },
  },
  de: {
    steps: {
      upload: "Hochladen",
      preview: "Vorschau",
      configure: "Konfigurieren",
      validate: "Validieren",
    },
    upload: {
      title: "Datei auswählen",
      description:
        "Ziehen Sie Ihre ICS-Datei hierher oder klicken Sie zum Durchsuchen",
      browse: "Durchsuchen",
      formats: "Formate: .ics, .ical (Google/Outlook/Apple)",
      maxSize: "Maximale Größe: 10 MB",
      uploading: "Hochladen...",
      parsing: "Datei wird analysiert...",
    },
    configure: {
      title: "Konfiguration",
      description: "Import-Einstellungen konfigurieren",
      eventType: "Standard-Ereignistyp",
      instructor: "Standard-Lehrer",
      vehicle: "Standard-Fahrzeug",
      createStudents: "Fehlende Schüler erstellen",
      sendNotifications: "Benachrichtigungen senden",
      importRecurrences: "Wiederholungen importieren",
    },
    validate: {
      title: "Zusammenfassung",
      description: "Überprüfen Sie die Ereignisse vor dem Import",
      events: "Ereignisse",
      new: "Neu",
      duplicates: "Duplikate",
      conflicts: "Zu lösende Konflikte",
      estimate: "Geschätzter Import",
      confirm: "Import bestätigen",
      importing: "Import läuft...",
    },
    actions: {
      next: "Weiter",
      previous: "Zurück",
      cancel: "Abbrechen",
      import: "Importieren",
    },
  },
  it: {
    steps: {
      upload: "Carica",
      preview: "Anteprima",
      configure: "Configura",
      validate: "Valida",
    },
    upload: {
      title: "Seleziona file",
      description: "Trascina il tuo file ICS o clicca per sfogliare",
      browse: "Sfoglia",
      formats: "Formati: .ics, .ical (Google/Outlook/Apple)",
      maxSize: "Dimensione massima: 10 MB",
      uploading: "Caricamento...",
      parsing: "Analisi del file...",
    },
    configure: {
      title: "Configurazione",
      description: "Configura le impostazioni di importazione",
      eventType: "Tipo di evento predefinito",
      instructor: "Istruttore predefinito",
      vehicle: "Veicolo predefinito",
      createStudents: "Crea studenti mancanti",
      sendNotifications: "Invia notifiche",
      importRecurrences: "Importa ricorrenze",
    },
    validate: {
      title: "Riepilogo",
      description: "Verifica gli eventi prima dell'importazione",
      events: "eventi",
      new: "Nuovi",
      duplicates: "Duplicati",
      conflicts: "Conflitti da risolvere",
      estimate: "Importazione stimata",
      confirm: "Conferma importazione",
      importing: "Importazione in corso...",
    },
    actions: {
      next: "Avanti",
      previous: "Indietro",
      cancel: "Annulla",
      import: "Importa",
    },
  },
  en: {
    steps: {
      upload: "Upload",
      preview: "Preview",
      configure: "Configure",
      validate: "Validate",
    },
    upload: {
      title: "Select file",
      description: "Drag and drop your ICS file or click to browse",
      browse: "Browse",
      formats: "Formats: .ics, .ical (Google/Outlook/Apple)",
      maxSize: "Maximum size: 10 MB",
      uploading: "Uploading...",
      parsing: "Parsing file...",
    },
    configure: {
      title: "Configuration",
      description: "Configure import settings",
      eventType: "Default event type",
      instructor: "Default instructor",
      vehicle: "Default vehicle",
      createStudents: "Create missing students",
      sendNotifications: "Send notifications",
      importRecurrences: "Import recurrences",
    },
    validate: {
      title: "Summary",
      description: "Review events before import",
      events: "events",
      new: "New",
      duplicates: "Duplicates",
      conflicts: "Conflicts to resolve",
      estimate: "Estimated import",
      confirm: "Confirm import",
      importing: "Importing...",
    },
    actions: {
      next: "Next",
      previous: "Previous",
      cancel: "Cancel",
      import: "Import",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function ICSImportWizard({
  locale = "fr",
  tenant = "school-demo",
  onImportComplete,
  onImportError,
}: ICSImportWizardProps) {
  const t = translations[locale];
  const [currentStep, setCurrentStep] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [parsedEvents, setParsedEvents] = useState<ParsedEvent[]>([]);
  const [importing, setImporting] = useState(false);

  // Configuration state
  const [config, setConfig] = useState({
    eventType: "lesson",
    instructor: "",
    vehicle: "",
    createStudents: true,
    sendNotifications: true,
    importRecurrences: true,
  });

  const steps = [
    t.steps.upload,
    t.steps.preview,
    t.steps.configure,
    t.steps.validate,
  ];

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate parsing (in real app, use ical.js library)
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);

      // Mock parsed events
      const mockEvents: ParsedEvent[] = [
        {
          id: "1",
          title: "Leçon de conduite - Marie Dupont",
          startDate: new Date("2025-01-15T14:00:00"),
          endDate: new Date("2025-01-15T15:00:00"),
          location: "Auto-école ViaMenutor",
          attendees: ["marie.dupont@example.com"],
          status: "new",
        },
        {
          id: "2",
          title: "Cours théorique - Circulation",
          startDate: new Date("2025-01-16T10:00:00"),
          endDate: new Date("2025-01-16T12:00:00"),
          location: "Salle 1",
          attendees: ["groupe-a@example.com"],
          status: "new",
        },
      ];

      setParsedEvents(mockEvents);
      setUploading(false);
      setCurrentStep(1);
    }, 2000);
  };

  const handleImport = async () => {
    setImporting(true);

    // Simulate import
    setTimeout(() => {
      setImporting(false);
      onImportComplete?.(parsedEvents.length);
    }, 3000);
  };

  const newCount = parsedEvents.filter((e) => e.status === "new").length;
  const duplicateCount = parsedEvents.filter(
    (e) => e.status === "duplicate"
  ).length;
  const conflictCount = parsedEvents.filter(
    (e) => e.status === "conflict"
  ).length;

  return (
    <div className="space-y-6">
      {/* Steps Progress */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                index <= currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground"
              }`}
            >
              {index < currentStep ? (
                <CheckCircle2Icon className="h-4 w-4" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <div className="ml-2 flex-1">
              <p
                className={`text-sm font-medium ${
                  index <= currentStep
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-4 ${
                  index < currentStep ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t.upload.title}</CardTitle>
            <CardDescription>{t.upload.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
              <UploadIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />

              <Input
                type="file"
                accept=".ics,.ical"
                className="hidden"
                id="file-upload"
                onChange={(e) =>
                  e.target.files?.[0] && handleFileSelect(e.target.files[0])
                }
              />

              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" asChild>
                  <span>{t.upload.browse}</span>
                </Button>
              </Label>
              <p className="text-sm text-muted-foreground mt-2">
                {t.upload.formats}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t.upload.maxSize}
              </p>
            </div>

            {uploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t.upload.uploading}
                  </span>
                  <span className="font-medium">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>{t.configure.title}</CardTitle>
            <CardDescription>{t.configure.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t.configure.eventType}</Label>
              <Select
                value={config.eventType}
                onValueChange={(v) => setConfig({ ...config, eventType: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lesson">Leçon pratique</SelectItem>
                  <SelectItem value="theory">Cours théorique</SelectItem>
                  <SelectItem value="exam">Examen</SelectItem>
                  <SelectItem value="meeting">Réunion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="create-students"
                checked={config.createStudents}
                onCheckedChange={(checked) =>
                  setConfig({ ...config, createStudents: checked as boolean })
                }
              />

              <Label htmlFor="create-students" className="cursor-pointer">
                {t.configure.createStudents}
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="send-notifications"
                checked={config.sendNotifications}
                onCheckedChange={(checked) =>
                  setConfig({
                    ...config,
                    sendNotifications: checked as boolean,
                  })
                }
              />

              <Label htmlFor="send-notifications" className="cursor-pointer">
                {t.configure.sendNotifications}
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="import-recurrences"
                checked={config.importRecurrences}
                onCheckedChange={(checked) =>
                  setConfig({
                    ...config,
                    importRecurrences: checked as boolean,
                  })
                }
              />

              <Label htmlFor="import-recurrences" className="cursor-pointer">
                {t.configure.importRecurrences}
              </Label>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>{t.validate.title}</CardTitle>
            <CardDescription>{t.validate.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold text-foreground">
                  {parsedEvents.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.validate.events}
                </p>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {newCount}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  {t.validate.new}
                </p>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {duplicateCount}
                </p>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  {t.validate.duplicates}
                </p>
              </div>
              <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {conflictCount}
                </p>
                <p className="text-sm text-red-600 dark:text-red-400">
                  {t.validate.conflicts}
                </p>
              </div>
            </div>

            {conflictCount > 0 && (
              <Alert className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
                <AlertTriangleIcon className="h-4 w-4 text-red-600 dark:text-red-400" />

                <AlertDescription className="text-red-800 dark:text-red-200">
                  {conflictCount} conflits doivent être résolus avant l'import
                </AlertDescription>
              </Alert>
            )}

            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                {t.validate.estimate}: ~2 min
              </p>
              <Button
                onClick={handleImport}
                disabled={importing || conflictCount > 0}
                className="min-w-32"
              >
                {importing ? (
                  <>
                    <Loader2Icon className="h-4 w-4 mr-2 animate-spin" />

                    {t.validate.importing}
                  </>
                ) : (
                  t.validate.confirm
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0 || uploading || importing}
        >
          {t.actions.previous}
        </Button>
        <Button
          onClick={() =>
            setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
          }
          disabled={currentStep === steps.length - 1 || uploading || !file}
        >
          {t.actions.next}
        </Button>
      </div>
    </div>
  );
}
