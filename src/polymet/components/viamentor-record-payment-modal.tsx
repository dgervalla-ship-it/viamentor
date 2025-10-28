/**
 * VIAMENTOR - Record Payment Modal
 * Modal enregistrement paiement manuel
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Upload,
  AlertCircle,
  CheckCircle2,
  Banknote,
  CreditCard,
  Building2,
  Smartphone,
  Mail,
  MoreHorizontal,
} from "lucide-react";
import {
  recordPaymentSchema,
  type RecordPaymentFormData,
} from "@/polymet/data/viamentor-camt-parser-schemas";
import {
  type OpenInvoice,
  PAYMENT_METHODS,
} from "@/polymet/data/viamentor-payments-data";
import { type PaymentsTranslations } from "@/polymet/data/viamentor-payments-i18n";

const ICONS = {
  Banknote,
  CreditCard,
  Building2,
  Smartphone,
  Mail,
  MoreHorizontal,
};

interface RecordPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale?: PaymentsTranslations;
  onSubmit?: (data: RecordPaymentFormData) => Promise<void>;
}

export function RecordPaymentModal({
  open,
  onOpenChange,
  locale,
  onSubmit,
}: RecordPaymentModalProps) {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RecordPaymentFormData>({
    resolver: zodResolver(recordPaymentSchema),
    defaultValues: {
      allowPartial: false,
      createAccounting: false,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().slice(0, 5),
    },
  });

  const amount = watch("amount");
  const method = watch("method");
  const allowPartial = watch("allowPartial");

  // Mock student data
  const mockStudent = {
    id: "stu-001",
    name: "Sophie Martin",
    avatar: "https://github.com/yusufhilmi.png",
    email: "sophie.martin@example.com",
    phone: "+41 79 123 45 67",
  };

  // Mock open invoices
  const mockOpenInvoices: OpenInvoice[] = [
    {
      id: "inv-001",
      number: "INV-2025-00001",
      date: "2025-01-10",
      totalAmount: 450.0,
      paidAmount: 0,
      balance: 450.0,
      status: "sent",
    },
    {
      id: "inv-002",
      number: "INV-2025-00002",
      date: "2025-01-08",
      totalAmount: 600.0,
      paidAmount: 200.0,
      balance: 400.0,
      status: "partial",
    },
  ];

  const totalSelected = mockOpenInvoices
    .filter((inv) => selectedInvoices.includes(inv.id))
    .reduce((sum, inv) => sum + inv.balance, 0);

  const handleInvoiceToggle = (invoiceId: string) => {
    setSelectedInvoices((prev) =>
      prev.includes(invoiceId)
        ? prev.filter((id) => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const handleFormSubmit = async (data: RecordPaymentFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit?.(data);
      onOpenChange(false);
    } catch (error) {
      console.error("Error recording payment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {locale?.recordPayment.title || "Enregistrer paiement"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Student Selection */}
          <div className="space-y-2">
            <Label>
              {locale?.recordPayment.searchStudent || "Rechercher élève"}
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder={
                  locale?.recordPayment.selectStudent || "Sélectionner un élève"
                }
                className="pl-9"
                onClick={() => setSelectedStudent(mockStudent)}
              />
            </div>
          </div>

          {/* Selected Student Card */}
          {selectedStudent && (
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedStudent.avatar} />

                  <AvatarFallback>{selectedStudent.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{selectedStudent.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedStudent.email}
                  </p>
                </div>
              </div>

              {/* Open Invoices */}
              <div className="mt-4 space-y-2">
                <Label>
                  {locale?.recordPayment.openInvoices || "Factures ouvertes"}
                </Label>
                {mockOpenInvoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center gap-3 p-2 border border-border rounded-md hover:bg-accent cursor-pointer"
                    onClick={() => handleInvoiceToggle(invoice.id)}
                  >
                    <Checkbox
                      checked={selectedInvoices.includes(invoice.id)}
                      onCheckedChange={() => handleInvoiceToggle(invoice.id)}
                    />

                    <div className="flex-1 grid grid-cols-4 gap-2 text-sm">
                      <span className="font-medium">{invoice.number}</span>
                      <span className="text-muted-foreground">
                        {invoice.date}
                      </span>
                      <span>{invoice.balance.toFixed(2)} CHF</span>
                      <Badge
                        variant={
                          invoice.status === "overdue"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {selectedInvoices.length > 0 && (
                  <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span className="font-medium">
                      {locale?.recordPayment.totalSelected ||
                        "Total sélectionné"}
                    </span>
                    <span className="text-lg font-bold">
                      {totalSelected.toFixed(2)} CHF
                    </span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">
              {locale?.recordPayment.amount || "Montant du paiement"} *
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder={locale?.recordPayment.amountPlaceholder || "0.00"}
                {...register("amount", { valueAsNumber: true })}
                className="pr-12"
              />

              <span className="absolute right-3 top-3 text-sm text-muted-foreground">
                CHF
              </span>
            </div>
            {errors.amount && (
              <p className="text-sm text-destructive">
                {errors.amount.message}
              </p>
            )}
            {amount > totalSelected && !allowPartial && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />

                <AlertDescription>
                  {locale?.recordPayment.amountExceedsError ||
                    "Le montant dépasse le total"}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Allow Partial */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="allowPartial"
              checked={allowPartial}
              onCheckedChange={(checked) =>
                setValue("allowPartial", checked as boolean)
              }
            />

            <Label htmlFor="allowPartial" className="cursor-pointer">
              {locale?.recordPayment.allowPartial ||
                "Autoriser paiement partiel"}
            </Label>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">
                {locale?.recordPayment.date || "Date"} *
              </Label>
              <Input id="date" type="date" {...register("date")} />

              {errors.date && (
                <p className="text-sm text-destructive">
                  {errors.date.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">
                {locale?.recordPayment.time || "Heure"}
              </Label>
              <Input id="time" type="time" {...register("time")} />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label htmlFor="method">
              {locale?.recordPayment.method || "Méthode"} *
            </Label>
            <Select
              value={method}
              onValueChange={(value) => setValue("method", value as any)}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    locale?.recordPayment.selectMethod || "Sélectionner"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map((pm) => {
                  const Icon = ICONS[pm.icon as keyof typeof ICONS];
                  return (
                    <SelectItem key={pm.value} value={pm.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />

                        <span>
                          {locale?.methods[
                            pm.value as keyof typeof locale.methods
                          ] || pm.value}
                        </span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {errors.method && (
              <p className="text-sm text-destructive">
                {errors.method.message}
              </p>
            )}
          </div>

          {/* Reference */}
          <div className="space-y-2">
            <Label htmlFor="reference">
              {locale?.recordPayment.reference || "Référence"}
            </Label>
            <Input
              id="reference"
              placeholder={
                locale?.recordPayment.referencePlaceholder ||
                "Transaction ID..."
              }
              {...register("reference")}
            />
          </div>

          {/* Receipt Upload */}
          <div className="space-y-2">
            <Label>{locale?.recordPayment.receipt || "Justificatif"}</Label>
            <div className="border-2 border-dashed border-border rounded-md p-4 text-center hover:bg-accent cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />

              <p className="text-sm text-muted-foreground">
                {locale?.recordPayment.uploadReceipt ||
                  "Télécharger justificatif"}
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">
              {locale?.recordPayment.notes || "Notes"}
            </Label>
            <Textarea
              id="notes"
              placeholder={locale?.recordPayment.notesPlaceholder || "Notes..."}
              maxLength={300}
              {...register("notes")}
            />
          </div>

          {/* Create Accounting */}
          <div className="flex items-center gap-2">
            <Checkbox id="createAccounting" {...register("createAccounting")} />

            <Label htmlFor="createAccounting" className="cursor-pointer">
              {locale?.recordPayment.createAccounting ||
                "Créer écriture comptable"}
            </Label>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                locale?.recordPayment.submitting || "Enregistrement..."
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />

                  {locale?.recordPayment.submit || "Enregistrer"}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
