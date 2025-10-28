/**
 * VIAMENTOR - Invoice Preview Dialog
 * Preview facture avec rendering complet et prix actuels
 */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  FileTextIcon,
  DownloadIcon,
  PrinterIcon,
  MailIcon,
} from "lucide-react";
import {
  formatCurrency,
  getPricingTranslation,
  type PricingLocale,
} from "@/polymet/data/viamentor-pricing-i18n";
import {
  mockLessonPrices,
  mockProducts,
  calculateVAT,
  calculatePriceWithVAT,
} from "@/polymet/data/viamentor-pricing-data";

// ============================================================================
// TYPES
// ============================================================================

interface InvoiceItem {
  type: "lesson" | "package" | "product";
  name: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  discount?: number;
  discountReason?: string;
}

interface InvoicePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale?: PricingLocale;
  items: InvoiceItem[];
  studentName?: string;
  promotionCode?: string;
  onDownload?: () => void;
  onPrint?: () => void;
  onSendEmail?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function InvoicePreviewDialog({
  open,
  onOpenChange,
  locale = "fr",
  items,
  studentName = "Sophie Martin",
  promotionCode,
  onDownload,
  onPrint,
  onSendEmail,
}: InvoicePreviewDialogProps) {
  const t = getPricingTranslation(locale);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    const itemTotal = item.quantity * item.unitPrice;
    const discount = item.discount || 0;
    return sum + itemTotal - discount;
  }, 0);

  const vatByRate = items.reduce(
    (acc, item) => {
      const itemTotal = item.quantity * item.unitPrice - (item.discount || 0);
      const vat = calculateVAT(itemTotal, item.vatRate as any);
      const key = item.vatRate.toString();
      acc[key] = (acc[key] || 0) + vat;
      return acc;
    },
    {} as Record<string, number>
  );

  const totalVAT = Object.values(vatByRate).reduce((sum, vat) => sum + vat, 0);
  const total = subtotal + totalVAT;

  const today = new Date().toLocaleDateString(
    locale === "fr"
      ? "fr-CH"
      : locale === "de"
        ? "de-CH"
        : locale === "it"
          ? "it-CH"
          : "en-CH"
  );
  const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(
    Math.random() * 10000
  )
    .toString()
    .padStart(4, "0")}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileTextIcon className="h-5 w-5" />

            {t.previewInvoice}
          </DialogTitle>
        </DialogHeader>

        {/* Invoice Preview */}
        <div className="bg-white text-black p-8 rounded-lg border-2 border-border">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Auto-École ViaMenutor</h1>
              <p className="text-sm text-gray-600">
                Route de Lausanne 123
                <br />
                1700 Fribourg, Suisse
                <br />
                +41 26 123 45 67
                <br />
                info@viamentor.ch
              </p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">
                PREVIEW
              </Badge>
              <p className="text-sm font-semibold">
                Facture N° {invoiceNumber}
              </p>
              <p className="text-sm text-gray-600">Date: {today}</p>
              <p className="text-sm text-gray-600">
                Échéance:{" "}
                {new Date(
                  Date.now() + 30 * 24 * 60 * 60 * 1000
                ).toLocaleDateString(
                  locale === "fr"
                    ? "fr-CH"
                    : locale === "de"
                      ? "de-CH"
                      : locale === "it"
                        ? "it-CH"
                        : "en-CH"
                )}
              </p>
            </div>
          </div>

          {/* Student Info */}
          <div className="mb-8">
            <p className="text-sm font-semibold mb-1">Facturé à:</p>
            <p className="text-sm">
              {studentName}
              <br />
              Rue de l'Exemple 45
              <br />
              1700 Fribourg
            </p>
          </div>

          {promotionCode && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-sm font-semibold text-green-800">
                🎉 Code promo appliqué:{" "}
                <span className="font-mono">{promotionCode}</span>
              </p>
            </div>
          )}

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2 font-semibold">Description</th>
                  <th className="text-right py-2 font-semibold">Qté</th>
                  <th className="text-right py-2 font-semibold">Prix unit.</th>
                  <th className="text-right py-2 font-semibold">TVA</th>
                  <th className="text-right py-2 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => {
                  const itemTotal = item.quantity * item.unitPrice;
                  const discount = item.discount || 0;
                  const finalTotal = itemTotal - discount;

                  return (
                    <tr key={idx} className="border-b border-gray-200">
                      <td className="py-3">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          {item.discountReason && (
                            <p className="text-xs text-green-600 mt-1">
                              {item.discountReason}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="text-right py-3">{item.quantity}</td>
                      <td className="text-right py-3">
                        {formatCurrency(item.unitPrice, locale)}
                      </td>
                      <td className="text-right py-3">{item.vatRate}%</td>
                      <td className="text-right py-3">
                        {discount > 0 && (
                          <div className="text-xs text-gray-500 line-through">
                            {formatCurrency(itemTotal, locale)}
                          </div>
                        )}
                        <div
                          className={
                            discount > 0 ? "text-green-600 font-semibold" : ""
                          }
                        >
                          {formatCurrency(finalTotal, locale)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-80">
              <div className="flex justify-between py-2 text-sm">
                <span className="text-gray-600">Sous-total HT:</span>
                <span className="font-medium">
                  {formatCurrency(subtotal, locale)}
                </span>
              </div>

              {Object.entries(vatByRate).map(([rate, amount]) => (
                <div key={rate} className="flex justify-between py-2 text-sm">
                  <span className="text-gray-600">TVA {rate}%:</span>
                  <span className="font-medium">
                    {formatCurrency(amount, locale)}
                  </span>
                </div>
              ))}

              <Separator className="my-2" />

              <div className="flex justify-between py-2">
                <span className="text-lg font-bold">Total TTC:</span>
                <span className="text-lg font-bold">
                  {formatCurrency(total, locale)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="border-t-2 border-gray-300 pt-6">
            <p className="text-sm font-semibold mb-2">
              Informations de paiement:
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>IBAN: CH93 0076 2011 6238 5295 7</p>
              <p>BIC: POFICHBEXXX</p>
              <p>Référence: {invoiceNumber}</p>
              <p className="mt-3">
                Paiement également possible par Twint: +41 79 123 45 67
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-300 text-xs text-gray-500 text-center">
            <p>
              Auto-École ViaMenutor | CHE-123.456.789 TVA | RC Fribourg
              CHE-123.456.789
            </p>
            <p className="mt-1">Merci de votre confiance !</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onPrint}>
              <PrinterIcon className="h-4 w-4 mr-2" />
              Imprimer
            </Button>
            <Button variant="outline" size="sm" onClick={onSendEmail}>
              <MailIcon className="h-4 w-4 mr-2" />
              Envoyer
            </Button>
            <Button size="sm" onClick={onDownload}>
              <DownloadIcon className="h-4 w-4 mr-2" />
              Télécharger PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
