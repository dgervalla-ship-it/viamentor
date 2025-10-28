/**
 * Viamentor - Loading Spinner Component
 * Pour Suspense boundaries (lazy loading)
 */

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

export interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function LoadingSpinner({ 
  fullScreen = false, 
  size = "md",
  className 
}: LoadingSpinnerProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className={cn(sizeClasses.lg, "animate-spin text-primary")} />
          <p className="text-sm text-muted-foreground animate-pulse">
            Chargement...
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className={cn(sizeClasses[size], "animate-spin text-primary", className)} />
    </div>
  );
}

/**
 * Skeleton pour composants lourds
 */
export function PageSkeleton() {
  return (
    <div className="space-y-4 p-6">
      <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    </div>
  );
}

