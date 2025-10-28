/**
 * VIAMENTOR - Page Persona Auto-écoles
 * Page marketing ciblée pour les auto-écoles avec arguments, fonctionnalités et FAQ
 */

import { ArrowRight, Play, Home, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArgumentsGrid } from "@/polymet/components/viamentor-arguments-grid";
import { FeaturesDetailed } from "@/polymet/components/viamentor-features-detailed";
import { FAQAccordion } from "@/polymet/components/viamentor-faq-accordion";
import {
  getPersonasTranslations,
  type PersonasLocale,
} from "@/polymet/data/viamentor-personas-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface SchoolsPersonaPageProps {
  locale?: PersonasLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function SchoolsPersonaPage({ locale = "fr" }: SchoolsPersonaPageProps) {
  const t = getPersonasTranslations(locale);

  // Arguments blocks
  const argumentBlocks = [
    {
      icon: "clock" as const,
      title: t.schools.why.block1.title,
      subtitle: t.schools.why.block1.subtitle,
      items: t.schools.why.block1.benefits,
      imagePosition: "left" as const,
    },
    {
      icon: "trending" as const,
      title: t.schools.why.block2.title,
      subtitle: t.schools.why.block2.subtitle,
      items: t.schools.why.block2.features,
      imagePosition: "right" as const,
    },
    {
      icon: "shield" as const,
      title: t.schools.why.block3.title,
      subtitle: t.schools.why.block3.subtitle,
      items: t.schools.why.block3.certifications,
      imagePosition: "left" as const,
    },
  ];

  // Features tabs
  const featuresTabs = [
    {
      id: "management",
      label: t.schools.features.tabs.management,
      icon: "users" as const,
      features: [
        {
          title: "Gestion élèves complète",
          description:
            "Fiche élève détaillée, documents, progression, historique complet",
          icon: "users",
        },
        {
          title: "Wizard inscription 5 étapes",
          description:
            "Processus guidé avec validation automatique des prérequis OAC",
          icon: "users",
        },
        {
          title: "Multi-catégories permis",
          description:
            "Support toutes catégories A/B/C/D avec règles spécifiques",
          icon: "users",
        },
      ],
    },
    {
      id: "planning",
      label: t.schools.features.tabs.planning,
      icon: "calendar" as const,
      features: [
        {
          title: "Planning intelligent",
          description: "Détection automatique conflits, suggestions optimales",
          icon: "calendar",
        },
        {
          title: "Drag & Drop",
          description:
            "Interface intuitive pour déplacer et organiser les leçons",
          icon: "calendar",
        },
        {
          title: "Sync calendriers",
          description:
            "Synchronisation bidirectionnelle Google Calendar, Outlook",
          icon: "calendar",
        },
      ],
    },
    {
      id: "billing",
      label: t.schools.features.tabs.billing,
      icon: "file" as const,
      features: [
        {
          title: "QR-factures suisses",
          description:
            "Génération automatique conforme standards BVR et QR-factures",
          icon: "file",
        },
        {
          title: "Relances automatiques",
          description: "Workflow complet de gestion des impayés et relances",
          icon: "file",
        },
        {
          title: "Multi-devises",
          description: "Support CHF, EUR avec taux de change automatiques",
          icon: "file",
        },
      ],
    },
    {
      id: "marketing",
      label: t.schools.features.tabs.marketing,
      icon: "trending" as const,
      features: [
        {
          title: "CRM prospects",
          description:
            "Pipeline de conversion, suivi leads, scoring automatique",
          icon: "trending",
        },
        {
          title: "Campagnes emails",
          description: "Templates professionnels, envois programmés, tracking",
          icon: "trending",
        },
        {
          title: "Pixels tracking",
          description: "Google Analytics, Facebook Pixel, conversion tracking",
          icon: "trending",
        },
      ],
    },
    {
      id: "analytics",
      label: t.schools.features.tabs.analytics,
      icon: "chart" as const,
      features: [
        {
          title: "Dashboard KPIs",
          description:
            "Métriques temps réel : revenus, élèves actifs, taux réussite",
          icon: "chart",
        },
        {
          title: "Rapports financiers",
          description: "TVA, comptabilité, exports Excel/PDF automatiques",
          icon: "chart",
        },
        {
          title: "Analytics prédictifs",
          description: "Prévisions ML, recommandations, insights IA",
          icon: "chart",
        },
      ],
    },
  ];

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
                <BreadcrumbPage>{t.breadcrumb.schools}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-background">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8 text-white">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-sm">
                  Pour Auto-écoles Suisses
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  {t.schools.hero.title}
                </h1>
                <p className="text-xl text-blue-100">
                  {t.schools.hero.subtitle}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50 shadow-xl"
                >
                  {t.schools.hero.ctaPrimary}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Play className="w-5 h-5 mr-2" />

                  {t.schools.hero.ctaSecondary}
                </Button>
              </div>

              {/* Trust signals */}
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-blue-200">Auto-écoles</div>
                </div>
                <div className="h-12 w-px bg-white/20" />

                <div className="text-center">
                  <div className="text-3xl font-bold">4.9/5</div>
                  <div className="text-sm text-blue-200">Satisfaction</div>
                </div>
                <div className="h-12 w-px bg-white/20" />

                <div className="text-center">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm text-blue-200">Conforme</div>
                </div>
              </div>
            </div>

            {/* Right: Mockup */}
            <div className="relative">
              <Card className="aspect-[4/3] bg-background/95 backdrop-blur border-2 shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950" />

                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-full space-y-4">
                    <div className="h-12 bg-muted rounded-lg" />

                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-muted rounded-lg" />

                      <div className="h-24 bg-muted rounded-lg" />

                      <div className="h-24 bg-muted rounded-lg" />
                    </div>
                    <div className="h-32 bg-muted rounded-lg" />
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
              {t.schools.why.title}
            </h2>
          </div>
          <ArgumentsGrid blocks={argumentBlocks} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturesDetailed
            title={t.schools.features.title}
            tabs={featuresTabs}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion
            title={t.schools.faq.title}
            items={t.schools.faq.items}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Prêt à transformer votre auto-école ?
          </h2>
          <p className="text-xl text-white/90">
            Rejoignez les 500+ auto-écoles qui nous font confiance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 shadow-xl"
            >
              {t.schools.hero.ctaPrimary}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              {t.schools.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
