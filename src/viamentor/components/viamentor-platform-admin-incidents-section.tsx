/**
 * VIAMENTOR - Platform Admin Incidents Section
 * Section gestion incidents système avec détails et updates
 */

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangleIcon, ClockIcon } from "lucide-react";
import {
  mockSystemIncidents,
  getIncidentSeverityColor,
  type PlatformAdminLocale,
} from "@/viamentor/data/viamentor-platform-admin-data";
import { getPlatformAdminTranslations } from "@/viamentor/data/viamentor-platform-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PlatformAdminIncidentsSectionProps {
  locale?: PlatformAdminLocale;
  onCreateIncident?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ViamentorPlatformAdminIncidentsSection({
  locale = "fr",
  onCreateIncident,
}: PlatformAdminIncidentsSectionProps) {
  const t = getPlatformAdminTranslations(locale);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t.incidents.title}</CardTitle>
              <CardDescription>Gestion des incidents système</CardDescription>
            </div>
            <Button onClick={onCreateIncident}>
              <AlertTriangleIcon className="h-4 w-4 mr-2" />

              {t.incidents.createIncident}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSystemIncidents.map((incident) => (
              <Card key={incident.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-base">
                        {incident.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {incident.description}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        className={getIncidentSeverityColor(incident.severity)}
                      >
                        {t.incidents.severity[incident.severity]}
                      </Badge>
                      <Badge variant="outline">
                        {t.incidents.status[incident.status]}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">
                        {t.incidents.affectedTenants}
                      </p>
                      <p className="font-medium text-foreground">
                        {incident.affectedTenants}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">
                        {t.incidents.affectedUsers}
                      </p>
                      <p className="font-medium text-foreground">
                        {incident.affectedUsers}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">
                        {t.incidents.startedAt}
                      </p>
                      <p className="font-medium text-foreground text-xs">
                        {new Date(incident.startedAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">
                        {t.incidents.assignedTo}
                      </p>
                      <p className="font-medium text-foreground">
                        {incident.assignedTo}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">
                      {t.incidents.updates}
                    </p>
                    {incident.updates.map((update) => (
                      <div
                        key={update.id}
                        className="flex items-start gap-3 p-3 bg-muted rounded-lg"
                      >
                        <ClockIcon className="h-4 w-4 text-muted-foreground mt-0.5" />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-xs font-medium text-foreground">
                              {update.author}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {new Date(update.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {update.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ViamentorPlatformAdminIncidentsSection;
