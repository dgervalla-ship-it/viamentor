/**
 * VIAMENTOR - Marketing Homepage
 * Landing page complète conversion-optimized avec toutes les sections
 */

"use client";

import { useState } from "react";
import { MarketingNav } from "@/polymet/components/viamentor-marketing-nav";
import { HeroSection } from "@/polymet/components/viamentor-hero-section";
import { BenefitsSection } from "@/polymet/components/viamentor-benefits-section";
import { FeaturesSection } from "@/polymet/components/viamentor-features-section";
import { PersonasSection } from "@/polymet/components/viamentor-personas-section";
import { TestimonialsCarousel } from "@/polymet/components/viamentor-testimonials-carousel";
import { FinalCtaSection } from "@/polymet/components/viamentor-final-cta-section";
import { MarketingFooter } from "@/polymet/components/viamentor-marketing-footer";
import type { MarketingLocale } from "@/polymet/data/viamentor-marketing-i18n";

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
