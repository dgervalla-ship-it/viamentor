/**
 * VIAMENTOR Tenant Wizard - Step 3: Plan & Billing
 *
 * Sélection plan et informations de facturation
 *
 * @module components/viamentor-wizard-step-3-plan-billing
 * @version 1.0.0
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  planBillingSchema,
  PlanBillingData,
  PLAN_PRICING,
} from "@/polymet/data/viamentor-tenant-wizard-schemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckIcon, InfoIcon } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface Step3PlanBillingProps {
  initialData?: Partial<PlanBillingData>;
  onDataChange: (data: Partial<PlanBillingData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

export function Step3PlanBilling({
  initialData,
  onDataChange,
  onValidationChange,
}: Step3PlanBillingProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<PlanBillingData>({
    resolver: zodResolver(planBillingSchema),
    mode: "onChange",
    defaultValues: initialData,
  });

  const formData = watch();
  const selectedPlan = watch("plan");
  const freeTrial = watch("freeTrial");

  // Notify parent of data changes
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  // Notify parent of validation state
  useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

  const isPaidPlan = selectedPlan === "Pro" || selectedPlan === "Enterprise";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Plan & Facturation</h2>
        <p className="text-muted-foreground">
          Choisissez la formule d'abonnement adaptée
        </p>
      </div>

      {/* Plan Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(
          Object.entries(PLAN_PRICING) as [
            keyof typeof PLAN_PRICING,
            (typeof PLAN_PRICING)[keyof typeof PLAN_PRICING],
          ][]
        ).map(([plan, config]) => (
          <Card
            key={plan}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              selectedPlan === plan && "ring-2 ring-primary"
            )}
            onClick={() => setValue("plan", plan)}
          >
            <CardHeader>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <CardTitle>{plan}</CardTitle>
                  {selectedPlan === plan && (
                    <CheckIcon className="h-5 w-5 text-primary" />
                  )}
                </div>
                {plan === "Free" && <Badge variant="secondary">Gratuit</Badge>}
                {plan === "Pro" && (
                  <Badge className="bg-primary">Populaire</Badge>
                )}
                {plan === "Enterprise" && (
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    Premium
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">
                {config.price !== null ? (
                  <>
                    {config.price} <span className="text-lg">CHF</span>
                    <span className="text-sm text-muted-foreground font-normal">
                      /mois
                    </span>
                  </>
                ) : (
                  <span className="text-lg">Sur demande</span>
                )}
              </div>
              <ul className="space-y-2">
                {config.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckIcon className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {errors.plan && (
        <p className="text-sm text-destructive">{errors.plan.message}</p>
      )}

      {/* Billing Information (for paid plans) */}
      {isPaidPlan && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="text-lg">
              Informations de facturation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="billingName">
                Raison sociale <span className="text-destructive">*</span>
              </Label>
              <Input
                id="billingName"
                {...register("billingName")}
                placeholder="Auto-École Exemple Sàrl"
                className={errors.billingName ? "border-destructive" : ""}
              />

              {errors.billingName && (
                <p className="text-sm text-destructive">
                  {errors.billingName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="iban">
                IBAN <span className="text-destructive">*</span>
              </Label>
              <Input
                id="iban"
                {...register("iban")}
                placeholder="CH76 0076 XXXX XXXX XXXX X"
                className={errors.iban ? "border-destructive" : ""}
              />

              {errors.iban && (
                <p className="text-sm text-destructive">
                  {errors.iban.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Format IBAN suisse pour prélèvement automatique
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="freeTrial"
                  checked={freeTrial}
                  onCheckedChange={(checked) =>
                    setValue("freeTrial", checked as boolean)
                  }
                />

                <Label htmlFor="freeTrial" className="cursor-pointer">
                  Essai gratuit 30 jours
                </Label>
              </div>
              {freeTrial && (
                <Alert>
                  <InfoIcon className="h-4 w-4" />

                  <AlertDescription>
                    Le premier prélèvement aura lieu dans 30 jours. Vous pouvez
                    annuler à tout moment pendant la période d'essai.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <Alert>
              <InfoIcon className="h-4 w-4" />

              <AlertDescription>
                Facturation mensuelle par prélèvement automatique. Vous recevrez
                une facture par email chaque mois.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
