/**
 * VIAMENTOR - Benefits Section
 * Section bénéfices avec 3 cards hover lift et stats quantifiés
 */

"use client";

import { Clock, TrendingUp, Shield } from "lucide-react";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/viamentor/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface BenefitsSectionProps {
  locale?: MarketingLocale;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function BenefitsSection({
  locale = "fr",
  className = "",
}: BenefitsSectionProps) {
  const t = getMarketingTranslations(locale);

  const benefits = [
    {
      icon: Clock,
      title: t.benefits.card1.title,
      description: t.benefits.card1.description,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: TrendingUp,
      title: t.benefits.card2.title,
      description: t.benefits.card2.description,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Shield,
      title: t.benefits.card3.title,
      description: t.benefits.card3.description,
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className={`py-24 bg-background ${className}`}>
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t.benefits.title}
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative bg-card rounded-2xl border border-border p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Gradient Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl`}
                />

                {/* Content */}
                <div className="relative space-y-4">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${benefit.gradient}`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-card-foreground">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
