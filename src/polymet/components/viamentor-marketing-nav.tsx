/**
 * VIAMENTOR - Marketing Navigation
 * Header sticky responsive avec glassmorphism, dropdown ressources, mobile drawer
 */

"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  BookOpen,
  HelpCircle,
  FileText,
  Puzzle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/polymet/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface MarketingNavProps {
  locale?: MarketingLocale;
  onLocaleChange?: (locale: MarketingLocale) => void;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function MarketingNav({
  locale = "fr",
  onLocaleChange,
  className = "",
}: MarketingNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = getMarketingTranslations(locale);

  const handleLocaleChange = (newLocale: string) => {
    onLocaleChange?.(newLocale as MarketingLocale);
  };

  const resourcesItems = [
    {
      icon: BookOpen,
      title: t.nav.resources.blog,
      description: t.nav.resources.blogDesc,
      href: "/blog",
    },
    {
      icon: FileText,
      title: "Ressources",
      description: "Guides et templates gratuits",
      href: "/ressources",
    },
    {
      icon: HelpCircle,
      title: t.nav.resources.faq,
      description: t.nav.resources.faqDesc,
      href: "/faq",
    },
    {
      icon: FileText,
      title: t.nav.resources.caseStudies,
      description: t.nav.resources.caseStudiesDesc,
      href: "/cas-clients",
    },
  ];

  const mainLinks = [
    { label: t.nav.forSchools, href: "/pour-auto-ecoles" },
    { label: t.nav.forInstructors, href: "/pour-moniteurs" },
    { label: t.nav.forStudents, href: "/pour-eleves" },
    { label: t.nav.pricing, href: "/tarifs" },
    { label: t.nav.demo, href: "/demo" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <div className="flex h-10 w-[140px] items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-3 text-lg font-bold text-white">
              {t.nav.logo}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </Link>
            ))}

            {/* Resources Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-4 py-2 text-sm font-medium"
                >
                  {t.nav.resources.title}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[400px] p-4" align="end">
                <div className="grid grid-cols-2 gap-2">
                  {resourcesItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link
                          to={item.href}
                          className="flex flex-col items-start p-3 rounded-lg hover:bg-accent cursor-pointer"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="h-4 w-4 text-primary" />

                            <span className="font-semibold text-sm">
                              {item.title}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <Select value={locale} onValueChange={handleLocaleChange}>
              <SelectTrigger className="w-[70px] h-9 border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">🇫🇷 FR</SelectItem>
                <SelectItem value="de">🇩🇪 DE</SelectItem>
                <SelectItem value="it">🇮🇹 IT</SelectItem>
                <SelectItem value="en">🇬🇧 EN</SelectItem>
              </SelectContent>
            </Select>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/login">{t.nav.login}</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                asChild
              >
                <Link to="/register">{t.nav.freeTrial}</Link>
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <div className="flex h-10 w-[140px] items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-3 text-lg font-bold text-white">
                      {t.nav.logo}
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col space-y-4">
                  {mainLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-muted-foreground mb-3">
                      {t.nav.resources.title}
                    </p>
                    {resourcesItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
                        >
                          <Icon className="h-5 w-5 text-primary mt-0.5" />

                          <div>
                            <p className="font-medium text-sm">{item.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="pt-4 border-t border-border space-y-2">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/login">{t.nav.login}</Link>
                    </Button>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                      asChild
                    >
                      <Link to="/register">{t.nav.freeTrial}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
