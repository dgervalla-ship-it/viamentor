/**
 * VIAMENTOR - Student Help Page
 * Page Aide élève avec FAQ, guides et support
 *
 * @module pages/viamentor-student-help-page
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  SearchIcon,
  BookOpenIcon,
  MessageCircleIcon,
  PhoneIcon,
  MailIcon,
  FileTextIcon,
  VideoIcon,
  HelpCircleIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface StudentHelpPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "guide" | "video" | "document";
  icon: any;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockFAQ: FAQItem[] = [
  {
    id: "1",
    question: "Comment réserver une leçon de conduite ?",
    answer:
      "Vous pouvez réserver une leçon directement depuis votre espace élève en cliquant sur 'Réserver une leçon'. Choisissez votre moniteur, la date et l'heure souhaitées.",
    category: "Réservations",
  },
  {
    id: "2",
    question: "Puis-je annuler ou reprogrammer une leçon ?",
    answer:
      "Oui, vous pouvez annuler ou reprogrammer une leçon jusqu'à 24h avant l'heure prévue sans frais. Au-delà, des frais d'annulation peuvent s'appliquer.",
    category: "Réservations",
  },
  {
    id: "3",
    question: "Comment accéder à mes factures ?",
    answer:
      "Toutes vos factures sont disponibles dans la section 'Facturation' de votre espace élève. Vous pouvez les télécharger en PDF.",
    category: "Facturation",
  },
  {
    id: "4",
    question: "Quels sont les documents requis pour l'inscription ?",
    answer:
      "Vous devez fournir : une pièce d'identité valide, une photo d'identité récente, un certificat médical et une attestation de cours de sensibilisation.",
    category: "Documents",
  },
  {
    id: "5",
    question: "Comment suivre ma progression ?",
    answer:
      "Votre progression est visible dans l'onglet 'Ma Progression'. Vous y trouverez le détail de vos heures de conduite, vos évaluations et vos objectifs.",
    category: "Formation",
  },
];

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Guide de l'élève conducteur",
    description: "Tout ce que vous devez savoir pour réussir votre permis",
    type: "guide",
    icon: BookOpenIcon,
  },
  {
    id: "2",
    title: "Vidéos de formation",
    description: "Tutoriels vidéo sur les manœuvres et la conduite",
    type: "video",
    icon: VideoIcon,
  },
  {
    id: "3",
    title: "Code de la route",
    description: "Document complet sur la réglementation suisse",
    type: "document",
    icon: FileTextIcon,
  },
];

const translations = {
  fr: {
    title: "Centre d'Aide",
    description: "Trouvez des réponses à vos questions",
    search: {
      placeholder: "Rechercher dans l'aide...",
    },
    sections: {
      faq: "Questions Fréquentes",
      resources: "Ressources",
      contact: "Nous Contacter",
    },
    contact: {
      title: "Besoin d'aide supplémentaire ?",
      description: "Notre équipe est là pour vous aider",
      phone: "Téléphone",
      email: "Email",
      chat: "Chat en direct",
      phoneNumber: "+41 22 123 45 67",
      emailAddress: "support@viamentor.ch",
    },
    actions: {
      viewAll: "Voir tout",
      download: "Télécharger",
      watch: "Regarder",
      read: "Lire",
      call: "Appeler",
      sendEmail: "Envoyer un email",
      startChat: "Démarrer le chat",
    },
    categories: {
      all: "Toutes",
      reservations: "Réservations",
      billing: "Facturation",
      documents: "Documents",
      training: "Formation",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function StudentHelpPage({ locale = "fr" }: StudentHelpPageProps) {
  const t = translations[locale];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFAQ = mockFAQ.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(mockFAQ.map((item) => item.category)));

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
        <p className="text-muted-foreground">{t.description}</p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto w-full">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

          <Input
            placeholder={t.search.placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <PhoneIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {t.contact.phone}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.contact.phoneNumber}
              </p>
            </div>
            <Button size="sm" variant="outline" className="w-full">
              {t.actions.call}
            </Button>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <MailIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {t.contact.email}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.contact.emailAddress}
              </p>
            </div>
            <Button size="sm" variant="outline" className="w-full">
              {t.actions.sendEmail}
            </Button>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <MessageCircleIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {t.contact.chat}
              </h3>
              <p className="text-sm text-muted-foreground">
                Réponse en quelques minutes
              </p>
            </div>
            <Button size="sm" className="w-full">
              {t.actions.startChat}
            </Button>
          </div>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto w-full space-y-4">
        <h2 className="text-2xl font-bold text-foreground">{t.sections.faq}</h2>

        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            Toutes
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <Card className="p-6">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircleIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

              <p className="text-muted-foreground">
                Aucun résultat trouvé pour votre recherche
              </p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQ.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">
                        {item.category}
                      </Badge>
                      <span className="font-medium">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground pl-20">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </Card>
      </div>

      {/* Resources Section */}
      <div className="max-w-4xl mx-auto w-full space-y-4">
        <h2 className="text-2xl font-bold text-foreground">
          {t.sections.resources}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockResources.map((resource) => (
            <Card
              key={resource.id}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col gap-4">
                <div className="p-3 bg-muted rounded-lg w-fit">
                  <resource.icon className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  {resource.type === "video"
                    ? t.actions.watch
                    : resource.type === "guide"
                      ? t.actions.read
                      : t.actions.download}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
