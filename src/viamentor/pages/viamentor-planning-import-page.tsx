// ============================================================================
// VIAMENTOR - Planning Import ICS Page
// Page import calendrier Google/Outlook avec parsing RFC 5545
// ============================================================================

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  InfoIcon,
  HomeIcon,
  CalendarIcon,
  UploadIcon,
  CheckCircle2Icon,
  AlertTriangleIcon,
} from "lucide-react";
import { ICSImportWizard } from "@/viamentor/components/viamentor-ics-import-wizard";
import { EventsPreviewTable } from "@/viamentor/components/viamentor-events-preview-table";
import { ConflictsDetector } from "@/viamentor/components/viamentor-conflicts-detector";

// ============================================================================
// TYPES
// ============================================================================

type PlanningImportLocale = "fr" | "de" | "it" | "en";

interface PlanningImportPageProps {
  locale?: PlanningImportLocale;
  tenant?: string;
}

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    breadcrumb: {
      home: "Accueil",
      planning: "Planning",
      import: "Importer calendrier",
    },
    title: "Importer événements ICS",
    description:
      "Importez vos événements depuis Google Calendar, Outlook ou Apple Calendar",
    alert: {
      info: "Importez Google Calendar ou Outlook (.ics). Format iCalendar RFC 5545.",
      warning:
        "Les événements importés seront ajoutés au planning existant. Vérifiez les conflits avant d'importer.",
      success:
        "Import réussi ! {count} événements ont été ajoutés au planning.",
      error:
        "Erreur lors de l'import. Veuillez vérifier le fichier et réessayer.",
    },
    wizard: {
      steps: {
        upload: "Télécharger",
        preview: "Prévisualiser",
        configure: "Configurer",
        validate: "Valider",
      },
    },
  },
  de: {
    breadcrumb: {
      home: "Startseite",
      planning: "Planung",
      import: "Kalender importieren",
    },
    title: "ICS-Ereignisse importieren",
    description:
      "Importieren Sie Ihre Ereignisse aus Google Calendar, Outlook oder Apple Calendar",
    alert: {
      info: "Importieren Sie Google Calendar oder Outlook (.ics). iCalendar RFC 5545 Format.",
      warning:
        "Die importierten Ereignisse werden zum bestehenden Plan hinzugefügt. Überprüfen Sie Konflikte vor dem Import.",
      success:
        "Import erfolgreich! {count} Ereignisse wurden zum Plan hinzugefügt.",
      error:
        "Fehler beim Import. Bitte überprüfen Sie die Datei und versuchen Sie es erneut.",
    },
    wizard: {
      steps: {
        upload: "Hochladen",
        preview: "Vorschau",
        configure: "Konfigurieren",
        validate: "Validieren",
      },
    },
  },
  it: {
    breadcrumb: {
      home: "Home",
      planning: "Pianificazione",
      import: "Importa calendario",
    },
    title: "Importa eventi ICS",
    description:
      "Importa i tuoi eventi da Google Calendar, Outlook o Apple Calendar",
    alert: {
      info: "Importa Google Calendar o Outlook (.ics). Formato iCalendar RFC 5545.",
      warning:
        "Gli eventi importati verranno aggiunti alla pianificazione esistente. Verifica i conflitti prima di importare.",
      success:
        "Importazione riuscita! {count} eventi sono stati aggiunti alla pianificazione.",
      error: "Errore durante l'importazione. Verifica il file e riprova.",
    },
    wizard: {
      steps: {
        upload: "Carica",
        preview: "Anteprima",
        configure: "Configura",
        validate: "Valida",
      },
    },
  },
  en: {
    breadcrumb: {
      home: "Home",
      planning: "Planning",
      import: "Import calendar",
    },
    title: "Import ICS events",
    description:
      "Import your events from Google Calendar, Outlook or Apple Calendar",
    alert: {
      info: "Import Google Calendar or Outlook (.ics). iCalendar RFC 5545 format.",
      warning:
        "Imported events will be added to the existing schedule. Check for conflicts before importing.",
      success:
        "Import successful! {count} events have been added to the schedule.",
      error: "Error during import. Please check the file and try again.",
    },
    wizard: {
      steps: {
        upload: "Upload",
        preview: "Preview",
        configure: "Configure",
        validate: "Validate",
      },
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function PlanningImportPage({
  locale = "fr",
  tenant = "school-demo",
}: PlanningImportPageProps) {
  const t = translations[locale];
  const [importStatus, setImportStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [importedCount, setImportedCount] = useState(0);

  const handleImportComplete = (count: number) => {
    setImportedCount(count);
    setImportStatus("success");
  };

  const handleImportError = () => {
    setImportStatus("error");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/${tenant}/dashboard`}
                  className="flex items-center gap-1.5"
                >
                  <HomeIcon className="h-3.5 w-3.5" />

                  {t.breadcrumb.home}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink href={`/${tenant}/planning`}>
                  <CalendarIcon className="h-3.5 w-3.5 inline mr-1.5" />

                  {t.breadcrumb.planning}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>
                  <UploadIcon className="h-3.5 w-3.5 inline mr-1.5" />

                  {t.breadcrumb.import}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-foreground mb-2">
            {t.title}
          </h3>
          <p className="text-sm text-muted-foreground">{t.description}</p>
        </div>

        {/* Info Alert */}
        <Alert className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
          <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />

          <AlertDescription className="text-blue-800 dark:text-blue-200">
            {t.alert.info}
          </AlertDescription>
        </Alert>

        {/* Warning Alert */}
        <Alert className="mb-6 border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
          <AlertTriangleIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />

          <AlertDescription className="text-orange-800 dark:text-orange-200">
            {t.alert.warning}
          </AlertDescription>
        </Alert>

        {/* Success Alert */}
        {importStatus === "success" && (
          <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
            <CheckCircle2Icon className="h-4 w-4 text-green-600 dark:text-green-400" />

            <AlertDescription className="text-green-800 dark:text-green-200">
              {t.alert.success.replace("{count}", importedCount.toString())}
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {importStatus === "error" && (
          <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
            <AlertTriangleIcon className="h-4 w-4 text-red-600 dark:text-red-400" />

            <AlertDescription className="text-red-800 dark:text-red-200">
              {t.alert.error}
            </AlertDescription>
          </Alert>
        )}

        {/* Import Wizard */}
        <ICSImportWizard
          locale={locale}
          tenant={tenant}
          onImportComplete={handleImportComplete}
          onImportError={handleImportError}
        />
      </div>
    </div>
  );
}
