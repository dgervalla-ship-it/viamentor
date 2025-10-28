/**
 * VIAMENTOR Student Invoices Tab
 *
 * Tab factures avec stats et actions
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusIcon, EyeIcon, MailIcon, CheckIcon } from "lucide-react";
import type { StudentInvoice } from "@/polymet/data/viamentor-student-detail-data";
import { getInvoiceStatusColor } from "@/polymet/data/viamentor-student-detail-data";
import type { StudentDetailLocale } from "@/polymet/data/viamentor-student-detail-i18n";
import {
  useStudentDetailTranslations,
  formatCurrency,
  formatDate,
} from "@/polymet/data/viamentor-student-detail-i18n";

export interface StudentInvoicesTabProps {
  invoices: StudentInvoice[];
  locale?: StudentDetailLocale;
  onNewInvoice?: () => void;
  onViewInvoice?: (invoice: StudentInvoice) => void;
  onSendEmail?: (invoice: StudentInvoice) => void;
  onMarkAsPaid?: (invoice: StudentInvoice) => void;
  onCollectPayment?: () => void;
}

export function StudentInvoicesTab({
  invoices,
  locale = "fr",
  onNewInvoice,
  onViewInvoice,
  onSendEmail,
  onMarkAsPaid,
  onCollectPayment,
}: StudentInvoicesTabProps) {
  const t = useStudentDetailTranslations(locale);

  const totalBilled = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices.reduce(
    (sum, inv) => sum + (inv.paidAmount || 0),
    0
  );
  const remainingBalance = totalBilled - totalPaid;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{t.totalBilled}</p>
              <p className="text-3xl font-bold">
                {formatCurrency(totalBilled, locale)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{t.totalPaid}</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(totalPaid, locale)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {t.remainingBalance}
              </p>
              <p
                className={`text-3xl font-bold ${
                  remainingBalance > 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {formatCurrency(remainingBalance, locale)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button onClick={onNewInvoice}>
          <PlusIcon className="h-4 w-4 mr-2" />

          {t.newInvoice}
        </Button>
        {remainingBalance > 0 && (
          <Button onClick={onCollectPayment} variant="outline">
            <CheckIcon className="h-4 w-4 mr-2" />

            {t.collectPayment}
          </Button>
        )}
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t.tabInvoices} ({invoices.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.invoiceNumber}</TableHead>
                <TableHead>{t.issueDate}</TableHead>
                <TableHead>{t.amount}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead>{t.dueDate}</TableHead>
                <TableHead className="text-right">{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.invoiceNumber}
                  </TableCell>
                  <TableCell>{formatDate(invoice.date, locale)}</TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(invoice.amount, locale)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      style={{
                        backgroundColor: getInvoiceStatusColor(invoice.status),
                      }}
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(invoice.dueDate, locale)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewInvoice?.(invoice)}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      {invoice.status !== "Payée" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onSendEmail?.(invoice)}
                          >
                            <MailIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onMarkAsPaid?.(invoice)}
                          >
                            <CheckIcon className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
