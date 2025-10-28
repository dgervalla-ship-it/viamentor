/**
 * ============================================================================
 * VIAMENTOR - Responsive Page Wrapper
 * ============================================================================
 *
 * Wrapper réutilisable pour rendre n'importe quelle page responsive avec:
 * - Tabs mobile automatiques pour séparer sections
 * - Swipe gestures pour navigation
 * - Touch-friendly interactions
 * - Breakpoints adaptatifs
 *
 * @example
 * ```tsx
 * <ResponsivePageWrapper
 *   title="Dashboard École"
 *   description="Bienvenue dans votre espace"
 *   sections={[
 *     { id: 'stats', label: 'Statistiques', content: <StatsSection /> },
 *     { id: 'activity', label: 'Activité', content: <ActivitySection /> }
 *   ]}
 *   mobileTabsEnabled={true}
 *   swipeEnabled={true}
 * />
 * ```
 */

"use client";

import { ReactNode, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/viamentor/data/viamentor-responsive-utils";
import { useSwipeGesture } from "@/viamentor/data/viamentor-touch-gestures";

// ============================================================================
// TYPES
// ============================================================================

export interface PageSection {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
  badge?: string | number;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

export interface ResponsivePageWrapperProps {
  // Header
  title: string;
  description?: string;
  actions?: ReactNode;
  alerts?: ReactNode;

  // Sections
  sections: PageSection[];
  defaultSection?: string;

  // Mobile behavior
  mobileTabsEnabled?: boolean; // Activer tabs sur mobile (défaut: true)
  mobileTabsBreakpoint?: "sm" | "md" | "lg"; // Breakpoint tabs (défaut: "lg")
  swipeEnabled?: boolean; // Activer swipe navigation (défaut: true)

  // Layout
  layout?: "stacked" | "grid"; // Layout desktop (défaut: "stacked")
  gridColumns?: 1 | 2 | 3; // Colonnes grid desktop (défaut: 2)

  // Styling
  className?: string;
  sectionClassName?: string;
  spacing?: "compact" | "normal" | "relaxed"; // Espacement (défaut: "normal")

  // Callbacks
  onSectionChange?: (sectionId: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ResponsivePageWrapper({
  title,
  description,
  actions,
  alerts,
  sections,
  defaultSection,
  mobileTabsEnabled = true,
  mobileTabsBreakpoint = "lg",
  swipeEnabled = true,
  layout = "stacked",
  gridColumns = 2,
  className,
  sectionClassName,
  spacing = "normal",
  onSectionChange,
}: ResponsivePageWrapperProps) {
  const [activeSection, setActiveSection] = useState(
    defaultSection || sections[0]?.id
  );

  // Détection device
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  // Breakpoint pour tabs
  const showMobileTabs =
    mobileTabsEnabled &&
    ((mobileTabsBreakpoint === "sm" && isMobile) ||
      (mobileTabsBreakpoint === "md" && (isMobile || isTablet)) ||
      (mobileTabsBreakpoint === "lg" && !isDesktop));

  // Swipe gesture pour navigation mobile
  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: () => {
      if (swipeEnabled && currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        setActiveSection(nextSection.id);
        onSectionChange?.(nextSection.id);
      }
    },
    onSwipeRight: () => {
      if (swipeEnabled && currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        setActiveSection(prevSection.id);
        onSectionChange?.(prevSection.id);
      }
    },
    swipeThreshold: 50,
  });

  // Filtrer sections selon device
  const visibleSections = sections.filter((section) => {
    if (section.mobileOnly && !isMobile) return false;
    if (section.desktopOnly && isMobile) return false;
    return true;
  });

  // Classes espacement
  const spacingClasses = {
    compact: "space-y-3",
    normal: "space-y-6",
    relaxed: "space-y-8",
  };

  // Classes grid
  const gridClasses = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
  };

  // ============================================================================
  // RENDER: MOBILE TABS
  // ============================================================================

  if (showMobileTabs) {
    return (
      <div className={cn(spacingClasses[spacing], className)}>
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold truncate">
                {title}
              </h1>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
            {actions && <div className="flex-shrink-0">{actions}</div>}
          </div>
        </div>

        {/* Alerts */}
        {alerts && <div>{alerts}</div>}

        {/* Tabs Mobile */}
        <Tabs
          value={activeSection}
          onValueChange={(value) => {
            setActiveSection(value);
            onSectionChange?.(value);
          }}
          className="w-full"
        >
          {/* Tabs List - Scrollable horizontal sur mobile */}
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto p-1 bg-muted/50">
            {visibleSections.map((section) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                className="flex items-center gap-2 whitespace-nowrap data-[state=active]:bg-background"
              >
                {section.icon}
                <span className="text-sm">{section.label}</span>
                {section.badge && (
                  <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {section.badge}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tabs Content - Avec swipe gestures */}
          <div {...(swipeEnabled ? swipeHandlers : {})}>
            {visibleSections.map((section) => (
              <TabsContent
                key={section.id}
                value={section.id}
                className={cn("mt-4", sectionClassName)}
              >
                {section.content}
              </TabsContent>
            ))}
          </div>

          {/* Swipe Indicator */}
          {swipeEnabled && visibleSections.length > 1 && (
            <div className="flex justify-center gap-1 mt-4">
              {visibleSections.map((section, index) => (
                <div
                  key={section.id}
                  className={cn(
                    "h-1 rounded-full transition-all",
                    section.id === activeSection
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>
          )}
        </Tabs>
      </div>
    );
  }

  // ============================================================================
  // RENDER: DESKTOP STACKED/GRID
  // ============================================================================

  return (
    <div className={cn(spacingClasses[spacing], className)}>
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex-shrink-0">{actions}</div>}
        </div>
      </div>

      {/* Alerts */}
      {alerts && <div>{alerts}</div>}

      {/* Sections - Stacked ou Grid */}
      <div
        className={cn(
          layout === "grid" &&
            `grid grid-cols-1 gap-6 ${gridClasses[gridColumns]}`,
          layout === "stacked" && spacingClasses[spacing]
        )}
      >
        {visibleSections.map((section) => (
          <div key={section.id} className={sectionClassName}>
            {section.content}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// EXPORT
// ============================================================================

export default ResponsivePageWrapper;
