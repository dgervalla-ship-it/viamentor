/**
 * VIAMENTOR - Loading Page
 * Composant de chargement avec spinner et message
 */

"use client";

import { cn } from "@/lib/utils";

export interface LoadingPageProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export function LoadingPage({
  message = "Chargement...",
  fullScreen = false,
  className,
}: LoadingPageProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        fullScreen ? "min-h-screen" : "min-h-[400px]",
        className
      )}
    >
      {/* Spinner */}
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />

        <div className="absolute inset-0 h-16 w-16 animate-pulse rounded-full border-4 border-primary/20" />
      </div>

      {/* Message */}
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">{message}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Veuillez patienter...
        </p>
      </div>

      {/* Dots animation */}
      <div className="flex gap-1">
        <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />

        <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />

        <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
      </div>
    </div>
  );
}

export default LoadingPage;
