/**
 * VIAMENTOR - School Admin Performance Section
 * Section Métriques de performance pour dashboard School Admin
 *
 * FEATURES:
 * - Métriques de performance
 * - Progress bars target vs actual
 * - Indicateurs de tendance
 * - Status colors
 */

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  mockPerformanceMetrics,
  getStatusColor,
  type SchoolAdminLocale,
} from "@/viamentor/data/viamentor-school-admin-data";
import { schoolAdminTranslations } from "@/viamentor/data/viamentor-school-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface SchoolAdminPerformanceSectionProps {
  locale?: SchoolAdminLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ViamentorSchoolAdminPerformanceSection({
  locale = "fr",
}: SchoolAdminPerformanceSectionProps) {
  const t = schoolAdminTranslations[locale];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.sections.performance}</CardTitle>
        <CardDescription>
          {t.common.target} vs {t.common.actual}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPerformanceMetrics.map((metric) => (
            <div key={metric.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {metric.label}
                </span>
                <span
                  className={`text-sm font-bold ${getStatusColor(metric.status)}`}
                >
                  {metric.value}
                  {metric.unit}
                </span>
              </div>
              {metric.target && (
                <>
                  <Progress
                    value={(metric.value / metric.target) * 100}
                    className="h-2"
                  />

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      {t.common.target}: {metric.target}
                      {metric.unit}
                    </span>
                    <span
                      className={
                        metric.trend > 0 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {metric.trend > 0 ? "+" : ""}
                      {metric.trend}%
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ViamentorSchoolAdminPerformanceSection;
