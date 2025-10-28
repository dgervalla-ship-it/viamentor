/**
 * VIAMENTOR - Pixels Health Monitoring Page
 *
 * Page principale monitoring santé pixels tracking
 */

"use client";

import React, { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoIcon, FileTextIcon, SettingsIcon } from "lucide-react";
import { PixelsHealthDashboard } from "@/viamentor/components/viamentor-pixels-health-dashboard";
import { ActiveAlertsSection } from "@/viamentor/components/viamentor-active-alerts-section";
import { AutoDiagnostics } from "@/viamentor/components/viamentor-auto-diagnostics";
import { EventsLogsSheet } from "@/viamentor/components/viamentor-events-logs-sheet";
import { EmailNotificationsConfig } from "@/viamentor/components/viamentor-email-notifications-config";
import {
  mockPlatformsHealth,
  mockPixelAlerts,
  mockPixelEvents,
  mockNotificationSettings,
  type PixelsMonitoringLocale,
  type PlatformType,
} from "@/viamentor/data/viamentor-pixels-monitoring-data";
import { pixelsMonitoringTranslations } from "@/viamentor/data/viamentor-pixels-monitoring-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PixelsHealthPageProps {
  locale?: PixelsMonitoringLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PixelsHealthPage({ locale = "fr" }: PixelsHealthPageProps) {
  const t = pixelsMonitoringTranslations[locale];
  const [logsOpen, setLogsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | null>(
    null
  );
  const [diagnosticsPlatform, setDiagnosticsPlatform] =
    useState<PlatformType | null>(null);

  const handleTest = (platformId: string) => {
    const platform = mockPlatformsHealth.find((p) => p.id === platformId);
    if (platform) {
      setDiagnosticsPlatform(platform.platform);
    }
  };

  const handleViewLogs = (platformId: string) => {
    const platform = mockPlatformsHealth.find((p) => p.id === platformId);
    if (platform) {
      setSelectedPlatform(platform.platform);
      setLogsOpen(true);
    }
  };

  const handleDiagnose = (alertId: string) => {
    const alert = mockPixelAlerts.find((a) => a.id === alertId);
    if (alert) {
      setDiagnosticsPlatform(alert.platform);
    }
  };

  const filteredEvents = selectedPlatform
    ? mockPixelEvents.filter((e) => e.platform === selectedPlatform)
    : mockPixelEvents;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
        <Alert className="mt-4">
          <InfoIcon className="h-4 w-4" />

          <AlertDescription>{t.subtitle}</AlertDescription>
        </Alert>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
          <TabsTrigger value="notifications">
            <SettingsIcon className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Alerts Section */}
          <ActiveAlertsSection
            alerts={mockPixelAlerts}
            locale={locale}
            onDiagnose={handleDiagnose}
            onResolve={(id) => console.log("Resolve alert:", id)}
            onIgnore={(id) => console.log("Ignore alert:", id)}
          />

          {/* Platforms Health Dashboard */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Status plateformes</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLogsOpen(true)}
              >
                <FileTextIcon className="w-4 h-4 mr-2" />

                {t.actions.viewLogs}
              </Button>
            </div>
            <PixelsHealthDashboard
              platforms={mockPlatformsHealth}
              locale={locale}
              onTest={handleTest}
              onViewLogs={handleViewLogs}
            />
          </div>
        </TabsContent>

        {/* Diagnostics Tab */}
        <TabsContent value="diagnostics" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Diagnostics automatiques
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Sélectionnez une plateforme pour lancer les tests de diagnostic
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockPlatformsHealth.map((platform) => (
                <AutoDiagnostics
                  key={platform.id}
                  platform={platform.platform}
                  locale={locale}
                  onComplete={(results) =>
                    console.log("Diagnostics complete:", results)
                  }
                  onCopyLogs={(logs) => {
                    navigator.clipboard.writeText(logs);
                    console.log("Logs copied");
                  }}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="max-w-3xl">
            <EmailNotificationsConfig
              settings={mockNotificationSettings}
              locale={locale}
              onSave={(settings) => {
                console.log("Settings saved:", settings);
              }}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Events Logs Sheet */}
      <EventsLogsSheet
        open={logsOpen}
        onOpenChange={setLogsOpen}
        events={filteredEvents}
        locale={locale}
        onRetry={(id) => console.log("Retry event:", id)}
        onExport={() => console.log("Export CSV")}
      />
    </div>
  );
}
