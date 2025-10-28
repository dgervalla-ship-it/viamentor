/**
 * VIAMENTOR - Features Section
 * Section fonctionnalités avec accordion expandable et screenshot feature
 */

"use client";

import { useState } from "react";
import {
  Calendar,
  FileText,
  Users,
  BarChart3,
  Smartphone,
  Check,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/viamentor/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface FeaturesSectionProps {
  locale?: MarketingLocale;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function FeaturesSection({
  locale = "fr",
  className = "",
}: FeaturesSectionProps) {
  const [activeFeature, setActiveFeature] = useState("planning");
  const t = getMarketingTranslations(locale);

  const features = [
    {
      id: "planning",
      icon: Calendar,
      title: t.features.planning,
      color: "text-blue-600",
    },
    {
      id: "qr-invoices",
      icon: FileText,
      title: t.features.qrInvoices,
      color: "text-green-600",
    },
    {
      id: "crm",
      icon: Users,
      title: t.features.crm,
      color: "text-purple-600",
    },
    {
      id: "analytics",
      icon: BarChart3,
      title: t.features.analytics,
      color: "text-orange-600",
    },
    {
      id: "mobile",
      icon: Smartphone,
      title: t.features.mobileApp,
      color: "text-pink-600",
    },
  ];

  return (
    <section className={`py-24 bg-muted/30 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t.features.title}
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Features List */}
          <div className="space-y-4">
            <Accordion
              type="single"
              collapsible
              value={activeFeature}
              onValueChange={setActiveFeature}
              className="space-y-3"
            >
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <AccordionItem
                    key={feature.id}
                    value={feature.id}
                    className="border border-border rounded-lg bg-card px-6 data-[state=open]:shadow-lg transition-all"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${feature.color}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-semibold text-left">
                          {feature.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />

                        <p className="leading-relaxed">
                          Fonctionnalité complète avec toutes les options
                          nécessaires pour une gestion optimale de votre
                          auto-école.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Right: Feature Screenshot */}
          <div className="relative">
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />

              {/* Screenshot Container */}
              <div className="relative bg-background rounded-2xl shadow-2xl border border-border overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-8">
                  {/* Mock Feature Content */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="h-6 w-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded" />

                        <div className="h-4 w-32 bg-muted rounded" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-10 w-10 bg-primary/20 rounded-lg" />

                        <div className="h-10 w-10 bg-primary/20 rounded-lg" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-32 bg-card rounded-xl border border-border p-4 space-y-3"
                        >
                          <div className="h-4 w-20 bg-muted rounded" />

                          <div className="h-8 w-16 bg-primary/20 rounded" />

                          <div className="h-3 w-full bg-muted rounded" />
                        </div>
                      ))}
                    </div>

                    <div className="h-40 bg-card rounded-xl border border-border p-4">
                      <div className="h-full bg-gradient-to-t from-blue-100 via-purple-100 to-transparent dark:from-blue-900 dark:via-purple-900 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg font-semibold">
                ✓ Tout inclus
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
