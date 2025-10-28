/**
 * VIAMENTOR - Guide I18n Complet
 * Guide complet de l'internationalisation avec best practices et exemples
 */

// ============================================================================
// TABLE DES MATIÈRES
// ============================================================================

/**
 * 1. Vue d'ensemble du système i18n
 * 2. Langues supportées
 * 3. Structure des traductions
 * 4. Namespaces et organisation
 * 5. Utilisation dans les composants
 * 6. Formatage des données
 * 7. Pluriels et genres
 * 8. Traductions contextuelles
 * 9. Fallbacks et erreurs
 * 10. Best practices
 * 11. Exemples complets
 * 12. Checklist traduction
 */

// ============================================================================
// 1. VUE D'ENSEMBLE DU SYSTÈME I18N
// ============================================================================

/**
 * Viamentor supporte 4 langues officielles suisses:
 * - Français (FR) - Langue par défaut
 * - Allemand (DE)
 * - Italien (IT)
 * - Anglais (EN)
 *
 * Architecture:
 * - Context API pour la gestion de la locale
 * - Fichiers i18n par domaine
 * - Namespaces pour l'organisation
 * - Formatage automatique dates/nombres/devises
 * - Fallback vers français si traduction manquante
 */

export const I18N_OVERVIEW = {
  languages: ["fr", "de", "it", "en"],
  defaultLanguage: "fr",
  fallbackLanguage: "fr",

  features: [
    "4 langues officielles suisses",
    "Namespaces par domaine",
    "Formatage automatique",
    "Pluriels et genres",
    "Fallbacks intelligents",
    "Hot reload des traductions",
  ],
};

// ============================================================================
// 2. LANGUES SUPPORTÉES
// ============================================================================

/**
 * 2.1 LANGUES OFFICIELLES
 */

export const SUPPORTED_LANGUAGES = {
  fr: {
    name: "Français",
    nativeName: "Français",
    code: "fr-CH",
    flag: "🇨🇭",
    direction: "ltr",
    dateFormat: "DD.MM.YYYY",
    timeFormat: "HH:mm",
    numberFormat: "1'234.56",
    currencyFormat: "CHF 1'234.56",
  },

  de: {
    name: "Allemand",
    nativeName: "Deutsch",
    code: "de-CH",
    flag: "🇨🇭",
    direction: "ltr",
    dateFormat: "DD.MM.YYYY",
    timeFormat: "HH:mm",
    numberFormat: "1'234.56",
    currencyFormat: "CHF 1'234.56",
  },

  it: {
    name: "Italien",
    nativeName: "Italiano",
    code: "it-CH",
    flag: "🇨🇭",
    direction: "ltr",
    dateFormat: "DD.MM.YYYY",
    timeFormat: "HH:mm",
    numberFormat: "1'234.56",
    currencyFormat: "CHF 1'234.56",
  },

  en: {
    name: "Anglais",
    nativeName: "English",
    code: "en-GB",
    flag: "🇬🇧",
    direction: "ltr",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm",
    numberFormat: "1,234.56",
    currencyFormat: "CHF 1,234.56",
  },
};

/**
 * 2.2 RÈGLES GRAMMATICALES
 */

export const GRAMMAR_RULES = {
  fr: {
    gender: ["masculin", "féminin"],
    plural: ["singulier", "pluriel"],
    articles: {
      definite: ["le", "la", "les"],
      indefinite: ["un", "une", "des"],
    },
    examples: {
      singular: "1 élève",
      plural: "2 élèves",
    },
  },

  de: {
    gender: ["maskulin", "feminin", "neutrum"],
    plural: ["Singular", "Plural"],
    articles: {
      definite: ["der", "die", "das"],
      indefinite: ["ein", "eine"],
    },
    examples: {
      singular: "1 Schüler",
      plural: "2 Schüler",
    },
  },

  it: {
    gender: ["maschile", "femminile"],
    plural: ["singolare", "plurale"],
    articles: {
      definite: ["il", "la", "i", "le"],
      indefinite: ["un", "una"],
    },
    examples: {
      singular: "1 allievo",
      plural: "2 allievi",
    },
  },

  en: {
    gender: ["neutral"],
    plural: ["singular", "plural"],
    articles: {
      definite: ["the"],
      indefinite: ["a", "an"],
    },
    examples: {
      singular: "1 student",
      plural: "2 students",
    },
  },
};

// ============================================================================
// 3. STRUCTURE DES TRADUCTIONS
// ============================================================================

/**
 * 3.1 STRUCTURE FICHIER I18N
 */

// Exemple: viamentor-students-i18n
export const studentsI18n = {
  // Français (langue par défaut)
  fr: {
    // Section liste
    list: {
      title: "Gestion des élèves",
      subtitle: "Liste complète des élèves inscrits",
      empty: "Aucun élève inscrit",
      loading: "Chargement des élèves...",
    },

    // Section actions
    actions: {
      create: "Créer un élève",
      edit: "Modifier",
      delete: "Supprimer",
      export: "Exporter",
      import: "Importer",
    },

    // Section filtres
    filters: {
      status: "Statut",
      category: "Catégorie",
      instructor: "Moniteur",
      search: "Rechercher un élève...",
    },

    // Section statuts
    status: {
      active: "Actif",
      inactive: "Inactif",
      suspended: "Suspendu",
      graduated: "Diplômé",
    },

    // Section messages
    messages: {
      createSuccess: "Élève créé avec succès",
      updateSuccess: "Élève modifié avec succès",
      deleteSuccess: "Élève supprimé avec succès",
      deleteConfirm: "Êtes-vous sûr de vouloir supprimer cet élève ?",
    },

    // Section comptage (pluriels)
    count: {
      zero: "Aucun élève",
      one: "1 élève",
      other: "{{count}} élèves",
    },
  },

  // Allemand
  de: {
    list: {
      title: "Schülerverwaltung",
      subtitle: "Vollständige Liste der eingeschriebenen Schüler",
      empty: "Keine Schüler eingeschrieben",
      loading: "Schüler werden geladen...",
    },

    actions: {
      create: "Schüler erstellen",
      edit: "Bearbeiten",
      delete: "Löschen",
      export: "Exportieren",
      import: "Importieren",
    },

    filters: {
      status: "Status",
      category: "Kategorie",
      instructor: "Fahrlehrer",
      search: "Schüler suchen...",
    },

    status: {
      active: "Aktiv",
      inactive: "Inaktiv",
      suspended: "Suspendiert",
      graduated: "Abgeschlossen",
    },

    messages: {
      createSuccess: "Schüler erfolgreich erstellt",
      updateSuccess: "Schüler erfolgreich aktualisiert",
      deleteSuccess: "Schüler erfolgreich gelöscht",
      deleteConfirm:
        "Sind Sie sicher, dass Sie diesen Schüler löschen möchten?",
    },

    count: {
      zero: "Keine Schüler",
      one: "1 Schüler",
      other: "{{count}} Schüler",
    },
  },

  // Italien
  it: {
    list: {
      title: "Gestione allievi",
      subtitle: "Elenco completo degli allievi iscritti",
      empty: "Nessun allievo iscritto",
      loading: "Caricamento allievi...",
    },

    actions: {
      create: "Creare allievo",
      edit: "Modificare",
      delete: "Eliminare",
      export: "Esportare",
      import: "Importare",
    },

    filters: {
      status: "Stato",
      category: "Categoria",
      instructor: "Istruttore",
      search: "Cercare allievo...",
    },

    status: {
      active: "Attivo",
      inactive: "Inattivo",
      suspended: "Sospeso",
      graduated: "Diplomato",
    },

    messages: {
      createSuccess: "Allievo creato con successo",
      updateSuccess: "Allievo modificato con successo",
      deleteSuccess: "Allievo eliminato con successo",
      deleteConfirm: "Sei sicuro di voler eliminare questo allievo?",
    },

    count: {
      zero: "Nessun allievo",
      one: "1 allievo",
      other: "{{count}} allievi",
    },
  },

  // Anglais
  en: {
    list: {
      title: "Student Management",
      subtitle: "Complete list of enrolled students",
      empty: "No students enrolled",
      loading: "Loading students...",
    },

    actions: {
      create: "Create student",
      edit: "Edit",
      delete: "Delete",
      export: "Export",
      import: "Import",
    },

    filters: {
      status: "Status",
      category: "Category",
      instructor: "Instructor",
      search: "Search student...",
    },

    status: {
      active: "Active",
      inactive: "Inactive",
      suspended: "Suspended",
      graduated: "Graduated",
    },

    messages: {
      createSuccess: "Student created successfully",
      updateSuccess: "Student updated successfully",
      deleteSuccess: "Student deleted successfully",
      deleteConfirm: "Are you sure you want to delete this student?",
    },

    count: {
      zero: "No students",
      one: "1 student",
      other: "{{count}} students",
    },
  },
};

// ============================================================================
// 4. NAMESPACES ET ORGANISATION
// ============================================================================

/**
 * 4.1 NAMESPACES STANDARDS
 */

export const I18N_NAMESPACES = {
  // Namespace commun (actions, status, etc.)
  common: {
    file: "viamentor-i18n-config",
    description: "Traductions communes à toute l'application",
    sections: ["actions", "status", "labels", "messages"],
  },

  // Namespaces par domaine
  students: {
    file: "viamentor-students-i18n",
    description: "Gestion des élèves",
    sections: ["list", "actions", "filters", "status", "messages", "count"],
  },

  instructors: {
    file: "viamentor-instructors-i18n",
    description: "Gestion des moniteurs",
    sections: ["list", "actions", "filters", "status", "messages", "count"],
  },

  lessons: {
    file: "viamentor-lessons-i18n",
    description: "Gestion des leçons",
    sections: ["list", "actions", "filters", "types", "messages", "count"],
  },

  theoryCourses: {
    file: "viamentor-theory-courses-i18n",
    description: "Cours théoriques",
    sections: ["list", "actions", "filters", "categories", "messages", "count"],
  },

  exams: {
    file: "viamentor-exams-i18n",
    description: "Examens",
    sections: ["list", "actions", "filters", "types", "results", "messages"],
  },

  vehicles: {
    file: "viamentor-vehicles-i18n",
    description: "Véhicules",
    sections: ["list", "actions", "filters", "status", "messages", "count"],
  },

  billing: {
    file: "viamentor-billing-i18n",
    description: "Facturation",
    sections: ["dashboard", "invoices", "payments", "messages"],
  },

  analytics: {
    file: "viamentor-analytics-i18n",
    description: "Analytics",
    sections: ["revenue", "instructors", "vehicles", "exams", "charts"],
  },

  navigation: {
    file: "viamentor-navigation-i18n",
    description: "Navigation sidebar",
    sections: ["sections", "items", "badges"],
  },
};

/**
 * 4.2 ORGANISATION DES CLÉS
 */

export const KEY_ORGANIZATION = {
  // Format: {namespace}.{section}.{key}
  format: "namespace.section.key",

  // Exemples
  examples: {
    simple: "students.list.title",
    nested: "students.actions.create",
    plural: "students.count.other",
    contextual: "students.messages.createSuccess",
  },

  // Règles
  rules: [
    "Maximum 3 niveaux de profondeur",
    "camelCase pour les clés",
    "Noms descriptifs",
    "Pas de caractères spéciaux",
    "Cohérence dans tout le projet",
  ],
};

// ============================================================================
// 5. UTILISATION DANS LES COMPOSANTS
// ============================================================================

/**
 * 5.1 HOOK useLocale
 */

import { useLocale } from "@/polymet/data/viamentor-locale-provider";

function StudentsPage() {
  const { locale, setLocale, t, formatNumber, formatCurrency, formatDate } =
    useLocale();

  return (
    <div>
      {/* Traduction simple */}
      <h1>{t("students.list.title")}</h1>
      <p>{t("students.list.subtitle")}</p>

      {/* Traduction avec paramètres */}
      <p>{t("students.count.other", { count: 42 })}</p>

      {/* Formatage nombre */}
      <p>{formatNumber(1234567.89)}</p>

      {/* Formatage devise */}
      <p>{formatCurrency(1500.5)}</p>

      {/* Formatage date */}
      <p>{formatDate(new Date())}</p>

      {/* Changement de langue */}
      <Button onClick={() => setLocale("de")}>Deutsch</Button>
    </div>
  );
}

/**
 * 5.2 COMPOSANT Trans
 */

import { Trans } from "@/polymet/data/viamentor-locale-provider";

function StudentsHeader() {
  return (
    <div>
      {/* Traduction inline */}
      <h1>
        <Trans namespace="students" k="list.title" />
      </h1>

      {/* Traduction avec paramètres */}
      <p>
        <Trans namespace="students" k="count.other" params={{ count: 42 }} />
      </p>

      {/* Traduction avec fallback */}
      <p>
        <Trans
          namespace="students"
          k="list.subtitle"
          fallback="Liste des élèves"
        />
      </p>
    </div>
  );
}

/**
 * 5.3 COMPOSANTS DE FORMATAGE
 */

import {
  FormatNumber,
  FormatCurrency,
  FormatDate,
} from "@/polymet/data/viamentor-locale-provider";

function StudentCard({ student }: { student: Student }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{student.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Formatage nombre */}
        <p>
          Leçons: <FormatNumber value={student.lessonsCount} />
        </p>

        {/* Formatage devise */}
        <p>
          Solde: <FormatCurrency value={student.balance} />
        </p>

        {/* Formatage date */}
        <p>
          Inscrit le: <FormatDate value={student.createdAt} />
        </p>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// 6. FORMATAGE DES DONNÉES
// ============================================================================

/**
 * 6.1 FORMATAGE DES NOMBRES
 */

export const NUMBER_FORMATTING = {
  fr: {
    decimal: ",",
    thousands: "'",
    example: "1'234'567,89",
  },
  de: {
    decimal: ",",
    thousands: "'",
    example: "1'234'567,89",
  },
  it: {
    decimal: ",",
    thousands: "'",
    example: "1'234'567,89",
  },
  en: {
    decimal: ".",
    thousands: ",",
    example: "1,234,567.89",
  },
};

// Utilisation
const { formatNumber } = useLocale();
formatNumber(1234567.89); // "1'234'567,89" (FR/DE/IT) ou "1,234,567.89" (EN)

/**
 * 6.2 FORMATAGE DES DEVISES
 */

export const CURRENCY_FORMATTING = {
  currency: "CHF",
  position: "before", // CHF 1'234.56

  examples: {
    fr: "CHF 1'234.56",
    de: "CHF 1'234.56",
    it: "CHF 1'234.56",
    en: "CHF 1,234.56",
  },
};

// Utilisation
const { formatCurrency } = useLocale();
formatCurrency(1234.56); // "CHF 1'234.56" (FR/DE/IT) ou "CHF 1,234.56" (EN)

/**
 * 6.3 FORMATAGE DES DATES
 */

export const DATE_FORMATTING = {
  fr: {
    short: "DD.MM.YYYY",
    long: "DD MMMM YYYY",
    time: "HH:mm",
    datetime: "DD.MM.YYYY HH:mm",
    example: "20.01.2025",
  },
  de: {
    short: "DD.MM.YYYY",
    long: "DD. MMMM YYYY",
    time: "HH:mm",
    datetime: "DD.MM.YYYY HH:mm",
    example: "20.01.2025",
  },
  it: {
    short: "DD.MM.YYYY",
    long: "DD MMMM YYYY",
    time: "HH:mm",
    datetime: "DD.MM.YYYY HH:mm",
    example: "20.01.2025",
  },
  en: {
    short: "DD/MM/YYYY",
    long: "DD MMMM YYYY",
    time: "HH:mm",
    datetime: "DD/MM/YYYY HH:mm",
    example: "20/01/2025",
  },
};

// Utilisation
const { formatDate } = useLocale();
formatDate(new Date()); // "20.01.2025" (FR/DE/IT) ou "20/01/2025" (EN)

// ============================================================================
// 7. PLURIELS ET GENRES
// ============================================================================

/**
 * 7.1 GESTION DES PLURIELS
 */

export const PLURAL_RULES = {
  // Format standard
  format: {
    zero: "Aucun élève",
    one: "1 élève",
    other: "{{count}} élèves",
  },

  // Utilisation
  usage: `
    // Dans le fichier i18n
    count: {
      zero: "Aucun élève",
      one: "1 élève",
      other: "{{count}} élèves",
    }

    // Dans le composant
    t("students.count.other", { count: 0 }) // "Aucun élève"
    t("students.count.other", { count: 1 }) // "1 élève"
    t("students.count.other", { count: 5 }) // "5 élèves"
  `,

  // Règles par langue
  rules: {
    fr: ["zero", "one", "other"],
    de: ["zero", "one", "other"],
    it: ["zero", "one", "other"],
    en: ["zero", "one", "other"],
  },
};

/**
 * 7.2 GESTION DES GENRES
 */

export const GENDER_RULES = {
  // Français
  fr: {
    masculine: {
      article: "le",
      example: "le moniteur",
    },
    feminine: {
      article: "la",
      example: "la monitrice",
    },
  },

  // Allemand
  de: {
    masculine: {
      article: "der",
      example: "der Fahrlehrer",
    },
    feminine: {
      article: "die",
      example: "die Fahrlehrerin",
    },
    neutral: {
      article: "das",
      example: "das Fahrzeug",
    },
  },

  // Italien
  it: {
    masculine: {
      article: "il",
      example: "l'istruttore",
    },
    feminine: {
      article: "la",
      example: "l'istruttrice",
    },
  },

  // Anglais (neutre)
  en: {
    neutral: {
      article: "the",
      example: "the instructor",
    },
  },
};

// ============================================================================
// 8. TRADUCTIONS CONTEXTUELLES
// ============================================================================

/**
 * 8.1 CONTEXTES DIFFÉRENTS
 */

export const CONTEXTUAL_TRANSLATIONS = {
  // Exemple: "Leçon" peut avoir différents sens
  lesson: {
    // Contexte: Leçon pratique
    practical: {
      fr: "Leçon de conduite",
      de: "Fahrstunde",
      it: "Lezione di guida",
      en: "Driving lesson",
    },

    // Contexte: Leçon théorique
    theoretical: {
      fr: "Cours théorique",
      de: "Theoriekurs",
      it: "Corso teorico",
      en: "Theory course",
    },

    // Contexte: Leçon d'évaluation
    evaluation: {
      fr: "Leçon d'évaluation",
      de: "Prüfungsfahrt",
      it: "Lezione di valutazione",
      en: "Evaluation lesson",
    },
  },

  // Exemple: "Statut" selon le contexte
  status: {
    // Contexte: Élève
    student: {
      active: {
        fr: "Actif",
        de: "Aktiv",
        it: "Attivo",
        en: "Active",
      },
      inactive: {
        fr: "Inactif",
        de: "Inaktiv",
        it: "Inattivo",
        en: "Inactive",
      },
    },

    // Contexte: Véhicule
    vehicle: {
      available: {
        fr: "Disponible",
        de: "Verfügbar",
        it: "Disponibile",
        en: "Available",
      },
      maintenance: {
        fr: "En maintenance",
        de: "In Wartung",
        it: "In manutenzione",
        en: "Under maintenance",
      },
    },
  },
};

// ============================================================================
// 9. FALLBACKS ET ERREURS
// ============================================================================

/**
 * 9.1 STRATÉGIE DE FALLBACK
 */

export const FALLBACK_STRATEGY = {
  // Ordre de fallback
  order: [
    "1. Traduction demandée (ex: de)",
    "2. Traduction par défaut (fr)",
    "3. Clé i18n (ex: students.list.title)",
    "4. Fallback manuel si fourni",
  ],

  // Exemple
  example: `
    // Traduction manquante en DE
    t("students.list.newFeature") 
    // → Cherche en DE (non trouvé)
    // → Cherche en FR (trouvé)
    // → Retourne traduction FR

    // Traduction manquante partout
    t("students.list.missing")
    // → Cherche en DE (non trouvé)
    // → Cherche en FR (non trouvé)
    // → Retourne "students.list.missing"

    // Avec fallback manuel
    t("students.list.missing", {}, "Valeur par défaut")
    // → Retourne "Valeur par défaut"
  `,
};

/**
 * 9.2 GESTION DES ERREURS
 */

export const ERROR_HANDLING = {
  // Clé manquante
  missingKey: {
    behavior: "Retourne la clé",
    example: "students.list.missing",
    console: "Warning: Missing translation key",
  },

  // Namespace manquant
  missingNamespace: {
    behavior: "Retourne la clé complète",
    example: "unknown.list.title",
    console: "Warning: Missing namespace",
  },

  // Paramètre manquant
  missingParam: {
    behavior: "Retourne {{param}}",
    example: "{{count}} élèves",
    console: "Warning: Missing parameter 'count'",
  },
};

// ============================================================================
// 10. BEST PRACTICES
// ============================================================================

/**
 * 10.1 BEST PRACTICES GÉNÉRALES
 */

export const I18N_BEST_PRACTICES = {
  // Organisation
  organization: [
    "✅ Un fichier i18n par domaine",
    "✅ Namespaces cohérents",
    "✅ Structure claire et logique",
    "✅ Sections bien définies",
    "✅ Clés descriptives",
  ],

  // Traductions
  translations: [
    "✅ Toujours traduire les 4 langues",
    "✅ Respecter les règles grammaticales",
    "✅ Utiliser les pluriels appropriés",
    "✅ Adapter le contexte",
    "✅ Vérifier la cohérence",
  ],

  // Formatage
  formatting: [
    "✅ Utiliser formatNumber pour les nombres",
    "✅ Utiliser formatCurrency pour les devises",
    "✅ Utiliser formatDate pour les dates",
    "✅ Respecter les formats locaux",
    "✅ Tester tous les formats",
  ],

  // Performance
  performance: [
    "✅ Lazy load des traductions",
    "✅ Cache des traductions",
    "✅ Éviter les re-renders inutiles",
    "✅ Memoization si nécessaire",
  ],

  // Maintenance
  maintenance: [
    "✅ Documenter les clés",
    "✅ Supprimer les clés inutilisées",
    "✅ Vérifier les traductions manquantes",
    "✅ Tester régulièrement",
    "✅ Mettre à jour la documentation",
  ],
};

/**
 * 10.2 ANTI-PATTERNS À ÉVITER
 */

export const I18N_ANTI_PATTERNS = {
  // ❌ À ÉVITER
  avoid: [
    "❌ Hardcoder les textes en français",
    "❌ Mélanger français et anglais dans les clés",
    "❌ Oublier des traductions",
    "❌ Utiliser des clés trop longues",
    "❌ Dupliquer les traductions",
    "❌ Ignorer les pluriels",
    "❌ Ignorer les genres",
    "❌ Formater manuellement les dates/nombres",
  ],

  // ✅ À PRIVILÉGIER
  prefer: [
    "✅ Utiliser t() pour toutes les traductions",
    "✅ Clés en anglais camelCase",
    "✅ Traductions complètes",
    "✅ Clés courtes et descriptives",
    "✅ Réutiliser les traductions communes",
    "✅ Gérer les pluriels",
    "✅ Respecter les genres",
    "✅ Utiliser les fonctions de formatage",
  ],
};

// ============================================================================
// 11. EXEMPLES COMPLETS
// ============================================================================

/**
 * 11.1 EXEMPLE COMPLET: Page Liste Élèves
 */

// Fichier i18n
export const studentsI18nComplete = {
  fr: {
    list: {
      title: "Gestion des élèves",
      subtitle: "Liste complète des élèves inscrits",
      empty: "Aucun élève inscrit",
    },
    actions: {
      create: "Créer un élève",
      export: "Exporter",
    },
    count: {
      zero: "Aucun élève",
      one: "1 élève",
      other: "{{count}} élèves",
    },
  },
  // ... de, it, en
};

// Composant
function StudentsPageComplete() {
  const { t, formatNumber } = useLocale();
  const students = useStudents();

  return (
    <div>
      <h1>{t("students.list.title")}</h1>
      <p>{t("students.list.subtitle")}</p>

      {students.length === 0 ? (
        <p>{t("students.list.empty")}</p>
      ) : (
        <>
          <p>{t("students.count.other", { count: students.length })}</p>
          <StudentsTable students={students} />
        </>
      )}

      <Button>{t("students.actions.create")}</Button>
      <Button>{t("students.actions.export")}</Button>
    </div>
  );
}

/**
 * 11.2 EXEMPLE COMPLET: Wizard Multi-Steps
 */

// Fichier i18n
export const wizardI18n = {
  fr: {
    steps: {
      identity: "Identité",
      training: "Formation",
      legal: "Légal",
      summary: "Résumé",
    },
    navigation: {
      previous: "Précédent",
      next: "Suivant",
      finish: "Terminer",
      cancel: "Annuler",
    },
    progress: "Étape {{current}} sur {{total}}",
  },
  // ... de, it, en
};

// Composant
function CreateStudentWizardComplete() {
  const { t } = useLocale();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  return (
    <div>
      <p>{t("wizard.progress", { current: currentStep, total: totalSteps })}</p>

      <Steps>
        <Step>{t("wizard.steps.identity")}</Step>
        <Step>{t("wizard.steps.training")}</Step>
        <Step>{t("wizard.steps.legal")}</Step>
        <Step>{t("wizard.steps.summary")}</Step>
      </Steps>

      <div className="flex gap-2">
        <Button onClick={() => setCurrentStep(currentStep - 1)}>
          {t("wizard.navigation.previous")}
        </Button>
        <Button onClick={() => setCurrentStep(currentStep + 1)}>
          {t("wizard.navigation.next")}
        </Button>
        <Button variant="outline">{t("wizard.navigation.cancel")}</Button>
      </div>
    </div>
  );
}

// ============================================================================
// 12. CHECKLIST TRADUCTION
// ============================================================================

/**
 * Checklist avant de créer/modifier des traductions:
 */

export const TRANSLATION_CHECKLIST = {
  // Fichier i18n
  file: [
    "✅ Fichier nommé viamentor-{domain}-i18n",
    "✅ Export des 4 langues (FR/DE/IT/EN)",
    "✅ Structure cohérente",
    "✅ Sections bien organisées",
  ],

  // Traductions
  translations: [
    "✅ Toutes les clés traduites en FR",
    "✅ Toutes les clés traduites en DE",
    "✅ Toutes les clés traduites en IT",
    "✅ Toutes les clés traduites en EN",
    "✅ Pluriels gérés",
    "✅ Genres respectés",
    "✅ Contextes adaptés",
  ],

  // Qualité
  quality: [
    "✅ Orthographe correcte",
    "✅ Grammaire correcte",
    "✅ Terminologie cohérente",
    "✅ Ton approprié",
    "✅ Longueur raisonnable",
  ],

  // Tests
  tests: [
    "✅ Testé en FR",
    "✅ Testé en DE",
    "✅ Testé en IT",
    "✅ Testé en EN",
    "✅ Formatage vérifié",
    "✅ Pluriels vérifiés",
  ],
};

// ============================================================================
// RESSOURCES
// ============================================================================

/**
 * Fichiers de référence:
 * - @/polymet/data/viamentor-locale-provider
 * - @/polymet/data/viamentor-i18n-config
 * - @/polymet/data/viamentor-students-i18n
 * - @/polymet/data/viamentor-naming-conventions
 */

export const I18N_GUIDE_VERSION = "1.0.0";
export const I18N_GUIDE_LAST_UPDATE = "2025-01-20";
