/**
 * VIAMENTOR - Invoices List DataTable
 * DataTable optimisée avec pagination 50/page, colonnes triables, actions inline
 */

"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EyeIcon,
  EditIcon,
  MailIcon,
  DownloadIcon,
  CreditCardIcon,
  CopyIcon,
  XCircleIcon,
  TrashIcon,
  MoreVerticalIcon,
  ArrowUpDownIcon,
  BanknoteIcon,
} from "lucide-react";
import type { InvoiceListItem } from "@/viamentor/data/viamentor-invoices-list-data";
import type { InvoiceStatus } from "@/viamentor/data/viamentor-invoices-data";
import type { InvoiceLocale } from "@/viamentor/data/viamentor-invoices-i18n";
import { INVOICE_TRANSLATIONS } from "@/viamentor/data/viamentor-invoices-i18n";

export interface InvoicesListTableProps {
  invoices: InvoiceListItem[];
  selectedIds: string[];
  locale?: InvoiceLocale;
  onSelectAll?: (selected: boolean) => void;
  onSelectOne?: (id: string, selected: boolean) => void;
  onSort?: (column: string) => void;
  onStatusChange?: (id: string, status: InvoiceStatus) => void;
  onView?: (invoice: InvoiceListItem) => void;
  onEdit?: (invoice: InvoiceListItem) => void;
  onSend?: (invoice: InvoiceListItem) => void;
  onDownload?: (invoice: InvoiceListItem) => void;
  onRecordPayment?: (invoice: InvoiceListItem) => void;
  onDuplicate?: (invoice: InvoiceListItem) => void;
  onVoid?: (invoice: InvoiceListItem) => void;
  onDelete?: (invoice: InvoiceListItem) => void;
}

export function InvoicesListTable({
  invoices,
  selectedIds,
  locale = "fr",
  onSelectAll,
  onSelectOne,
  onSort,
  onStatusChange,
  onView,
  onEdit,
  onSend,
  onDownload,
  onRecordPayment,
  onDuplicate,
  onVoid,
  onDelete,
}: InvoicesListTableProps) {
  const t = INVOICE_TRANSLATIONS[locale];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInvoices = invoices.slice(startIndex, endIndex);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    if (locale === "en") return `${month}/${day}/${year}`;
    return `${day}.${month}.${year}`;
  };

  const getStatusBadge = (status: InvoiceStatus) => {
    const variants = {
      Draft: "secondary",
      Sent: "outline",
      Paid: "default",
      Overdue: "destructive",
      Void: "secondary",
    } as const;

    const labels = {
      Draft: t.statusDraft,
      Sent: t.statusSent,
      Paid: t.statusPaid,
      Overdue: t.statusOverdue,
      Void: t.statusVoid,
    };

    return (
      <Badge
        variant={variants[status]}
        className={status === "Paid" ? "bg-green-500 dark:bg-green-600" : ""}
      >
        {labels[status]}
      </Badge>
    );
  };

  const getDueBadge = (invoice: InvoiceListItem) => {
    if (invoice.status === "Paid" || invoice.status === "Void") return null;

    if (invoice.daysOverdue && invoice.daysOverdue > 0) {
      return (
        <Badge variant="destructive" className="ml-2">
          +{invoice.daysOverdue}j
        </Badge>
      );
    }

    if (invoice.daysUntilDue && invoice.daysUntilDue <= 7) {
      return (
        <Badge
          variant="outline"
          className="ml-2 bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
        >
          J-{invoice.daysUntilDue}
        </Badge>
      );
    }

    return null;
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "Card":
        return <CreditCardIcon className="h-4 w-4" />;

      case "Bank Transfer":
      case "SEPA":
        return <BanknoteIcon className="h-4 w-4" />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedIds.length === invoices.length &&
                    invoices.length > 0
                  }
                  onCheckedChange={(checked) =>
                    onSelectAll?.(checked as boolean)
                  }
                />
              </TableHead>
              <TableHead className="min-w-[140px]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort?.("invoiceNumber")}
                  className="gap-1 -ml-3"
                >
                  {t.invoiceNumber}
                  <ArrowUpDownIcon className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="min-w-[120px]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort?.("issueDate")}
                  className="gap-1 -ml-3"
                >
                  {t.issueDate}
                  <ArrowUpDownIcon className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="min-w-[200px]">{t.tenant}</TableHead>
              <TableHead className="min-w-[100px] text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort?.("subtotal")}
                  className="gap-1 -ml-3"
                >
                  Montant HT
                  <ArrowUpDownIcon className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="min-w-[100px] text-right">
                TVA 8.1%
              </TableHead>
              <TableHead className="min-w-[120px] text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort?.("total")}
                  className="gap-1 -ml-3"
                >
                  {t.totalTTC}
                  <ArrowUpDownIcon className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="min-w-[140px]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSort?.("dueDate")}
                  className="gap-1 -ml-3"
                >
                  {t.dueDate}
                  <ArrowUpDownIcon className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="min-w-[140px]">{t.status}</TableHead>
              <TableHead className="min-w-[120px]">{t.paymentMethod}</TableHead>
              <TableHead className="min-w-[120px] text-right">
                Solde restant
              </TableHead>
              <TableHead className="w-12">{t.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedInvoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(invoice.id)}
                    onCheckedChange={(checked) =>
                      onSelectOne?.(invoice.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    onClick={() => onView?.(invoice)}
                    className="font-semibold text-primary p-0 h-auto"
                  >
                    {invoice.invoiceNumber}
                  </Button>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(invoice.issueDate)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={invoice.student.avatar}
                        alt={invoice.student.firstName}
                      />

                      <AvatarFallback>
                        {invoice.student.firstName[0]}
                        {invoice.student.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {invoice.student.firstName} {invoice.student.lastName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {invoice.student.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatCurrency(invoice.subtotal)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatCurrency(invoice.vatAmount)}
                </TableCell>
                <TableCell className="text-right font-semibold text-foreground">
                  {formatCurrency(invoice.total)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="text-muted-foreground">
                      {formatDate(invoice.dueDate)}
                    </span>
                    {getDueBadge(invoice)}
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={invoice.status}
                    onValueChange={(value) =>
                      onStatusChange?.(invoice.id, value as InvoiceStatus)
                    }
                    disabled={invoice.status === "Paid"}
                  >
                    <SelectTrigger className="w-[130px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">{t.statusDraft}</SelectItem>
                      <SelectItem value="Sent">{t.statusSent}</SelectItem>
                      <SelectItem value="Paid">{t.statusPaid}</SelectItem>
                      <SelectItem value="Overdue">{t.statusOverdue}</SelectItem>
                      <SelectItem value="Void">{t.statusVoid}</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {invoice.status === "Paid" ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getPaymentMethodIcon(invoice.paymentMethod)}
                      <span>{invoice.paymentMethod}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={
                      invoice.remainingBalance > 0 ? "outline" : "default"
                    }
                    className={
                      invoice.remainingBalance === 0
                        ? "bg-green-500 dark:bg-green-600"
                        : "bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                    }
                  >
                    {formatCurrency(invoice.remainingBalance)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onView?.(invoice)}>
                        <EyeIcon className="h-4 w-4 mr-2" />

                        {t.viewPDF}
                      </DropdownMenuItem>
                      {invoice.status === "Draft" && (
                        <DropdownMenuItem onClick={() => onEdit?.(invoice)}>
                          <EditIcon className="h-4 w-4 mr-2" />

                          {t.editInvoice}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => onSend?.(invoice)}>
                        <MailIcon className="h-4 w-4 mr-2" />

                        {t.sendEmail}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDownload?.(invoice)}>
                        <DownloadIcon className="h-4 w-4 mr-2" />

                        {t.download}
                      </DropdownMenuItem>
                      {invoice.status !== "Paid" &&
                        invoice.status !== "Void" && (
                          <DropdownMenuItem
                            onClick={() => onRecordPayment?.(invoice)}
                          >
                            <CreditCardIcon className="h-4 w-4 mr-2" />

                            {t.markAsPaid}
                          </DropdownMenuItem>
                        )}
                      <DropdownMenuItem onClick={() => onDuplicate?.(invoice)}>
                        <CopyIcon className="h-4 w-4 mr-2" />

                        {t.duplicateInvoice}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

                      {invoice.status !== "Void" && (
                        <DropdownMenuItem
                          onClick={() => onVoid?.(invoice)}
                          className="text-orange-600 dark:text-orange-400"
                        >
                          <XCircleIcon className="h-4 w-4 mr-2" />

                          {t.voidInvoice}
                        </DropdownMenuItem>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="md:hidden space-y-4">
        {paginatedInvoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardContent className="p-4 space-y-3">
              {/* Header with checkbox and invoice number */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedIds.includes(invoice.id)}
                    onCheckedChange={(checked) =>
                      onSelectOne?.(invoice.id, checked as boolean)
                    }
                  />

                  <Button
                    variant="link"
                    onClick={() => onView?.(invoice)}
                    className="font-semibold text-primary p-0 h-auto"
                  >
                    {invoice.invoiceNumber}
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVerticalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView?.(invoice)}>
                      <EyeIcon className="h-4 w-4 mr-2" />

                      {t.viewPDF}
                    </DropdownMenuItem>
                    {invoice.status === "Draft" && (
                      <DropdownMenuItem onClick={() => onEdit?.(invoice)}>
                        <EditIcon className="h-4 w-4 mr-2" />

                        {t.editInvoice}
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => onSend?.(invoice)}>
                      <MailIcon className="h-4 w-4 mr-2" />

                      {t.sendEmail}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDownload?.(invoice)}>
                      <DownloadIcon className="h-4 w-4 mr-2" />

                      {t.download}
                    </DropdownMenuItem>
                    {invoice.status !== "Paid" && invoice.status !== "Void" && (
                      <DropdownMenuItem
                        onClick={() => onRecordPayment?.(invoice)}
                      >
                        <CreditCardIcon className="h-4 w-4 mr-2" />

                        {t.markAsPaid}
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => onDuplicate?.(invoice)}>
                      <CopyIcon className="h-4 w-4 mr-2" />

                      {t.duplicateInvoice}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    {invoice.status !== "Void" && (
                      <DropdownMenuItem
                        onClick={() => onVoid?.(invoice)}
                        className="text-orange-600 dark:text-orange-400"
                      >
                        <XCircleIcon className="h-4 w-4 mr-2" />

                        {t.voidInvoice}
                      </DropdownMenuItem>
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

              {/* Student info */}
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={invoice.student.avatar}
                    alt={invoice.student.firstName}
                  />

                  <AvatarFallback>
                    {invoice.student.firstName[0]}
                    {invoice.student.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {invoice.student.firstName} {invoice.student.lastName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {invoice.student.email}
                  </span>
                </div>
              </div>

              {/* Amounts */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Montant HT</p>
                  <p className="font-semibold">
                    {formatCurrency(invoice.subtotal)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">TVA 8.1%</p>
                  <p className="font-semibold">
                    {formatCurrency(invoice.vatAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t.totalTTC}</p>
                  <p className="font-bold text-lg">
                    {formatCurrency(invoice.total)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Solde restant</p>
                  <Badge
                    variant={
                      invoice.remainingBalance > 0 ? "outline" : "default"
                    }
                    className={
                      invoice.remainingBalance === 0
                        ? "bg-green-500 dark:bg-green-600"
                        : "bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                    }
                  >
                    {formatCurrency(invoice.remainingBalance)}
                  </Badge>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">{t.issueDate}</p>
                  <p>{formatDate(invoice.issueDate)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">{t.dueDate}</p>
                  <div className="flex items-center gap-1">
                    <span>{formatDate(invoice.dueDate)}</span>
                    {getDueBadge(invoice)}
                  </div>
                </div>
              </div>

              {/* Status and Payment Method */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {t.status}
                  </p>
                  <Select
                    value={invoice.status}
                    onValueChange={(value) =>
                      onStatusChange?.(invoice.id, value as InvoiceStatus)
                    }
                    disabled={invoice.status === "Paid"}
                  >
                    <SelectTrigger className="w-[130px] h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">{t.statusDraft}</SelectItem>
                      <SelectItem value="Sent">{t.statusSent}</SelectItem>
                      <SelectItem value="Paid">{t.statusPaid}</SelectItem>
                      <SelectItem value="Overdue">{t.statusOverdue}</SelectItem>
                      <SelectItem value="Void">{t.statusVoid}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {t.paymentMethod}
                  </p>
                  {invoice.status === "Paid" ? (
                    <div className="flex items-center gap-2 text-sm">
                      {getPaymentMethodIcon(invoice.paymentMethod)}
                      <span>{invoice.paymentMethod}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
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
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}
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
    </div>
  );
}
