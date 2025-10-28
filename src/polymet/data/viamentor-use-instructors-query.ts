/**
 * ============================================================================
 * VIAMENTOR - Use Instructors Query (TanStack Query)
 * ============================================================================
 *
 * Hook TanStack Query pour gestion données serveur Instructors
 *
 * Responsabilités:
 * - Queries (list, detail, stats, availability)
 * - Mutations (create, update, delete, suspend)
 * - Cache management (invalidation, optimistic updates)
 * - Error handling
 *
 * @example
 * ```tsx
 * const { instructorsList, createInstructor, updateInstructor } = useInstructorsQuery();
 * const { data, isLoading } = instructorsList(filters);
 * ```
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MOCK_INSTRUCTORS,
  MOCK_INSTRUCTOR_STATS,
  Instructor,
  InstructorStats,
  FiltersState,
} from "@/polymet/data/viamentor-instructors-data";

// ============================================================================
// TYPES
// ============================================================================

export interface CreateInstructorData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  categories: string[];
  omcoNumber: string;
  omcoExpiry: string;
  contractType: string;
  hourlyRate: number;
}

export interface UpdateInstructorData extends Partial<CreateInstructorData> {
  id: string;
}

// ============================================================================
// API SIMULATION
// ============================================================================

const simulateDelay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Fetch instructors list with filters
async function fetchInstructorsList(
  filters: FiltersState
): Promise<Instructor[]> {
  await simulateDelay();

  let filtered = [...MOCK_INSTRUCTORS];

  // Apply filters
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (i) =>
        i.firstName.toLowerCase().includes(searchLower) ||
        i.lastName.toLowerCase().includes(searchLower) ||
        i.email.toLowerCase().includes(searchLower)
    );
  }

  if (filters.categories.length > 0) {
    filtered = filtered.filter((i) =>
      filters.categories.some((cat) => i.categories.includes(cat))
    );
  }

  if (filters.availability !== "all") {
    const statusMap = {
      available: "Disponible",
      in_lesson: "En leçon",
      absent: "Absent",
    };
    filtered = filtered.filter(
      (i) =>
        i.status === statusMap[filters.availability as keyof typeof statusMap]
    );
  }

  if (filters.omcoStatus.length > 0) {
    filtered = filtered.filter((i) =>
      filters.omcoStatus.includes(i.omcoStatus)
    );
  }

  if (filters.trainingDue) {
    filtered = filtered.filter((i) => i.trainingDue);
  }

  return filtered;
}

// Fetch instructor detail
async function fetchInstructorDetail(id: string): Promise<Instructor> {
  await simulateDelay();
  const instructor = MOCK_INSTRUCTORS.find((i) => i.id === id);
  if (!instructor) throw new Error("Instructor not found");
  return instructor;
}

// Fetch instructor stats
async function fetchInstructorStats(): Promise<InstructorStats> {
  await simulateDelay();
  return MOCK_INSTRUCTOR_STATS;
}

// Create instructor
async function createInstructor(
  data: CreateInstructorData
): Promise<Instructor> {
  await simulateDelay();
  const newInstructor: Instructor = {
    id: `inst-${Date.now()}`,
    ...data,
    status: "Disponible",
    omcoStatus: "Valide",
    nextLesson: null,
    studentsCount: 0,
    lessonsThisMonth: 0,
    successRate: 0,
    rating: 0,
    trainingDue: false,
  };
  return newInstructor;
}

// Update instructor
async function updateInstructor(
  data: UpdateInstructorData
): Promise<Instructor> {
  await simulateDelay();
  const instructor = MOCK_INSTRUCTORS.find((i) => i.id === data.id);
  if (!instructor) throw new Error("Instructor not found");
  return { ...instructor, ...data };
}

// Delete instructor
async function deleteInstructor(id: string): Promise<void> {
  await simulateDelay();
  console.log("Instructor deleted:", id);
}

// Suspend instructor
async function suspendInstructor(id: string): Promise<Instructor> {
  await simulateDelay();
  const instructor = MOCK_INSTRUCTORS.find((i) => i.id === id);
  if (!instructor) throw new Error("Instructor not found");
  return { ...instructor, status: "Absent" };
}

// ============================================================================
// QUERY KEYS
// ============================================================================

export const instructorsKeys = {
  all: ["instructors"] as const,
  lists: () => [...instructorsKeys.all, "list"] as const,
  list: (filters: FiltersState) =>
    [...instructorsKeys.lists(), filters] as const,
  details: () => [...instructorsKeys.all, "detail"] as const,
  detail: (id: string) => [...instructorsKeys.details(), id] as const,
  stats: () => [...instructorsKeys.all, "stats"] as const,
};

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook pour liste instructeurs avec filtres
 */
export function useInstructorsList(filters: FiltersState) {
  return useQuery({
    queryKey: instructorsKeys.list(filters),
    queryFn: () => fetchInstructorsList(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook pour détail instructeur
 */
export function useInstructorDetail(id: string) {
  return useQuery({
    queryKey: instructorsKeys.detail(id),
    queryFn: () => fetchInstructorDetail(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
}

/**
 * Hook pour stats instructeurs
 */
export function useInstructorStats() {
  return useQuery({
    queryKey: instructorsKeys.stats(),
    queryFn: fetchInstructorStats,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook pour créer instructeur
 */
export function useCreateInstructor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInstructor,
    onSuccess: () => {
      // Invalider toutes les listes
      queryClient.invalidateQueries({ queryKey: instructorsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: instructorsKeys.stats() });
    },
  });
}

/**
 * Hook pour mettre à jour instructeur
 */
export function useUpdateInstructor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInstructor,
    onSuccess: (data) => {
      // Invalider liste et détail
      queryClient.invalidateQueries({ queryKey: instructorsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: instructorsKeys.detail(data.id),
      });
      queryClient.invalidateQueries({ queryKey: instructorsKeys.stats() });
    },
  });
}

/**
 * Hook pour supprimer instructeur
 */
export function useDeleteInstructor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInstructor,
    onSuccess: () => {
      // Invalider toutes les listes
      queryClient.invalidateQueries({ queryKey: instructorsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: instructorsKeys.stats() });
    },
  });
}

/**
 * Hook pour suspendre instructeur
 */
export function useSuspendInstructor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: suspendInstructor,
    onSuccess: (data) => {
      // Invalider liste et détail
      queryClient.invalidateQueries({ queryKey: instructorsKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: instructorsKeys.detail(data.id),
      });
      queryClient.invalidateQueries({ queryKey: instructorsKeys.stats() });
    },
  });
}

/**
 * Hook principal regroupant toutes les queries/mutations
 */
export function useInstructorsQuery() {
  return {
    // Queries
    useInstructorsList,
    useInstructorDetail,
    useInstructorStats,

    // Mutations
    useCreateInstructor,
    useUpdateInstructor,
    useDeleteInstructor,
    useSuspendInstructor,
  };
}
