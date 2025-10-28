/**
 * VIAMENTOR GDPR Dashboard KPIs
 *
 * Dashboard DPO avec KPIs et quick actions
 *
 * @module components/viamentor-gdpr-dashboard-kpis
 * @version 1.0.0
 */

import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  ClockIcon,
  FileTextIcon,
  DownloadIcon,
  AlertCircleIcon,
} from "lucide-react";
import { DPOStats } from "@/polymet/data/viamentor-gdpr-data";

interface GDPRDashboardKPIsProps {
  stats: DPOStats;
  onNewAudit?: () => void;
  onExportGDPR?: () => void;
  onDataBreachReport?: () => void;
}

export function GDPRDashboardKPIs({
  stats,
  onNewAudit,
  onExportGDPR,
  onDataBreachReport,
}: GDPRDashboardKPIsProps) {
  const isUrgent = stats.urgentRequests > 5;
  const consentColor =
    stats.consentRate >= 90
      ? "text-green-600"
      : stats.consentRate >= 70
        ? "text-orange-600"
        : "text-red-600";

  const daysAgo = Math.floor(
    (Date.now() - new Date(stats.lastAuditDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pending Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Requêtes en attente
            </CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{stats.pendingRequests}</div>
              {isUrgent && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangleIcon className="h-3 w-3" />
                  Urgent
                </Badge>
              )}
            </div>
            <Link
              to="/compliance/gdpr?filter=pending"
              className="text-sm text-primary hover:underline mt-2 inline-block"
            >
              Traiter →
            </Link>
          </CardContent>
        </Card>

        {/* Data Breaches */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Violations de données
            </CardTitle>
            <AlertCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{stats.dataBreachesYTD}</div>
              {stats.dataBreachesYTD === 0 ? (
                <Badge variant="default" className="gap-1 bg-green-600">
                  <CheckCircle2Icon className="h-3 w-3" />
                  Idéal
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangleIcon className="h-3 w-3" />
                  Alerte
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Année en cours (YTD)
            </p>
          </CardContent>
        </Card>

        {/* Consent Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux de consentement
            </CardTitle>
            <FileTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${consentColor}`}>
              {stats.consentRate.toFixed(1)}%
            </div>
            <Progress
              value={stats.consentRate}
              className="mt-2"
              indicatorClassName={
                stats.consentRate >= 90
                  ? "bg-green-600"
                  : stats.consentRate >= 70
                    ? "bg-orange-600"
                    : "bg-red-600"
              }
            />

            <p className="text-xs text-muted-foreground mt-2">
              Collectés avec succès
            </p>
          </CardContent>
        </Card>

        {/* Last Audit */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dernier audit
            </CardTitle>
            <CheckCircle2Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">il y a {daysAgo}j</div>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(stats.lastAuditDate).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={onNewAudit} className="gap-2">
              <CheckCircle2Icon className="h-4 w-4" />
              Nouvel audit
            </Button>
            <Button onClick={onExportGDPR} variant="outline" className="gap-2">
              <DownloadIcon className="h-4 w-4" />
              Export RGPD
            </Button>
            <Button
              onClick={onDataBreachReport}
              variant="outline"
              className="gap-2"
            >
              <AlertCircleIcon className="h-4 w-4" />
              Rapport de violation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
