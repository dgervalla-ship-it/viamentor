/**
 * VIAMENTOR - SEO Head Component
 * Gestion complète des meta tags, Open Graph, Twitter Cards et structured data JSON-LD
 *
 * @example
 * ```tsx
 * <SEOHead
 *   title="À propos de Viamentor"
 *   description="Découvrez notre mission et notre équipe"
 *   canonicalUrl="https://viamentor.ch/about"
 *   locale="fr"
 *   type="website"
 * />
 * ```
 */

import { useEffect } from "react";
import type {
  MarketingLocale,
  StructuredData,
} from "@/viamentor/data/viamentor-about-page-types";

// ============================================================================
// TYPES
// ============================================================================

interface SEOHeadProps {
  /** Titre de la page (max 60 caractères recommandé) */
  title: string;
  /** Description de la page (max 160 caractères recommandé) */
  description: string;
  /** URL canonique de la page */
  canonicalUrl: string;
  /** Locale de la page */
  locale?: MarketingLocale;
  /** Type de page Open Graph */
  type?: "website" | "article" | "profile";
  /** URL de l'image Open Graph (1200x630px recommandé) */
  ogImage?: string;
  /** Données structurées JSON-LD additionnelles */
  structuredData?: StructuredData[];
  /** Keywords SEO (optionnel, peu utilisé par Google mais utile pour autres moteurs) */
  keywords?: string[];
  /** Auteur de la page (pour articles) */
  author?: string;
  /** Date de publication (pour articles) */
  publishedTime?: string;
  /** Date de modification (pour articles) */
  modifiedTime?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SITE_NAME = "Viamentor";
const SITE_URL = "https://viamentor.ch";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const TWITTER_HANDLE = "@viamentor";

const LOCALE_MAP: Record<MarketingLocale, string> = {
  fr: "fr_CH",
  de: "de_CH",
  it: "it_CH",
  en: "en_US",
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Composant SEO Head pour gestion complète du référencement
 *
 * Gère automatiquement :
 * - Meta tags standards (title, description, keywords)
 * - Open Graph tags (Facebook, LinkedIn)
 * - Twitter Cards
 * - Canonical URL
 * - Structured Data JSON-LD
 * - Alternate languages
 */
export function SEOHead({
  title,
  description,
  canonicalUrl,
  locale = "fr",
  type = "website",
  ogImage = DEFAULT_OG_IMAGE,
  structuredData = [],
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
}: SEOHeadProps) {
  // Construire le titre complet
  const fullTitle = `${title} | ${SITE_NAME}`;
  const ogLocale = LOCALE_MAP[locale];

  useEffect(() => {
    // Mettre à jour le titre de la page
    document.title = fullTitle;

    // Mettre à jour ou créer les meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords.join(", "));

    // Open Graph tags
    updateMetaTag("og:title", fullTitle, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:url", canonicalUrl, "property");
    updateMetaTag("og:type", type, "property");
    updateMetaTag("og:image", ogImage, "property");
    updateMetaTag("og:locale", ogLocale, "property");
    updateMetaTag("og:site_name", SITE_NAME, "property");

    // Twitter Cards
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:site", TWITTER_HANDLE);
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", ogImage);

    // Article specific tags
    if (type === "article") {
      if (author) updateMetaTag("article:author", author, "property");
      if (publishedTime)
        updateMetaTag("article:published_time", publishedTime, "property");
      if (modifiedTime)
        updateMetaTag("article:modified_time", modifiedTime, "property");
    }

    // Canonical URL
    updateLinkTag("canonical", canonicalUrl);

    // Alternate languages
    const alternateLocales: MarketingLocale[] = ["fr", "de", "it", "en"];
    alternateLocales.forEach((altLocale) => {
      const altUrl = canonicalUrl.replace(`/${locale}`, `/${altLocale}`);
      updateLinkTag("alternate", altUrl, altLocale);
    });

    // Structured Data JSON-LD
    if (structuredData.length > 0) {
      structuredData.forEach((data, index) => {
        updateStructuredData(data, `structured-data-${index}`);
      });
    }

    // Cleanup function
    return () => {
      // Optionnel : nettoyer les meta tags si nécessaire
    };
  }, [
    fullTitle,
    description,
    canonicalUrl,
    locale,
    type,
    ogImage,
    ogLocale,
    keywords,
    author,
    publishedTime,
    modifiedTime,
    structuredData,
  ]);

  // Ce composant ne rend rien visuellement
  return null;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Met à jour ou crée un meta tag
 */
function updateMetaTag(
  name: string,
  content: string,
  attribute: "name" | "property" = "name"
) {
  if (!content) return;

  let element = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

/**
 * Met à jour ou crée un link tag
 */
function updateLinkTag(rel: string, href: string, hreflang?: string) {
  if (!href) return;

  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;

  let element = document.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    if (hreflang) element.setAttribute("hreflang", hreflang);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

/**
 * Met à jour ou crée un script JSON-LD pour structured data
 */
function updateStructuredData(data: StructuredData, id: string) {
  let element = document.getElementById(id);

  if (!element) {
    element = document.createElement("script");
    element.setAttribute("type", "application/ld+json");
    element.setAttribute("id", id);
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

// ============================================================================
// STRUCTURED DATA BUILDERS
// ============================================================================

/**
 * Crée les données structurées pour une page AboutPage
 */
export function createAboutPageStructuredData(
  locale: MarketingLocale
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: locale === "fr" ? "À propos de Viamentor" : "About Viamentor",
    description:
      locale === "fr"
        ? "Découvrez notre mission, notre histoire et notre équipe"
        : "Discover our mission, our story and our team",
    url: `${SITE_URL}/${locale}/about`,
    inLanguage: LOCALE_MAP[locale],
  };
}

/**
 * Crée les données structurées pour l'organisation
 */
export function createOrganizationStructuredData(): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Plateforme de gestion complète pour auto-écoles suisses - Planning, facturation QR, CRM",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Route de Lausanne 45",
      addressLocality: "Genève",
      postalCode: "1202",
      addressCountry: "CH",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+41-22-123-45-67",
      contactType: "customer service",
      email: "contact@viamentor.ch",
      availableLanguage: ["French", "German", "Italian", "English"],
    },
    sameAs: [
      "https://www.linkedin.com/company/viamentor",
      "https://twitter.com/viamentor",
      "https://www.facebook.com/viamentor",
    ],
  };
}

/**
 * Crée les données structurées pour un membre de l'équipe
 */
export function createPersonStructuredData(
  name: string,
  role: string,
  bio: string,
  linkedinUrl?: string
): StructuredData {
  const data: StructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: role,
    description: bio,
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  if (linkedinUrl) {
    data.sameAs = [linkedinUrl];
  }

  return data;
}

/**
 * Crée les données structurées pour un breadcrumb
 */
export function createBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
