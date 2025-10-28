/**
 * VIAMENTOR - Camt Matching Table
 * Table réconciliation transactions Camt
 */

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  Link as LinkIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { type CamtTransaction } from "@/polymet/data/viamentor-payments-data";
import { type PaymentsTranslations } from "@/polymet/data/viamentor-payments-i18n";

interface CamtMatchingTableProps {
  transactions: CamtTransaction[];
  locale?: PaymentsTranslations;
  onAssign?: (transactionId: string, invoiceId: string) => void;
}

export function CamtMatchingTable({
  transactions,
  locale,
  onAssign,
}: CamtMatchingTableProps) {
  const [filter, setFilter] = useState<"all" | "matched" | "unmatched">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === "all") return true;
    if (filter === "matched") return tx.matchingStatus === "auto_matched";
    if (filter === "unmatched") return tx.matchingStatus === "unmatched";
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    endIndex
  );

  // Reset to page 1 when filter changes
  const handleFilterChange = (newFilter: "all" | "matched" | "unmatched") => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const getStatusBadge = (status: CamtTransaction["matchingStatus"]) => {
    switch (status) {
      case "auto_matched":
        return (
          <Badge variant="default" className="bg-green-600">
            <CheckCircle2 className="h-3 w-3 mr-1" />

            {locale?.matching.auto_matched || "Auto-matché"}
          </Badge>
        );

      case "to_verify":
        return (
          <Badge variant="default" className="bg-orange-600">
            <AlertCircle className="h-3 w-3 mr-1" />

            {locale?.matching.to_verify || "À vérifier"}
          </Badge>
        );

      case "unmatched":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />

            {locale?.matching.unmatched || "Non matché"}
          </Badge>
        );
    }
  };

  const stats = {
    auto: transactions.filter((tx) => tx.matchingStatus === "auto_matched")
      .length,
    verify: transactions.filter((tx) => tx.matchingStatus === "to_verify")
      .length,
    unmatched: transactions.filter((tx) => tx.matchingStatus === "unmatched")
      .length,
  };

  return (
    <div className="space-y-4">
      {/* Filters & Stats */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("all")}
          >
            {locale?.importCamt.step3AllFilter || "Tous"} ({transactions.length}
            )
          </Button>
          <Button
            variant={filter === "matched" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("matched")}
          >
            {locale?.importCamt.step3MatchedFilter || "Matchés"} ({stats.auto})
          </Button>
          <Button
            variant={filter === "unmatched" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("unmatched")}
          >
            {locale?.importCamt.step3UnmatchedFilter || "Non matchés"} (
            {stats.unmatched})
          </Button>
        </div>

        <div className="flex gap-4 text-sm">
          <span className="text-green-600">
            {stats.auto} {locale?.importCamt.step3StatsAuto || "auto-matchés"}
          </span>
          <span className="text-orange-600">
            {stats.verify} {locale?.importCamt.step3StatsVerify || "à vérifier"}
          </span>
          <span className="text-destructive">
            {stats.unmatched}{" "}
            {locale?.importCamt.step3StatsUnmatched || "non matchés"}
          </span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block border border-border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{locale?.matchingTable.date || "Date"}</TableHead>
              <TableHead>
                {locale?.matchingTable.debtor || "Débiteur"}
              </TableHead>
              <TableHead className="text-right">
                {locale?.matchingTable.amount || "Montant"}
              </TableHead>
              <TableHead>
                {locale?.matchingTable.reference || "Référence"}
              </TableHead>
              <TableHead>{locale?.matchingTable.status || "Statut"}</TableHead>
              <TableHead>
                {locale?.matchingTable.invoice || "Facture"}
              </TableHead>
              <TableHead>
                {locale?.matchingTable.actions || "Actions"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{tx.date}</TableCell>
                <TableCell>{tx.debtorName}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={
                      tx.type === "credit"
                        ? "text-green-600"
                        : "text-destructive"
                    }
                  >
                    {tx.type === "credit" ? "+" : "-"}
                    {Math.abs(tx.amount).toFixed(2)} CHF
                  </span>
                </TableCell>
                <TableCell
                  className="max-w-[200px] truncate"
                  title={tx.reference}
                >
                  {tx.reference}
                </TableCell>
                <TableCell>{getStatusBadge(tx.matchingStatus)}</TableCell>
                <TableCell>
                  {tx.matchedInvoiceNumber ? (
                    <div>
                      <p className="font-medium">{tx.matchedInvoiceNumber}</p>
                      <p className="text-xs text-muted-foreground">
                        {tx.matchedStudentName}
                      </p>
                      {tx.confidenceScore && (
                        <p className="text-xs text-muted-foreground">
                          {locale?.matching.confidence || "Confiance"}:{" "}
                          {tx.confidenceScore}%
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {tx.matchingStatus === "unmatched" &&
                    tx.type === "credit" && (
                      <Select
                        onValueChange={(value) => onAssign?.(tx.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue
                            placeholder={locale?.matching.assign || "Assigner"}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inv-001">
                            INV-2025-00001
                          </SelectItem>
                          <SelectItem value="inv-002">
                            INV-2025-00002
                          </SelectItem>
                          <SelectItem value="inv-003">
                            INV-2025-00003
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="md:hidden space-y-3">
        {paginatedTransactions.map((tx) => (
          <Card key={tx.id} className="overflow-hidden">
            <CardContent className="p-4 space-y-3">
              {/* Header: Date + Status */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground">
                    {locale?.matchingTable.date || "Date"}
                  </p>
                  <p className="font-semibold">{tx.date}</p>
                </div>
                <div className="flex-shrink-0">
                  {getStatusBadge(tx.matchingStatus)}
                </div>
              </div>

              {/* Debtor */}
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {locale?.matchingTable.debtor || "Débiteur"}
                </p>
                <p className="font-medium">{tx.debtorName}</p>
              </div>

              {/* Amount */}
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {locale?.matchingTable.amount || "Montant"}
                </p>
                <p
                  className={
                    tx.type === "credit"
                      ? "text-green-600 font-semibold text-lg"
                      : "text-destructive font-semibold text-lg"
                  }
                >
                  {tx.type === "credit" ? "+" : "-"}
                  {Math.abs(tx.amount).toFixed(2)} CHF
                </p>
              </div>

              {/* Reference */}
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {locale?.matchingTable.reference || "Référence"}
                </p>
                <p className="text-sm break-all">{tx.reference}</p>
              </div>

              {/* Invoice Info */}
              {tx.matchedInvoiceNumber ? (
                <div className="pt-2 border-t border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {locale?.matchingTable.invoice || "Facture"}
                  </p>
                  <p className="font-medium">{tx.matchedInvoiceNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    {tx.matchedStudentName}
                  </p>
                  {tx.confidenceScore && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {locale?.matching.confidence || "Confiance"}:{" "}
                      {tx.confidenceScore}%
                    </p>
                  )}
                </div>
              ) : (
                <div className="pt-2 border-t border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {locale?.matchingTable.invoice || "Facture"}
                  </p>
                  <p className="text-sm text-muted-foreground">-</p>
                </div>
              )}

              {/* Actions */}
              {tx.matchingStatus === "unmatched" && tx.type === "credit" && (
                <div className="pt-2 border-t border-border">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {locale?.matchingTable.actions || "Actions"}
                  </p>
                  <Select onValueChange={(value) => onAssign?.(tx.id, value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={locale?.matching.assign || "Assigner"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inv-001">INV-2025-00001</SelectItem>
                      <SelectItem value="inv-002">INV-2025-00002</SelectItem>
                      <SelectItem value="inv-003">INV-2025-00003</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {locale?.pagination?.showing || "Affichage"} {startIndex + 1}-
            {Math.min(endIndex, filteredTransactions.length)}{" "}
            {locale?.pagination?.of || "sur"} {filteredTransactions.length}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />

              <span className="sr-only md:not-sr-only md:ml-1">
                {locale?.pagination?.previous || "Précédent"}
              </span>
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  // Show first, last, current, and adjacent pages
                  return (
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1
                  );
                })
                .map((page, idx, arr) => {
                  // Add ellipsis
                  const prevPage = arr[idx - 1];
                  const showEllipsis = prevPage && page - prevPage > 1;

                  return (
                    <div key={page} className="flex items-center gap-1">
                      {showEllipsis && (
                        <span className="px-2 text-muted-foreground">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="min-w-[36px]"
                      >
                        {page}
                      </Button>
                    </div>
                  );
                })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only md:not-sr-only md:mr-1">
                {locale?.pagination?.next || "Suivant"}
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
