/**
 * VIAMENTOR - Associate Invoice Dialog
 * Dialog pour associer facture à paiement
 */

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Search } from "lucide-react";
import type {
  UnreconciledPayment,
  OpenInvoice,
} from "@/viamentor/data/viamentor-payments-data";
import { mockOpenInvoices } from "@/viamentor/data/viamentor-payments-data";
import type { PaymentsTranslations } from "@/viamentor/data/viamentor-payments-i18n";

interface AssociateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: UnreconciledPayment | null;
  locale?: PaymentsTranslations;
  onConfirm?: (invoiceId: string) => void;
}

export function AssociateInvoiceDialog({
  open,
  onOpenChange,
  payment,
  locale,
  onConfirm,
}: AssociateInvoiceDialogProps) {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInvoices = mockOpenInvoices.filter(
    (inv) =>
      inv.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedInvoice = mockOpenInvoices.find(
    (inv) => inv.id === selectedInvoiceId
  );

  const handleConfirm = () => {
    if (selectedInvoiceId && onConfirm) {
      onConfirm(selectedInvoiceId);
    }
  };

  const getAmountDifference = () => {
    if (!payment || !selectedInvoice) return 0;
    return payment.amount - selectedInvoice.balance;
  };

  const amountDiff = getAmountDifference();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {locale?.unreconciled.associate || "Associer à une facture"}
          </DialogTitle>
          <DialogDescription>
            Sélectionnez la facture correspondant à ce paiement
          </DialogDescription>
        </DialogHeader>

        {payment && (
          <div className="space-y-3 sm:space-y-4">
            {/* Payment Info */}
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Paiement à associer</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="min-w-0">
                  <span className="text-muted-foreground">Élève:</span>{" "}
                  <span className="font-medium truncate">
                    {payment.studentName}
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="text-muted-foreground">Montant:</span>{" "}
                  <span className="font-bold text-green-600 break-all">
                    {payment.amount.toFixed(2)} CHF
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="text-muted-foreground">Date:</span>{" "}
                  <span className="truncate">{payment.date}</span>
                </div>
                <div className="min-w-0">
                  <span className="text-muted-foreground">Méthode:</span>{" "}
                  <Badge variant="secondary" className="truncate max-w-full">
                    {
                      locale?.methods[
                        payment.method as keyof typeof locale.methods
                      ]
                    }
                  </Badge>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <Label>Rechercher facture</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  placeholder="Numéro de facture..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Invoice Selection */}
            <div className="space-y-2">
              <Label>Facture</Label>
              <Select
                value={selectedInvoiceId}
                onValueChange={setSelectedInvoiceId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une facture" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {filteredInvoices.map((invoice) => {
                    const statusColor =
                      invoice.status === "overdue"
                        ? "text-red-500"
                        : invoice.status === "pending"
                          ? "text-orange-500"
                          : "text-blue-500";
                    return (
                      <SelectItem key={invoice.id} value={invoice.id}>
                        <span className="flex items-center gap-1.5">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${statusColor.replace("text-", "bg-")}`}
                          />
                          {invoice.number} · {invoice.balance.toFixed(2)} CHF
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Selected Invoice Details */}
            {selectedInvoice && (
              <div className="p-4 border border-border rounded-lg">
                <h4 className="font-semibold mb-2">Détails facture</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="min-w-0">
                    <span className="text-muted-foreground">Numéro:</span>{" "}
                    <span className="font-medium truncate">
                      {selectedInvoice.number}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-muted-foreground">Date:</span>{" "}
                    <span className="truncate">{selectedInvoice.date}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-muted-foreground">Total:</span>{" "}
                    <span className="break-all">
                      {selectedInvoice.totalAmount.toFixed(2)} CHF
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-muted-foreground">Solde:</span>{" "}
                    <span className="font-bold break-all">
                      {selectedInvoice.balance.toFixed(2)} CHF
                    </span>
                  </div>
                </div>

                {/* Amount Difference Alert */}
                {Math.abs(amountDiff) > 0.01 && (
                  <Alert
                    className="mt-4"
                    variant={amountDiff > 0 ? "default" : "destructive"}
                  >
                    <AlertCircle className="h-4 w-4" />

                    <AlertDescription className="break-words text-sm sm:text-base">
                      {amountDiff > 0 ? (
                        <>
                          Le paiement dépasse le solde de{" "}
                          <strong>{amountDiff.toFixed(2)} CHF</strong>. Un avoir
                          sera créé.
                        </>
                      ) : (
                        <>
                          Le paiement est inférieur au solde de{" "}
                          <strong>{Math.abs(amountDiff).toFixed(2)} CHF</strong>
                          . La facture restera partiellement payée.
                        </>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>
        )}

        <DialogFooter className="flex-col gap-2 sm:flex-row sm:gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            {locale?.actions.cancel || "Annuler"}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!selectedInvoiceId}
            className="w-full sm:w-auto"
          >
            Associer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
