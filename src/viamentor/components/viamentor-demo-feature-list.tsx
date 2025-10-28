/**
 * VIAMENTOR - Demo Feature List Component
 * Liste de fonctionnalités avec icônes et descriptions
 */

import { ReactNode } from "react";
import { CheckCircle2Icon, ShapesIcon as LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ============================================================================
// TYPES
// ============================================================================

interface Feature {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline" | "destructive";
}

interface DemoFeatureListProps {
  features: Feature[];
  variant?: "default" | "compact" | "detailed";
  showCheckmarks?: boolean;
  columns?: 1 | 2 | 3;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function DemoFeatureList({
  features,
  variant = "default",
  showCheckmarks = true,
  columns = 1,
  className = "",
}: DemoFeatureListProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  // Compact variant - simple list with checkmarks
  if (variant === "compact") {
    return (
      <ul className={`space-y-2 ${className}`}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            {showCheckmarks && (
              <CheckCircle2Icon className="h-4 w-4 text-green-600 flex-shrink-0" />
            )}
            <span className="text-foreground">{feature.title}</span>
            {feature.badge && (
              <Badge
                variant={feature.badgeVariant || "secondary"}
                className="text-xs"
              >
                {feature.badge}
              </Badge>
            )}
          </li>
        ))}
      </ul>
    );
  }

  // Detailed variant - grid with icons and descriptions
  return (
    <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className="flex items-start gap-3 p-3 sm:p-4 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
          >
            {Icon && (
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-sm text-foreground">
                  {feature.title}
                </p>
                {feature.badge && (
                  <Badge
                    variant={feature.badgeVariant || "secondary"}
                    className="text-xs"
                  >
                    {feature.badge}
                  </Badge>
                )}
              </div>
              {feature.description && (
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
