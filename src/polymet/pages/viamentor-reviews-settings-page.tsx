/**
 * VIAMENTOR - Reviews Settings Page
 * Page principale paramètres avis Google Business
 */

"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoIcon } from "lucide-react";
import { GoogleBusinessConfig } from "@/polymet/components/viamentor-google-business-config";
import { ReviewsWidget } from "@/polymet/components/viamentor-reviews-widget";
import { AutoInvitations } from "@/polymet/components/viamentor-auto-invitations";
import { CollectionAnalytics } from "@/polymet/components/viamentor-collection-analytics";
import {
  mockGoogleBusinessConfig,
  mockSyncConfig,
  mockFilteringPolicy,
  mockWidgetConfig,
  mockAutoInvitationConfig,
  mockCollectionAnalytics,
} from "@/polymet/data/viamentor-reviews-data";
import { reviewsTranslations } from "@/polymet/data/viamentor-reviews-i18n";
import type { ReviewsLocale } from "@/polymet/data/viamentor-reviews-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ReviewsSettingsPageProps {
  locale?: ReviewsLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ReviewsSettingsPage({
  locale = "fr",
}: ReviewsSettingsPageProps) {
  const t = reviewsTranslations[locale];
  const [activeTab, setActiveTab] = useState("config");

  return (
    <div className="flex flex-col gap-6 p-6 bg-background">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{t.page.breadcrumb}</span>
        </div>
        <h3 className="text-2xl font-semibold text-foreground">
          {t.page.title}
        </h3>
      </div>

      {/* Alert Info */}
      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
        <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />

        <AlertDescription className="text-sm text-blue-900 dark:text-blue-100">
          {t.alert.policy}
        </AlertDescription>
      </Alert>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="config" className="text-sm">
            Configuration
          </TabsTrigger>
          <TabsTrigger value="widget" className="text-sm">
            Widget
          </TabsTrigger>
          <TabsTrigger value="invitations" className="text-sm">
            Invitations
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-sm">
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Tab: Configuration */}
        <TabsContent value="config" className="mt-6 space-y-6">
          <GoogleBusinessConfig
            config={mockGoogleBusinessConfig}
            syncConfig={mockSyncConfig}
            filteringPolicy={mockFilteringPolicy}
            locale={locale}
            onConnect={() => console.log("Connect Google Business")}
            onDisconnect={() => console.log("Disconnect")}
            onSyncNow={() => console.log("Sync now")}
            onSave={(data) => console.log("Save config:", data)}
          />
        </TabsContent>

        {/* Tab: Widget */}
        <TabsContent value="widget" className="mt-6">
          <ReviewsWidget
            placeId={mockGoogleBusinessConfig.placeId}
            config={mockWidgetConfig}
            locale={locale}
            onSave={(config) => console.log("Save widget config:", config)}
          />
        </TabsContent>

        {/* Tab: Invitations */}
        <TabsContent value="invitations" className="mt-6">
          <AutoInvitations
            config={mockAutoInvitationConfig}
            locale={locale}
            onSave={(config) => console.log("Save invitations:", config)}
            onTest={(email) => console.log("Test email:", email)}
          />
        </TabsContent>

        {/* Tab: Analytics */}
        <TabsContent value="analytics" className="mt-6">
          <CollectionAnalytics
            analytics={mockCollectionAnalytics}
            locale={locale}
            onExport={() => console.log("Export analytics")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
