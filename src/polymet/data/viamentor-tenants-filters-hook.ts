/**
 * VIAMENTOR Tenants Filters Hook
 *
 * Hook pour gestion des filtres avec persistence URL et localStorage
 *
 * @module data/viamentor-tenants-filters-hook
 * @version 1.0.0
 */

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Tenant,
  TenantPlan,
  TenantStatus,
} from "@/polymet/data/viamentor-tenants-data";

export interface TenantsFilters {
  search: string;
  plan: TenantPlan | "All";
  status: TenantStatus | "All";
  canton: string;
}

export interface FilterPreset {
  id: string;
  name: string;
  filters: TenantsFilters;
  icon?: string;
}

const DEFAULT_FILTERS: TenantsFilters = {
  search: "",
  plan: "All",
  status: "All",
  canton: "All",
};

const STORAGE_KEY = "viamentor-tenants-filter-presets";

/**
 * Hook pour gestion des filtres tenants
 */
export function useTenantsFilters(tenants: Tenant[]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<TenantsFilters>(() => {
    // Initialiser depuis URL params
    return {
      search: searchParams.get("search") || "",
      plan: (searchParams.get("plan") as TenantPlan) || "All",
      status: (searchParams.get("status") as TenantStatus) || "All",
      canton: searchParams.get("canton") || "All",
    };
  });

  const [presets, setPresets] = useState<FilterPreset[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Sync filters avec URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.plan !== "All") params.set("plan", filters.plan);
    if (filters.status !== "All") params.set("status", filters.status);
    if (filters.canton !== "All") params.set("canton", filters.canton);
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  // Filtrer les tenants
  const filteredTenants = useMemo(() => {
    return tenants.filter((tenant) => {
      // Search filter (nom ou email)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchName = tenant.name.toLowerCase().includes(searchLower);
        const matchEmail = tenant.email.toLowerCase().includes(searchLower);
        if (!matchName && !matchEmail) return false;
      }

      // Plan filter
      if (filters.plan !== "All" && tenant.plan !== filters.plan) {
        return false;
      }

      // Status filter
      if (filters.status !== "All" && tenant.status !== filters.status) {
        return false;
      }

      // Canton filter
      if (
        filters.canton !== "All" &&
        tenant.address.canton !== filters.canton
      ) {
        return false;
      }

      return true;
    });
  }, [tenants, filters]);

  // Update individual filter
  const updateFilter = useCallback(
    <K extends keyof TenantsFilters>(key: K, value: TenantsFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Reset all filters
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  // Save current filters as preset
  const savePreset = useCallback(
    (name: string, icon?: string) => {
      const newPreset: FilterPreset = {
        id: `preset-${Date.now()}`,
        name,
        filters: { ...filters },
        icon,
      };
      const updatedPresets = [...presets, newPreset];
      setPresets(updatedPresets);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPresets));
      return newPreset;
    },
    [filters, presets]
  );

  // Load preset
  const loadPreset = useCallback((preset: FilterPreset) => {
    setFilters(preset.filters);
  }, []);

  // Delete preset
  const deletePreset = useCallback(
    (presetId: string) => {
      const updatedPresets = presets.filter((p) => p.id !== presetId);
      setPresets(updatedPresets);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPresets));
    },
    [presets]
  );

  // Check if filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== "" ||
      filters.plan !== "All" ||
      filters.status !== "All" ||
      filters.canton !== "All"
    );
  }, [filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredTenants,
    hasActiveFilters,
    presets,
    savePreset,
    loadPreset,
    deletePreset,
  };
}
