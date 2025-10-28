/**
 * VIAMENTOR - Demo Stats Grid Component
 * Grille de statistiques réutilisable pour afficher des métriques
 */

import { ReactNode } from "react";
import { ShapesIcon as LucideIcon } from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface StatItem {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  color?: string;
}

interface DemoStatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function DemoStatsGrid({
  stats,
  columns = 4,
  className = "",
}: DemoStatsGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 ${className}`}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="p-4 bg-card border border-border rounded-lg text-center hover:shadow-md transition-shadow"
          >
            {Icon && (
              <div className="flex justify-center mb-2">
                <div
                  className={`h-10 w-10 rounded-lg ${stat.color || "bg-primary/10"} flex items-center justify-center`}
                >
                  <Icon
                    className={`h-5 w-5 ${stat.color ? "" : "text-primary"}`}
                  />
                </div>
              </div>
            )}
            <p className="text-2xl sm:text-3xl font-bold text-primary">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            {stat.description && (
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
