/**
 * VIAMENTOR - Pricing Page
 * Page tarifs transparents avec plans, comparaison détaillée et FAQ
 */

"use client";

import { useState } from "react";
import { MarketingNav } from "@/viamentor/components/viamentor-marketing-nav";
import { MarketingFooter } from "@/viamentor/components/viamentor-marketing-footer";
import { PricingPlans } from "@/viamentor/components/viamentor-pricing-plans";
import { ComparisonTable } from "@/viamentor/components/viamentor-comparison-table";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/viamentor/data/viamentor-marketing-i18n";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ============================================================================
// TYPES
// ============================================================================

interface PricingPageProps {
  initialLocale?: MarketingLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PricingPage({ initialLocale = "fr" }: PricingPageProps) {
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
            {t.pricing.hero.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.pricing.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <PricingPlans locale={locale} />

      {/* Comparison Table */}
      <ComparisonTable locale={locale} />

      {/* FAQ Pricing */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            {t.pricing.faq.title}
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Réponses aux questions les plus courantes
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {t.pricing.faq.items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <MarketingFooter locale={locale} />
    </div>
  );
}
