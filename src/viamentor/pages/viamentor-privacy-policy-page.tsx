/**
 * VIAMENTOR - Privacy Policy Page
 * Page Politique de Confidentialité avec conformité RGPD/nLPD complète
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { MarketingNav } from "@/viamentor/components/viamentor-marketing-nav";
import { MarketingFooter } from "@/viamentor/components/viamentor-marketing-footer";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/viamentor/data/viamentor-marketing-i18n";
import { Button } from "@/components/ui/button";
import {
  ChevronRightIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  ClockIcon,
  UserCheckIcon,
  MailIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface PrivacyPolicyPageProps {
  initialLocale?: MarketingLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PrivacyPolicyPage({
  initialLocale = "fr",
}: PrivacyPolicyPageProps) {
  const [locale, setLocale] = useState<MarketingLocale>(initialLocale);
  const t = getMarketingTranslations(locale);

  const handleRightRequest = (right: string) => {
    console.warn(
      'Prevented assignment: `window.location.href = `mailto:${t.legal.privacy.controller.dpo.split(": ")[1]}?subject=Demande ${right}``'
    ) /*TODO: Do not use window.location for navigation. Use react-router instead.*/;
  };

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
              {t.legal.nav.privacy}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <ShieldCheckIcon className="h-4 w-4" />
              RGPD/nLPD Compliant
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.legal.privacy.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t.legal.privacy.updated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Controller Section */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <UserCheckIcon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t.legal.privacy.controller.title}
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-foreground font-semibold text-lg">
                  {t.legal.privacy.controller.company}
                </p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MailIcon className="h-4 w-4" />

                  <a
                    href={`mailto:${t.legal.privacy.controller.dpo.split(": ")[1]}`}
                    className="text-primary hover:underline"
                  >
                    {t.legal.privacy.controller.dpo}
                  </a>
                </div>
              </div>
            </div>

            {/* Data Collected Section */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DatabaseIcon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t.legal.privacy.dataCollected.title}
                </h2>
              </div>

              <ul className="space-y-3">
                {t.legal.privacy.dataCollected.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-foreground"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Purposes Section */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShieldCheckIcon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t.legal.privacy.purposes.title}
                </h2>
              </div>

              <div className="space-y-4">
                {t.legal.privacy.purposes.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 bg-muted/30 rounded-lg border border-border"
                  >
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Retention Section */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ClockIcon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {t.legal.privacy.retention.title}
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">
                      Comptes actifs
                    </p>
                    <p className="text-foreground font-medium">
                      {t.legal.privacy.retention.active}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">
                      Comptes inactifs
                    </p>
                    <p className="text-foreground font-medium">
                      {t.legal.privacy.retention.inactive}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">
                      Logs d'accès
                    </p>
                    <p className="text-foreground font-medium">
                      {t.legal.privacy.retention.logs}
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">
                      Données comptables
                    </p>
                    <p className="text-foreground font-medium">
                      {t.legal.privacy.retention.accounting}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rights Section */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t.legal.privacy.rights.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  { key: "access", label: t.legal.privacy.rights.access },
                  {
                    key: "rectification",
                    label: t.legal.privacy.rights.rectification,
                  },
                  { key: "deletion", label: t.legal.privacy.rights.deletion },
                  {
                    key: "portability",
                    label: t.legal.privacy.rights.portability,
                  },
                  {
                    key: "opposition",
                    label: t.legal.privacy.rights.opposition,
                  },
                  {
                    key: "limitation",
                    label: t.legal.privacy.rights.limitation,
                  },
                ].map((right) => (
                  <Button
                    key={right.key}
                    variant="outline"
                    className="justify-start h-auto py-4 px-6 bg-background hover:bg-muted"
                    onClick={() => handleRightRequest(right.label)}
                  >
                    <div className="text-left">
                      <p className="font-semibold text-foreground">
                        {right.label}
                      </p>
                    </div>
                  </Button>
                ))}
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Pour exercer vos droits, contactez-nous à{" "}
                <a
                  href={`mailto:${t.legal.privacy.controller.dpo.split(": ")[1]}`}
                  className="text-primary hover:underline font-medium"
                >
                  {t.legal.privacy.controller.dpo.split(": ")[1]}
                </a>
              </p>
            </div>

            {/* Related Links */}
            <div className="bg-muted/30 border border-border rounded-xl p-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Documents connexes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/mentions-legales"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ChevronRightIcon className="h-4 w-4" />

                  {t.legal.nav.terms}
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
