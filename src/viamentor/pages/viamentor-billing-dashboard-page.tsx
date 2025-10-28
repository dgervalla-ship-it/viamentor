/**
 * VIAMENTOR - Billing Dashboard Page
 * Dashboard facturation School Admin avec KPIs, stats, quick actions
 * Limite: 240 lignes
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusIcon,
  WalletIcon,
  UploadIcon,
  DownloadIcon,
  ChevronDownIcon,
} from "lucide-react";
import { BillingKPIsCards } from "@/viamentor/components/viamentor-billing-kpis-cards";
import { BillingQuickStatsSection } from "@/viamentor/components/viamentor-billing-quick-stats";
import { BillingInvoicesPreview } from "@/viamentor/components/viamentor-billing-invoices-preview";
import {
  type BillingLocale,
  billingTranslations,
} from "@/viamentor/data/viamentor-billing-i18n";
import {
  mockBillingKPIs,
  mockRevenueData,
  mockActionsRequired,
  mockUpcomingDues,
  mockRevenueByCategoryData,
  mockProductTypeData,
  mockTopProducts,
  mockPaymentMethodStats,
  mockReminderStats,
  mockInvoicesPreview,
} from "@/viamentor/data/viamentor-billing-data";

interface BillingDashboardPageProps {
  locale?: BillingLocale;
}

export function BillingDashboardPage({
  locale = "fr",
}: BillingDashboardPageProps) {
  const t = billingTranslations[locale];
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [isCollectPaymentOpen, setIsCollectPaymentOpen] = useState(false);
  const [isImportCamtOpen, setIsImportCamtOpen] = useState(false);

  const handleNewInvoice = () => {
    setIsNewInvoiceOpen(true);
    console.log("Open new invoice wizard");
  };

  const handleCollectPayment = () => {
    setIsCollectPaymentOpen(true);
    console.log("Open collect payment modal");
  };

  const handleImportCamt = () => {
    setIsImportCamtOpen(true);
    console.log("Open import Camt.054 modal");
  };

  const handleExportExcel = () => {
    console.log("Export to Excel");
  };

  const handleExportPDF = () => {
    console.log("Export to PDF");
  };

  const handleViewInvoice = (invoice: any) => {
    console.log("View invoice:", invoice.number);
  };

  const handleEditInvoice = (invoice: any) => {
    console.log("Edit invoice:", invoice.number);
  };

  const handleSendInvoice = (invoice: any) => {
    console.log("Send invoice:", invoice.number);
  };

  const handleDownloadInvoice = (invoice: any) => {
    console.log("Download invoice:", invoice.number);
  };

  const handleViewAllInvoices = () => {
    console.log("Navigate to invoices page");
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-muted-foreground">{t.breadcrumb}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={handleNewInvoice}>
            <PlusIcon className="mr-2 h-4 w-4" />

            {t.actions.newInvoice}
          </Button>
          <Button variant="outline" onClick={handleCollectPayment}>
            <WalletIcon className="mr-2 h-4 w-4" />

            {t.actions.collectPayment}
          </Button>
          <Button variant="outline" onClick={handleImportCamt}>
            <UploadIcon className="mr-2 h-4 w-4" />

            {t.actions.importCamt}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <DownloadIcon className="mr-2 h-4 w-4" />

                {t.actions.export}
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportExcel}>
                {t.actions.exportExcel}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportPDF}>
                {t.actions.exportPDF}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* KPIs Cards */}
      <BillingKPIsCards kpis={mockBillingKPIs} locale={locale} />

      {/* Quick Stats Section with Tabs */}
      <BillingQuickStatsSection
        locale={locale}
        revenueData={mockRevenueData}
        actionsRequired={mockActionsRequired}
        upcomingDues={mockUpcomingDues}
        revenueByCategoryData={mockRevenueByCategoryData}
        productTypeData={mockProductTypeData}
        topProducts={mockTopProducts}
        paymentMethodStats={mockPaymentMethodStats}
        reminderStats={mockReminderStats}
      />

      {/* Invoices Preview List */}
      <BillingInvoicesPreview
        locale={locale}
        invoices={mockInvoicesPreview}
        onView={handleViewInvoice}
        onEdit={handleEditInvoice}
        onSend={handleSendInvoice}
        onDownload={handleDownloadInvoice}
        onViewAll={handleViewAllInvoices}
      />
    </div>
  );
}
