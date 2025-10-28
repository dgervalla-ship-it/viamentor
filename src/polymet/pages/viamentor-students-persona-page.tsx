/**
 * VIAMENTOR - Page Persona Élèves
 * Page marketing ciblée pour les élèves avec arguments et FAQ
 */

import {
  ArrowRight,
  Play,
  Home,
  ChevronRight,
  Clock,
  CreditCard,
  TrendingUp,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FAQAccordion } from "@/polymet/components/viamentor-faq-accordion";
import {
  getPersonasTranslations,
  type PersonasLocale,
} from "@/polymet/data/viamentor-personas-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface StudentsPersonaPageProps {
  locale?: PersonasLocale;
}

// ============================================================================
// ICONS MAP
// ============================================================================

const ARGUMENT_ICONS = {
  0: Clock,
  1: CreditCard,
  2: TrendingUp,
  3: FolderOpen,
};

const ICON_COLORS = [
  "text-purple-600 dark:text-purple-400",
  "text-pink-600 dark:text-pink-400",
  "text-indigo-600 dark:text-indigo-400",
  "text-violet-600 dark:text-violet-400",
];

const ICON_BG_COLORS = [
  "bg-purple-100 dark:bg-purple-950",
  "bg-pink-100 dark:bg-pink-950",
  "bg-indigo-100 dark:bg-indigo-950",
  "bg-violet-100 dark:bg-violet-950",
];

// ============================================================================
// COMPONENT
// ============================================================================

export function StudentsPersonaPage({
  locale = "fr",
}: StudentsPersonaPageProps) {
  const t = getPersonasTranslations(locale);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />

                  {t.breadcrumb.home}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="w-4 h-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{t.breadcrumb.students}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-pink-800 dark:from-purple-900 dark:via-purple-950 dark:to-background">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />

          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8 text-white">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm">
                  Pour Élèves
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  {t.students.hero.title}
                </h1>
                <p className="text-xl text-purple-100">
                  {t.students.hero.subtitle}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-purple-50 shadow-xl"
                >
                  {t.students.hero.ctaPrimary}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Play className="w-5 h-5 mr-2" />

                  {t.students.hero.ctaSecondary}
                </Button>
              </div>

              {/* Trust signals */}
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">15K+</div>
                  <div className="text-sm text-purple-200">Élèves actifs</div>
                </div>
                <div className="h-12 w-px bg-white/20" />

                <div className="text-center">
                  <div className="text-3xl font-bold">4.9/5</div>
                  <div className="text-sm text-purple-200">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right: Mockup */}
            <div className="relative">
              <Card className="aspect-[9/16] max-w-xs mx-auto bg-background/95 backdrop-blur border-2 shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950" />

                <div className="absolute inset-0 flex flex-col p-6 gap-4">
                  <div className="h-16 bg-muted rounded-lg" />

                  <div className="flex-1 bg-muted rounded-lg" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-muted rounded-lg" />

                    <div className="h-20 bg-muted rounded-lg" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Arguments Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              {t.students.arguments.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.students.arguments.items.map((item, index) => {
              const Icon = ARGUMENT_ICONS[index as keyof typeof ARGUMENT_ICONS];
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-200"
                >
                  <CardContent className="p-8 space-y-4">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-xl ${ICON_BG_COLORS[index]} flex items-center justify-center`}
                    >
                      <Icon className={`w-8 h-8 ${ICON_COLORS[index]}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-foreground">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion
            title={t.students.faq.title}
            items={t.students.faq.items}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Commencez votre parcours aujourd'hui
          </h2>
          <p className="text-xl text-white/90">
            Rejoignez 15'000+ élèves qui apprennent avec ViaMenutor
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-700 hover:bg-purple-50 shadow-xl"
            >
              {t.students.hero.ctaPrimary}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              {t.students.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
