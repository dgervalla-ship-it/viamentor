/**
 * VIAMENTOR - Use Students Query
 * Hook TanStack Query pour gestion données serveur Students
 *
 * Responsabilités:
 * - Queries: list, detail, stats
 * - Mutations: create, update, delete
 * - Cache management
 * - Optimistic updates
 * - Error handling
 *
 * Note: L'état UI (filtres, sélection) est géré par Zustand (students-store)
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import type {
  StudentsFilters,
  StudentsPagination,
  StudentsSort,
} from "@/polymet/data/viamentor-students-store";

// ============================================================================
// TYPES
// ============================================================================

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  status: "active" | "inactive" | "pending" | "graduated";
  categories: string[];
  instructorId: string;
  instructorName: string;
  progression: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  nextLesson: string | null;
  registrationDate: string;
  avatar: string;
}

export interface StudentsListResponse {
  data: Student[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface StudentsStats {
  total: number;
  active: number;
  inactive: number;
  graduated: number;
  averageProgression: number;
}

export interface CreateStudentInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  categories: string[];
  instructorId: string;
}

export interface UpdateStudentInput extends Partial<CreateStudentInput> {
  id: string;
  status?: Student["status"];
}

// ============================================================================
// QUERY KEYS
// ============================================================================

export const studentsKeys = {
  all: ["students"] as const,
  lists: () => [...studentsKeys.all, "list"] as const,
  list: (
    filters: StudentsFilters,
    pagination: StudentsPagination,
    sort: StudentsSort
  ) => [...studentsKeys.lists(), { filters, pagination, sort }] as const,
  details: () => [...studentsKeys.all, "detail"] as const,
  detail: (id: string) => [...studentsKeys.details(), id] as const,
  stats: () => [...studentsKeys.all, "stats"] as const,
};

// ============================================================================
// API FUNCTIONS (Mock - à remplacer par vraies API calls)
// ============================================================================

async function fetchStudentsList(
  filters: StudentsFilters,
  pagination: StudentsPagination,
  sort: StudentsSort
): Promise<StudentsListResponse> {
  // Simuler délai réseau
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock data
  const mockStudents: Student[] = Array.from({ length: 100 }, (_, i) => ({
    id: `student-${i + 1}`,
    firstName: `Prénom${i + 1}`,
    lastName: `Nom${i + 1}`,
    email: `student${i + 1}@example.com`,
    phone: `+41 79 ${String(i).padStart(3, "0")} ${String(i).padStart(2, "0")} ${String(i).padStart(2, "0")}`,
    birthDate: "2000-01-01",
    status: ["active", "inactive", "pending", "graduated"][
      i % 4
    ] as Student["status"],
    categories: ["B", "A1"][i % 2 === 0 ? 0 : 1] ? ["B"] : ["A1"],
    instructorId: `instructor-${(i % 5) + 1}`,
    instructorName: `Moniteur ${(i % 5) + 1}`,
    progression: Math.floor(Math.random() * 100),
    lessonsCompleted: Math.floor(Math.random() * 30),
    lessonsTotal: 40,
    nextLesson: i % 3 === 0 ? "2024-01-15 10:00" : null,
    registrationDate: "2023-09-01",
    avatar: `https://github.com/yusufhilmi.png`,
  }));

  // Appliquer filtres
  let filtered = mockStudents;

  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.firstName.toLowerCase().includes(search) ||
        s.lastName.toLowerCase().includes(search) ||
        s.email.toLowerCase().includes(search)
    );
  }

  if (filters.status.length > 0) {
    filtered = filtered.filter((s) => filters.status.includes(s.status));
  }

  if (filters.categories.length > 0) {
    filtered = filtered.filter((s) =>
      s.categories.some((c) => filters.categories.includes(c))
    );
  }

  if (filters.instructorId) {
    filtered = filtered.filter((s) => s.instructorId === filters.instructorId);
  }

  // Appliquer tri
  filtered.sort((a, b) => {
    const aValue = a[sort.column as keyof Student];
    const bValue = b[sort.column as keyof Student];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sort.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sort.direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  // Appliquer pagination
  const start = (pagination.page - 1) * pagination.pageSize;
  const end = start + pagination.pageSize;
  const paginatedData = filtered.slice(start, end);

  return {
    data: paginatedData,
    total: filtered.length,
    page: pagination.page,
    pageSize: pagination.pageSize,
    totalPages: Math.ceil(filtered.length / pagination.pageSize),
  };
}

async function fetchStudentDetail(id: string): Promise<Student> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    id,
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "+41 79 123 45 67",
    birthDate: "2000-01-01",
    status: "active",
    categories: ["B"],
    instructorId: "instructor-1",
    instructorName: "Moniteur 1",
    progression: 65,
    lessonsCompleted: 26,
    lessonsTotal: 40,
    nextLesson: "2024-01-15 10:00",
    registrationDate: "2023-09-01",
    avatar: "https://github.com/yusufhilmi.png",
  };
}

async function fetchStudentsStats(): Promise<StudentsStats> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    total: 100,
    active: 75,
    inactive: 15,
    graduated: 10,
    averageProgression: 65,
  };
}

async function createStudent(input: CreateStudentInput): Promise<Student> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: `student-${Date.now()}`,
    ...input,
    status: "pending",
    progression: 0,
    lessonsCompleted: 0,
    lessonsTotal: 40,
    nextLesson: null,
    registrationDate: new Date().toISOString(),
    avatar: "https://github.com/yusufhilmi.png",
    instructorName: "Moniteur 1",
  };
}

async function updateStudent(input: UpdateStudentInput): Promise<Student> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const existing = await fetchStudentDetail(input.id);
  return { ...existing, ...input };
}

async function deleteStudent(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
}

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook pour récupérer la liste des élèves
 */
export function useStudentsList(
  filters: StudentsFilters,
  pagination: StudentsPagination,
  sort: StudentsSort,
  options?: Omit<UseQueryOptions<StudentsListResponse>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: studentsKeys.list(filters, pagination, sort),
    queryFn: () => fetchStudentsList(filters, pagination, sort),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (anciennement cacheTime)
    ...options,
  });
}

/**
 * Hook pour récupérer le détail d'un élève
 */
export function useStudentDetail(
  id: string,
  options?: Omit<UseQueryOptions<Student>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: studentsKeys.detail(id),
    queryFn: () => fetchStudentDetail(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
    ...options,
  });
}

/**
 * Hook pour récupérer les stats élèves
 */
export function useStudentsStats(
  options?: Omit<UseQueryOptions<StudentsStats>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: studentsKeys.stats(),
    queryFn: fetchStudentsStats,
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
}

/**
 * Hook pour créer un élève
 */
export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      // Invalider toutes les listes
      queryClient.invalidateQueries({ queryKey: studentsKeys.lists() });
      // Invalider les stats
      queryClient.invalidateQueries({ queryKey: studentsKeys.stats() });
    },
  });
}

/**
 * Hook pour mettre à jour un élève
 */
export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudent,
    onMutate: async (input) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: studentsKeys.detail(input.id),
      });

      // Snapshot previous value
      const previousStudent = queryClient.getQueryData<Student>(
        studentsKeys.detail(input.id)
      );

      // Optimistically update
      if (previousStudent) {
        queryClient.setQueryData<Student>(studentsKeys.detail(input.id), {
          ...previousStudent,
          ...input,
        });
      }

      return { previousStudent };
    },
    onError: (err, input, context) => {
      // Rollback on error
      if (context?.previousStudent) {
        queryClient.setQueryData(
          studentsKeys.detail(input.id),
          context.previousStudent
        );
      }
    },
    onSettled: (data, error, input) => {
      // Refetch after mutation
      queryClient.invalidateQueries({
        queryKey: studentsKeys.detail(input.id),
      });
      queryClient.invalidateQueries({ queryKey: studentsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: studentsKeys.stats() });
    },
  });
}

/**
 * Hook pour supprimer un élève
 */
export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: studentsKeys.stats() });
    },
  });
}

/**
 * Hook combiné pour toutes les opérations students
 */
export function useStudentsQuery() {
  return {
    // Queries
    useList: useStudentsList,
    useDetail: useStudentDetail,
    useStats: useStudentsStats,

    // Mutations
    useCreate: useCreateStudent,
    useUpdate: useUpdateStudent,
    useDelete: useDeleteStudent,

    // Query keys (pour invalidation manuelle)
    keys: studentsKeys,
  };
}
