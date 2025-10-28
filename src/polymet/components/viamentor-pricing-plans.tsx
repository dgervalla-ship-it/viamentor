/**
 * VIAMENTOR - Pricing Plans Component
 * Grille de plans tarifaires avec toggle billing period
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CheckIcon } from "lucide-react";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/polymet/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PricingPlansProps {
  locale?: MarketingLocale;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PricingPlans({ locale = "fr", className }: PricingPlansProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const t = getMarketingTranslations(locale);

  // Calculate prices with annual discount
  const getPrice = (monthlyPrice: number) => {
    if (isAnnual) {
      return Math.round(monthlyPrice * 0.8); // 20% discount
    }
    return monthlyPrice;
  };

  return (
    <section className={`py-24 px-4 sm:px-6 lg:px-8 ${className || ""}`}>
      <div className="max-w-7xl mx-auto">
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className={`text-sm font-medium ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}
          >
            {t.pricing.billing.monthly}
          </span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />

          <span
            className={`text-sm font-medium ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}
          >
            {t.pricing.billing.annual}
          </span>
          {isAnnual && (
            <Badge variant="secondary" className="ml-2">
              {t.pricing.billing.save}
            </Badge>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">
                {t.pricing.plans.starter.name}
              </h3>
              <p className="text-muted-foreground">
                {t.pricing.plans.starter.tagline}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{getPrice(149)}</span>
                <span className="text-muted-foreground">
                  CHF/{isAnnual ? "an" : "mois"}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {t.pricing.plans.starter.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />

                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant="outline" className="w-full">
              {t.pricing.plans.starter.cta}
            </Button>
          </Card>

          {/* Professional Plan */}
          <Card className="p-8 relative border-primary shadow-xl hover:shadow-2xl transition-shadow">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
              {t.pricing.plans.professional.badge}
            </Badge>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">
                {t.pricing.plans.professional.name}
              </h3>
              <p className="text-muted-foreground">
                {t.pricing.plans.professional.tagline}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{getPrice(299)}</span>
                <span className="text-muted-foreground">
                  CHF/{isAnnual ? "an" : "mois"}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {t.pricing.plans.professional.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />

                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full">
              {t.pricing.plans.professional.cta}
            </Button>
          </Card>

          {/* Enterprise Plan */}
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">
                {t.pricing.plans.enterprise.name}
              </h3>
              <p className="text-muted-foreground">
                {t.pricing.plans.enterprise.tagline}
              </p>
            </div>

            <div className="mb-6">
              <div className="text-2xl font-bold text-muted-foreground">
                {t.pricing.plans.enterprise.price}
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {t.pricing.plans.enterprise.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />

                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant="outline" className="w-full">
              {t.pricing.plans.enterprise.cta}
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
