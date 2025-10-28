/**
 * VIAMENTOR - Makeups Settings Page
 * Page paramètres rattrapages
 */

"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { MakeupsConfigForm } from "@/viamentor/components/viamentor-makeups-config-form";
import { MakeupsEmailTemplates } from "@/viamentor/components/viamentor-makeups-email-templates";
import { MakeupsAnalyticsDashboard } from "@/viamentor/components/viamentor-makeups-analytics-dashboard";
import type { MakeupsLocale } from "@/viamentor/data/viamentor-makeups-i18n";
import { makeupsTranslations } from "@/viamentor/data/viamentor-makeups-i18n";
import {
  MOCK_MAKEUP_CONFIGS,
  MOCK_EMAIL_TEMPLATES,
  MOCK_MAKEUP_ANALYTICS,
} from "@/viamentor/data/viamentor-makeups-data";

/**
 * Props
 */
interface MakeupsSettingsPageProps {
  locale?: MakeupsLocale;
}

/**
 * Page principale
 */
export function MakeupsSettingsPage({
  locale = "fr",
}: MakeupsSettingsPageProps) {
  const t = makeupsTranslations[locale];
  const [config] = useState(MOCK_MAKEUP_CONFIGS[0]);
  const [templates] = useState(MOCK_EMAIL_TEMPLATES);
  const [analytics] = useState(MOCK_MAKEUP_ANALYTICS);

  return (
    <div className="flex-1 space-y-6 p-8">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/settings">
              {t.breadcrumb.settings}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{t.breadcrumb.makeups}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold tracking-tight">{t.title}</h3>
        <p className="text-muted-foreground">{t.description}</p>
      </div>

      <Separator />

      {/* Configuration Form */}
      <MakeupsConfigForm
        config={config}
        locale={locale}
        onSave={async (data, category) => {
          console.log("Saving config:", { data, category });
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
      />

      <Separator />

      {/* Email Templates */}
      <MakeupsEmailTemplates
        templates={templates}
        locale={locale}
        onSave={async (template) => {
          console.log("Saving template:", template);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
        onRestore={async (templateId) => {
          console.log("Restoring template:", templateId);
          await new Promise((resolve) => setTimeout(resolve, 500));
        }}
        onTest={async (templateId, email) => {
          console.log("Testing template:", { templateId, email });
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
      />

      <Separator />

      {/* Analytics Dashboard */}
      <MakeupsAnalyticsDashboard
        analytics={analytics}
        locale={locale}
        onPeriodChange={(period) => {
          console.log("Period changed:", period);
        }}
      />
    </div>
  );
}
