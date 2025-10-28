/**
 * VIAMENTOR - Billing KPIs Cards
 * Stats Cards grid responsive avec KPIs revenus, factures, paiements
 */

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  AlertCircleIcon,
  ClockIcon,
  DollarSignIcon,
  FileTextIcon,
  WalletIcon,
  AlertTriangleIcon,
} from "lucide-react";
import { type BillingKPIs } from "@/polymet/data/viamentor-billing-data";
import {
  type BillingLocale,
  billingTranslations,
} from "@/polymet/data/viamentor-billing-i18n";

interface BillingKPIsCardsProps {
  kpis: BillingKPIs;
  locale?: BillingLocale;
}

export function BillingKPIsCards({
  kpis,
  locale = "fr",
}: BillingKPIsCardsProps) {
  const t = billingTranslations[locale];

  // Format currency based on locale
  const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat(
      locale === "de"
        ? "de-CH"
        : locale === "it"
          ? "it-CH"
          : locale === "en"
            ? "en-CH"
            : "fr-CH",
      {
        style: "currency",
        currency: "CHF",
        minimumFractionDigits: 2,
      }
    ).format(amount);

    // Swiss format with apostrophe for FR
    if (locale === "fr") {
      return formatted.replace(/\s/g, "'");
    }
    return formatted;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(
      locale === "de"
        ? "de-CH"
        : locale === "it"
          ? "it-CH"
          : locale === "en"
            ? "en-CH"
            : "fr-CH"
    ).format(num);
  };

  const formatPercent = (num: number) => {
    return new Intl.NumberFormat(
      locale === "de"
        ? "de-CH"
        : locale === "it"
          ? "it-CH"
          : locale === "en"
            ? "en-CH"
            : "fr-CH",
      {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }
    ).format(num / 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Row 1: Month Revenue */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.kpis.monthRevenue}
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(kpis.monthRevenue.amount)}
              </p>
              <div className="flex items-center gap-1 text-sm">
                {kpis.monthRevenue.isPositive ? (
                  <>
                    <TrendingUpIcon className="h-4 w-4 text-green-600 dark:text-green-500" />

                    <span className="text-green-600 dark:text-green-500 font-medium">
                      +{formatPercent(kpis.monthRevenue.trend)}
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDownIcon className="h-4 w-4 text-red-600 dark:text-red-500" />

                    <span className="text-red-600 dark:text-red-500 font-medium">
                      {formatPercent(kpis.monthRevenue.trend)}
                    </span>
                  </>
                )}
                <span className="text-muted-foreground">
                  {t.kpis.vsLastMonth}
                </span>
              </div>
            </div>
            <div className="p-2 bg-primary/10 rounded-lg">
              <DollarSignIcon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Row 1: Unpaid Invoices */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.kpis.unpaidInvoices}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">
                  {formatNumber(kpis.unpaidInvoices.count)}
                </p>
                <Badge variant="destructive" className="text-xs">
                  {t.kpis.urgent}
                </Badge>
              </div>
              <p className="text-sm font-medium text-red-600 dark:text-red-500">
                {formatCurrency(kpis.unpaidInvoices.amount)}
              </p>
            </div>
            <div className="p-2 bg-red-100 dark:bg-red-950 rounded-lg">
              <AlertCircleIcon className="h-5 w-5 text-red-600 dark:text-red-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Row 1: Pending Payments */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.kpis.pendingPayments}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold">
                  {formatNumber(kpis.pendingPayments.count)}
                </p>
                <Badge
                  variant="outline"
                  className="text-xs border-orange-500 text-orange-600 dark:text-orange-500"
                >
                  {t.kpis.vsLastMonth}
                </Badge>
              </div>
              <p className="text-sm font-medium text-orange-600 dark:text-orange-500">
                {formatCurrency(kpis.pendingPayments.amount)}
              </p>
            </div>
            <div className="p-2 bg-orange-100 dark:bg-orange-950 rounded-lg">
              <ClockIcon className="h-5 w-5 text-orange-600 dark:text-orange-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Row 2: Year to Date */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <p className="text-sm text-muted-foreground">
                {t.kpis.yearToDate}
              </p>
              <p className="text-2xl font-bold">
                {formatCurrency(kpis.yearToDate.amount)}
              </p>
              {kpis.yearToDate.target && kpis.yearToDate.percentage && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {t.kpis.target}
                    </span>
                    <span className="font-medium">
                      {formatPercent(kpis.yearToDate.percentage)}
                    </span>
                  </div>
                  <Progress
                    value={kpis.yearToDate.percentage}
                    className="h-2"
                  />

                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(kpis.yearToDate.target)}
                  </p>
                </div>
              )}
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-lg">
              <WalletIcon className="h-5 w-5 text-blue-600 dark:text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Row 2: Month Invoices Count */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.kpis.monthInvoicesCount}
              </p>
              <p className="text-2xl font-bold">
                {formatNumber(kpis.monthInvoices)}
              </p>
            </div>
            <div className="p-2 bg-purple-100 dark:bg-purple-950 rounded-lg">
              <FileTextIcon className="h-5 w-5 text-purple-600 dark:text-purple-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Row 2: Collection Rate */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <p className="text-sm text-muted-foreground">
                {t.kpis.collectionRate}
              </p>
              <p className="text-2xl font-bold">
                {formatPercent(kpis.collectionRate)}
              </p>
              <Progress
                value={kpis.collectionRate}
                className={`h-2 ${
                  kpis.collectionRate >= 80
                    ? "[&>div]:bg-green-600"
                    : kpis.collectionRate >= 60
                      ? "[&>div]:bg-orange-600"
                      : "[&>div]:bg-red-600"
                }`}
              />
            </div>
            <div
              className={`p-2 rounded-lg ${
                kpis.collectionRate >= 80
                  ? "bg-green-100 dark:bg-green-950"
                  : kpis.collectionRate >= 60
                    ? "bg-orange-100 dark:bg-orange-950"
                    : "bg-red-100 dark:bg-red-950"
              }`}
            >
              <TrendingUpIcon
                className={`h-5 w-5 ${
                  kpis.collectionRate >= 80
                    ? "text-green-600 dark:text-green-500"
                    : kpis.collectionRate >= 60
                      ? "text-orange-600 dark:text-orange-500"
                      : "text-red-600 dark:text-red-500"
                }`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Row 3: Average Payment Delay */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.kpis.averagePaymentDelay}
              </p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold">
                  {formatNumber(kpis.averagePaymentDelay)}
                </p>
                <span className="text-sm text-muted-foreground">
                  {t.payments.days}
                </span>
              </div>
            </div>
            <div className="p-2 bg-indigo-100 dark:bg-indigo-950 rounded-lg">
              <ClockIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Row 3: Overdue > 90 Days */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.kpis.overdueOver90Days}
              </p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-500">
                {formatCurrency(kpis.overdueOver90Days)}
              </p>
              <Badge variant="destructive" className="text-xs">
                <AlertTriangleIcon className="h-3 w-3 mr-1" />

                {t.kpis.urgent}
              </Badge>
            </div>
            <div className="p-2 bg-red-100 dark:bg-red-950 rounded-lg">
              <AlertTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
