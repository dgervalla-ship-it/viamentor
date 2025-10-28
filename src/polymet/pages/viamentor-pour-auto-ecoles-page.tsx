import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRightIcon,
  ClockIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  CheckCircle2Icon,
  UsersIcon,
  CalendarIcon,
  FileTextIcon,
  BarChart3Icon,
  TargetIcon,
  PlayIcon,
  ChevronRightIcon,
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

interface PourAutoEcolesPageProps {
  locale?: MarketingLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PourAutoEcolesPage({
  locale: initialLocale = "fr",
}: PourAutoEcolesPageProps) {
  const [locale, setLocale] = useState<MarketingLocale>(initialLocale);
  const t = getMarketingTranslations(locale);

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav locale={locale} onLocaleChange={setLocale} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />

          <div className="absolute top-40 -left-40 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

          <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="container relative z-10 px-4 py-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">
              {t.nav.home}
            </Link>
            <ChevronRightIcon className="w-4 h-4" />

            <span className="text-foreground font-medium">
              {t.nav.forSchools}
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent animate-fade-in-up">
                  {t.personas.schools.hero.title}
                </h1>
                <p className="text-xl text-muted-foreground animate-fade-in-up delay-100">
                  {t.personas.schools.hero.subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
                >
                  {t.cta.startFreeTrial}
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2"
                >
                  <PlayIcon className="mr-2 w-5 h-5" />

                  {t.cta.watchDemo}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4 animate-fade-in-up delay-300">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 border-2 border-background"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">
                    {t.hero.trustBadge}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm font-medium">
                    {t.hero.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Dashboard Mockup */}
            <div className="relative animate-fade-in-up delay-400">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 p-8">
                  <div className="space-y-4">
                    <div className="h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg" />

                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-24 bg-white/80 dark:bg-black/40 rounded-lg"
                        />
                      ))}
                    </div>
                    <div className="h-48 bg-white/80 dark:bg-black/40 rounded-lg" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">+30%</div>
                  <div className="text-xs">{t.benefits.revenue.badge}</div>
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
              {t.personas.schools.arguments.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.personas.schools.arguments.subtitle}
            </p>
          </div>

          <div className="space-y-24">
            {/* Argument 1: Time Saving */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <ClockIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />

                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {t.benefits.timeSaving.title}
                  </span>
                </div>
                <h3 className="text-3xl font-bold">
                  {t.benefits.timeSaving.stat}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {t.benefits.timeSaving.description}
                </p>
                <ul className="space-y-3">
                  {t.personas.schools.arguments.timeSaving.map(
                    (item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2Icon className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />

                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl border border-border bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950" />
            </div>

            {/* Argument 2: Revenue Growth */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl border border-border bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 lg:order-first" />

              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <TrendingUpIcon className="w-6 h-6 text-green-600 dark:text-green-400" />

                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {t.benefits.revenue.title}
                  </span>
                </div>
                <h3 className="text-3xl font-bold">
                  {t.benefits.revenue.stat}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {t.benefits.revenue.description}
                </p>
                <ul className="space-y-3">
                  {t.personas.schools.arguments.revenue.map(
                    (item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2Icon className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />

                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Argument 3: Compliance */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <ShieldCheckIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />

                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    {t.benefits.compliance.title}
                  </span>
                </div>
                <h3 className="text-3xl font-bold">
                  {t.benefits.compliance.stat}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {t.benefits.compliance.description}
                </p>
                <ul className="space-y-3">
                  {t.personas.schools.arguments.compliance.map(
                    (item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2Icon className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />

                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl border border-border bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Detailed Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {t.personas.schools.features.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.personas.schools.features.subtitle}
            </p>
          </div>

          <Tabs defaultValue="management" className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 mb-12">
              <TabsTrigger value="management">
                <UsersIcon className="w-4 h-4 mr-2" />

                {t.personas.schools.features.tabs.management}
              </TabsTrigger>
              <TabsTrigger value="planning">
                <CalendarIcon className="w-4 h-4 mr-2" />

                {t.personas.schools.features.tabs.planning}
              </TabsTrigger>
              <TabsTrigger value="billing">
                <FileTextIcon className="w-4 h-4 mr-2" />

                {t.personas.schools.features.tabs.billing}
              </TabsTrigger>
              <TabsTrigger value="marketing">
                <TargetIcon className="w-4 h-4 mr-2" />

                {t.personas.schools.features.tabs.marketing}
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <BarChart3Icon className="w-4 h-4 mr-2" />

                {t.personas.schools.features.tabs.analytics}
              </TabsTrigger>
            </TabsList>

            {[
              "management",
              "planning",
              "billing",
              "marketing",
              "analytics",
            ].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {t.personas.schools.features[
                    tab as keyof typeof t.personas.schools.features
                  ].map((feature: any, i: number) => (
                    <div
                      key={i}
                      className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                        <CheckCircle2Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {t.personas.schools.faq.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.personas.schools.faq.subtitle}
            </p>
          </div>

          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {t.personas.schools.faq.items.map((item: any, i: number) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />

        <div className="container relative z-10 px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            {t.finalCta.title}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t.finalCta.subtitle}
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-xl"
          >
            {t.cta.startFreeTrial}
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Button>
          <p className="mt-6 text-sm opacity-75">{t.finalCta.noCard}</p>
        </div>
      </section>

      <MarketingFooter locale={locale} />
    </div>
  );
}
