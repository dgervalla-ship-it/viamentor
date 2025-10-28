/**
 * VIAMENTOR - Expiration Survey
 * Survey inline pour comprendre raisons non-utilisation
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircleIcon, CheckCircleIcon, SendIcon } from "lucide-react";
import type { SurveyResponse } from "@/polymet/data/viamentor-makeups-expiration-job";

// ============================================================================
// TYPES
// ============================================================================

interface ExpirationSurveyProps {
  makeupId: string;
  studentName: string;
  lessonDate: string;
  expiryDate: string;
  locale?: "fr" | "de" | "it" | "en";
  onSubmit?: (response: SurveyResponse) => void;
  onSkip?: () => void;
}

type SurveyReason = "forgot" | "no_slot" | "no_need" | "other";

// ============================================================================
// I18N
// ============================================================================

const translations = {
  fr: {
    title: "Pourquoi n'avez-vous pas utilisé votre rattrapage ?",
    description:
      "Votre avis nous aide à améliorer notre service pour tous les élèves.",
    reasons: {
      forgot: {
        label: "J'ai oublié / Je n'ai pas vu les notifications",
        hint: "Les emails étaient peut-être dans vos spams ?",
      },
      no_slot: {
        label: "Je n'ai pas trouvé de créneau compatible",
        hint: "Horaires moniteurs limités ou incompatibles",
      },
      no_need: {
        label: "Je n'en avais plus besoin",
        hint: "Circonstances changées, formation terminée...",
      },
      other: {
        label: "Autre raison",
        hint: "Précisez ci-dessous",
      },
    },
    detailsLabel: "Détails (optionnel)",
    detailsPlaceholder:
      "Partagez plus de détails pour nous aider à améliorer...",
    submitButton: "Envoyer ma réponse",
    skipButton: "Passer",
    successTitle: "Merci pour votre retour !",
    successMessage: "Votre réponse nous aidera à améliorer notre service.",
    errorMessage: "Une erreur est survenue. Veuillez réessayer.",
  },
  de: {
    title: "Warum haben Sie Ihren Nachholtermin nicht genutzt?",
    description: "Ihre Meinung hilft uns, unseren Service zu verbessern.",
    reasons: {
      forgot: {
        label: "Ich habe es vergessen / Benachrichtigungen nicht gesehen",
        hint: "Waren die E-Mails vielleicht im Spam?",
      },
      no_slot: {
        label: "Ich habe keinen passenden Termin gefunden",
        hint: "Begrenzte oder inkompatible Zeiten",
      },
      no_need: {
        label: "Ich brauchte es nicht mehr",
        hint: "Umstände geändert, Ausbildung beendet...",
      },
      other: {
        label: "Anderer Grund",
        hint: "Bitte unten angeben",
      },
    },
    detailsLabel: "Details (optional)",
    detailsPlaceholder: "Teilen Sie weitere Details mit...",
    submitButton: "Antwort senden",
    skipButton: "Überspringen",
    successTitle: "Vielen Dank für Ihr Feedback!",
    successMessage: "Ihre Antwort hilft uns, unseren Service zu verbessern.",
    errorMessage: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
  },
  it: {
    title: "Perché non ha utilizzato il suo recupero?",
    description: "La sua opinione ci aiuta a migliorare il nostro servizio.",
    reasons: {
      forgot: {
        label: "Ho dimenticato / Non ho visto le notifiche",
        hint: "Le email erano forse nello spam?",
      },
      no_slot: {
        label: "Non ho trovato un orario compatibile",
        hint: "Orari istruttori limitati o incompatibili",
      },
      no_need: {
        label: "Non ne avevo più bisogno",
        hint: "Circostanze cambiate, formazione terminata...",
      },
      other: {
        label: "Altro motivo",
        hint: "Specificare sotto",
      },
    },
    detailsLabel: "Dettagli (opzionale)",
    detailsPlaceholder: "Condivida più dettagli per aiutarci a migliorare...",
    submitButton: "Invia risposta",
    skipButton: "Salta",
    successTitle: "Grazie per il suo feedback!",
    successMessage:
      "La sua risposta ci aiuterà a migliorare il nostro servizio.",
    errorMessage: "Si è verificato un errore. Riprova.",
  },
  en: {
    title: "Why didn't you use your makeup lesson?",
    description: "Your feedback helps us improve our service for all students.",
    reasons: {
      forgot: {
        label: "I forgot / Didn't see the notifications",
        hint: "Were the emails in your spam folder?",
      },
      no_slot: {
        label: "I couldn't find a compatible time slot",
        hint: "Limited or incompatible instructor hours",
      },
      no_need: {
        label: "I didn't need it anymore",
        hint: "Circumstances changed, training completed...",
      },
      other: {
        label: "Other reason",
        hint: "Please specify below",
      },
    },
    detailsLabel: "Details (optional)",
    detailsPlaceholder: "Share more details to help us improve...",
    submitButton: "Submit response",
    skipButton: "Skip",
    successTitle: "Thank you for your feedback!",
    successMessage: "Your response will help us improve our service.",
    errorMessage: "An error occurred. Please try again.",
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function ExpirationSurvey({
  makeupId,
  studentName,
  lessonDate,
  expiryDate,
  locale = "fr",
  onSubmit,
  onSkip,
}: ExpirationSurveyProps) {
  const t = translations[locale];

  const [selectedReason, setSelectedReason] = useState<SurveyReason | null>(
    null
  );
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedReason) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response: SurveyResponse = {
        reason: selectedReason,
        details: details.trim() || undefined,
        submittedAt: new Date().toISOString(),
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSubmit?.(response);
      setIsSubmitted(true);
    } catch (err) {
      setError(t.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onSkip?.();
  };

  if (isSubmitted) {
    return (
      <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="h-6 w-6 text-green-600" />

            <CardTitle className="text-green-900 dark:text-green-100">
              {t.successTitle}
            </CardTitle>
          </div>
          <CardDescription className="text-green-700 dark:text-green-300">
            {t.successMessage}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircleIcon className="h-5 w-5 text-orange-600" />

          {t.title}
        </CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Raisons */}
        <div className="space-y-4">
          <RadioGroup
            value={selectedReason || ""}
            onValueChange={(value) => setSelectedReason(value as SurveyReason)}
          >
            {(Object.keys(t.reasons) as SurveyReason[]).map((reason) => (
              <div
                key={reason}
                className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <RadioGroupItem value={reason} id={reason} className="mt-1" />

                <div className="flex-1">
                  <Label
                    htmlFor={reason}
                    className="font-medium cursor-pointer text-foreground"
                  >
                    {t.reasons[reason].label}
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t.reasons[reason].hint}
                  </p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Détails */}
        <div className="space-y-2">
          <Label htmlFor="details" className="text-foreground">
            {t.detailsLabel}
          </Label>
          <Textarea
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder={t.detailsPlaceholder}
            maxLength={200}
            rows={3}
            className="resize-none"
          />

          <p className="text-xs text-muted-foreground text-right">
            {details.length}/200
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            onClick={handleSubmit}
            disabled={!selectedReason || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                {locale === "fr" ? "Envoi..." : "Sending..."}
              </>
            ) : (
              <>
                <SendIcon className="h-4 w-4 mr-2" />

                {t.submitButton}
              </>
            )}
          </Button>
          <Button variant="ghost" onClick={handleSkip} disabled={isSubmitting}>
            {t.skipButton}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
