/**
 * VIAMENTOR - Onboarding Step 5: Finalisation
 * Récapitulatif complet, consentements RGPD, CGU avec célébration joyeuse
 */

import {
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  type OnboardingData,
  type FinalizationData,
} from "@/viamentor/data/viamentor-onboarding-schemas";
import {
  type OnboardingLocale,
  ONBOARDING_I18N,
} from "@/viamentor/data/viamentor-onboarding-i18n";

interface FinalizationStepProps {
  data: Partial<FinalizationData>;
  allData: Partial<OnboardingData>;
  locale?: OnboardingLocale;
  onChange: (data: Partial<FinalizationData>) => void;
  onEditStep?: (step: number) => void;
}

export function FinalizationStep({
  data,
  allData,
  locale = "fr",
  onChange,
  onEditStep,
}: FinalizationStepProps) {
  const t = ONBOARDING_I18N[locale];
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter((s) => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  // Extract summary data
  const schoolInfo = allData.schoolInfo;
  const usersRoles = allData.usersRoles;
  const categoriesVehicles = allData.categoriesVehicles;
  const paymentConfig = allData.paymentConfig;

  const enabledCategories =
    categoriesVehicles?.categories?.filter((c) => c.enabled) || [];
  const vehiclesCount = categoriesVehicles?.quickVehicles?.length || 0;
  const usersCount = usersRoles?.invites?.length || 0;

  return (
    <div className="space-y-8">
      {/* Header with Celebration */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-yellow-500" />

          <h2 className="text-3xl font-bold">{t.step5.title}</h2>
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </div>
        <p className="text-lg text-muted-foreground">{t.step5.subtitle}</p>
      </div>

      {/* Summary Sections */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">{t.step5.summary.title}</h3>

        {/* School Info Summary */}
        <Collapsible
          open={expandedSections.includes("school")}
          onOpenChange={() => toggleSection("school")}
        >
          <div className="border border-border rounded-lg overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-accent/30 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{t.step5.summary.school}</div>
                  <div className="text-sm text-muted-foreground">
                    {schoolInfo?.name || "Non configuré"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditStep?.(1);
                  }}
                >
                  Modifier
                </Button>
                {expandedSections.includes("school") ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 space-y-2 bg-background border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Email:</span>{" "}
                    <span className="font-medium">{schoolInfo?.email}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Téléphone:</span>{" "}
                    <span className="font-medium">{schoolInfo?.phone}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Adresse:</span>{" "}
                    <span className="font-medium">
                      {schoolInfo?.address?.street}, {schoolInfo?.address?.zip}{" "}
                      {schoolInfo?.address?.city} ({schoolInfo?.address?.canton}
                      )
                    </span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Users Summary */}
        <Collapsible
          open={expandedSections.includes("users")}
          onOpenChange={() => toggleSection("users")}
        >
          <div className="border border-border rounded-lg overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-accent/30 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{t.step5.summary.users}</div>
                  <div className="text-sm text-muted-foreground">
                    {usersCount} utilisateur{usersCount > 1 ? "s" : ""} invité
                    {usersCount > 1 ? "s" : ""}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditStep?.(2);
                  }}
                >
                  Modifier
                </Button>
                {expandedSections.includes("users") ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 space-y-2 bg-background border-t border-border">
                {usersRoles?.invites?.map((invite, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-medium">{invite.email}</span>
                    <Badge variant="secondary">{invite.role}</Badge>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Categories Summary */}
        <Collapsible
          open={expandedSections.includes("categories")}
          onOpenChange={() => toggleSection("categories")}
        >
          <div className="border border-border rounded-lg overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-accent/30 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">
                    {t.step5.summary.categories}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {enabledCategories.length} catégorie
                    {enabledCategories.length > 1 ? "s" : ""} • {vehiclesCount}{" "}
                    véhicule{vehiclesCount > 1 ? "s" : ""}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditStep?.(3);
                  }}
                >
                  Modifier
                </Button>
                {expandedSections.includes("categories") ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 space-y-3 bg-background border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {enabledCategories.map((cat) => (
                    <Badge key={cat.category} variant="secondary">
                      {cat.category} - CHF {cat.price} / {cat.duration} min
                    </Badge>
                  ))}
                </div>
                {vehiclesCount > 0 && (
                  <div className="text-sm text-muted-foreground">
                    {vehiclesCount} véhicule{vehiclesCount > 1 ? "s" : ""}{" "}
                    configuré{vehiclesCount > 1 ? "s" : ""}
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Payment Summary */}
        <Collapsible
          open={expandedSections.includes("payment")}
          onOpenChange={() => toggleSection("payment")}
        >
          <div className="border border-border rounded-lg overflow-hidden">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-accent/30 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{t.step5.summary.payment}</div>
                  <div className="text-sm text-muted-foreground">
                    {paymentConfig?.invoicingEnabled
                      ? "Facturation activée"
                      : "Mode simplifié"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditStep?.(4);
                  }}
                >
                  Modifier
                </Button>
                {expandedSections.includes("payment") ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 space-y-2 bg-background border-t border-border">
                <div className="text-sm space-y-1">
                  {paymentConfig?.invoicingEnabled && (
                    <>
                      <div>
                        <span className="text-muted-foreground">IBAN:</span>{" "}
                        <span className="font-mono">{paymentConfig.iban}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Délai:</span>{" "}
                        <span className="font-medium">
                          {paymentConfig.paymentDeadlineDays} jours
                        </span>
                      </div>
                    </>
                  )}
                  <div>
                    <span className="text-muted-foreground">Méthodes:</span>{" "}
                    <span className="font-medium">
                      {paymentConfig?.paymentMethods?.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </div>

      {/* Legal Consents */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Consentements</h3>

        {/* Terms */}
        <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
          <Checkbox
            id="accept-terms"
            checked={data.acceptTerms || false}
            onCheckedChange={(checked) =>
              onChange({ ...data, acceptTerms: checked as boolean })
            }
          />

          <div className="flex-1">
            <Label
              htmlFor="accept-terms"
              className="font-medium cursor-pointer"
            >
              {t.step5.terms.accept} <span className="text-destructive">*</span>
            </Label>
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-xs"
              onClick={() => setShowTermsDialog(true)}
            >
              Lire les CGU
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>

        {/* Privacy */}
        <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
          <Checkbox
            id="accept-privacy"
            checked={data.acceptPrivacy || false}
            onCheckedChange={(checked) =>
              onChange({ ...data, acceptPrivacy: checked as boolean })
            }
          />

          <div className="flex-1">
            <Label
              htmlFor="accept-privacy"
              className="font-medium cursor-pointer"
            >
              {t.step5.terms.privacy}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Button
              variant="link"
              size="sm"
              className="h-auto p-0 text-xs"
              onClick={() => setShowPrivacyDialog(true)}
            >
              Lire la politique de confidentialité
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>

        {/* Data Processing */}
        <div className="flex items-start gap-3 p-4 border border-border rounded-lg bg-muted/30">
          <Checkbox
            id="data-processing"
            checked={data.dataProcessingConsent ?? true}
            onCheckedChange={(checked) =>
              onChange({ ...data, dataProcessingConsent: checked as boolean })
            }
          />

          <div className="flex-1">
            <Label
              htmlFor="data-processing"
              className="font-medium cursor-pointer"
            >
              {t.step5.terms.dataProcessing}
            </Label>
            <p className="text-xs text-muted-foreground mt-1">
              Conforme à la nLPD 2023 (nouvelle loi suisse sur la protection des
              données)
            </p>
          </div>
        </div>

        {/* Newsletter (Optional) */}
        <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
          <Checkbox
            id="newsletter"
            checked={data.newsletter || false}
            onCheckedChange={(checked) =>
              onChange({ ...data, newsletter: checked as boolean })
            }
          />

          <div className="flex-1">
            <Label htmlFor="newsletter" className="font-medium cursor-pointer">
              {t.step5.terms.newsletter}
            </Label>
            <p className="text-xs text-muted-foreground mt-1">
              Conseils, nouveautés et bonnes pratiques pour votre auto-école
            </p>
          </div>
        </div>
      </div>

      {/* Terms Dialog */}
      <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Conditions Générales d'Utilisation</DialogTitle>
            <DialogDescription>
              Viamentor - Dernière mise à jour : Janvier 2025
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert">
            <p>
              En utilisant Viamentor, vous acceptez les conditions suivantes...
            </p>
            <h3>1. Objet</h3>
            <p>Viamentor est une plateforme SaaS de gestion d'auto-école...</p>
            <h3>2. Responsabilités</h3>
            <p>L'utilisateur est responsable de la véracité des données...</p>
            {/* Add more terms content */}
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Dialog */}
      <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Politique de Confidentialité</DialogTitle>
            <DialogDescription>
              Protection de vos données personnelles
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert">
            <p>
              Viamentor s'engage à protéger vos données conformément à la nLPD
              2023...
            </p>
            <h3>Données collectées</h3>
            <p>Nous collectons uniquement les données nécessaires...</p>
            <h3>Utilisation des données</h3>
            <p>Vos données sont utilisées exclusivement pour...</p>
            {/* Add more privacy content */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
