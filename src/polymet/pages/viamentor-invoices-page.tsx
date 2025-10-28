/**
 * VIAMENTOR Invoices Management Page
 *
 * Page principale Finance Invoices avec:
 * - Tabs navigation (Invoices / Payment Methods / Dunning)
 * - InvoicesTable avec filtres et bulk actions
 * - InvoiceDetail dialog fullscreen
 * - PaymentMethodsTable
 * - DunningManagement config
 * - State management local
 */

import { useState } from "react";
import { Invoice, PaymentMethod } from "@/polymet/data/viamentor-invoices-data";
import {
  MOCK_INVOICES,
  MOCK_PAYMENT_METHODS,
  MOCK_DUNNING_CONFIG,
  MOCK_EMAIL_TEMPLATES,
} from "@/polymet/data/viamentor-invoices-data";
import { InvoicesTable } from "@/polymet/components/viamentor-invoices-table";
import { InvoiceDetail } from "@/polymet/components/viamentor-invoice-detail";
import { PaymentMethodsTable } from "@/polymet/components/viamentor-payment-methods-table";
import { DunningManagement } from "@/polymet/components/viamentor-dunning-management";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileTextIcon, CreditCardIcon, BellIcon } from "lucide-react";

export function ViaMenutorInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [paymentMethods, setPaymentMethods] =
    useState<PaymentMethod[]>(MOCK_PAYMENT_METHODS);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [invoiceDetailOpen, setInvoiceDetailOpen] = useState(false);

  // Invoice handlers
  const handleViewDetail = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setInvoiceDetailOpen(true);
  };

  const handleSendEmail = (invoice: Invoice) => {
    console.log("Send email reminder", invoice);
    // TODO: Implement email sending
    alert(`Email de rappel envoyé pour ${invoice.invoiceNumber}`);
  };

  const handleMarkAsPaid = (invoice: Invoice) => {
    console.log("Mark as paid", invoice);
    setInvoices(
      invoices.map((inv) =>
        inv.id === invoice.id
          ? {
              ...inv,
              status: "Paid" as const,
              paidDate: new Date().toISOString(),
              paidAmount: inv.total,
              timeline: [
                ...inv.timeline,
                {
                  id: `paid_${Date.now()}`,
                  type: "Paid" as const,
                  date: new Date().toISOString(),
                  user: "Admin",
                  details: "Marquée comme payée manuellement",
                },
              ],
            }
          : inv
      )
    );
    alert(`Facture ${invoice.invoiceNumber} marquée comme payée`);
  };

  const handleVoidInvoice = (invoice: Invoice) => {
    const reason = prompt("Raison de l'annulation:");
    if (!reason) return;

    console.log("Void invoice", invoice, reason);
    setInvoices(
      invoices.map((inv) =>
        inv.id === invoice.id
          ? {
              ...inv,
              status: "Void" as const,
              voidReason: reason,
              timeline: [
                ...inv.timeline,
                {
                  id: `void_${Date.now()}`,
                  type: "Voided" as const,
                  date: new Date().toISOString(),
                  user: "Admin",
                  details: `Raison: ${reason}`,
                },
              ],
            }
          : inv
      )
    );
    setInvoiceDetailOpen(false);
    alert(`Facture ${invoice.invoiceNumber} annulée`);
  };

  const handleDeleteInvoice = (invoice: Invoice) => {
    if (!confirm(`Supprimer la facture ${invoice.invoiceNumber}?`)) return;

    console.log("Delete invoice", invoice);
    setInvoices(invoices.filter((inv) => inv.id !== invoice.id));
    alert(`Facture ${invoice.invoiceNumber} supprimée`);
  };

  const handleBulkSendReminders = (invoiceIds: string[]) => {
    console.log("Bulk send reminders", invoiceIds);
    alert(`${invoiceIds.length} rappels envoyés`);
  };

  const handleBulkExportPDF = (invoiceIds: string[]) => {
    console.log("Bulk export PDF", invoiceIds);
    alert(`Export de ${invoiceIds.length} factures en cours...`);
  };

  const handleBulkMarkAsPaid = (invoiceIds: string[]) => {
    console.log("Bulk mark as paid", invoiceIds);
    setInvoices(
      invoices.map((inv) =>
        invoiceIds.includes(inv.id)
          ? {
              ...inv,
              status: "Paid" as const,
              paidDate: new Date().toISOString(),
              paidAmount: inv.total,
            }
          : inv
      )
    );
    alert(`${invoiceIds.length} factures marquées comme payées`);
  };

  // Payment method handlers
  const handleSetDefaultPaymentMethod = (methodId: string) => {
    console.log("Set default payment method", methodId);
    const method = paymentMethods.find((m) => m.id === methodId);
    if (!method) return;

    setPaymentMethods(
      paymentMethods.map((m) => ({
        ...m,
        isDefault:
          m.tenantId === method.tenantId ? m.id === methodId : m.isDefault,
      }))
    );
    alert(`Méthode de paiement définie par défaut pour ${method.tenantName}`);
  };

  const handleRemovePaymentMethod = (method: PaymentMethod) => {
    if (method.activeSubscriptions > 0) {
      if (
        !confirm(
          `Cette méthode est utilisée par ${method.activeSubscriptions} abonnement(s). Les abonnements seront mis en pause. Continuer?`
        )
      ) {
        return;
      }
    }

    console.log("Remove payment method", method);
    setPaymentMethods(paymentMethods.filter((m) => m.id !== method.id));
    alert(`Méthode de paiement supprimée pour ${method.tenantName}`);
  };

  const handleUpdatePaymentMethod = (method: PaymentMethod) => {
    console.log("Update payment method", method);
    alert(`Mise à jour de la méthode de paiement pour ${method.tenantName}`);
  };

  const handleAddPaymentMethod = () => {
    console.log("Add new payment method");
    alert("Dialog d'ajout de méthode de paiement (à implémenter)");
  };

  // Dunning handlers
  const handleSaveDunningConfig = (config: any) => {
    console.log("Save dunning config", config);
    alert("Configuration des relances enregistrée");
  };

  const handleEditEmailTemplate = (templateId: string) => {
    console.log("Edit email template", templateId);
    alert(`Édition du template ${templateId} (à implémenter)`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Gestion des factures</h1>
          <p className="text-muted-foreground">
            Gérez toutes les factures, modes de paiement et relances
            automatiques
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="invoices" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <FileTextIcon className="h-4 w-4" />
              Factures
            </TabsTrigger>
            <TabsTrigger
              value="payment-methods"
              className="flex items-center gap-2"
            >
              <CreditCardIcon className="h-4 w-4" />
              Paiements
            </TabsTrigger>
            <TabsTrigger value="dunning" className="flex items-center gap-2">
              <BellIcon className="h-4 w-4" />
              Relances
            </TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="space-y-6">
            <InvoicesTable
              invoices={invoices}
              locale="fr"
              onViewDetail={handleViewDetail}
              onSendEmail={handleSendEmail}
              onMarkAsPaid={handleMarkAsPaid}
              onVoid={handleVoidInvoice}
              onDelete={handleDeleteInvoice}
              onBulkSendReminders={handleBulkSendReminders}
              onBulkExportPDF={handleBulkExportPDF}
              onBulkMarkAsPaid={handleBulkMarkAsPaid}
            />
          </TabsContent>

          <TabsContent value="payment-methods" className="space-y-6">
            <PaymentMethodsTable
              paymentMethods={paymentMethods}
              locale="fr"
              onSetDefault={handleSetDefaultPaymentMethod}
              onRemove={handleRemovePaymentMethod}
              onUpdate={handleUpdatePaymentMethod}
              onAddNew={handleAddPaymentMethod}
            />
          </TabsContent>

          <TabsContent value="dunning" className="space-y-6">
            <DunningManagement
              config={MOCK_DUNNING_CONFIG}
              templates={MOCK_EMAIL_TEMPLATES}
              locale="fr"
              onSave={handleSaveDunningConfig}
              onEditTemplate={handleEditEmailTemplate}
            />
          </TabsContent>
        </Tabs>

        {/* Invoice Detail Dialog */}
        <InvoiceDetail
          open={invoiceDetailOpen}
          onOpenChange={setInvoiceDetailOpen}
          invoice={selectedInvoice}
          locale="fr"
          onDownloadPDF={() => console.log("Download PDF")}
          onSendEmail={() =>
            selectedInvoice && handleSendEmail(selectedInvoice)
          }
          onPrint={() => window.print()}
          onVoid={() => selectedInvoice && handleVoidInvoice(selectedInvoice)}
          onEdit={() => console.log("Edit invoice")}
          onDuplicate={() => console.log("Duplicate invoice")}
        />
      </div>
    </div>
  );
}
