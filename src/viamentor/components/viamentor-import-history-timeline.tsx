/**
 * VIAMENTOR - Import History Timeline
 * Timeline chronologique des imports avec stats et actions
 */

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  FileIcon,
  UserIcon,
  CalendarIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  XCircleIcon,
  EyeIcon,
  UndoIcon,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { fr, de, it, enUS } from "date-fns/locale";
import {
  getICSImportTranslation,
  type ICSImportLocale,
} from "@/viamentor/data/viamentor-ics-import-i18n";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

interface ImportHistoryTimelineProps {
  imports: ImportRecord[];
  locale?: ICSImportLocale;
  onViewDetails?: (importId: string) => void;
  onRollback?: (importId: string) => void;
  className?: string;
}

interface ImportRecord {
  id: string;
  filename: string;
  fileSize: string;
  importedAt: Date;
  importedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  stats: {
    created: number;
    skipped: number;
    errors: number;
  };
  createdEvents?: ImportEvent[];
  skippedEvents?: ImportEvent[];
  errorEvents?: ImportError[];
}

interface ImportEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
}

interface ImportError {
  id: string;
  title: string;
  message: string;
  reason: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockImports: ImportRecord[] = [
  {
    id: "imp-001",
    filename: "google-calendar-export.ics",
    fileSize: "2.4 MB",
    importedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    importedBy: {
      id: "user-001",
      name: "Marie Dupont",
      avatar: "https://github.com/yusufhilmi.png",
    },
    stats: {
      created: 18,
      skipped: 3,
      errors: 3,
    },
    createdEvents: [
      {
        id: "evt-001",
        title: "Leçon pratique - Jean Martin",
        startDate: new Date(2025, 0, 20, 14, 0),
        endDate: new Date(2025, 0, 20, 15, 30),
      },
      {
        id: "evt-002",
        title: "Cours théorique - Signalisation",
        startDate: new Date(2025, 0, 21, 10, 0),
        endDate: new Date(2025, 0, 21, 12, 0),
      },
    ],

    skippedEvents: [
      {
        id: "evt-003",
        title: "Réunion équipe",
        startDate: new Date(2025, 0, 22, 9, 0),
        endDate: new Date(2025, 0, 22, 10, 0),
      },
    ],

    errorEvents: [
      {
        id: "err-001",
        title: "Examen pratique",
        message: "Moniteur non disponible",
        reason: "Le moniteur spécifié n'existe pas dans le système",
      },
    ],
  },
  {
    id: "imp-002",
    filename: "outlook-calendar.ics",
    fileSize: "1.8 MB",
    importedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    importedBy: {
      id: "user-002",
      name: "Pierre Dubois",
      avatar: "https://github.com/kdrnp.png",
    },
    stats: {
      created: 24,
      skipped: 0,
      errors: 0,
    },
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function ImportHistoryTimeline({
  imports = mockImports,
  locale = "fr",
  onViewDetails,
  onRollback,
  className,
}: ImportHistoryTimelineProps) {
  const t = getICSImportTranslation(locale).history;
  const dateLocales = { fr, de, it, en: enUS };
  const dateLocale = dateLocales[locale];

  const [selectedImport, setSelectedImport] = useState<ImportRecord | null>(
    null
  );
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleViewDetails = (importRecord: ImportRecord) => {
    setSelectedImport(importRecord);
    setDetailsOpen(true);
    onViewDetails?.(importRecord.id);
  };

  const handleRollback = (importId: string) => {
    onRollback?.(importId);
  };

  if (imports.length === 0) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />

          <p className="text-muted-foreground">{t.timeline.empty}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className={cn("space-y-4", className)}>
        {imports.map((importRecord, index) => (
          <Card key={importRecord.id} className="relative overflow-hidden">
            <CardContent className="p-6">
              {/* Timeline connector */}
              {index < imports.length - 1 && (
                <div className="absolute left-[52px] top-[80px] bottom-[-16px] w-px bg-border" />
              )}

              <div className="flex gap-4">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-background">
                    <AvatarImage
                      src={importRecord.importedBy.avatar}
                      alt={importRecord.importedBy.name}
                    />

                    <AvatarFallback>
                      {importRecord.importedBy.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t.timeline.importedOn}{" "}
                        <span className="font-medium text-foreground">
                          {format(importRecord.importedAt, "PPP 'à' HH:mm", {
                            locale: dateLocale,
                          })}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(importRecord.importedAt, {
                          locale: dateLocale,
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>

                  {/* File info */}
                  <div className="flex items-center gap-2 text-sm">
                    <FileIcon className="h-4 w-4 text-muted-foreground" />

                    <span className="font-medium">{importRecord.filename}</span>
                    <Badge variant="secondary" className="text-xs">
                      {importRecord.fileSize}
                    </Badge>
                  </div>

                  {/* User info */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <UserIcon className="h-4 w-4" />

                    <span>{importRecord.importedBy.name}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                      <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-500" />

                      <div>
                        <p className="text-lg font-semibold">
                          {importRecord.stats.created}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.stats.created}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                      <AlertCircleIcon className="h-4 w-4 text-orange-600 dark:text-orange-500" />

                      <div>
                        <p className="text-lg font-semibold">
                          {importRecord.stats.skipped}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.stats.skipped}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
                      <XCircleIcon className="h-4 w-4 text-red-600 dark:text-red-500" />

                      <div>
                        <p className="text-lg font-semibold">
                          {importRecord.stats.errors}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.stats.errors}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(importRecord)}
                    >
                      <EyeIcon className="mr-2 h-4 w-4" />

                      {t.actions.viewDetails}
                    </Button>
                    {importRecord.stats.created > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRollback(importRecord.id)}
                      >
                        <UndoIcon className="mr-2 h-4 w-4" />

                        {t.actions.rollback}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>{t.details.title}</DialogTitle>
            <DialogDescription>
              {selectedImport?.filename} -{" "}
              {format(selectedImport?.importedAt || new Date(), "PPP", {
                locale: dateLocale,
              })}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              {/* Created Events */}
              {selectedImport?.createdEvents &&
                selectedImport.createdEvents.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-500" />
                      {t.details.created} ({selectedImport.createdEvents.length}
                      )
                    </h4>
                    <div className="space-y-2">
                      {selectedImport.createdEvents.map((event) => (
                        <div
                          key={event.id}
                          className="rounded-lg border border-border bg-card p-3"
                        >
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(event.startDate, "PPP HH:mm", {
                              locale: dateLocale,
                            })}{" "}
                            -{" "}
                            {format(event.endDate, "HH:mm", {
                              locale: dateLocale,
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Skipped Events */}
              {selectedImport?.skippedEvents &&
                selectedImport.skippedEvents.length > 0 && (
                  <div>
                    <Separator className="my-4" />

                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertCircleIcon className="h-4 w-4 text-orange-600 dark:text-orange-500" />
                      {t.details.skipped} ({selectedImport.skippedEvents.length}
                      )
                    </h4>
                    <div className="space-y-2">
                      {selectedImport.skippedEvents.map((event) => (
                        <div
                          key={event.id}
                          className="rounded-lg border border-border bg-card p-3"
                        >
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {format(event.startDate, "PPP HH:mm", {
                              locale: dateLocale,
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Errors */}
              {selectedImport?.errorEvents &&
                selectedImport.errorEvents.length > 0 && (
                  <div>
                    <Separator className="my-4" />

                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <XCircleIcon className="h-4 w-4 text-red-600 dark:text-red-500" />
                      {t.details.errors} ({selectedImport.errorEvents.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedImport.errorEvents.map((error) => (
                        <div
                          key={error.id}
                          className="rounded-lg border border-destructive/50 bg-destructive/10 p-3"
                        >
                          <p className="font-medium">{error.title}</p>
                          <p className="text-sm text-destructive mt-1">
                            {error.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {error.reason}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
