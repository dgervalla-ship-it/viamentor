/**
 * VIAMENTOR - Accountant Actions Section
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  FileBarChartIcon,
  RefreshCwIcon,
  FileTextIcon,
  AlertTriangleIcon,
} from "lucide-react";
import {
  ACCOUNTANT_I18N,
  type AccountantLocale,
} from "@/polymet/data/viamentor-accountant-i18n";

interface AccountantActionsSectionProps {
  locale?: AccountantLocale;
}

export function AccountantActionsSection({
  locale = "fr",
}: AccountantActionsSectionProps) {
  const t = ACCOUNTANT_I18N[locale];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.quickActions.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <DownloadIcon className="h-5 w-5" />

            <span className="text-sm">{t.quickActions.exportInvoices}</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <DownloadIcon className="h-5 w-5" />

            <span className="text-sm">{t.quickActions.exportPayments}</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <FileBarChartIcon className="h-5 w-5" />

            <span className="text-sm">{t.quickActions.vatReport}</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <FileBarChartIcon className="h-5 w-5" />

            <span className="text-sm">{t.quickActions.accountingReport}</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <RefreshCwIcon className="h-5 w-5" />

            <span className="text-sm">{t.quickActions.reconcilePayments}</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <FileTextIcon className="h-5 w-5" />

            <span className="text-sm">{t.quickActions.viewReceivables}</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4">
            <AlertTriangleIcon className="h-5 w-5" />

            <span className="text-sm">{t.quickActions.viewOverdue}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
