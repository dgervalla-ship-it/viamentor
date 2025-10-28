/**
 * VIAMENTOR - Analytics Central Page
 *
 * Page centrale regroupant tous les analytics du système avec navigation par onglets
 * - Revenus & Finance
 * - Performance Moniteurs
 * - Flotte Véhicules
 * - Examens & Réussite
 * - Campagnes Marketing
 * - Avis Google
 *
 * @module pages/viamentor-analytics-central-page
 */

import { useState, lazy, Suspense, memo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingUpIcon,
  UsersIcon,
  CarIcon,
  GraduationCapIcon,
  MegaphoneIcon,
  StarIcon,
} from "lucide-react";

// ============================================================================
// LAZY LOADING - Optimisation performance
// ============================================================================

// Lazy load des composants analytics pour réduire le bundle initial
const RevenueAnalyticsPage = lazy(() =>
  import("@/viamentor/pages/viamentor-revenue-analytics-page").then((module) => ({
    default: module.RevenueAnalyticsPage,
  }))
);
const InstructorsAnalyticsPage = lazy(() =>
  import("@/viamentor/pages/viamentor-instructors-analytics-page").then(
    (module) => ({ default: module.InstructorsAnalyticsPage })
  )
);
const VehiclesAnalyticsPage = lazy(() =>
  import("@/viamentor/pages/viamentor-vehicles-analytics-page").then(
    (module) => ({ default: module.VehiclesAnalyticsPage })
  )
);
const ExamsAnalyticsPage = lazy(() =>
  import("@/viamentor/pages/viamentor-exams-analytics-page").then((module) => ({
    default: module.ExamsAnalyticsPage,
  }))
);
const ReviewsDashboardPage = lazy(() =>
  import("@/viamentor/pages/viamentor-reviews-dashboard-page").then((module) => ({
    default: module.ReviewsDashboardPage,
  }))
);

// ============================================================================
// LOADING SKELETON
// ============================================================================

const AnalyticsLoadingSkeleton = memo(() => (
  <div className="space-y-6">
    {/* KPIs Skeleton */}
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="p-6">
          <Skeleton className="h-4 w-24 mb-2 bg-muted" />

          <Skeleton className="h-8 w-32 bg-muted" />
        </Card>
      ))}
    </div>
    {/* Charts Skeleton */}
    <Card className="p-6">
      <Skeleton className="h-[400px] w-full bg-muted" />
    </Card>
  </div>
));

AnalyticsLoadingSkeleton.displayName = "AnalyticsLoadingSkeleton";

// ============================================================================
// TYPES
// ============================================================================

interface AnalyticsCentralPageProps {
  locale?: "fr" | "de" | "it" | "en";
  defaultTab?: string;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Analytics & Rapports",
    description:
      "Vue d'ensemble des performances et statistiques de votre auto-école",
    tabs: {
      revenue: "Revenus & Finance",
      instructors: "Performance Moniteurs",
      vehicles: "Flotte Véhicules",
      exams: "Examens & Réussite",
      campaigns: "Campagnes Marketing",
      reviews: "Avis Google",
    },
  },
  de: {
    title: "Analytics & Berichte",
    description: "Überblick über Leistung und Statistiken Ihrer Fahrschule",
    tabs: {
      revenue: "Einnahmen & Finanzen",
      instructors: "Fahrlehrer-Leistung",
      vehicles: "Fahrzeugflotte",
      exams: "Prüfungen & Erfolg",
      campaigns: "Marketing-Kampagnen",
      reviews: "Google-Bewertungen",
    },
  },
  it: {
    title: "Analytics & Rapporti",
    description:
      "Panoramica delle prestazioni e statistiche della tua scuola guida",
    tabs: {
      revenue: "Ricavi & Finanze",
      instructors: "Performance Istruttori",
      vehicles: "Flotta Veicoli",
      exams: "Esami & Successo",
      campaigns: "Campagne Marketing",
      reviews: "Recensioni Google",
    },
  },
  en: {
    title: "Analytics & Reports",
    description: "Overview of your driving school's performance and statistics",
    tabs: {
      revenue: "Revenue & Finance",
      instructors: "Instructor Performance",
      vehicles: "Vehicle Fleet",
      exams: "Exams & Success",
      campaigns: "Marketing Campaigns",
      reviews: "Google Reviews",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function AnalyticsCentralPage({
  locale = "fr",
  defaultTab = "revenue",
}: AnalyticsCentralPageProps) {
  const t = translations[locale];
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t.title}
        </h1>
        <p className="text-muted-foreground">{t.description}</p>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 h-auto">
          <TabsTrigger value="revenue" className="flex items-center gap-2 py-3">
            <TrendingUpIcon className="h-4 w-4" />

            <span className="hidden sm:inline">{t.tabs.revenue}</span>
          </TabsTrigger>

          <TabsTrigger
            value="instructors"
            className="flex items-center gap-2 py-3"
          >
            <UsersIcon className="h-4 w-4" />

            <span className="hidden sm:inline">{t.tabs.instructors}</span>
          </TabsTrigger>

          <TabsTrigger
            value="vehicles"
            className="flex items-center gap-2 py-3"
          >
            <CarIcon className="h-4 w-4" />

            <span className="hidden sm:inline">{t.tabs.vehicles}</span>
          </TabsTrigger>

          <TabsTrigger value="exams" className="flex items-center gap-2 py-3">
            <GraduationCapIcon className="h-4 w-4" />

            <span className="hidden sm:inline">{t.tabs.exams}</span>
          </TabsTrigger>

          <TabsTrigger
            value="campaigns"
            className="flex items-center gap-2 py-3"
          >
            <MegaphoneIcon className="h-4 w-4" />

            <span className="hidden sm:inline">{t.tabs.campaigns}</span>
          </TabsTrigger>

          <TabsTrigger value="reviews" className="flex items-center gap-2 py-3">
            <StarIcon className="h-4 w-4" />

            <span className="hidden sm:inline">{t.tabs.reviews}</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents - Lazy loaded avec Suspense */}
        <TabsContent value="revenue" className="mt-6">
          <Suspense fallback={<AnalyticsLoadingSkeleton />}>
            <RevenueAnalyticsPage locale={locale} />
          </Suspense>
        </TabsContent>

        <TabsContent value="instructors" className="mt-6">
          <Suspense fallback={<AnalyticsLoadingSkeleton />}>
            <InstructorsAnalyticsPage locale={locale} />
          </Suspense>
        </TabsContent>

        <TabsContent value="vehicles" className="mt-6">
          <Suspense fallback={<AnalyticsLoadingSkeleton />}>
            <VehiclesAnalyticsPage locale={locale} />
          </Suspense>
        </TabsContent>

        <TabsContent value="exams" className="mt-6">
          <Suspense fallback={<AnalyticsLoadingSkeleton />}>
            <ExamsAnalyticsPage locale={locale} />
          </Suspense>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center gap-4 py-12">
              <MegaphoneIcon className="h-12 w-12 text-muted-foreground" />

              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground">
                  {locale === "fr"
                    ? "Analytics Campagnes Marketing"
                    : locale === "de"
                      ? "Marketing-Kampagnen Analytics"
                      : locale === "it"
                        ? "Analytics Campagne Marketing"
                        : "Marketing Campaigns Analytics"}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {locale === "fr"
                    ? "ROI et performance des campagnes marketing"
                    : locale === "de"
                      ? "ROI und Leistung der Marketing-Kampagnen"
                      : locale === "it"
                        ? "ROI e performance delle campagne marketing"
                        : "ROI and performance of marketing campaigns"}
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Suspense fallback={<AnalyticsLoadingSkeleton />}>
            <ReviewsDashboardPage locale={locale} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AnalyticsCentralPage;
