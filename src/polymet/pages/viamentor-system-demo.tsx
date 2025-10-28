/**
 * VIAMENTOR System Demo Page
 * Architecture modulaire avec composants réutilisables
 *
 * Démonstration complète de l'intégration des systèmes :
 * - RBAC avec 15 rôles hiérarchiques
 * - Thème personnalisable avec variables CSS
 * - i18n avec règles grammaticales strictes
 *
 * @module pages/viamentor-system-demo
 * @version 3.0.0 - Refactored with modular components
 */

import { Link } from "react-router-dom";
import { ThemeProvider } from "@/polymet/components/viamentor-theme-provider";
import { LocaleProvider } from "@/polymet/components/viamentor-locale-provider";
import { DemoHeader } from "@/polymet/components/viamentor-demo-header";
import { DemoSection } from "@/polymet/components/viamentor-demo-section";
import { DemoStatsGrid } from "@/polymet/components/viamentor-demo-stats-grid";
import { ThemeControls } from "@/polymet/components/viamentor-theme-controls";
import { LocaleControls } from "@/polymet/components/viamentor-locale-controls";
import { RoleSelector } from "@/polymet/components/viamentor-role-selector";
import { TranslationsDemo } from "@/polymet/components/viamentor-translations-demo";
import { FormatsDemo } from "@/polymet/components/viamentor-formats-demo";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SettingsIcon,
  BuildingIcon,
  ShieldIcon,
  PaletteIcon,
} from "lucide-react";

// ============================================================================
// RBAC STATS SECTION
// ============================================================================

function RBACStats() {
  const rbacStats = [
    {
      label: "Rôles",
      value: "15",
      icon: ShieldIcon,
      description: "Hiérarchiques",
    },
    {
      label: "Niveaux",
      value: "5",
      icon: ShieldIcon,
      description: "De permissions",
    },
    {
      label: "Catégories",
      value: "12",
      icon: ShieldIcon,
      description: "De permissions",
    },
    {
      label: "Actions",
      value: "8",
      icon: ShieldIcon,
      description: "CRUD + Custom",
    },
  ];

  return (
    <DemoSection
      title="Architecture RBAC"
      description="Système de contrôle d'accès basé sur les rôles avec 15 rôles hiérarchiques, matrice de permissions complète, et isolation tenant avec RLS PostgreSQL."
      icon={ShieldIcon}
    >
      <DemoStatsGrid stats={rbacStats} columns={4} />
    </DemoSection>
  );
}

// ============================================================================
// THEME PALETTE SECTION
// ============================================================================

function ThemePalette() {
  return (
    <DemoSection title="Variables CSS" icon={PaletteIcon}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-3 bg-muted rounded-md">
          <p className="text-xs text-muted-foreground">Primary</p>
          <div className="h-12 bg-primary rounded mt-2" />
        </div>
        <div className="p-3 bg-muted rounded-md">
          <p className="text-xs text-muted-foreground">Secondary</p>
          <div className="h-12 bg-secondary rounded mt-2" />
        </div>
        <div className="p-3 bg-muted rounded-md">
          <p className="text-xs text-muted-foreground">Accent</p>
          <div className="h-12 bg-accent rounded mt-2" />
        </div>
      </div>
    </DemoSection>
  );
}

// ============================================================================
// MAIN CONTENT COMPONENT
// ============================================================================

function ViamentorSystemDemoContent() {
  return (
    <div className="min-h-screen bg-background">
      <DemoHeader
        title="VIAMENTOR System"
        description="Configuration globale - RBAC, Thème & i18n"
        icon={SettingsIcon}
        badges={[
          { label: "Clean Code", variant: "secondary" },
          { label: "Modulaire < 200 lignes", variant: "outline" },
        ]}
        actions={
          <Link to="/tenants">
            <Button variant="outline" size="sm">
              <BuildingIcon className="h-4 w-4 mr-2" />
              Gestion Tenants
            </Button>
          </Link>
        }
      />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="rbac">RBAC</TabsTrigger>
            <TabsTrigger value="theme">Thème</TabsTrigger>
            <TabsTrigger value="i18n">i18n</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ThemeControls />

              <LocaleControls />
            </div>
            <RoleSelector />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TranslationsDemo />

              <FormatsDemo />
            </div>
          </TabsContent>

          <TabsContent value="rbac" className="space-y-6">
            <RoleSelector />

            <RBACStats />
          </TabsContent>

          <TabsContent value="theme" className="space-y-6">
            <ThemeControls />

            <ThemePalette />
          </TabsContent>

          <TabsContent value="i18n" className="space-y-6">
            <LocaleControls />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TranslationsDemo />

              <FormatsDemo />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ============================================================================
// EXPORTED COMPONENT WITH PROVIDERS
// Architecture Clean : Séparation des concerns
// ============================================================================

export function ViamentorSystemDemo() {
  return (
    <ThemeProvider initialTheme="light">
      <LocaleProvider initialLocale="fr">
        <ViamentorSystemDemoContent />
      </LocaleProvider>
    </ThemeProvider>
  );
}
