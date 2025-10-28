/**
 * VIAMENTOR - Platform Admin Overview Section
 * Section Vue d'ensemble avec KPIs, composants système et incidents
 *
 * FEATURES:
 * - KPIs système (Tenants, Users, Revenue, Infrastructure)
 * - Status composants infrastructure
 * - Incidents récents
 * - Responsive mobile avec cards adaptatives
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
import {
  BuildingIcon,
  UsersIcon,
  DollarSignIcon,
  ServerIcon,
  DatabaseIcon,
  ZapIcon,
  HardDriveIcon,
  NetworkIcon,
  GlobeIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
} from "lucide-react";
import {
  mockSystemStats,
  mockSystemComponents,
  mockSystemIncidents,
  getHealthStatusColor,
  getIncidentSeverityColor,
  formatUptime,
  formatResponseTime,
  type PlatformAdminLocale,
} from "@/polymet/data/viamentor-platform-admin-data";
import { getPlatformAdminTranslations } from "@/polymet/data/viamentor-platform-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PlatformAdminOverviewSectionProps {
  locale?: PlatformAdminLocale;
  onViewAllIncidents?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ViamentorPlatformAdminOverviewSection({
  locale = "fr",
  onViewAllIncidents,
}: PlatformAdminOverviewSectionProps) {
  const t = getPlatformAdminTranslations(locale);

  return (
    <div className="space-y-6">
      {/* System Stats KPIs - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tenants */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.tenants.title}
            </CardTitle>
            <BuildingIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockSystemStats.tenants.total}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
              <span className="text-green-600 dark:text-green-400">
                {mockSystemStats.tenants.active} {t.stats.tenants.active}
              </span>
              <span>•</span>
              <span className="text-blue-600 dark:text-blue-400">
                {mockSystemStats.tenants.trial} {t.stats.tenants.trial}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +{mockSystemStats.tenants.newThisMonth}{" "}
              {t.stats.tenants.newThisMonth}
            </p>
          </CardContent>
        </Card>

        {/* Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.users.title}
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockSystemStats.users.total.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockSystemStats.users.active.toLocaleString()}{" "}
              {t.stats.users.active}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              +{mockSystemStats.users.newThisMonth} {t.stats.users.newThisMonth}
            </p>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.revenue.mrr}
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              CHF {mockSystemStats.revenue.mrr.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 mt-1">
              <TrendingUpIcon className="h-3 w-3" />

              <span>+{mockSystemStats.revenue.growth}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ARR: CHF {mockSystemStats.revenue.arr.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Infrastructure */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.infrastructure.uptime}
            </CardTitle>
            <ServerIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatUptime(mockSystemStats.infrastructure.uptime)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatResponseTime(mockSystemStats.infrastructure.responseTime)}{" "}
              {t.stats.infrastructure.responseTime}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {mockSystemStats.infrastructure.requestsPerSecond}{" "}
              {t.stats.infrastructure.requestsPerSecond}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Components Status - Responsive Grid */}
      <Card>
        <CardHeader>
          <CardTitle>{t.components.title}</CardTitle>
          <CardDescription>État des composants infrastructure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSystemComponents.map((component) => (
              <div
                key={component.id}
                className="flex items-start gap-3 p-3 border border-border rounded-lg"
              >
                <div className="mt-0.5">
                  {component.type === "database" && (
                    <DatabaseIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                  {component.type === "api" && (
                    <ZapIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                  {component.type === "storage" && (
                    <HardDriveIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                  {component.type === "cache" && (
                    <ServerIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                  {component.type === "queue" && (
                    <NetworkIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                  {component.type === "cdn" && (
                    <GlobeIcon className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {component.name}
                    </p>
                    <Badge className={getHealthStatusColor(component.status)}>
                      {t.healthStatus[component.status]}
                    </Badge>
                  </div>
                  <div className="space-y-0.5 text-xs text-muted-foreground">
                    <p>
                      {formatUptime(component.uptime)} •{" "}
                      {formatResponseTime(component.responseTime)}
                    </p>
                    <p>{component.region}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Incidents - Mobile Optimized */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>{t.incidents.title}</CardTitle>
              <CardDescription>Incidents système récents</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onViewAllIncidents}
              className="w-full sm:w-auto"
            >
              {t.actions.viewAll}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockSystemIncidents.slice(0, 3).map((incident) => (
              <div
                key={incident.id}
                className="flex flex-col sm:flex-row sm:items-start gap-3 p-3 border border-border rounded-lg"
              >
                <AlertTriangleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {incident.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
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
                  <p className="text-xs text-muted-foreground">
                    {incident.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{incident.affectedTenants} tenants</span>
                    <span>•</span>
                    <span>{incident.affectedUsers} utilisateurs</span>
                    <span>•</span>
                    <span className="hidden sm:inline">
                      {new Date(incident.startedAt).toLocaleString()}
                    </span>
                    <span className="sm:hidden">
                      {new Date(incident.startedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ViamentorPlatformAdminOverviewSection;
