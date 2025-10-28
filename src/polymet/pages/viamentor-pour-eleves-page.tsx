import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRightIcon,
  CalendarClockIcon,
  CreditCardIcon,
  TrendingUpIcon,
  FolderIcon,
  ClockIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  StarIcon,
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

interface PourElevesPageProps {
  locale?: MarketingLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PourElevesPage({
  locale: initialLocale = "fr",
}: PourElevesPageProps) {
  const [locale, setLocale] = useState<MarketingLocale>(initialLocale);
  const t = getMarketingTranslations(locale);

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav locale={locale} onLocaleChange={setLocale} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-950 dark:via-pink-950 dark:to-rose-950">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />

          <div className="absolute top-40 -left-40 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

          <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-rose-400/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="container relative z-10 px-4 py-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">
              {t.nav.home}
            </Link>
            <ChevronRightIcon className="w-4 h-4" />

            <span className="text-foreground font-medium">
              {t.nav.forStudents}
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800">
                  <StarIcon className="w-4 h-4 mr-2" />

                  {t.personas.students.hero.badge}
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 dark:from-purple-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent animate-fade-in-up">
                  {t.personas.students.hero.title}
                </h1>
                <p className="text-xl text-muted-foreground animate-fade-in-up delay-100">
                  {t.personas.students.hero.subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
                >
                  {t.cta.bookLesson}
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2"
                >
                  {t.cta.viewDemo}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 animate-fade-in-up delay-300">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />

                  <span className="text-sm font-medium">
                    {t.personas.students.hero.available}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />

                  <span className="text-sm font-medium">
                    {t.personas.students.hero.secure}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Mobile Mockup */}
            <div className="relative animate-fade-in-up delay-400">
              <div className="relative mx-auto w-80 h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-gray-800 dark:border-gray-200 bg-card">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 dark:bg-gray-200 rounded-b-2xl" />

                <div className="h-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-6">
                  <div className="space-y-4">
                    <div className="h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                      <div className="text-white font-bold text-lg">
                        {t.personas.students.hero.appTitle}
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-20 bg-white/80 dark:bg-black/40 rounded-xl"
                        />
                      ))}
                    </div>
                    <div className="h-48 bg-white/80 dark:bg-black/40 rounded-xl" />

                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2].map((i) => (
                        <div
                          key={i}
                          className="h-16 bg-white/80 dark:bg-black/40 rounded-xl"
                        />
                      ))}
                    </div>
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
              {t.personas.students.arguments.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.personas.students.arguments.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Réservation 24/7 */}
            <Card className="border-2 hover:border-purple-500 dark:hover:border-purple-400 transition-colors hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <CalendarClockIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">
                  {t.personas.students.arguments.booking.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.personas.students.arguments.booking.description}
                </p>
                <ul className="space-y-2">
                  {t.personas.students.arguments.booking.features.map(
                    (feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2Icon className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />

                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Paiement Moderne */}
            <Card className="border-2 hover:border-purple-500 dark:hover:border-purple-400 transition-colors hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                  <CreditCardIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">
                  {t.personas.students.arguments.payment.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.personas.students.arguments.payment.description}
                </p>
                <ul className="space-y-2">
                  {t.personas.students.arguments.payment.features.map(
                    (feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2Icon className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />

                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Progression Claire */}
            <Card className="border-2 hover:border-purple-500 dark:hover:border-purple-400 transition-colors hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center">
                  <TrendingUpIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">
                  {t.personas.students.arguments.progression.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.personas.students.arguments.progression.description}
                </p>
                <ul className="space-y-2">
                  {t.personas.students.arguments.progression.features.map(
                    (feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2Icon className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />

                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Documents Centralisés */}
            <Card className="border-2 hover:border-purple-500 dark:hover:border-purple-400 transition-colors hover:shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                  <FolderIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">
                  {t.personas.students.arguments.documents.title}
                </h3>
                <p className="text-muted-foreground">
                  {t.personas.students.arguments.documents.description}
                </p>
                <ul className="space-y-2">
                  {t.personas.students.arguments.documents.features.map(
                    (feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2Icon className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />

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

      {/* How It Works Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {t.personas.students.howItWorks.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.personas.students.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t.personas.students.howItWorks.steps.map(
              (step: any, i: number) => (
                <div key={i} className="relative">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto text-white text-2xl font-bold">
                      {i + 1}
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-purple-500 to-pink-600" />
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {t.personas.students.benefits.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.personas.students.benefits.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {t.personas.students.benefits.items.map(
              (benefit: any, i: number) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl border border-border bg-card hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6">
                    <SmartphoneIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {benefit.description}
                  </p>
                  <div className="space-y-3">
                    {benefit.points.map((point: string, j: number) => (
                      <div key={j} className="flex items-start gap-3">
                        <CheckCircle2Icon className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />

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
      <section className="py-24 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {t.personas.students.testimonials.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.personas.students.testimonials.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.personas.students.testimonials.items.map(
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
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600" />

                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.category}
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
      <section className="py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />

        <div className="container relative z-10 px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            {t.personas.students.finalCta.title}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t.personas.students.finalCta.subtitle}
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-white text-purple-600 hover:bg-gray-100 shadow-xl"
          >
            {t.cta.bookLesson}
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Button>
          <p className="mt-6 text-sm opacity-75">
            {t.personas.students.finalCta.easy}
          </p>
        </div>
      </section>

      <MarketingFooter locale={locale} />
    </div>
  );
}
