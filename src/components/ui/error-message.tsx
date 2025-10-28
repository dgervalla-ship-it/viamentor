/**
 * Viamentor - Error Message Component
 * Affichage d'erreurs utilisateur-friendly
 */

import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Alert, AlertDescription, AlertTitle } from "./alert";

export interface ErrorMessageProps {
  error?: Error | string | null;
  title?: string;
  retry?: () => void;
  fullScreen?: boolean;
  className?: string;
}

export const ErrorMessage = React.memo(function ErrorMessage({
  error,
  title = "Une erreur est survenue",
  retry,
  fullScreen = false,
  className,
}: ErrorMessageProps) {
  const errorMessage = React.useMemo(() => {
    if (!error) return "Une erreur inconnue s'est produite";
    if (typeof error === 'string') return error;
    return error.message || "Une erreur inconnue s'est produite";
  }, [error]);

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <div className="max-w-md w-full space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription className="mt-2">
              {errorMessage}
            </AlertDescription>
          </Alert>
          
          {retry && (
            <Button onClick={retry} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Réessayer
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("p-4", className)}>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-2 space-y-2">
          <p>{errorMessage}</p>
          {retry && (
            <Button onClick={retry} variant="outline" size="sm" className="mt-2">
              <RefreshCw className="mr-2 h-3 w-3" />
              Réessayer
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
});

/**
 * Inline error (pour formulaires)
 */
export interface InlineErrorProps {
  message?: string;
  className?: string;
}

export const InlineError = React.memo(function InlineError({ 
  message, 
  className 
}: InlineErrorProps) {
  if (!message) return null;

  return (
    <p className={cn("text-sm text-red-500 flex items-center gap-1 mt-1", className)}>
      <AlertCircle className="h-3 w-3" />
      {message}
    </p>
  );
});

