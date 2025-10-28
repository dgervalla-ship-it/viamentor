/**
 * VIAMENTOR - Accountant KPIs Section
 * Section KPIs avec 6 métriques financières principales
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  FileTextIcon,
  WalletIcon,
  PercentIcon,
  ReceiptIcon,
} from "lucide-react";
import {
  ACCOUNTANT_I18N,
  type AccountantLocale,
} from "@/polymet/data/viamentor-accountant-i18n";
import { MOCK_ACCOUNTANT_DASHBOARD } from "@/polymet/data/viamentor-accountant-data";

// ============================================================================
// TYPES
// ============================================================================

interface AccountantKPIsSectionProps {
  locale?: AccountantLocale;
}

// ============================================================================
// ICONS MAP
// ============================================================================

const ICONS_MAP = {
  TrendingUpIcon,
  FileTextIcon,
  WalletIcon,
  PercentIcon,
  ReceiptIcon,
};

// ============================================================================
// COMPONENT
// ============================================================================

export function AccountantKPIsSection({
  locale = "fr",
}: AccountantKPIsSectionProps) {
  const t = ACCOUNTANT_I18N[locale];
  const data = MOCK_ACCOUNTANT_DASHBOARD;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.kpis.map((kpi) => {
        const Icon = ICONS_MAP[kpi.icon as keyof typeof ICONS_MAP];
        const TrendIcon =
          kpi.trend === "up"
            ? TrendingUpIcon
            : kpi.trend === "down"
              ? TrendingDownIcon
              : null;

        return (
          <Card key={kpi.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t.kpis[kpi.label as keyof typeof t.kpis]}
              </CardTitle>
              {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpi.format === "currency"
                  ? `CHF ${kpi.value.toLocaleString()}`
                  : kpi.format === "percentage"
                    ? `${kpi.value}%`
                    : kpi.value.toLocaleString()}
              </div>
              {kpi.change !== 0 && TrendIcon && (
                <p
                  className={`text-xs flex items-center gap-1 mt-1 ${
                    kpi.trend === "up"
                      ? "text-green-600"
                      : kpi.trend === "down"
                        ? "text-red-600"
                        : "text-muted-foreground"
                  }`}
                >
                  <TrendIcon className="h-3 w-3" />
                  {kpi.change > 0 ? "+" : ""}
                  {kpi.change}% vs mois dernier
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
