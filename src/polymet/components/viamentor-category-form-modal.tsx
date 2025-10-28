/**
 * VIAMENTOR - Category Form Modal
 * Dialog modal création/édition catégorie de cours avec validation
 */

"use client";

import { useState, useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";
import { AlertCircleIcon } from "lucide-react";
import type {
  CourseCategory,
  CourseCategoryFormData,
  CourseCategoryLocale,
} from "@/polymet/data/viamentor-courses-categories-data";
import { coursesCategoriesI18n } from "@/polymet/data/viamentor-courses-categories-data";

// ============================================================================
// TYPES
// ============================================================================

interface CategoryFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: CourseCategory | null;
  existingCodes: string[];
  locale?: CourseCategoryLocale;
  onSubmit: (data: CourseCategoryFormData) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function CategoryFormModal({
  open,
  onOpenChange,
  category,
  existingCodes,
  locale = "fr",
  onSubmit,
}: CategoryFormModalProps) {
  const t = coursesCategoriesI18n[locale];
  const isEdit = !!category;

  // Form state
  const [formData, setFormData] = useState<CourseCategoryFormData>({
    name: "",
    code: "",
    color: "#FFC107",
    description: "",
    totalDuration: 8,
    defaultPrice: 0,
    active: true,
    order: 1,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CourseCategoryFormData, string>>
  >({});

  // Reset form when category changes
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        code: category.code,
        color: category.color,
        description: category.description || "",
        totalDuration: category.totalDuration,
        defaultPrice: category.defaultPrice,
        active: category.active,
        order: category.order,
      });
    } else {
      setFormData({
        name: "",
        code: "",
        color: "#FFC107",
        description: "",
        totalDuration: 8,
        defaultPrice: 0,
        active: true,
        order: 1,
      });
    }
    setErrors({});
  }, [category, open]);

  // Validation
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CourseCategoryFormData, string>> = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = t.form.name.required;
    }

    // Code
    if (!formData.code.trim()) {
      newErrors.code = t.form.code.required;
    } else if (!/^[A-Z]{2,4}$/.test(formData.code)) {
      newErrors.code = t.form.code.pattern;
    } else if (
      existingCodes.includes(formData.code) &&
      (!category || category.code !== formData.code)
    ) {
      newErrors.code = t.form.code.unique;
    }

    // Duration
    if (formData.totalDuration <= 0) {
      newErrors.totalDuration = t.form.duration.positive;
    }

    // Price
    if (formData.defaultPrice < 0) {
      newErrors.defaultPrice = t.form.price.positive;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      onOpenChange(false);
    }
  };

  // Handle field change
  const handleChange = (field: keyof CourseCategoryFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[700px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-foreground">
            {isEdit ? t.form.title.edit : t.form.title.create}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Name */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              {t.form.name.label}
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder={t.form.name.placeholder}
              className={errors.name ? "border-destructive" : ""}
            />

            {errors.name && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircleIcon className="w-4 h-4" />

                {errors.name}
              </p>
            )}
          </div>

          {/* Code */}
          <div className="space-y-2">
            <Label
              htmlFor="code"
              className="text-sm font-medium text-foreground"
            >
              {t.form.code.label}
            </Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) =>
                handleChange("code", e.target.value.toUpperCase())
              }
              placeholder={t.form.code.placeholder}
              maxLength={4}
              className={errors.code ? "border-destructive" : ""}
            />

            {errors.code && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircleIcon className="w-4 h-4" />

                {errors.code}
              </p>
            )}
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label
              htmlFor="color"
              className="text-sm font-medium text-foreground"
            >
              {t.form.color.label}
            </Label>
            <div className="flex items-center gap-3">
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => handleChange("color", e.target.value)}
                className="w-20 h-10 cursor-pointer"
              />

              <div
                className="w-10 h-10 rounded border border-border"
                style={{ backgroundColor: formData.color }}
              />

              <Input
                value={formData.color}
                onChange={(e) => handleChange("color", e.target.value)}
                placeholder={t.form.color.placeholder}
                className="flex-1"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-foreground"
            >
              {t.form.description.label}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder={t.form.description.placeholder}
              maxLength={300}
              rows={3}
            />

            <p className="text-xs text-muted-foreground">
              {t.form.description.help}
            </p>
          </div>

          {/* Duration & Price */}
          <div className="grid grid-cols-2 gap-4">
            {/* Duration */}
            <div className="space-y-2">
              <Label
                htmlFor="duration"
                className="text-sm font-medium text-foreground"
              >
                {t.form.duration.label}
              </Label>
              <Input
                id="duration"
                type="number"
                step="0.5"
                min="0"
                value={formData.totalDuration}
                onChange={(e) =>
                  handleChange("totalDuration", parseFloat(e.target.value) || 0)
                }
                placeholder={t.form.duration.placeholder}
                className={errors.totalDuration ? "border-destructive" : ""}
              />

              {errors.totalDuration && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircleIcon className="w-4 h-4" />

                  {errors.totalDuration}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label
                htmlFor="price"
                className="text-sm font-medium text-foreground"
              >
                {t.form.price.label}
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.defaultPrice}
                onChange={(e) =>
                  handleChange("defaultPrice", parseFloat(e.target.value) || 0)
                }
                placeholder={t.form.price.placeholder}
                className={errors.defaultPrice ? "border-destructive" : ""}
              />

              {errors.defaultPrice && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircleIcon className="w-4 h-4" />

                  {errors.defaultPrice}
                </p>
              )}
            </div>
          </div>

          {/* Active */}
          <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/50">
            <div className="space-y-0.5">
              <Label
                htmlFor="active"
                className="text-sm font-medium text-foreground"
              >
                {t.form.active.label}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t.form.active.help}
              </p>
            </div>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => handleChange("active", checked)}
            />
          </div>

          {/* Order */}
          <div className="space-y-2">
            <Label
              htmlFor="order"
              className="text-sm font-medium text-foreground"
            >
              {t.form.order.label}
            </Label>
            <Input
              id="order"
              type="number"
              min="1"
              value={formData.order}
              onChange={(e) =>
                handleChange("order", parseInt(e.target.value) || 1)
              }
              placeholder={t.form.order.placeholder}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t.form.cancel}
            </Button>
            <Button
              type="submit"
              className="bg-primary text-primary-foreground"
            >
              {t.form.save}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
