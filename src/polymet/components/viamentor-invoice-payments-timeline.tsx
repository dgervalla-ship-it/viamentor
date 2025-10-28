/**
 * VIAMENTOR - Invoice Payments Timeline
 * Timeline historique paiements avec cards, actions, empty state
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCardIcon,
  BanknoteIcon,
  SmartphoneIcon,
  DownloadIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "lucide-react";
import {
  INVOICE_DETAIL_I18N,
  type InvoiceDetailLocale,
} from "@/polymet/data/viamentor-invoice-detail-i18n";
import type { InvoicePayment } from "@/polymet/data/viamentor-invoice-detail-data";

interface PaymentsTimelineProps {
  payments: InvoicePayment[];
  locale?: InvoiceDetailLocale;
  currency?: string;
  onRecordPayment?: () => void;
  onEditPayment?: (payment: InvoicePayment) => void;
  onDeletePayment?: (payment: InvoicePayment) => void;
  onDownloadReceipt?: (payment: InvoicePayment) => void;
}

export function InvoicePaymentsTimeline({
  payments,
  locale = "fr",
  currency = "CHF",
  onRecordPayment,
  onEditPayment,
  onDeletePayment,
  onDownloadReceipt,
}: PaymentsTimelineProps) {
  const t = INVOICE_DETAIL_I18N[locale];

  const getPaymentMethodIcon = (method: InvoicePayment["method"]) => {
    switch (method) {
      case "Card":
        return <CreditCardIcon className="w-4 h-4" />;

      case "Bank Transfer":
        return <BanknoteIcon className="w-4 h-4" />;

      case "Cash":
        return <BanknoteIcon className="w-4 h-4" />;

      case "TWINT":
        return <SmartphoneIcon className="w-4 h-4" />;

      case "PayPal":
        return <CreditCardIcon className="w-4 h-4" />;

      default:
        return <BanknoteIcon className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2)} ${currency}`;
  };

  const canEdit = (payment: InvoicePayment) => {
    const paymentDate = new Date(payment.date);
    const now = new Date();
    const hoursDiff =
      (now.getTime() - paymentDate.getTime()) / (1000 * 60 * 60);
    return hoursDiff < 48;
  };

  if (payments.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
            <BanknoteIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{t.noPayments}</h3>
            <p className="text-sm text-muted-foreground">
              Aucun paiement n'a encore été enregistré pour cette facture
            </p>
          </div>
          <Button onClick={onRecordPayment}>
            <PlusIcon className="w-4 h-4 mr-2" />

            {t.recordPayment}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-semibold">{t.paymentsHistory}</h5>
        <Button size="sm" onClick={onRecordPayment}>
          <PlusIcon className="w-4 h-4 mr-2" />

          {t.recordPayment}
        </Button>
      </div>

      <div className="space-y-4">
        {payments.map((payment, index) => (
          <div key={payment.id}>
            <div className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 border-4 border-background" />

                {index < payments.length - 1 && (
                  <div className="w-0.5 h-full bg-border mt-2" />
                )}
              </div>

              {/* Payment Card */}
              <Card className="flex-1 p-4 mb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(payment.amount)}
                      </span>
                      <Badge variant="outline" className="gap-1">
                        {getPaymentMethodIcon(payment.method)}
                        {payment.method}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(payment.date)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    {payment.receiptUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDownloadReceipt?.(payment)}
                      >
                        <DownloadIcon className="w-4 h-4" />
                      </Button>
                    )}
                    {canEdit(payment) && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditPayment?.(payment)}
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeletePayment?.(payment)}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {payment.reference && (
                  <div className="text-sm mb-2">
                    <span className="text-muted-foreground">
                      {t.reference}:{" "}
                    </span>
                    <span className="font-mono">{payment.reference}</span>
                  </div>
                )}

                <div className="text-sm text-muted-foreground mb-2">
                  {t.recordedBy}: {payment.recordedBy}
                </div>

                {payment.notes && (
                  <>
                    <Separator className="my-3" />

                    <div className="text-sm">
                      <span className="text-muted-foreground">{t.notes}: </span>
                      <span>{payment.notes}</span>
                    </div>
                  </>
                )}

                {payment.receiptUrl && (
                  <div className="mt-3">
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0"
                      onClick={() => onDownloadReceipt?.(payment)}
                    >
                      <DownloadIcon className="w-3 h-3 mr-1" />

                      {t.receipt}
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
