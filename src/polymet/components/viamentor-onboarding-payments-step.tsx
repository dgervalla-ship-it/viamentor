/**
 * VIAMENTOR - Onboarding Step 4: Configuration Paiements
 * Facturation, IBAN, méthodes, délais, CGV avec empathie financière
 */

import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type PaymentConfigData } from "@/polymet/data/viamentor-onboarding-schemas";
import {
  type OnboardingLocale,
  ONBOARDING_I18N,
} from "@/polymet/data/viamentor-onboarding-i18n";

interface PaymentsStepProps {
  data: Partial<PaymentConfigData>;
  locale?: OnboardingLocale;
  onChange: (data: Partial<PaymentConfigData>) => void;
}

// Payment methods avec labels
const PAYMENT_METHODS = [
  { value: "cash", label: "Espèces", icon: "💵" },
  { value: "card", label: "Carte bancaire", icon: "💳" },
  { value: "bank_transfer", label: "Virement bancaire", icon: "🏦" },
  { value: "twint", label: "TWINT", icon: "📱" },
] as const;

export function PaymentsStep({
  data,
  locale = "fr",
  onChange,
}: PaymentsStepProps) {
  const t = ONBOARDING_I18N[locale];

  const invoicingEnabled = data.invoicingEnabled ?? true;
  const paymentMethods = data.paymentMethods || ["cash"];
  const qrBillEnabled = data.qrBillEnabled ?? true;

  /**
   * Toggle payment method
   */
  const togglePaymentMethod = (method: string) => {
    const current = paymentMethods;
    if (current.includes(method as any)) {
      // Remove if not last
      if (current.length > 1) {
        onChange({
          ...data,
          paymentMethods: current.filter((m) => m !== method) as any,
        });
      }
    } else {
      onChange({
        ...data,
        paymentMethods: [...current, method] as any,
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">{t.step4.title}</h2>
        <p className="text-muted-foreground mt-1">{t.step4.subtitle}</p>
      </div>

      {/* Invoicing Toggle */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-accent/30">
          <div className="flex-1">
            <Label
              htmlFor="invoicing-enabled"
              className="text-base font-semibold cursor-pointer"
            >
              {t.step4.invoicing.enabled}
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Générez automatiquement des factures pour vos élèves
            </p>
          </div>
          <Switch
            id="invoicing-enabled"
            checked={invoicingEnabled}
            onCheckedChange={(checked) =>
              onChange({ ...data, invoicingEnabled: checked })
            }
          />
        </div>

        {!invoicingEnabled && (
          <Alert>
            <Info className="w-4 h-4" />

            <AlertTitle>Mode simplifié</AlertTitle>
            <AlertDescription>
              Sans facturation, vous gérez les paiements en espèces uniquement.
              Vous pourrez activer la facturation plus tard.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Invoicing Configuration (if enabled) */}
      {invoicingEnabled && (
        <div className="space-y-6">
          {/* VAT Number */}
          <div className="space-y-2">
            <Label htmlFor="vat-number">Numéro TVA (optionnel)</Label>
            <Input
              id="vat-number"
              placeholder="CHE-123.456.789"
              value={data.vatNumber || ""}
              onChange={(e) => onChange({ ...data, vatNumber: e.target.value })}
            />

            <p className="text-xs text-muted-foreground">
              Si votre école est assujettie à la TVA suisse
            </p>
          </div>

          {/* IBAN */}
          <div className="space-y-2">
            <Label htmlFor="iban" className="flex items-center gap-2">
              IBAN pour les paiements
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="iban"
              placeholder="CH00 0000 0000 0000 0000 0"
              value={data.iban || ""}
              onChange={(e) => onChange({ ...data, iban: e.target.value })}
            />

            <p className="text-xs text-muted-foreground">
              Compte bancaire pour recevoir les paiements
            </p>
          </div>

          {/* QR-Bill Alert */}
          {qrBillEnabled && data.iban && (
            <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <Info className="w-4 h-4 text-green-600 dark:text-green-400" />

              <AlertTitle className="text-green-900 dark:text-green-100">
                QR-facture activée automatiquement
              </AlertTitle>
              <AlertDescription className="text-green-800 dark:text-green-200">
                Vos factures incluront un QR-code Swiss Payment Standard pour
                faciliter les paiements de vos élèves.
              </AlertDescription>
            </Alert>
          )}

          {/* Payment Deadline */}
          <div className="space-y-2">
            <Label htmlFor="payment-deadline">Délai de paiement (jours)</Label>
            <Select
              value={String(data.paymentDeadlineDays || 30)}
              onValueChange={(value) =>
                onChange({ ...data, paymentDeadlineDays: parseInt(value) })
              }
            >
              <SelectTrigger id="payment-deadline">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 jours</SelectItem>
                <SelectItem value="14">14 jours</SelectItem>
                <SelectItem value="30">30 jours (recommandé)</SelectItem>
                <SelectItem value="60">60 jours</SelectItem>
                <SelectItem value="90">90 jours</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Délai standard pour le paiement des factures
            </p>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-2">
            <Label htmlFor="terms">
              Conditions générales de vente (optionnel)
            </Label>
            <Textarea
              id="terms"
              placeholder="Ex: Paiement à réception de facture. Aucun remboursement pour les leçons annulées moins de 24h à l'avance..."
              rows={4}
              maxLength={500}
              value={data.termsAndConditions || ""}
              onChange={(e) =>
                onChange({ ...data, termsAndConditions: e.target.value })
              }
            />

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Ces conditions apparaîtront sur vos factures
              </p>
              <span className="text-xs text-muted-foreground">
                {data.termsAndConditions?.length || 0} / 500
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Payment Methods */}
      <div className="space-y-4">
        <div>
          <Label className="text-base font-semibold">
            {t.step4.methods.label}
          </Label>
          <p className="text-sm text-muted-foreground mt-1">
            Flexibilité pour vos élèves (minimum 1 méthode)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {PAYMENT_METHODS.map((method) => {
            const isChecked = paymentMethods.includes(method.value as any);
            const isLast = paymentMethods.length === 1 && isChecked;

            return (
              <div
                key={method.value}
                className={`flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer transition-all ${
                  isChecked
                    ? "bg-accent/50 border-primary"
                    : "bg-background hover:bg-accent/30"
                } ${isLast ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => !isLast && togglePaymentMethod(method.value)}
              >
                <Checkbox
                  checked={isChecked}
                  disabled={isLast}
                  onCheckedChange={() =>
                    !isLast && togglePaymentMethod(method.value)
                  }
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{method.icon}</span>
                    <span className="font-medium">{method.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Info */}
      <div className="p-4 border border-border rounded-lg bg-muted/30">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-muted-foreground mt-0.5" />

          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">
              Configuration financière sensible
            </p>
            <p className="text-sm text-muted-foreground">
              Ces paramètres peuvent être modifiés à tout moment dans les
              paramètres de votre auto-école. Prenez le temps de bien les
              configurer pour éviter les erreurs de facturation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
