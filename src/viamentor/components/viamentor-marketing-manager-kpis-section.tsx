/**
 * VIAMENTOR - Marketing Manager KPIs Section
 * Section KPIs avec 6 cards métriques principales
 */

import { Card } from "@/components/ui/card";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  UsersIcon,
  TargetIcon,
  DollarSignIcon,
  PercentIcon,
} from "lucide-react";
import {
  mockMarketingKPIs,
  formatPercentage,
  formatCurrency,
  getROIColor,
  type MarketingManagerLocale,
} from "@/viamentor/data/viamentor-marketing-manager-data";
import { getMarketingManagerTranslations } from "@/viamentor/data/viamentor-marketing-manager-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface MarketingManagerKPIsSectionProps {
  locale?: MarketingManagerLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function MarketingManagerKPIsSection({
  locale = "fr",
}: MarketingManagerKPIsSectionProps) {
  const t = getMarketingManagerTranslations(locale);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {t.kpis.activeCampaigns}
          </span>
          <TargetIcon className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">
          {mockMarketingKPIs.activeCampaigns}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {t.kpis.totalLeads}
          </span>
          <UsersIcon className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">{mockMarketingKPIs.totalLeads}</div>
        <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
          <TrendingUpIcon className="w-3 h-3" />
          +12.5% vs mois dernier
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{t.kpis.avgROI}</span>
          <PercentIcon className="w-4 h-4 text-muted-foreground" />
        </div>
        <div
          className={`text-2xl font-bold ${getROIColor(mockMarketingKPIs.avgROI)}`}
        >
          {formatPercentage(mockMarketingKPIs.avgROI)}
        </div>
        <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
          <TrendingUpIcon className="w-3 h-3" />
          +8.3% vs mois dernier
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {t.kpis.conversionRate}
          </span>
          <TargetIcon className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">
          {formatPercentage(mockMarketingKPIs.conversionRate)}
        </div>
        <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
          <TrendingUpIcon className="w-3 h-3" />
          +3.2% vs mois dernier
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {t.kpis.costPerLead}
          </span>
          <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">
          {formatCurrency(mockMarketingKPIs.costPerLead, locale)}
        </div>
        <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
          <TrendingDownIcon className="w-3 h-3" />
          -5.8% vs mois dernier
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {t.kpis.totalRevenue}
          </span>
          <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="text-2xl font-bold">
          {formatCurrency(mockMarketingKPIs.totalRevenue, locale)}
        </div>
        <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
          <TrendingUpIcon className="w-3 h-3" />
          +15.2% vs mois dernier
        </div>
      </Card>
    </div>
  );
}
