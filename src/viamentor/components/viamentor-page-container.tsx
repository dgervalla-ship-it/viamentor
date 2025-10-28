/**
 * VIAMENTOR - Page Container
 * Container réutilisable pour toutes les pages avec layout standardisé
 *
 * @module components/viamentor-page-container
 * @version 1.0.0
 */

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  centered?: boolean;
}

// ============================================================================
// MAX WIDTH VARIANTS
// ============================================================================

const maxWidthVariants = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-[1400px]",
  full: "max-w-full",
};

// ============================================================================
// PADDING VARIANTS
// ============================================================================

const paddingVariants = {
  none: "",
  sm: "px-4 py-4 sm:px-6 sm:py-6",
  md: "px-4 py-6 sm:px-6 sm:py-8 lg:px-8",
  lg: "px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16",
};

// ============================================================================
// COMPONENT
// ============================================================================

export function PageContainer({
  children,
  className,
  maxWidth = "xl",
  padding = "md",
  centered = false,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-background",
        centered && "flex items-center justify-center",
        className
      )}
    >
      <div
        className={cn(
          "w-full mx-auto",
          maxWidthVariants[maxWidth],
          paddingVariants[padding]
        )}
      >
        {children}
      </div>
    </div>
  );
}
