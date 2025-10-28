/**
 * VIAMENTOR - Case Studies Page
 * Page cas clients avec success stories et social proof
 */

import { useState } from "react";
import {
  TrendingUpIcon,
  ClockIcon,
  SmileIcon,
  ArrowRightIcon,
  QuoteIcon,
  BuildingIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/polymet/data/viamentor-marketing-i18n";
import { MarketingNav } from "@/polymet/components/viamentor-marketing-nav";
import { MarketingFooter } from "@/polymet/components/viamentor-marketing-footer";

// ============================================================================
// TYPES
// ============================================================================

interface CaseStudiesPageProps {
  initialLocale?: MarketingLocale;
}

interface CaseStudy {
  id: string;
  slug: string;
  schoolName: string;
  location: string;
  logo?: string;
  isAnonymous: boolean;
  stats: {
    studentsIncrease: string;
    timeReduction: string;
    satisfactionIncrease: string;
  };
  quote: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  image: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockCaseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "auto-ecole-geneve-40-eleves",
    schoolName: "Auto-école Genève",
    location: "Genève",
    isAnonymous: true,
    stats: {
      studentsIncrease: "+40%",
      timeReduction: "−15h/semaine",
      satisfactionIncrease: "+25%",
    },
    quote:
      "ViaMenutor a transformé notre façon de travailler. Nous avons gagné 15h par semaine sur l'administratif et augmenté nos inscriptions de 40% en 6 mois.",
    author: {
      name: "Jean Dupont",
      role: "Directeur",
      avatar: "https://github.com/yusufhilmi.png",
    },
    category: "Croissance",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    slug: "auto-ecole-lausanne-digitalisation",
    schoolName: "Auto-école Lausanne",
    location: "Lausanne",
    isAnonymous: true,
    stats: {
      studentsIncrease: "+35%",
      timeReduction: "−12h/semaine",
      satisfactionIncrease: "+30%",
    },
    quote:
      "La digitalisation complète de notre école nous a permis de nous concentrer sur l'essentiel: la formation de qualité. Les élèves adorent l'app mobile.",
    author: {
      name: "Marie Martin",
      role: "Co-fondatrice",
      avatar: "https://github.com/kdrnp.png",
    },
    category: "Digitalisation",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    slug: "auto-ecole-zurich-optimisation",
    schoolName: "Auto-école Zurich",
    location: "Zürich",
    isAnonymous: true,
    stats: {
      studentsIncrease: "+50%",
      timeReduction: "−20h/semaine",
      satisfactionIncrease: "+35%",
    },
    quote:
      "L'optimisation du planning et la réduction des annulations nous ont permis d'augmenter notre chiffre d'affaires de 50% sans embaucher de nouveaux moniteurs.",
    author: {
      name: "Thomas Weber",
      role: "CEO",
      avatar: "https://github.com/denizbuyuktas.png",
    },
    category: "Optimisation",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    id: "4",
    slug: "auto-ecole-fribourg-conformite",
    schoolName: "Auto-école Fribourg",
    location: "Fribourg",
    isAnonymous: true,
    stats: {
      studentsIncrease: "+28%",
      timeReduction: "−10h/semaine",
      satisfactionIncrease: "+22%",
    },
    quote:
      "La conformité OAC et nLPD était un casse-tête. ViaMenutor gère tout automatiquement. Nous sommes sereins et nos élèves aussi.",
    author: {
      name: "Sophie Schneider",
      role: "Directrice",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    category: "Conformité",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
  },
  {
    id: "5",
    slug: "auto-ecole-neuchatel-marketing",
    schoolName: "Auto-école Neuchâtel",
    location: "Neuchâtel",
    isAnonymous: true,
    stats: {
      studentsIncrease: "+45%",
      timeReduction: "−8h/semaine",
      satisfactionIncrease: "+28%",
    },
    quote:
      "Le CRM prospects et les campagnes marketing automatisées nous ont permis de doubler nos conversions. ROI exceptionnel.",
    author: {
      name: "Pierre Favre",
      role: "Responsable Marketing",
      avatar: "https://github.com/shoaibux1.png",
    },
    category: "Marketing",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop",
  },
  {
    id: "6",
    slug: "auto-ecole-valais-expansion",
    schoolName: "Auto-école Valais",
    location: "Sion",
    isAnonymous: true,
    stats: {
      studentsIncrease: "+60%",
      timeReduction: "−18h/semaine",
      satisfactionIncrease: "+32%",
    },
    quote:
      "Nous avons ouvert 2 nouveaux sites en 1 an grâce à ViaMenutor. La gestion multi-sites est un jeu d'enfant.",
    author: {
      name: "Laura Rossier",
      role: "Directrice Générale",
      avatar: "https://github.com/kdrnp.png",
    },
    category: "Expansion",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function CaseStudiesPage({
  initialLocale = "fr",
}: CaseStudiesPageProps) {
  const [locale, setLocale] = useState<MarketingLocale>(initialLocale);
  const t = getMarketingTranslations(locale);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MarketingNav locale={locale} onLocaleChange={setLocale} />

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              Success Stories
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t.caseStudies.hero.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t.caseStudies.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mockCaseStudies.map((caseStudy) => (
              <Card
                key={caseStudy.id}
                className="group overflow-hidden transition-all hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                  <img
                    src={caseStudy.image}
                    alt={caseStudy.schoolName}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <Badge className="absolute left-4 top-4 bg-background/90 text-foreground">
                    {caseStudy.category}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  {/* School Info */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <BuildingIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {caseStudy.schoolName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {caseStudy.location}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mb-4 grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-muted p-3 text-center">
                      <div className="mb-1 flex items-center justify-center gap-1">
                        <TrendingUpIcon className="h-4 w-4 text-green-600 dark:text-green-400" />

                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                          {caseStudy.stats.studentsIncrease}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t.caseStudies.stats.students}
                      </p>
                    </div>

                    <div className="rounded-lg bg-muted p-3 text-center">
                      <div className="mb-1 flex items-center justify-center gap-1">
                        <ClockIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />

                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {caseStudy.stats.timeReduction}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t.caseStudies.stats.timeReduction}
                      </p>
                    </div>

                    <div className="rounded-lg bg-muted p-3 text-center">
                      <div className="mb-1 flex items-center justify-center gap-1">
                        <SmileIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />

                        <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                          {caseStudy.stats.satisfactionIncrease}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t.caseStudies.stats.satisfaction}
                      </p>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative mb-4 rounded-lg bg-muted/50 p-4">
                    <QuoteIcon className="absolute left-2 top-2 h-6 w-6 text-primary/20" />

                    <p className="pl-6 text-sm italic text-muted-foreground">
                      "{caseStudy.quote}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="mb-4 flex items-center gap-3">
                    <img
                      src={caseStudy.author.avatar}
                      alt={caseStudy.author.name}
                      className="h-10 w-10 rounded-full"
                    />

                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {caseStudy.author.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {caseStudy.author.role}
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    className="group/btn w-full justify-between"
                  >
                    <span>{t.caseStudies.readFullStory}</span>
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Prêt à écrire votre success story ?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Rejoignez les 500+ auto-écoles qui ont transformé leur activité avec
            ViaMenutor
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="gap-2">
              Essai gratuit 30 jours
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Demander une démo
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Sans carte bancaire • Annulation flexible • Support inclus
          </p>
        </div>
      </section>

      {/* Footer */}
      <MarketingFooter locale={locale} />
    </div>
  );
}
