/**
 * VIAMENTOR - Events Logs Sheet
 *
 * Sheet slide-over historique événements avec timeline et filtres
 */

"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DownloadIcon,
  RefreshCwIcon,
  SearchIcon,
  CalendarIcon,
} from "lucide-react";
import {
  type PixelEvent,
  type PixelsMonitoringLocale,
  type PlatformType,
  type EventType,
  type EventStatus,
  getEventTypeColor,
  getEventStatusColor,
} from "@/viamentor/data/viamentor-pixels-monitoring-data";
import { pixelsMonitoringTranslations } from "@/viamentor/data/viamentor-pixels-monitoring-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface EventsLogsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  events: PixelEvent[];
  locale?: PixelsMonitoringLocale;
  onRetry?: (eventId: string) => void;
  onExport?: () => void;
}

interface Filters {
  platform?: PlatformType;
  status?: EventStatus;
  eventType?: EventType;
  search: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function EventsLogsSheet({
  open,
  onOpenChange,
  events,
  locale = "fr",
  onRetry,
  onExport,
}: EventsLogsSheetProps) {
  const t = pixelsMonitoringTranslations[locale];
  const [filters, setFilters] = useState<Filters>({
    search: "",
  });

  // Filter events
  const filteredEvents = events.filter((event) => {
    if (filters.platform && event.platform !== filters.platform) return false;
    if (filters.status && event.status !== filters.status) return false;
    if (filters.eventType && event.eventType !== filters.eventType)
      return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const paramsStr = JSON.stringify(event.parameters).toLowerCase();
      return paramsStr.includes(searchLower);
    }
    return true;
  });

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  const getEventTypeLabel = (type: EventType) => {
    return t.logs.eventTypes[type];
  };

  const getStatusLabel = (status: EventStatus) => {
    return t.logs.statuses[status];
  };

  const getPlatformLabel = (platform: PlatformType) => {
    return t.platforms[platform];
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{t.logs.title}</SheetTitle>
          <SheetDescription>
            {filteredEvents.length} événements
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Filters */}
          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

              <Input
                placeholder={t.logs.filters.search}
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="pl-9"
              />
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-3 gap-2">
              {/* Platform Filter */}
              <Select
                value={filters.platform || "all"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    platform:
                      value === "all" ? undefined : (value as PlatformType),
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.logs.filters.platform} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="meta">Meta</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select
                value={filters.status || "all"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    status:
                      value === "all" ? undefined : (value as EventStatus),
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.logs.filters.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="sent">Envoyé</SelectItem>
                  <SelectItem value="failed">Échoué</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="retrying">Nouvelle tentative</SelectItem>
                </SelectContent>
              </Select>

              {/* Event Type Filter */}
              <Select
                value={filters.eventType || "all"}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    eventType:
                      value === "all" ? undefined : (value as EventType),
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.logs.filters.eventType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="pageView">Page vue</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="purchase">Achat</SelectItem>
                  <SelectItem value="addToCart">Ajout panier</SelectItem>
                  <SelectItem value="initiateCheckout">
                    Début paiement
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Export Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="w-full"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />

              {t.logs.export}
            </Button>
          </div>

          {/* Events Timeline */}
          <div className="space-y-3">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Aucun événement trouvé
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="border border-border rounded-lg p-4 space-y-3"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getEventTypeColor(event.eventType)}>
                          {getEventTypeLabel(event.eventType)}
                        </Badge>
                        <Badge className={getEventStatusColor(event.status)}>
                          {getStatusLabel(event.status)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {getPlatformLabel(event.platform)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatTimestamp(event.timestamp)}
                      </p>
                    </div>
                    {event.status === "failed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRetry?.(event.id)}
                      >
                        <RefreshCwIcon className="w-3 h-3 mr-1" />

                        {t.actions.retry}
                      </Button>
                    )}
                  </div>

                  {/* Retry Count */}
                  {event.retryCount > 0 && (
                    <div className="text-xs text-muted-foreground">
                      {t.logs.retryCount}: {event.retryCount}
                    </div>
                  )}

                  {/* Error Message */}
                  {event.error && (
                    <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 p-2 rounded">
                      {event.error}
                    </div>
                  )}

                  {/* Expandable Details */}
                  <Accordion type="single" collapsible>
                    <AccordionItem value="details" className="border-0">
                      <AccordionTrigger className="text-sm py-2">
                        {t.diagnostics.details}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        {/* Parameters */}
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            {t.logs.parameters}
                          </p>
                          <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                            {JSON.stringify(event.parameters, null, 2)}
                          </pre>
                        </div>

                        {/* API Response */}
                        {event.response && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1">
                              {t.logs.response}
                            </p>
                            <div className="text-xs bg-muted p-2 rounded space-y-1">
                              <p>Status: {event.response.statusCode}</p>
                              <p>Message: {event.response.message}</p>
                              {event.response.body && (
                                <pre className="mt-2 overflow-x-auto">
                                  {JSON.stringify(event.response.body, null, 2)}
                                </pre>
                              )}
                            </div>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
