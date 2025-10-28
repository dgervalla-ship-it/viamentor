/**
 * VIAMENTOR - Marketing Homepage
 * Landing page complète conversion-optimized avec toutes les sections
 */

"use client";

import { useState } from "react";
import { MarketingNav } from "@/viamentor/components/viamentor-marketing-nav";
import { HeroSection } from "@/viamentor/components/viamentor-hero-section";
import { BenefitsSection } from "@/viamentor/components/viamentor-benefits-section";
import { FeaturesSection } from "@/viamentor/components/viamentor-features-section";
import { PersonasSection } from "@/viamentor/components/viamentor-personas-section";
import { TestimonialsCarousel } from "@/viamentor/components/viamentor-testimonials-carousel";
import { FinalCtaSection } from "@/viamentor/components/viamentor-final-cta-section";
import { MarketingFooter } from "@/viamentor/components/viamentor-marketing-footer";
import type { MarketingLocale } from "@/viamentor/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface MarketingHomepageProps {
  initialLocale?: MarketingLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function MarketingHomepage({
  initialLocale = "fr",
}: MarketingHomepageProps) {
  const [locale, setLocale] = useState<MarketingLocale>(initialLocale);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MarketingNav locale={locale} onLocaleChange={setLocale} />

      {/* Hero Section */}
      <HeroSection locale={locale} />

      {/* Benefits Section */}
      <BenefitsSection locale={locale} />

      {/* Features Section */}
      <FeaturesSection locale={locale} />

      {/* Personas Section */}
      <PersonasSection locale={locale} />

      {/* Testimonials & Social Proof */}
      <TestimonialsCarousel locale={locale} />

      {/* Final CTA */}
      <FinalCtaSection locale={locale} />

      {/* Footer */}
      <MarketingFooter locale={locale} />
    </div>
  );
}
