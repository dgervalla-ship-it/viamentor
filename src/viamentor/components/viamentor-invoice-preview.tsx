/**
 * VIAMENTOR - Invoice Preview
 * Preview PDF facture avec iframe, zoom controls, fallback
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ZoomInIcon,
  ZoomOutIcon,
  MaximizeIcon,
  DownloadIcon,
  FileTextIcon,
} from "lucide-react";
import { useState } from "react";
import {
  INVOICE_DETAIL_I18N,
  type InvoiceDetailLocale,
} from "@/viamentor/data/viamentor-invoice-detail-i18n";
import type { Invoice } from "@/viamentor/data/viamentor-invoices-data";

interface InvoicePreviewProps {
  invoice: Invoice;
  pdfUrl?: string;
  locale?: InvoiceDetailLocale;
  onDownload?: () => void;
}

export function InvoicePreview({
  invoice,
  pdfUrl,
  locale = "fr",
  onDownload,
}: InvoicePreviewProps) {
  const t = INVOICE_DETAIL_I18N[locale];
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toFixed(2)} ${invoice.currency}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Fallback preview when no PDF URL
  const renderFallbackPreview = () => (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-inner">
      {/* Invoice Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <img
            src={invoice.tenantLogo}
            alt={invoice.tenantName}
            className="w-16 h-16 rounded-lg mb-4"
          />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {invoice.tenantName}
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            <p>{invoice.tenantAddress.street}</p>
            <p>
              {invoice.tenantAddress.zip} {invoice.tenantAddress.city}
            </p>
            <p>{invoice.tenantAddress.country}</p>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {t.invoice}
          </h1>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            {invoice.invoiceNumber}
          </p>
          <Badge className="mt-2">{invoice.status}</Badge>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Dates and Customer */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
            {t.debtor}
          </h3>
          <div className="text-gray-900 dark:text-gray-100">
            <p className="font-semibold">Sophie Martin</p>
            <p className="text-sm">Rue de la Gare 12</p>
            <p className="text-sm">1003 Lausanne</p>
            <p className="text-sm">Suisse</p>
          </div>
        </div>
        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.issuedOn}
            </p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {formatDate(invoice.issueDate)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.dueDate}
            </p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {formatDate(invoice.dueDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-700">
              <th className="text-left py-3 text-gray-700 dark:text-gray-300">
                {t.description}
              </th>
              <th className="text-right py-3 text-gray-700 dark:text-gray-300">
                {t.quantity}
              </th>
              <th className="text-right py-3 text-gray-700 dark:text-gray-300">
                {t.unitPrice}
              </th>
              <th className="text-right py-3 text-gray-700 dark:text-gray-300">
                {t.lineTotal}
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 dark:border-gray-800"
              >
                <td className="py-3 text-gray-900 dark:text-gray-100">
                  {item.description}
                </td>
                <td className="text-right text-gray-900 dark:text-gray-100">
                  {item.quantity}
                </td>
                <td className="text-right text-gray-900 dark:text-gray-100">
                  {formatCurrency(item.unitPrice)}
                </td>
                <td className="text-right font-semibold text-gray-900 dark:text-gray-100">
                  {formatCurrency(item.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {t.subtotalHT}
            </span>
            <span className="text-gray-900 dark:text-gray-100">
              {formatCurrency(invoice.subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              {t.vat} {invoice.items[0]?.vatRate}%
            </span>
            <span className="text-gray-900 dark:text-gray-100">
              {formatCurrency(invoice.vatAmount)}
            </span>
          </div>
          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span className="text-gray-900 dark:text-gray-100">
              {t.totalTTC}
            </span>
            <span className="text-gray-900 dark:text-gray-100">
              {formatCurrency(invoice.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 dark:text-gray-500 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p>{invoice.tenantName}</p>
        <p>
          {invoice.tenantEmail} | {invoice.tenantPhone}
        </p>
      </div>
    </div>
  );

  return (
    <Card className="p-4 h-full flex flex-col">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOutIcon className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium min-w-[60px] text-center">
            {zoom}%
          </span>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomInIcon className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleResetZoom}>
            <MaximizeIcon className="w-4 h-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={onDownload}>
          <DownloadIcon className="w-4 h-4 mr-2" />

          {t.downloadPDF}
        </Button>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900 rounded-lg">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            className="w-full h-full"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top left",
            }}
            title="Invoice PDF Preview"
          />
        ) : (
          <div
            className="p-4"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top left",
            }}
          >
            {renderFallbackPreview()}
          </div>
        )}
      </div>

      {!pdfUrl && (
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <FileTextIcon className="w-4 h-4" />

          <span>Aperçu généré automatiquement - PDF non disponible</span>
        </div>
      )}
    </Card>
  );
}
