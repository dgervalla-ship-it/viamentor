/**
 * VIAMENTOR - Tenants Store
 * Store Zustand pour gestion état UI tenants Platform Admin
 *
 * Responsabilités:
 * - État filtres tenants (statut, plan, canton, recherche)
 * - État affichage (table/grid, colonnes visibles, tri)
 * - État sélection multiple et bulk actions
 * - État modals et dialogs
 * - Préférences utilisateur
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// TYPES
// ============================================================================

type TenantStatus = "active" | "trial" | "suspended" | "canceled";
type TenantPlan = "starter" | "professional" | "enterprise";
type ViewMode = "table" | "grid";
type SortField = "name" | "createdAt" | "plan" | "students" | "revenue";
type SortOrder = "asc" | "desc";

interface TenantsFilters {
  search: string;
  status: TenantStatus[];
  plan: TenantPlan[];
  cantons: string[];
  dateRange?: {
    from: Date;
    to: Date;
  };
  minStudents?: number;
  maxStudents?: number;
  minRevenue?: number;
  maxRevenue?: number;
}

interface TenantsSort {
  field: SortField;
  order: SortOrder;
}

interface TenantsDisplay {
  viewMode: ViewMode;
  visibleColumns: string[];
  itemsPerPage: number;
  currentPage: number;
}

interface TenantsBulkActions {
  selectedIds: string[];
  isAllSelected: boolean;
  excludedIds: string[];
}

interface TenantsModals {
  createTenant: boolean;
  editTenant: string | null;
  deleteTenant: string | null;
  suspendTenant: string | null;
  changePlan: string | null;
  viewDetails: string | null;
  exportData: boolean;
}

interface TenantsState {
  // Filtres
  filters: TenantsFilters;
  setFilters: (filters: Partial<TenantsFilters>) => void;
  resetFilters: () => void;
  clearFilter: (key: keyof TenantsFilters) => void;

  // Tri
  sort: TenantsSort;
  setSort: (field: SortField) => void;
  toggleSortOrder: () => void;

  // Affichage
  display: TenantsDisplay;
  setViewMode: (mode: ViewMode) => void;
  toggleColumn: (column: string) => void;
  setItemsPerPage: (items: number) => void;
  setCurrentPage: (page: number) => void;

  // Sélection & Bulk Actions
  bulkActions: TenantsBulkActions;
  selectTenant: (id: string) => void;
  deselectTenant: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
  toggleTenant: (id: string) => void;
  isSelected: (id: string) => boolean;

  // Modals
  modals: TenantsModals;
  openModal: (modal: keyof TenantsModals, id?: string) => void;
  closeModal: (modal: keyof TenantsModals) => void;
  closeAllModals: () => void;

  // Quick Actions
  quickFilters: {
    showActive: boolean;
    showTrial: boolean;
    showSuspended: boolean;
  };
  toggleQuickFilter: (filter: keyof TenantsState["quickFilters"]) => void;

  // Préférences
  preferences: {
    defaultView: ViewMode;
    autoRefresh: boolean;
    refreshInterval: number; // en secondes
    showMetrics: boolean;
    compactMode: boolean;
  };
  setPreferences: (prefs: Partial<TenantsState["preferences"]>) => void;
}

// ============================================================================
// DEFAULTS
// ============================================================================

const DEFAULT_FILTERS: TenantsFilters = {
  search: "",
  status: [],
  plan: [],
  cantons: [],
};

const DEFAULT_SORT: TenantsSort = {
  field: "createdAt",
  order: "desc",
};

const DEFAULT_DISPLAY: TenantsDisplay = {
  viewMode: "table",
  visibleColumns: [
    "name",
    "status",
    "plan",
    "students",
    "revenue",
    "createdAt",
  ],

  itemsPerPage: 20,
  currentPage: 1,
};

const DEFAULT_BULK_ACTIONS: TenantsBulkActions = {
  selectedIds: [],
  isAllSelected: false,
  excludedIds: [],
};

const DEFAULT_MODALS: TenantsModals = {
  createTenant: false,
  editTenant: null,
  deleteTenant: null,
  suspendTenant: null,
  changePlan: null,
  viewDetails: null,
  exportData: false,
};

const DEFAULT_QUICK_FILTERS = {
  showActive: true,
  showTrial: true,
  showSuspended: false,
};

const DEFAULT_PREFERENCES = {
  defaultView: "table" as ViewMode,
  autoRefresh: false,
  refreshInterval: 30,
  showMetrics: true,
  compactMode: false,
};

// ============================================================================
// STORE
// ============================================================================

export const useTenantsStore = create<TenantsState>()(
  persist(
    (set, get) => ({
      // Filtres
      filters: DEFAULT_FILTERS,
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
          display: { ...state.display, currentPage: 1 }, // Reset page
        })),
      resetFilters: () =>
        set({
          filters: DEFAULT_FILTERS,
          display: { ...get().display, currentPage: 1 },
        }),
      clearFilter: (key) =>
        set((state) => {
          const newFilters = { ...state.filters };
          if (Array.isArray(newFilters[key])) {
            newFilters[key] = [] as any;
          } else if (typeof newFilters[key] === "string") {
            newFilters[key] = "" as any;
          } else {
            delete newFilters[key];
          }
          return {
            filters: newFilters,
            display: { ...state.display, currentPage: 1 },
          };
        }),

      // Tri
      sort: DEFAULT_SORT,
      setSort: (field) =>
        set((state) => ({
          sort: {
            field,
            order:
              state.sort.field === field && state.sort.order === "asc"
                ? "desc"
                : "asc",
          },
        })),
      toggleSortOrder: () =>
        set((state) => ({
          sort: {
            ...state.sort,
            order: state.sort.order === "asc" ? "desc" : "asc",
          },
        })),

      // Affichage
      display: DEFAULT_DISPLAY,
      setViewMode: (mode) =>
        set((state) => ({
          display: { ...state.display, viewMode: mode },
        })),
      toggleColumn: (column) =>
        set((state) => ({
          display: {
            ...state.display,
            visibleColumns: state.display.visibleColumns.includes(column)
              ? state.display.visibleColumns.filter((col) => col !== column)
              : [...state.display.visibleColumns, column],
          },
        })),
      setItemsPerPage: (items) =>
        set((state) => ({
          display: { ...state.display, itemsPerPage: items, currentPage: 1 },
        })),
      setCurrentPage: (page) =>
        set((state) => ({
          display: { ...state.display, currentPage: page },
        })),

      // Sélection & Bulk Actions
      bulkActions: DEFAULT_BULK_ACTIONS,
      selectTenant: (id) =>
        set((state) => ({
          bulkActions: {
            ...state.bulkActions,
            selectedIds: [...state.bulkActions.selectedIds, id],
            excludedIds: state.bulkActions.excludedIds.filter(
              (eid) => eid !== id
            ),
          },
        })),
      deselectTenant: (id) =>
        set((state) => ({
          bulkActions: {
            ...state.bulkActions,
            selectedIds: state.bulkActions.selectedIds.filter(
              (sid) => sid !== id
            ),
            excludedIds: state.bulkActions.isAllSelected
              ? [...state.bulkActions.excludedIds, id]
              : state.bulkActions.excludedIds,
          },
        })),
      selectAll: () =>
        set({
          bulkActions: {
            selectedIds: [],
            isAllSelected: true,
            excludedIds: [],
          },
        }),
      deselectAll: () => set({ bulkActions: DEFAULT_BULK_ACTIONS }),
      toggleTenant: (id) => {
        const { isSelected } = get();
        if (isSelected(id)) {
          get().deselectTenant(id);
        } else {
          get().selectTenant(id);
        }
      },
      isSelected: (id) => {
        const { bulkActions } = get();
        if (bulkActions.isAllSelected) {
          return !bulkActions.excludedIds.includes(id);
        }
        return bulkActions.selectedIds.includes(id);
      },

      // Modals
      modals: DEFAULT_MODALS,
      openModal: (modal, id) =>
        set((state) => ({
          modals: {
            ...state.modals,
            [modal]: id !== undefined ? id : true,
          },
        })),
      closeModal: (modal) =>
        set((state) => ({
          modals: {
            ...state.modals,
            [modal]: modal.includes("Tenant") ? null : false,
          },
        })),
      closeAllModals: () => set({ modals: DEFAULT_MODALS }),

      // Quick Filters
      quickFilters: DEFAULT_QUICK_FILTERS,
      toggleQuickFilter: (filter) =>
        set((state) => ({
          quickFilters: {
            ...state.quickFilters,
            [filter]: !state.quickFilters[filter],
          },
        })),

      // Préférences
      preferences: DEFAULT_PREFERENCES,
      setPreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),
    }),
    {
      name: "viamentor-tenants-storage",
      partialize: (state) => ({
        display: state.display,
        sort: state.sort,
        quickFilters: state.quickFilters,
        preferences: state.preferences,
      }),
    }
  )
);
