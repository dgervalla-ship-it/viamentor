/**
 * VIAMENTOR - Blog Page
 * Page blog SEO-optimized avec recherche, filtres et grid articles
 */

import { useState } from "react";
import {
  SearchIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  ArrowRightIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/polymet/data/viamentor-marketing-i18n";
import { MarketingNav } from "@/polymet/components/viamentor-marketing-nav";
import { MarketingFooter } from "@/polymet/components/viamentor-marketing-footer";

// ============================================================================
// TYPES
// ============================================================================

interface BlogPageProps {
  initialLocale?: MarketingLocale;
}

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readingTime: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockArticles: Article[] = [
  {
    id: "1",
    slug: "qr-factures-suisses-guide-complet",
    title: "QR-factures suisses: Guide complet pour auto-écoles",
    excerpt:
      "Tout ce que vous devez savoir sur la migration vers les QR-factures obligatoires en Suisse. Conformité, avantages et mise en place.",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop",
    category: "regulations",
    tags: ["QR-factures", "Conformité", "Suisse"],
    author: {
      name: "Marie Dupont",
      avatar: "https://github.com/kdrnp.png",
    },
    publishedAt: "2025-01-15",
    readingTime: 8,
  },
  {
    id: "2",
    slug: "optimiser-planning-moniteurs",
    title: "5 astuces pour optimiser le planning de vos moniteurs",
    excerpt:
      "Découvrez comment réduire les temps morts et maximiser l'utilisation de votre flotte de véhicules avec une planification intelligente.",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=250&fit=crop",
    category: "management",
    tags: ["Planning", "Optimisation", "Moniteurs"],
    author: {
      name: "Thomas Weber",
      avatar: "https://github.com/yusufhilmi.png",
    },
    publishedAt: "2025-01-12",
    readingTime: 6,
  },
  {
    id: "3",
    slug: "marketing-digital-auto-ecole",
    title: "Marketing digital: Comment attirer plus d'élèves en 2025",
    excerpt:
      "Stratégies SEO, Google Ads et réseaux sociaux pour développer votre visibilité en ligne et convertir plus de prospects.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    category: "marketing",
    tags: ["Marketing", "SEO", "Conversion"],
    author: {
      name: "Laura Martin",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    publishedAt: "2025-01-10",
    readingTime: 10,
  },
  {
    id: "4",
    slug: "nouveaute-viamentor-janvier-2025",
    title: "Nouveautés Viamentor Janvier 2025: Analytics IA",
    excerpt:
      "Découvrez les nouvelles fonctionnalités d'analytics prédictifs basés sur l'IA pour anticiper vos revenus et optimiser votre activité.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    category: "news",
    tags: ["Nouveautés", "IA", "Analytics"],
    author: {
      name: "Jean Dupont",
      avatar: "https://github.com/denizbuyuktas.png",
    },
    publishedAt: "2025-01-08",
    readingTime: 5,
  },
  {
    id: "5",
    slug: "success-story-auto-ecole-geneve",
    title: "Success Story: +40% d'élèves en 6 mois à Genève",
    excerpt:
      "Témoignage d'une auto-école genevoise qui a transformé son activité grâce à Viamentor. Résultats concrets et chiffres clés.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    category: "success",
    tags: ["Success Story", "Témoignage", "Genève"],
    author: {
      name: "Sophie Schneider",
      avatar: "https://github.com/shoaibux1.png",
    },
    publishedAt: "2025-01-05",
    readingTime: 7,
  },
  {
    id: "6",
    slug: "conformite-oac-2025",
    title: "Conformité OAC 2025: Ce qui change pour les auto-écoles",
    excerpt:
      "Mise à jour des exigences OAC pour 2025. Nouvelles obligations, délais et conseils pour rester conforme.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
    category: "regulations",
    tags: ["OAC", "Conformité", "Réglementation"],
    author: {
      name: "Pierre Favre",
      avatar: "https://github.com/yusufhilmi.png",
    },
    publishedAt: "2025-01-03",
    readingTime: 9,
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function BlogPage({ initialLocale = "fr" }: BlogPageProps) {
  const [locale, setLocale] = useState<MarketingLocale>(initialLocale);
  const t = getMarketingTranslations(locale);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);

  // Filter articles based on search and categories
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterArticles(query, selectedCategories);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    filterArticles(searchQuery, newCategories);
  };

  const filterArticles = (query: string, categories: string[]) => {
    let filtered = mockArticles;

    // Filter by search query
    if (query) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          article.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          )
      );
    }

    // Filter by categories
    if (categories.length > 0) {
      filtered = filtered.filter((article) =>
        categories.includes(article.category)
      );
    }

    setFilteredArticles(filtered);
  };

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      news: t.blog.filters.categories.news,
      management: t.blog.filters.categories.management,
      regulations: t.blog.filters.categories.regulations,
      marketing: t.blog.filters.categories.marketing,
      success: t.blog.filters.categories.success,
    };
    return categoryMap[category] || category;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MarketingNav locale={locale} onLocaleChange={setLocale} />

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t.blog.hero.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t.blog.hero.subtitle}
            </p>

            {/* Search Bar */}
            <div className="relative mt-8">
              <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="search"
                placeholder={t.blog.search.placeholder}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="h-12 pl-12 pr-4 text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    {t.blog.filters.title}
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(t.blog.filters.categories).map(
                      ([key, label]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox
                            id={key}
                            checked={selectedCategories.includes(key)}
                            onCheckedChange={() => handleCategoryToggle(key)}
                          />

                          <Label
                            htmlFor={key}
                            className="cursor-pointer text-sm font-normal text-foreground"
                          >
                            {label}
                          </Label>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="group overflow-hidden transition-all hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                        {getCategoryLabel(article.category)}
                      </Badge>
                    </div>

                    <CardContent className="p-5">
                      <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                        {article.title}
                      </h3>

                      <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                        {article.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3.5 w-3.5" />

                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UserIcon className="h-3.5 w-3.5" />

                          <span>{article.author.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>
                            {article.readingTime} {t.blog.article.readingTime}
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mb-4 flex flex-wrap gap-2">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* CTA */}
                      <Button
                        variant="ghost"
                        className="group/btn w-full justify-between p-0"
                      >
                        <span>{t.blog.article.readMore}</span>
                        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Empty State */}
              {filteredArticles.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">Aucun article trouvé</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <MarketingFooter locale={locale} />
    </div>
  );
}
