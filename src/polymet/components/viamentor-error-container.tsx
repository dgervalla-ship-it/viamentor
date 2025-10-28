/**
 * VIAMENTOR - Error Container
 * Container réutilisable pour pages d'erreur avec layout standardisé
 *
 * @module components/viamentor-error-container
 * @version 1.0.0
 */

import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ShapesIcon as LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

interface ErrorContainerProps {
  // Content
  title: string;
  description: string;
  icon: LucideIcon;
  iconVariant?: "default" | "destructive" | "warning" | "info";

  // Actions
  primaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
    icon?: LucideIcon;
  };

  // Additional content
  children?: ReactNode;
  metadata?: Array<{ label: string; value: string }>;

  // Styling
  className?: string;
  showLogo?: boolean;
}

// ============================================================================
// ICON VARIANT STYLES
// ============================================================================

const iconVariantStyles = {
  default: "bg-muted text-muted-foreground",
  destructive: "bg-destructive/10 text-destructive",
  warning: "bg-orange-500/10 text-orange-600 dark:text-orange-500",
  info: "bg-blue-500/10 text-blue-600 dark:text-blue-500",
};

// ============================================================================
// COMPONENT
// ============================================================================

export function ErrorContainer({
  title,
  description,
  icon: Icon,
  iconVariant = "default",
  primaryAction,
  secondaryAction,
  children,
  metadata,
  className,
  showLogo = true,
}: ErrorContainerProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background flex items-center justify-center p-4",
        className
      )}
    >
      <div className="w-full max-w-3xl">
        {/* Logo */}
        {showLogo && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">
                  V
                </span>
              </div>
              <span className="text-2xl font-bold text-foreground">
                VIAMENTOR
              </span>
            </div>
          </div>
        )}

        {/* Error Card */}
        <Card className="p-8 md:p-12">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center",
                iconVariantStyles[iconVariant]
              )}
            >
              <Icon className="w-12 h-12" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-3">
            {title}
          </h1>

          {/* Description */}
          <p className="text-center text-muted-foreground mb-6">
            {description}
          </p>

          {/* Metadata */}
          {metadata && metadata.length > 0 && (
            <div className="bg-muted rounded-lg p-4 mb-6 space-y-2 text-sm">
              {metadata.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{item.label}:</span>
                  <span className="font-mono text-foreground">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Additional Content */}
          {children && <div className="mb-6">{children}</div>}

          {/* Action Buttons */}
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {primaryAction &&
                (primaryAction.href ? (
                  <Button size="lg" asChild>
                    <Link to={primaryAction.href}>
                      {primaryAction.icon && (
                        <primaryAction.icon className="w-4 h-4 mr-2" />
                      )}
                      {primaryAction.label}
                    </Link>
                  </Button>
                ) : (
                  <Button size="lg" onClick={primaryAction.onClick}>
                    {primaryAction.icon && (
                      <primaryAction.icon className="w-4 h-4 mr-2" />
                    )}
                    {primaryAction.label}
                  </Button>
                ))}

              {secondaryAction &&
                (secondaryAction.href ? (
                  <Button variant="outline" size="lg" asChild>
                    <Link to={secondaryAction.href}>
                      {secondaryAction.icon && (
                        <secondaryAction.icon className="w-4 h-4 mr-2" />
                      )}
                      {secondaryAction.label}
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.icon && (
                      <secondaryAction.icon className="w-4 h-4 mr-2" />
                    )}
                    {secondaryAction.label}
                  </Button>
                ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
