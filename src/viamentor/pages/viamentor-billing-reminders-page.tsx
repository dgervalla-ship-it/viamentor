/**
 * VIAMENTOR - Billing Reminders Page
 * Page gestion rappels facturation avec relances automatiques, templates et historique
 *
 * ARCHITECTURE:
 * - Utilise les composants sections déjà créés
 * - Mock data et i18n importés depuis fichiers data
 * - Page légère qui compose les sections
 */

"use client";

import { useState } from "react";
import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RemindersStatsCards } from "@/viamentor/components/viamentor-reminders-stats-cards";
import { RemindersTable } from "@/viamentor/components/viamentor-reminders-table";
import { RemindersTemplatesTab } from "@/viamentor/components/viamentor-reminders-templates-tab";
import { RemindersSettingsTab } from "@/viamentor/components/viamentor-reminders-settings-tab";
import {
  billingRemindersTranslations,
  type BillingRemindersLocale,
} from "@/viamentor/data/viamentor-billing-reminders-i18n";
import {
  mockReminders,
  mockTemplates,
  calculateStats,
} from "@/viamentor/data/viamentor-billing-reminders-data";

// ============================================================================
// TYPES
// ============================================================================

interface BillingRemindersPageProps {
  locale?: BillingRemindersLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function BillingRemindersPage({
  locale = "fr",
}: BillingRemindersPageProps) {
  const t = billingRemindersTranslations[locale];
  const [reminders] = useState(mockReminders);
  const [templates] = useState(mockTemplates);
  const [autoReminders, setAutoReminders] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const stats = calculateStats(reminders);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />

            {t.actions.export}
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />

            {t.actions.create}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <RemindersStatsCards stats={stats} translations={t} />

      {/* Tabs */}
      <Tabs defaultValue="reminders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reminders">{t.tabs.reminders}</TabsTrigger>
          <TabsTrigger value="templates">{t.tabs.templates}</TabsTrigger>
          <TabsTrigger value="settings">{t.tabs.settings}</TabsTrigger>
        </TabsList>

        {/* Reminders Tab */}
        <TabsContent value="reminders" className="space-y-4">
          <RemindersTable reminders={reminders} translations={t} />
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <RemindersTemplatesTab templates={templates} translations={t} />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <RemindersSettingsTab
            autoReminders={autoReminders}
            emailNotifications={emailNotifications}
            smsEnabled={smsEnabled}
            onAutoRemindersChange={setAutoReminders}
            onEmailNotificationsChange={setEmailNotifications}
            onSmsEnabledChange={setSmsEnabled}
            translations={t}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default BillingRemindersPage;
