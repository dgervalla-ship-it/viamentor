/**
 * VIAMENTOR - Create Package Wizard
 * Wizard création forfait combiné avec leçons + services
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
import { Textarea } from "@/components/ui/textarea";
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
import {
  CheckIcon,
  PackageIcon,
  ShoppingCartIcon,
  SparklesIcon,
} from "lucide-react";
import type {
  LicenseCategory,
  Product,
} from "@/polymet/data/viamentor-pricing-data";
import {
  mockProducts,
  mockLessonPrices,
  calculatePackageSavings,
} from "@/polymet/data/viamentor-pricing-data";
import {
  getPricingTranslation,
  formatCurrency,
  type PricingLocale,
} from "@/polymet/data/viamentor-pricing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PackageFormData {
  name: string;
  description: string;
  category: LicenseCategory | "all";
  lessonCount: number;
  includedProducts: string[];
  validityMonths: number | null;
  discountPercentage: number;
}

interface CreatePackageWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale?: PricingLocale;
  onSuccess?: (packageData: PackageFormData) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CreatePackageWizard({
  open,
  onOpenChange,
  locale = "fr",
  onSuccess,
}: CreatePackageWizardProps) {
  const t = getPricingTranslation(locale);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PackageFormData>({
    name: "",
    description: "",
    category: "B",
    lessonCount: 10,
    includedProducts: [],
    validityMonths: 12,
    discountPercentage: 10,
  });

  const steps = [
    { number: 1, title: "Informations", icon: PackageIcon },
    { number: 2, title: "Services inclus", icon: ShoppingCartIcon },
    { number: 3, title: "Récapitulatif", icon: SparklesIcon },
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
      name: "",
      description: "",
      category: "B",
      lessonCount: 10,
      includedProducts: [],
      validityMonths: 12,
      discountPercentage: 10,
    });
  };

  // Calculate prices
  const lessonPrice =
    mockLessonPrices.find((lp) => lp.category === formData.category)
      ?.price45min || 90;
  const productsTotal = formData.includedProducts.reduce((sum, productId) => {
    const product = mockProducts.find((p) => p.id === productId);
    return sum + (product?.price || 0);
  }, 0);
  const normalTotal = formData.lessonCount * lessonPrice + productsTotal;
  const discountedTotal = normalTotal * (1 - formData.discountPercentage / 100);
  const savings = normalTotal - discountedTotal;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <PackageIcon className="h-5 w-5" />

            {t.createPackage}
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

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t.packageName} *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ex: Pack Complet Permis B"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t.description}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Description du forfait..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">{t.category} *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      category: value as LicenseCategory | "all",
                    })
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(t.categories).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lessonCount">{t.lessonCount} *</Label>
                <Input
                  id="lessonCount"
                  type="number"
                  min={1}
                  max={50}
                  value={formData.lessonCount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      lessonCount: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="validityMonths">{t.validityMonths}</Label>
                <Input
                  id="validityMonths"
                  type="number"
                  min={1}
                  max={36}
                  value={formData.validityMonths || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      validityMonths: parseInt(e.target.value) || null,
                    })
                  }
                  placeholder={t.unlimited}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">Remise (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min={0}
                  max={50}
                  value={formData.discountPercentage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discountPercentage: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Included Products */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Sélectionnez les services à inclure dans ce forfait combiné
            </p>

            <div className="space-y-2">
              {mockProducts.map((product) => (
                <Card key={product.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={product.id}
                      checked={formData.includedProducts.includes(product.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            includedProducts: [
                              ...formData.includedProducts,
                              product.id,
                            ],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            includedProducts: formData.includedProducts.filter(
                              (id) => id !== product.id
                            ),
                          });
                        }
                      }}
                    />

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor={product.id}
                          className="font-medium cursor-pointer"
                        >
                          {product.name}
                        </Label>
                        <span className="font-semibold">
                          {formatCurrency(product.price, locale)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {product.isMandatory && (
                          <Badge variant="secondary" className="text-xs">
                            {t.mandatory}
                          </Badge>
                        )}
                        {product.durationHours && (
                          <span className="text-xs text-muted-foreground">
                            {product.durationHours}h
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Summary */}
        {step === 3 && (
          <div className="space-y-4">
            <Card className="p-4 bg-muted/50">
              <h3 className="font-semibold mb-3">Récapitulatif du forfait</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nom:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Catégorie:</span>
                  <span>{t.categories[formData.category]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Nombre de leçons:
                  </span>
                  <span>
                    {formData.lessonCount} ×{" "}
                    {formatCurrency(lessonPrice, locale)}
                  </span>
                </div>

                {formData.includedProducts.length > 0 && (
                  <>
                    <Separator className="my-2" />

                    <div className="font-medium">Services inclus:</div>
                    {formData.includedProducts.map((productId) => {
                      const product = mockProducts.find(
                        (p) => p.id === productId
                      );
                      if (!product) return null;
                      return (
                        <div
                          key={productId}
                          className="flex justify-between pl-4"
                        >
                          <span className="text-muted-foreground">
                            {product.name}
                          </span>
                          <span>{formatCurrency(product.price, locale)}</span>
                        </div>
                      );
                    })}
                  </>
                )}

                <Separator className="my-2" />

                <div className="flex justify-between font-medium">
                  <span>Prix normal total:</span>
                  <span>{formatCurrency(normalTotal, locale)}</span>
                </div>
                <div className="flex justify-between text-destructive">
                  <span>Remise ({formData.discountPercentage}%):</span>
                  <span>-{formatCurrency(savings, locale)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary">
                  <span>Prix forfait:</span>
                  <span>{formatCurrency(discountedTotal, locale)}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-primary/50 bg-primary/5">
              <div className="flex items-center gap-2 text-primary">
                <SparklesIcon className="h-5 w-5" />

                <span className="font-semibold">
                  Économie de {formatCurrency(savings, locale)} (
                  {Math.round((savings / normalTotal) * 100)}%)
                </span>
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
                disabled={step === 1 && !formData.name}
              >
                Suivant
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!formData.name}>
                Créer le forfait
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
