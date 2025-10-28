/**
 * VIAMENTOR - Create Promotion Wizard
 * Wizard création promotion avec conditions avancées
 */

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  CheckIcon,
  PercentIcon,
  TagIcon,
  TargetIcon,
  CalendarIcon,
} from "lucide-react";
import type {
  PromotionType,
  LicenseCategory,
} from "@/viamentor/data/viamentor-pricing-data";
import {
  getPricingTranslation,
  formatCurrency,
  type PricingLocale,
} from "@/viamentor/data/viamentor-pricing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PromotionFormData {
  code: string;
  type: PromotionType;
  value: number;
  applicableTo: ("lessons" | "packages" | "courses" | "all")[];
  startDate: string;
  endDate: string;
  maxUsages: number | null;
  minPurchaseAmount: number | null;
  newStudentsOnly: boolean;
  categories: LicenseCategory[];
}

interface CreatePromotionWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale?: PricingLocale;
  onSuccess?: (promotionData: PromotionFormData) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CreatePromotionWizard({
  open,
  onOpenChange,
  locale = "fr",
  onSuccess,
}: CreatePromotionWizardProps) {
  const t = getPricingTranslation(locale);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PromotionFormData>({
    code: "",
    type: "percentage",
    value: 10,
    applicableTo: ["all"],
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    maxUsages: null,
    minPurchaseAmount: null,
    newStudentsOnly: false,
    categories: [],
  });

  const steps = [
    { number: 1, title: "Code & Type", icon: TagIcon },
    { number: 2, title: "Conditions", icon: TargetIcon },
    { number: 3, title: "Récapitulatif", icon: CheckIcon },
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onSuccess?.(formData);
    onOpenChange(false);
    // Reset form
    setStep(1);
    setFormData({
      code: "",
      type: "percentage",
      value: 10,
      applicableTo: ["all"],
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      maxUsages: null,
      minPurchaseAmount: null,
      newStudentsOnly: false,
      categories: [],
    });
  };

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code });
  };

  const applicableToOptions = [
    { value: "lessons", label: t.applicableToOptions.lessons },
    { value: "packages", label: t.applicableToOptions.packages },
    { value: "courses", label: t.applicableToOptions.courses },
    { value: "all", label: t.applicableToOptions.all },
  ];

  const categoryOptions: LicenseCategory[] = ["B", "A", "BE", "A1", "BPT"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <PercentIcon className="h-5 w-5" />

            {t.createPromotion}
          </DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((s, idx) => (
            <div key={s.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    step >= s.number
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  {step > s.number ? (
                    <CheckIcon className="h-5 w-5" />
                  ) : (
                    <s.icon className="h-5 w-5" />
                  )}
                </div>
                <span className="text-xs mt-1 text-center">{s.title}</span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 transition-colors ${
                    step > s.number ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Code & Type */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">{t.promoCode} *</Label>
              <div className="flex gap-2">
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="Ex: BIENVENUE2024"
                  className="uppercase"
                />

                <Button type="button" variant="outline" onClick={generateCode}>
                  Générer
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">{t.promoType} *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value as PromotionType })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">
                      {t.promotionTypes.percentage}
                    </SelectItem>
                    <SelectItem value="fixed_amount">
                      {t.promotionTypes.fixed_amount}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">
                  {formData.type === "percentage"
                    ? "Valeur (%)"
                    : "Valeur (CHF)"}{" "}
                  *
                </Label>
                <Input
                  id="value"
                  type="number"
                  min={0}
                  max={formData.type === "percentage" ? 100 : 10000}
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      value: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">{t.startDate} *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">{t.endDate} *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Applicable à *</Label>
              <div className="grid grid-cols-2 gap-3">
                {applicableToOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`applicable-${option.value}`}
                      checked={formData.applicableTo.includes(
                        option.value as any
                      )}
                      onCheckedChange={(checked) => {
                        if (option.value === "all") {
                          setFormData({
                            ...formData,
                            applicableTo: checked ? ["all"] : [],
                          });
                        } else {
                          const newApplicableTo = checked
                            ? [
                                ...formData.applicableTo.filter(
                                  (v) => v !== "all"
                                ),
                                option.value as any,
                              ]
                            : formData.applicableTo.filter(
                                (v) => v !== option.value
                              );
                          setFormData({
                            ...formData,
                            applicableTo: newApplicableTo,
                          });
                        }
                      }}
                    />

                    <Label
                      htmlFor={`applicable-${option.value}`}
                      className="cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Conditions */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxUsages">{t.maxUsages}</Label>
              <Input
                id="maxUsages"
                type="number"
                min={1}
                value={formData.maxUsages || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxUsages: parseInt(e.target.value) || null,
                  })
                }
                placeholder="Illimité"
              />

              <p className="text-xs text-muted-foreground">
                Laissez vide pour un nombre illimité d'utilisations
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="minPurchase">Montant minimum d'achat (CHF)</Label>
              <Input
                id="minPurchase"
                type="number"
                min={0}
                value={formData.minPurchaseAmount || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minPurchaseAmount: parseFloat(e.target.value) || null,
                  })
                }
                placeholder="Aucun minimum"
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="newStudents">Nouveaux élèves uniquement</Label>
                <p className="text-xs text-muted-foreground">
                  Réserver cette promotion aux nouveaux inscrits
                </p>
              </div>
              <Switch
                id="newStudents"
                checked={formData.newStudentsOnly}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, newStudentsOnly: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Catégories spécifiques (optionnel)</Label>
              <div className="grid grid-cols-3 gap-3">
                {categoryOptions.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={formData.categories.includes(category)}
                      onCheckedChange={(checked) => {
                        const newCategories = checked
                          ? [...formData.categories, category]
                          : formData.categories.filter((c) => c !== category);
                        setFormData({ ...formData, categories: newCategories });
                      }}
                    />

                    <Label
                      htmlFor={`category-${category}`}
                      className="cursor-pointer"
                    >
                      {t.categories[category]}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Laissez vide pour appliquer à toutes les catégories
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Summary */}
        {step === 3 && (
          <div className="space-y-4">
            <Card className="p-4 bg-muted/50">
              <h3 className="font-semibold mb-3">
                Récapitulatif de la promotion
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Code:</span>
                  <Badge variant="secondary" className="font-mono">
                    {formData.code}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{t.promotionTypes[formData.type]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valeur:</span>
                  <span className="font-semibold text-primary">
                    {formData.type === "percentage"
                      ? `${formData.value}%`
                      : formatCurrency(formData.value, locale)}
                  </span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Période:</span>
                  <span>
                    {new Date(formData.startDate).toLocaleDateString()} -{" "}
                    {new Date(formData.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Applicable à:</span>
                  <div className="flex gap-1">
                    {formData.applicableTo.map((item) => (
                      <Badge key={item} variant="outline" className="text-xs">
                        {t.applicableToOptions[item]}
                      </Badge>
                    ))}
                  </div>
                </div>

                {formData.maxUsages && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Utilisations max:
                    </span>
                    <span>{formData.maxUsages}</span>
                  </div>
                )}

                {formData.minPurchaseAmount && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Achat minimum:
                    </span>
                    <span>
                      {formatCurrency(formData.minPurchaseAmount, locale)}
                    </span>
                  </div>
                )}

                {formData.newStudentsOnly && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      Nouveaux élèves uniquement
                    </Badge>
                  </div>
                )}

                {formData.categories.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Catégories:</span>
                    <div className="flex gap-1">
                      {formData.categories.map((cat) => (
                        <Badge key={cat} variant="outline" className="text-xs">
                          {t.categories[cat]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-4 border-primary/50 bg-primary/5">
              <div className="text-sm text-primary">
                <p className="font-semibold mb-1">Exemple d'application:</p>
                <p>
                  Pour un achat de CHF 1'000.-:{" "}
                  <span className="font-semibold">
                    {formData.type === "percentage"
                      ? `Réduction de ${formatCurrency(1000 * (formData.value / 100), locale)}`
                      : `Réduction de ${formatCurrency(formData.value, locale)}`}
                  </span>
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.cancel}
          </Button>

          <div className="flex items-center gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Précédent
              </Button>
            )}
            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={
                  step === 1 &&
                  (!formData.code || formData.applicableTo.length === 0)
                }
              >
                Suivant
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!formData.code}>
                Créer la promotion
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
