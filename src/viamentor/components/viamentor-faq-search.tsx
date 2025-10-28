/**
 * VIAMENTOR - FAQ Search Component
 * Recherche FAQ avec filtrage instantané
 */

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { SearchIcon } from "lucide-react";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/viamentor/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface FAQSearchProps {
  locale?: MarketingLocale;
  className?: string;
}

interface FAQItem {
  category: string;
  question: string;
  answer: string;
  related?: string[];
}

// ============================================================================
// DATA
// ============================================================================

const faqData: FAQItem[] = [
  // Général
  {
    category: "general",
    question: "Qu'est-ce que Viamentor ?",
    answer:
      "Viamentor est une plateforme complète de gestion pour auto-écoles suisses. Elle permet de gérer les élèves, le planning, la facturation, le marketing et bien plus encore, le tout conforme aux normes suisses OAC et nLPD.",
    related: ["Migration depuis un autre logiciel ?", "Essai gratuit ?"],
  },
  {
    category: "general",
    question: "Pour qui est Viamentor ?",
    answer:
      "Viamentor s'adresse aux auto-écoles de toutes tailles en Suisse, des petites structures avec 1-2 moniteurs aux grandes écoles multi-sites avec des dizaines de moniteurs.",
  },
  {
    category: "general",
    question: "Essai gratuit ?",
    answer:
      "Oui, nous offrons un essai gratuit de 30 jours sans carte bancaire requise. Vous pouvez tester toutes les fonctionnalités sans engagement.",
  },

  // Fonctionnalités
  {
    category: "features",
    question: "Quelles sont les principales fonctionnalités ?",
    answer:
      "Gestion élèves complète, planning intelligent avec détection conflits, QR-factures suisses automatiques, CRM prospects, campagnes marketing, analytics avancés, app mobile iOS/Android, et bien plus.",
  },
  {
    category: "features",
    question: "Y a-t-il une app mobile ?",
    answer:
      "Oui, Viamentor dispose d'applications mobiles natives pour iOS et Android. Les moniteurs peuvent gérer leur planning, les élèves peuvent réserver des leçons et suivre leur progression.",
  },
  {
    category: "features",
    question: "Peut-on personnaliser les factures ?",
    answer:
      "Oui, vous pouvez personnaliser vos factures avec votre logo, vos couleurs et vos mentions légales. Les QR-factures suisses sont générées automatiquement selon les normes BVR.",
  },

  // Tarifs
  {
    category: "pricing",
    question: "Combien coûte Viamentor ?",
    answer:
      "Nos tarifs commencent à 149 CHF/mois pour le plan Starter. Le plan Professional est à 299 CHF/mois. Pour les grandes structures, nous proposons un plan Enterprise sur mesure.",
  },
  {
    category: "pricing",
    question: "Y a-t-il des frais cachés ?",
    answer:
      "Non, nos tarifs sont transparents. Tout est inclus : mises à jour, support, hébergement, sauvegardes. Pas de frais d'installation ni de coûts supplémentaires.",
  },
  {
    category: "pricing",
    question: "Puis-je changer de plan ?",
    answer:
      "Oui, vous pouvez changer de plan à tout moment. Le changement est effectif immédiatement et la facturation est ajustée au prorata.",
  },

  // Technique
  {
    category: "technical",
    question: "Où sont hébergées les données ?",
    answer:
      "Toutes les données sont hébergées en Suisse sur des serveurs Supabase sécurisés. Nous garantissons la conformité avec les lois suisses sur la protection des données (nLPD).",
  },
  {
    category: "technical",
    question: "Quelles sont les intégrations disponibles ?",
    answer:
      "Viamentor s'intègre avec Google Calendar, Outlook, Twint, Stripe, et de nombreux autres services. Une API REST est disponible pour les plans Enterprise.",
  },
  {
    category: "technical",
    question: "Migration depuis un autre logiciel ?",
    answer:
      "Oui, nous proposons un service de migration gratuit. Notre équipe vous accompagne pour importer vos données (élèves, moniteurs, historique) depuis votre ancien système.",
  },

  // Sécurité
  {
    category: "security",
    question: "Les données sont-elles sécurisées ?",
    answer:
      "Oui, nous utilisons un chiffrement AES-256, des sauvegardes quotidiennes automatiques, et respectons les normes RGPD/nLPD. Nos serveurs sont en Suisse.",
  },
  {
    category: "security",
    question: "Qui a accès aux données ?",
    answer:
      "Seuls les utilisateurs autorisés de votre école ont accès aux données. Nous ne partageons jamais vos données avec des tiers. Vous restez propriétaire de vos données.",
  },

  // Support
  {
    category: "support",
    question: "Quel support est inclus ?",
    answer:
      "Support email inclus dans tous les plans. Le plan Professional inclut un support prioritaire. Le plan Enterprise inclut un account manager dédié et une formation sur site.",
  },
  {
    category: "support",
    question: "Y a-t-il une formation ?",
    answer:
      "Oui, nous proposons un onboarding guidé d'1h, des vidéos tutoriels, et une documentation complète. Pour le plan Enterprise, une formation sur site est incluse.",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function FAQSearch({ locale = "fr", className }: FAQSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const t = getMarketingTranslations(locale);

  // Filter FAQs based on search and category
  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === null || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Group by category
  const categories = [
    "general",
    "features",
    "pricing",
    "technical",
    "security",
    "support",
  ];

  return (
    <div className={className}>
      {/* Search Bar */}
      <div className="relative mb-8">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

        <Input
          type="search"
          placeholder={t.faq.search.placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Badge
          variant={selectedCategory === null ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setSelectedCategory(null)}
        >
          Toutes
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category)}
          >
            {t.faq.categories[category as keyof typeof t.faq.categories]}
          </Badge>
        ))}
      </div>

      {/* FAQ Accordion */}
      {filteredFAQs.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="shrink-0">
                    {
                      t.faq.categories[
                        faq.category as keyof typeof t.faq.categories
                      ]
                    }
                  </Badge>
                  <span>{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-muted-foreground mb-4">{faq.answer}</div>
                {faq.related && faq.related.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <div className="text-sm font-medium mb-2">Voir aussi :</div>
                    <div className="flex flex-wrap gap-2">
                      {faq.related.map((related, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {related}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Aucune question trouvée. Essayez une autre recherche.
          </p>
        </div>
      )}
    </div>
  );
}
