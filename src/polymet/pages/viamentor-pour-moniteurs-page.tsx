import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRightIcon,
  SmartphoneIcon,
  DollarSignIcon,
  ClipboardCheckIcon,
  SparklesIcon,
  CalendarIcon,
  TrendingUpIcon,
  FileTextIcon,
  HeartIcon,
  ChevronRightIcon,
  CheckCircle2Icon,
} from "lucide-react";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/polymet/data/viamentor-marketing-i18n";
import { MarketingNav } from "@/polymet/components/viamentor-marketing-nav";
import { MarketingFooter } from "@/polymet/components/viamentor-marketing-footer";

// ============================================================================
// TYPES
// ============================================================================

interface PourMoniteursPageProps {
  locale?: MarketingLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PourMoniteursPage({
  locale: initialLocale = "fr",
}: PourMoniteursPageProps) {
  const [locale, setLocale] = useState<MarketingLocale>(initialLocale);
  const t = getMarketingTranslations(locale);

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav locale={locale} onLocaleChange={setLocale} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-pulse" />

          <div className="absolute top-40 -left-40 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

          <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="container relative z-10 px-4 py-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">
              {t.nav.home}
            </Link>
            <ChevronRightIcon className="w-4 h-4" />

            <span className="text-foreground font-medium">
              {t.nav.forInstructors}
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800">
                  <HeartIcon className="w-4 h-4 mr-2" />

                  {t.personas.instructors.hero.badge}
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent animate-fade-in-up">
                  {t.personas.instructors.hero.title}
                </h1>
                <p className="text-xl text-muted-foreground animate-fade-in-up delay-100">
                  {t.personas.instructors.hero.subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all"
                >
                  {t.cta.getStarted}
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2"
                >
                  {t.cta.learnMore}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 animate-fade-in-up delay-300">
                <div className="flex items-center gap-2">
                  <SmartphoneIcon className="w-5 h-5 text-green-600 dark:text-green-400" />

                  <span className="text-sm font-medium">
                    {t.personas.instructors.hero.mobile}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-green-600 dark:text-green-400" />

                  <span className="text-sm font-medium">
                    {t.personas.instructors.hero.sync}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Mobile Mockup */}
            <div className="relative animate-fade-in-up delay-400">
              <div className="relative mx-auto w-80 h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-gray-800 dark:border-gray-200 bg-card">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 dark:bg-gray-200 rounded-b-2xl" />

                <div className="h-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-6">
                  <div className="space-y-4">
                    <div className="h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl" />

                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-24 bg-white/80 dark:bg-black/40 rounded-xl"
                        />
                      ))}
                    </div>
                    <div className="h-64 bg-white/80 dark:bg-black/40 rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arguments Section */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {t.personas.instructors.arguments.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.personas.instructors.arguments.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Planning Personnel */}
            <Card className="border-2 hover:border-green-500 dark:hover:border-green-400 transition-colors hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">
                  {t.personas.instructors.arguments.planning.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.personas.instructors.arguments.planning.description}
                </p>
                <ul className="space-y-2">
                  {t.personas.instructors.arguments.planning.features.map(
                    (feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2Icon className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />

                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Revenus Transparents */}
            <Card className="border-2 hover:border-green-500 dark:hover:border-green-400 transition-colors hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <DollarSignIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">
                  {t.personas.instructors.arguments.revenue.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.personas.instructors.arguments.revenue.description}
                </p>
                <ul className="space-y-2">
                  {t.personas.instructors.arguments.revenue.features.map(
                    (feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2Icon className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />

                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Évaluations Simplifiées */}
            <Card className="border-2 hover:border-green-500 dark:hover:border-green-400 transition-colors hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                  <ClipboardCheckIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">
                  {t.personas.instructors.arguments.evaluations.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.personas.instructors.arguments.evaluations.description}
                </p>
                <ul className="space-y-2">
                  {t.personas.instructors.arguments.evaluations.features.map(
                    (feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2Icon className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />

                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Moins Admin */}
            <Card className="border-2 hover:border-green-500 dark:hover:border-green-400 transition-colors hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">
                  {t.personas.instructors.arguments.automation.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.personas.instructors.arguments.automation.description}
                </p>
                <ul className="space-y-2">
                  {t.personas.instructors.arguments.automation.features.map(
                    (feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2Icon className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />

                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {t.personas.instructors.benefits.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.personas.instructors.benefits.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {t.personas.instructors.benefits.items.map(
              (benefit: any, i: number) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl border border-border bg-card hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6">
                    <TrendingUpIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {benefit.description}
                  </p>
                  <div className="space-y-3">
                    {benefit.points.map((point: string, j: number) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle2Icon className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />

                        <span className="text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {t.personas.instructors.testimonials.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.personas.instructors.testimonials.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.personas.instructors.testimonials.items.map(
              (testimonial: any, i: number) => (
                <Card key={i} className="border-2">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-500">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600" />

                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />

        <div className="container relative z-10 px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            {t.personas.instructors.finalCta.title}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t.personas.instructors.finalCta.subtitle}
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-white text-green-600 hover:bg-gray-100 shadow-xl"
          >
            {t.cta.getStarted}
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Button>
          <p className="mt-6 text-sm opacity-75">
            {t.personas.instructors.finalCta.free}
          </p>
        </div>
      </section>

      <MarketingFooter locale={locale} />
    </div>
  );
}
