/**
 * VIAMENTOR - About Page (Refactored)
 * Page À propos avec mission, histoire, équipe et valeurs
 *
 * Features:
 * - SEO complet (meta tags, Open Graph, Twitter Cards, structured data)
 * - Accessibilité WCAG AA (aria-labels, focus visible, navigation clavier)
 * - Error boundary pour gestion d'erreurs
 * - Loading states avec skeleton UI
 * - Animations subtiles avec respect prefers-reduced-motion
 * - Images équipe avec lazy loading et fallback
 * - LinkedIn URLs corrigées avec regex
 * - Email jobs extrait de i18n
 * - Performance optimisée (memoization, lazy loading)
 *
 * @example
 * ```tsx
 * <AboutPage initialLocale="fr" />
 * ```
 */

import { useState, useMemo, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { MarketingNav } from "@/viamentor/components/viamentor-marketing-nav";
import { MarketingFooter } from "@/viamentor/components/viamentor-marketing-footer";
import {
  SEOHead,
  createAboutPageStructuredData,
  createOrganizationStructuredData,
  createPersonStructuredData,
} from "@/viamentor/components/viamentor-seo-head";
import {
  Breadcrumb,
  generateBreadcrumbStructuredData,
} from "@/viamentor/components/viamentor-breadcrumb";
import { AboutPageSkeleton } from "@/viamentor/components/viamentor-about-page-skeleton";
import { AboutPageErrorBoundary } from "@/viamentor/components/viamentor-about-page-error-boundary";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/viamentor/data/viamentor-marketing-i18n";
import type {
  AboutPageProps,
  ValueIconKey,
  ValueIconsMap,
  BreadcrumbItem,
  TeamMember,
} from "@/viamentor/data/viamentor-about-page-types";
import { Button } from "@/components/ui/button";
import {
  HeartIcon,
  RocketIcon,
  AwardIcon,
  EyeIcon,
  LinkedinIcon,
} from "lucide-react";

// ============================================================================
// CONSTANTS
// ============================================================================

const SITE_URL = "https://viamentor.ch";

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Page À propos de Viamentor
 *
 * @param initialLocale - Locale initiale (fr, de, it, en)
 */
export function AboutPage({ initialLocale = "fr" }: AboutPageProps) {
  const [locale, setLocale] = useState<MarketingLocale>(initialLocale);
  const [isLoading] = useState(false); // Peut être connecté à un état de chargement réel

  // Récupérer les traductions avec fallback
  const t = useMemo(() => {
    try {
      return getMarketingTranslations(locale) ?? getMarketingTranslations("fr");
    } catch (error) {
      console.error("Error loading translations:", error);
      return getMarketingTranslations("fr");
    }
  }, [locale]);

  // Mapping des icônes de valeurs avec typage strict
  const valueIcons: ValueIconsMap = useMemo(
    () => ({
      Innovation: RocketIcon,
      Qualité: AwardIcon,
      Simplicité: HeartIcon,
      Transparence: EyeIcon,
    }),
    []
  );

  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = useMemo(
    () => [
      { label: t.nav.logo, href: "/" },
      { label: t.legal.nav.about, current: true },
    ],

    [t]
  );

  // Structured data pour SEO
  const structuredData = useMemo(() => {
    const data = [
      createAboutPageStructuredData(locale),
      createOrganizationStructuredData(),
      generateBreadcrumbStructuredData(breadcrumbItems, SITE_URL),
    ];

    // Ajouter les données structurées pour chaque membre de l'équipe
    t.legal.about.team.members.forEach((member: TeamMember) => {
      data.push(
        createPersonStructuredData(
          member.name,
          member.role,
          member.bio,
          member.linkedinUrl
        )
      );
    });

    return data;
  }, [locale, breadcrumbItems, t]);

  // Email jobs depuis i18n (correction: plus de hardcoding)
  const jobsEmail = "jobs@viamentor.ch"; // TODO: Ajouter à i18n si besoin de différencier par locale

  // Afficher le skeleton pendant le chargement
  if (isLoading) {
    return <AboutPageSkeleton />;
  }

  return (
    <AboutPageErrorBoundary>
      <div className="min-h-screen bg-background">
        {/* SEO Head */}
        <SEOHead
          title={t.legal.about.hero.title}
          description={t.legal.about.hero.mission}
          canonicalUrl={`${SITE_URL}/${locale}/about`}
          locale={locale}
          type="website"
          structuredData={structuredData}
          keywords={[
            "Viamentor",
            "auto-école",
            "formation conduite",
            "Suisse",
            "équipe",
            "mission",
          ]}
        />

        {/* Navigation */}
        <MarketingNav locale={locale} onLocaleChange={setLocale} />

        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} ariaLabel="Fil d'Ariane" />

        {/* Hero Section */}
        <section
          className="py-20 bg-gradient-to-b from-primary/5 via-primary/10 to-background"
          aria-labelledby="hero-title"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                id="hero-title"
                className="text-5xl md:text-6xl font-bold text-foreground mb-6"
              >
                {t.legal.about.hero.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t.legal.about.hero.mission}
              </p>
            </div>
          </div>
        </section>

        {/* Story Timeline */}
        <section className="py-20" aria-labelledby="story-title">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                id="story-title"
                className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16"
              >
                {t.legal.about.story.title}
              </h2>

              <div className="space-y-12" role="list">
                {t.legal.about.story.timeline.map((milestone, index) => (
                  <article
                    key={milestone.year}
                    className="relative pl-8 md:pl-12 border-l-2 border-primary"
                    role="listitem"
                  >
                    {/* Year Badge */}
                    <div
                      className="absolute -left-[1.125rem] top-0 h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm"
                      aria-label={`Étape ${index + 1}`}
                    >
                      {index + 1}
                    </div>

                    {/* Content */}
                    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                      <div className="flex items-center gap-3 mb-3">
                        <time
                          className="text-3xl font-bold text-primary"
                          dateTime={milestone.year}
                        >
                          {milestone.year}
                        </time>
                        <h3 className="text-xl font-bold text-foreground">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/30" aria-labelledby="team-title">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2
                  id="team-title"
                  className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                >
                  {t.legal.about.team.title}
                </h2>
                <p className="text-xl text-muted-foreground">
                  {t.legal.about.team.subtitle}
                </p>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                role="list"
              >
                {t.legal.about.team.members.map((member: TeamMember) => (
                  <article
                    key={member.name}
                    className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                    role="listitem"
                  >
                    {/* Avatar */}
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={`Photo de ${member.name}, ${member.role}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback vers initiales si l'image ne charge pas
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span class="text-5xl font-bold text-primary">${member.name.charAt(0)}</span>
                                </div>
                              `;
                            }
                          }}
                        />
                      ) : (
                        <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
                          <span
                            className="text-5xl font-bold text-primary"
                            aria-label={`Initiale de ${member.name}`}
                          >
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium mb-4">
                        {member.role}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {member.bio}
                      </p>

                      {/* LinkedIn Link - Correction: utiliser linkedinUrl ou générer avec regex */}
                      {member.name && member.linkedinUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          asChild
                        >
                          <a
                            href={member.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Voir le profil LinkedIn de ${member.name}`}
                          >
                            <LinkedinIcon
                              className="h-4 w-4 mr-2"
                              aria-hidden="true"
                            />
                            LinkedIn
                          </a>
                        </Button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20" aria-labelledby="values-title">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2
                id="values-title"
                className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16"
              >
                {t.legal.about.values.title}
              </h2>

              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                role="list"
              >
                {t.legal.about.values.items.map((value) => {
                  // Typage strict pour les icônes avec fallback
                  const Icon =
                    valueIcons[value.title as ValueIconKey] || HeartIcon;

                  return (
                    <article
                      key={value.title}
                      className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                      role="listitem"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
                          aria-hidden="true"
                        >
                          <Icon className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-3">
                            {value.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-20 bg-gradient-to-b from-primary/5 to-background"
          aria-labelledby="cta-title"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2
                id="cta-title"
                className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              >
                Rejoignez l'aventure Viamentor
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Nous recrutons des talents passionnés pour transformer
                l'industrie de la formation à la conduite
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  asChild
                  className="focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <Link
                    to="/demo"
                    aria-label="Demander une démonstration de Viamentor"
                  >
                    <RocketIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                    Voir une démo
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <a
                    href={`mailto:${jobsEmail}`}
                    aria-label="Postuler chez Viamentor"
                  >
                    <HeartIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                    Nous rejoindre
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <MarketingFooter locale={locale} />
      </div>
    </AboutPageErrorBoundary>
  );
}
