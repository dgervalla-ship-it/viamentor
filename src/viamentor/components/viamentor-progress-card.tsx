/**
 * VIAMENTOR - Progress Card Component
 * Composant générique réutilisable pour afficher la progression
 *
 * FEATURES:
 * - Barre de progression principale
 * - Liste de sous-progressions par thème/catégorie
 * - Support icônes de statut
 * - Badges de statut
 * - Responsive et accessible
 */

"use client";

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
  ShapesIcon as LucideIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

export interface ProgressItem {
  id?: string;
  name: string;
  progress: number;
  status?: "completed" | "good" | "progress" | "pending" | "warning";
  icon?: LucideIcon;
  badge?: {
    label: string;
    variant?: "default" | "secondary" | "outline" | "destructive";
  };
}

export interface ProgressCardProps {
  title: string;
  description?: string;
  mainProgress?: {
    value: number;
    label?: string;
    subtext?: string;
  };
  items?: ProgressItem[];
  className?: string;
  compact?: boolean;
  showPercentage?: boolean;
  highlightCompleted?: boolean;
}

// ============================================================================
// STATUS STYLES
// ============================================================================

const STATUS_STYLES = {
  completed: {
    progress: "bg-green-600 dark:bg-green-500",
    text: "text-green-600 dark:text-green-500",
    icon: CheckCircleIcon,
  },
  good: {
    progress: "bg-primary",
    text: "text-primary",
    icon: CheckCircleIcon,
  },
  progress: {
    progress: "bg-orange-500",
    text: "text-orange-600 dark:text-orange-500",
    icon: AlertCircleIcon,
  },
  pending: {
    progress: "bg-muted",
    text: "text-muted-foreground",
    icon: AlertCircleIcon,
  },
  warning: {
    progress: "bg-destructive",
    text: "text-destructive",
    icon: AlertCircleIcon,
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function ProgressCard({
  title,
  description,
  mainProgress,
  items = [],
  className = "",
  compact = false,
  showPercentage = true,
  highlightCompleted = true,
}: ProgressCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Progress */}
        {mainProgress && (
          <div className={compact ? "space-y-2" : "space-y-3"}>
            <div className="flex items-center justify-between">
              <span
                className={`${compact ? "text-sm" : "text-base"} font-medium`}
              >
                {mainProgress.label || "Progression globale"}
              </span>
              <span
                className={`${
                  compact ? "text-xl" : "text-2xl"
                } font-bold text-primary`}
              >
                {mainProgress.value}%
              </span>
            </div>
            <Progress
              value={mainProgress.value}
              className={compact ? "h-2" : "h-3"}
            />

            {mainProgress.subtext && (
              <p className="text-sm text-muted-foreground">
                {mainProgress.subtext}
              </p>
            )}
          </div>
        )}

        {/* Items List */}
        {items.length > 0 && (
          <div className={mainProgress ? "pt-4 border-t" : ""}>
            <div className={compact ? "space-y-3" : "space-y-4"}>
              {items.map((item, index) => {
                const statusStyle = item.status
                  ? STATUS_STYLES[item.status]
                  : STATUS_STYLES.progress;
                const StatusIcon = item.icon || statusStyle.icon;
                const isCompleted = item.progress === 100;

                return (
                  <div
                    key={item.id || index}
                    className={`space-y-2 ${
                      highlightCompleted && isCompleted ? "opacity-75" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {StatusIcon && (
                          <StatusIcon
                            className={`h-4 w-4 flex-shrink-0 ${statusStyle.text}`}
                          />
                        )}
                        <span
                          className={`${
                            compact ? "text-sm" : "text-base"
                          } font-medium truncate`}
                        >
                          {item.name}
                        </span>
                        {item.badge && (
                          <Badge
                            variant={item.badge.variant || "outline"}
                            className="text-xs flex-shrink-0"
                          >
                            {item.badge.label}
                          </Badge>
                        )}
                      </div>
                      {showPercentage && (
                        <span
                          className={`text-sm ${statusStyle.text} flex-shrink-0`}
                        >
                          {item.progress}%
                        </span>
                      )}
                    </div>
                    <Progress
                      value={item.progress}
                      className={`h-2 ${
                        highlightCompleted && isCompleted ? "opacity-50" : ""
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ProgressCard;
