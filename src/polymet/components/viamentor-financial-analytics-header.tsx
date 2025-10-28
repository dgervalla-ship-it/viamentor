/**
 * VIAMENTOR - Financial Analytics Header
 * Header avec KPIs cards: CA, Marge, Impayés, Cash
 */

"use client";

import {
  TrendingUpIcon,
  TrendingDownIcon,
  GaugeIcon,
  AlertTriangleIcon,
  WalletIcon,
  DollarSignIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type {
  FinancialKPIs,
  FinancialLocale,
} from "@/polymet/data/viamentor-financial-analytics-data";
import { getFinancialTranslations } from "@/polymet/data/viamentor-financial-analytics-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface FinancialAnalyticsHeaderProps {
  kpis: FinancialKPIs;
  locale?: FinancialLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FinancialAnalyticsHeader({
  kpis,
  locale = "fr",
}: FinancialAnalyticsHeaderProps) {
  const t = getFinancialTranslations(locale);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CHF",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Revenue Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 bg-blue-500 rounded-lg">
              <DollarSignIcon className="h-5 w-5 text-white" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                kpis.revenue.trend >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {kpis.revenue.trend >= 0 ? (
                <TrendingUpIcon className="h-4 w-4" />
              ) : (
                <TrendingDownIcon className="h-4 w-4" />
              )}
              {formatPercent(kpis.revenue.trend)}
            </div>
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">
            {t.kpis.revenue}
          </div>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {formatCurrency(kpis.revenue.amount)}
          </div>
        </CardContent>
      </Card>

      {/* Profit Margin Card */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 bg-green-500 rounded-lg">
              <GaugeIcon className="h-5 w-5 text-white" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                kpis.profitMargin.trend >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {kpis.profitMargin.trend >= 0 ? (
                <TrendingUpIcon className="h-4 w-4" />
              ) : (
                <TrendingDownIcon className="h-4 w-4" />
              )}
              {formatPercent(kpis.profitMargin.trend)}
            </div>
          </div>
          <div className="text-sm text-green-700 dark:text-green-300 mb-1">
            {t.kpis.profitMargin}
          </div>
          <div className="text-2xl font-bold text-green-900 dark:text-green-100">
            {kpis.profitMargin.percentage.toFixed(1)}%
          </div>
        </CardContent>
      </Card>

      {/* Unpaid Invoices Card */}
      <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 bg-red-500 rounded-lg">
              <AlertTriangleIcon className="h-5 w-5 text-white" />
            </div>
            <Badge variant="destructive" className="text-xs">
              {kpis.unpaidInvoices.count} {t.kpis.invoices}
            </Badge>
          </div>
          <div className="text-sm text-red-700 dark:text-red-300 mb-1">
            {t.kpis.unpaidInvoices}
          </div>
          <div className="text-2xl font-bold text-red-900 dark:text-red-100">
            {formatCurrency(kpis.unpaidInvoices.amount)}
          </div>
        </CardContent>
      </Card>

      {/* Cash Available Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 bg-purple-500 rounded-lg">
              <WalletIcon className="h-5 w-5 text-white" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                kpis.cashAvailable.trend >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {kpis.cashAvailable.trend >= 0 ? (
                <TrendingUpIcon className="h-4 w-4" />
              ) : (
                <TrendingDownIcon className="h-4 w-4" />
              )}
              {formatPercent(kpis.cashAvailable.trend)}
            </div>
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300 mb-1">
            {t.kpis.cashAvailable}
          </div>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            {formatCurrency(kpis.cashAvailable.amount)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FinancialAnalyticsHeader;
