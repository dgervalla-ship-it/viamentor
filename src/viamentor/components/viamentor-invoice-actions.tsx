/**
 * VIAMENTOR - Invoice Actions
 * Actions contextuelles par statut avec buttons, dialogs, états
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  SendIcon,
  PencilIcon,
  TrashIcon,
  DollarSignIcon,
  BellIcon,
  FileTextIcon,
  XCircleIcon,
  DownloadIcon,
  CopyIcon,
  FileSpreadsheetIcon,
  PrinterIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
} from "lucide-react";
import {
  INVOICE_DETAIL_I18N,
  type InvoiceDetailLocale,
} from "@/viamentor/data/viamentor-invoice-detail-i18n";
import type { InvoiceStatus } from "@/viamentor/data/viamentor-invoices-data";

interface InvoiceActionsProps {
  status: InvoiceStatus;
  locale?: InvoiceDetailLocale;
  voidReason?: string;
  onFinalizeAndSend?: () => void;
  onModify?: () => void;
  onDelete?: () => void;
  onRecordPayment?: () => void;
  onSendReminder?: () => void;
  onCreateCreditNote?: () => void;
  onCancelInvoice?: () => void;
  onDownloadReceipt?: () => void;
  onCreatePartialCredit?: () => void;
  onDuplicate?: () => void;
  onCreateNextInvoice?: () => void;
  onExportAccounting?: () => void;
  onPrint?: () => void;
}

export function InvoiceActions({
  status,
  locale = "fr",
  voidReason,
  onFinalizeAndSend,
  onModify,
  onDelete,
  onRecordPayment,
  onSendReminder,
  onCreateCreditNote,
  onCancelInvoice,
  onDownloadReceipt,
  onCreatePartialCredit,
  onDuplicate,
  onCreateNextInvoice,
  onExportAccounting,
  onPrint,
}: InvoiceActionsProps) {
  const t = INVOICE_DETAIL_I18N[locale];

  const renderDraftActions = () => (
    <div className="space-y-3">
      <Button className="w-full" size="lg" onClick={onFinalizeAndSend}>
        <SendIcon className="w-4 h-4 mr-2" />

        {t.finalizeAndSend}
      </Button>
      <Button variant="outline" className="w-full" onClick={onModify}>
        <PencilIcon className="w-4 h-4 mr-2" />

        {t.modify}
      </Button>
      <Button variant="destructive" className="w-full" onClick={onDelete}>
        <TrashIcon className="w-4 h-4 mr-2" />

        {t.delete}
      </Button>
    </div>
  );

  const renderSentOverdueActions = () => (
    <div className="space-y-3">
      <Button className="w-full" size="lg" onClick={onRecordPayment}>
        <DollarSignIcon className="w-4 h-4 mr-2" />

        {t.recordPayment}
      </Button>
      <Button variant="outline" className="w-full" onClick={onSendReminder}>
        <BellIcon className="w-4 h-4 mr-2" />

        {t.sendReminder}
      </Button>
      <Button variant="outline" className="w-full" onClick={onCreateCreditNote}>
        <FileTextIcon className="w-4 h-4 mr-2" />

        {t.createCreditNote}
      </Button>
      <Button
        variant="destructive"
        className="w-full"
        onClick={onCancelInvoice}
      >
        <XCircleIcon className="w-4 h-4 mr-2" />

        {t.cancelInvoice}
      </Button>
    </div>
  );

  const renderPaidActions = () => (
    <div className="space-y-3">
      <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
        <CheckCircleIcon className="w-4 h-4 text-green-600" />

        <AlertDescription className="text-green-800 dark:text-green-200">
          {t.invoicePaid} - {t.noActionRequired}
        </AlertDescription>
      </Alert>
      <Button variant="outline" className="w-full" onClick={onDownloadReceipt}>
        <DownloadIcon className="w-4 h-4 mr-2" />

        {t.downloadReceipt}
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={onCreatePartialCredit}
      >
        <FileTextIcon className="w-4 h-4 mr-2" />

        {t.createPartialCredit}
      </Button>
    </div>
  );

  const renderVoidActions = () => (
    <div className="space-y-3">
      <Alert className="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900">
        <AlertTriangleIcon className="w-4 h-4 text-orange-600" />

        <AlertDescription className="text-orange-800 dark:text-orange-200">
          {t.invoiceCanceled}
          {voidReason && (
            <div className="mt-2 text-sm">
              <span className="font-medium">{t.voidReason}: </span>
              {voidReason}
            </div>
          )}
        </AlertDescription>
      </Alert>
      <Button variant="outline" className="w-full" onClick={onDuplicate}>
        <CopyIcon className="w-4 h-4 mr-2" />

        {t.duplicate}
      </Button>
    </div>
  );

  const renderUniversalActions = () => (
    <div className="space-y-2 pt-4 border-t">
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={onCreateNextInvoice}
      >
        <FileTextIcon className="w-4 h-4 mr-2" />

        {t.createNextInvoice}
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={onExportAccounting}
      >
        <FileSpreadsheetIcon className="w-4 h-4 mr-2" />

        {t.exportAccounting}
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={onPrint}
      >
        <PrinterIcon className="w-4 h-4 mr-2" />

        {t.print}
      </Button>
    </div>
  );

  return (
    <Card className="p-6">
      <h5 className="text-lg font-semibold mb-4">{t.availableActions}</h5>

      {/* Status-specific actions */}
      {status === "Draft" && renderDraftActions()}
      {(status === "Sent" || status === "Overdue") &&
        renderSentOverdueActions()}
      {status === "Paid" && renderPaidActions()}
      {status === "Void" && renderVoidActions()}

      {/* Universal actions */}
      {renderUniversalActions()}
    </Card>
  );
}
