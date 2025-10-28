/**
 * VIAMENTOR - Quick Actions Demo Page
 * Page de démonstration de la barre de raccourcis globale
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  UsersIcon,
  PlusIcon,
  LayoutDashboardIcon,
  CheckCircle2Icon,
  SmartphoneIcon,
  TabletIcon,
  MonitorIcon,
} from "lucide-react";

export function ViaMenutorQuickActionsDemoPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Barre de Raccourcis Globale
        </h1>
        <p className="text-muted-foreground mt-2">
          Accès rapide aux actions les plus utilisées sur mobile et tablette
        </p>
      </div>

      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Vue d'ensemble</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            La barre de raccourcis est une fonctionnalité mobile qui permet un
            accès rapide aux 4 actions les plus importantes de l'application.
            Elle est positionnée en bas de l'écran, au-dessus de la barre de
            recherche du navigateur.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              <SmartphoneIcon className="h-5 w-5 text-primary" />

              <div>
                <div className="font-medium text-sm">Mobile</div>
                <div className="text-xs text-muted-foreground">Visible</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              <TabletIcon className="h-5 w-5 text-primary" />

              <div>
                <div className="font-medium text-sm">Tablette</div>
                <div className="text-xs text-muted-foreground">Visible</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
              <MonitorIcon className="h-5 w-5 text-muted-foreground" />

              <div>
                <div className="font-medium text-sm">Desktop</div>
                <div className="text-xs text-muted-foreground">Masquée</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Les 4 Actions Principales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <LayoutDashboardIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm mb-1">
                  Tableau de Bord
                </div>
                <p className="text-xs text-muted-foreground">
                  Accès rapide au tableau de bord principal avec vue d'ensemble
                  des KPIs et activités récentes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CalendarIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm mb-1">Planning</div>
                <p className="text-xs text-muted-foreground">
                  Consultation et gestion du planning des leçons, disponibilités
                  des moniteurs et réservations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <UsersIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm mb-1">Élèves</div>
                <p className="text-xs text-muted-foreground">
                  Gestion des élèves, consultation des dossiers, progression et
                  historique des leçons.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border rounded-lg">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <PlusIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm mb-1">Nouvelle Leçon</div>
                <p className="text-xs text-muted-foreground">
                  Création rapide d'une nouvelle leçon avec sélection de
                  l'élève, moniteur, véhicule et horaire.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Card */}
      <Card>
        <CardHeader>
          <CardTitle>Fonctionnalités Techniques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2Icon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />

              <div>
                <div className="font-medium text-sm">Position Intelligente</div>
                <p className="text-xs text-muted-foreground">
                  Utilise{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    env(safe-area-inset-bottom)
                  </code>{" "}
                  pour s'adapter automatiquement à la barre de recherche du
                  navigateur et aux encoches des appareils.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2Icon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />

              <div>
                <div className="font-medium text-sm">Responsive Design</div>
                <p className="text-xs text-muted-foreground">
                  Visible uniquement sur mobile et tablette (&lt; 1024px). Sur
                  desktop, la navigation complète est disponible dans la
                  sidebar.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2Icon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />

              <div>
                <div className="font-medium text-sm">
                  Composant Réutilisable
                </div>
                <p className="text-xs text-muted-foreground">
                  Le composant{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    QuickActionsBar
                  </code>{" "}
                  peut être personnalisé avec différentes actions selon le
                  contexte de la page.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2Icon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />

              <div>
                <div className="font-medium text-sm">Support des Badges</div>
                <p className="text-xs text-muted-foreground">
                  Possibilité d'afficher des badges de notification sur chaque
                  action pour indiquer des éléments nécessitant attention.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2Icon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />

              <div>
                <div className="font-medium text-sm">Performance Optimisée</div>
                <p className="text-xs text-muted-foreground">
                  Position fixed avec z-index élevé pour rester visible lors du
                  scroll, sans impact sur les performances.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Comment Tester</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="flex-shrink-0">
                1
              </Badge>
              <p className="text-sm">
                Ouvrez les outils de développement de votre navigateur (F12)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="flex-shrink-0">
                2
              </Badge>
              <p className="text-sm">
                Activez le mode responsive et sélectionnez un appareil mobile ou
                tablette
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="flex-shrink-0">
                3
              </Badge>
              <p className="text-sm">
                La barre de raccourcis apparaîtra en bas de l'écran avec les 4
                actions principales
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="flex-shrink-0">
                4
              </Badge>
              <p className="text-sm">
                Testez la navigation en cliquant sur chaque action
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spacer for mobile view */}
      <div className="h-20 lg:h-0" />
    </div>
  );
}
