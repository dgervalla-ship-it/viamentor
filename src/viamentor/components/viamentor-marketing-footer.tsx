/**
 * VIAMENTOR - Marketing Footer
 * Footer complet avec liens, réseaux sociaux et badge Swiss
 */

"use client";

import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/viamentor/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface MarketingFooterProps {
  locale?: MarketingLocale;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function MarketingFooter({
  locale = "fr",
  className = "",
}: MarketingFooterProps) {
  const t = getMarketingTranslations(locale);

  const footerLinks = {
    product: [
      { label: t.nav.forSchools, href: "/pour-auto-ecoles" },
      { label: t.nav.forInstructors, href: "/pour-moniteurs" },
      { label: t.nav.forStudents, href: "/pour-eleves" },
      { label: t.nav.pricing, href: "/tarifs" },
      { label: t.nav.demo, href: "/demo" },
    ],

    resources: [
      { label: t.nav.resources.blog, href: "/blog" },
      { label: t.nav.resources.faq, href: "/faq" },
      { label: t.nav.resources.caseStudies, href: "/cas-clients" },
      { label: t.nav.resources.integrations, href: "/integrations" },
      { label: "Documentation", href: "/docs" },
    ],

    legal: [
      { label: t.legal.nav.terms, href: "/mentions-legales" },
      { label: t.legal.nav.privacy, href: "/confidentialite" },
      { label: t.legal.nav.cookies, href: "/cookies" },
      { label: t.legal.nav.about, href: "/a-propos" },
    ],

    contact: [
      { label: "Contact", href: "/contact" },
      { label: "Support", href: "/support" },
      { label: "Partenaires", href: "/partenaires" },
      { label: "Carrières", href: "mailto:jobs@viamentor.ch" },
    ],
  };

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/viamentor",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/viamentor",
      label: "Twitter",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/viamentor",
      label: "Instagram",
    },
    { icon: Mail, href: "mailto:contact@viamentor.ch", label: "Email" },
  ];

  return (
    <footer className={`bg-muted/30 border-t border-border ${className}`}>
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Product */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {t.footer.product}
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {t.footer.resources}
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {t.footer.legal}
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {t.footer.contact}
            </h3>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright & Badge */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-sm text-muted-foreground">
                {t.footer.copyright}
              </p>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border">
                <span className="text-sm font-semibold text-foreground">
                  {t.footer.madeInSwitzerland}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
