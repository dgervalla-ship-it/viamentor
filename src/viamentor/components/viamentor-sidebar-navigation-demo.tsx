/**
 * VIAMENTOR - Sidebar Navigation Demo
 * Démonstration de la navigation optimisée avec preview responsive
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MonitorIcon,
  TabletIcon,
  SmartphoneIcon,
  CheckCircle2Icon,
} from "lucide-react";
import {
  OPTIMIZED_SCHOOL_ADMIN_NAV,
  OPTIMIZED_I18N,
} from "@/viamentor/data/viamentor-sidebar-navigation-optimized";

export function SidebarNavigationDemo() {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const locale = "fr";
  const t = OPTIMIZED_I18N[locale];

  const deviceSizes = {
    desktop: "w-full max-w-6xl",
    tablet: "w-full max-w-2xl",
    mobile: "w-full max-w-sm",
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Navigation Sidebar Optimisée
            </h1>
            <p className="text-muted-foreground">
              Solution responsive complète pour mobile, tablette et desktop
            </p>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle2Icon className="h-4 w-4 mr-1" />
            Optimisé
          </Badge>
        </div>

        {/* Device Selector */}
        <div className="flex items-center gap-2">
          <Button
            variant={device === "desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => setDevice("desktop")}
          >
            <MonitorIcon className="h-4 w-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant={device === "tablet" ? "default" : "outline"}
            size="sm"
            onClick={() => setDevice("tablet")}
          >
            <TabletIcon className="h-4 w-4 mr-2" />
            Tablette
          </Button>
          <Button
            variant={device === "mobile" ? "default" : "outline"}
            size="sm"
            onClick={() => setDevice("mobile")}
          >
            <SmartphoneIcon className="h-4 w-4 mr-2" />
            Mobile
          </Button>
        </div>
      </div>

      {/* Preview */}
      <div className="flex justify-center">
        <div className={`${deviceSizes[device]} transition-all duration-300`}>
          <div className="border rounded-lg overflow-hidden bg-card">
            {/* Mock Header */}
            <div className="h-16 border-b bg-background flex items-center px-4 gap-4">
              {(device === "mobile" || device === "tablet") && (
                <Button variant="ghost" size="icon">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              )}
              <div className="flex-1">
                <div className="h-8 bg-muted rounded w-full max-w-md" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-muted rounded-full" />

                <div className="h-8 w-8 bg-muted rounded-full" />

                <div className="h-8 w-8 bg-muted rounded-full" />
              </div>
            </div>

            {/* Content */}
            <div className="flex">
              {/* Sidebar - visible sur desktop */}
              {device === "desktop" && (
                <div className="w-[280px] border-r bg-card p-4 space-y-6 max-h-[600px] overflow-y-auto">
                  {OPTIMIZED_SCHOOL_ADMIN_NAV.map((section) => (
                    <div key={section.id} className="space-y-2">
                      {section.label && (
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                          {t.navigation.sections[
                            section.id as keyof typeof t.navigation.sections
                          ] || section.label}
                        </div>
                      )}
                      <div className="space-y-1">
                        {section.items.map((item) => (
                          <div key={item.id} className="space-y-1">
                            <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-accent cursor-pointer">
                              <item.icon className="h-4 w-4 flex-shrink-0" />

                              <span className="text-sm flex-1 truncate">
                                {item.label}
                              </span>
                              {item.badge && (
                                <Badge variant="secondary" className="text-xs">
                                  {item.badge.type === "count"
                                    ? "45"
                                    : item.badge.value}
                                </Badge>
                              )}
                            </div>
                            {item.children && (
                              <div className="pl-6 space-y-1">
                                {item.children.map((child) => (
                                  <div
                                    key={child.id}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent cursor-pointer"
                                  >
                                    <child.icon className="h-3 w-3 flex-shrink-0" />

                                    <span className="text-xs truncate">
                                      {child.label}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Main Content */}
              <div className="flex-1 p-6 bg-background">
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-1/3" />

                  <div className="h-32 bg-muted rounded" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="h-24 bg-muted rounded" />

                    <div className="h-24 bg-muted rounded" />

                    <div className="h-24 bg-muted rounded" />
                  </div>
                  <div className="h-64 bg-muted rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <Tabs defaultValue="structure" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="structure">Structure</TabsTrigger>
          <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
          <TabsTrigger value="responsive">Responsive</TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="space-y-4">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Organisation Hiérarchique
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <div className="font-medium">Dashboard</div>
                  <div className="text-muted-foreground">
                    Point d'entrée principal avec vue d'ensemble
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <div className="font-medium">Gestion</div>
                  <div className="text-muted-foreground">
                    Élèves, Moniteurs, Véhicules, Planning - Opérations
                    quotidiennes
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <div className="font-medium">Finances</div>
                  <div className="text-muted-foreground">
                    Facturation, Factures, Paiements - Gestion financière
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <div className="font-medium">Analytics</div>
                  <div className="text-muted-foreground">
                    Performance, Utilisation, Résultats - Analyse et reporting
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                  5
                </div>
                <div>
                  <div className="font-medium">Conformité & Paramètres</div>
                  <div className="text-muted-foreground">
                    GDPR, Configuration, Support - Administration système
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2Icon className="h-4 w-4 text-green-600" />
                Navigation Intuitive
              </h4>
              <p className="text-sm text-muted-foreground">
                Maximum 2 niveaux de profondeur pour une navigation simple et
                rapide
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2Icon className="h-4 w-4 text-green-600" />
                Groupement Logique
              </h4>
              <p className="text-sm text-muted-foreground">
                Fonctionnalités similaires regroupées par catégories cohérentes
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2Icon className="h-4 w-4 text-green-600" />
                Badges Dynamiques
              </h4>
              <p className="text-sm text-muted-foreground">
                Notifications et compteurs pour les éléments nécessitant
                attention
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2Icon className="h-4 w-4 text-green-600" />
                Icons Cohérents
              </h4>
              <p className="text-sm text-muted-foreground">
                Iconographie claire et reconnaissable pour chaque section
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="responsive" className="space-y-4">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Adaptation Multi-Écrans
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MonitorIcon className="h-8 w-8 text-primary flex-shrink-0" />

                <div className="flex-1">
                  <div className="font-medium mb-1">Desktop (≥1024px)</div>
                  <p className="text-sm text-muted-foreground">
                    Sidebar fixe 280px à gauche, toujours visible, navigation
                    complète déployée
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <TabletIcon className="h-8 w-8 text-primary flex-shrink-0" />

                <div className="flex-1">
                  <div className="font-medium mb-1">
                    Tablette (768px - 1023px)
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Menu hamburger dans le header, sidebar en overlay avec
                    backdrop, fermeture automatique après navigation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <SmartphoneIcon className="h-8 w-8 text-primary flex-shrink-0" />

                <div className="flex-1">
                  <div className="font-medium mb-1">Mobile (&lt;768px)</div>
                  <p className="text-sm text-muted-foreground">
                    Menu hamburger optimisé, sidebar plein écran en overlay,
                    navigation tactile optimisée
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary */}
      <div className="border-l-4 border-green-600 bg-green-50 dark:bg-green-950/20 p-4 rounded-r-lg">
        <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
          ✓ Problème Résolu
        </h3>
        <p className="text-sm text-green-800 dark:text-green-200">
          Le conflit entre la sidebar et le menu mobile/tablette est maintenant
          résolu. La navigation est cohérente, logique et optimisée pour tous
          les appareils avec une hiérarchie visuelle claire et une expérience
          utilisateur intuitive.
        </p>
      </div>
    </div>
  );
}
