/**
 * VIAMENTOR - About Page Skeleton
 * Composant skeleton pour l'état de chargement de la page À propos
 *
 * @example
 * ```tsx
 * {isLoading ? <AboutPageSkeleton /> : <AboutPage />}
 * ```
 */

import { Skeleton } from "@/components/ui/skeleton";

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Skeleton complet de la page À propos
 * Affiche des placeholders pendant le chargement des données
 */
export function AboutPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Skeleton */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32" />

            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-24" />

              <Skeleton className="h-8 w-24" />

              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb Skeleton */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />

            <Skeleton className="h-4 w-4" />

            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="py-20 bg-gradient-to-b from-primary/5 via-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Skeleton className="h-16 w-3/4 mx-auto" />

            <Skeleton className="h-6 w-full" />

            <Skeleton className="h-6 w-5/6 mx-auto" />
          </div>
        </div>
      </section>

      {/* Story Timeline Skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-12 w-64 mx-auto mb-16" />

            <div className="space-y-12">
              {[1, 2, 3].map((i) => (
                <TimelineItemSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section Skeleton */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <Skeleton className="h-12 w-48 mx-auto" />

              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <TeamMemberSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section Skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-12 w-48 mx-auto mb-16" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <ValueCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Skeleton className="h-12 w-96 mx-auto" />

            <Skeleton className="h-6 w-full" />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-12 w-40" />

              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-32" />

                <Skeleton className="h-4 w-24" />

                <Skeleton className="h-4 w-28" />

                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Skeleton pour un élément de timeline
 */
function TimelineItemSkeleton() {
  return (
    <div className="relative pl-8 md:pl-12 border-l-2 border-primary">
      <div className="absolute -left-[1.125rem] top-0 h-9 w-9 rounded-full bg-primary" />

      <div className="bg-card border border-border rounded-xl p-6 space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-20" />

          <Skeleton className="h-6 w-48" />
        </div>
        <Skeleton className="h-4 w-full" />

        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

/**
 * Skeleton pour une carte membre d'équipe
 */
function TeamMemberSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-32" />

        <Skeleton className="h-4 w-24" />

        <Skeleton className="h-4 w-full" />

        <Skeleton className="h-4 w-5/6" />

        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

/**
 * Skeleton pour une carte valeur
 */
function ValueCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <div className="flex items-start gap-4">
        <Skeleton className="h-14 w-14 rounded-xl flex-shrink-0" />

        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-32" />

          <Skeleton className="h-4 w-full" />

          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  );
}
