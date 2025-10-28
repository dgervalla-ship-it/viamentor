/**
 * VIAMENTOR - Contact Public Page
 * Page contact publique avec hero section et SEO
 */

"use client";

import { useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  contactPublicTranslations,
  type ContactPublicLocale,
} from "@/polymet/data/viamentor-contact-public-i18n";
import { PublicContactForm } from "@/polymet/components/viamentor-public-contact-form";

// ============================================================================
// TYPES
// ============================================================================

interface ContactPublicPageProps {
  locale?: ContactPublicLocale;
}

// ============================================================================
// SEO META TAGS
// ============================================================================

function SEOHead({ locale = "fr" }: { locale: ContactPublicLocale }) {
  const t = contactPublicTranslations[locale];

  return (
    <Helmet>
      <title>{t.metaTitle}</title>
      <meta name="description" content={t.metaDescription} />

      <meta name="keywords" content={t.metaKeywords} />

      <link rel="canonical" href={`https://viamentor.ch/${locale}/contact`} />

      {/* Open Graph */}
      <meta property="og:title" content={t.metaTitle} />

      <meta property="og:description" content={t.metaDescription} />

      <meta property="og:type" content="website" />

      <meta
        property="og:url"
        content={`https://viamentor.ch/${locale}/contact`}
      />

      <meta property="og:image" content="https://viamentor.ch/og-image.jpg" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={t.metaTitle} />

      <meta name="twitter:description" content={t.metaDescription} />

      <meta name="twitter:image" content="https://viamentor.ch/og-image.jpg" />

      {/* Language alternates */}
      <link
        rel="alternate"
        hrefLang="fr"
        href="https://viamentor.ch/fr/contact"
      />

      <link
        rel="alternate"
        hrefLang="de"
        href="https://viamentor.ch/de/contact"
      />

      <link
        rel="alternate"
        hrefLang="it"
        href="https://viamentor.ch/it/contact"
      />

      <link
        rel="alternate"
        hrefLang="en"
        href="https://viamentor.ch/en/contact"
      />
    </Helmet>
  );
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ContactPublicPage({ locale = "fr" }: ContactPublicPageProps) {
  const t = contactPublicTranslations[locale];

  // Track page view
  useEffect(() => {
    // In a real app, send to analytics
    console.log("Page view: /contact", {
      locale,
      timestamp: new Date().toISOString(),
    });

    // Google Analytics 4
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "page_view", {
        page_title: t.metaTitle,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    }
  }, [locale, t.metaTitle]);

  return (
    <>
      <SEOHead locale={locale} />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div
          className="relative h-[400px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=400&fit=crop')",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t.pageTitle}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
              {t.pageSubtitle}
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="container mx-auto px-4 -mt-20 pb-20">
          <PublicContactForm
            locale={locale}
            onSuccess={(data) => {
              console.log("Lead captured:", data);

              // Send to analytics
              if (typeof window !== "undefined" && (window as any).gtag) {
                (window as any).gtag("event", "generate_lead", {
                  category: data.category,
                  value: 0,
                  currency: "CHF",
                });
              }

              // Send to Meta Pixel
              if (typeof window !== "undefined" && (window as any).fbq) {
                (window as any).fbq("track", "Lead", {
                  content_category: data.category,
                  content_name: "Contact Form",
                });
              }

              // Send to TikTok Pixel
              if (typeof window !== "undefined" && (window as any).ttq) {
                (window as any).ttq.track("SubmitForm", {
                  content_type: "contact",
                  content_name: data.category,
                });
              }
            }}
            onError={(error) => {
              console.error("Lead capture error:", error);
            }}
          />
        </div>

        {/* Trust Signals */}
        <div className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl mb-2">⭐</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {locale === "fr" ? "Note 4.9/5" : "Rating 4.9/5"}
                </h3>
                <p className="text-muted-foreground">
                  {locale === "fr"
                    ? "Plus de 500 avis vérifiés"
                    : "Over 500 verified reviews"}
                </p>
              </div>

              <div>
                <div className="text-4xl mb-2">🚗</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {locale === "fr" ? "Flotte moderne" : "Modern fleet"}
                </h3>
                <p className="text-muted-foreground">
                  {locale === "fr"
                    ? "Véhicules récents et équipés"
                    : "Recent and equipped vehicles"}
                </p>
              </div>

              <div>
                <div className="text-4xl mb-2">👨‍🏫</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {locale === "fr"
                    ? "Moniteurs certifiés"
                    : "Certified instructors"}
                </h3>
                <p className="text-muted-foreground">
                  {locale === "fr"
                    ? "Experts pédagogiques diplômés"
                    : "Qualified teaching experts"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-background py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              {locale === "fr"
                ? "Autres moyens de nous contacter"
                : "Other ways to contact us"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  {locale === "fr" ? "Téléphone" : "Phone"}
                </h3>
                <a
                  href="tel:+41223456789"
                  className="text-primary hover:underline"
                >
                  +41 22 345 67 89
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <a
                  href="mailto:contact@viamentor.ch"
                  className="text-primary hover:underline"
                >
                  contact@viamentor.ch
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  {locale === "fr" ? "Horaires" : "Hours"}
                </h3>
                <p className="text-muted-foreground">
                  {locale === "fr" ? "Lun-Ven: 8h-18h" : "Mon-Fri: 8am-6pm"}
                  <br />

                  {locale === "fr" ? "Sam: 9h-12h" : "Sat: 9am-12pm"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
