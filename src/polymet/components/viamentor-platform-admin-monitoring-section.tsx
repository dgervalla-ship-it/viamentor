/**
 * VIAMENTOR - Platform Admin Monitoring Section
 * Section monitoring infrastructure avec composants système
 */

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  mockSystemComponents,
  getHealthStatusColor,
  formatUptime,
  formatResponseTime,
  type PlatformAdminLocale,
} from "@/polymet/data/viamentor-platform-admin-data";
import { getPlatformAdminTranslations } from "@/polymet/data/viamentor-platform-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PlatformAdminMonitoringSectionProps {
  locale?: PlatformAdminLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ViaMenutorPlatformAdminMonitoringSection({
  locale = "fr",
}: PlatformAdminMonitoringSectionProps) {
  const t = getPlatformAdminTranslations(locale);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockSystemComponents.map((component) => (
          <Card key={component.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{component.name}</CardTitle>
                <Badge className={getHealthStatusColor(component.status)}>
                  {t.healthStatus[component.status]}
                </Badge>
              </div>
              <CardDescription>{component.region}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t.components.uptime}
                  </span>
                  <span className="font-medium text-foreground">
                    {formatUptime(component.uptime)}
                  </span>
                </div>
                <Progress value={component.uptime} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">
                    {t.components.responseTime}
                  </p>
                  <p className="font-medium text-foreground">
                    {formatResponseTime(component.responseTime)}
                  </p>
                </div>
                {component.lastIncident && (
                  <div>
                    <p className="text-muted-foreground">
                      {t.components.lastIncident}
                    </p>
                    <p className="font-medium text-foreground text-xs">
                      {new Date(component.lastIncident).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ViaMenutorPlatformAdminMonitoringSection;
