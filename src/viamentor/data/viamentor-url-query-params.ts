/**
 * VIAMENTOR - URL Query Params Service
 * Service de gestion des query params pour multi-vues et filtres
 */

import { useSearchParams, useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Planning view types
 */
export type PlanningView = "day" | "week" | "month";

/**
 * Students view types
 */
export type StudentsView = "grid" | "list" | "cards";

/**
 * Invoices view types (filtres rapides)
 */
export type InvoicesView = "all" | "unpaid" | "paid" | "overdue" | "draft";

/**
 * Generic query params
 */
export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook pour gérer les query params de Planning
 *
 * @example
 * ```tsx
 * const { view, setView, date, setDate } = usePlanningQueryParams();
 *
 * // Change view
 * setView("week"); // URL: /planning?view=week
 *
 * // Change date
 * setDate("2024-01-15"); // URL: /planning?view=week&date=2024-01-15
 * ```
 */
export function usePlanningQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const view = useMemo<PlanningView>(() => {
    const viewParam = searchParams.get("view");
    if (viewParam === "day" || viewParam === "week" || viewParam === "month") {
      return viewParam;
    }
    return "month"; // Default
  }, [searchParams]);

  const date = useMemo(() => {
    return searchParams.get("date") || undefined;
  }, [searchParams]);

  const category = useMemo(() => {
    return searchParams.get("category") || undefined;
  }, [searchParams]);

  const instructor = useMemo(() => {
    return searchParams.get("instructor") || undefined;
  }, [searchParams]);

  const setView = useCallback(
    (newView: PlanningView) => {
      const params = new URLSearchParams(searchParams);
      params.set("view", newView);
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const setDate = useCallback(
    (newDate: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("date", newDate);
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const setCategory = useCallback(
    (newCategory: string) => {
      const params = new URLSearchParams(searchParams);
      if (newCategory === "all") {
        params.delete("category");
      } else {
        params.set("category", newCategory);
      }
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const setInstructor = useCallback(
    (newInstructor: string) => {
      const params = new URLSearchParams(searchParams);
      if (newInstructor === "all") {
        params.delete("instructor");
      } else {
        params.set("instructor", newInstructor);
      }
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const resetFilters = useCallback(() => {
    const params = new URLSearchParams();
    params.set("view", view); // Keep view
    setSearchParams(params, { replace: true });
  }, [view, setSearchParams]);

  return {
    view,
    setView,
    date,
    setDate,
    category,
    setCategory,
    instructor,
    setInstructor,
    resetFilters,
  };
}

/**
 * Hook pour gérer les query params de Students
 *
 * @example
 * ```tsx
 * const { view, setView, status, setStatus } = useStudentsQueryParams();
 *
 * // Change view
 * setView("grid"); // URL: /students?view=grid
 *
 * // Change status filter
 * setStatus("active"); // URL: /students?view=grid&status=active
 * ```
 */
export function useStudentsQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const view = useMemo<StudentsView>(() => {
    const viewParam = searchParams.get("view");
    if (viewParam === "grid" || viewParam === "list" || viewParam === "cards") {
      return viewParam;
    }
    return "list"; // Default
  }, [searchParams]);

  const status = useMemo(() => {
    return searchParams.get("status") || undefined;
  }, [searchParams]);

  const category = useMemo(() => {
    return searchParams.get("category") || undefined;
  }, [searchParams]);

  const instructor = useMemo(() => {
    return searchParams.get("instructor") || undefined;
  }, [searchParams]);

  const search = useMemo(() => {
    return searchParams.get("search") || undefined;
  }, [searchParams]);

  const setView = useCallback(
    (newView: StudentsView) => {
      const params = new URLSearchParams(searchParams);
      params.set("view", newView);
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const setStatus = useCallback(
    (newStatus: string) => {
      const params = new URLSearchParams(searchParams);
      if (newStatus === "all") {
        params.delete("status");
      } else {
        params.set("status", newStatus);
      }
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const setCategory = useCallback(
    (newCategory: string) => {
      const params = new URLSearchParams(searchParams);
      if (newCategory === "all") {
        params.delete("category");
      } else {
        params.set("category", newCategory);
      }
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const setInstructor = useCallback(
    (newInstructor: string) => {
      const params = new URLSearchParams(searchParams);
      if (newInstructor === "all") {
        params.delete("instructor");
      } else {
        params.set("instructor", newInstructor);
      }
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const setSearch = useCallback(
    (newSearch: string) => {
      const params = new URLSearchParams(searchParams);
      if (!newSearch) {
        params.delete("search");
      } else {
        params.set("search", newSearch);
      }
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const resetFilters = useCallback(() => {
    const params = new URLSearchParams();
    params.set("view", view); // Keep view
    setSearchParams(params, { replace: true });
  }, [view, setSearchParams]);

  return {
    view,
    setView,
    status,
    setStatus,
    category,
    setCategory,
    instructor,
    setInstructor,
    search,
    setSearch,
    resetFilters,
  };
}

/**
 * Hook pour gérer les query params de Invoices
 *
 * @example
 * ```tsx
 * const { view, setView, dateFrom, setDateFrom } = useInvoicesQueryParams();
 *
 * // Change view (quick filter)
 * setView("unpaid"); // URL: /invoices?view=unpaid
 *
 * // Change date range
 * setDateFrom("2024-01-01"); // URL: /invoices?view=unpaid&dateFrom=2024-01-01
 * ```
 */
export function useInvoicesQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const view = useMemo<InvoicesView>(() => {
    const viewParam = searchParams.get("view");
    if (
      viewParam === "all" ||
      viewParam === "unpaid" ||
      viewParam === "paid" ||
      viewParam === "overdue" ||
      viewParam === "draft"
    ) {
      return viewParam;
    }
    return "all"; // Default
  }, [searchParams]);

  const displayMode = useMemo<"table" | "cards">(() => {
    const modeParam = searchParams.get("display");
    if (modeParam === "table" || modeParam === "cards") {
      return modeParam;
    }
    return "table"; // Default
  }, [searchParams]);

  const dateFrom = useMemo(() => {
    return searchParams.get("dateFrom") || undefined;
  }, [searchParams]);

  const dateTo = useMemo(() => {
    return searchParams.get("dateTo") || undefined;
  }, [searchParams]);

  const student = useMemo(() => {
    return searchParams.get("student") || undefined;
  }, [searchParams]);

  const search = useMemo(() => {
    return searchParams.get("search") || undefined;
  }, [searchParams]);

  const setView = useCallback(
    (newView: InvoicesView) => {
      const params = new URLSearchParams(searchParams);
      params.set("view", newView);
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const setDisplayMode = useCallback(
    (newMode: "table" | "cards") => {
      const params = new URLSearchParams(searchParams);
      params.set("display", newMode);
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const setDateFrom = useCallback(
    (newDate: string) => {
      const params = new URLSearchParams(searchParams);
      if (!newDate) {
        params.delete("dateFrom");
      } else {
        params.set("dateFrom", newDate);
      }
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const setDateTo = useCallback(
    (newDate: string) => {
      const params = new URLSearchParams(searchParams);
      if (!newDate) {
        params.delete("dateTo");
      } else {
        params.set("dateTo", newDate);
      }
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const setStudent = useCallback(
    (newStudent: string) => {
      const params = new URLSearchParams(searchParams);
      if (newStudent === "all") {
        params.delete("student");
      } else {
        params.set("student", newStudent);
      }
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const setSearch = useCallback(
    (newSearch: string) => {
      const params = new URLSearchParams(searchParams);
      if (!newSearch) {
        params.delete("search");
      } else {
        params.set("search", newSearch);
      }
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const resetFilters = useCallback(() => {
    const params = new URLSearchParams();
    params.set("view", "all");
    params.set("display", displayMode); // Keep display mode
    setSearchParams(params, { replace: true });
  }, [displayMode, setSearchParams]);

  return {
    view,
    setView,
    displayMode,
    setDisplayMode,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    student,
    setStudent,
    search,
    setSearch,
    resetFilters,
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Build URL with query params
 */
export function buildUrlWithParams(
  basePath: string,
  params: QueryParams
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Parse query params from URL
 */
export function parseQueryParams(search: string): QueryParams {
  const params = new URLSearchParams(search);
  const result: QueryParams = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

/**
 * Merge query params
 */
export function mergeQueryParams(
  current: QueryParams,
  updates: QueryParams
): QueryParams {
  return { ...current, ...updates };
}

/**
 * Remove query params
 */
export function removeQueryParams(
  current: QueryParams,
  keys: string[]
): QueryParams {
  const result = { ...current };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}
