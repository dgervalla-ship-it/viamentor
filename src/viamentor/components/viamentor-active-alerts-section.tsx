/**
 * VIAMENTOR - Active Alerts Section
 *
 * Section alertes actives avec cards problèmes détectés
 */

"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangleIcon,
  AlertCircleIcon,
  InfoIcon,
  WrenchIcon,
  CheckCircle2Icon,
  ClockIcon,
} from "lucide-react";
import {
  type PixelAlert,
  type PixelsMonitoringLocale,
  getSeverityColor,
} from "@/viamentor/data/viamentor-pixels-monitoring-data";
import { pixelsMonitoringTranslations } from "@/viamentor/data/viamentor-pixels-monitoring-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ActiveAlertsSectionProps {
  alerts: PixelAlert[];
  locale?: PixelsMonitoringLocale;
  onDiagnose?: (alertId: string) => void;
  onResolve?: (alertId: string) => void;
  onIgnore?: (alertId: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ActiveAlertsSection({
  alerts,
  locale = "fr",
  onDiagnose,
  onResolve,
  onIgnore,
}: ActiveAlertsSectionProps) {
  const t = pixelsMonitoringTranslations[locale];

  const getSeverityIcon = (severity: PixelAlert["severity"]) => {
    switch (severity) {
      case "critical":
        return <AlertTriangleIcon className="w-6 h-6" />;

      case "warning":
        return <AlertCircleIcon className="w-6 h-6" />;

      case "info":
        return <InfoIcon className="w-6 h-6" />;
    }
  };

  const getSeverityLabel = (severity: PixelAlert["severity"]) => {
    return t.alerts.severity[severity];
  };

  const getSeverityBadgeVariant = (
    severity: PixelAlert["severity"]
  ): "default" | "secondary" | "destructive" => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "warning":
        return "secondary";
      case "info":
        return "default";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const activeAlerts = alerts.filter((alert) => !alert.isIgnored);

  if (activeAlerts.length === 0) {
    return (
      <Alert className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
        <CheckCircle2Icon className="h-5 w-5 text-green-600 dark:text-green-400" />

        <AlertTitle className="text-green-900 dark:text-green-100">
          {t.alerts.noIssues}
        </AlertTitle>
        <AlertDescription className="text-green-700 dark:text-green-300">
          Tous les pixels fonctionnent correctement
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.alerts.title}</h2>
        <Badge variant="destructive" className="text-sm">
          {activeAlerts.length}{" "}
          {activeAlerts.length === 1 ? "problème" : "problèmes"}
        </Badge>
      </div>

      <div className="space-y-3">
        {activeAlerts.map((alert) => (
          <Card
            key={alert.id}
            className={`border-l-4 ${
              alert.severity === "critical"
                ? "border-l-red-500"
                : alert.severity === "warning"
                  ? "border-l-orange-500"
                  : "border-l-blue-500"
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={getSeverityColor(alert.severity)}>
                  {getSeverityIcon(alert.severity)}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold text-lg">{alert.title}</h3>
                      <Badge variant={getSeverityBadgeVariant(alert.severity)}>
                        {getSeverityLabel(alert.severity)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {alert.description}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />

                      <span>
                        {t.alerts.detectedOn.replace(
                          "{date}",
                          formatDate(alert.detectedAt)
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Plateforme:</span>
                      <span className="uppercase">{alert.platform}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onDiagnose?.(alert.id)}
                    >
                      <WrenchIcon className="w-4 h-4 mr-2" />

                      {t.actions.diagnose}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onResolve?.(alert.id)}
                    >
                      <CheckCircle2Icon className="w-4 h-4 mr-2" />

                      {t.actions.resolve}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onIgnore?.(alert.id)}
                    >
                      <ClockIcon className="w-4 h-4 mr-2" />

                      {t.actions.ignore24h}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
