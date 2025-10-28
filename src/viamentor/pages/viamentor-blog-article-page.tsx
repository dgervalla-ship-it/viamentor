/**
 * VIAMENTOR - Blog Article Detail Page
 * Page détail article avec hero, TOC, markdown content et related articles
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  UserIcon,
  ClockIcon,
  ShareIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
  MailIcon,
  ArrowRightIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/viamentor/data/viamentor-marketing-i18n";
import { MarketingNav } from "@/viamentor/components/viamentor-marketing-nav";
import { MarketingFooter } from "@/viamentor/components/viamentor-marketing-footer";

// ============================================================================
// TYPES
// ============================================================================

interface BlogArticlePageProps {
  initialLocale?: MarketingLocale;
  slug?: string;
}

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readingTime: number;
  content: string;
}

interface RelatedArticle {
  slug: string;
  title: string;
  image: string;
  category: string;
  publishedAt: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockArticle: Article = {
  slug: "qr-factures-suisses-guide-complet",
  title: "QR-factures suisses: Guide complet pour auto-écoles",
  excerpt:
    "Tout ce que vous devez savoir sur la migration vers les QR-factures obligatoires en Suisse. Conformité, avantages et mise en place.",
  image:
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop",
  category: "Réglementation OAC",
  tags: ["QR-factures", "Conformité", "Suisse"],
  author: {
    name: "Marie Dupont",
    avatar: "https://github.com/kdrnp.png",
    role: "Expert Conformité",
  },
  publishedAt: "2025-01-15",
  readingTime: 8,
  content: `
# Introduction aux QR-factures suisses

Depuis le 30 septembre 2022, les QR-factures ont remplacé les bulletins de versement orange et rouges en Suisse. Cette transition représente une modernisation majeure du système de paiement suisse.

## Qu'est-ce qu'une QR-facture ?

La QR-facture est un bulletin de versement standardisé qui contient toutes les informations nécessaires au paiement dans un code QR. Elle simplifie considérablement le processus de paiement pour vos élèves.

### Avantages pour votre auto-école

- **Réduction des erreurs** : Plus de saisie manuelle des références
- **Paiements plus rapides** : Scan et validation en quelques secondes
- **Traçabilité améliorée** : Réconciliation automatique des paiements
- **Conformité garantie** : Respect des standards Swiss QR Code

## Comment mettre en place les QR-factures ?

### 1. Obtenir votre QR-IBAN

Contactez votre banque pour obtenir un QR-IBAN. C'est un IBAN spécial qui commence par CH suivi de 21 chiffres.

### 2. Configurer votre logiciel

Viamentor génère automatiquement vos QR-factures conformes. Il vous suffit de renseigner votre QR-IBAN dans les paramètres.

### 3. Tester vos premières factures

Nous recommandons de tester avec quelques factures avant de déployer à grande échelle.

## Conformité et obligations légales

Les QR-factures doivent respecter les **Swiss Payment Standards**. Viamentor garantit cette conformité automatiquement.

### Points de vigilance

- Format A4 ou A6 obligatoire
- Zone de perforation respectée
- Informations minimales présentes
- Code QR lisible et non altéré

## Conclusion

La migration vers les QR-factures est une opportunité de moderniser votre gestion administrative. Avec Viamentor, cette transition est transparente et sans effort.

**Besoin d'aide ?** Notre équipe support est disponible pour vous accompagner dans la configuration.
  `,
};

const mockRelatedArticles: RelatedArticle[] = [
  {
    slug: "optimiser-planning-moniteurs",
    title: "5 astuces pour optimiser le planning de vos moniteurs",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=250&fit=crop",
    category: "Conseils gestion",
    publishedAt: "2025-01-12",
  },
  {
    slug: "conformite-oac-2025",
    title: "Conformité OAC 2025: Ce qui change pour les auto-écoles",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
    category: "Réglementation OAC",
    publishedAt: "2025-01-03",
  },
  {
    slug: "marketing-digital-auto-ecole",
    title: "Marketing digital: Comment attirer plus d'élèves en 2025",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    category: "Marketing auto-école",
    publishedAt: "2025-01-10",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function BlogArticlePage({
  initialLocale = "fr",
  slug,
}: BlogArticlePageProps) {
  const [locale, setLocale] = useState<MarketingLocale>(initialLocale);
  const t = getMarketingTranslations(locale);

  const article = mockArticle;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const handleShare = (platform: string) => {
    const url = `https://viamentor.ch/blog/${article.slug}`;
    const text = article.title;

    const shareUrls: Record<string, string> = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MarketingNav locale={locale} onLocaleChange={setLocale} />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30 py-4">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Accueil
            </Link>
            <ChevronRightIcon className="h-4 w-4" />

            <Link to="/blog" className="hover:text-foreground">
              Blog
            </Link>
            <ChevronRightIcon className="h-4 w-4" />

            <span className="text-foreground">{article.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Header */}
          <header className="mb-8">
            <Badge className="mb-4">{article.category}</Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="h-10 w-10 rounded-full"
                />

                <div>
                  <div className="font-medium text-foreground">
                    {article.author.name}
                  </div>
                  <div className="text-xs">{article.author.role}</div>
                </div>
              </div>
              <Separator orientation="vertical" className="h-10" />

              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4" />

                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />

                <span>
                  {article.readingTime} {t.blog.article.readingTime}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Share Buttons */}
          <div className="mb-8 flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {t.blog.article.shareArticle}:
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("linkedin")}
            >
              <LinkedinIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("twitter")}
            >
              <TwitterIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("facebook")}
            >
              <FacebookIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("email")}
            >
              <MailIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <div
              dangerouslySetInnerHTML={{
                __html: article.content.replace(/\n/g, "<br />"),
              }}
            />
          </div>

          {/* CTA */}
          <Card className="mt-12 border-primary/20 bg-primary/5">
            <CardContent className="p-8 text-center">
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                {t.blog.cta.title}
              </h3>
              <p className="mb-6 text-muted-foreground">
                Découvrez comment Viamentor peut transformer votre auto-école
              </p>
              <Button size="lg" className="gap-2">
                {t.blog.cta.button}
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              {t.blog.article.relatedArticles}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {mockRelatedArticles.map((related) => (
                <Card
                  key={related.slug}
                  className="group overflow-hidden hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge className="mb-2" variant="secondary">
                      {related.category}
                    </Badge>
                    <h3 className="line-clamp-2 text-base font-semibold text-foreground group-hover:text-primary">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatDate(related.publishedAt)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </article>

      {/* Footer */}
      <MarketingFooter locale={locale} />
    </div>
  );
}
