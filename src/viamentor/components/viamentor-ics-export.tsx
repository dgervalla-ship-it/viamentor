/**
 * VIAMENTOR - ICS Export Component
 * Composant export calendrier ICS avec sélection période, types et options
 */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, DownloadIcon, InfoIcon, CheckIcon } from "lucide-react";
import { format } from "date-fns";
import { fr, de, it, enUS } from "date-fns/locale";
import {
  getICSImportTranslation,
  type ICSImportLocale,
} from "@/viamentor/data/viamentor-ics-import-i18n";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

interface ICSExportProps {
  locale?: ICSImportLocale;
  onExport?: (config: ExportConfig) => Promise<void>;
  className?: string;
}

interface ExportConfig {
  startDate: Date;
  endDate: Date;
  eventTypes: string[];
  includePrivateDetails: boolean;
}

interface EventType {
  id: string;
  label: string;
  count: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockEventTypes: Record<ICSImportLocale, EventType[]> = {
  fr: [
    { id: "lessons", label: "Leçons", count: 45 },
    { id: "theory", label: "Cours théoriques", count: 12 },
    { id: "exams", label: "Examens", count: 8 },
    { id: "meetings", label: "Réunions", count: 5 },
    { id: "maintenance", label: "Maintenance", count: 3 },
  ],

  de: [
    { id: "lessons", label: "Lektionen", count: 45 },
    { id: "theory", label: "Theoriekurse", count: 12 },
    { id: "exams", label: "Prüfungen", count: 8 },
    { id: "meetings", label: "Besprechungen", count: 5 },
    { id: "maintenance", label: "Wartung", count: 3 },
  ],

  it: [
    { id: "lessons", label: "Lezioni", count: 45 },
    { id: "theory", label: "Corsi teorici", count: 12 },
    { id: "exams", label: "Esami", count: 8 },
    { id: "meetings", label: "Riunioni", count: 5 },
    { id: "maintenance", label: "Manutenzione", count: 3 },
  ],

  en: [
    { id: "lessons", label: "Lessons", count: 45 },
    { id: "theory", label: "Theory courses", count: 12 },
    { id: "exams", label: "Exams", count: 8 },
    { id: "meetings", label: "Meetings", count: 5 },
    { id: "maintenance", label: "Maintenance", count: 3 },
  ],
};

// ============================================================================
// COMPONENT
// ============================================================================

export function ICSExport({
  locale = "fr",
  onExport,
  className,
}: ICSExportProps) {
  const t = getICSImportTranslation(locale).export;
  const eventTypes = mockEventTypes[locale];

  // Date locale mapping
  const dateLocales = { fr, de, it, en: enUS };
  const dateLocale = dateLocales[locale];

  // State
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "lessons",
    "theory",
    "exams",
  ]);
  const [includePrivate, setIncludePrivate] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Handlers
  const handleToggleType = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleToggleAll = () => {
    if (selectedTypes.length === eventTypes.length) {
      setSelectedTypes([]);
    } else {
      setSelectedTypes(eventTypes.map((t) => t.id));
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const config: ExportConfig = {
        startDate,
        endDate,
        eventTypes: selectedTypes,
        includePrivateDetails: includePrivate,
      };

      if (onExport) {
        await onExport(config);
      } else {
        // Simulate export
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Generate filename
        const filename = `viamentor-planning-${format(startDate, "yyyy-MM", { locale: dateLocale })}.ics`;
        console.log("Exporting:", filename, config);
      }
    } finally {
      setIsExporting(false);
    }
  };

  // Calculate total events
  const totalEvents = eventTypes
    .filter((type) => selectedTypes.includes(type.id))
    .reduce((sum, type) => sum + type.count, 0);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{t.card.title}</CardTitle>
        <CardDescription>{t.card.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Period Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">{t.period.label}</Label>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Start Date */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />

                  {format(startDate, "PPP", { locale: dateLocale })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => date && setStartDate(date)}
                  locale={dateLocale}
                />
              </PopoverContent>
            </Popover>

            {/* End Date */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />

                  {format(endDate, "PPP", { locale: dateLocale })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => date && setEndDate(date)}
                  locale={dateLocale}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Event Types Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">{t.eventTypes.label}</Label>
            <Button variant="ghost" size="sm" onClick={handleToggleAll}>
              {selectedTypes.length === eventTypes.length
                ? t.eventTypes.all
                : t.eventTypes.all}
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {eventTypes.map((type) => (
              <div
                key={type.id}
                className="flex items-center space-x-3 rounded-lg border border-border bg-card p-3 hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleToggleType(type.id)}
              >
                <Checkbox
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={() => handleToggleType(type.id)}
                />

                <div className="flex-1 flex items-center justify-between">
                  <Label className="cursor-pointer">{type.label}</Label>
                  <Badge variant="secondary" className="ml-2">
                    {type.count}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 rounded-lg border border-border bg-card p-4">
            <Checkbox
              checked={includePrivate}
              onCheckedChange={(checked) => setIncludePrivate(checked === true)}
            />

            <div className="flex-1">
              <Label className="cursor-pointer font-medium">
                {t.options.includePrivate}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                {t.options.privateHelp}
              </p>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <Alert>
          <InfoIcon className="h-4 w-4" />

          <AlertDescription>
            {totalEvents}{" "}
            {locale === "fr"
              ? "événements"
              : locale === "de"
                ? "Ereignisse"
                : locale === "it"
                  ? "eventi"
                  : "events"}{" "}
            {locale === "fr"
              ? "seront exportés"
              : locale === "de"
                ? "werden exportiert"
                : locale === "it"
                  ? "saranno esportati"
                  : "will be exported"}
          </AlertDescription>
        </Alert>

        {/* Export Button */}
        <Button
          className="w-full"
          size="lg"
          onClick={handleExport}
          disabled={isExporting || selectedTypes.length === 0}
        >
          {isExporting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />

              {t.actions.downloading}
            </>
          ) : (
            <>
              <DownloadIcon className="mr-2 h-4 w-4" />

              {t.actions.download}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
