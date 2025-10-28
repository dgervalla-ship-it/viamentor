/**
 * VIAMENTOR - Error Boundary
 * Composant Error Boundary pour gérer les erreurs de rendu
 */

"use client";

import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, RefreshCwIcon, HomeIcon } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
          <div className="rounded-full bg-destructive/10 p-4 mb-4">
            <AlertCircleIcon className="h-12 w-12 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Une erreur est survenue</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Nous sommes désolés, une erreur inattendue s'est produite. Veuillez
            réessayer ou contacter le support si le problème persiste.
          </p>
          {this.state.error && (
            <details className="mb-6 text-left max-w-2xl w-full">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                Détails techniques
              </summary>
              <pre className="mt-2 rounded-lg bg-muted p-4 text-xs overflow-auto">
                {this.state.error.toString()}
              </pre>
            </details>
          )}
          <div className="flex gap-3">
            <Button onClick={this.handleReset} variant="default">
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Réessayer
            </Button>
            <Button
              onClick={
                () =>
                  console.warn(
                    'Prevented assignment: `window.location.href = "/"`'
                  ) /*TODO: Do not use window.location for navigation. Use react-router instead.*/
              }
              variant="outline"
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
