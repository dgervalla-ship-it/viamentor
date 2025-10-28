/**
 * VIAMENTOR - Generic Error Page
 * Page d'erreur générique avec détails techniques et recovery actions
 *
 * @module pages/viamentor-error-page
 * @version 2.0.0 - Refactored with ErrorContainer
 */

import { ErrorContainer } from "@/polymet/components/viamentor-error-container";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  HomeIcon,
  RefreshCwIcon,
  AlertTriangleIcon,
  ChevronDownIcon,
  CopyIcon,
  CheckIcon,
} from "lucide-react";
import { useState } from "react";

// ============================================================================
// TYPES
// ============================================================================

interface ErrorPageProps {
  locale?: "fr" | "de" | "it" | "en";
  error?: Error;
  errorInfo?: {
    componentStack?: string;
  };
  resetError?: () => void;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Une erreur est survenue",
    subtitle: "Erreur inattendue",
    description:
      "Désolé, une erreur inattendue s'est produite. Nos équipes ont été notifiées.",
    whatHappened: "Que s'est-il passé ?",
    errorMessage: "Message d'erreur",
    technicalDetails: "Détails techniques",
    showDetails: "Afficher les détails",
    hideDetails: "Masquer les détails",
    copyError: "Copier l'erreur",
    errorCopied: "Erreur copiée !",
    whatToDo: "Que faire ?",
    suggestions: [
      "Rafraîchissez la page pour réessayer",
      "Retournez à la page d'accueil",
      "Si le problème persiste, contactez le support",
      "Vérifiez votre connexion internet",
    ],

    tryAgain: "Réessayer",
    goHome: "Retour à l'accueil",
    contactSupport: "Contacter le support",
    errorId: "ID d'erreur",
    timestamp: "Horodatage",
  },
  de: {
    title: "Ein Fehler ist aufgetreten",
    subtitle: "Unerwarteter Fehler",
    description:
      "Entschuldigung, ein unerwarteter Fehler ist aufgetreten. Unsere Teams wurden benachrichtigt.",
    whatHappened: "Was ist passiert?",
    errorMessage: "Fehlermeldung",
    technicalDetails: "Technische Details",
    showDetails: "Details anzeigen",
    hideDetails: "Details ausblenden",
    copyError: "Fehler kopieren",
    errorCopied: "Fehler kopiert!",
    whatToDo: "Was tun?",
    suggestions: [
      "Aktualisieren Sie die Seite, um es erneut zu versuchen",
      "Kehren Sie zur Startseite zurück",
      "Wenn das Problem weiterhin besteht, kontaktieren Sie den Support",
      "Überprüfen Sie Ihre Internetverbindung",
    ],

    tryAgain: "Erneut versuchen",
    goHome: "Zur Startseite",
    contactSupport: "Support kontaktieren",
    errorId: "Fehler-ID",
    timestamp: "Zeitstempel",
  },
  it: {
    title: "Si è verificato un errore",
    subtitle: "Errore imprevisto",
    description:
      "Spiacenti, si è verificato un errore imprevisto. I nostri team sono stati notificati.",
    whatHappened: "Cosa è successo?",
    errorMessage: "Messaggio di errore",
    technicalDetails: "Dettagli tecnici",
    showDetails: "Mostra dettagli",
    hideDetails: "Nascondi dettagli",
    copyError: "Copia errore",
    errorCopied: "Errore copiato!",
    whatToDo: "Cosa fare?",
    suggestions: [
      "Aggiorna la pagina per riprovare",
      "Torna alla home",
      "Se il problema persiste, contatta il supporto",
      "Verifica la tua connessione internet",
    ],

    tryAgain: "Riprova",
    goHome: "Torna alla home",
    contactSupport: "Contatta il supporto",
    errorId: "ID errore",
    timestamp: "Timestamp",
  },
  en: {
    title: "An error occurred",
    subtitle: "Unexpected error",
    description:
      "Sorry, an unexpected error occurred. Our teams have been notified.",
    whatHappened: "What happened?",
    errorMessage: "Error message",
    technicalDetails: "Technical details",
    showDetails: "Show details",
    hideDetails: "Hide details",
    copyError: "Copy error",
    errorCopied: "Error copied!",
    whatToDo: "What to do?",
    suggestions: [
      "Refresh the page to try again",
      "Return to the home page",
      "If the problem persists, contact support",
      "Check your internet connection",
    ],

    tryAgain: "Try again",
    goHome: "Back to home",
    contactSupport: "Contact support",
    errorId: "Error ID",
    timestamp: "Timestamp",
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function ErrorPage({
  locale = "fr",
  error,
  errorInfo,
  resetError,
}: ErrorPageProps) {
  const t = translations[locale];
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Generate error ID and timestamp
  const errorId = `ERR-${Date.now().toString(36).toUpperCase()}`;
  const timestamp = new Date().toISOString();

  const handleRefresh = () => {
    if (resetError) {
      resetError();
    } else {
      console.warn(
        "Prevented function call: `window.location.reload()`"
      ) /*TODO: Do not use window.location for navigation. Use react-router instead.*/;
    }
  };

  const handleCopyError = async () => {
    const errorDetails = `
Error ID: ${errorId}
Timestamp: ${timestamp}
Message: ${error?.message || "Unknown error"}
Stack: ${error?.stack || "No stack trace"}
Component Stack: ${errorInfo?.componentStack || "No component stack"}
    `.trim();

    try {
      await navigator.clipboard.writeText(errorDetails);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy error:", err);
    }
  };

  return (
    <ErrorContainer
      title={t.title}
      description={t.description}
      icon={AlertTriangleIcon}
      iconVariant="destructive"
      metadata={[
        { label: t.errorId, value: errorId },
        { label: t.timestamp, value: timestamp },
      ]}
      primaryAction={{
        label: t.tryAgain,
        icon: RefreshCwIcon,
        onClick: handleRefresh,
      }}
      secondaryAction={{
        label: t.goHome,
        icon: HomeIcon,
        href: "/",
      }}
    >
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangleIcon className="w-4 h-4" />

          <AlertTitle>{t.errorMessage}</AlertTitle>
          <AlertDescription className="mt-2 font-mono text-xs">
            {error.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Technical Details Collapsible */}
      {(error?.stack || errorInfo?.componentStack) && (
        <Collapsible
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          className="mb-6"
        >
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              {isDetailsOpen ? t.hideDetails : t.showDetails}
              <ChevronDownIcon
                className={`w-4 h-4 ml-2 transition-transform ${
                  isDetailsOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="bg-muted rounded-lg p-4 space-y-4">
              {error?.stack && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      Stack Trace
                    </h3>
                    <Button variant="ghost" size="sm" onClick={handleCopyError}>
                      {isCopied ? (
                        <>
                          <CheckIcon className="w-3 h-3 mr-1" />

                          {t.errorCopied}
                        </>
                      ) : (
                        <>
                          <CopyIcon className="w-3 h-3 mr-1" />

                          {t.copyError}
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                </div>
              )}
              {errorInfo?.componentStack && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    Component Stack
                  </h3>
                  <pre className="text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap">
                    {errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Divider */}
      <div className="border-t border-border my-8" />

      {/* What to do */}
      <div className="text-left">
        <h2 className="text-sm font-semibold text-foreground mb-4">
          {t.whatToDo}
        </h2>
        <ul className="space-y-2 mb-6">
          {t.suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="text-primary mt-0.5">•</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>

        {/* Support Button */}
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          {t.contactSupport}
        </Button>
      </div>
    </ErrorContainer>
  );
}
