/**
 * VIAMENTOR - Breadcrumb Component
 * Composant de fil d'Ariane réutilisable avec accessibilité complète
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: "Accueil", href: "/" },
 *     { label: "À propos", current: true }
 *   ]}
 * />
 * ```
 */

import { Link } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";
import type { BreadcrumbItem } from "@/viamentor/data/viamentor-about-page-types";

// ============================================================================
// TYPES
// ============================================================================

interface BreadcrumbProps {
  /** Liste des éléments du breadcrumb */
  items: BreadcrumbItem[];
  /** Classe CSS additionnelle */
  className?: string;
  /** Label aria pour la navigation (i18n) */
  ariaLabel?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Composant Breadcrumb avec accessibilité WCAG AA
 *
 * Features:
 * - Navigation sémantique avec <nav> et aria-label
 * - aria-current="page" sur l'élément actif
 * - Séparateurs visuels et accessibles
 * - Responsive mobile-first
 * - Support clavier complet
 */
export function Breadcrumb({
  items,
  className = "",
  ariaLabel = "Fil d'Ariane",
}: BreadcrumbProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label={ariaLabel}
      className={`border-b border-border bg-muted/30 ${className}`}
    >
      <div className="container mx-auto px-4 py-4">
        <ol className="flex items-center gap-2 text-sm flex-wrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isCurrent = item.current || isLast;

            return (
              <li
                key={`${item.label}-${index}`}
                className="flex items-center gap-2"
              >
                {/* Breadcrumb Item */}
                {item.href && !isCurrent ? (
                  <Link
                    to={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1"
                    aria-label={`Naviguer vers ${item.label}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-foreground font-medium"
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}

                {/* Separator */}
                {!isLast && (
                  <ChevronRightIcon
                    className="h-4 w-4 text-muted-foreground flex-shrink-0"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

// ============================================================================
// STRUCTURED DATA HELPER
// ============================================================================

/**
 * Génère les données structurées JSON-LD pour le breadcrumb
 * À utiliser avec le composant SEOHead
 *
 * @example
 * ```tsx
 * const breadcrumbData = generateBreadcrumbStructuredData(items, "https://viamentor.ch");
 * <SEOHead structuredData={[breadcrumbData]} />
 * ```
 */
export function generateBreadcrumbStructuredData(
  items: BreadcrumbItem[],
  baseUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
      .filter((item) => item.href) // Seulement les items avec href
      .map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: `${baseUrl}${item.href}`,
      })),
  };
}
