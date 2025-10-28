/**
 * VIAMENTOR - Layout Demo Page
 * Architecture modulaire avec composants réutilisables
 *
 * Page de démonstration du système de layout avec tous les dashboards
 *
 * @version 2.0.0 - Refactored with modular components
 */

"use client";

import { DemoHeader } from "@/viamentor/components/viamentor-demo-header";
import { DemoSection } from "@/viamentor/components/viamentor-demo-section";
import { DemoFeatureList } from "@/viamentor/components/viamentor-demo-feature-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboardIcon,
  GraduationCapIcon,
  UserIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  CodeIcon,
  FileTextIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

// ============================================================================
// DASHBOARD CONFIGURATIONS
// ============================================================================

const dashboards = [
  {
    id: "school",
    title: "Dashboard École",
    description:
      "Dashboard pour School Admin avec KPIs, activité récente et examens",
    route: "/dashboard",
    icon: LayoutDashboardIcon,
    roles: [
      "Platform Admin",
      "Finance Admin",
      "Security Officer",
      "School Admin",
    ],

    features: [
      "KPIs: Élèves, Leçons, Moniteurs, Examens",
      "Activité récente en temps réel",
      "Examens à venir",
      "Alertes importantes",
      "Actions rapides",
    ],

    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    id: "instructor",
    title: "Dashboard Moniteur",
    description:
      "Dashboard pour Instructors avec planning, élèves et stats performance",
    route: "/instructor-dashboard",
    icon: GraduationCapIcon,
    roles: ["Instructor"],
    features: [
      "Planning du jour détaillé",
      "Élèves assignés avec progression",
      "Stats: Leçons, Note moyenne, Taux de réussite",
      "Avis récents des élèves",
    ],

    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    id: "student",
    title: "Dashboard Élève",
    description:
      "Dashboard pour Students avec progression, leçons et documents",
    route: "/student-dashboard",
    icon: UserIcon,
    roles: ["Student"],
    features: [
      "Progression globale avec barre",
      "Status examens théorique/pratique",
      "Prochaines leçons planifiées",
      "Progression par thème L-drive",
      "Documents et paiements",
    ],

    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
];

const layoutFeatures = [
  {
    title: "Sidebar Navigation",
    description: "Navigation RBAC avec collapse, badges et mobile responsive",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Header Global",
    description: "Breadcrumb, search, notifications, messages, quick actions",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Multi-tenant Routing",
    description: "Support de plusieurs auto-écoles avec routing dynamique",
    icon: CodeIcon,
  },
  {
    title: "Supabase Auth",
    description: "Authentification et validation tenant avec Supabase",
    icon: CheckCircleIcon,
  },
  {
    title: "i18n Support",
    description: "Support FR/DE/IT/EN avec formatage localisé",
    icon: FileTextIcon,
  },
  {
    title: "Theme Management",
    description: "Thème clair/sombre/système avec persistence",
    icon: LayoutDashboardIcon,
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function LayoutDemoPage() {
  return (
    <div className="space-y-8">
      <DemoHeader
        title="Layout Principal Viamentor"
        description="Système de layout complet avec Sidebar + Header, routing multi-tenant et auth Supabase"
        icon={LayoutDashboardIcon}
        badges={[
          { label: "Clean Code", variant: "secondary" },
          { label: "Modulaire", variant: "outline" },
        ]}
      />

      {/* Architecture Info */}
      <DemoSection
        title="Architecture"
        description="Structure: app/[locale]/[tenant]/layout.tsx avec Sidebar 280px + Header 64px + Main scrollable"
        icon={CodeIcon}
        variant="card"
        className="border-2 border-primary"
      >
        <DemoFeatureList
          features={layoutFeatures}
          variant="detailed"
          columns={3}
          showCheckmarks={false}
        />
      </DemoSection>

      {/* Dashboards */}
      <DemoSection
        title="Dashboards Disponibles"
        description="Trois dashboards adaptés aux différents rôles utilisateur"
        variant="transparent"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {dashboards.map((dashboard) => {
            const Icon = dashboard.icon;
            return (
              <Card
                key={dashboard.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg ${dashboard.bgColor} flex items-center justify-center mb-3`}
                  >
                    <Icon className={`h-6 w-6 ${dashboard.color}`} />
                  </div>
                  <CardTitle>{dashboard.title}</CardTitle>
                  <CardDescription>{dashboard.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Roles */}
                  <div>
                    <p className="text-sm font-medium mb-2">Rôles:</p>
                    <div className="flex flex-wrap gap-2">
                      {dashboard.roles.map((role, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <p className="text-sm font-medium mb-2">Fonctionnalités:</p>
                    <ul className="space-y-1">
                      {dashboard.features.map((feature, i) => (
                        <li key={i} className="text-xs flex items-start gap-2">
                          <CheckCircleIcon className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />

                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Button className="w-full" asChild>
                    <Link to={dashboard.route}>
                      Voir le dashboard
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DemoSection>

      {/* Documentation */}
      <DemoSection
        title="Documentation"
        description="Documentation complète de l'architecture layout"
        icon={FileTextIcon}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <p className="font-medium">Layout Architecture Doc</p>
              <p className="text-sm text-muted-foreground">
                Documentation complète avec routing, auth, RBAC, i18n
              </p>
            </div>
            <Button variant="outline" size="sm">
              Voir la doc
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <p className="font-medium">Components</p>
              <p className="text-sm text-muted-foreground">
                Sidebar, Header, ErrorBoundary, LoadingPage
              </p>
            </div>
            <Button variant="outline" size="sm">
              Voir les composants
            </Button>
          </div>
        </div>
      </DemoSection>

      {/* Implementation Notes */}
      <DemoSection title="Notes d'implémentation">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-4 border border-blue-200 dark:border-blue-900">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            🔵 Version actuelle: Mock data
          </p>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Cette version utilise des données mock pour la démonstration. En
            production, remplacer par:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-blue-800 dark:text-blue-200">
            <li>• Supabase Auth pour l'authentification</li>
            <li>• Validation tenant depuis la base de données</li>
            <li>• Permissions RBAC depuis Supabase</li>
            <li>• WebSocket realtime pour notifications</li>
          </ul>
        </div>

        <div className="rounded-lg bg-green-50 dark:bg-green-950/20 p-4 border border-green-200 dark:border-green-900">
          <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">
            ✅ Prêt pour production
          </p>
          <p className="text-sm text-green-800 dark:text-green-200">
            Le layout est prêt pour la production. Il suffit de:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-green-800 dark:text-green-200">
            <li>• Configurer les variables d'environnement Supabase</li>
            <li>• Implémenter les hooks d'authentification</li>
            <li>• Connecter les endpoints API</li>
            <li>• Activer le WebSocket realtime</li>
          </ul>
        </div>
      </DemoSection>
    </div>
  );
}

export default LayoutDemoPage;
