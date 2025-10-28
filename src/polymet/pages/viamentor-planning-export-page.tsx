/**
 * VIAMENTOR - Planning Export Page
 * Page export calendrier ICS
 */

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { ICSExport } from "@/polymet/components/viamentor-ics-export";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import {
  getICSImportTranslation,
  type ICSImportLocale,
} from "@/polymet/data/viamentor-ics-import-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PlanningExportPageProps {
  locale?: ICSImportLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PlanningExportPage({ locale = "fr" }: PlanningExportPageProps) {
  const t = getICSImportTranslation(locale).export;

  const handleExport = async (config: any) => {
    console.log("Export config:", config);
    // Simulate export
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In production: generate ICS file and download
    alert(t.success);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              {locale === "fr"
                ? "Accueil"
                : locale === "de"
                  ? "Startseite"
                  : locale === "it"
                    ? "Home"
                    : "Home"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/planning">
              {locale === "fr"
                ? "Planning"
                : locale === "de"
                  ? "Planung"
                  : locale === "it"
                    ? "Pianificazione"
                    : "Planning"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>
              {locale === "fr"
                ? "Exporter"
                : locale === "de"
                  ? "Exportieren"
                  : locale === "it"
                    ? "Esportare"
                    : "Export"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.page.title}</h1>
        <p className="text-muted-foreground mt-2">{t.page.description}</p>
      </div>

      <Separator />

      {/* Info Alert */}
      <Alert>
        <InfoIcon className="h-4 w-4" />

        <AlertDescription>
          {locale === "fr"
            ? "Le fichier ICS généré est compatible avec Google Calendar, Outlook, Apple Calendar et tous les clients supportant le format iCalendar RFC 5545."
            : locale === "de"
              ? "Die generierte ICS-Datei ist kompatibel mit Google Calendar, Outlook, Apple Calendar und allen Clients, die das iCalendar RFC 5545 Format unterstützen."
              : locale === "it"
                ? "Il file ICS generato è compatibile con Google Calendar, Outlook, Apple Calendar e tutti i client che supportano il formato iCalendar RFC 5545."
                : "The generated ICS file is compatible with Google Calendar, Outlook, Apple Calendar and all clients supporting the iCalendar RFC 5545 format."}
        </AlertDescription>
      </Alert>

      {/* Export Component */}
      <div className="max-w-3xl">
        <ICSExport locale={locale} onExport={handleExport} />
      </div>
    </div>
  );
}
