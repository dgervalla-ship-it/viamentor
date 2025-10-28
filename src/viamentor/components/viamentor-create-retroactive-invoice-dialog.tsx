/**
 * VIAMENTOR - Create Retroactive Invoice Dialog
 * Dialog création facture rétroactive
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import type { UnreconciledPayment } from "@/viamentor/data/viamentor-payments-data";
import type { PaymentsTranslations } from "@/viamentor/data/viamentor-payments-i18n";

interface CreateRetroactiveInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: UnreconciledPayment | null;
  locale?: PaymentsTranslations;
  onConfirm?: (invoiceData: any) => void;
}

export function CreateRetroactiveInvoiceDialog({
  open,
  onOpenChange,
  payment,
  locale,
  onConfirm,
}: CreateRetroactiveInvoiceDialogProps) {
  const [description, setDescription] = useState("");
  const [vatRate, setVatRate] = useState<string>("7.7");
  const [category, setCategory] = useState<string>("training");

  const calculateVAT = () => {
    if (!payment) return 0;
    const rate = parseFloat(vatRate) / 100;
    return payment.amount * rate;
  };

  const calculateNetAmount = () => {
    if (!payment) return 0;
    return payment.amount - calculateVAT();
  };

  const handleConfirm = () => {
    if (!payment || !description) return;

    const invoiceData = {
      studentId: payment.studentId,
      studentName: payment.studentName,
      date: payment.date,
      description,
      category,
      netAmount: calculateNetAmount(),
      vatRate: parseFloat(vatRate),
      vatAmount: calculateVAT(),
      totalAmount: payment.amount,
      paymentId: payment.id,
      retroactive: true,
    };

    if (onConfirm) {
      onConfirm(invoiceData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {locale?.unreconciled.createInvoice || "Créer facture rétroactive"}
          </DialogTitle>
          <DialogDescription>
            Créer une facture correspondant à ce paiement déjà reçu
          </DialogDescription>
        </DialogHeader>

        {payment && (
          <div className="space-y-4">
            {/* Info Alert */}
            <Alert>
              <Info className="h-4 w-4" />

              <AlertDescription>
                La facture sera créée avec le statut "Payée" et liée
                automatiquement à ce paiement.
              </AlertDescription>
            </Alert>

            {/* Payment Info */}
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Paiement reçu</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Élève:</span>{" "}
                  <span className="font-medium">{payment.studentName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Montant:</span>{" "}
                  <span className="font-bold text-green-600">
                    {payment.amount.toFixed(2)} CHF
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>{" "}
                  <span>{payment.date}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Méthode:</span>{" "}
                  <Badge variant="secondary">
                    {
                      locale?.methods[
                        payment.method as keyof typeof locale.methods
                      ]
                    }
                  </Badge>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Description de la prestation *</Label>
                <Textarea
                  placeholder="Ex: Leçons de conduite catégorie B..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Catégorie</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="training">
                        Formation pratique
                      </SelectItem>
                      <SelectItem value="theory">Cours théorique</SelectItem>
                      <SelectItem value="exam">Examen</SelectItem>
                      <SelectItem value="admin">
                        Frais administratifs
                      </SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Taux TVA</Label>
                  <Select value={vatRate} onValueChange={setVatRate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7.7">7.7% (taux normal)</SelectItem>
                      <SelectItem value="2.5">2.5% (taux réduit)</SelectItem>
                      <SelectItem value="0">0% (exonéré)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Calculation Summary */}
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-3">Récapitulatif facture</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Montant net:</span>
                  <span className="font-medium">
                    {calculateNetAmount().toFixed(2)} CHF
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    TVA ({vatRate}%):
                  </span>
                  <span className="font-medium">
                    {calculateVAT().toFixed(2)} CHF
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-semibold">Total TTC:</span>
                  <span className="font-bold text-lg">
                    {payment.amount.toFixed(2)} CHF
                  </span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span className="font-semibold">Déjà payé:</span>
                  <span className="font-bold">
                    {payment.amount.toFixed(2)} CHF
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-semibold">Solde:</span>
                  <span className="font-bold">0.00 CHF</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {locale?.actions.cancel || "Annuler"}
          </Button>
          <Button onClick={handleConfirm} disabled={!description}>
            Créer facture
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
