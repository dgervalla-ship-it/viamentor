/**
 * VIAMENTOR i18n Configuration
 *
 * Système d'internationalisation avec règles grammaticales strictes
 * Support FR (Français), DE (Deutsch), IT (Italiano), EN (English)
 *
 * @module data/viamentor-i18n-config
 * @version 1.0.0
 */

import { useState, useEffect, useCallback } from "react";

/**
 * Locales supportées
 */
export type SupportedLocale = "fr" | "de" | "it" | "en";

/**
 * Règles typographiques par locale
 */
export interface LocaleTypographyRules {
  locale: SupportedLocale;
  name: string;
  nativeName: string;

  // Règles de ponctuation
  punctuation: {
    spaceBeforeColon: boolean;
    spaceBeforeSemicolon: boolean;
    spaceBeforeExclamation: boolean;
    spaceBeforeQuestion: boolean;
    decimalSeparator: "." | ",";
    thousandsSeparator: "," | "." | " " | "'";
  };

  // Règles de capitalisation
  capitalization: {
    sentenceStart: boolean;
    nounsCapitalized: boolean;
    titleCase: boolean;
  };

  // Guillemets
  quotes: {
    opening: string;
    closing: string;
    single: {
      opening: string;
      closing: string;
    };
  };

  // Formats de date
  dateFormat: {
    short: string; // DD/MM/YYYY, MM/DD/YYYY, etc.
    long: string; // 1er janvier 2024, January 1, 2024, etc.
    time: string; // HH:mm, h:mm AM/PM
  };

  // Formats de monnaie
  currency: {
    code: string;
    symbol: string;
    position: "before" | "after";
    spaceBeforeSymbol: boolean;
  };

  // Pluralisation
  pluralization: {
    hasPlural: boolean;
    rules: string[];
  };
}

/**
 * Configuration complète des règles par locale
 */
export const LOCALE_RULES: Record<SupportedLocale, LocaleTypographyRules> = {
  // ============================================
  // FRANÇAIS (Suisse)
  // ============================================
  fr: {
    locale: "fr",
    name: "French",
    nativeName: "Français",

    punctuation: {
      spaceBeforeColon: true, // Espace avant :
      spaceBeforeSemicolon: true, // Espace avant ;
      spaceBeforeExclamation: true, // Espace avant !
      spaceBeforeQuestion: true, // Espace avant ?
      decimalSeparator: ",", // 1,5
      thousandsSeparator: " ", // 1 000
    },

    capitalization: {
      sentenceStart: true, // Majuscule 1ère lettre
      nounsCapitalized: false, // Noms communs en minuscule
      titleCase: false, // Pas de title case
    },

    quotes: {
      opening: "\u00AB", // Guillemets français
      closing: "\u00BB",
      single: {
        opening: "\u2039",
        closing: "\u203A",
      },
    },

    dateFormat: {
      short: "DD.MM.YYYY", // Format suisse
      long: "D MMMM YYYY", // 1er janvier 2024
      time: "HH:mm", // 24h
    },

    currency: {
      code: "CHF",
      symbol: "CHF",
      position: "after", // 100 CHF
      spaceBeforeSymbol: true,
    },

    pluralization: {
      hasPlural: true,
      rules: ["zero", "one", "other"],
    },
  },

  // ============================================
  // DEUTSCH (Schweiz)
  // ============================================
  de: {
    locale: "de",
    name: "German",
    nativeName: "Deutsch",

    punctuation: {
      spaceBeforeColon: false, // Pas d'espace avant :
      spaceBeforeSemicolon: false, // Pas d'espace avant ;
      spaceBeforeExclamation: false, // Pas d'espace avant !
      spaceBeforeQuestion: false, // Pas d'espace avant ?
      decimalSeparator: ",", // 1,5
      thousandsSeparator: "'", // 1'000 (Suisse)
    },

    capitalization: {
      sentenceStart: true,
      nounsCapitalized: true, // TOUS les substantifs en majuscule
      titleCase: false,
    },

    quotes: {
      opening: "\u201E", // Guillemets allemands
      closing: "\u201C",
      single: {
        opening: "\u201A",
        closing: "\u2018",
      },
    },

    dateFormat: {
      short: "DD.MM.YYYY",
      long: "D. MMMM YYYY", // 1. Januar 2024
      time: "HH:mm",
    },

    currency: {
      code: "CHF",
      symbol: "CHF",
      position: "after",
      spaceBeforeSymbol: true,
    },

    pluralization: {
      hasPlural: true,
      rules: ["one", "other"],
    },
  },

  // ============================================
  // ITALIANO (Svizzera)
  // ============================================
  it: {
    locale: "it",
    name: "Italian",
    nativeName: "Italiano",

    punctuation: {
      spaceBeforeColon: false,
      spaceBeforeSemicolon: false,
      spaceBeforeExclamation: false,
      spaceBeforeQuestion: false,
      decimalSeparator: ",", // Virgule décimale
      thousandsSeparator: " ", // 1 000
    },

    capitalization: {
      sentenceStart: true,
      nounsCapitalized: false,
      titleCase: false,
    },

    quotes: {
      opening: "\u00AB",
      closing: "\u00BB",
      single: {
        opening: "\u2018",
        closing: "\u2019",
      },
    },

    dateFormat: {
      short: "DD.MM.YYYY",
      long: "D MMMM YYYY", // 1 gennaio 2024
      time: "HH:mm",
    },

    currency: {
      code: "CHF",
      symbol: "CHF",
      position: "after",
      spaceBeforeSymbol: true,
    },

    pluralization: {
      hasPlural: true,
      rules: ["one", "other"],
    },
  },

  // ============================================
  // ENGLISH (International)
  // ============================================
  en: {
    locale: "en",
    name: "English",
    nativeName: "English",

    punctuation: {
      spaceBeforeColon: false,
      spaceBeforeSemicolon: false,
      spaceBeforeExclamation: false,
      spaceBeforeQuestion: false,
      decimalSeparator: ".", // Point décimal
      thousandsSeparator: ",", // 1,000
    },

    capitalization: {
      sentenceStart: true,
      nounsCapitalized: false,
      titleCase: true, // Title Case pour titres
    },

    quotes: {
      opening: "\u201C",
      closing: "\u201D",
      single: {
        opening: "\u2018",
        closing: "\u2019",
      },
    },

    dateFormat: {
      short: "MM/DD/YYYY", // Format US
      long: "MMMM D, YYYY", // January 1, 2024
      time: "h:mm A", // 12h AM/PM
    },

    currency: {
      code: "CHF",
      symbol: "CHF",
      position: "before", // CHF 100
      spaceBeforeSymbol: true,
    },

    pluralization: {
      hasPlural: true,
      rules: ["one", "other"],
    },
  },
};

/**
 * Traductions de base (exemple)
 */
export interface TranslationKeys {
  common: {
    welcome: string;
    login: string;
    logout: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    search: string;
    loading: string;
    error: string;
    success: string;
  };
  roles: {
    [key: string]: string;
  };
  navigation: {
    dashboard: string;
    students: string;
    instructors: string;
    lessons: string;
    schedule: string;
    payments: string;
    reports: string;
    settings: string;
  };
}

/**
 * Dictionnaire de traductions
 */
export const TRANSLATIONS: Record<SupportedLocale, TranslationKeys> = {
  fr: {
    common: {
      welcome: "Bienvenue",
      login: "Connexion",
      logout: "Déconnexion",
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
      edit: "Modifier",
      search: "Rechercher",
      loading: "Chargement...",
      error: "Erreur",
      success: "Succès",
    },
    roles: {
      SUPER_ADMIN: "Super Administrateur",
      SCHOOL_ADMIN: "Administrateur École",
      INSTRUCTOR: "Moniteur",
      SECRETARY: "Secrétaire",
      STUDENT: "Élève",
    },
    navigation: {
      dashboard: "Tableau de bord",
      students: "Élèves",
      instructors: "Moniteurs",
      lessons: "Leçons",
      schedule: "Horaire",
      payments: "Paiements",
      reports: "Rapports",
      settings: "Paramètres",
    },
  },

  de: {
    common: {
      welcome: "Willkommen",
      login: "Anmelden",
      logout: "Abmelden",
      save: "Speichern",
      cancel: "Abbrechen",
      delete: "Löschen",
      edit: "Bearbeiten",
      search: "Suchen",
      loading: "Laden...",
      error: "Fehler",
      success: "Erfolg",
    },
    roles: {
      SUPER_ADMIN: "Super Administrator",
      SCHOOL_ADMIN: "Schul-Administrator",
      INSTRUCTOR: "Fahrlehrer",
      SECRETARY: "Sekretär",
      STUDENT: "Schüler",
    },
    navigation: {
      dashboard: "Dashboard",
      students: "Schüler",
      instructors: "Fahrlehrer",
      lessons: "Lektionen",
      schedule: "Zeitplan",
      payments: "Zahlungen",
      reports: "Berichte",
      settings: "Einstellungen",
    },
  },

  it: {
    common: {
      welcome: "Benvenuto",
      login: "Accesso",
      logout: "Disconnetti",
      save: "Salva",
      cancel: "Annulla",
      delete: "Elimina",
      edit: "Modifica",
      search: "Cerca",
      loading: "Caricamento...",
      error: "Errore",
      success: "Successo",
    },
    roles: {
      SUPER_ADMIN: "Super Amministratore",
      SCHOOL_ADMIN: "Amministratore Scuola",
      INSTRUCTOR: "Istruttore",
      SECRETARY: "Segretario",
      STUDENT: "Studente",
    },
    navigation: {
      dashboard: "Dashboard",
      students: "Studenti",
      instructors: "Istruttori",
      lessons: "Lezioni",
      schedule: "Orario",
      payments: "Pagamenti",
      reports: "Rapporti",
      settings: "Impostazioni",
    },
  },

  en: {
    common: {
      welcome: "Welcome",
      login: "Login",
      logout: "Logout",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      search: "Search",
      loading: "Loading...",
      error: "Error",
      success: "Success",
    },
    roles: {
      SUPER_ADMIN: "Super Administrator",
      SCHOOL_ADMIN: "School Administrator",
      INSTRUCTOR: "Instructor",
      SECRETARY: "Secretary",
      STUDENT: "Student",
    },
    navigation: {
      dashboard: "Dashboard",
      students: "Students",
      instructors: "Instructors",
      lessons: "Lessons",
      schedule: "Schedule",
      payments: "Payments",
      reports: "Reports",
      settings: "Settings",
    },
  },
};

/**
 * Utilitaires de formatage selon les règles locales
 */
export class LocaleFormatter {
  /**
   * Formate un nombre selon les règles de la locale
   */
  static formatNumber(value: number, locale: SupportedLocale): string {
    const rules = LOCALE_RULES[locale];
    const parts = value.toString().split(".");

    // Partie entière avec séparateur de milliers
    const integerPart = parts[0].replace(
      /\B(?=(\d{3})+(?!\d))/g,
      rules.punctuation.thousandsSeparator
    );

    // Partie décimale
    const decimalPart = parts[1]
      ? `${rules.punctuation.decimalSeparator}${parts[1]}`
      : "";

    return integerPart + decimalPart;
  }

  /**
   * Formate une devise selon les règles de la locale
   */
  static formatCurrency(value: number, locale: SupportedLocale): string {
    const rules = LOCALE_RULES[locale];
    const formattedNumber = LocaleFormatter.formatNumber(value, locale);
    const space = rules.currency.spaceBeforeSymbol ? " " : "";

    return rules.currency.position === "before"
      ? `${rules.currency.symbol}${space}${formattedNumber}`
      : `${formattedNumber}${space}${rules.currency.symbol}`;
  }

  /**
   * Applique les règles de ponctuation
   */
  static formatPunctuation(text: string, locale: SupportedLocale): string {
    const rules = LOCALE_RULES[locale];
    let formatted = text;

    if (rules.punctuation.spaceBeforeColon) {
      formatted = formatted.replace(/\s*:/g, " :");
    }
    if (rules.punctuation.spaceBeforeSemicolon) {
      formatted = formatted.replace(/\s*;/g, " ;");
    }
    if (rules.punctuation.spaceBeforeExclamation) {
      formatted = formatted.replace(/\s*!/g, " !");
    }
    if (rules.punctuation.spaceBeforeQuestion) {
      formatted = formatted.replace(/\s*\?/g, " ?");
    }

    return formatted;
  }

  /**
   * Applique les guillemets selon la locale
   */
  static quote(text: string, locale: SupportedLocale, single = false): string {
    const rules = LOCALE_RULES[locale];
    const quotes = single ? rules.quotes.single : rules.quotes;
    return `${quotes.opening}${text}${quotes.closing}`;
  }
}

/**
 * Hook personnalisé pour gestion i18n et typographie
 */
export function useTypography(initialLocale: SupportedLocale = "fr") {
  const [currentLocale, setCurrentLocale] =
    useState<SupportedLocale>(initialLocale);
  const [translations, setTranslations] = useState<TranslationKeys>(
    TRANSLATIONS[initialLocale]
  );

  /**
   * Change la locale active
   */
  const changeLocale = useCallback((locale: SupportedLocale) => {
    setCurrentLocale(locale);
    setTranslations(TRANSLATIONS[locale]);

    // Sauvegarde dans localStorage
    localStorage.setItem("viamentor-locale", locale);

    // Met à jour l'attribut lang du document
    document.documentElement.lang = locale;
  }, []);

  /**
   * Récupère une traduction par clé
   */
  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let value: any = translations;

      for (const k of keys) {
        value = value?.[k];
      }

      return value || key;
    },
    [translations]
  );

  /**
   * Formate un nombre
   */
  const formatNumber = useCallback(
    (value: number): string => {
      return LocaleFormatter.formatNumber(value, currentLocale);
    },
    [currentLocale]
  );

  /**
   * Formate une devise
   */
  const formatCurrency = useCallback(
    (value: number): string => {
      return LocaleFormatter.formatCurrency(value, currentLocale);
    },
    [currentLocale]
  );

  /**
   * Applique les règles de ponctuation
   */
  const formatPunctuation = useCallback(
    (text: string): string => {
      return LocaleFormatter.formatPunctuation(text, currentLocale);
    },
    [currentLocale]
  );

  /**
   * Applique les guillemets
   */
  const quote = useCallback(
    (text: string, single = false): string => {
      return LocaleFormatter.quote(text, currentLocale, single);
    },
    [currentLocale]
  );

  // Charge la locale sauvegardée au montage
  useEffect(() => {
    const savedLocale = localStorage.getItem(
      "viamentor-locale"
    ) as SupportedLocale | null;
    if (savedLocale && LOCALE_RULES[savedLocale]) {
      changeLocale(savedLocale);
    }
  }, [changeLocale]);

  return {
    currentLocale,
    localeRules: LOCALE_RULES[currentLocale],
    translations,
    changeLocale,
    t,
    formatNumber,
    formatCurrency,
    formatPunctuation,
    quote,
    availableLocales: Object.keys(LOCALE_RULES) as SupportedLocale[],
  };
}

export type { SupportedLocale, LocaleTypographyRules, TranslationKeys };
