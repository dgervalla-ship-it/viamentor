/**
 * VIAMENTOR - Realtime Alerts Monitor
 * Moniteur alertes sécurité temps réel avec WebSocket
 *
 * FEATURES:
 * - Alertes temps réel (WebSocket simulation)
 * - Notifications live
 * - Auto-refresh
 * - Actions rapides
 *
 * @module components/viamentor-realtime-alerts-monitor
 */

import { useState, useEffect } from "react";
import {
  BellIcon,
  AlertTriangleIcon,
  ShieldAlertIcon,
  ActivityIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// ============================================================================
// TYPES
// ============================================================================

interface SecurityAlert {
  id: string;
  timestamp: Date;
  type: "intrusion" | "breach" | "anomaly" | "performance" | "access";
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  source: string;
  status: "new" | "acknowledged" | "investigating" | "resolved";
  autoResolved: boolean;
}

interface RealtimeAlertsMonitorProps {
  locale?: "fr" | "de" | "it" | "en";
  onAcknowledge?: (alertId: string) => void;
  onResolve?: (alertId: string) => void;
  onInvestigate?: (alertId: string) => void;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const TRANSLATIONS = {
  fr: {
    title: "Alertes Temps Réel",
    description: "Monitoring live des alertes sécurité",
    stats: {
      new: "Nouvelles",
      acknowledged: "Acquittées",
      resolved: "Résolues",
      avgResponse: "Temps Réponse Moy.",
    },
    types: {
      intrusion: "Intrusion",
      breach: "Violation",
      anomaly: "Anomalie",
      performance: "Performance",
      access: "Accès",
    },
    severity: {
      critical: "Critique",
      high: "Élevée",
      medium: "Moyenne",
      low: "Faible",
    },
    status: {
      new: "Nouvelle",
      acknowledged: "Acquittée",
      investigating: "Investigation",
      resolved: "Résolue",
    },
    actions: {
      acknowledge: "Acquitter",
      investigate: "Investiguer",
      resolve: "Résoudre",
    },
    empty: "Aucune alerte active",
    autoResolved: "Auto-résolue",
  },
};

// ============================================================================
// MOCK DATA GENERATOR
// ============================================================================

const generateMockAlert = (): SecurityAlert => {
  const types: SecurityAlert["type"][] = [
    "intrusion",
    "breach",
    "anomaly",
    "performance",
    "access",
  ];

  const severities: SecurityAlert["severity"][] = [
    "critical",
    "high",
    "medium",
    "low",
  ];

  const sources = [
    "API Gateway",
    "Database",
    "Auth Service",
    "Storage",
    "Cache",
  ];

  const type = types[Math.floor(Math.random() * types.length)];
  const severity = severities[Math.floor(Math.random() * severities.length)];

  const titles = {
    intrusion: [
      "Tentative d'accès non autorisé détectée",
      "Pattern de force brute identifié",
    ],

    breach: ["Violation de données potentielle", "Accès non conforme RGPD"],
    anomaly: ["Comportement utilisateur anormal", "Pic de requêtes suspect"],
    performance: ["Dégradation performance détectée", "Latence élevée"],
    access: ["Accès depuis IP suspecte", "Tentative accès ressource protégée"],
  };

  return {
    id: `alert-${Date.now()}-${Math.random()}`,
    timestamp: new Date(),
    type,
    severity,
    title: titles[type][Math.floor(Math.random() * titles[type].length)],
    description: `Alerte ${severity} détectée sur ${sources[Math.floor(Math.random() * sources.length)]}`,
    source: sources[Math.floor(Math.random() * sources.length)],
    status: "new",
    autoResolved: false,
  };
};

// ============================================================================
// COMPONENT
// ============================================================================

export function RealtimeAlertsMonitor({
  locale = "fr",
  onAcknowledge,
  onResolve,
  onInvestigate,
}: RealtimeAlertsMonitorProps) {
  const t = TRANSLATIONS[locale];
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [isLive, setIsLive] = useState(true);

  // Simulate WebSocket connection
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Randomly add new alert (20% chance)
      if (Math.random() < 0.2) {
        const newAlert = generateMockAlert();
        setAlerts((prev) => [newAlert, ...prev].slice(0, 50)); // Keep last 50
      }

      // Auto-resolve old alerts (30% chance for alerts older than 30s)
      setAlerts((prev) =>
        prev.map((alert) => {
          const age = Date.now() - alert.timestamp.getTime();
          if (age > 30000 && Math.random() < 0.3 && alert.status === "new") {
            return { ...alert, status: "resolved", autoResolved: true };
          }
          return alert;
        })
      );
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const getSeverityColor = (severity: SecurityAlert["severity"]) => {
    const colors = {
      critical:
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-300",
      high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-300",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-300",
      low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300",
    };
    return colors[severity];
  };

  const getStatusColor = (status: SecurityAlert["status"]) => {
    const colors = {
      new: "bg-red-100 text-red-800",
      acknowledged: "bg-yellow-100 text-yellow-800",
      investigating: "bg-blue-100 text-blue-800",
      resolved: "bg-green-100 text-green-800",
    };
    return colors[status];
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `Il y a ${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Il y a ${minutes}min`;
    const hours = Math.floor(minutes / 60);
    return `Il y a ${hours}h`;
  };

  const newCount = alerts.filter((a) => a.status === "new").length;
  const acknowledgedCount = alerts.filter(
    (a) => a.status === "acknowledged"
  ).length;
  const resolvedCount = alerts.filter((a) => a.status === "resolved").length;

  return (
    <div className="space-y-6">
      {/* Header with Live Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <BellIcon className="h-6 w-6" />

            {newCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                {newCount}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t.title}</h3>
            <p className="text-sm text-muted-foreground">{t.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${isLive ? "bg-green-600 animate-pulse" : "bg-gray-400"}`}
            />

            <span className="text-sm text-muted-foreground">
              {isLive ? "Live" : "Paused"}
            </span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? "Pause" : "Resume"}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.stats.new}</CardTitle>
            <AlertTriangleIcon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newCount}</div>
            <p className="text-xs text-red-600">Nécessitent attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.acknowledged}
            </CardTitle>
            <ActivityIcon className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{acknowledgedCount}</div>
            <p className="text-xs text-muted-foreground">En traitement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.resolved}
            </CardTitle>
            <CheckCircle2Icon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedCount}</div>
            <p className="text-xs text-green-600">Dernière heure</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.avgResponse}
            </CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4min</div>
            <p className="text-xs text-green-600">-15% vs hier</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlertIcon className="h-5 w-5" />
            Flux d'Alertes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            {alerts.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <CheckCircle2Icon className="h-12 w-12 mx-auto mb-2 text-green-600" />

                <p>{t.empty}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 border-l-4 rounded-lg ${getSeverityColor(alert.severity)} bg-card`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className={getSeverityColor(alert.severity)}
                          >
                            {t.severity[alert.severity]}
                          </Badge>
                          <Badge variant="outline">{t.types[alert.type]}</Badge>
                          <Badge className={getStatusColor(alert.status)}>
                            {t.status[alert.status]}
                          </Badge>
                          {alert.autoResolved && (
                            <Badge variant="secondary" className="text-xs">
                              {t.autoResolved}
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-semibold mb-1">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {alert.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <ClockIcon className="h-3 w-3" />

                            {getTimeAgo(alert.timestamp)}
                          </span>
                          <span>•</span>
                          <span>Source: {alert.source}</span>
                        </div>
                      </div>
                      {alert.status === "new" && (
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onAcknowledge?.(alert.id)}
                          >
                            <CheckCircle2Icon className="h-3 w-3 mr-1" />

                            {t.actions.acknowledge}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onInvestigate?.(alert.id)}
                          >
                            {t.actions.investigate}
                          </Button>
                        </div>
                      )}
                      {alert.status === "acknowledged" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onResolve?.(alert.id)}
                        >
                          <XCircleIcon className="h-3 w-3 mr-1" />

                          {t.actions.resolve}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export default RealtimeAlertsMonitor;
