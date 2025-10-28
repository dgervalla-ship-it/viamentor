/**
 * VIAMENTOR - Demo Section Component
 * Section réutilisable pour organiser le contenu des pages de démonstration
 */

import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShapesIcon as LucideIcon } from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface DemoSectionProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
  variant?: "default" | "card" | "transparent";
  className?: string;
  headerActions?: ReactNode;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function DemoSection({
  title,
  description,
  icon: Icon,
  children,
  variant = "card",
  className = "",
  headerActions,
}: DemoSectionProps) {
  // Transparent variant - no card wrapper
  if (variant === "transparent") {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-5 w-5 text-primary" />}
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {title}
              </h2>
            </div>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {headerActions && <div>{headerActions}</div>}
        </div>
        <div>{children}</div>
      </div>
    );
  }

  // Card variant
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1.5 flex-1">
            <CardTitle className="flex items-center gap-2">
              {Icon && <Icon className="h-5 w-5 text-primary" />}
              {title}
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerActions && (
            <div className="flex-shrink-0">{headerActions}</div>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
