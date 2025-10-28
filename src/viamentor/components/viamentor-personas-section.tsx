/**
 * VIAMENTOR - Personas Section
 * Section personas avec 3 cards clickables pour segmentation
 */

"use client";

import { Link } from "react-router-dom";
import { Building2, UserCheck, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/viamentor/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PersonasSectionProps {
  locale?: MarketingLocale;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PersonasSection({
  locale = "fr",
  className = "",
}: PersonasSectionProps) {
  const t = getMarketingTranslations(locale);

  const personas = [
    {
      icon: Building2,
      title: t.personas.schools.title,
      cta: t.personas.schools.cta,
      href: "/pour-auto-ecoles",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950",
    },
    {
      icon: UserCheck,
      title: t.personas.instructors.title,
      cta: t.personas.instructors.cta,
      href: "/pour-moniteurs",
      gradient: "from-green-500 to-emerald-500",
      bgGradient:
        "from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950",
    },
    {
      icon: GraduationCap,
      title: t.personas.students.title,
      cta: t.personas.students.cta,
      href: "/pour-eleves",
      gradient: "from-purple-500 to-pink-500",
      bgGradient:
        "from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950",
    },
  ];

  return (
    <section className={`py-24 bg-background ${className}`}>
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t.personas.title}
          </h2>
        </div>

        {/* Personas Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((persona, index) => {
            const Icon = persona.icon;
            return (
              <Link
                key={index}
                to={persona.href}
                className="group relative block"
              >
                <div className="relative h-full bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${persona.bgGradient} opacity-50`}
                  />

                  {/* Content */}
                  <div className="relative p-8 space-y-6">
                    {/* Icon */}
                    <div
                      className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${persona.gradient} shadow-lg`}
                    >
                      <Icon className="h-10 w-10 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-card-foreground">
                      {persona.title}
                    </h3>

                    {/* CTA */}
                    <Button
                      variant="ghost"
                      className="group-hover:translate-x-2 transition-transform"
                    >
                      {persona.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  {/* Hover Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${persona.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
