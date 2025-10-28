/**
 * VIAMENTOR - Invoices List Page
 * Page principale liste factures complète avec DataTable, filtres, bulk actions
 */

"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PlusIcon,
  SearchIcon,
  DownloadIcon,
  LayoutGridIcon,
  LayoutListIcon,
} from "lucide-react";
import { InvoicesListStats } from "@/viamentor/components/viamentor-invoices-list-stats";
import { InvoicesListFilters } from "@/viamentor/components/viamentor-invoices-list-filters";
import { InvoicesListTable } from "@/viamentor/components/viamentor-invoices-list-table";
import { InvoicesListCards } from "@/viamentor/components/viamentor-invoices-list-cards";
import { InvoicesBulkActions } from "@/viamentor/components/viamentor-invoices-list-bulk-actions";
import {
  MOCK_INVOICES_LIST,
  MOCK_FILTER_PRESETS,
  calculateInvoiceListStats,
  type InvoiceListItem,
} from "@/viamentor/data/viamentor-invoices-list-data";
import type { InvoiceStatus } from "@/viamentor/data/viamentor-invoices-data";
import type { InvoiceLocale } from "@/viamentor/data/viamentor-invoices-i18n";
import { INVOICE_TRANSLATIONS } from "@/viamentor/data/viamentor-invoices-i18n";
import { useInvoicesQueryParams } from "@/viamentor/data/viamentor-url-query-params";

export interface InvoicesListPageProps {
  locale?: InvoiceLocale;
}

export function InvoicesListPage({ locale = "fr" }: InvoicesListPageProps) {
  const t = INVOICE_TRANSLATIONS[locale];

  // Use query params hook
  const {
    view,
    setView,
    displayMode,
    setDisplayMode,
    search: searchParam,
    setSearch: setSearchParam,
  } = useInvoicesQueryParams();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParam || "");

  // Filter invoices based on view (quick filter)
  const filteredInvoices = useMemo(() => {
    let filtered = MOCK_INVOICES_LIST;

    switch (view) {
      case "unpaid":
        filtered = filtered.filter(
          (inv) => inv.status === "sent" || inv.status === "overdue"
        );
        break;
      case "paid":
        filtered = filtered.filter((inv) => inv.status === "paid");
        break;
      case "overdue":
        filtered = filtered.filter((inv) => inv.status === "overdue");
        break;
      case "draft":
        filtered = filtered.filter((inv) => inv.status === "draft");
        break;
      case "all":
      default:
        // No filter
        break;
    }

    return filtered;
  }, [view]);

  // Sync search query with URL
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== searchParam) {
        setSearchParam(searchQuery);
      }
    }, 500); // Debounce
    return () => clearTimeout(timer);
  }, [searchQuery, searchParam, setSearchParam]);

  const stats = calculateInvoiceListStats(MOCK_INVOICES_LIST);
  const selectedInvoices = filteredInvoices.filter((inv) =>
    selectedIds.includes(inv.id)
  );
  const selectedTotalAmount = selectedInvoices.reduce(
    (sum, inv) => sum + inv.total,
    0
  );

  const handleSelectAll = (selected: boolean) => {
    setSelectedIds(selected ? filteredInvoices.map((inv) => inv.id) : []);
  };

  const handleSelectOne = (id: string, selected: boolean) => {
    setSelectedIds((prev) =>
      selected ? [...prev, id] : prev.filter((i) => i !== id)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-6 pb-24">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <span>Facturation</span>
            <span>/</span>
            <span className="text-foreground font-medium">
              Toutes les factures
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Toutes les factures
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Gérez et suivez toutes les factures de la plateforme
              </p>
            </div>
            <Button className="gap-2 min-h-[44px] w-full sm:w-auto">
              <PlusIcon className="h-4 w-4" />
              Nouvelle facture
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <InvoicesListStats stats={stats} locale={locale} />

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />

            <Input
              placeholder="Rechercher #, élève, montant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 pl-10 bg-background border-border focus-visible:ring-2"
              aria-label="Rechercher une facture"
            />
          </div>

          {/* Filters */}
          <InvoicesListFilters
            locale={locale}
            presets={MOCK_FILTER_PRESETS}
            onApply={(filters) => console.log("Apply filters:", filters)}
            onReset={() => console.log("Reset filters")}
            onSavePreset={(name, filters) =>
              console.log("Save preset:", name, filters)
            }
          />

          {/* View Toggle */}
          <div className="flex items-center gap-1 border border-border rounded-lg p-1 bg-muted/50">
            <Button
              variant={displayMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setDisplayMode("table")}
              className="min-h-[44px] px-4"
              aria-label="Vue tableau"
            >
              <LayoutListIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={displayMode === "cards" ? "default" : "ghost"}
              size="sm"
              onClick={() => setDisplayMode("cards")}
              className="min-h-[44px] px-4"
              aria-label="Vue cartes"
            >
              <LayoutGridIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Export */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 min-h-[44px] border-border"
              >
                <DownloadIcon className="h-4 w-4" />
                Exporter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Excel (.xlsx)
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DownloadIcon className="h-4 w-4 mr-2" />
                CSV (.csv)
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DownloadIcon className="h-4 w-4 mr-2" />
                PDF (.pdf)
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Format comptabilité
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <span className="text-xs sm:text-sm font-medium text-muted-foreground">
            Filtres rapides:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={view === "draft" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("draft")}
              className="min-h-[44px] border-border"
            >
              Brouillons
              <Badge variant="secondary" className="ml-2">
                {stats.draftCount}
              </Badge>
            </Button>
            <Button
              variant={view === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("all")}
              className="min-h-[44px] border-border"
            >
              Toutes
            </Button>
            <Button
              variant={view === "overdue" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("overdue")}
              className="min-h-[44px] border-border"
            >
              Échues
              <Badge variant="destructive" className="ml-2">
                {stats.overdueCount}
              </Badge>
            </Button>
            <Button
              variant={view === "paid" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("paid")}
              className="min-h-[44px] border-border"
            >
              Payées
            </Button>
            <Button
              variant={view === "unpaid" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("unpaid")}
              className="min-h-[44px] border-border"
            >
              Impayées
              <Badge variant="secondary" className="ml-2">
                {stats.unpaidCount}
              </Badge>
            </Button>
          </div>
        </div>

        {/* Content */}
        {displayMode === "table" ? (
          <InvoicesListTable
            invoices={filteredInvoices}
            selectedIds={selectedIds}
            locale={locale}
            onSelectAll={handleSelectAll}
            onSelectOne={handleSelectOne}
            onSort={(column) => console.log("Sort by:", column)}
            onStatusChange={(id, status) =>
              console.log("Change status:", id, status)
            }
            onView={(invoice) => console.log("View:", invoice.invoiceNumber)}
            onEdit={(invoice) => console.log("Edit:", invoice.invoiceNumber)}
            onSend={(invoice) => console.log("Send:", invoice.invoiceNumber)}
            onDownload={(invoice) =>
              console.log("Download:", invoice.invoiceNumber)
            }
            onRecordPayment={(invoice) =>
              console.log("Record payment:", invoice.invoiceNumber)
            }
            onDuplicate={(invoice) =>
              console.log("Duplicate:", invoice.invoiceNumber)
            }
            onVoid={(invoice) => console.log("Void:", invoice.invoiceNumber)}
            onDelete={(invoice) =>
              console.log("Delete:", invoice.invoiceNumber)
            }
          />
        ) : (
          <InvoicesListCards
            invoices={filteredInvoices}
            locale={locale}
            onView={(invoice) => console.log("View:", invoice.invoiceNumber)}
            onEdit={(invoice) => console.log("Edit:", invoice.invoiceNumber)}
            onSend={(invoice) => console.log("Send:", invoice.invoiceNumber)}
            onDownload={(invoice) =>
              console.log("Download:", invoice.invoiceNumber)
            }
          />
        )}

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Affichage de 1 à {filteredInvoices.length} sur {stats.totalInvoices}{" "}
            factures
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled
              className="min-h-[44px] border-border"
              aria-label="Page précédente"
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="min-h-[44px] border-border"
              aria-label="Page 1"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="min-h-[44px] border-border"
              aria-label="Page suivante"
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <InvoicesBulkActions
        selectedCount={selectedIds.length}
        totalAmount={selectedTotalAmount}
        locale={locale}
        onSendEmails={() => console.log("Send emails")}
        onDownloadPDFs={() => console.log("Download PDFs")}
        onMarkAsPaid={() => console.log("Mark as paid")}
        onCreateCreditNotes={() => console.log("Create credit notes")}
        onExport={() => console.log("Export")}
        onSendReminders={() => console.log("Send reminders")}
        onDelete={() => console.log("Delete")}
        onClearSelection={() => setSelectedIds([])}
      />
    </div>
  );
}
