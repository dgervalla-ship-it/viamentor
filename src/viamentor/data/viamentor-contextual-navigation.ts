/**
 * VIAMENTOR Contextual Navigation Service
 *
 * Service pour gérer la navigation contextuelle entre entités avec query params
 * Permet de naviguer entre élèves/moniteurs/véhicules avec contexte de filtres
 */

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

// ============================================================================
// TYPES
// ============================================================================

export type NavigationContext =
  | "all" // Tous les élèves
  | "active" // Élèves actifs
  | "inactive" // Élèves inactifs
  | "pending" // En attente
  | "category" // Par catégorie
  | "instructor" // Par moniteur
  | "search"; // Résultats recherche

export interface ContextualNavigationState {
  entityType: "students" | "instructors" | "vehicles";
  currentId: string;
  context: NavigationContext;
  contextValue?: string; // Ex: categoryId, instructorId, searchQuery
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: Record<string, any>;
}

export interface NavigationItem {
  id: string;
  name: string;
  avatar?: string;
  status?: string;
  category?: string;
}

export interface ContextualNavigationResult {
  hasPrevious: boolean;
  hasNext: boolean;
  previousId: string | null;
  nextId: string | null;
  currentIndex: number;
  totalCount: number;
  similarItems: NavigationItem[];
  goToPrevious: () => void;
  goToNext: () => void;
  goToSimilar: (id: string) => void;
  backToList: () => void;
}

// ============================================================================
// HOOK: useContextualNavigation
// ============================================================================

/**
 * Hook pour gérer la navigation contextuelle entre entités
 *
 * @example
 * ```tsx
 * const navigation = useContextualNavigation({
 *   entityType: "students",
 *   currentId: studentId,
 *   items: allStudents,
 *   getItemId: (s) => s.id,
 *   getItemName: (s) => s.fullName,
 *   listPath: "/students"
 * });
 *
 * // Navigation
 * navigation.goToNext();
 * navigation.goToPrevious();
 * navigation.goToSimilar(otherId);
 * ```
 */
export function useContextualNavigation<T>(config: {
  entityType: "students" | "instructors" | "vehicles";
  currentId: string;
  items: T[];
  getItemId: (item: T) => string;
  getItemName: (item: T) => string;
  getItemAvatar?: (item: T) => string | undefined;
  getItemStatus?: (item: T) => string | undefined;
  getItemCategory?: (item: T) => string | undefined;
  listPath: string;
  similarItemsCount?: number;
}): ContextualNavigationResult {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const {
    entityType,
    currentId,
    items,
    getItemId,
    getItemName,
    getItemAvatar,
    getItemStatus,
    getItemCategory,
    listPath,
    similarItemsCount = 5,
  } = config;

  // Parse context from URL
  const context = (searchParams.get("context") as NavigationContext) || "all";
  const contextValue = searchParams.get("contextValue") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = (searchParams.get("sortOrder") as "asc" | "desc") || "asc";

  // Calculate navigation state
  const navigationState = useMemo(() => {
    const currentIndex = items.findIndex(
      (item) => getItemId(item) === currentId
    );
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < items.length - 1;
    const previousId = hasPrevious ? getItemId(items[currentIndex - 1]) : null;
    const nextId = hasNext ? getItemId(items[currentIndex + 1]) : null;

    // Get similar items (same category, same instructor, etc.)
    const currentItem = items[currentIndex];
    const similarItems: NavigationItem[] = [];

    if (currentItem && getItemCategory) {
      const currentCategory = getItemCategory(currentItem);
      const similar = items
        .filter(
          (item) =>
            getItemId(item) !== currentId &&
            getItemCategory(item) === currentCategory
        )
        .slice(0, similarItemsCount)
        .map((item) => ({
          id: getItemId(item),
          name: getItemName(item),
          avatar: getItemAvatar?.(item),
          status: getItemStatus?.(item),
          category: getItemCategory?.(item),
        }));

      similarItems.push(...similar);
    }

    return {
      currentIndex,
      hasPrevious,
      hasNext,
      previousId,
      nextId,
      totalCount: items.length,
      similarItems,
    };
  }, [
    items,
    currentId,
    getItemId,
    getItemName,
    getItemAvatar,
    getItemStatus,
    getItemCategory,
    similarItemsCount,
  ]);

  // Build URL with context params
  const buildUrl = (id: string) => {
    const params = new URLSearchParams();
    if (context !== "all") params.set("context", context);
    if (contextValue) params.set("contextValue", contextValue);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder !== "asc") params.set("sortOrder", sortOrder);

    const queryString = params.toString();
    return `${listPath}/${id}${queryString ? `?${queryString}` : ""}`;
  };

  // Navigation functions
  const goToPrevious = () => {
    if (navigationState.previousId) {
      navigate(buildUrl(navigationState.previousId));
    }
  };

  const goToNext = () => {
    if (navigationState.nextId) {
      navigate(buildUrl(navigationState.nextId));
    }
  };

  const goToSimilar = (id: string) => {
    navigate(buildUrl(id));
  };

  const backToList = () => {
    const params = new URLSearchParams();
    if (context !== "all") params.set("context", context);
    if (contextValue) params.set("contextValue", contextValue);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder !== "asc") params.set("sortOrder", sortOrder);

    const queryString = params.toString();
    navigate(`${listPath}${queryString ? `?${queryString}` : ""}`);
  };

  return {
    ...navigationState,
    goToPrevious,
    goToNext,
    goToSimilar,
    backToList,
  };
}

// ============================================================================
// HELPER: buildContextualUrl
// ============================================================================

/**
 * Construit une URL avec contexte de navigation
 */
export function buildContextualUrl(
  basePath: string,
  id: string,
  context?: NavigationContext,
  contextValue?: string,
  sortBy?: string,
  sortOrder?: "asc" | "desc"
): string {
  const params = new URLSearchParams();
  if (context && context !== "all") params.set("context", context);
  if (contextValue) params.set("contextValue", contextValue);
  if (sortBy) params.set("sortBy", sortBy);
  if (sortOrder && sortOrder !== "asc") params.set("sortOrder", sortOrder);

  const queryString = params.toString();
  return `${basePath}/${id}${queryString ? `?${queryString}` : ""}`;
}

// ============================================================================
// HELPER: parseNavigationContext
// ============================================================================

/**
 * Parse le contexte de navigation depuis les query params
 */
export function parseNavigationContext(searchParams: URLSearchParams): {
  context: NavigationContext;
  contextValue?: string;
  sortBy?: string;
  sortOrder: "asc" | "desc";
} {
  return {
    context: (searchParams.get("context") as NavigationContext) || "all",
    contextValue: searchParams.get("contextValue") || undefined,
    sortBy: searchParams.get("sortBy") || undefined,
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "asc",
  };
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

export const CONTEXTUAL_NAVIGATION_I18N = {
  fr: {
    previous: "Élève précédent",
    next: "Élève suivant",
    backToList: "Retour à la liste",
    similarItems: "Élèves similaires",
    position: "{{current}} sur {{total}}",
    noSimilar: "Aucun élève similaire",
    context: {
      all: "Tous les élèves",
      active: "Élèves actifs",
      inactive: "Élèves inactifs",
      pending: "En attente",
      category: "Catégorie {{category}}",
      instructor: "Moniteur {{instructor}}",
      search: "Résultats de recherche",
    },
  },
  de: {
    previous: "Vorheriger Schüler",
    next: "Nächster Schüler",
    backToList: "Zurück zur Liste",
    similarItems: "Ähnliche Schüler",
    position: "{{current}} von {{total}}",
    noSimilar: "Keine ähnlichen Schüler",
    context: {
      all: "Alle Schüler",
      active: "Aktive Schüler",
      inactive: "Inaktive Schüler",
      pending: "Ausstehend",
      category: "Kategorie {{category}}",
      instructor: "Fahrlehrer {{instructor}}",
      search: "Suchergebnisse",
    },
  },
  it: {
    previous: "Allievo precedente",
    next: "Allievo successivo",
    backToList: "Torna alla lista",
    similarItems: "Allievi simili",
    position: "{{current}} su {{total}}",
    noSimilar: "Nessun allievo simile",
    context: {
      all: "Tutti gli allievi",
      active: "Allievi attivi",
      inactive: "Allievi inattivi",
      pending: "In attesa",
      category: "Categoria {{category}}",
      instructor: "Istruttore {{instructor}}",
      search: "Risultati della ricerca",
    },
  },
  en: {
    previous: "Previous student",
    next: "Next student",
    backToList: "Back to list",
    similarItems: "Similar students",
    position: "{{current}} of {{total}}",
    noSimilar: "No similar students",
    context: {
      all: "All students",
      active: "Active students",
      inactive: "Inactive students",
      pending: "Pending",
      category: "Category {{category}}",
      instructor: "Instructor {{instructor}}",
      search: "Search results",
    },
  },
} as const;

export type ContextualNavigationLocale =
  keyof typeof CONTEXTUAL_NAVIGATION_I18N;

export function useContextualNavigationTranslations(
  locale: ContextualNavigationLocale = "fr"
) {
  return CONTEXTUAL_NAVIGATION_I18N[locale];
}
