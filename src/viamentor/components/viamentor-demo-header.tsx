/**
 * VIAMENTOR - Demo Header Component
 * Header réutilisable pour toutes les pages de démonstration
 */

import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShapesIcon as LucideIcon } from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface DemoHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badges?: Array<{
    label: string;
    variant?: "default" | "secondary" | "outline" | "destructive";
    icon?: LucideIcon;
  }>;
  actions?: ReactNode;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function DemoHeader({
  title,
  description,
  icon: Icon,
  badges = [],
  actions,
  className = "",
}: DemoHeaderProps) {
  return (
    <div className={`border-b border-border bg-card ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left side */}
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              {Icon && (
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
              )}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                {title}
              </h1>
            </div>

            {description && (
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
                {description}
              </p>
            )}

            {badges.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {badges.map((badge, index) => {
                  const BadgeIcon = badge.icon;
                  return (
                    <Badge
                      key={index}
                      variant={badge.variant || "secondary"}
                      className="text-xs gap-1"
                    >
                      {BadgeIcon && <BadgeIcon className="h-3 w-3" />}
                      {badge.label}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right side - Actions */}
          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
