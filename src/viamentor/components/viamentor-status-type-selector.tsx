/**
 * VIAMENTOR - Status Type Selector
 * RadioGroup visual cards pour sélection type statut moniteur
 *
 * Features:
 * - 3 options: Independent Solo / Independent Attached / Employee
 * - Visual cards avec icons et descriptions
 * - Responsive grid layout
 * - Hero UI styling
 */

"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { UserXIcon, UserCheckIcon, BriefcaseIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  InstructorStatusType,
  type InstructorStatusType as StatusType,
} from "@/viamentor/data/viamentor-instructor-status-schemas";
import type { InstructorStatusTranslations } from "@/viamentor/data/viamentor-instructor-status-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface StatusTypeSelectorProps {
  value: StatusType;
  onChange: (value: StatusType) => void;
  t: InstructorStatusTranslations;
  disabled?: boolean;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function StatusTypeSelector({
  value,
  onChange,
  t,
  disabled = false,
  className,
}: StatusTypeSelectorProps) {
  const options = [
    {
      value: InstructorStatusType.INDEPENDENT_SOLO,
      icon: UserXIcon,
      label: t.statusTypes.independentSolo.label,
      description: t.statusTypes.independentSolo.description,
    },
    {
      value: InstructorStatusType.INDEPENDENT_ATTACHED,
      icon: UserCheckIcon,
      label: t.statusTypes.independentAttached.label,
      description: t.statusTypes.independentAttached.description,
    },
    {
      value: InstructorStatusType.EMPLOYEE,
      icon: BriefcaseIcon,
      label: t.statusTypes.employee.label,
      description: t.statusTypes.employee.description,
    },
  ];

  return (
    <div className={cn("space-y-4", className)}>
      {/* Title */}
      <div className="space-y-1">
        <Label className="text-base font-semibold text-foreground">
          {t.statusTypes.title}
        </Label>
        <p className="text-sm text-muted-foreground">
          {t.statusTypes.required}
        </p>
      </div>

      {/* Radio Group */}
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as StatusType)}
        disabled={disabled}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.value;

          return (
            <label
              key={option.value}
              htmlFor={option.value}
              className={cn(
                "cursor-pointer transition-all",
                disabled && "cursor-not-allowed opacity-50"
              )}
            >
              <Card
                className={cn(
                  "relative p-6 h-full transition-all hover:shadow-md",
                  isSelected
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/50"
                )}
              >
                {/* Radio button */}
                <div className="absolute top-4 right-4">
                  <RadioGroupItem
                    value={option.value}
                    id={option.value}
                    className="h-5 w-5"
                  />
                </div>

                {/* Content */}
                <div className="space-y-4 pr-8">
                  {/* Icon */}
                  <div
                    className={cn(
                      "inline-flex p-3 rounded-lg transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Label */}
                  <div>
                    <div
                      className={cn(
                        "font-semibold text-base mb-2 transition-colors",
                        isSelected ? "text-primary" : "text-foreground"
                      )}
                    >
                      {option.label}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </div>
              </Card>
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
