/**
 * VIAMENTOR - Invoices List Stats Cards
 * Stats mini cards inline pour header liste factures
 */

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileTextIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  XCircleIcon,
} from "lucide-react";
import type { InvoiceListStats } from "@/polymet/data/viamentor-invoices-list-data";
import type { InvoiceLocale } from "@/polymet/data/viamentor-invoices-i18n";
import { INVOICE_TRANSLATIONS } from "@/polymet/data/viamentor-invoices-i18n";

export interface InvoicesListStatsProps {
  stats: InvoiceListStats;
  locale?: InvoiceLocale;
}

export function InvoicesListStats({
  stats,
  locale = "fr",
}: InvoicesListStatsProps) {
  const t = INVOICE_TRANSLATIONS[locale];

  const formatCurrency = (amount: number) => {
    const separators = {
      fr: { thousands: "'", decimal: "." },
      de: { thousands: ".", decimal: "," },
      it: { thousands: ".", decimal: "," },
      en: { thousands: ",", decimal: "." },
    };

    const sep = separators[locale];
    const parts = amount.toFixed(2).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep.thousands);
    return `${parts.join(sep.decimal)} CHF`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Invoices */}
      <Card className="p-4 bg-card border border-border">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total factures</p>
            <p className="text-2xl font-bold text-foreground">
              {stats.totalInvoices}
            </p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileTextIcon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </Card>

      {/* Total Amount */}
      <Card className="p-4 bg-card border border-border">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Montant total</p>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(stats.totalAmount)}
            </p>
          </div>
          <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              CHF
            </span>
          </div>
        </div>
      </Card>

      {/* Paid Count */}
      <Card className="p-4 bg-card border border-border">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Payées</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.paidCount}
              </p>
              <Badge
                variant="outline"
                className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
              >
                {Math.round((stats.paidCount / stats.totalInvoices) * 100)}%
              </Badge>
            </div>
          </div>
          <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <CheckCircle2Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </Card>

      {/* Unpaid/Overdue Count */}
      <Card className="p-4 bg-card border border-border">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Impayées</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {stats.unpaidCount}
              </p>
              {stats.overdueCount > 0 && (
                <Badge
                  variant="outline"
                  className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
                >
                  {stats.overdueCount} échues
                </Badge>
              )}
            </div>
          </div>
          <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
            <AlertCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </Card>
    </div>
  );
}
