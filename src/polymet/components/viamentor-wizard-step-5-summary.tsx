/**
 * VIAMENTOR Tenant Wizard - Step 5: Summary
 *
 * Récapitulatif final avec calcul coût total
 *
 * @module components/viamentor-wizard-step-5-summary
 * @version 1.0.0
 */

import {
  SchoolInfoData,
  AdminUserData,
  PlanBillingData,
  ConfigurationData,
  calculateMonthlyCost,
  PLAN_PRICING,
  MODULE_PRICING,
} from "@/polymet/data/viamentor-tenant-wizard-schemas";
import { getCantonName } from "@/polymet/data/viamentor-swiss-cantons";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, EditIcon } from "lucide-react";
import { useState, useEffect } from "react";

interface Step5SummaryProps {
  schoolInfo?: Partial<SchoolInfoData>;
  adminUser?: Partial<AdminUserData>;
  planBilling?: Partial<PlanBillingData>;
  configuration?: Partial<ConfigurationData>;
  acceptTerms: boolean;
  onAcceptTermsChange: (accepted: boolean) => void;
  onValidationChange: (isValid: boolean) => void;
  onEditStep?: (step: number) => void;
}

export function Step5Summary({
  schoolInfo,
  adminUser,
  planBilling,
  configuration,
  acceptTerms,
  onAcceptTermsChange,
  onValidationChange,
  onEditStep,
}: Step5SummaryProps) {
  // Notify parent of validation state
  useEffect(() => {
    onValidationChange(acceptTerms);
  }, [acceptTerms, onValidationChange]);

  const cost = calculateMonthlyCost({
    plan: (planBilling?.plan || "Free") as "Free" | "Pro" | "Enterprise",
    modules: configuration?.modules || {
      geolocation: false,
      smsNotifications: false,
      accountingIntegration: false,
      qrBill: false,
      bankReconciliation: false,
    },
    storageQuota: configuration?.storageQuota || 100,
  });

  const enabledModules = Object.entries(configuration?.modules || {})
    .filter(([_, enabled]) => enabled)
    .map(([key]) => key as keyof typeof MODULE_PRICING);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Récapitulatif</h2>
        <p className="text-muted-foreground">
          Vérifiez les informations avant de créer l'auto-école
        </p>
      </div>

      {/* Summary Accordion */}
      <Accordion
        type="multiple"
        defaultValue={["school", "admin", "plan", "config"]}
        className="space-y-2"
      >
        {/* School Info */}
        <AccordionItem value="school">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center justify-between w-full pr-4">
              <span className="font-semibold">Informations de l'école</span>
              {onEditStep && (
                <EditIcon
                  className="h-4 w-4 text-muted-foreground hover:text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditStep(0);
                  }}
                />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Nom</Label>
                <p className="font-medium">{schoolInfo?.name || "—"}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Canton</Label>
                <p className="font-medium">
                  {schoolInfo?.canton
                    ? getCantonName(schoolInfo.canton, "fr")
                    : "—"}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Adresse</Label>
                <p className="font-medium">{schoolInfo?.address || "—"}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Ville</Label>
                <p className="font-medium">
                  {schoolInfo?.postalCode} {schoolInfo?.city || "—"}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <p className="font-medium">{schoolInfo?.email || "—"}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Téléphone</Label>
                <p className="font-medium">{schoolInfo?.phone || "—"}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Admin User */}
        <AccordionItem value="admin">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center justify-between w-full pr-4">
              <span className="font-semibold">Administrateur</span>
              {onEditStep && (
                <EditIcon
                  className="h-4 w-4 text-muted-foreground hover:text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditStep(1);
                  }}
                />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-muted-foreground">Nom complet</Label>
                <p className="font-medium">
                  {adminUser?.firstName} {adminUser?.lastName || "—"}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <p className="font-medium">{adminUser?.email || "—"}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Langue</Label>
                <p className="font-medium">
                  {adminUser?.locale?.toUpperCase() || "—"}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Email bienvenue</Label>
                <p className="font-medium">
                  {adminUser?.sendWelcomeEmail ? "Oui" : "Non"}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Plan & Billing */}
        <AccordionItem value="plan">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center justify-between w-full pr-4">
              <span className="font-semibold">Plan & Facturation</span>
              {onEditStep && (
                <EditIcon
                  className="h-4 w-4 text-muted-foreground hover:text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditStep(2);
                  }}
                />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 text-sm">
              <div>
                <Label className="text-muted-foreground">
                  Plan sélectionné
                </Label>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-medium">{planBilling?.plan || "—"}</p>
                  {planBilling?.freeTrial && (
                    <Badge variant="secondary">Essai 30j</Badge>
                  )}
                </div>
              </div>
              {(planBilling?.plan === "Pro" ||
                planBilling?.plan === "Enterprise") && (
                <>
                  <div>
                    <Label className="text-muted-foreground">
                      Raison sociale
                    </Label>
                    <p className="font-medium">
                      {planBilling?.billingName || "—"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">IBAN</Label>
                    <p className="font-medium font-mono text-xs">
                      {planBilling?.iban || "—"}
                    </p>
                  </div>
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Configuration */}
        <AccordionItem value="config">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center justify-between w-full pr-4">
              <span className="font-semibold">Configuration</span>
              {onEditStep && (
                <EditIcon
                  className="h-4 w-4 text-muted-foreground hover:text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditStep(3);
                  }}
                />
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 text-sm">
              <div>
                <Label className="text-muted-foreground">Modules activés</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {enabledModules.length > 0 ? (
                    enabledModules.map((module) => (
                      <Badge key={module} variant="secondary">
                        {module}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Aucun</p>
                  )}
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Sauvegarde</Label>
                <p className="font-medium">
                  {configuration?.backupFrequency || "—"}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Stockage</Label>
                <p className="font-medium">{configuration?.storageQuota} GB</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Cost Summary */}
      <Card className="border-primary/50">
        <CardHeader>
          <CardTitle>Estimation du coût mensuel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Plan de base</span>
            <span className="font-medium">{cost.basePlan} CHF</span>
          </div>
          {cost.modules > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span>Modules add-ons</span>
              <span className="font-medium">{cost.modules} CHF</span>
            </div>
          )}
          {cost.storage > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span>Stockage supplémentaire</span>
              <span className="font-medium">{cost.storage.toFixed(2)} CHF</span>
            </div>
          )}
          <Separator />

          <div className="flex items-center justify-between text-sm">
            <span>Sous-total HT</span>
            <span className="font-medium">{cost.subtotal.toFixed(2)} CHF</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>TVA (8.1%)</span>
            <span className="font-medium">{cost.vat.toFixed(2)} CHF</span>
          </div>
          <Separator />

          <div className="flex items-center justify-between text-lg font-bold">
            <span>Total TTC</span>
            <span className="text-primary">{cost.total.toFixed(2)} CHF</span>
          </div>
          <Alert>
            <InfoIcon className="h-4 w-4" />

            <AlertDescription className="text-xs">
              Facturation mensuelle par prélèvement automatique sur l'IBAN
              fourni
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Terms Acceptance */}
      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="acceptTerms"
            checked={acceptTerms}
            onCheckedChange={(checked) =>
              onAcceptTermsChange(checked as boolean)
            }
          />

          <Label
            htmlFor="acceptTerms"
            className="cursor-pointer leading-relaxed"
          >
            J'ai vérifié toutes les informations et j'accepte les{" "}
            <a href="#" className="text-primary hover:underline">
              Conditions Générales de Vente
            </a>
          </Label>
        </div>
        {!acceptTerms && (
          <p className="text-sm text-destructive">
            Vous devez accepter les CGV pour continuer
          </p>
        )}
      </div>
    </div>
  );
}
