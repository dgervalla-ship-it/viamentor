/**
 * VIAMENTOR - No Auth Info Page
 * Page d'information sur le mode sans authentification
 *
 * @module pages/viamentor-no-auth-info-page
 * @version 1.0.0
 */

"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  LockOpenIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  UserIcon,
  BuildingIcon,
  ShieldCheckIcon,
} from "lucide-react";

export function ViamentorNoAuthInfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center rounded-full bg-green-500/10 p-4">
            <LockOpenIcon className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold">Mode Sans Authentification</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Le système Viamentor fonctionne maintenant en mode développement.
            Accédez à toutes les pages sans avoir besoin de vous connecter.
          </p>
          <Badge variant="outline" className="text-green-600 border-green-600">
            ✅ Mode Activé
          </Badge>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Authentification */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-500/10 p-2">
                <XCircleIcon className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="font-semibold">Authentification</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                ❌ Supabase Auth désactivé
              </p>
              <p className="text-muted-foreground">❌ Login non requis</p>
              <p className="text-muted-foreground">
                ❌ Vérifications supprimées
              </p>
            </div>
          </Card>

          {/* Utilisateur Mock */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-500/10 p-2">
                <UserIcon className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="font-semibold">Utilisateur Mock</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Admin École</p>
              <p className="text-muted-foreground">school@viamentor.ch</p>
              <Badge variant="secondary" className="text-xs">
                school_admin
              </Badge>
            </div>
          </Card>

          {/* Tenant Mock */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-500/10 p-2">
                <BuildingIcon className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="font-semibold">Tenant Mock</h3>
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Auto-École Genève</p>
              <p className="text-muted-foreground">auto-ecole-geneve</p>
              <Badge variant="secondary" className="text-xs">
                tenant-mock-1
              </Badge>
            </div>
          </Card>
        </div>

        {/* Changes Summary */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">✅ Changements Effectués</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <XCircleIcon className="h-4 w-4 text-red-500" />
                Supprimé
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Hook useAuth() avec Supabase</li>
                <li>• Vérification isAuthenticated</li>
                <li>• Écrans de login obligatoire</li>
                <li>• Redirections vers /login</li>
                <li>• Validation tenant Supabase</li>
                <li>• Écrans d'erreur tenant</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
                Ajouté
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Hook useMockUser()</li>
                <li>• Utilisateur par défaut</li>
                <li>• Accès direct aux pages</li>
                <li>• Navigation sans friction</li>
                <li>• Hook useMockTenant()</li>
                <li>• Tenant par défaut</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Available Routes */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">🚀 Pages Accessibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { path: "/dashboard", label: "Dashboard École" },
              { path: "/instructor-dashboard", label: "Dashboard Moniteur" },
              { path: "/student-dashboard", label: "Dashboard Élève" },
              { path: "/students", label: "Gestion Élèves" },
              { path: "/instructors", label: "Gestion Moniteurs" },
              { path: "/vehicles", label: "Gestion Véhicules" },
              { path: "/tenants", label: "Gestion Tenants" },
              { path: "/planning", label: "Planning" },
              { path: "/billing", label: "Facturation" },
              { path: "/invoices", label: "Factures" },
              { path: "/payments", label: "Paiements" },
              { path: "/finance", label: "Finance Admin" },
              { path: "/financial/analytics", label: "Analytics Financières" },
              { path: "/instructors/analytics", label: "Analytics Moniteurs" },
              { path: "/vehicles/analytics", label: "Analytics Véhicules" },
              { path: "/exams/analytics", label: "Analytics Examens" },
              { path: "/compliance/gdpr", label: "RGPD" },
              { path: "/super-admin", label: "Super Admin" },
              { path: "/platform-admin", label: "Platform Admin" },
              { path: "/school-admin", label: "School Admin" },
              { path: "/instructor-manager", label: "Instructor Manager" },
              { path: "/marketing-manager", label: "Marketing Manager" },
              { path: "/secretary/dashboard", label: "Secrétariat" },
              { path: "/staff/prospects", label: "CRM Prospects" },
              {
                path: "/staff/marketing/campaigns",
                label: "Campagnes Marketing",
              },
              { path: "/reviews/dashboard", label: "Avis Google" },
              { path: "/settings/pricing", label: "Tarification" },
              { path: "/settings/notifications", label: "Notifications" },
            ].map((route) => (
              <Link key={route.path} to={route.path}>
                <Button
                  variant="outline"
                  className="w-full justify-between group"
                >
                  <span className="text-sm">{route.label}</span>
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ))}
          </div>
        </Card>

        {/* Benefits */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">🎯 Avantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Pour le Développement</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />

                  <span>Accès rapide sans login</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />

                  <span>Tests simplifiés</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />

                  <span>Pas de dépendances Supabase</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />

                  <span>Démo facile</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Pour la Démo</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />

                  <span>Navigation libre</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />

                  <span>Pas de friction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />

                  <span>Expérience fluide</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />

                  <span>Focus sur les fonctionnalités</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Warning */}
        <Card className="p-6 border-orange-500/50 bg-orange-500/5">
          <div className="flex items-start gap-3">
            <ShieldCheckIcon className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />

            <div className="space-y-2">
              <h3 className="font-semibold text-orange-700 dark:text-orange-400">
                ⚠️ Mode Développement Uniquement
              </h3>
              <p className="text-sm text-muted-foreground">
                Ce mode est conçu pour le développement et la démonstration. En
                production, vous devrez réactiver l'authentification Supabase,
                ajouter les vérifications de sécurité, et implémenter les
                permissions RBAC.
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/dashboard">
            <Button size="lg" className="gap-2">
              <ArrowRightIcon className="h-4 w-4" />
              Accéder au Dashboard
            </Button>
          </Link>
          <Link to="/students">
            <Button size="lg" variant="outline" className="gap-2">
              <UserIcon className="h-4 w-4" />
              Voir les Élèves
            </Button>
          </Link>
          <Link to="/instructors">
            <Button size="lg" variant="outline" className="gap-2">
              <UserIcon className="h-4 w-4" />
              Voir les Moniteurs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViamentorNoAuthInfoPage;
