/**
 * VIAMENTOR - Demo Page
 * Page démo avec vidéo et formulaire demande démo personnalisée
 */

"use client";

import { useState } from "react";
import { MarketingNav } from "@/polymet/components/viamentor-marketing-nav";
import { MarketingFooter } from "@/polymet/components/viamentor-marketing-footer";
import { DemoVideo } from "@/polymet/components/viamentor-demo-video";
import { RequestDemoForm } from "@/polymet/components/viamentor-request-demo-form";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/polymet/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface DemoPageProps {
  initialLocale?: MarketingLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function DemoPage({ initialLocale = "fr" }: DemoPageProps) {
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
            {t.demo.hero.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.demo.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Video Section */}
            <div className="lg:col-span-2">
              <DemoVideo locale={locale} />
            </div>

            {/* Request Demo Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <RequestDemoForm locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <MarketingFooter locale={locale} />
    </div>
  );
}
