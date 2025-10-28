/**
 * VIAMENTOR - AI Responses Page
 * Page principale système réponses IA avis Google
 */

"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoIcon } from "lucide-react";
import { AIConfigForm } from "@/viamentor/components/viamentor-ai-config-form";
import { ResponseTemplates } from "@/viamentor/components/viamentor-response-templates";
import { ModerationQueue } from "@/viamentor/components/viamentor-moderation-queue";
import { AILearning } from "@/viamentor/components/viamentor-ai-learning";
import {
  mockSchoolAIConfig,
  mockResponseTemplates,
  mockPendingResponses,
  mockLearningData,
  mockAIMetrics,
} from "@/viamentor/data/viamentor-ai-responses-data";
import { aiResponsesTranslations } from "@/viamentor/data/viamentor-ai-responses-i18n";
import type { AIResponsesLocale } from "@/viamentor/data/viamentor-ai-responses-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface AIResponsesPageProps {
  locale?: AIResponsesLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function AIResponsesPage({ locale = "fr" }: AIResponsesPageProps) {
  const t = aiResponsesTranslations[locale];
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
          {t.alert.aiValue}
        </AlertDescription>
      </Alert>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="config" className="text-sm">
            Configuration IA
          </TabsTrigger>
          <TabsTrigger value="templates" className="text-sm">
            Templates
          </TabsTrigger>
          <TabsTrigger value="moderation" className="text-sm">
            Modération
          </TabsTrigger>
          <TabsTrigger value="learning" className="text-sm">
            Apprentissage
          </TabsTrigger>
        </TabsList>

        {/* Tab: Configuration IA */}
        <TabsContent value="config" className="mt-6">
          <AIConfigForm
            config={mockSchoolAIConfig}
            locale={locale}
            onSave={(config) => console.log("Config saved:", config)}
          />
        </TabsContent>

        {/* Tab: Templates */}
        <TabsContent value="templates" className="mt-6">
          <ResponseTemplates
            templates={mockResponseTemplates}
            locale={locale}
            onSave={(template) => console.log("Template saved:", template)}
            onDelete={(id) => console.log("Template deleted:", id)}
            onTest={(template) => console.log("Template tested:", template)}
          />
        </TabsContent>

        {/* Tab: Modération */}
        <TabsContent value="moderation" className="mt-6">
          <ModerationQueue
            pendingResponses={mockPendingResponses}
            locale={locale}
            onApprove={(id, notes) => console.log("Approved:", id, notes)}
            onReject={(id, reason) => console.log("Rejected:", id, reason)}
            onEdit={(id, text, notes) =>
              console.log("Edited:", id, text, notes)
            }
            onRegenerate={(id) => console.log("Regenerated:", id)}
            onManualResponse={(id) => console.log("Manual:", id)}
          />
        </TabsContent>

        {/* Tab: Apprentissage */}
        <TabsContent value="learning" className="mt-6">
          <AILearning
            learningData={mockLearningData}
            metrics={mockAIMetrics}
            locale={locale}
            onRetrain={() => console.log("Retrain started")}
            onExportData={() => console.log("Data exported")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
