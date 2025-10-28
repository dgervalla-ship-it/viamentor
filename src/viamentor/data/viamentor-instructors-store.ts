/**
 * ============================================================================
 * VIAMENTOR - Instructors Store (Zustand)
 * ============================================================================
 *
 * Store Zustand pour gestion état UI page Instructors
 *
 * Responsabilités:
 * - Filtres (search, categories, availability, OMCo status, training due)
 * - Sélection multiple (selectedIds)
 * - View mode (table/grid)
 * - Pagination (currentPage, rowsPerPage)
 * - Persistence localStorage
 *
 * @example
 * ```tsx
 * const { filters, setFilters, viewMode, setViewMode } = useInstructorsStore();
 * ```
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// TYPES
// ============================================================================

export interface InstructorsFilters {
  search: string;
  categories: string[];
  availability: "all" | "available" | "in_lesson" | "absent";
  omcoStatus: string[];
  trainingDue: boolean;
}

export interface InstructorsStore {
  // UI State
  viewMode: "table" | "grid";
  selectedIds: string[];
  filters: InstructorsFilters;
  currentPage: number;
  rowsPerPage: number;

  // Actions - View Mode
  setViewMode: (mode: "table" | "grid") => void;

  // Actions - Selection
  toggleSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;

  // Actions - Filters
  setFilters: (filters: Partial<InstructorsFilters>) => void;
  resetFilters: () => void;

  // Actions - Pagination
  setCurrentPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;

  // Actions - Reset
  reset: () => void;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialFilters: InstructorsFilters = {
  search: "",
  categories: [],
  availability: "all",
  omcoStatus: [],
  trainingDue: false,
};

const initialState = {
  viewMode: "table" as const,
  selectedIds: [],
  filters: initialFilters,
  currentPage: 1,
  rowsPerPage: 25,
};

// ============================================================================
// STORE
// ============================================================================

export const useInstructorsStore = create<InstructorsStore>()(
  persist(
    (set) => ({
      ...initialState,

      // View Mode
      setViewMode: (mode) => set({ viewMode: mode }),

      // Selection
      toggleSelection: (id) =>
        set((state) => ({
          selectedIds: state.selectedIds.includes(id)
            ? state.selectedIds.filter((i) => i !== id)
            : [...state.selectedIds, id],
        })),

      selectAll: (ids) => set({ selectedIds: ids }),

      clearSelection: () => set({ selectedIds: [] }),

      // Filters
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
          currentPage: 1, // Reset page on filter change
        })),

      resetFilters: () =>
        set({
          filters: initialFilters,
          currentPage: 1,
        }),

      // Pagination
      setCurrentPage: (page) => set({ currentPage: page }),

      setRowsPerPage: (rows) =>
        set({
          rowsPerPage: rows,
          currentPage: 1, // Reset page on rows change
        }),

      // Reset
      reset: () => set(initialState),
    }),
    {
      name: "viamentor-instructors-store",
      partialize: (state) => ({
        viewMode: state.viewMode,
        filters: state.filters,
        rowsPerPage: state.rowsPerPage,
        // Ne pas persister: selectedIds, currentPage
      }),
    }
  )
);
