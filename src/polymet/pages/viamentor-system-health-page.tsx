/**
 * VIAMENTOR - System Health Monitoring Page
 * Page monitoring santé système temps réel (Super Admin)
 *
 * FEATURES:
 * - Status services (API, DB, Cache, Storage)
 * - Métriques performance temps réel
 * - Alertes système
 * - Historique incidents
 *
 * @module pages/viamentor-system-health-page
 */

import {
  ServerIcon,
  DatabaseIcon,
  HardDriveIcon,
  ActivityIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  ClockIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// ============================================================================
// TYPES
// ============================================================================

interface SystemHealthPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "down";
  uptime: number;
  responseTime: number;
  lastCheck: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const SERVICES: ServiceStatus[] = [
  {
    name: "API Gateway",
    status: "operational",
    uptime: 99.98,
    responseTime: 45,
    lastCheck: "Il y a 30s",
  },
  {
    name: "Database Primary",
    status: "operational",
    uptime: 99.99,
    responseTime: 12,
    lastCheck: "Il y a 30s",
  },
  {
    name: "Cache Redis",
    status: "operational",
    uptime: 99.95,
    responseTime: 3,
    lastCheck: "Il y a 30s",
  },
  {
    name: "Storage S3",
    status: "degraded",
    uptime: 99.87,
    responseTime: 156,
    lastCheck: "Il y a 30s",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function SystemHealthPage({ locale = "fr" }: SystemHealthPageProps) {
  const getStatusBadge = (status: ServiceStatus["status"]) => {
    const config = {
      operational: {
        icon: CheckCircle2Icon,
        label: "Opérationnel",
        className:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      },
      degraded: {
        icon: AlertTriangleIcon,
        label: "Dégradé",
        className:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      },
      down: {
        icon: AlertTriangleIcon,
        label: "Hors ligne",
        className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      },
    };

    const { icon: Icon, label, className } = config[status];

    return (
      <Badge className={className} variant="secondary">
        <Icon className="h-3 w-3 mr-1" />

        {label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Santé Système</h1>
        <p className="text-muted-foreground mt-1">
          Monitoring temps réel de l'infrastructure ViaMenutor
        </p>
      </div>

      {/* Overall Status */}
      <Card className="border-green-200 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle2Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Tous les systèmes opérationnels
                </h3>
                <p className="text-sm text-muted-foreground">
                  Dernière vérification: il y a 30 secondes
                </p>
              </div>
            </div>
            <Badge
              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              variant="secondary"
            >
              99.97% Uptime
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <Progress value={42} className="mt-2" />

            <p className="text-xs text-muted-foreground mt-2">Normal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory</CardTitle>
            <DatabaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="mt-2" />

            <p className="text-xs text-muted-foreground mt-2">128GB / 192GB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <HardDriveIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="mt-2" />

            <p className="text-xs text-muted-foreground mt-2">847GB / 1TB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requests/min</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-green-600 mt-2">+12% vs hier</p>
          </CardContent>
        </Card>
      </div>

      {/* Services Status */}
      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {SERVICES.map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-4 border border-border rounded-lg"
              >
                <div className="flex items-center gap-4 flex-1">
                  <ServerIcon className="h-5 w-5 text-muted-foreground" />

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{service.name}</span>
                      {getStatusBadge(service.status)}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>Uptime: {service.uptime}%</span>
                      <span>•</span>
                      <span>Response: {service.responseTime}ms</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="h-3 w-3" />

                        {service.lastCheck}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Incidents */}
      <Card>
        <CardHeader>
          <CardTitle>Incidents Récents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle2Icon className="h-12 w-12 mx-auto mb-2 text-green-600" />

            <p>Aucun incident dans les dernières 24 heures</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SystemHealthPage;
