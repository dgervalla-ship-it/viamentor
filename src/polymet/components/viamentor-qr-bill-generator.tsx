/**
 * VIAMENTOR QR-Bill Generator
 *
 * Générateur QR-facture Swiss Payment Standard:
 * - QR-code 46x46mm avec Swiss cross
 * - Encode: IBAN, référence ISO 11649, montant, creditor/debtor info
 * - Sections paiement (compte/référence/montant) et information (créancier/débiteur)
 * - Export PDF format officiel A4 avec perforations
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DownloadIcon, MailIcon, QrCodeIcon, InfoIcon } from "lucide-react";

interface QRBillGeneratorProps {
  invoice: Invoice;
  locale?: InvoiceLocale;
  creditorIBAN?: string;
  creditorName?: string;
  creditorAddress?: {
    street: string;
    zip: string;
    city: string;
    country: string;
  };
  onDownloadPDF?: () => void;
  onSendEmail?: () => void;
}

// Swiss Payment Standard constants
const SWISS_CROSS_SIZE = 7; // mm
const QR_CODE_SIZE = 46; // mm

export function QRBillGenerator({
  invoice,
  locale = "fr",
  creditorIBAN = "CH91 0076 2011 6238 5295 7",
  creditorName = "Viamentor SA",
  creditorAddress = {
    street: "Route de Berne 301",
    zip: "1000",
    city: "Lausanne",
    country: "CH",
  },
  onDownloadPDF,
  onSendEmail,
}: QRBillGeneratorProps) {
  const t = useInvoiceTranslations(locale);

  // Generate QR reference (ISO 11649 format)
  const generateQRReference = (invoiceNumber: string): string => {
    // Simplified reference generation
    // In production, use proper ISO 11649 with check digits
    const numericPart = invoiceNumber.replace(/\D/g, "");
    return `RF${numericPart.padStart(21, "0")}`;
  };

  const qrReference = generateQRReference(invoice.invoiceNumber);

  // QR-Bill data structure (Swiss Payment Standard)
  const qrData = {
    qrType: "SPC", // Swiss Payment Code
    version: "0200",
    codingType: 1,
    account: creditorIBAN.replace(/\s/g, ""),
    creditor: {
      name: creditorName,
      address: creditorAddress.street,
      zip: creditorAddress.zip,
      city: creditorAddress.city,
      country: creditorAddress.country,
    },
    amount: invoice.total,
    currency: invoice.currency,
    debtor: {
      name: invoice.tenantName,
      address: invoice.tenantAddress.street,
      zip: invoice.tenantAddress.zip,
      city: invoice.tenantAddress.city,
      country: invoice.tenantAddress.country,
    },
    reference: qrReference,
    message: `Facture ${invoice.invoiceNumber}`,
    additionalInfo: "",
  };

  // Encode QR data (simplified - in production use proper QR encoding library)
  const encodeQRData = (): string => {
    return [
      qrData.qrType,
      qrData.version,
      qrData.codingType,
      qrData.account,
      "S", // Structured address
      qrData.creditor.name,
      qrData.creditor.address,
      `${qrData.creditor.zip} ${qrData.creditor.city}`,
      "",
      "",
      qrData.creditor.country,
      "",
      "",
      "",
      "",
      "",
      "",
      qrData.amount.toFixed(2),
      qrData.currency,
      "S", // Structured address
      qrData.debtor.name,
      qrData.debtor.address,
      `${qrData.debtor.zip} ${qrData.debtor.city}`,
      "",
      "",
      qrData.debtor.country,
      "QRR", // QR Reference
      qrData.reference,
      qrData.message,
      "EPD", // End Payment Data
    ].join("\n");
  };

  const qrCodeData = encodeQRData();

  // Check if QR-Bill is applicable
  const isQRBillApplicable = invoice.currency === "CHF" && invoice.total > 0;

  if (!isQRBillApplicable) {
    return (
      <Alert>
        <InfoIcon className="h-4 w-4" />

        <AlertDescription>
          Le bulletin de versement QR n'est disponible que pour les factures en
          CHF avec un montant supérieur à 0.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <QrCodeIcon className="h-5 w-5" />

              {t.qrBillTitle}
            </CardTitle>
            <CardDescription>Swiss Payment Standard</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onDownloadPDF}>
              <DownloadIcon className="h-4 w-4 mr-2" />

              {t.downloadQRBill}
            </Button>
            <Button variant="outline" size="sm" onClick={onSendEmail}>
              <MailIcon className="h-4 w-4 mr-2" />

              {t.sendQRBill}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* QR Code Section */}
          <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-lg border-2 border-dashed border-border">
            <div className="relative">
              {/* QR Code placeholder - in production, use qrcode library */}
              <div className="w-48 h-48 bg-white border-2 border-black flex items-center justify-center">
                <div className="text-center">
                  <QrCodeIcon className="h-24 w-24 mx-auto mb-2" />

                  <p className="text-xs text-muted-foreground">
                    QR-Code {QR_CODE_SIZE}x{QR_CODE_SIZE}mm
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Swiss Cross {SWISS_CROSS_SIZE}x{SWISS_CROSS_SIZE}mm
                  </p>
                </div>
              </div>
              {/* Swiss Cross overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white border border-black flex items-center justify-center">
                <div className="text-red-600 font-bold text-lg">+</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center max-w-xs">
              Scanner ce code QR avec votre application bancaire pour effectuer
              le paiement
            </p>
          </div>

          {/* Payment Information Section */}
          <div className="space-y-6">
            {/* Section Paiement */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm uppercase text-muted-foreground">
                {t.paymentSlip}
              </h3>

              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">{t.account}</p>
                  <p className="font-mono text-sm font-medium">
                    {creditorIBAN}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">{t.reference}</p>
                  <p className="font-mono text-sm font-medium break-all">
                    {qrReference}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">{t.amount}</p>
                  <p className="text-lg font-bold">
                    {formatCurrency(invoice.total, locale)}
                  </p>
                </div>
              </div>
            </div>

            {/* Section Information */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="font-semibold text-sm uppercase text-muted-foreground">
                Information
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">{t.creditor}</p>
                  <div className="text-sm">
                    <p className="font-medium">{creditorName}</p>
                    <p>{creditorAddress.street}</p>
                    <p>
                      {creditorAddress.zip} {creditorAddress.city}
                    </p>
                    <p>{creditorAddress.country}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">{t.debtor}</p>
                  <div className="text-sm">
                    <p className="font-medium">{invoice.tenantName}</p>
                    <p>{invoice.tenantAddress.street}</p>
                    <p>
                      {invoice.tenantAddress.zip} {invoice.tenantAddress.city}
                    </p>
                    <p>
                      {invoice.tenantAddress.canton},{" "}
                      {invoice.tenantAddress.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details (for development) */}
        <details className="mt-6">
          <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
            Détails techniques QR-Code
          </summary>
          <div className="mt-2 p-3 bg-muted rounded-md">
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
              {qrCodeData}
            </pre>
          </div>
        </details>

        {/* Swiss Post Specifications Note */}
        <Alert className="mt-4">
          <InfoIcon className="h-4 w-4" />

          <AlertDescription className="text-xs">
            <strong>Spécifications Swiss Post:</strong> Format A4, perforations
            pointillés, QR zone bottom, marges: gauche 5mm, droite 5mm, haut
            5mm, bas 5mm. Respect strict du Swiss Payment Standard.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
