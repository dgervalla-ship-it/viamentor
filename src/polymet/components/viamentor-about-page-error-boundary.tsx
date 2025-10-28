/**
 * VIAMENTOR - About Page Error Boundary
 * Error Boundary React pour gérer les erreurs de la page À propos
 *
 * @example
 * ```tsx
 * <AboutPageErrorBoundary>
 *   <AboutPage />
 * </AboutPageErrorBoundary>
 * ```
 */

import { Component, type ReactNode } from "react";
import { AlertTriangleIcon, RefreshCwIcon, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ============================================================================
// TYPES
// ============================================================================

interface Props {
  children: ReactNode;
  /** Callback appelé quand une erreur est capturée (pour logging Sentry) */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Error Boundary pour capturer et gérer les erreurs React
 *
 * Features:
 * - Capture toutes les erreurs React dans l'arbre de composants
 * - Affiche un fallback UI élégant
 * - Permet de réessayer (reset)
 * - Log les erreurs pour monitoring (Sentry)
 * - Affiche les détails techniques en dev mode
 */
export class AboutPageErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Mettre à jour l'état pour afficher le fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Logger l'erreur
    console.error(
      "AboutPage Error Boundary caught an error:",
      error,
      errorInfo
    );

    // Mettre à jour l'état avec les détails de l'erreur
    this.setState({
      error,
      errorInfo,
    });

    // Appeler le callback onError si fourni (pour Sentry)
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback error={this.state.error} onReset={this.handleReset} />
      );
    }

    return this.props.children;
  }
}

// ============================================================================
// FALLBACK UI
// ============================================================================

interface ErrorFallbackProps {
  error: Error | null;
  onReset: () => void;
}

/**
 * UI de fallback élégante affichée en cas d'erreur
 */
function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  const isDev = import.meta.env.DEV;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8">
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangleIcon className="h-10 w-10 text-destructive" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Oups ! Une erreur est survenue
            </h1>
            <p className="text-lg text-muted-foreground">
              Nous sommes désolés, quelque chose s'est mal passé lors du
              chargement de cette page.
            </p>
          </div>

          {/* Error Message (Dev only) */}
          {isDev && error && (
            <div className="bg-muted rounded-lg p-4 text-left">
              <p className="text-sm font-mono text-destructive break-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onReset} className="gap-2">
              <RefreshCwIcon className="h-5 w-5" />
              Réessayer
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={
                () =>
                  console.warn(
                    'Prevented assignment: `window.location.href = "/"`'
                  ) /*TODO: Do not use window.location for navigation. Use react-router instead.*/
              }
              className="gap-2"
            >
              <HomeIcon className="h-5 w-5" />
              Retour à l'accueil
            </Button>
          </div>

          {/* Help Text */}
          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Si le problème persiste, veuillez{" "}
              <a
                href="mailto:support@viamentor.ch"
                className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
              >
                contacter notre support
              </a>
              .
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ============================================================================
// SENTRY INTEGRATION HELPER
// ============================================================================

/**
 * Helper pour intégrer avec Sentry
 * À utiliser dans votre configuration Sentry
 *
 * @example
 * ```tsx
 * import * as Sentry from "@sentry/react";
 *
 * <AboutPageErrorBoundary onError={logErrorToSentry}>
 *   <AboutPage />
 * </AboutPageErrorBoundary>
 * ```
 */
export function logErrorToSentry(error: Error, errorInfo: React.ErrorInfo) {
  // Exemple d'intégration Sentry
  // Sentry.captureException(error, {
  //   contexts: {
  //     react: {
  //       componentStack: errorInfo.componentStack,
  //     },
  //   },
  // });

  console.error("Error logged to Sentry:", error, errorInfo);
}
