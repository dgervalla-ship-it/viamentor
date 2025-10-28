/**
 * VIAMENTOR - Marketing Manager Page
 * Dashboard Marketing Manager avec ResponsivePageWrapper
 */

import { Button } from "@/components/ui/button";
import {
  PlusCircleIcon,
  TargetIcon,
  UsersIcon,
  ActivityIcon,
  StarIcon,
  BarChart3Icon,
} from "lucide-react";
import { ResponsivePageWrapper } from "@/viamentor/components/viamentor-responsive-page-wrapper";
import { MarketingManagerKPIsSection } from "@/viamentor/components/viamentor-marketing-manager-kpis-section";
import { MarketingManagerCampaignsSection } from "@/viamentor/components/viamentor-marketing-manager-campaigns-section";
import { MarketingManagerProspectsSection } from "@/viamentor/components/viamentor-marketing-manager-prospects-section";
import { MarketingManagerMonitoringSection } from "@/viamentor/components/viamentor-marketing-manager-monitoring-section";
import { MarketingManagerActionsSection } from "@/viamentor/components/viamentor-marketing-manager-actions-section";
import { type MarketingManagerLocale } from "@/viamentor/data/viamentor-marketing-manager-data";
import { getMarketingManagerTranslations } from "@/viamentor/data/viamentor-marketing-manager-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface MarketingManagerPageProps {
  locale?: MarketingManagerLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function MarketingManagerPage({
  locale = "fr",
}: MarketingManagerPageProps) {
  const t = getMarketingManagerTranslations(locale);

  // Header Actions
  const headerActions = (
    <Button className="gap-2">
      <PlusCircleIcon className="w-4 h-4" />

      {t.campaigns.create}
    </Button>
  );

  return (
    <ResponsivePageWrapper
      title={t.page.title}
      description={t.page.subtitle}
      actions={headerActions}
      sections={[
        {
          id: "kpis",
          label: "KPIs",
          icon: <BarChart3Icon className="h-4 w-4" />,

          badge: "6",
          content: <MarketingManagerKPIsSection locale={locale} />,
        },
        {
          id: "campaigns",
          label: t.sections.campaigns,
          icon: <TargetIcon className="h-4 w-4" />,

          content: <MarketingManagerCampaignsSection locale={locale} />,
        },
        {
          id: "prospects",
          label: t.sections.prospects,
          icon: <UsersIcon className="h-4 w-4" />,

          content: <MarketingManagerProspectsSection locale={locale} />,
        },
        {
          id: "monitoring",
          label: "Monitoring",
          icon: <ActivityIcon className="h-4 w-4" />,

          content: <MarketingManagerMonitoringSection locale={locale} />,
        },
        {
          id: "actions",
          label: t.sections.quickActions,
          icon: <StarIcon className="h-4 w-4" />,

          content: <MarketingManagerActionsSection locale={locale} />,
        },
      ]}
      mobileTabsEnabled={true}
      mobileTabsBreakpoint="lg"
      swipeEnabled={true}
      layout="stacked"
    />
  );
}

export { MarketingManagerPage };
