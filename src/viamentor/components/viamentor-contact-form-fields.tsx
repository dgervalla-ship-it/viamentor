/**
 * VIAMENTOR - Contact Form Fields Component
 * Champs formulaire avec validation temps réel
 */

"use client";

import { useState } from "react";
import {
  contactPublicTranslations,
  type ContactPublicLocale,
} from "@/viamentor/data/viamentor-contact-public-i18n";
import {
  validateEmail,
  validatePhone,
  validateName,
  formatPhone,
  getCategoryLabel,
  type LeadCategory,
  type LeadFormData,
} from "@/viamentor/data/viamentor-contact-public-data";
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
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

interface ContactFormFieldsProps {
  locale?: ContactPublicLocale;
  data: Partial<LeadFormData>;
  errors: Record<string, string>;
  onChange: (field: keyof LeadFormData, value: any) => void;
  onBlur?: (field: keyof LeadFormData) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ContactFormFields({
  locale = "fr",
  data,
  errors,
  onChange,
  onBlur,
}: ContactFormFieldsProps) {
  const t = contactPublicTranslations[locale];
  const [messageLength, setMessageLength] = useState(data.message?.length || 0);

  const handlePhoneChange = (value: string) => {
    // Auto-format phone number
    const formatted = formatPhone(value);
    onChange("phone", formatted);
  };

  const handleMessageChange = (value: string) => {
    if (value.length <= 500) {
      setMessageLength(value.length);
      onChange("message", value);
    }
  };

  const categories: LeadCategory[] = [
    "carB",
    "motoA",
    "trailerBE",
    "motoLightA1",
    "professionalBPT",
    "awarenessTraining",
    "firstAid",
    "other",
  ];

  return (
    <div className="space-y-6">
      {/* Grid 2 cols responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-foreground">
            {t.firstName} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder={t.firstNamePlaceholder}
            value={data.firstName || ""}
            onChange={(e) => onChange("firstName", e.target.value)}
            onBlur={() => onBlur?.("firstName")}
            className={cn(
              errors.firstName &&
                "border-destructive focus-visible:ring-destructive"
            )}
            maxLength={50}
            required
          />

          {errors.firstName && (
            <p className="text-sm text-destructive animate-shake">
              {errors.firstName}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-foreground">
            {t.lastName} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder={t.lastNamePlaceholder}
            value={data.lastName || ""}
            onChange={(e) => onChange("lastName", e.target.value)}
            onBlur={() => onBlur?.("lastName")}
            className={cn(
              errors.lastName &&
                "border-destructive focus-visible:ring-destructive"
            )}
            maxLength={50}
            required
          />

          {errors.lastName && (
            <p className="text-sm text-destructive animate-shake">
              {errors.lastName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            {t.email} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder={t.emailPlaceholder}
            value={data.email || ""}
            onChange={(e) => onChange("email", e.target.value)}
            onBlur={() => onBlur?.("email")}
            className={cn(
              errors.email &&
                "border-destructive focus-visible:ring-destructive"
            )}
            required
          />

          {errors.email && (
            <p className="text-sm text-destructive animate-shake">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground">
            {t.phone} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder={t.phonePlaceholder}
            value={data.phone || ""}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onBlur={() => onBlur?.("phone")}
            className={cn(
              errors.phone &&
                "border-destructive focus-visible:ring-destructive"
            )}
            required
          />

          {errors.phone && (
            <p className="text-sm text-destructive animate-shake">
              {errors.phone}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Format: +41 XX XXX XX XX
          </p>
        </div>
      </div>

      {/* Category - Full width */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-foreground">
          {t.category} <span className="text-destructive">*</span>
        </Label>
        <Select
          value={data.category}
          onValueChange={(value) => onChange("category", value as LeadCategory)}
        >
          <SelectTrigger
            id="category"
            className={cn(
              errors.category && "border-destructive focus:ring-destructive"
            )}
          >
            <SelectValue placeholder={t.categoryPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {getCategoryLabel(cat, locale)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-destructive animate-shake">
            {errors.category}
          </p>
        )}
      </div>

      {/* Message - Full width */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-foreground">
          {t.message}
        </Label>
        <Textarea
          id="message"
          placeholder={t.messagePlaceholder}
          value={data.message || ""}
          onChange={(e) => handleMessageChange(e.target.value)}
          onBlur={() => onBlur?.("message")}
          className="min-h-[120px] resize-none"
          maxLength={500}
        />

        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            {t.messagePlaceholder.split(",")[0]}...
          </p>
          <p className="text-xs text-muted-foreground">
            {messageLength}/500 {t.charactersRemaining}
          </p>
        </div>
      </div>

      {/* GDPR Consent */}
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <Checkbox
            id="gdprConsent"
            checked={data.gdprConsent || false}
            onCheckedChange={(checked) =>
              onChange("gdprConsent", checked === true)
            }
            className={cn(errors.gdprConsent && "border-destructive")}
          />

          <Label
            htmlFor="gdprConsent"
            className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
          >
            {t.gdprConsent}{" "}
            <a
              href="#"
              className="text-primary underline hover:text-primary/80"
              onClick={(e) => {
                e.preventDefault();
                // Open privacy policy modal
              }}
            >
              {t.gdprLink}
            </a>
          </Label>
        </div>
        {errors.gdprConsent && (
          <p className="text-sm text-destructive animate-shake ml-6">
            {errors.gdprConsent}
          </p>
        )}
      </div>
    </div>
  );
}
