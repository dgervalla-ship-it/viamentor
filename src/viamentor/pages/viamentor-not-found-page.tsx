/**
 * VIAMENTOR - 404 Not Found Page
 * Page d'erreur 404 personnalisée avec suggestions navigation
 *
 * @module pages/viamentor-not-found-page
 * @version 2.0.0 - Refactored with ErrorContainer
 */

import { Link } from "react-router-dom";
import { ErrorContainer } from "@/viamentor/components/viamentor-error-container";
import {
  HomeIcon,
  SearchIcon,
  ArrowLeftIcon,
  MapPinIcon,
  FileQuestionIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface NotFoundPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    title: "Page introuvable",
    subtitle: "Erreur 404",
    description:
      "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.",
    suggestions: "Suggestions",
    goHome: "Retour à l'accueil",
    goBack: "Page précédente",
    search: "Rechercher",
    helpLinks: "Liens utiles",
    dashboard: "Tableau de bord",
    students: "Élèves",
    instructors: "Moniteurs",
    planning: "Planning",
    help: "Centre d'aide",
    contact: "Contactez le support",
  },
  de: {
    title: "Seite nicht gefunden",
    subtitle: "Fehler 404",
    description:
      "Entschuldigung, die gesuchte Seite existiert nicht oder wurde verschoben.",
    suggestions: "Vorschläge",
    goHome: "Zur Startseite",
    goBack: "Vorherige Seite",
    search: "Suchen",
    helpLinks: "Nützliche Links",
    dashboard: "Dashboard",
    students: "Schüler",
    instructors: "Fahrlehrer",
    planning: "Planung",
    help: "Hilfezentrum",
    contact: "Support kontaktieren",
  },
  it: {
    title: "Pagina non trovata",
    subtitle: "Errore 404",
    description:
      "Spiacenti, la pagina che cerchi non esiste o è stata spostata.",
    suggestions: "Suggerimenti",
    goHome: "Torna alla home",
    goBack: "Pagina precedente",
    search: "Cerca",
    helpLinks: "Link utili",
    dashboard: "Dashboard",
    students: "Allievi",
    instructors: "Istruttori",
    planning: "Pianificazione",
    help: "Centro assistenza",
    contact: "Contatta il supporto",
  },
  en: {
    title: "Page not found",
    subtitle: "Error 404",
    description:
      "Sorry, the page you are looking for does not exist or has been moved.",
    suggestions: "Suggestions",
    goHome: "Back to home",
    goBack: "Previous page",
    search: "Search",
    helpLinks: "Useful links",
    dashboard: "Dashboard",
    students: "Students",
    instructors: "Instructors",
    planning: "Planning",
    help: "Help center",
    contact: "Contact support",
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export function NotFoundPage({ locale = "fr" }: NotFoundPageProps) {
  const t = translations[locale];

  const handleGoBack = () => {
    console.warn(
      "Prevented function call: `window.history.back()`"
    ) /*TODO: Do not use window.history for navigation. Use react-router instead.*/;
  };

  return (
    <ErrorContainer
      title={t.title}
      description={t.description}
      icon={FileQuestionIcon}
      iconVariant="default"
      primaryAction={{
        label: t.goHome,
        icon: HomeIcon,
        href: "/",
      }}
      secondaryAction={{
        label: t.search,
        icon: SearchIcon,
        href: "/search",
      }}
    >
      {/* Error Code */}
      <div className="text-6xl md:text-8xl font-bold text-muted-foreground mb-6 text-center">
        404
      </div>

      {/* Divider */}
      <div className="border-t border-border my-8" />

      {/* Quick Links */}
      <div className="text-left">
        <h2 className="text-sm font-semibold text-foreground mb-4">
          {t.helpLinks}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Link
            to="/school/dashboard"
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground"
          >
            <HomeIcon className="w-4 h-4" />

            {t.dashboard}
          </Link>
          <Link
            to="/students"
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground"
          >
            <MapPinIcon className="w-4 h-4" />

            {t.students}
          </Link>
          <Link
            to="/instructors"
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground"
          >
            <MapPinIcon className="w-4 h-4" />

            {t.instructors}
          </Link>
          <Link
            to="/planning"
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground"
          >
            <MapPinIcon className="w-4 h-4" />

            {t.planning}
          </Link>
        </div>
      </div>

      {/* Footer Help */}
      <div className="text-center mt-6 text-sm text-muted-foreground">
        {t.contact}
      </div>
    </ErrorContainer>
  );
}
