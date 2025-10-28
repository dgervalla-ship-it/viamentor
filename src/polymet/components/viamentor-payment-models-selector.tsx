/**
 * VIAMENTOR - Payment Models Selector
 * Sélection modèle rémunération pour indépendant rattaché
 *
 * Modèles:
 * - Free: Gratuit 0% - Moniteur garde 100% CA
 * - Flat Fee: Forfait mensuel fixe
 * - Commission: Commission % variable sur CA
 */

"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { GiftIcon, CreditCardIcon, PercentIcon, InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PaymentModel,
  LIMITS,
  formatCommissionSplit,
  generateLessonExample,
  type PaymentModelConfig,
} from "@/polymet/data/viamentor-instructor-status-schemas";
import type { InstructorStatusTranslations } from "@/polymet/data/viamentor-instructor-status-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PaymentModelsSelectorProps {
  value: PaymentModelConfig;
  onChange: (value: PaymentModelConfig) => void;
  t: InstructorStatusTranslations;
  disabled?: boolean;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PaymentModelsSelector({
  value,
  onChange,
  t,
  disabled = false,
  className,
}: PaymentModelsSelectorProps) {
  const [lessonPrice] = useState(90); // Prix leçon pour exemple

  const models = [
    {
      value: PaymentModel.FREE,
      icon: GiftIcon,
      label: t.paymentModels.free.label,
      badge: t.paymentModels.free.badge,
      description: t.paymentModels.free.description,
    },
    {
      value: PaymentModel.FLAT_FEE,
      icon: CreditCardIcon,
      label: t.paymentModels.flatFee.label,
      description: t.paymentModels.flatFee.description,
    },
    {
      value: PaymentModel.COMMISSION,
      icon: PercentIcon,
      label: t.paymentModels.commission.label,
      description: t.paymentModels.commission.description,
    },
  ];

  const handleModelChange = (model: string) => {
    if (model === PaymentModel.FREE) {
      onChange({ model: PaymentModel.FREE });
    } else if (model === PaymentModel.FLAT_FEE) {
      onChange({
        model: PaymentModel.FLAT_FEE,
        monthlyAmount: 500,
        startDate: new Date(),
        autoDebit: false,
      });
    } else if (model === PaymentModel.COMMISSION) {
      onChange({
        model: PaymentModel.COMMISSION,
        commissionRate: 20,
      });
    }
  };

  return (
    <Card className={cn("p-6 space-y-6", className)}>
      {/* Title */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">
          {t.paymentModels.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t.paymentModels.subtitle}
        </p>
      </div>

      {/* Model Selection */}
      <RadioGroup
        value={value.model}
        onValueChange={handleModelChange}
        disabled={disabled}
        className="space-y-4"
      >
        {models.map((model) => {
          const Icon = model.icon;
          const isSelected = value.model === model.value;

          return (
            <label
              key={model.value}
              htmlFor={`model-${model.value}`}
              className={cn(
                "block cursor-pointer transition-all",
                disabled && "cursor-not-allowed opacity-50"
              )}
            >
              <Card
                className={cn(
                  "p-4 transition-all hover:shadow-sm",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Radio */}
                  <RadioGroupItem
                    value={model.value}
                    id={`model-${model.value}`}
                    className="mt-1"
                  />

                  {/* Icon */}
                  <div
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "font-semibold",
                          isSelected ? "text-primary" : "text-foreground"
                        )}
                      >
                        {model.label}
                      </span>
                      {model.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {model.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {model.description}
                    </p>
                  </div>
                </div>
              </Card>
            </label>
          );
        })}
      </RadioGroup>

      {/* Conditional Forms */}
      {value.model === PaymentModel.FLAT_FEE && (
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="monthly-amount">
              {t.paymentModels.flatFee.amountLabel}
            </Label>
            <Input
              id="monthly-amount"
              type="number"
              min={LIMITS.FLAT_FEE_MIN}
              max={LIMITS.FLAT_FEE_MAX}
              value={value.monthlyAmount}
              onChange={(e) =>
                onChange({ ...value, monthlyAmount: Number(e.target.value) })
              }
              placeholder={t.paymentModels.flatFee.amountPlaceholder}
              disabled={disabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="start-date">
              {t.paymentModels.flatFee.startDateLabel}
            </Label>
            <Input
              id="start-date"
              type="date"
              value={value.startDate.toISOString().split("T")[0]}
              onChange={(e) =>
                onChange({ ...value, startDate: new Date(e.target.value) })
              }
              disabled={disabled}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="auto-debit"
              checked={value.autoDebit}
              onCheckedChange={(checked) =>
                onChange({ ...value, autoDebit: checked as boolean })
              }
              disabled={disabled}
            />

            <div className="space-y-0.5">
              <Label htmlFor="auto-debit" className="cursor-pointer">
                {t.paymentModels.flatFee.autoDebitLabel}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t.paymentModels.flatFee.autoDebitDescription}
              </p>
            </div>
          </div>
        </div>
      )}

      {value.model === PaymentModel.COMMISSION && (
        <div className="space-y-4 pt-2">
          <div className="space-y-3">
            <Label>{t.paymentModels.commission.rateLabel}</Label>
            <Slider
              value={[value.commissionRate]}
              onValueChange={([rate]) =>
                onChange({ ...value, commissionRate: rate })
              }
              min={LIMITS.COMMISSION_MIN}
              max={LIMITS.COMMISSION_MAX}
              step={1}
              disabled={disabled}
              className="py-4"
            />

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {formatCommissionSplit(value.commissionRate).instructor}%{" "}
                {t.paymentModels.commission.instructorLabel}
              </span>
              <span className="font-semibold text-primary">
                {value.commissionRate}%
              </span>
              <span className="text-muted-foreground">
                {formatCommissionSplit(value.commissionRate).school}%{" "}
                {t.paymentModels.commission.schoolLabel}
              </span>
            </div>
          </div>

          {/* Example */}
          <Alert>
            <InfoIcon className="h-4 w-4" />

            <AlertDescription>
              <div className="space-y-2">
                <div className="font-medium">
                  {t.paymentModels.commission.exampleTitle}
                </div>
                <div className="text-sm">
                  {t.paymentModels.commission.exampleLesson}:{" "}
                  <span className="font-semibold">{lessonPrice} CHF</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    {t.paymentModels.commission.exampleInstructor}:{" "}
                    <span className="font-semibold text-primary">
                      {generateLessonExample(
                        lessonPrice,
                        value.commissionRate
                      ).instructorShare.toFixed(2)}{" "}
                      CHF
                    </span>
                  </div>
                  <div>
                    {t.paymentModels.commission.exampleSchool}:{" "}
                    <span className="font-semibold text-destructive">
                      {generateLessonExample(
                        lessonPrice,
                        value.commissionRate
                      ).schoolShare.toFixed(2)}{" "}
                      CHF
                    </span>
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">{t.paymentModels.notesLabel}</Label>
        <Textarea
          id="notes"
          value={value.notes || ""}
          onChange={(e) => onChange({ ...value, notes: e.target.value })}
          placeholder={t.paymentModels.notesPlaceholder}
          rows={3}
          maxLength={500}
          disabled={disabled}
        />

        <p className="text-xs text-muted-foreground text-right">
          {(value.notes || "").length}/500
        </p>
      </div>
    </Card>
  );
}
