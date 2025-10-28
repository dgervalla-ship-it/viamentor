/**
 * VIAMENTOR - Unreconciled Payments Tab
 * Tab paiements non réconciliés avec actions
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link2, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { AssociateInvoiceDialog } from "@/viamentor/components/viamentor-associate-invoice-dialog";
import { CreateRetroactiveInvoiceDialog } from "@/viamentor/components/viamentor-create-retroactive-invoice-dialog";
import type { UnreconciledPayment } from "@/viamentor/data/viamentor-payments-data";
import type { PaymentsTranslations } from "@/viamentor/data/viamentor-payments-i18n";

interface UnreconciledPaymentsTabProps {
  payments: UnreconciledPayment[];
  locale?: PaymentsTranslations;
  onAssociate?: (paymentId: string, invoiceId: string) => void;
  onCreateInvoice?: (paymentId: string, invoiceData: any) => void;
  onMarkVerified?: (paymentId: string, notes: string) => void;
}

export function UnreconciledPaymentsTab({
  payments,
  locale,
  onAssociate,
  onCreateInvoice,
  onMarkVerified,
}: UnreconciledPaymentsTabProps) {
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [associateDialogOpen, setAssociateDialogOpen] = useState(false);
  const [createInvoiceDialogOpen, setCreateInvoiceDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] =
    useState<UnreconciledPayment | null>(null);

  const filteredPayments = payments.filter((payment) => {
    if (sourceFilter === "all") return true;
    return payment.source === sourceFilter;
  });

  const getReasonBadge = (reason: string) => {
    const reasons = locale?.unreconciled.reasons || {};
    const label = reasons[reason as keyof typeof reasons] || reason;

    const variants: Record<string, string> = {
      no_invoice: "bg-orange-600",
      amount_mismatch: "bg-yellow-600",
      student_unknown: "bg-red-600",
      manual_review: "bg-blue-600",
    };

    return (
      <Badge variant="default" className={variants[reason] || "bg-gray-600"}>
        {label}
      </Badge>
    );
  };

  const getSourceBadge = (source: string) => {
    return (
      <Badge variant="outline">
        {source === "camt_import" ? "Camt.054" : "Manuel"}
      </Badge>
    );
  };

  const handleAssociate = (payment: UnreconciledPayment) => {
    setSelectedPayment(payment);
    setAssociateDialogOpen(true);
  };

  const handleCreateInvoice = (payment: UnreconciledPayment) => {
    setSelectedPayment(payment);
    setCreateInvoiceDialogOpen(true);
  };

  const handleMarkVerified = (payment: UnreconciledPayment) => {
    const notes = prompt(locale?.unreconciled.reviewNotes || "Notes:");
    if (notes !== null && onMarkVerified) {
      onMarkVerified(payment.id, notes);
    }
  };

  if (filteredPayments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <CheckCircle className="h-16 w-16 text-green-600 mb-4" />

        <h3 className="text-xl font-semibold mb-2">
          {locale?.unreconciled.noUnreconciled ||
            "Aucun paiement non réconcilié"}
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          Tous les paiements ont été associés à des factures ou vérifiés.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />

        <AlertDescription>{locale?.unreconciled.description}</AlertDescription>
      </Alert>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={locale?.unreconciled.source} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes sources</SelectItem>
            <SelectItem value="manual">Manuel</SelectItem>
            <SelectItem value="camt_import">Camt.054</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border border-border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{locale?.table.dateTime}</TableHead>
              <TableHead>{locale?.table.student}</TableHead>
              <TableHead>{locale?.table.amount}</TableHead>
              <TableHead>{locale?.table.method}</TableHead>
              <TableHead>{locale?.unreconciled.source}</TableHead>
              <TableHead>{locale?.unreconciled.reason}</TableHead>
              <TableHead>{locale?.table.actions}</TableHead>
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

                      <AvatarFallback>{payment.studentName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{payment.studentName}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-orange-600">
                    {payment.amount.toFixed(2)} CHF
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {
                      locale?.methods[
                        payment.method as keyof typeof locale.methods
                      ]
                    }
                  </Badge>
                </TableCell>
                <TableCell>{getSourceBadge(payment.source)}</TableCell>
                <TableCell>
                  {getReasonBadge(payment.unreconciledReason)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {payment.suggestedActions.includes("associate") && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAssociate(payment)}
                      >
                        <Link2 className="h-4 w-4 mr-1" />

                        {locale?.unreconciled.associate}
                      </Button>
                    )}
                    {payment.suggestedActions.includes("create_invoice") && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCreateInvoice(payment)}
                      >
                        <FileText className="h-4 w-4 mr-1" />

                        {locale?.unreconciled.createInvoice}
                      </Button>
                    )}
                    {payment.suggestedActions.includes("mark_verified") && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMarkVerified(payment)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />

                        {locale?.unreconciled.markVerified}
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialogs */}
      <AssociateInvoiceDialog
        open={associateDialogOpen}
        onOpenChange={setAssociateDialogOpen}
        payment={selectedPayment}
        locale={locale}
        onConfirm={(invoiceId) => {
          if (selectedPayment && onAssociate) {
            onAssociate(selectedPayment.id, invoiceId);
          }
          setAssociateDialogOpen(false);
        }}
      />

      <CreateRetroactiveInvoiceDialog
        open={createInvoiceDialogOpen}
        onOpenChange={setCreateInvoiceDialogOpen}
        payment={selectedPayment}
        locale={locale}
        onConfirm={(invoiceData) => {
          if (selectedPayment && onCreateInvoice) {
            onCreateInvoice(selectedPayment.id, invoiceData);
          }
          setCreateInvoiceDialogOpen(false);
        }}
      />
    </div>
  );
}
