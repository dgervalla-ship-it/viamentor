/**
 * VIAMENTOR Invoices Table
 *
 * DataTable toutes invoices plateforme avec:
 * - Filtres avancés (status, tenant, payment method, dates)
 * - Tri colonnes
 * - Pagination server-side 100/page
 * - Bulk actions (send reminders, export PDF, mark as paid)
 * - Countdown badges (<7j orange, overdue rouge)
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Invoice,
  InvoiceStatus,
  PaymentMethodType,
  getDaysUntilDue,
  getDaysOverdue,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DownloadIcon,
  MailIcon,
  CheckCircle2Icon,
  XCircleIcon,
  TrashIcon,
  MoreVerticalIcon,
  FilterIcon,
  ChevronDownIcon,
  ClockIcon,
  AlertCircleIcon,
  FileTextIcon,
  CreditCardIcon,
  BanknoteIcon,
  WalletIcon,
} from "lucide-react";

interface InvoicesTableProps {
  invoices: Invoice[];
  locale?: InvoiceLocale;
  onViewDetail?: (invoice: Invoice) => void;
  onSendEmail?: (invoice: Invoice) => void;
  onMarkAsPaid?: (invoice: Invoice) => void;
  onVoid?: (invoice: Invoice) => void;
  onDelete?: (invoice: Invoice) => void;
  onBulkSendReminders?: (invoiceIds: string[]) => void;
  onBulkExportPDF?: (invoiceIds: string[]) => void;
  onBulkMarkAsPaid?: (invoiceIds: string[]) => void;
}

export function InvoicesTable({
  invoices,
  locale = "fr",
  onViewDetail,
  onSendEmail,
  onMarkAsPaid,
  onVoid,
  onDelete,
  onBulkSendReminders,
  onBulkExportPDF,
  onBulkMarkAsPaid,
}: InvoicesTableProps) {
  const t = useInvoiceTranslations(locale);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "all">(
    "all"
  );
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<
    PaymentMethodType | "all"
  >("all");
  const [showVoided, setShowVoided] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and paginate invoices
  const filteredInvoices = invoices.filter((inv) => {
    if (!showVoided && inv.status === "Void") return false;
    if (statusFilter !== "all" && inv.status !== statusFilter) return false;
    if (
      paymentMethodFilter !== "all" &&
      inv.paymentMethod !== paymentMethodFilter
    )
      return false;
    if (
      searchQuery &&
      !inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !inv.tenantName.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredInvoices.slice(0, 50).map((inv) => inv.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    }
  };

  const getPaymentMethodIcon = (method: PaymentMethodType) => {
    switch (method) {
      case "Card":
        return <CreditCardIcon className="h-4 w-4" />;

      case "Bank Transfer":
        return <BanknoteIcon className="h-4 w-4" />;

      case "SEPA":
        return <BanknoteIcon className="h-4 w-4" />;

      case "Cash":
        return <WalletIcon className="h-4 w-4" />;

      case "Invoice":
        return <FileTextIcon className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: InvoiceStatus) => {
    const variants = {
      Draft: "outline" as const,
      Sent: "secondary" as const,
      Paid: "default" as const,
      Overdue: "destructive" as const,
      Void: "outline" as const,
    };

    const labels = {
      Draft: t.statusDraft,
      Sent: t.statusSent,
      Paid: t.statusPaid,
      Overdue: t.statusOverdue,
      Void: t.statusVoid,
    };

    return (
      <Badge variant={variants[status]}>
        {status === "Paid" && <CheckCircle2Icon className="h-3 w-3 mr-1" />}
        {status === "Overdue" && <AlertCircleIcon className="h-3 w-3 mr-1" />}
        {labels[status]}
      </Badge>
    );
  };

  const getDueDateBadge = (invoice: Invoice) => {
    if (invoice.status === "Paid" || invoice.status === "Void") return null;

    const daysUntil = getDaysUntilDue(invoice.dueDate);
    const daysOver = getDaysOverdue(invoice.dueDate);

    if (invoice.status === "Overdue") {
      return (
        <Badge variant="destructive">
          {t.overdueBy} {daysOver}j
        </Badge>
      );
    }

    if (daysUntil <= 7 && daysUntil > 0) {
      return (
        <Badge
          variant="secondary"
          className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
        >
          <ClockIcon className="h-3 w-3 mr-1" />

          {t.daysUntilDue}
          {daysUntil}
        </Badge>
      );
    }

    return null;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t.pageTitle}</CardTitle>
              <CardDescription>
                {filteredInvoices.length}{" "}
                {filteredInvoices.length === 1 ? "facture" : "factures"}
              </CardDescription>
            </div>
            <Button>
              <FileTextIcon className="h-4 w-4 mr-2" />

              {t.newInvoice}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
            <div className="flex items-center gap-2">
              <Input
                placeholder={t.searchInvoice}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />

              <CollapsibleTrigger asChild>
                <Button variant="outline" size="sm">
                  <FilterIcon className="h-4 w-4 mr-2" />

                  {t.filters}
                  <ChevronDownIcon className="h-4 w-4 ml-2" />
                </Button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="mt-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Select
                  value={statusFilter}
                  onValueChange={(v) =>
                    setStatusFilter(v as InvoiceStatus | "all")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.filterByStatus} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="Draft">{t.statusDraft}</SelectItem>
                    <SelectItem value="Sent">{t.statusSent}</SelectItem>
                    <SelectItem value="Paid">{t.statusPaid}</SelectItem>
                    <SelectItem value="Overdue">{t.statusOverdue}</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={paymentMethodFilter}
                  onValueChange={(v) =>
                    setPaymentMethodFilter(v as PaymentMethodType | "all")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t.filterByPaymentMethod} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les modes</SelectItem>
                    <SelectItem value="Card">{t.paymentCard}</SelectItem>
                    <SelectItem value="Bank Transfer">
                      {t.paymentBankTransfer}
                    </SelectItem>
                    <SelectItem value="SEPA">{t.paymentSEPA}</SelectItem>
                    <SelectItem value="Cash">{t.paymentCash}</SelectItem>
                    <SelectItem value="Invoice">{t.paymentInvoice}</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="show-voided"
                    checked={showVoided}
                    onCheckedChange={(checked) =>
                      setShowVoided(checked as boolean)
                    }
                  />

                  <label
                    htmlFor="show-voided"
                    className="text-sm cursor-pointer"
                  >
                    {t.showVoided}
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setPaymentMethodFilter("all");
                    setShowVoided(false);
                  }}
                >
                  {t.resetFilters}
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Bulk Actions Bar */}
          {selectedIds.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm font-medium">
                {selectedIds.length} {t.selectedItems}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onBulkSendReminders?.(selectedIds)}
                >
                  <MailIcon className="h-4 w-4 mr-2" />

                  {t.sendReminders}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onBulkExportPDF?.(selectedIds)}
                >
                  <DownloadIcon className="h-4 w-4 mr-2" />

                  {t.exportPDF}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onBulkMarkAsPaid?.(selectedIds)}
                >
                  <CheckCircle2Icon className="h-4 w-4 mr-2" />

                  {t.markAsPaidBulk}
                </Button>
              </div>
            </div>
          )}

          {/* Desktop Table */}
          <div className="hidden md:block border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-3 text-left">
                      <Checkbox
                        checked={
                          selectedIds.length ===
                            Math.min(50, filteredInvoices.length) &&
                          filteredInvoices.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="p-3 text-left text-sm font-medium">
                      {t.invoiceNumber}
                    </th>
                    <th className="p-3 text-left text-sm font-medium">
                      {t.tenant}
                    </th>
                    <th className="p-3 text-left text-sm font-medium">
                      {t.issueDate}
                    </th>
                    <th className="p-3 text-left text-sm font-medium">
                      {t.dueDate}
                    </th>
                    <th className="p-3 text-left text-sm font-medium">
                      {t.amount}
                    </th>
                    <th className="p-3 text-left text-sm font-medium">
                      {t.status}
                    </th>
                    <th className="p-3 text-left text-sm font-medium">
                      {t.paymentMethod}
                    </th>
                    <th className="p-3 text-left text-sm font-medium">
                      {t.actions}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-t border-border hover:bg-muted/50"
                    >
                      <td className="p-3">
                        <Checkbox
                          checked={selectedIds.includes(invoice.id)}
                          onCheckedChange={(checked) =>
                            handleSelectOne(invoice.id, checked as boolean)
                          }
                        />
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => onViewDetail?.(invoice)}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          {invoice.invoiceNumber}
                        </button>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            {invoice.tenantLogo && (
                              <AvatarImage src={invoice.tenantLogo} />
                            )}
                            <AvatarFallback>
                              {invoice.tenantName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <Link
                            to={`/tenants/${invoice.tenantId}`}
                            className="text-sm hover:underline"
                          >
                            {invoice.tenantName}
                          </Link>
                        </div>
                      </td>
                      <td className="p-3 text-sm">
                        {new Date(invoice.issueDate).toLocaleDateString(
                          locale === "fr"
                            ? "fr-CH"
                            : locale === "de"
                              ? "de-CH"
                              : locale === "it"
                                ? "it-CH"
                                : "en-CH"
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm">
                            {new Date(invoice.dueDate).toLocaleDateString(
                              locale === "fr"
                                ? "fr-CH"
                                : locale === "de"
                                  ? "de-CH"
                                  : locale === "it"
                                    ? "it-CH"
                                    : "en-CH"
                            )}
                          </span>
                          {getDueDateBadge(invoice)}
                        </div>
                      </td>
                      <td className="p-3 text-sm font-medium">
                        {formatCurrency(invoice.total, locale)}
                      </td>
                      <td className="p-3">{getStatusBadge(invoice.status)}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2 text-sm">
                          {getPaymentMethodIcon(invoice.paymentMethod)}
                          <span className="text-xs text-muted-foreground">
                            {invoice.paymentMethod === "Card"
                              ? t.paymentCard
                              : invoice.paymentMethod === "Bank Transfer"
                                ? t.paymentBankTransfer
                                : invoice.paymentMethod === "SEPA"
                                  ? t.paymentSEPA
                                  : invoice.paymentMethod === "Cash"
                                    ? t.paymentCash
                                    : t.paymentInvoice}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVerticalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onViewDetail?.(invoice)}
                            >
                              <FileTextIcon className="h-4 w-4 mr-2" />

                              {t.viewPDF}
                            </DropdownMenuItem>
                            {invoice.status !== "Paid" &&
                              invoice.status !== "Void" && (
                                <>
                                  <DropdownMenuItem
                                    onClick={() => onSendEmail?.(invoice)}
                                  >
                                    <MailIcon className="h-4 w-4 mr-2" />

                                    {t.sendReminder}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => onMarkAsPaid?.(invoice)}
                                  >
                                    <CheckCircle2Icon className="h-4 w-4 mr-2" />

                                    {t.markAsPaid}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => onVoid?.(invoice)}
                                  >
                                    <XCircleIcon className="h-4 w-4 mr-2" />

                                    {t.voidInvoice}
                                  </DropdownMenuItem>
                                </>
                              )}
                            {invoice.status === "Draft" && (
                              <DropdownMenuItem
                                onClick={() => onDelete?.(invoice)}
                                className="text-destructive"
                              >
                                <TrashIcon className="h-4 w-4 mr-2" />

                                {t.delete}
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="md:hidden space-y-4">
            {paginatedInvoices.map((invoice) => (
              <Card key={invoice.id}>
                <CardContent className="p-4 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        {invoice.tenantLogo && (
                          <AvatarImage src={invoice.tenantLogo} />
                        )}
                        <AvatarFallback>{invoice.tenantName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Link
                          to={`/tenants/${invoice.tenantId}`}
                          className="font-medium hover:underline"
                        >
                          {invoice.tenantName}
                        </Link>
                        <button
                          onClick={() => onViewDetail?.(invoice)}
                          className="text-sm text-primary hover:underline block"
                        >
                          {invoice.invoiceNumber}
                        </button>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onViewDetail?.(invoice)}
                        >
                          <FileTextIcon className="h-4 w-4 mr-2" />

                          {t.viewPDF}
                        </DropdownMenuItem>
                        {invoice.status !== "Paid" &&
                          invoice.status !== "Void" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => onSendEmail?.(invoice)}
                              >
                                <MailIcon className="h-4 w-4 mr-2" />

                                {t.sendReminder}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onMarkAsPaid?.(invoice)}
                              >
                                <CheckCircle2Icon className="h-4 w-4 mr-2" />

                                {t.markAsPaid}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => onVoid?.(invoice)}
                              >
                                <XCircleIcon className="h-4 w-4 mr-2" />

                                {t.voidInvoice}
                              </DropdownMenuItem>
                            </>
                          )}
                        {invoice.status === "Draft" && (
                          <DropdownMenuItem
                            onClick={() => onDelete?.(invoice)}
                            className="text-destructive"
                          >
                            <TrashIcon className="h-4 w-4 mr-2" />

                            {t.delete}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Amount and Status */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t.amount}
                      </p>
                      <p className="text-xl font-bold">
                        {formatCurrency(invoice.total, locale)}
                      </p>
                    </div>
                    {getStatusBadge(invoice.status)}
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">{t.issueDate}</p>
                      <p>
                        {new Date(invoice.issueDate).toLocaleDateString(
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
                    <div>
                      <p className="text-muted-foreground">{t.dueDate}</p>
                      <div className="flex flex-col gap-1">
                        <span>
                          {new Date(invoice.dueDate).toLocaleDateString(
                            locale === "fr"
                              ? "fr-CH"
                              : locale === "de"
                                ? "de-CH"
                                : locale === "it"
                                  ? "it-CH"
                                  : "en-CH"
                          )}
                        </span>
                        {getDueDateBadge(invoice)}
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">
                      {t.paymentMethod}:
                    </span>
                    {getPaymentMethodIcon(invoice.paymentMethod)}
                    <span>
                      {invoice.paymentMethod === "Card"
                        ? t.paymentCard
                        : invoice.paymentMethod === "Bank Transfer"
                          ? t.paymentBankTransfer
                          : invoice.paymentMethod === "SEPA"
                            ? t.paymentSEPA
                            : invoice.paymentMethod === "Cash"
                              ? t.paymentCash
                              : t.paymentInvoice}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-12">
              <FileTextIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />

              <p className="text-muted-foreground">Aucune facture trouvée</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  }
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
