/**
 * VIAMENTOR Login Page
 *
 * Page de connexion avec formulaire et branding
 * Respecte Clean Code : < 200 lignes
 *
 * @module pages/viamentor-login-page
 * @version 1.0.0
 */

import { Link, useNavigate } from "react-router-dom";
import { LoginForm } from "@/polymet/components/viamentor-login-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheckIcon, SettingsIcon } from "lucide-react";

/**
 * Page de connexion VIAMENTOR
 *
 * @example
 * ```tsx
 * <Route path="/login" element={<ViamentorLoginPage />} />
 * ```
 */
export function ViamentorLoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Redirect to /app which will handle role-based routing
    navigate("/app", { replace: true });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex flex-col">
      {/* Top Bar */}
      <div className="p-4 flex justify-end gap-2">
        <Link to="/credentials">
          <Button variant="outline" size="sm">
            <ShieldCheckIcon className="h-4 w-4 mr-2" />
            Identifiants
          </Button>
        </Link>
        <Link to="/supabase-demo">
          <Button variant="outline" size="sm">
            <SettingsIcon className="h-4 w-4 mr-2" />
            Configuration
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Login Form Section - First on mobile */}
          <div className="flex items-center justify-center lg:order-2">
            <LoginForm onSuccess={handleLoginSuccess} />
          </div>

          {/* Branding Section - Second on mobile (bottom), first on desktop */}
          <div className="space-y-6 text-center lg:text-left lg:order-1">
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <ShieldCheckIcon className="h-12 w-12 text-primary" />

                <h1 className="text-4xl font-bold tracking-tight">VIAMENTOR</h1>
              </div>
              <p className="text-base text-muted-foreground">
                Plateforme SaaS pour auto-écoles suisses
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <Badge variant="secondary">Multi-tenant</Badge>
                <Badge variant="secondary">RBAC</Badge>
                <Badge variant="secondary">i18n FR/DE/IT/EN</Badge>
              </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-lg space-y-4">
              <h3 className="text-2xl font-semibold">Fonctionnalités</h3>
              <ul className="space-y-3 text-base text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Gestion des élèves et instructeurs
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Planning des leçons et examens
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Facturation et paiements
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Rapports et statistiques
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Conformité réglementaire suisse
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
