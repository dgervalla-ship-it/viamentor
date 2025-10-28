/**
 * VIAMENTOR - FAQ Page
 * Page questions fréquentes avec recherche et catégories
 */

"use client";

import { useState } from "react";
import { MarketingNav } from "@/viamentor/components/viamentor-marketing-nav";
import { MarketingFooter } from "@/viamentor/components/viamentor-marketing-footer";
import { FAQSearch } from "@/viamentor/components/viamentor-faq-search";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/viamentor/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface FAQPageProps {
  initialLocale?: MarketingLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FAQPage({ initialLocale = "fr" }: FAQPageProps) {
  const [locale, setLocale] = useState<MarketingLocale>(initialLocale);
  const t = getMarketingTranslations(locale);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MarketingNav locale={locale} onLocaleChange={setLocale} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {t.faq.hero.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.faq.hero.subtitle}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FAQSearch locale={locale} />
        </div>
      </section>

      {/* Footer */}
      <MarketingFooter locale={locale} />
    </div>
  );
}
