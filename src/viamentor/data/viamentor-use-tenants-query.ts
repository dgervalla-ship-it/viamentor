/**
 * VIAMENTOR - Use Tenants Query
 * Hook TanStack Query pour gestion données serveur Tenants
 *
 * Responsabilités:
 * - Fetch liste tenants avec filtres
 * - Fetch détail tenant
 * - Mutations CRUD tenants
 * - Cache management et invalidation
 * - Optimistic updates
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTenantsStore } from "@/viamentor/data/viamentor-tenants-store";

// ============================================================================
// TYPES
// ============================================================================

export interface Tenant {
  id: string;
  name: string;
  schoolName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  canton: string;
  postalCode: string;
  status: "active" | "trial" | "suspended" | "canceled";
  plan: "starter" | "professional" | "enterprise";
  createdAt: string;
  trialEndsAt?: string;
  subscriptionEndsAt?: string;
  users: number;
  students: number;
  instructors: number;
  vehicles: number;
  mrr: number;
  logo?: string;
}

export interface TenantDetail extends Tenant {
  settings: {
    timezone: string;
    language: string;
    currency: string;
    dateFormat: string;
  };
  billing: {
    billingEmail: string;
    paymentMethod: string;
    nextBillingDate: string;
    lastPaymentDate: string;
    lastPaymentAmount: number;
  };
  usage: {
    storage: number;
    storageLimit: number;
    apiCalls: number;
    apiCallsLimit: number;
  };
  logs: Array<{
    id: string;
    action: string;
    user: string;
    timestamp: string;
    details: string;
  }>;
}

export interface TenantsFilters {
  search?: string;
  status?: string[];
  plan?: string[];
  canton?: string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface CreateTenantData {
  name: string;
  schoolName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  canton: string;
  postalCode: string;
  plan: "starter" | "professional" | "enterprise";
  adminUser: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface UpdateTenantData {
  name?: string;
  schoolName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  canton?: string;
  postalCode?: string;
  status?: "active" | "trial" | "suspended" | "canceled";
  plan?: "starter" | "professional" | "enterprise";
}

// ============================================================================
// QUERY KEYS
// ============================================================================

export const tenantsKeys = {
  all: ["tenants"] as const,
  lists: () => [...tenantsKeys.all, "list"] as const,
  list: (filters: TenantsFilters) => [...tenantsKeys.lists(), filters] as const,
  details: () => [...tenantsKeys.all, "detail"] as const,
  detail: (id: string) => [...tenantsKeys.details(), id] as const,
  stats: () => [...tenantsKeys.all, "stats"] as const,
};

// ============================================================================
// API SIMULATION
// ============================================================================

const MOCK_TENANTS: Tenant[] = [
  {
    id: "1",
    name: "Auto-École Lausanne",
    schoolName: "Auto-École Lausanne SA",
    email: "contact@ae-lausanne.ch",
    phone: "+41 21 123 45 67",
    address: "Rue de la Gare 15",
    city: "Lausanne",
    canton: "VD",
    postalCode: "1003",
    status: "active",
    plan: "professional",
    createdAt: "2024-01-15T10:00:00Z",
    users: 8,
    students: 145,
    instructors: 6,
    vehicles: 4,
    mrr: 299,
  },
  {
    id: "2",
    name: "École de Conduite Genève",
    schoolName: "École de Conduite Genève Sàrl",
    email: "info@ec-geneve.ch",
    phone: "+41 22 987 65 43",
    address: "Avenue du Mont-Blanc 22",
    city: "Genève",
    canton: "GE",
    postalCode: "1201",
    status: "trial",
    plan: "starter",
    createdAt: "2024-03-01T14:30:00Z",
    trialEndsAt: "2024-04-01T14:30:00Z",
    users: 3,
    students: 28,
    instructors: 2,
    vehicles: 1,
    mrr: 0,
  },
  {
    id: "3",
    name: "Fahrschule Zürich",
    schoolName: "Fahrschule Zürich GmbH",
    email: "kontakt@fahrschule-zh.ch",
    phone: "+41 44 555 66 77",
    address: "Bahnhofstrasse 100",
    city: "Zürich",
    canton: "ZH",
    postalCode: "8001",
    status: "active",
    plan: "enterprise",
    createdAt: "2023-06-10T09:00:00Z",
    users: 15,
    students: 320,
    instructors: 12,
    vehicles: 8,
    mrr: 599,
  },
];

const simulateDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const fetchTenants = async (filters: TenantsFilters): Promise<Tenant[]> => {
  await simulateDelay();

  let filtered = [...MOCK_TENANTS];

  // Search filter
  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(search) ||
        t.schoolName.toLowerCase().includes(search) ||
        t.email.toLowerCase().includes(search) ||
        t.city.toLowerCase().includes(search)
    );
  }

  // Status filter
  if (filters.status && filters.status.length > 0) {
    filtered = filtered.filter((t) => filters.status!.includes(t.status));
  }

  // Plan filter
  if (filters.plan && filters.plan.length > 0) {
    filtered = filtered.filter((t) => filters.plan!.includes(t.plan));
  }

  // Canton filter
  if (filters.canton && filters.canton.length > 0) {
    filtered = filtered.filter((t) => filters.canton!.includes(t.canton));
  }

  // Sort
  if (filters.sortBy) {
    filtered.sort((a, b) => {
      const aVal = a[filters.sortBy as keyof Tenant];
      const bVal = b[filters.sortBy as keyof Tenant];
      const order = filters.sortOrder === "desc" ? -1 : 1;

      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal) * order;
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return (aVal - bVal) * order;
      }
      return 0;
    });
  }

  return filtered;
};

const fetchTenantDetail = async (id: string): Promise<TenantDetail> => {
  await simulateDelay();

  const tenant = MOCK_TENANTS.find((t) => t.id === id);
  if (!tenant) throw new Error("Tenant not found");

  return {
    ...tenant,
    settings: {
      timezone: "Europe/Zurich",
      language: "fr",
      currency: "CHF",
      dateFormat: "DD.MM.YYYY",
    },
    billing: {
      billingEmail: tenant.email,
      paymentMethod: "Credit Card",
      nextBillingDate: "2024-04-15T00:00:00Z",
      lastPaymentDate: "2024-03-15T00:00:00Z",
      lastPaymentAmount: tenant.mrr,
    },
    usage: {
      storage: 2.5,
      storageLimit: 10,
      apiCalls: 15420,
      apiCallsLimit: 50000,
    },
    logs: [
      {
        id: "1",
        action: "User created",
        user: "admin@example.com",
        timestamp: "2024-03-20T10:30:00Z",
        details: "Created new instructor account",
      },
      {
        id: "2",
        action: "Settings updated",
        user: "admin@example.com",
        timestamp: "2024-03-19T15:45:00Z",
        details: "Updated school information",
      },
    ],
  };
};

const createTenant = async (data: CreateTenantData): Promise<Tenant> => {
  await simulateDelay(1000);

  const newTenant: Tenant = {
    id: String(MOCK_TENANTS.length + 1),
    name: data.name,
    schoolName: data.schoolName,
    email: data.email,
    phone: data.phone,
    address: data.address,
    city: data.city,
    canton: data.canton,
    postalCode: data.postalCode,
    status: "trial",
    plan: data.plan,
    createdAt: new Date().toISOString(),
    trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    users: 1,
    students: 0,
    instructors: 0,
    vehicles: 0,
    mrr: 0,
  };

  MOCK_TENANTS.push(newTenant);
  return newTenant;
};

const updateTenant = async (
  id: string,
  data: UpdateTenantData
): Promise<Tenant> => {
  await simulateDelay(800);

  const index = MOCK_TENANTS.findIndex((t) => t.id === id);
  if (index === -1) throw new Error("Tenant not found");

  MOCK_TENANTS[index] = { ...MOCK_TENANTS[index], ...data };
  return MOCK_TENANTS[index];
};

const deleteTenant = async (id: string): Promise<void> => {
  await simulateDelay(800);

  const index = MOCK_TENANTS.findIndex((t) => t.id === id);
  if (index === -1) throw new Error("Tenant not found");

  MOCK_TENANTS.splice(index, 1);
};

const fetchTenantsStats = async () => {
  await simulateDelay();

  return {
    total: MOCK_TENANTS.length,
    active: MOCK_TENANTS.filter((t) => t.status === "active").length,
    trial: MOCK_TENANTS.filter((t) => t.status === "trial").length,
    suspended: MOCK_TENANTS.filter((t) => t.status === "suspended").length,
    totalMrr: MOCK_TENANTS.reduce((sum, t) => sum + t.mrr, 0),
    totalStudents: MOCK_TENANTS.reduce((sum, t) => sum + t.students, 0),
    totalInstructors: MOCK_TENANTS.reduce((sum, t) => sum + t.instructors, 0),
  };
};

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook pour récupérer la liste des tenants avec filtres
 */
export function useTenantsList() {
  const filters = useTenantsStore((state) => ({
    search: state.filters.search,
    status: state.filters.status,
    plan: state.filters.plan,
    canton: state.filters.canton,
    sortBy: state.sort.sortBy,
    sortOrder: state.sort.sortOrder,
  }));

  return useQuery({
    queryKey: tenantsKeys.list(filters),
    queryFn: () => fetchTenants(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook pour récupérer le détail d'un tenant
 */
export function useTenantDetail(id: string | undefined) {
  return useQuery({
    queryKey: tenantsKeys.detail(id || ""),
    queryFn: () => fetchTenantDetail(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Hook pour récupérer les stats globales
 */
export function useTenantsStats() {
  return useQuery({
    queryKey: tenantsKeys.stats(),
    queryFn: fetchTenantsStats,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

/**
 * Hook pour créer un tenant
 */
export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTenant,
    onSuccess: () => {
      // Invalider toutes les listes de tenants
      queryClient.invalidateQueries({ queryKey: tenantsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tenantsKeys.stats() });
    },
  });
}

/**
 * Hook pour mettre à jour un tenant
 */
export function useUpdateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTenantData }) =>
      updateTenant(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: tenantsKeys.detail(id) });

      // Snapshot previous value
      const previousTenant = queryClient.getQueryData(tenantsKeys.detail(id));

      // Optimistically update
      queryClient.setQueryData(tenantsKeys.detail(id), (old: any) => ({
        ...old,
        ...data,
      }));

      return { previousTenant };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previousTenant) {
        queryClient.setQueryData(
          tenantsKeys.detail(id),
          context.previousTenant
        );
      }
    },
    onSuccess: (data, { id }) => {
      // Invalider les listes et le détail
      queryClient.invalidateQueries({ queryKey: tenantsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tenantsKeys.stats() });
      queryClient.setQueryData(tenantsKeys.detail(id), data);
    },
  });
}

/**
 * Hook pour supprimer un tenant
 */
export function useDeleteTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTenant,
    onSuccess: () => {
      // Invalider toutes les listes de tenants
      queryClient.invalidateQueries({ queryKey: tenantsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tenantsKeys.stats() });
    },
  });
}
