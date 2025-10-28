/**
 * VIAMENTOR - Final CTA Section
 * Section CTA finale avec gradient background et button pulse animation
 */

"use client";

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/viamentor/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface FinalCtaSectionProps {
  locale?: MarketingLocale;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FinalCtaSection({
  locale = "fr",
  className = "",
}: FinalCtaSectionProps) {
  const t = getMarketingTranslations(locale);

  return (
    <section className={`py-32 relative overflow-hidden ${className}`}>
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      </div>

      {/* Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />

        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {t.finalCta.title}
          </h2>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className="group bg-white text-purple-600 hover:bg-white/90 font-bold text-xl px-12 py-8 shadow-2xl hover:shadow-3xl transition-all hover:scale-105 animate-pulse"
              asChild
            >
              <Link to="/register">
                {t.finalCta.button}
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-white/90">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">
                Essai gratuit 30 jours
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">Sans carte bancaire</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">Support 7j/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
