/**
 * VIAMENTOR - Accountant Transactions Section
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ACCOUNTANT_I18N,
  type AccountantLocale,
} from "@/viamentor/data/viamentor-accountant-i18n";
import { MOCK_ACCOUNTANT_DASHBOARD } from "@/viamentor/data/viamentor-accountant-data";

interface AccountantTransactionsSectionProps {
  locale?: AccountantLocale;
}

export function AccountantTransactionsSection({
  locale = "fr",
}: AccountantTransactionsSectionProps) {
  const t = ACCOUNTANT_I18N[locale];
  const data = MOCK_ACCOUNTANT_DASHBOARD;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.transactions.recent}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.transactions.slice(0, 6).map((txn) => (
            <div
              key={txn.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium">{txn.studentName}</p>
                <p className="text-sm text-muted-foreground">
                  {txn.reference} • {txn.date}
                </p>
              </div>
              <div className="text-right space-y-1">
                <p className="font-semibold">
                  CHF {txn.amount.toLocaleString()}
                </p>
                <Badge
                  variant={
                    txn.status === "paid"
                      ? "default"
                      : txn.status === "pending"
                        ? "secondary"
                        : txn.status === "overdue"
                          ? "destructive"
                          : "outline"
                  }
                >
                  {
                    t.transactions.statuses[
                      txn.status as keyof typeof t.transactions.statuses
                    ]
                  }
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          {t.transactions.viewAll}
        </Button>
      </CardContent>
    </Card>
  );
}
