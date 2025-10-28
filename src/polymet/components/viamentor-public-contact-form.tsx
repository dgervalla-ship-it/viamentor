/**
 * VIAMENTOR - Public Contact Form Component
 * Formulaire contact public complet avec validation et protection
 */

"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  contactPublicTranslations,
  type ContactPublicLocale,
} from "@/polymet/data/viamentor-contact-public-i18n";
import {
  validateEmail,
  validatePhone,
  validateName,
  checkSpam,
  type LeadFormData,
  type LeadMetadata,
  type UTMParams,
} from "@/polymet/data/viamentor-contact-public-data";
import { ContactFormFields } from "@/polymet/components/viamentor-contact-form-fields";
import {
  SpamProtection,
  useSpamProtection,
} from "@/polymet/components/viamentor-spam-protection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2Icon, CheckCircleIcon, AlertTriangleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

interface PublicContactFormProps {
  locale?: ContactPublicLocale;
  onSuccess?: (data: LeadFormData) => void;
  onError?: (error: string) => void;
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

const validateForm = (
  data: Partial<LeadFormData>,
  t: any
): Record<string, string> => {
  const errors: Record<string, string> = {};

  // First name
  if (!data.firstName) {
    errors.firstName = t.required;
  } else if (!validateName(data.firstName)) {
    errors.firstName = t.invalidCharacters;
  }

  // Last name
  if (!data.lastName) {
    errors.lastName = t.required;
  } else if (!validateName(data.lastName)) {
    errors.lastName = t.invalidCharacters;
  }

  // Email
  if (!data.email) {
    errors.email = t.required;
  } else if (!validateEmail(data.email)) {
    errors.email = t.invalidEmail;
  }

  // Phone
  if (!data.phone) {
    errors.phone = t.required;
  } else if (!validatePhone(data.phone)) {
    errors.phone = t.invalidPhone;
  }

  // Category
  if (!data.category) {
    errors.category = t.required;
  }

  // GDPR consent
  if (!data.gdprConsent) {
    errors.gdprConsent = t.required;
  }

  return errors;
};

// ============================================================================
// COMPONENT
// ============================================================================

export function PublicContactForm({
  locale = "fr",
  onSuccess,
  onError,
}: PublicContactFormProps) {
  const t = contactPublicTranslations[locale];
  const { checkProtection, setMetadata } = useSpamProtection();

  const [data, setData] = useState<Partial<LeadFormData>>(() => {
    // Try to restore from localStorage
    const saved = localStorage.getItem("viamentor-contact-draft");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("viamentor-contact-draft", JSON.stringify(data));
    }, 1000);

    return () => clearTimeout(timer);
  }, [data]);

  // Extract UTM params from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm: UTMParams = {
      utm_source: params.get("utm_source") as any,
      utm_medium: params.get("utm_medium") as any,
      utm_campaign: params.get("utm_campaign") || undefined,
      utm_content: params.get("utm_content") || undefined,
      utm_term: params.get("utm_term") || undefined,
    };

    setData((prev) => ({ ...prev, utm }));
  }, []);

  const handleChange = (field: keyof LeadFormData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Clear submit error
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleBlur = (field: keyof LeadFormData) => {
    // Validate individual field on blur
    const fieldErrors: Record<string, string> = {};

    if (
      field === "firstName" &&
      data.firstName &&
      !validateName(data.firstName)
    ) {
      fieldErrors.firstName = t.invalidCharacters;
    }

    if (field === "lastName" && data.lastName && !validateName(data.lastName)) {
      fieldErrors.lastName = t.invalidCharacters;
    }

    if (field === "email" && data.email && !validateEmail(data.email)) {
      fieldErrors.email = t.invalidEmail;
    }

    if (field === "phone" && data.phone && !validatePhone(data.phone)) {
      fieldErrors.phone = t.invalidPhone;
    }

    setErrors((prev) => ({ ...prev, ...fieldErrors }));
  };

  const handleMetadataReady = (metadata: LeadMetadata) => {
    setMetadata(metadata);
    setData((prev) => ({ ...prev, metadata }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm(data, t);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check spam protection
    if (!checkProtection(data)) {
      setSubmitError(t.spamDetected);
      return;
    }

    // Check spam score
    const spamCheck = checkSpam(data as LeadFormData);
    if (spamCheck.isSpam) {
      setSubmitError(t.spamDetected);
      console.warn("Spam detected:", spamCheck.reasons);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, this would be:
      // const response = await fetch('/api/leads/public', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      // Clear localStorage draft
      localStorage.removeItem("viamentor-contact-draft");

      // Call success callback
      onSuccess?.(data as LeadFormData);

      // Set success state to show link
      setIsSuccess(true);
    } catch (error) {
      console.error("Submit error:", error);
      setSubmitError(t.errorMessage);
      onError?.(t.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.keys(validateForm(data, t)).length === 0;

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{t.pageTitle}</CardTitle>
        <CardDescription>{t.pageSubtitle}</CardDescription>
      </CardHeader>

      <CardContent>
        <SpamProtection
          locale={locale}
          onMetadataReady={handleMetadataReady}
          onRateLimitExceeded={() => setIsRateLimited(true)}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <ContactFormFields
              locale={locale}
              data={data}
              errors={errors}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {/* Submit error */}
            {submitError && (
              <Alert variant="destructive">
                <AlertTriangleIcon className="h-4 w-4" />

                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            {/* Submit button or success message */}
            {isSuccess ? (
              <div className="space-y-4">
                <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                  <CheckCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />

                  <AlertDescription className="text-green-800 dark:text-green-200">
                    {t.successMessage}
                  </AlertDescription>
                </Alert>
                <Link to="/merci">
                  <Button className="w-full" size="lg">
                    {t.continueButton || "Continuer"}
                  </Button>
                </Link>
              </div>
            ) : (
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!isFormValid || isSubmitting || isRateLimited}
              >
                {isSubmitting ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />

                    {t.submitting}
                  </>
                ) : (
                  t.submit
                )}
              </Button>
            )}

            {/* Auto-save indicator */}
            <p className="text-xs text-center text-muted-foreground">
              💾 Votre brouillon est sauvegardé automatiquement
            </p>
          </form>
        </SpamProtection>
      </CardContent>
    </Card>
  );
}
