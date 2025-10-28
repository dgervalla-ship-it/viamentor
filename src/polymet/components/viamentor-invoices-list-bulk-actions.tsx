/**
 * VIAMENTOR - Invoices List Bulk Actions
 * Bulk actions sticky bar avec actions groupées sur sélection
 */

"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MailIcon,
  DownloadIcon,
  CheckCircle2Icon,
  FileTextIcon,
  XIcon,
  AlertTriangleIcon,
  TrashIcon,
} from "lucide-react";
import type { InvoiceLocale } from "@/polymet/data/viamentor-invoices-i18n";
import { INVOICE_TRANSLATIONS } from "@/polymet/data/viamentor-invoices-i18n";

export interface InvoicesBulkActionsProps {
  selectedCount: number;
  totalAmount: number;
  locale?: InvoiceLocale;
  onSendEmails?: () => void;
  onDownloadPDFs?: () => void;
  onMarkAsPaid?: () => void;
  onCreateCreditNotes?: () => void;
  onExport?: () => void;
  onSendReminders?: () => void;
  onDelete?: () => void;
  onClearSelection?: () => void;
}

export function InvoicesBulkActions({
  selectedCount,
  totalAmount,
  locale = "fr",
  onSendEmails,
  onDownloadPDFs,
  onMarkAsPaid,
  onCreateCreditNotes,
  onExport,
  onSendReminders,
  onDelete,
  onClearSelection,
}: InvoicesBulkActionsProps) {
  const t = INVOICE_TRANSLATIONS[locale];

  if (selectedCount === 0) return null;

  const formatCurrency = (amount: number) => {
    const separators = {
      fr: { thousands: "'", decimal: "." },
      de: { thousands: ".", decimal: "," },
      it: { thousands: ".", decimal: "," },
      en: { thousands: ",", decimal: "." },
    };

    const sep = separators[locale];
    const parts = amount.toFixed(2).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep.thousands);
    return `${parts.join(sep.decimal)} CHF`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Selection Info */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="h-8 w-8 p-0"
            >
              <XIcon className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-base px-3 py-1">
                {selectedCount}
              </Badge>
              <span className="text-sm font-medium text-foreground">
                {selectedCount === 1
                  ? "facture sélectionnée"
                  : "factures sélectionnées"}
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm font-semibold text-foreground">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onSendEmails}
              className="gap-2"
            >
              <MailIcon className="h-4 w-4" />
              Envoyer emails
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onDownloadPDFs}
              className="gap-2"
            >
              <DownloadIcon className="h-4 w-4" />
              Télécharger PDFs
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onMarkAsPaid}
              className="gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
            >
              <CheckCircle2Icon className="h-4 w-4" />
              Marquer payées
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onCreateCreditNotes}
              className="gap-2"
            >
              <FileTextIcon className="h-4 w-4" />
              Créer avoirs
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="gap-2"
            >
              <DownloadIcon className="h-4 w-4" />
              Exporter
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onSendReminders}
              className="gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300"
            >
              <AlertTriangleIcon className="h-4 w-4" />
              Envoyer rappels
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="gap-2 text-destructive hover:text-destructive"
            >
              <TrashIcon className="h-4 w-4" />
              Supprimer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
