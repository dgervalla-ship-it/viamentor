/**
 * VIAMENTOR - Legal Terms Page
 * Page Mentions Légales avec conformité légale suisse complète
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { MarketingNav } from "@/polymet/components/viamentor-marketing-nav";
import { MarketingFooter } from "@/polymet/components/viamentor-marketing-footer";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/polymet/data/viamentor-marketing-i18n";
import {
  ChevronRightIcon,
  BuildingIcon,
  ServerIcon,
  UserIcon,
  ShieldCheckIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface LegalTermsPageProps {
  initialLocale?: MarketingLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function LegalTermsPage({ initialLocale = "fr" }: LegalTermsPageProps) {
  const [locale, setLocale] = useState<MarketingLocale>(initialLocale);
  const t = getMarketingTranslations(locale);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MarketingNav locale={locale} onLocaleChange={setLocale} />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              {t.nav.logo}
            </Link>
            <ChevronRightIcon className="h-4 w-4" />

            <span className="text-foreground font-medium">
              {t.legal.nav.terms}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.legal.terms.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t.legal.terms.updated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Publisher Section */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BuildingIcon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t.legal.terms.publisher.title}
                </h2>
              </div>

              <div className="space-y-4 text-foreground">
                <div>
                  <p className="font-semibold text-lg">
                    {t.legal.terms.publisher.company}
                  </p>
                  <p className="text-muted-foreground">
                    {t.legal.terms.publisher.address}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Numéro TVA</p>
                    <p className="font-mono font-medium">
                      {t.legal.terms.publisher.uid}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Numéro IDE</p>
                    <p className="font-mono font-medium">
                      {t.legal.terms.publisher.ide}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Registre du commerce
                    </p>
                    <p className="font-mono font-medium">
                      {t.legal.terms.publisher.rc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a
                        href={`mailto:${t.legal.terms.publisher.email}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {t.legal.terms.publisher.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <a
                        href={`tel:${t.legal.terms.publisher.phone}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {t.legal.terms.publisher.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hosting Section */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ServerIcon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t.legal.terms.hosting.title}
                </h2>
              </div>

              <p className="text-foreground">
                {t.legal.terms.hosting.provider}
              </p>

              <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">
                  <ShieldCheckIcon className="h-4 w-4 inline mr-2" />
                  Hébergement des données en Suisse pour garantir la conformité
                  RGPD/nLPD et la souveraineté des données.
                </p>
              </div>
            </div>

            {/* Director Section */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t.legal.terms.director.title}
                </h2>
              </div>

              <p className="text-foreground font-medium">
                {t.legal.terms.director.name}
              </p>
            </div>

            {/* Intellectual Property Section */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShieldCheckIcon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t.legal.terms.ip.title}
                </h2>
              </div>

              <p className="text-foreground leading-relaxed">
                {t.legal.terms.ip.content}
              </p>
            </div>

            {/* Related Links */}
            <div className="bg-muted/30 border border-border rounded-xl p-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Documents connexes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/confidentialite"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ChevronRightIcon className="h-4 w-4" />

                  {t.legal.nav.privacy}
                </Link>
                <Link
                  to="/cookies"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ChevronRightIcon className="h-4 w-4" />

                  {t.legal.nav.cookies}
                </Link>
                <Link
                  to="/a-propos"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ChevronRightIcon className="h-4 w-4" />

                  {t.legal.nav.about}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <MarketingFooter locale={locale} />
    </div>
  );
}
