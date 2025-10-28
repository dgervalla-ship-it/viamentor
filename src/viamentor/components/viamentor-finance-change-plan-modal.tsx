/**
 * VIAMENTOR Finance Change Plan Modal
 *
 * Wizard 3 steps pour changement plan avec prorata
 *
 * @module components/viamentor-finance-change-plan-modal
 */

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2Icon, InfoIcon } from "lucide-react";
import {
  TenantSubscription,
  PlanType,
  PLAN_FEATURES,
  calculateProrata,
  formatCurrency,
} from "@/viamentor/data/viamentor-finance-data";

interface ChangePlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription: TenantSubscription | null;
  locale?: "fr" | "de" | "it" | "en";
  onConfirm?: (data: {
    newPlan: PlanType;
    effectiveDate: "immediate" | "next_cycle";
    notes: string;
    sendEmail: boolean;
  }) => void;
}

export function ChangePlanModal({
  open,
  onOpenChange,
  subscription,
  locale = "fr",
  onConfirm,
}: ChangePlanModalProps) {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [effectiveDate, setEffectiveDate] = useState<
    "immediate" | "next_cycle"
  >("immediate");
  const [notes, setNotes] = useState("");
  const [sendEmail, setSendEmail] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!subscription) return null;

  const daysRemaining = Math.ceil(
    (new Date(subscription.nextBillingDate).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const prorata =
    selectedPlan && selectedPlan !== subscription.plan
      ? calculateProrata(
          subscription.plan,
          selectedPlan,
          daysRemaining,
          subscription.billingCycle
        )
      : null;

  const handleConfirm = async () => {
    if (!selectedPlan) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onConfirm?.({
      newPlan: selectedPlan,
      effectiveDate,
      notes,
      sendEmail,
    });

    setIsSubmitting(false);
    onOpenChange(false);
    setStep(1);
    setSelectedPlan(null);
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Changer de plan</DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s ? <CheckCircle2Icon className="h-5 w-5" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 ${step > s ? "bg-primary" : "bg-muted"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Current Info */}
        {step === 1 && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations actuelles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    {subscription.tenantLogo && (
                      <AvatarImage src={subscription.tenantLogo} />
                    )}
                    <AvatarFallback>
                      {subscription.tenantName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">
                      {subscription.tenantName}
                    </h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline">{subscription.plan}</Badge>
                      <Badge>
                        {formatCurrency(subscription.price, locale)}/mois
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Élèves</p>
                    <p className="text-lg font-medium">
                      {subscription.studentsCount}
                      {subscription.studentsLimit > 0
                        ? ` / ${subscription.studentsLimit}`
                        : " / Illimité"}
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Stockage</p>
                    <p className="text-lg font-medium">
                      {subscription.storageUsed.toFixed(1)} /{" "}
                      {subscription.storageQuota} Go
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Prochaine facturation
                  </p>
                  <p className="text-lg font-medium">
                    {new Date(subscription.nextBillingDate).toLocaleDateString(
                      `${locale}-CH`
                    )}{" "}
                    ({daysRemaining} jours)
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Fonctionnalités</p>
                  <ul className="space-y-1">
                    {PLAN_FEATURES[subscription.plan].modules.map(
                      (module, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle2Icon className="h-4 w-4 text-green-600" />

                          {module}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)}>Suivant</Button>
            </div>
          </div>
        )}

        {/* Step 2: Select New Plan */}
        {step === 2 && (
          <div className="space-y-4">
            <RadioGroup
              value={selectedPlan || ""}
              onValueChange={(v) => setSelectedPlan(v as PlanType)}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(Object.keys(PLAN_FEATURES) as PlanType[]).map((plan) => {
                  const features = PLAN_FEATURES[plan];
                  const isCurrent = plan === subscription.plan;
                  return (
                    <Card
                      key={plan}
                      className={`cursor-pointer transition-all ${
                        selectedPlan === plan
                          ? "border-primary border-2"
                          : "hover:border-primary/50"
                      } ${isCurrent ? "opacity-50" : ""}`}
                      onClick={() => !isCurrent && setSelectedPlan(plan)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>{plan}</CardTitle>
                          <RadioGroupItem value={plan} disabled={isCurrent} />
                        </div>
                        {isCurrent && (
                          <Badge variant="secondary">Plan actuel</Badge>
                        )}
                        {plan === "Pro" && !isCurrent && (
                          <Badge>Populaire</Badge>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-3xl font-bold">
                            {formatCurrency(features.price, locale)}
                          </p>
                          <p className="text-sm text-muted-foreground">/mois</p>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li>
                            {features.students === -1
                              ? "Illimité"
                              : features.students}{" "}
                            élèves
                          </li>
                          <li>{features.storage} Go stockage</li>
                          <li>{features.support} support</li>
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </RadioGroup>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Retour
              </Button>
              <Button onClick={() => setStep(3)} disabled={!selectedPlan}>
                Suivant
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Preview & Confirm */}
        {step === 3 && selectedPlan && (
          <div className="space-y-4">
            {prorata && effectiveDate === "immediate" && (
              <Alert>
                <InfoIcon className="h-4 w-4" />

                <AlertDescription>
                  <p className="font-medium mb-2">Calcul prorata :</p>
                  <ul className="space-y-1 text-sm">
                    <li>
                      Crédit plan actuel :{" "}
                      {formatCurrency(prorata.credit, locale)}
                    </li>
                    <li>
                      Nouveau coût prorata :{" "}
                      {formatCurrency(prorata.newCost, locale)}
                    </li>
                    <li className="font-bold">
                      Différence à payer :{" "}
                      {formatCurrency(Math.max(0, prorata.difference), locale)}
                    </li>
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Date d'effet</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={effectiveDate}
                  onValueChange={(v) =>
                    setEffectiveDate(v as "immediate" | "next_cycle")
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="immediate" id="immediate" />

                    <Label htmlFor="immediate">Immédiat (avec prorata)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="next_cycle" id="next_cycle" />

                    <Label htmlFor="next_cycle">
                      Prochain cycle (
                      {new Date(
                        subscription.nextBillingDate
                      ).toLocaleDateString(`${locale}-CH`)}
                      )
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <div>
              <Label htmlFor="notes">Notes (raison du changement)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Expliquez la raison du changement..."
                className="mt-2"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="sendEmail"
                checked={sendEmail}
                onCheckedChange={(checked) => setSendEmail(checked as boolean)}
              />

              <Label htmlFor="sendEmail">
                Envoyer email de notification au tenant
              </Label>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Retour
              </Button>
              <Button onClick={handleConfirm} disabled={isSubmitting}>
                {isSubmitting ? "Mise à jour..." : "Confirmer le changement"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
