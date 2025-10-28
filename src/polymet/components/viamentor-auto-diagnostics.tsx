/**
 * VIAMENTOR - Auto Diagnostics
 *
 * Composant diagnostics automatiques avec 5 tests séquentiels
 */

"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2Icon,
  XCircleIcon,
  LoaderIcon,
  CopyIcon,
  AlertTriangleIcon,
} from "lucide-react";
import {
  type DiagnosticTest,
  type PixelsMonitoringLocale,
  type PlatformType,
} from "@/polymet/data/viamentor-pixels-monitoring-data";
import { pixelsMonitoringTranslations } from "@/polymet/data/viamentor-pixels-monitoring-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface AutoDiagnosticsProps {
  platform: PlatformType;
  locale?: PixelsMonitoringLocale;
  onComplete?: (results: DiagnosticTest[]) => void;
  onCopyLogs?: (logs: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function AutoDiagnostics({
  platform,
  locale = "fr",
  onComplete,
  onCopyLogs,
}: AutoDiagnosticsProps) {
  const t = pixelsMonitoringTranslations[locale];
  const [isRunning, setIsRunning] = useState(false);
  const [currentTestIndex, setCurrentTestIndex] = useState(-1);
  const [tests, setTests] = useState<DiagnosticTest[]>([
    {
      id: "test-1",
      name: t.diagnostics.test1,
      status: "pending",
    },
    {
      id: "test-2",
      name: t.diagnostics.test2,
      status: "pending",
    },
    {
      id: "test-3",
      name: t.diagnostics.test3,
      status: "pending",
    },
    {
      id: "test-4",
      name: t.diagnostics.test4,
      status: "pending",
    },
    {
      id: "test-5",
      name: t.diagnostics.test5,
      status: "pending",
    },
  ]);

  const progress =
    currentTestIndex >= 0 ? ((currentTestIndex + 1) / tests.length) * 100 : 0;

  // Simulate running tests
  const runDiagnostics = async () => {
    setIsRunning(true);
    setCurrentTestIndex(0);

    for (let i = 0; i < tests.length; i++) {
      setCurrentTestIndex(i);

      // Update test status to running
      setTests((prev) =>
        prev.map((test, idx) =>
          idx === i ? { ...test, status: "running" as const } : test
        )
      );

      // Simulate test execution
      await new Promise((resolve) =>
        setTimeout(resolve, 1500 + Math.random() * 1000)
      );

      // Simulate test result (random pass/fail for demo)
      const passed = platform !== "tiktok" || i < 2; // TikTok fails some tests for demo
      const duration = Math.floor(800 + Math.random() * 1200);

      setTests((prev) =>
        prev.map((test, idx) => {
          if (idx === i) {
            if (passed) {
              return {
                ...test,
                status: "passed" as const,
                duration,
                details: getSuccessDetails(i, platform),
              };
            } else {
              return {
                ...test,
                status: "failed" as const,
                duration,
                error: getErrorDetails(i, platform),
              };
            }
          }
          return test;
        })
      );
    }

    setIsRunning(false);
    setCurrentTestIndex(-1);

    // Call onComplete callback
    const finalTests = tests.map((test, i) => ({
      ...test,
      status: (platform !== "tiktok" || i < 2 ? "passed" : "failed") as const,
    }));
    onComplete?.(finalTests);
  };

  const getSuccessDetails = (
    testIndex: number,
    platform: PlatformType
  ): string => {
    const details = [
      `Connexion ${platform.toUpperCase()} API établie avec succès (200 OK)`,
      `Pixel ID valide et actif dans le compte publicitaire`,
      `Permissions correctes: events.write, conversions.read`,
      `Configuration événements conforme aux spécifications API`,
      `Événement test envoyé et confirmé par la plateforme`,
    ];

    return details[testIndex];
  };

  const getErrorDetails = (
    testIndex: number,
    platform: PlatformType
  ): string => {
    const errors = [
      `Échec connexion API: Timeout après 30s`,
      `Pixel ID invalide ou archivé`,
      `Token d'accès expiré - Renouvellement requis`,
      `Paramètres événement manquants: email, phone`,
      `Erreur 401: Unauthorized - Invalid access token`,
    ];

    return errors[testIndex];
  };

  const handleCopyLogs = () => {
    const logs = tests
      .map((test, i) => {
        const status =
          test.status === "passed"
            ? "✓ PASSED"
            : test.status === "failed"
              ? "✗ FAILED"
              : "○ PENDING";
        const details = test.status === "passed" ? test.details : test.error;
        return `[${i + 1}] ${test.name}\n    Status: ${status}\n    ${details || ""}\n    Duration: ${test.duration || 0}ms`;
      })
      .join("\n\n");

    const fullLogs = `=== DIAGNOSTICS REPORT ===\nPlatform: ${platform.toUpperCase()}\nDate: ${new Date().toISOString()}\n\n${logs}`;

    navigator.clipboard.writeText(fullLogs);
    onCopyLogs?.(fullLogs);
  };

  const getTestIcon = (status: DiagnosticTest["status"]) => {
    switch (status) {
      case "passed":
        return (
          <CheckCircle2Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
        );

      case "failed":
        return (
          <XCircleIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
        );

      case "running":
        return (
          <LoaderIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
        );

      default:
        return <div className="w-5 h-5 rounded-full border-2 border-muted" />;
    }
  };

  const getTestBadge = (status: DiagnosticTest["status"]) => {
    switch (status) {
      case "passed":
        return (
          <Badge variant="default" className="bg-green-600">
            {t.diagnostics.passed}
          </Badge>
        );

      case "failed":
        return <Badge variant="destructive">{t.diagnostics.failed}</Badge>;

      case "running":
        return <Badge variant="secondary">{t.diagnostics.running}</Badge>;

      default:
        return null;
    }
  };

  const completedTests = tests.filter(
    (t) => t.status === "passed" || t.status === "failed"
  ).length;
  const passedTests = tests.filter((t) => t.status === "passed").length;
  const failedTests = tests.filter((t) => t.status === "failed").length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t.diagnostics.title}</CardTitle>
          {completedTests > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-600 dark:text-green-400">
                {passedTests} ✓
              </span>
              {failedTests > 0 && (
                <span className="text-red-600 dark:text-red-400">
                  {failedTests} ✗
                </span>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Bar */}
        {isRunning && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {t.diagnostics.running}
              </span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Tests List */}
        <div className="space-y-3">
          {tests.map((test, index) => (
            <div
              key={test.id}
              className={`border border-border rounded-lg p-4 transition-all ${
                test.status === "running"
                  ? "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
                  : ""
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="mt-0.5">{getTestIcon(test.status)}</div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">
                      {index + 1}. {test.name}
                    </h4>
                    {getTestBadge(test.status)}
                  </div>

                  {/* Details or Error */}
                  {test.status === "passed" && test.details && (
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {test.details}
                    </p>
                  )}
                  {test.status === "failed" && test.error && (
                    <div className="space-y-1">
                      <p className="text-sm text-red-700 dark:text-red-300 flex items-start gap-2">
                        <AlertTriangleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />

                        <span>{test.error}</span>
                      </p>
                    </div>
                  )}

                  {/* Duration */}
                  {test.duration && (
                    <p className="text-xs text-muted-foreground">
                      Durée: {test.duration}ms
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={runDiagnostics}
            disabled={isRunning}
            className="flex-1"
          >
            {isRunning ? (
              <>
                <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />

                {t.diagnostics.running}
              </>
            ) : (
              <>
                {completedTests > 0
                  ? "Relancer diagnostics"
                  : "Lancer diagnostics"}
              </>
            )}
          </Button>
          {completedTests > 0 && (
            <Button variant="outline" onClick={handleCopyLogs}>
              <CopyIcon className="w-4 h-4 mr-2" />

              {t.actions.copyLogs}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
