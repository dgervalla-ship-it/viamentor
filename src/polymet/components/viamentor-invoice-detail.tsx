/**
 * VIAMENTOR Invoice Detail
 *
 * Dialog fullscreen détail invoice avec:
 * - Header sticky avec actions (download, send, print, void, edit, duplicate)
 * - Section tenant info avec logo et adresse complète
 * - Section items table avec calculs (subtotal HT, VAT, total TTC)
 * - QR-Bill section intégrée
 * - Payment timeline vertical stepper
 */

import {
  Invoice,
  formatCurrency,
} from "@/polymet/data/viamentor-invoices-data";
import {
  useInvoiceTranslations,
  InvoiceLocale,
} from "@/polymet/data/viamentor-invoices-i18n";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { QRBillGenerator } from "@/polymet/components/viamentor-qr-bill-generator";
import {
  DownloadIcon,
  MailIcon,
  PrinterIcon,
  XCircleIcon,
  PencilIcon,
  CopyIcon,
  CheckCircle2Icon,
  ClockIcon,
  AlertCircleIcon,
  EyeIcon,
  FileTextIcon,
} from "lucide-react";

interface InvoiceDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice | null;
  locale?: InvoiceLocale;
  onDownloadPDF?: () => void;
  onSendEmail?: () => void;
  onPrint?: () => void;
  onVoid?: () => void;
  onEdit?: () => void;
  onDuplicate?: () => void;
}

export function InvoiceDetail({
  open,
  onOpenChange,
  invoice,
  locale = "fr",
  onDownloadPDF,
  onSendEmail,
  onPrint,
  onVoid,
  onEdit,
  onDuplicate,
}: InvoiceDetailProps) {
  const t = useInvoiceTranslations(locale);

  if (!invoice) return null;

  const getStatusBadge = () => {
    const variants = {
      Draft: "outline" as const,
      Sent: "secondary" as const,
      Paid: "default" as const,
      Overdue: "destructive" as const,
      Void: "outline" as const,
    };

    const labels = {
      Draft: t.statusDraft,
      Sent: t.statusSent,
      Paid: t.statusPaid,
      Overdue: t.statusOverdue,
      Void: t.statusVoid,
    };

    return (
      <Badge variant={variants[invoice.status]} className="text-base px-3 py-1">
        {invoice.status === "Paid" && (
          <CheckCircle2Icon className="h-4 w-4 mr-1" />
        )}
        {invoice.status === "Overdue" && (
          <AlertCircleIcon className="h-4 w-4 mr-1" />
        )}
        {labels[invoice.status]}
      </Badge>
    );
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "Created":
        return <FileTextIcon className="h-4 w-4" />;

      case "Sent":
        return <MailIcon className="h-4 w-4" />;

      case "Viewed":
        return <EyeIcon className="h-4 w-4" />;

      case "Paid":
        return <CheckCircle2Icon className="h-4 w-4 text-green-600" />;

      case "Overdue":
        return <AlertCircleIcon className="h-4 w-4 text-destructive" />;

      case "Reminder":
        return <ClockIcon className="h-4 w-4 text-orange-600" />;

      case "Voided":
        return <XCircleIcon className="h-4 w-4 text-muted-foreground" />;

      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const formatDate = (
    dateString: string,
    format: "short" | "long" = "long"
  ) => {
    const date = new Date(dateString);
    const localeString =
      locale === "fr"
        ? "fr-CH"
        : locale === "de"
          ? "de-CH"
          : locale === "it"
            ? "it-CH"
            : "en-CH";

    if (format === "short") {
      return date.toLocaleDateString(localeString);
    }

    return date.toLocaleDateString(localeString, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl h-[90vh] flex flex-col p-0">
        {/* Sticky Header */}
        <DialogHeader className="sticky top-0 z-10 bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DialogTitle className="text-2xl">
                {invoice.invoiceNumber}
              </DialogTitle>
              {getStatusBadge()}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onDownloadPDF}>
                <DownloadIcon className="h-4 w-4 mr-2" />

                {t.download}
              </Button>
              <Button variant="outline" size="sm" onClick={onSendEmail}>
                <MailIcon className="h-4 w-4 mr-2" />

                {t.sendEmail}
              </Button>
              <Button variant="outline" size="sm" onClick={onPrint}>
                <PrinterIcon className="h-4 w-4 mr-2" />

                {t.print}
              </Button>
              {invoice.status !== "Paid" && invoice.status !== "Void" && (
                <Button variant="outline" size="sm" onClick={onVoid}>
                  <XCircleIcon className="h-4 w-4 mr-2" />

                  {t.voidInvoice}
                </Button>
              )}
              {invoice.status === "Draft" && (
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <PencilIcon className="h-4 w-4 mr-2" />

                  {t.editInvoice}
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onDuplicate}>
                <CopyIcon className="h-4 w-4 mr-2" />

                {t.duplicateInvoice}
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {t.issuedOn} {formatDate(invoice.issueDate)}
          </p>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tenant Info */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.tenantInfo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      {invoice.tenantLogo && (
                        <AvatarImage src={invoice.tenantLogo} />
                      )}
                      <AvatarFallback className="text-lg">
                        {invoice.tenantName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {invoice.tenantName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          ID: {invoice.tenantId}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">
                            {t.billingAddress}
                          </p>
                          <div className="text-sm">
                            <p>{invoice.tenantAddress.street}</p>
                            <p>
                              {invoice.tenantAddress.zip}{" "}
                              {invoice.tenantAddress.city}
                            </p>
                            <p>
                              {invoice.tenantAddress.canton},{" "}
                              {invoice.tenantAddress.country}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Email
                            </p>
                            <a
                              href={`mailto:${invoice.tenantEmail}`}
                              className="text-sm text-primary hover:underline"
                            >
                              {invoice.tenantEmail}
                            </a>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Téléphone
                            </p>
                            <a
                              href={`tel:${invoice.tenantPhone}`}
                              className="text-sm text-primary hover:underline"
                            >
                              {invoice.tenantPhone}
                            </a>
                          </div>
                          {invoice.tenantIBAN && (
                            <div>
                              <p className="text-xs text-muted-foreground">
                                IBAN
                              </p>
                              <p className="text-sm font-mono">
                                {invoice.tenantIBAN}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Line Items */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.lineItems}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="p-3 text-left text-sm font-medium">
                            {t.description}
                          </th>
                          <th className="p-3 text-right text-sm font-medium">
                            {t.quantity}
                          </th>
                          <th className="p-3 text-right text-sm font-medium">
                            {t.unitPrice}
                          </th>
                          <th className="p-3 text-right text-sm font-medium">
                            {t.vatRate}
                          </th>
                          <th className="p-3 text-right text-sm font-medium">
                            {t.lineTotal}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.items.map((item) => (
                          <tr key={item.id} className="border-t border-border">
                            <td className="p-3 text-sm">{item.description}</td>
                            <td className="p-3 text-right text-sm">
                              {item.quantity}
                            </td>
                            <td className="p-3 text-right text-sm">
                              {formatCurrency(item.unitPrice, locale)}
                            </td>
                            <td className="p-3 text-right text-sm">
                              {item.vatRate}%
                            </td>
                            <td className="p-3 text-right text-sm font-medium">
                              {formatCurrency(item.total, locale)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <Separator className="my-4" />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t.subtotalHT}
                      </span>
                      <span className="font-medium">
                        {formatCurrency(invoice.subtotal, locale)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t.vat} (8.1%)
                      </span>
                      <span className="font-medium">
                        {formatCurrency(invoice.vatAmount, locale)}
                      </span>
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">
                        {t.totalTTC}
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        {formatCurrency(invoice.total, locale)}
                      </span>
                    </div>
                  </div>

                  {invoice.notes && (
                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <p className="text-xs text-muted-foreground mb-1">
                        {t.notes}
                      </p>
                      <p className="text-sm">{invoice.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* QR-Bill */}
              {invoice.currency === "CHF" && invoice.total > 0 && (
                <QRBillGenerator
                  invoice={invoice}
                  locale={locale}
                  onDownloadPDF={() => console.log("Download QR-Bill")}
                  onSendEmail={() => console.log("Send QR-Bill")}
                />
              )}
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-6">
              {/* Payment Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Informations de paiement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">{t.dueDate}</p>
                    <p className="text-sm font-medium">
                      {formatDate(invoice.dueDate)}
                    </p>
                  </div>
                  {invoice.paidDate && (
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {t.paidOn}
                      </p>
                      <p className="text-sm font-medium">
                        {formatDate(invoice.paidDate)}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t.paymentMethod}
                    </p>
                    <p className="text-sm font-medium">
                      {invoice.paymentMethod}
                    </p>
                  </div>
                  {invoice.transactionId && (
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Transaction ID
                      </p>
                      <p className="text-sm font-mono">
                        {invoice.transactionId}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{t.timeline}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {invoice.timeline.map((event, index) => (
                      <div key={event.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                            {getTimelineIcon(event.type)}
                          </div>
                          {index < invoice.timeline.length - 1 && (
                            <div className="w-px h-full bg-border mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-sm font-medium">{event.type}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(event.date, "short")}{" "}
                            {new Date(event.date).toLocaleTimeString(
                              locale === "fr" ? "fr-CH" : "en-CH",
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </p>
                          {event.user && (
                            <p className="text-xs text-muted-foreground">
                              Par: {event.user}
                            </p>
                          )}
                          {event.details && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {event.details}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
