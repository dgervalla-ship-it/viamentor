/**
 * VIAMENTOR - Accounting Reports Tab
 * Tab rapports comptables avec exports
 */

"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileBarChart,
  ArrowUpDown,
  AlertCircle,
  FileX,
  CalendarIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";
import { fr, de, it, enUS } from "date-fns/locale";
import type {
  AccountingJournalEntry,
  VATReport,
} from "@/viamentor/data/viamentor-payments-data";
import type { PaymentsTranslations } from "@/viamentor/data/viamentor-payments-i18n";

type SortField = "date" | "student" | "amount" | "vatAmount";
type SortDirection = "asc" | "desc";

interface AccountingReportsTabProps {
  journalEntries: AccountingJournalEntry[];
  vatReport: VATReport;
  locale?: PaymentsTranslations;
  currency?: string;
  currencyLocale?: string;
  onExportJournal?: (format: "excel" | "csv" | "pdf", period: string) => void;
  onExportVAT?: (format: "excel" | "pdf", period: string) => void;
  onPeriodChange?: (period: string) => void;
}

export function AccountingReportsTab({
  journalEntries,
  vatReport,
  locale,
  currency = "CHF",
  currencyLocale = "fr-CH",
  onExportJournal,
  onExportVAT,
  onPeriodChange,
}: AccountingReportsTabProps) {
  const [period, setPeriod] = useState<string>("current_month");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [customDateRange, setCustomDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [tempDateRange, setTempDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);

  // Get date-fns locale
  const getDateLocale = () => {
    const lang = currencyLocale.split("-")[0];
    switch (lang) {
      case "fr":
        return fr;
      case "de":
        return de;
      case "it":
        return it;
      default:
        return enUS;
    }
  };

  // Get period label
  const getPeriodLabel = (periodValue: string) => {
    if (
      periodValue === "custom" &&
      customDateRange.from &&
      customDateRange.to
    ) {
      return `${format(customDateRange.from, "dd/MM/yyyy", { locale: getDateLocale() })} - ${format(customDateRange.to, "dd/MM/yyyy", { locale: getDateLocale() })}`;
    }

    const labels: Record<string, string> = {
      current_month:
        locale?.accounting.periods?.currentMonth || "Mois en cours",
      last_month: locale?.accounting.periods?.lastMonth || "Mois dernier",
      current_quarter:
        locale?.accounting.periods?.currentQuarter || "Trimestre en cours",
      last_quarter:
        locale?.accounting.periods?.lastQuarter || "Trimestre dernier",
      current_year: locale?.accounting.periods?.currentYear || "Année en cours",
      last_year: locale?.accounting.periods?.lastYear || "Année dernière",
      custom: locale?.accounting.periods?.custom || "Période personnalisée",
    };

    return labels[periodValue] || periodValue;
  };

  // Format currency helper
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(currencyLocale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Get account label helper
  const getAccountLabel = (accountNumber: string): string => {
    const labels = locale?.accounting.accountLabels || {
      "1020": "Banque",
      "1000": "Caisse",
      "1100": "Clients",
      "3200": "Revenus formations",
      "2200": "TVA due",
    };
    return labels[accountNumber] || "";
  };

  // Handle period change
  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
    if (newPeriod === "custom") {
      setTempDateRange({ from: customDateRange.from, to: customDateRange.to });
      setShowCustomDatePicker(true);
    } else {
      setShowCustomDatePicker(false);
      if (onPeriodChange) {
        onPeriodChange(newPeriod);
      }
    }
  };

  // Handle custom date range change (temporary selection)
  const handleTempDateRangeChange = (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    setTempDateRange(range);
  };

  // Handle custom date range validation
  const handleValidateDateRange = () => {
    if (tempDateRange.from && tempDateRange.to) {
      setCustomDateRange(tempDateRange);
      setShowCustomDatePicker(false);
      if (onPeriodChange) {
        onPeriodChange(
          `custom:${format(tempDateRange.from, "yyyy-MM-dd")}_${format(tempDateRange.to, "yyyy-MM-dd")}`
        );
      }
    }
  };

  // Handle cancel date range selection
  const handleCancelDateRange = () => {
    setTempDateRange({ from: customDateRange.from, to: customDateRange.to });
    setShowCustomDatePicker(false);
  };

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Filter entries by period
  const filterEntriesByPeriod = (
    entries: AccountingJournalEntry[],
    selectedPeriod: string,
    dateRange: { from: Date | undefined; to: Date | undefined }
  ): AccountingJournalEntry[] => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentQuarter = Math.floor(currentMonth / 3);

    let startDate: Date;
    let endDate: Date;

    switch (selectedPeriod) {
      case "current_month":
        startDate = new Date(currentYear, currentMonth, 1);
        endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);
        break;

      case "last_month":
        startDate = new Date(currentYear, currentMonth - 1, 1);
        endDate = new Date(currentYear, currentMonth, 0, 23, 59, 59);
        break;

      case "current_quarter":
        startDate = new Date(currentYear, currentQuarter * 3, 1);
        endDate = new Date(currentYear, currentQuarter * 3 + 3, 0, 23, 59, 59);
        break;

      case "last_quarter":
        const lastQuarter = currentQuarter - 1;
        const lastQuarterYear = lastQuarter < 0 ? currentYear - 1 : currentYear;
        const lastQuarterMonth = lastQuarter < 0 ? 9 : lastQuarter * 3;
        startDate = new Date(lastQuarterYear, lastQuarterMonth, 1);
        endDate = new Date(
          lastQuarterYear,
          lastQuarterMonth + 3,
          0,
          23,
          59,
          59
        );
        break;

      case "current_year":
        startDate = new Date(currentYear, 0, 1);
        endDate = new Date(currentYear, 11, 31, 23, 59, 59);
        break;

      case "last_year":
        startDate = new Date(currentYear - 1, 0, 1);
        endDate = new Date(currentYear - 1, 11, 31, 23, 59, 59);
        break;

      case "custom":
        if (!dateRange.from || !dateRange.to) {
          return entries; // Return all if custom range not set
        }
        startDate = new Date(dateRange.from);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(dateRange.to);
        endDate.setHours(23, 59, 59, 999);
        break;

      default:
        return entries; // Return all if unknown period
    }

    // Filter entries by date range
    return entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });
  };

  // Filtered journal entries by period
  const filteredJournalEntries = useMemo(() => {
    return filterEntriesByPeriod(journalEntries, period, customDateRange);
  }, [journalEntries, period, customDateRange]);

  // Sorted and filtered journal entries
  const sortedJournalEntries = useMemo(() => {
    const sorted = [...filteredJournalEntries].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "student":
          comparison = a.studentName.localeCompare(b.studentName);
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "vatAmount":
          comparison = (a.vatAmount || 0) - (b.vatAmount || 0);
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [filteredJournalEntries, sortField, sortDirection]);

  // Empty states
  const hasJournalEntries = sortedJournalEntries.length > 0;
  const hasVATBreakdown = vatReport.vatBreakdown.length > 0;

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="space-y-2 w-full sm:w-auto">
          <Label>{locale?.accounting.period || "Période"}</Label>
          <Select value={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-full sm:w-[280px]">
              <SelectValue>{getPeriodLabel(period)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_month">
                {locale?.accounting.periods?.currentMonth || "Mois en cours"}
              </SelectItem>
              <SelectItem value="last_month">
                {locale?.accounting.periods?.lastMonth || "Mois dernier"}
              </SelectItem>
              <SelectItem value="current_quarter">
                {locale?.accounting.periods?.currentQuarter ||
                  "Trimestre en cours"}
              </SelectItem>
              <SelectItem value="last_quarter">
                {locale?.accounting.periods?.lastQuarter || "Trimestre dernier"}
              </SelectItem>
              <SelectItem value="current_year">
                {locale?.accounting.periods?.currentYear || "Année en cours"}
              </SelectItem>
              <SelectItem value="last_year">
                {locale?.accounting.periods?.lastYear || "Année dernière"}
              </SelectItem>
              <SelectItem value="custom">
                {locale?.accounting.periods?.custom || "Période personnalisée"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Custom Date Range Picker */}
        {period === "custom" && (
          <div className="space-y-2 w-full sm:w-auto">
            <Label>
              {locale?.accounting.customDateRange || "Plage de dates"}
            </Label>
            <Popover
              open={showCustomDatePicker}
              onOpenChange={setShowCustomDatePicker}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-[280px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />

                  {customDateRange.from && customDateRange.to ? (
                    <span>
                      {format(customDateRange.from, "dd/MM/yyyy", {
                        locale: getDateLocale(),
                      })}{" "}
                      -{" "}
                      {format(customDateRange.to, "dd/MM/yyyy", {
                        locale: getDateLocale(),
                      })}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">
                      {locale?.accounting.selectDateRange ||
                        "Sélectionner une plage"}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="flex flex-col">
                  <Calendar
                    mode="range"
                    selected={{
                      from: tempDateRange.from,
                      to: tempDateRange.to,
                    }}
                    onSelect={(range) => {
                      if (range) {
                        handleTempDateRangeChange({
                          from: range.from,
                          to: range.to,
                        });
                      }
                    }}
                    numberOfMonths={2}
                    locale={getDateLocale()}
                  />

                  <div className="flex items-center justify-end gap-2 p-3 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelDateRange}
                    >
                      {locale?.common?.cancel || "Annuler"}
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleValidateDateRange}
                      disabled={!tempDateRange.from || !tempDateRange.to}
                    >
                      {locale?.common?.validate || "Valider"}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      {/* Journal des paiements */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {locale?.accounting.journalTitle || "Écritures comptables"}
              </CardTitle>
              <CardDescription>
                {locale?.accounting.journalDescription ||
                  "Export comptable de toutes les écritures avec détails"}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!hasJournalEntries}
                >
                  <Download className="h-4 w-4 md:mr-2" />

                  <span className="hidden md:inline">
                    {locale?.accounting.exportJournal || "Exporter écritures"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="start">
                <DropdownMenuItem
                  onClick={() => onExportJournal?.("excel", period)}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel (.xlsx)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onExportJournal?.("csv", period)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  CSV
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onExportJournal?.("pdf", period)}
                >
                  <FileBarChart className="h-4 w-4 mr-2" />
                  PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          {/* Empty State */}
          {!hasJournalEntries && (
            <Alert>
              <FileX className="h-4 w-4" />

              <AlertDescription>
                {locale?.accounting.noJournalEntries ||
                  "Aucune écriture comptable pour cette période."}
              </AlertDescription>
            </Alert>
          )}

          {/* Desktop Table View */}
          {hasJournalEntries && (
            <div className="hidden md:block border border-border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="w-[110px] cursor-pointer select-none"
                      onClick={() => handleSort("date")}
                    >
                      <div className="flex items-center gap-2">
                        {locale?.accounting.journalColumns.date || "Date"}
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="w-[140px] cursor-pointer select-none"
                      onClick={() => handleSort("student")}
                    >
                      <div className="flex items-center gap-2">
                        {locale?.accounting.journalColumns.student || "Élève"}
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="w-[130px]">
                      {locale?.accounting.journalColumns.invoice || "Facture"}
                    </TableHead>
                    <TableHead className="min-w-[200px]">
                      {locale?.accounting.journalColumns.description ||
                        "Description"}
                    </TableHead>
                    <TableHead className="w-[180px]">
                      {locale?.accounting.journalColumns.debit || "Débit"}
                    </TableHead>
                    <TableHead className="w-[180px]">
                      {locale?.accounting.journalColumns.credit || "Crédit"}
                    </TableHead>
                    <TableHead
                      className="w-[120px] text-right cursor-pointer select-none"
                      onClick={() => handleSort("amount")}
                    >
                      <div className="flex items-center justify-end gap-2">
                        {locale?.accounting.journalColumns.amount || "Montant"}
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead
                      className="w-[110px] text-right cursor-pointer select-none"
                      onClick={() => handleSort("vatAmount")}
                    >
                      <div className="flex items-center justify-end gap-2">
                        {locale?.accounting.journalColumns.vat || "TVA"}
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedJournalEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium whitespace-nowrap">
                        {entry.date}
                      </TableCell>
                      <TableCell className="font-medium">
                        {entry.studentName}
                      </TableCell>
                      <TableCell>
                        {entry.invoiceNumber ? (
                          <Badge variant="outline">{entry.invoiceNumber}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {entry.description}
                      </TableCell>
                      <TableCell className="text-xs font-mono">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-muted-foreground">
                            {entry.debitAccount}
                          </span>
                          {getAccountLabel(entry.debitAccount) && (
                            <span className="text-[10px] text-muted-foreground/70">
                              {getAccountLabel(entry.debitAccount)}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-mono">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-muted-foreground">
                            {entry.creditAccount}
                          </span>
                          {getAccountLabel(entry.creditAccount) && (
                            <span className="text-[10px] text-muted-foreground/70">
                              {getAccountLabel(entry.creditAccount)}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold tabular-nums whitespace-nowrap">
                        {formatCurrency(entry.amount)}
                      </TableCell>
                      <TableCell className="text-right">
                        {entry.vatAmount ? (
                          <div className="flex flex-col items-end">
                            <span className="font-semibold tabular-nums whitespace-nowrap">
                              {formatCurrency(entry.vatAmount)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({entry.vatRate}%)
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Mobile/Tablet Cards View */}
          {hasJournalEntries && (
            <div className="md:hidden space-y-3">
              {sortedJournalEntries.map((entry) => (
                <Card key={entry.id} className="border border-border">
                  <CardContent className="p-4 space-y-3">
                    {/* Header: Date + Invoice */}
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <span className="text-sm font-semibold">
                        {entry.date}
                      </span>
                      {entry.invoiceNumber && (
                        <Badge variant="outline">{entry.invoiceNumber}</Badge>
                      )}
                    </div>

                    {/* Student Name */}
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">
                        {locale?.accounting.journalColumns.student || "Élève"}
                      </span>
                      <p className="text-sm font-medium">{entry.studentName}</p>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">
                        {locale?.accounting.journalColumns.description ||
                          "Description"}
                      </span>
                      <p className="text-sm">{entry.description}</p>
                    </div>

                    {/* Accounts */}
                    <div className="grid grid-cols-1 [360px]:grid-cols-2 gap-3">
                      <div className="space-y-1 min-w-0">
                        <span className="text-xs text-muted-foreground">
                          {locale?.accounting.journalColumns.debit || "Débit"}
                        </span>
                        <div className="space-y-0.5">
                          <p className="text-xs font-mono truncate">
                            {entry.debitAccount}
                          </p>
                          {getAccountLabel(entry.debitAccount) && (
                            <p className="text-[10px] text-muted-foreground/70 truncate">
                              {getAccountLabel(entry.debitAccount)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-1 min-w-0">
                        <span className="text-xs text-muted-foreground">
                          {locale?.accounting.journalColumns.credit || "Crédit"}
                        </span>
                        <div className="space-y-0.5">
                          <p className="text-xs font-mono truncate">
                            {entry.creditAccount}
                          </p>
                          {getAccountLabel(entry.creditAccount) && (
                            <p className="text-[10px] text-muted-foreground/70 truncate">
                              {getAccountLabel(entry.creditAccount)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Amounts */}
                    <div className="grid grid-cols-1 [360px]:grid-cols-2 gap-3 pt-3 border-t border-border">
                      <div className="space-y-1 min-w-0">
                        <span className="text-xs text-muted-foreground">
                          {locale?.accounting.journalColumns.amount ||
                            "Montant"}
                        </span>
                        <p className="text-base font-semibold tabular-nums break-all">
                          {formatCurrency(entry.amount)}
                        </p>
                      </div>
                      {entry.vatAmount && (
                        <div className="space-y-1 min-w-0">
                          <span className="text-xs text-muted-foreground">
                            {locale?.accounting.journalColumns.vat || "TVA"}
                          </span>
                          <div>
                            <p className="text-base font-semibold tabular-nums break-all">
                              {formatCurrency(entry.vatAmount)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              ({entry.vatRate}%)
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rapport TVA */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {locale?.accounting.vatTitle || "Rapport TVA"}
              </CardTitle>
              <CardDescription>
                {locale?.accounting.vatDescription ||
                  "Ventilation TVA par taux avec totaux"}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={!hasVATBreakdown}>
                  <Download className="h-4 w-4 md:mr-2" />

                  <span className="hidden md:inline">
                    {locale?.accounting.exportVAT || "Exporter déclaration TVA"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="start">
                <DropdownMenuItem
                  onClick={() => onExportVAT?.("excel", period)}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel (.xlsx)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExportVAT?.("pdf", period)}>
                  <FileBarChart className="h-4 w-4 mr-2" />
                  PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Empty State */}
          {!hasVATBreakdown && (
            <Alert>
              <AlertCircle className="h-4 w-4" />

              <AlertDescription>
                {locale?.accounting.noVATData ||
                  "Aucune donnée TVA disponible pour cette période."}
              </AlertDescription>
            </Alert>
          )}

          {/* Period Info */}
          {hasVATBreakdown && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Période:</span>
                <span className="font-medium">
                  {vatReport.period.start} - {vatReport.period.end}
                </span>
              </div>
            </div>
          )}

          {/* Desktop VAT Breakdown Table */}
          {hasVATBreakdown && (
            <div className="hidden md:block border border-border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      {locale?.accounting.vatSummary.rate || "Taux"}
                    </TableHead>
                    <TableHead className="w-[160px] text-right">
                      {locale?.accounting.vatSummary.netAmount ||
                        "Montant net (HT)"}
                    </TableHead>
                    <TableHead className="w-[160px] text-right">
                      {locale?.accounting.vatSummary.vatAmount || "Montant TVA"}
                    </TableHead>
                    <TableHead className="w-[160px] text-right">
                      {locale?.accounting.vatSummary.grossAmount ||
                        "Montant TTC"}
                    </TableHead>
                    <TableHead className="w-[120px] text-right">
                      {locale?.accounting.vatSummary.transactions ||
                        "Transactions"}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vatReport.vatBreakdown.map((item) => (
                    <TableRow key={item.rate}>
                      <TableCell>
                        <Badge variant="secondary">{item.rate}%</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold tabular-nums whitespace-nowrap">
                        {formatCurrency(item.netAmount)}
                      </TableCell>
                      <TableCell className="text-right font-semibold tabular-nums whitespace-nowrap">
                        {formatCurrency(item.vatAmount)}
                      </TableCell>
                      <TableCell className="text-right font-semibold tabular-nums whitespace-nowrap">
                        {formatCurrency(item.grossAmount)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground font-medium">
                        {item.transactionsCount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Mobile/Tablet VAT Cards View */}
          {hasVATBreakdown && (
            <div className="md:hidden space-y-3">
              {vatReport.vatBreakdown.map((item) => (
                <Card key={item.rate} className="border border-border">
                  <CardContent className="p-4 space-y-3">
                    {/* Header: Rate Badge */}
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <Badge variant="secondary">
                        {locale?.accounting.vatSummary.rate || "Taux"}:{" "}
                        {item.rate}%
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.transactionsCount}{" "}
                        {locale?.accounting.vatSummary.transactions ||
                          "Transactions"}
                      </span>
                    </div>

                    {/* Amounts Grid */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {locale?.accounting.vatSummary.netAmount ||
                            "Montant net (HT)"}
                        </span>
                        <span className="text-sm font-semibold tabular-nums">
                          {formatCurrency(item.netAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {locale?.accounting.vatSummary.vatAmount ||
                            "Montant TVA"}
                        </span>
                        <span className="text-sm font-semibold tabular-nums">
                          {formatCurrency(item.vatAmount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-sm font-medium">
                          {locale?.accounting.vatSummary.grossAmount ||
                            "Montant TTC"}
                        </span>
                        <span className="text-base font-bold tabular-nums">
                          {formatCurrency(item.grossAmount)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Totals Summary */}
          {hasVATBreakdown && (
            <div className="p-4 border border-border rounded-lg bg-muted/50">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {locale?.accounting.totalRevenue || "Revenu total (HT)"}:
                  </span>
                  <span className="text-base md:text-lg font-semibold tabular-nums">
                    {formatCurrency(vatReport.totalRevenue)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {locale?.accounting.totalVAT || "TVA totale"}:
                  </span>
                  <span className="text-base md:text-lg font-semibold text-orange-600 tabular-nums">
                    {formatCurrency(vatReport.totalVAT)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="font-semibold truncate">
                    {locale?.accounting.totalGross || "Total TTC"}:
                  </span>
                  <span className="text-base md:text-lg font-bold tabular-nums ml-2 flex-shrink-0">
                    {formatCurrency(vatReport.totalGross)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
