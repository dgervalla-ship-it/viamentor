/**
 * VIAMENTOR - System Configuration Page
 * Configuration globale de la plateforme pour Super Admin
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SettingsIcon,
  DatabaseIcon,
  MailIcon,
  ShieldIcon,
  SaveIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface SystemConfigPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Configuration Système",
    description: "Paramètres globaux de la plateforme Viamentor",
    save: "Enregistrer",
    tabs: {
      general: "Général",
      database: "Base de données",
      email: "Email",
      security: "Sécurité",
    },
    general: {
      platformName: "Nom de la plateforme",
      platformUrl: "URL de la plateforme",
      maintenanceMode: "Mode maintenance",
      maintenanceMessage: "Message de maintenance",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function SystemConfigPage({ locale = "fr" }: SystemConfigPageProps) {
  const t = translations[locale];

  return (
    <div className="flex min-h-screen flex-col gap-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t.title}
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            {t.description}
          </p>
        </div>

        <Button className="h-11">
          <SaveIcon className="mr-2 h-4 w-4" />

          {t.save}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="general">
            <SettingsIcon className="mr-2 h-4 w-4" />

            {t.tabs.general}
          </TabsTrigger>
          <TabsTrigger value="database">
            <DatabaseIcon className="mr-2 h-4 w-4" />

            {t.tabs.database}
          </TabsTrigger>
          <TabsTrigger value="email">
            <MailIcon className="mr-2 h-4 w-4" />

            {t.tabs.email}
          </TabsTrigger>
          <TabsTrigger value="security">
            <ShieldIcon className="mr-2 h-4 w-4" />

            {t.tabs.security}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="platform-name">{t.general.platformName}</Label>
                <Input
                  id="platform-name"
                  defaultValue="Viamentor"
                  className="h-11 border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform-url">{t.general.platformUrl}</Label>
                <Input
                  id="platform-url"
                  defaultValue="https://viamentor.ch"
                  className="h-11 border-border"
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label>{t.general.maintenanceMode}</Label>
                  <p className="text-sm text-muted-foreground">
                    Activer le mode maintenance pour tous les tenants
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card className="p-6">
            <div className="flex h-[300px] items-center justify-center text-muted-foreground">
              Configuration base de données - À implémenter
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card className="p-6">
            <div className="flex h-[300px] items-center justify-center text-muted-foreground">
              Configuration email - À implémenter
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <div className="flex h-[300px] items-center justify-center text-muted-foreground">
              Configuration sécurité - À implémenter
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
