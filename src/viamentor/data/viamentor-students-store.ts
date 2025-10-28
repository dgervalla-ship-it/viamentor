/**
 * VIAMENTOR - Students Store
 * Store Zustand pour gestion état UI page Students
 *
 * Responsabilités:
 * - View mode (table/grid)
 * - Sélection multiple élèves
 * - Filtres UI (status, catégorie, moniteur, etc.)
 * - Pagination
 * - Tri
 *
 * Note: Les données élèves sont gérées par TanStack Query (use-students-query)
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// TYPES
// ============================================================================

export type ViewMode = "table" | "grid";
export type SortDirection = "asc" | "desc";

export interface StudentsFilters {
  search: string;
  status: string[];
  categories: string[];
  instructorId: string;
  progressionMin: number;
  progressionMax: number;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
}

export interface StudentsPagination {
  page: number;
  pageSize: number;
}

export interface StudentsSort {
  column: string;
  direction: SortDirection;
}

interface StudentsStore {
  // ============================================================================
  // STATE
  // ============================================================================

  // View
  viewMode: ViewMode;

  // Selection
  selectedIds: string[];

  // Filters
  filters: StudentsFilters;

  // Pagination
  pagination: StudentsPagination;

  // Sort
  sort: StudentsSort;

  // ============================================================================
  // ACTIONS - VIEW
  // ============================================================================

  setViewMode: (mode: ViewMode) => void;

  // ============================================================================
  // ACTIONS - SELECTION
  // ============================================================================

  toggleSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  isSelected: (id: string) => boolean;

  // ============================================================================
  // ACTIONS - FILTERS
  // ============================================================================

  setFilters: (filters: Partial<StudentsFilters>) => void;
  resetFilters: () => void;
  setSearch: (search: string) => void;
  setStatus: (status: string[]) => void;
  setCategories: (categories: string[]) => void;
  setInstructor: (instructorId: string) => void;
  setProgressionRange: (min: number, max: number) => void;
  setDateRange: (from: Date | null, to: Date | null) => void;

  // ============================================================================
  // ACTIONS - PAGINATION
  // ============================================================================

  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  nextPage: () => void;
  prevPage: () => void;

  // ============================================================================
  // ACTIONS - SORT
  // ============================================================================

  setSort: (column: string, direction?: SortDirection) => void;
  toggleSort: (column: string) => void;

  // ============================================================================
  // ACTIONS - RESET
  // ============================================================================

  reset: () => void;
}

// ============================================================================
// DEFAULT STATE
// ============================================================================

const defaultFilters: StudentsFilters = {
  search: "",
  status: [],
  categories: [],
  instructorId: "",
  progressionMin: 0,
  progressionMax: 100,
  dateRange: {
    from: null,
    to: null,
  },
};

const defaultPagination: StudentsPagination = {
  page: 1,
  pageSize: 25,
};

const defaultSort: StudentsSort = {
  column: "lastName",
  direction: "asc",
};

// ============================================================================
// STORE
// ============================================================================

export const useStudentsStore = create<StudentsStore>()(
  persist(
    (set, get) => ({
      // ============================================================================
      // INITIAL STATE
      // ============================================================================

      viewMode: "table",
      selectedIds: [],
      filters: defaultFilters,
      pagination: defaultPagination,
      sort: defaultSort,

      // ============================================================================
      // ACTIONS - VIEW
      // ============================================================================

      setViewMode: (mode) => set({ viewMode: mode }),

      // ============================================================================
      // ACTIONS - SELECTION
      // ============================================================================

      toggleSelection: (id) =>
        set((state) => ({
          selectedIds: state.selectedIds.includes(id)
            ? state.selectedIds.filter((selectedId) => selectedId !== id)
            : [...state.selectedIds, id],
        })),

      selectAll: (ids) => set({ selectedIds: ids }),

      clearSelection: () => set({ selectedIds: [] }),

      isSelected: (id) => get().selectedIds.includes(id),

      // ============================================================================
      // ACTIONS - FILTERS
      // ============================================================================

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
          pagination: { ...state.pagination, page: 1 }, // Reset to page 1
        })),

      resetFilters: () =>
        set({
          filters: defaultFilters,
          pagination: { ...get().pagination, page: 1 },
        }),

      setSearch: (search) =>
        set((state) => ({
          filters: { ...state.filters, search },
          pagination: { ...state.pagination, page: 1 },
        })),

      setStatus: (status) =>
        set((state) => ({
          filters: { ...state.filters, status },
          pagination: { ...state.pagination, page: 1 },
        })),

      setCategories: (categories) =>
        set((state) => ({
          filters: { ...state.filters, categories },
          pagination: { ...state.pagination, page: 1 },
        })),

      setInstructor: (instructorId) =>
        set((state) => ({
          filters: { ...state.filters, instructorId },
          pagination: { ...state.pagination, page: 1 },
        })),

      setProgressionRange: (min, max) =>
        set((state) => ({
          filters: {
            ...state.filters,
            progressionMin: min,
            progressionMax: max,
          },
          pagination: { ...state.pagination, page: 1 },
        })),

      setDateRange: (from, to) =>
        set((state) => ({
          filters: {
            ...state.filters,
            dateRange: { from, to },
          },
          pagination: { ...state.pagination, page: 1 },
        })),

      // ============================================================================
      // ACTIONS - PAGINATION
      // ============================================================================

      setPage: (page) =>
        set((state) => ({
          pagination: { ...state.pagination, page },
        })),

      setPageSize: (pageSize) =>
        set((state) => ({
          pagination: { page: 1, pageSize },
        })),

      nextPage: () =>
        set((state) => ({
          pagination: {
            ...state.pagination,
            page: state.pagination.page + 1,
          },
        })),

      prevPage: () =>
        set((state) => ({
          pagination: {
            ...state.pagination,
            page: Math.max(1, state.pagination.page - 1),
          },
        })),

      // ============================================================================
      // ACTIONS - SORT
      // ============================================================================

      setSort: (column, direction) =>
        set({
          sort: {
            column,
            direction: direction || "asc",
          },
        }),

      toggleSort: (column) =>
        set((state) => ({
          sort: {
            column,
            direction:
              state.sort.column === column && state.sort.direction === "asc"
                ? "desc"
                : "asc",
          },
        })),

      // ============================================================================
      // ACTIONS - RESET
      // ============================================================================

      reset: () =>
        set({
          viewMode: "table",
          selectedIds: [],
          filters: defaultFilters,
          pagination: defaultPagination,
          sort: defaultSort,
        }),
    }),
    {
      name: "viamentor-students-store",
      partialize: (state) => ({
        viewMode: state.viewMode,
        filters: state.filters,
        pagination: state.pagination,
        sort: state.sort,
        // Ne pas persister selectedIds (éphémère)
      }),
    }
  )
);

// ============================================================================
// SELECTORS (pour optimiser re-renders)
// ============================================================================

export const selectViewMode = (state: StudentsStore) => state.viewMode;
export const selectSelectedIds = (state: StudentsStore) => state.selectedIds;
export const selectFilters = (state: StudentsStore) => state.filters;
export const selectPagination = (state: StudentsStore) => state.pagination;
export const selectSort = (state: StudentsStore) => state.sort;
export const selectHasFilters = (state: StudentsStore) => {
  const { filters } = state;
  return (
    filters.search !== "" ||
    filters.status.length > 0 ||
    filters.categories.length > 0 ||
    filters.instructorId !== "" ||
    filters.progressionMin !== 0 ||
    filters.progressionMax !== 100 ||
    filters.dateRange.from !== null ||
    filters.dateRange.to !== null
  );
};
