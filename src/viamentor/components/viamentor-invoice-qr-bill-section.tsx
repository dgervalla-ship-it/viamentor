/**
 * VIAMENTOR - Invoice QR Bill Section
 * Section QR-facture suisse avec QR-code, bulletin paiement, actions
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { DownloadIcon, CopyIcon, InfoIcon, QrCodeIcon } from "lucide-react";
import {
  INVOICE_DETAIL_I18N,
  type InvoiceDetailLocale,
} from "@/viamentor/data/viamentor-invoice-detail-i18n";
import type { Invoice } from "@/viamentor/data/viamentor-invoices-data";

interface QRBillSectionProps {
  invoice: Invoice;
  qrReference: string;
  locale?: InvoiceDetailLocale;
  onDownloadSeparate?: () => void;
  onCopyReference?: () => void;
}

export function InvoiceQRBillSection({
  invoice,
  qrReference,
  locale = "fr",
  onDownloadSeparate,
  onCopyReference,
}: QRBillSectionProps) {
  const t = INVOICE_DETAIL_I18N[locale];

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2)} ${invoice.currency}`;
  };

  // Mock QR Code SVG (in production, use a QR code library)
  const QRCodePlaceholder = () => (
    <div className="w-48 h-48 bg-white border-2 border-black flex items-center justify-center">
      <QrCodeIcon className="w-32 h-32 text-black" />
    </div>
  );

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-semibold">{t.qrBillTitle}</h5>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onDownloadSeparate}>
            <DownloadIcon className="w-4 h-4 mr-2" />

            {t.downloadSeparate}
          </Button>
          <Button variant="outline" size="sm" onClick={onCopyReference}>
            <CopyIcon className="w-4 h-4 mr-2" />

            {t.copyReference}
          </Button>
        </div>
      </div>

      <Alert className="mb-6">
        <InfoIcon className="w-4 h-4" />

        <AlertDescription>{t.scannable}</AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* QR Code */}
        <div className="flex flex-col items-center space-y-4">
          <QRCodePlaceholder />

          <div className="text-center">
            <p className="text-sm font-medium mb-1">{t.reference}</p>
            <p className="text-xs font-mono text-muted-foreground">
              {qrReference}
            </p>
          </div>
        </div>

        {/* Payment Slip Information */}
        <div className="space-y-6">
          {/* Account / Payable to */}
          <div>
            <h6 className="text-sm font-semibold mb-3 text-muted-foreground">
              {t.account} / {t.creditor}
            </h6>
            <div className="space-y-1 text-sm">
              <p className="font-medium">{invoice.tenantName}</p>
              <p>{invoice.tenantAddress.street}</p>
              <p>
                {invoice.tenantAddress.zip} {invoice.tenantAddress.city}
              </p>
              <p>{invoice.tenantAddress.country}</p>
            </div>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">IBAN</p>
              <p className="font-mono text-sm">CH93 0076 2011 6238 5295 7</p>
            </div>
          </div>

          <Separator />

          {/* Reference */}
          <div>
            <h6 className="text-sm font-semibold mb-2 text-muted-foreground">
              {t.reference}
            </h6>
            <p className="font-mono text-sm">{qrReference}</p>
          </div>

          <Separator />

          {/* Additional Information */}
          <div>
            <h6 className="text-sm font-semibold mb-2 text-muted-foreground">
              Information
            </h6>
            <div className="space-y-1 text-sm">
              <p>
                {t.invoice} {invoice.invoiceNumber}
              </p>
              <p>
                {new Date(invoice.dueDate).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <Separator />

          {/* Payable by (Debtor) */}
          <div>
            <h6 className="text-sm font-semibold mb-3 text-muted-foreground">
              {t.debtor}
            </h6>
            <div className="space-y-1 text-sm">
              <p className="font-medium">Sophie Martin</p>
              <p>Rue de la Gare 12</p>
              <p>1003 Lausanne</p>
              <p>Suisse</p>
            </div>
          </div>

          <Separator />

          {/* Amount */}
          <div>
            <h6 className="text-sm font-semibold mb-2 text-muted-foreground">
              {t.amount}
            </h6>
            <p className="text-2xl font-bold">
              {formatCurrency(invoice.total)}
            </p>
          </div>
        </div>
      </div>

      {/* Swiss Payment Standard Note */}
      <div className="mt-6 pt-6 border-t">
        <p className="text-xs text-muted-foreground text-center">
          QR-facture conforme au Swiss Payment Standard - Version 2.0
        </p>
      </div>
    </Card>
  );
}
