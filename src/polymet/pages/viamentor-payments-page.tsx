/**
 * VIAMENTOR - Payments Page
 * Page principale gestion paiements
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Upload,
  Download,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  FileText,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentsStatsCards } from "@/polymet/components/viamentor-payments-stats-cards";
import { RecordPaymentModal } from "@/polymet/components/viamentor-record-payment-modal";
import { ImportCamtModal } from "@/polymet/components/viamentor-import-camt-modal";
import { UnreconciledPaymentsTab } from "@/polymet/components/viamentor-unreconciled-payments-tab";
import { AccountingReportsTab } from "@/polymet/components/viamentor-accounting-reports-tab";
import { PaymentNotificationsSettings } from "@/polymet/components/viamentor-payment-notifications-settings";
import {
  mockPayments,
  mockPaymentStats,
  mockUnreconciledPayments,
  mockAccountingJournal,
  mockVATReport,
  mockNotificationTemplates,
  mockNotificationLogs,
  getPaymentMethodIcon,
} from "@/polymet/data/viamentor-payments-data";
import {
  getPaymentsTranslations,
  type PaymentsLocale,
} from "@/polymet/data/viamentor-payments-i18n";

interface PaymentsPageProps {
  locale?: PaymentsLocale;
}

export function PaymentsPage({ locale = "fr" }: PaymentsPageProps) {
  const t = getPaymentsTranslations(locale);
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredPayments = mockPayments.filter((payment) => {
    if (statusFilter === "all") return true;
    return payment.status === statusFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "validated":
        return (
          <Badge variant="default" className="bg-green-600">
            {t.status.validated}
          </Badge>
        );

      case "pending":
        return (
          <Badge variant="default" className="bg-orange-600">
            {t.status.pending}
          </Badge>
        );

      case "rejected":
        return <Badge variant="destructive">{t.status.rejected}</Badge>;

      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.pageTitle}</h1>
          <p className="text-muted-foreground">{t.breadcrumb}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setImportModalOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />

            {t.actions.importCamt}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />

                {t.actions.export}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>{t.actions.exportExcel}</DropdownMenuItem>
              <DropdownMenuItem>{t.actions.exportCSV}</DropdownMenuItem>
              <DropdownMenuItem>{t.actions.exportPDF}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => setRecordModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />

            {t.actions.newPayment}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <PaymentsStatsCards stats={mockPaymentStats} locale={t} />

      {/* Tabs Navigation */}
      <Tabs defaultValue="payments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="payments">{t.pageTitle}</TabsTrigger>
          <TabsTrigger value="unreconciled">
            {t.unreconciled.title}
            {mockUnreconciledPayments.length > 0 && (
              <Badge className="ml-2" variant="destructive">
                {mockUnreconciledPayments.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="accounting">{t.accounting.title}</TabsTrigger>
          <TabsTrigger value="notifications">
            {t.notifications.title}
          </TabsTrigger>
        </TabsList>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          {/* Filters */}
          <div className="flex gap-4">
            <Input placeholder={t.filters.student} className="max-w-xs" />

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t.filters.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="validated">{t.status.validated}</SelectItem>
                <SelectItem value="pending">{t.status.pending}</SelectItem>
                <SelectItem value="rejected">{t.status.rejected}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border border-border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.table.dateTime}</TableHead>
                  <TableHead>{t.table.student}</TableHead>
                  <TableHead>{t.table.invoices}</TableHead>
                  <TableHead className="text-right">{t.table.amount}</TableHead>
                  <TableHead>{t.table.method}</TableHead>
                  <TableHead>{t.table.reference}</TableHead>
                  <TableHead>{t.table.recordedBy}</TableHead>
                  <TableHead>{t.table.status}</TableHead>
                  <TableHead>{t.table.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{payment.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {payment.time}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={payment.studentAvatar} />

                          <AvatarFallback>
                            {payment.studentName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {payment.studentName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {payment.invoiceNumbers.map((num) => (
                          <Badge key={num} variant="outline">
                            {num}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-bold text-green-600">
                        {payment.amount.toFixed(2)} CHF
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {t.methods[payment.method as keyof typeof t.methods]}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className="max-w-[150px] truncate"
                      title={payment.reference}
                    >
                      {payment.reference || "-"}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{payment.recordedByName}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />

                            {t.actions.viewDetail}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />

                            {t.actions.edit}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />

                            {t.actions.downloadReceipt}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />

                            {t.actions.delete}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Unreconciled Payments Tab */}
        <TabsContent value="unreconciled">
          <UnreconciledPaymentsTab
            payments={mockUnreconciledPayments}
            locale={t}
            onAssociate={(paymentId, invoiceId) => {
              console.log(
                "Associate payment:",
                paymentId,
                "with invoice:",
                invoiceId
              );
              alert("Paiement associé à la facture");
            }}
            onCreateInvoice={(paymentId, invoiceData) => {
              console.log(
                "Create invoice for payment:",
                paymentId,
                invoiceData
              );
              alert("Facture rétroactive créée");
            }}
            onMarkVerified={(paymentId, notes) => {
              console.log("Mark verified:", paymentId, notes);
              alert("Paiement marqué comme vérifié");
            }}
          />
        </TabsContent>

        {/* Accounting Reports Tab */}
        <TabsContent value="accounting">
          <AccountingReportsTab
            journalEntries={mockAccountingJournal}
            vatReport={mockVATReport}
            locale={t}
            onExportJournal={(format) => {
              console.log("Export journal:", format);
              alert(`Export journal ${format.toUpperCase()} généré`);
            }}
            onExportVAT={(format) => {
              console.log("Export VAT:", format);
              alert(`Export TVA ${format.toUpperCase()} généré`);
            }}
          />
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <PaymentNotificationsSettings
            templates={mockNotificationTemplates}
            logs={mockNotificationLogs}
            locale={t}
            onToggleTemplate={(templateId, enabled) => {
              console.log("Toggle template:", templateId, enabled);
              alert(`Modèle ${enabled ? "activé" : "désactivé"}`);
            }}
            onEditTemplate={(template) => {
              console.log("Edit template:", template);
              alert("Modèle enregistré");
            }}
            onTestSend={(templateId, recipient) => {
              console.log("Test send:", templateId, "to:", recipient);
              alert(`Email de test envoyé à ${recipient}`);
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <RecordPaymentModal
        open={recordModalOpen}
        onOpenChange={setRecordModalOpen}
        locale={t}
        onSubmit={async (data) => {
          console.log("Payment recorded:", data);
          alert(
            t.recordPayment.successToast.replace(
              "{amount}",
              data.amount.toString()
            )
          );
        }}
      />

      <ImportCamtModal
        open={importModalOpen}
        onOpenChange={setImportModalOpen}
        locale={t}
        onComplete={async (data) => {
          console.log("Import completed:", data);
          alert(
            t.importCamt.successToast
              .replace("{processed}", "3")
              .replace("{paid}", "2")
          );
        }}
      />
    </div>
  );
}
