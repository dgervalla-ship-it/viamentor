/**
 * VIAMENTOR - Comparison Table Component
 * Table de comparaison détaillée des fonctionnalités par plan
 */

"use client";

import { CheckIcon, XIcon } from "lucide-react";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/viamentor/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface ComparisonTableProps {
  locale?: MarketingLocale;
  className?: string;
}

interface Feature {
  category: string;
  name: string;
  starter: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
}

// ============================================================================
// DATA
// ============================================================================

const features: Feature[] = [
  // Gestion élèves
  {
    category: "Gestion élèves",
    name: "Nombre d'élèves",
    starter: "30 max",
    professional: "100",
    enterprise: "Illimité",
  },
  {
    category: "Gestion élèves",
    name: "Dossiers élèves complets",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    category: "Gestion élèves",
    name: "Documents élèves",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    category: "Gestion élèves",
    name: "Progression pédagogique",
    starter: false,
    professional: true,
    enterprise: true,
  },

  // Planning
  {
    category: "Planning",
    name: "Calendrier intelligent",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    category: "Planning",
    name: "Détection conflits",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    category: "Planning",
    name: "Réservations en ligne",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    category: "Planning",
    name: "Sync Google/Outlook",
    starter: false,
    professional: true,
    enterprise: true,
  },

  // Facturation
  {
    category: "Facturation",
    name: "QR-factures suisses",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    category: "Facturation",
    name: "Relances automatiques",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    category: "Facturation",
    name: "Paiements en ligne",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    category: "Facturation",
    name: "Export comptabilité",
    starter: false,
    professional: true,
    enterprise: true,
  },

  // Marketing
  {
    category: "Marketing",
    name: "CRM prospects",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    category: "Marketing",
    name: "Campagnes email",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    category: "Marketing",
    name: "Tracking pixels",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    category: "Marketing",
    name: "Analytics marketing",
    starter: false,
    professional: true,
    enterprise: true,
  },

  // Analytics
  {
    category: "Analytics",
    name: "Tableaux de bord",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    category: "Analytics",
    name: "Rapports avancés",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    category: "Analytics",
    name: "Prévisions IA",
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    category: "Analytics",
    name: "Exports personnalisés",
    starter: false,
    professional: true,
    enterprise: true,
  },

  // Support
  {
    category: "Support",
    name: "Support email",
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    category: "Support",
    name: "Support prioritaire",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    category: "Support",
    name: "Account manager dédié",
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    category: "Support",
    name: "Formation sur site",
    starter: false,
    professional: false,
    enterprise: true,
  },

  // Technique
  {
    category: "Technique",
    name: "API access",
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    category: "Technique",
    name: "SSO SAML",
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    category: "Technique",
    name: "SLA 99.9%",
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    category: "Technique",
    name: "White-label",
    starter: false,
    professional: false,
    enterprise: true,
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function ComparisonTable({
  locale = "fr",
  className,
}: ComparisonTableProps) {
  const t = getMarketingTranslations(locale);

  // Group features by category
  const categories = Array.from(new Set(features.map((f) => f.category))).map(
    (category) => ({
      name: category,
      features: features.filter((f) => f.category === category),
    })
  );

  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <CheckIcon className="h-5 w-5 text-green-600 mx-auto" />
      ) : (
        <XIcon className="h-5 w-5 text-muted-foreground/30 mx-auto" />
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

  return (
    <section className={`py-24 px-4 sm:px-6 lg:px-8 ${className || ""}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t.pricing.comparison.title}
          </h2>
          <p className="text-muted-foreground">
            {t.pricing.comparison.subtitle}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-6 font-semibold">
                  Fonctionnalité
                </th>
                <th className="text-center py-4 px-6 font-semibold">Starter</th>
                <th className="text-center py-4 px-6 font-semibold">
                  Professional
                </th>
                <th className="text-center py-4 px-6 font-semibold">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <>
                  <tr key={category.name} className="bg-muted/50">
                    <td colSpan={4} className="py-3 px-6 font-semibold text-sm">
                      {category.name}
                    </td>
                  </tr>
                  {category.features.map((feature, index) => (
                    <tr
                      key={`${category.name}-${index}`}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-4 px-6 text-sm">{feature.name}</td>
                      <td className="py-4 px-6 text-center">
                        {renderCell(feature.starter)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {renderCell(feature.professional)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {renderCell(feature.enterprise)}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
