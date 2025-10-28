/**
 * VIAMENTOR - Pixels Health Dashboard
 *
 * Dashboard santé pixels avec status cards par plateforme
 */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2Icon,
  AlertTriangleIcon,
  XCircleIcon,
  PlayIcon,
  FileTextIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ActivityIcon,
} from "lucide-react";
import {
  type PlatformHealth,
  type PixelsMonitoringLocale,
  getStatusColor,
  getStatusBadgeVariant,
  formatRelativeTime,
} from "@/viamentor/data/viamentor-pixels-monitoring-data";
import { pixelsMonitoringTranslations } from "@/viamentor/data/viamentor-pixels-monitoring-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PixelsHealthDashboardProps {
  platforms: PlatformHealth[];
  locale?: PixelsMonitoringLocale;
  onTest?: (platformId: string) => void;
  onViewLogs?: (platformId: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PixelsHealthDashboard({
  platforms,
  locale = "fr",
  onTest,
  onViewLogs,
}: PixelsHealthDashboardProps) {
  const t = pixelsMonitoringTranslations[locale];

  const getStatusIcon = (status: PlatformHealth["status"]) => {
    switch (status) {
      case "operational":
        return (
          <CheckCircle2Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
        );

      case "degraded":
        return (
          <AlertTriangleIcon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
        );

      case "offline":
        return (
          <XCircleIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
        );
    }
  };

  const getStatusLabel = (status: PlatformHealth["status"]) => {
    switch (status) {
      case "operational":
        return t.status.operational;
      case "degraded":
        return t.status.degraded;
      case "offline":
        return t.status.offline;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {platforms.map((platform) => (
        <Card key={platform.id} className="relative overflow-hidden">
          {/* Pulse animation for operational status */}
          {platform.status === "operational" && (
            <div className="absolute top-4 right-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
          )}

          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <ActivityIcon className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{platform.name}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    ID: {platform.pixelId}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(platform.status)}
                <Badge
                  variant={getStatusBadgeVariant(platform.status)}
                  className="text-sm font-semibold px-3 py-1"
                >
                  {getStatusLabel(platform.status)}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {t.status.lastCheck}:{" "}
                {t.status.ago.replace(
                  "{time}",
                  formatRelativeTime(platform.lastCheck, locale)
                )}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Events Sent */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  {t.stats.eventsSent}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">
                    {platform.stats.eventsSentToday.toLocaleString(locale)}
                  </p>
                  <TrendingUpIcon className="w-4 h-4 text-green-600" />
                </div>
              </div>

              {/* Errors */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  {t.stats.errors}
                </p>
                <div className="flex items-baseline gap-2">
                  <p
                    className={`text-2xl font-bold ${platform.stats.errors > 10 ? "text-red-600" : ""}`}
                  >
                    {platform.stats.errors}
                  </p>
                  {platform.stats.errors > 10 && (
                    <TrendingUpIcon className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </div>

              {/* Success Rate */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  {t.stats.successRate}
                </p>
                <div className="flex items-baseline gap-2">
                  <p
                    className={`text-2xl font-bold ${
                      platform.stats.successRate >= 95
                        ? "text-green-600"
                        : platform.stats.successRate >= 90
                          ? "text-orange-600"
                          : "text-red-600"
                    }`}
                  >
                    {platform.stats.successRate.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Latency */}
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  {t.stats.avgLatency}
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">
                    {platform.stats.avgLatency}
                  </p>
                  <span className="text-xs text-muted-foreground">ms</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onTest?.(platform.id)}
              >
                <PlayIcon className="w-4 h-4 mr-2" />

                {t.actions.testNow}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onViewLogs?.(platform.id)}
              >
                <FileTextIcon className="w-4 h-4 mr-2" />

                {t.actions.viewLogs}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
