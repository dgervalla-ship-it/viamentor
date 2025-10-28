/**
 * VIAMENTOR - Invoice Detail Modal
 * Modal fullscreen avec header sticky, layout split view, sections complètes
 */

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DownloadIcon,
  MailIcon,
  PrinterIcon,
  PencilIcon,
  XIcon,
  CopyIcon,
  PhoneIcon,
  MapPinIcon,
  ExternalLinkIcon,
} from "lucide-react";
import {
  INVOICE_DETAIL_I18N,
  type InvoiceDetailLocale,
} from "@/viamentor/data/viamentor-invoice-detail-i18n";
import type { InvoiceDetailExtended } from "@/viamentor/data/viamentor-invoice-detail-data";
import type { InvoiceStatus } from "@/viamentor/data/viamentor-invoices-data";

interface InvoiceDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: InvoiceDetailExtended | null;
  locale?: InvoiceDetailLocale;
  onDownloadPDF?: () => void;
  onSendEmail?: () => void;
  onPrint?: () => void;
  onEdit?: () => void;
  onVoid?: () => void;
  onDuplicate?: () => void;
}

export function InvoiceDetailModal({
  open,
  onOpenChange,
  invoice,
  locale = "fr",
  onDownloadPDF,
  onSendEmail,
  onPrint,
  onEdit,
  onVoid,
  onDuplicate,
}: InvoiceDetailModalProps) {
  const t = INVOICE_DETAIL_I18N[locale];

  if (!invoice) return null;

  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Sent":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "Void":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2)} ${invoice.currency}`;
  };

  const paymentProgress = invoice.paidAmount
    ? (invoice.paidAmount / invoice.total) * 100
    : 0;

  const remainingBalance = invoice.total - (invoice.paidAmount || 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] h-[95vh] p-0 gap-0">
        {/* Header Sticky */}
        <div className="sticky top-0 z-10 bg-background border-b px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h4 className="text-2xl font-bold">
                  {t.invoice} {invoice.invoiceNumber}
                </h4>
                <Badge
                  className={`${getStatusColor(invoice.status)} text-sm px-3 py-1`}
                >
                  {invoice.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {t.issuedOn} {formatDate(invoice.issueDate)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onDownloadPDF}>
                <DownloadIcon className="w-4 h-4 mr-2" />

                {t.downloadPDF}
              </Button>
              <Button variant="outline" size="sm" onClick={onSendEmail}>
                <MailIcon className="w-4 h-4 mr-2" />

                {t.sendEmail}
              </Button>
              <Button variant="outline" size="sm" onClick={onPrint}>
                <PrinterIcon className="w-4 h-4 mr-2" />

                {t.print}
              </Button>
              {invoice.status === "Draft" && (
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <PencilIcon className="w-4 h-4 mr-2" />

                  {t.edit}
                </Button>
              )}
              {invoice.status !== "Paid" && invoice.status !== "Void" && (
                <Button variant="outline" size="sm" onClick={onVoid}>
                  <XIcon className="w-4 h-4 mr-2" />

                  {t.void}
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onDuplicate}>
                <CopyIcon className="w-4 h-4 mr-2" />

                {t.duplicate}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Student Info */}
              <Card className="p-6">
                <h5 className="text-lg font-semibold mb-4">{t.studentInfo}</h5>
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="https://github.com/yusufhilmi.png" />

                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h6 className="text-lg font-semibold">Sophie Martin</h6>
                      <Button variant="link" size="sm" className="h-auto p-0">
                        <ExternalLinkIcon className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MailIcon className="w-4 h-4" />

                        <a
                          href="mailto:sophie.martin@email.ch"
                          className="hover:underline"
                        >
                          sophie.martin@email.ch
                        </a>
                      </div>
                      {invoice.studentPhone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <PhoneIcon className="w-4 h-4" />

                          <a
                            href={`tel:${invoice.studentPhone}`}
                            className="hover:underline"
                          >
                            {invoice.studentPhone}
                          </a>
                        </div>
                      )}
                      {invoice.studentAddress && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPinIcon className="w-4 h-4" />

                          <span>
                            {invoice.studentAddress.street},{" "}
                            {invoice.studentAddress.zip}{" "}
                            {invoice.studentAddress.city}
                          </span>
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      {t.viewFullProfile}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Items Detail */}
              <Card className="p-6">
                <h5 className="text-lg font-semibold mb-4">{t.items}</h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">{t.description}</th>
                        <th className="text-right py-2">{t.quantity}</th>
                        <th className="text-right py-2">{t.unitPrice}</th>
                        <th className="text-right py-2">{t.vatRate}</th>
                        <th className="text-right py-2">{t.lineTotal}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.items.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="py-3">{item.description}</td>
                          <td className="text-right">{item.quantity}</td>
                          <td className="text-right">
                            {formatCurrency(item.unitPrice)}
                          </td>
                          <td className="text-right">{item.vatRate}%</td>
                          <td className="text-right font-medium">
                            {formatCurrency(item.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {invoice.status === "Draft" && (
                  <Button variant="outline" size="sm" className="mt-4">
                    {t.modifyItems}
                  </Button>
                )}
              </Card>
            </div>

            {/* Right Column - Amounts & Conditions */}
            <div className="space-y-6">
              {/* Amounts */}
              <Card className="p-6">
                <h5 className="text-lg font-semibold mb-4">{t.amounts}</h5>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t.subtotalHT}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(invoice.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t.vat} {invoice.items[0]?.vatRate}%
                    </span>
                    <span className="font-medium">
                      {formatCurrency(invoice.vatAmount)}
                    </span>
                  </div>
                  <Separator />

                  <div className="flex justify-between">
                    <span className="font-semibold text-lg">{t.totalTTC}</span>
                    <span className="font-bold text-lg">
                      {formatCurrency(invoice.total)}
                    </span>
                  </div>
                  {invoice.paidAmount && invoice.paidAmount > 0 && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">{t.amountPaid}</span>
                        <span className="font-medium text-green-600">
                          {formatCurrency(invoice.paidAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {t.remainingBalance}
                        </span>
                        <Badge
                          variant={
                            remainingBalance > 0 ? "destructive" : "default"
                          }
                          className={
                            remainingBalance === 0
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : ""
                          }
                        >
                          {formatCurrency(remainingBalance)}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{t.paymentProgress}</span>
                          <span>{paymentProgress.toFixed(0)}%</span>
                        </div>
                        <Progress value={paymentProgress} />
                      </div>
                    </>
                  )}
                </div>
              </Card>

              {/* Conditions */}
              <Card className="p-6">
                <h5 className="text-lg font-semibold mb-4">{t.conditions}</h5>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-muted-foreground mb-1">
                      {t.dueDate}
                    </div>
                    <div className="font-medium">
                      {formatDate(invoice.dueDate)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">
                      {t.paymentMethod}
                    </div>
                    <Badge variant="outline">{invoice.paymentMethod}</Badge>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">
                      {t.paymentStatus}
                    </div>
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
