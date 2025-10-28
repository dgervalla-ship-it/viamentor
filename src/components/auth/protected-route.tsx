/**
 * VIAMENTOR - Route protégée
 * Redirige vers login si non authentifié
 */

import * as React from "react";
import { useAuth } from "../../lib/auth/auth-context";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  allowedRoles?: string[];
}

export function ProtectedRoute({
  children,
  redirectTo = '/login',
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [checking, setChecking] = React.useState(true);

  React.useEffect(() => {
    if (!loading) {
      if (!user) {
        // Utilisateur non connecté → redirection login
        const currentPath = window.location.pathname;
        window.location.href = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`;
      } else if (allowedRoles) {
        // Vérifier les rôles (si nécessaire)
        // Pour l'instant, on laisse passer tout le monde connecté
        setChecking(false);
      } else {
        setChecking(false);
      }
    }
  }, [user, loading, redirectTo, allowedRoles]);

  if (loading || (checking && user)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-sm text-muted-foreground">Vérification...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirection en cours
  }

  return <>{children}</>;
}

