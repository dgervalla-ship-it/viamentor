/**
 * VIAMENTOR - Stats Card Component
 * Composant générique réutilisable pour afficher des KPIs/statistiques
 *
 * FEATURES:
 * - Design cohérent pour tous les dashboards
 * - Support icônes Lucide React
 * - Variants de couleur pour différents états
 * - Responsive et accessible
 * - Support valeurs numériques et texte
 * - Sous-texte optionnel pour contexte
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShapesIcon as LucideIcon } from "lucide-react";
import { ReactNode } from "react";

// ============================================================================
// TYPES
// ============================================================================

export interface StatsCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
  valueClassName?: string;
  iconClassName?: string;
  trend?: {
    value: number;
    label?: string;
    isPositive?: boolean;
  };
  customContent?: ReactNode;
}

// ============================================================================
// VARIANT STYLES
// ============================================================================

const VARIANT_STYLES = {
  default: {
    value: "text-foreground",
    icon: "text-muted-foreground",
  },
  success: {
    value: "text-green-600 dark:text-green-500",
    icon: "text-green-600 dark:text-green-500",
  },
  warning: {
    value: "text-orange-600 dark:text-orange-500",
    icon: "text-orange-600 dark:text-orange-500",
  },
  danger: {
    value: "text-destructive",
    icon: "text-destructive",
  },
  info: {
    value: "text-primary",
    icon: "text-primary",
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function StatsCard({
  title,
  value,
  subtext,
  icon: Icon,
  variant = "default",
  className = "",
  valueClassName = "",
  iconClassName = "",
  trend,
  customContent,
}: StatsCardProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className={`h-4 w-4 ${styles.icon} ${iconClassName}`} />}
      </CardHeader>
      <CardContent>
        {customContent ? (
          customContent
        ) : (
          <>
            <div
              className={`text-2xl font-bold ${styles.value} ${valueClassName}`}
            >
              {typeof value === "number"
                ? value.toLocaleString("fr-CH")
                : value}
            </div>
            {subtext && (
              <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <span
                  className={`text-xs font-medium ${
                    trend.isPositive
                      ? "text-green-600 dark:text-green-500"
                      : "text-destructive"
                  }`}
                >
                  {trend.isPositive ? "+" : ""}
                  {trend.value}%
                </span>
                {trend.label && (
                  <span className="text-xs text-muted-foreground">
                    {trend.label}
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default StatsCard;
