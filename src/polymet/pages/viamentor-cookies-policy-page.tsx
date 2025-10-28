/**
 * VIAMENTOR - Cookies Policy Page
 * Page Politique Cookies avec tableau détaillé et gestion consentement
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { MarketingNav } from "@/polymet/components/viamentor-marketing-nav";
import { MarketingFooter } from "@/polymet/components/viamentor-marketing-footer";
import { CookieBanner } from "@/polymet/components/viamentor-cookie-banner";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/polymet/data/viamentor-marketing-i18n";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  ChevronRightIcon,
  CookieIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface CookiesPolicyPageProps {
  initialLocale?: MarketingLocale;
}

interface CookieData {
  name: string;
  type: "essential" | "analytics" | "marketing";
  duration: string;
  provider: string;
  purpose: string;
  enabled: boolean;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const cookiesData: CookieData[] = [
  {
    name: "session_token",
    type: "essential",
    duration: "Session",
    provider: "ViaMenutor",
    purpose: "Authentification utilisateur",
    enabled: true,
  },
  {
    name: "csrf_token",
    type: "essential",
    duration: "Session",
    provider: "ViaMenutor",
    purpose: "Protection CSRF",
    enabled: true,
  },
  {
    name: "_ga",
    type: "analytics",
    duration: "2 ans",
    provider: "Google Analytics",
    purpose: "Analyse du trafic",
    enabled: false,
  },
  {
    name: "_gid",
    type: "analytics",
    duration: "24 heures",
    provider: "Google Analytics",
    purpose: "Distinction des utilisateurs",
    enabled: false,
  },
  {
    name: "_fbp",
    type: "marketing",
    duration: "3 mois",
    provider: "Facebook",
    purpose: "Tracking conversions",
    enabled: false,
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function CookiesPolicyPage({
  initialLocale = "fr",
}: CookiesPolicyPageProps) {
  const [locale, setLocale] = useState<MarketingLocale>(initialLocale);
  const [cookies, setCookies] = useState<CookieData[]>(cookiesData);
  const t = getMarketingTranslations(locale);

  const handleToggleCookie = (name: string) => {
    setCookies(
      cookies.map((cookie) =>
        cookie.name === name && cookie.type !== "essential"
          ? { ...cookie, enabled: !cookie.enabled }
          : cookie
      )
    );
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "essential":
        return t.legal.cookies.types.essential;
      case "analytics":
        return t.legal.cookies.types.analytics;
      case "marketing":
        return t.legal.cookies.types.marketing;
      default:
        return type;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "essential":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      case "analytics":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "marketing":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
      default:
        return "bg-muted text-muted-foreground";
    }
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
              {t.legal.nav.cookies}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <CookieIcon className="h-4 w-4" />
              Gestion des cookies
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.legal.cookies.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t.legal.cookies.updated}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Introduction */}
            <div className="bg-card border border-border rounded-xl p-8">
              <p className="text-foreground leading-relaxed">
                {t.legal.cookies.intro}
              </p>
            </div>

            {/* Cookies Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/30">
                <h2 className="text-2xl font-bold text-foreground">
                  Liste des cookies
                </h2>
                <p className="text-muted-foreground mt-2">
                  Gérez vos préférences de cookies de manière granulaire
                </p>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {t.legal.cookies.table.name}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {t.legal.cookies.table.type}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {t.legal.cookies.table.duration}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {t.legal.cookies.table.provider}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {t.legal.cookies.table.purpose}
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                        {t.legal.cookies.table.optout}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {cookies.map((cookie) => (
                      <tr
                        key={cookie.name}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <code className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                            {cookie.name}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(cookie.type)}`}
                          >
                            {getTypeLabel(cookie.type)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {cookie.duration}
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">
                          {cookie.provider}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {cookie.purpose}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center">
                            {cookie.type === "essential" ? (
                              <span className="text-xs text-muted-foreground">
                                Requis
                              </span>
                            ) : (
                              <Switch
                                checked={cookie.enabled}
                                onCheckedChange={() =>
                                  handleToggleCookie(cookie.name)
                                }
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-border">
                {cookies.map((cookie) => (
                  <div key={cookie.name} className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <code className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                          {cookie.name}
                        </code>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ml-2 ${getTypeBadgeColor(cookie.type)}`}
                        >
                          {getTypeLabel(cookie.type)}
                        </span>
                      </div>
                      {cookie.type !== "essential" && (
                        <Switch
                          checked={cookie.enabled}
                          onCheckedChange={() =>
                            handleToggleCookie(cookie.name)
                          }
                        />
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Durée</p>
                        <p className="text-foreground">{cookie.duration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">
                          Fournisseur
                        </p>
                        <p className="text-foreground">{cookie.provider}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">
                        Finalité
                      </p>
                      <p className="text-foreground text-sm">
                        {cookie.purpose}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center">
              <Button size="lg" className="px-8">
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                Enregistrer mes préférences
              </Button>
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
                  to="/confidentialite"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ChevronRightIcon className="h-4 w-4" />

                  {t.legal.nav.privacy}
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

      {/* Cookie Banner */}
      <CookieBanner locale={locale} />
    </div>
  );
}
