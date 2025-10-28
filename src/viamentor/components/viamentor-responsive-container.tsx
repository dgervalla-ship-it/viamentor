/**
 * ============================================================================
 * VIAMENTOR - RESPONSIVE CONTAINER
 * ============================================================================
 *
 * Composant wrapper réutilisable pour gérer le responsive design
 * Implémentation des recommandations de l'audit Responsive Design
 */

"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

// ============================================================================
// TYPES
// ============================================================================

export interface ResponsiveContainerProps {
  /**
   * Vue mobile (< 768px)
   * Si non fournie, utilise la vue desktop
   */
  mobile?: React.ReactNode;

  /**
   * Vue tablette (768px - 1023px)
   * Si non fournie, utilise la vue desktop
   */
  tablet?: React.ReactNode;

  /**
   * Vue desktop (>= 1024px)
   * Vue par défaut utilisée si mobile/tablet non fournis
   */
  desktop: React.ReactNode;

  /**
   * Classes CSS additionnelles
   */
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Composant wrapper pour gérer le responsive design
 *
 * @example
 * ```tsx
 * <ResponsiveContainer
 *   mobile={<MobileView />}
 *   tablet={<TabletView />}
 *   desktop={<DesktopView />}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Avec fallback desktop
 * <ResponsiveContainer
 *   mobile={<MobileCards />}
 *   desktop={<DesktopTable />}
 * />
 * ```
 */
export function ResponsiveContainer({
  mobile,
  tablet,
  desktop,
  className,
}: ResponsiveContainerProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  // Mobile view
  if (isMobile && mobile) {
    return <div className={className}>{mobile}</div>;
  }

  // Tablet view
  if (isTablet && tablet) {
    return <div className={className}>{tablet}</div>;
  }

  // Desktop view (default)
  return <div className={className}>{desktop}</div>;
}

// ============================================================================
// HOOK: useMediaQuery
// ============================================================================

/**
 * Hook pour détecter les media queries
 * À créer dans hooks/use-media-query.ts si n'existe pas
 */
export function useMediaQueryHook(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Listen for changes
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

export const usageExamples = {
  dataTable: `
// ============================================================================
// components/students-table.tsx
// DataTable avec vue mobile cards
// ============================================================================

import { ResponsiveContainer } from "@/components/viamentor-responsive-container"
import { DataTable } from "@/components/ui/data-table"
import { Card } from "@/components/ui/card"

export function StudentsTable({ students }) {
  return (
    <ResponsiveContainer
      mobile={
        <div className="space-y-4">
          {students.map((student) => (
            <Card key={student.id} className="p-4">
              <h3 className="font-semibold">{student.name}</h3>
              <dl className="mt-2 space-y-1 text-sm">
                <div>
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>{student.email}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Statut</dt>
                  <dd><Badge>{student.status}</Badge></dd>
                </div>
              </dl>
            </Card>
          ))}
        </div>
      }
      desktop={
        <DataTable
          columns={columns}
          data={students}
        />
      }
    />
  )
}
`,

  planningCalendar: `
// ============================================================================
// components/planning-calendar.tsx
// Calendar avec vue mobile jour par jour
// ============================================================================

import { ResponsiveContainer } from "@/components/viamentor-responsive-container"

export function PlanningCalendar({ events }) {
  return (
    <ResponsiveContainer
      mobile={
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Aujourd'hui</h2>
          <div className="space-y-2">
            {events.map((event) => (
              <Card key={event.id} className="p-4">
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  <span className="font-medium">{event.time}</span>
                </div>
                <p className="mt-2">{event.title}</p>
              </Card>
            ))}
          </div>
        </div>
      }
      tablet={
        <WeekView events={events} />
      }
      desktop={
        <MonthView events={events} />
      }
    />
  )
}
`,

  dashboard: `
// ============================================================================
// pages/dashboard-page.tsx
// Dashboard avec grilles adaptatives
// ============================================================================

import { ResponsiveContainer } from "@/components/viamentor-responsive-container"

export function DashboardPage() {
  return (
    <ResponsiveContainer
      mobile={
        <div className="space-y-4">
          {/* 1 colonne sur mobile */}
          <StatsCard />
          <StatsCard />
          <StatsCard />
          <RecentActivity />
        </div>
      }
      tablet={
        <div className="grid grid-cols-2 gap-4">
          {/* 2 colonnes sur tablette */}
          <StatsCard />
          <StatsCard />
          <StatsCard />
          <StatsCard />
          <div className="col-span-2">
            <RecentActivity />
          </div>
        </div>
      }
      desktop={
        <div className="grid grid-cols-4 gap-6">
          {/* 4 colonnes sur desktop */}
          <StatsCard />
          <StatsCard />
          <StatsCard />
          <StatsCard />
          <div className="col-span-4">
            <RecentActivity />
          </div>
        </div>
      }
    />
  )
}
`,

  filters: `
// ============================================================================
// components/filters-bar.tsx
// Filters avec drawer mobile
// ============================================================================

import { ResponsiveContainer } from "@/components/viamentor-responsive-container"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function FiltersBar({ filters, onFilterChange }) {
  return (
    <ResponsiveContainer
      mobile={
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <FiltersForm filters={filters} onChange={onFilterChange} />
          </SheetContent>
        </Sheet>
      }
      desktop={
        <div className="flex gap-4">
          <FiltersForm filters={filters} onChange={onFilterChange} />
        </div>
      }
    />
  )
}
`,
};

// ============================================================================
// BEST PRACTICES
// ============================================================================

export const bestPractices = [
  "✅ Mobile-first: vue mobile par défaut, puis tablet, puis desktop",
  "✅ Fallback: si mobile/tablet non fournis, utilise desktop",
  "✅ Performance: useMediaQuery avec addEventListener (pas de polling)",
  "✅ SSR-safe: useEffect pour éviter hydration mismatch",
  "✅ Touch targets: 44x44px minimum sur mobile",
  "✅ Viewport meta: <meta name='viewport' content='width=device-width, initial-scale=1'>",
  "✅ Tester sur vrais devices: iPhone, iPad, Android",
  "✅ Éviter horizontal scroll: overflow-x-hidden",
  "✅ Images responsive: next/image avec sizes",
  "✅ Fonts lisibles: minimum 16px sur mobile",
];

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  mobile: {
    max: "767px",
    description: "Smartphones",
    usage: "1 colonne, cards verticales, drawer pour filtres",
  },
  tablet: {
    min: "768px",
    max: "1023px",
    description: "Tablettes",
    usage: "2 colonnes, table scrollable, sidebar collapsible",
  },
  desktop: {
    min: "1024px",
    description: "Desktop",
    usage: "3-4 colonnes, table complète, sidebar expanded",
  },
};

// ============================================================================
// EXPORT
// ============================================================================

export default ResponsiveContainer;

// Fix missing imports
import { useState, useEffect } from "react";
