/**
 * VIAMENTOR - Intrusion Detection Dashboard
 * Dashboard détection intrusion avec monitoring temps réel
 *
 * FEATURES:
 * - Détection patterns suspects
 * - IP blacklist automatique
 * - Alertes temps réel
 * - Actions automatiques
 *
 * @module components/viamentor-intrusion-detection-dashboard
 */

import { useState } from "react";
import {
  ShieldAlertIcon,
  AlertTriangleIcon,
  BanIcon,
  ActivityIcon,
  TrendingUpIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircle2Icon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

// ============================================================================
// TYPES
// ============================================================================

interface IntrusionAttempt {
  id: string;
  timestamp: string;
  ip: string;
  country: string;
  type:
    | "brute_force"
    | "sql_injection"
    | "xss"
    | "ddos"
    | "unauthorized_access";
  severity: "critical" | "high" | "medium" | "low";
  target: string;
  attempts: number;
  blocked: boolean;
  status: "active" | "blocked" | "investigating";
}

interface IntrusionDetectionDashboardProps {
  locale?: "fr" | "de" | "it" | "en";
  onBlockIP?: (ip: string) => void;
  onInvestigate?: (attemptId: string) => void;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_ATTEMPTS: IntrusionAttempt[] = [
  {
    id: "1",
    timestamp: "2025-01-17 14:45:23",
    ip: "45.142.212.61",
    country: "RU",
    type: "brute_force",
    severity: "critical",
    target: "/api/auth/login",
    attempts: 847,
    blocked: true,
    status: "blocked",
  },
  {
    id: "2",
    timestamp: "2025-01-17 14:42:15",
    ip: "103.251.167.10",
    country: "CN",
    type: "sql_injection",
    severity: "high",
    target: "/api/students",
    attempts: 23,
    blocked: true,
    status: "blocked",
  },
  {
    id: "3",
    timestamp: "2025-01-17 14:38:47",
    ip: "185.220.101.45",
    country: "DE",
    type: "unauthorized_access",
    severity: "medium",
    target: "/admin/config",
    attempts: 5,
    blocked: false,
    status: "investigating",
  },
];

const TRANSLATIONS = {
  fr: {
    title: "Détection d'Intrusion",
    description: "Monitoring temps réel des tentatives d'intrusion",
    stats: {
      blocked: "Bloquées (24h)",
      active: "Actives",
      patterns: "Patterns Détectés",
      threatLevel: "Niveau Menace",
    },
    table: {
      timestamp: "Timestamp",
      ip: "IP Source",
      type: "Type",
      target: "Cible",
      attempts: "Tentatives",
      status: "Statut",
      actions: "Actions",
    },
    types: {
      brute_force: "Force Brute",
      sql_injection: "Injection SQL",
      xss: "XSS",
      ddos: "DDoS",
      unauthorized_access: "Accès Non Autorisé",
    },
    severity: {
      critical: "Critique",
      high: "Élevée",
      medium: "Moyenne",
      low: "Faible",
    },
    status: {
      active: "Active",
      blocked: "Bloquée",
      investigating: "Investigation",
    },
    actions: {
      block: "Bloquer IP",
      investigate: "Investiguer",
      whitelist: "Whitelist",
    },
    threatLevel: {
      low: "Faible",
      moderate: "Modéré",
      high: "Élevé",
      critical: "Critique",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function IntrusionDetectionDashboard({
  locale = "fr",
  onBlockIP,
  onInvestigate,
}: IntrusionDetectionDashboardProps) {
  const t = TRANSLATIONS[locale];
  const [attempts] = useState<IntrusionAttempt[]>(MOCK_ATTEMPTS);

  const getSeverityColor = (severity: IntrusionAttempt["severity"]) => {
    const colors = {
      critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    };
    return colors[severity];
  };

  const getStatusColor = (status: IntrusionAttempt["status"]) => {
    const colors = {
      active: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      blocked:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      investigating:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    };
    return colors[status];
  };

  const blockedCount = attempts.filter((a) => a.blocked).length;
  const activeCount = attempts.filter((a) => a.status === "active").length;
  const threatLevel =
    activeCount > 5 ? "critical" : activeCount > 2 ? "high" : "moderate";

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.blocked}
            </CardTitle>
            <BanIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blockedCount}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.round((blockedCount / attempts.length) * 100)}% du total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.active}
            </CardTitle>
            <AlertTriangleIcon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCount}</div>
            <p className="text-xs text-red-600">Nécessitent attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.patterns}
            </CardTitle>
            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(attempts.map((a) => a.type)).size}
            </div>
            <p className="text-xs text-muted-foreground">Types différents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.threatLevel}
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {t.threatLevel[threatLevel]}
            </div>
            <Progress
              value={
                threatLevel === "critical"
                  ? 90
                  : threatLevel === "high"
                    ? 65
                    : 35
              }
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Attempts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlertIcon className="h-5 w-5" />
            Tentatives d'Intrusion Récentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.table.timestamp}</TableHead>
                <TableHead>{t.table.ip}</TableHead>
                <TableHead>{t.table.type}</TableHead>
                <TableHead>{t.table.target}</TableHead>
                <TableHead>{t.table.attempts}</TableHead>
                <TableHead>{t.table.status}</TableHead>
                <TableHead>{t.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attempts.map((attempt) => (
                <TableRow key={attempt.id}>
                  <TableCell className="font-mono text-sm">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-3 w-3 text-muted-foreground" />

                      {attempt.timestamp}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="h-3 w-3 text-muted-foreground" />

                      <span className="font-mono text-sm">{attempt.ip}</span>
                      <Badge variant="outline" className="text-xs">
                        {attempt.country}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getSeverityColor(attempt.severity)}
                    >
                      {t.types[attempt.type]}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {attempt.target}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{attempt.attempts}x</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(attempt.status)}>
                      {t.status[attempt.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {!attempt.blocked && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onBlockIP?.(attempt.ip)}
                        >
                          <BanIcon className="h-3 w-3 mr-1" />

                          {t.actions.block}
                        </Button>
                      )}
                      {attempt.blocked && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle2Icon className="h-3 w-3 mr-1" />
                          Bloquée
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onInvestigate?.(attempt.id)}
                      >
                        {t.actions.investigate}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default IntrusionDetectionDashboard;
