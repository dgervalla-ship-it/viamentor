/**
 * VIAMENTOR - Thank You Page
 * Page de remerciement après soumission formulaire
 */

"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  contactPublicTranslations,
  type ContactPublicLocale,
} from "@/polymet/data/viamentor-contact-public-i18n";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, ClockIcon, MailIcon, PhoneIcon } from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface ThankYouPageProps {
  locale?: ContactPublicLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ThankYouPage({ locale = "fr" }: ThankYouPageProps) {
  const t = contactPublicTranslations[locale];

  // Track conversion
  useEffect(() => {
    // Google Analytics 4 - Conversion
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
        value: 0,
        currency: "CHF",
      });
    }

    // Meta Pixel - Lead
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }

    // TikTok Pixel - CompleteRegistration
    if (typeof window !== "undefined" && (window as any).ttq) {
      (window as any).ttq.track("CompleteRegistration");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="w-12 h-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl">{t.successTitle}</CardTitle>
          <CardDescription className="text-lg mt-2">
            {t.successMessage}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Next Steps */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />

              {t.successNextSteps}
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    {locale === "fr"
                      ? "Confirmation par email"
                      : "Email confirmation"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {locale === "fr"
                      ? "Vous recevrez un email de confirmation dans quelques minutes"
                      : "You will receive a confirmation email in a few minutes"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    {locale === "fr"
                      ? "Analyse de votre demande"
                      : "Analysis of your request"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {locale === "fr"
                      ? "Notre équipe étudie votre profil et vos besoins"
                      : "Our team studies your profile and needs"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    {locale === "fr" ? "Prise de contact" : "Contact"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.successTimeline}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-muted rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-4">
              {locale === "fr"
                ? "Besoin d'une réponse plus rapide?"
                : "Need a faster response?"}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    {locale === "fr" ? "Appelez-nous" : "Call us"}
                  </p>
                  <a
                    href="tel:+41223456789"
                    className="font-medium text-foreground hover:text-primary"
                  >
                    +41 22 345 67 89
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MailIcon className="w-5 h-5 text-primary" />

                <div>
                  <p className="text-sm text-muted-foreground">
                    {locale === "fr" ? "Écrivez-nous" : "Email us"}
                  </p>
                  <a
                    href="mailto:contact@viamentor.ch"
                    className="font-medium text-foreground hover:text-primary"
                  >
                    contact@viamentor.ch
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1">
              <Link to="/">
                {locale === "fr" ? "Retour à l'accueil" : "Back to home"}
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/contact">
                {locale === "fr" ? "Nouvelle demande" : "New request"}
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">
              {locale === "fr"
                ? "Rejoignez plus de 2000 élèves satisfaits"
                : "Join over 2000 satisfied students"}
            </p>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-500 text-xl">
                  ⭐
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {locale === "fr"
                ? "Note moyenne: 4.9/5 sur 500+ avis"
                : "Average rating: 4.9/5 from 500+ reviews"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
