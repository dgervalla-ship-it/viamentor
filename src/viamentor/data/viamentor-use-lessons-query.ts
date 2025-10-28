/**
 * VIAMENTOR - Use Lessons Query
 * Hook TanStack Query pour gestion données serveur leçons
 *
 * Responsabilités:
 * - Queries: liste leçons, détail leçon, stats
 * - Mutations: créer, modifier, annuler, compléter leçon
 * - Cache management avec invalidation automatique
 * - Optimistic updates
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useInstructorLessonsStore } from "@/viamentor/data/viamentor-instructor-lessons-store";

// ============================================================================
// TYPES
// ============================================================================

export interface Lesson {
  id: string;
  date: string;
  time: string;
  duration: number;
  studentId: string;
  studentName: string;
  instructorId: string;
  vehicleId: string;
  category: string;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  location: string;
  notes?: string;
  evaluation?: {
    rating: number;
    skills: Record<string, number>;
    comments: string;
  };
}

export interface LessonsStats {
  total: number;
  scheduled: number;
  completed: number;
  cancelled: number;
  noShow: number;
  totalHours: number;
  completionRate: number;
}

export interface CreateLessonInput {
  date: string;
  time: string;
  duration: number;
  studentId: string;
  vehicleId: string;
  category: string;
  location: string;
  notes?: string;
}

export interface UpdateLessonInput {
  id: string;
  date?: string;
  time?: string;
  duration?: number;
  vehicleId?: string;
  location?: string;
  notes?: string;
}

export interface CompleteLessonInput {
  id: string;
  evaluation: {
    rating: number;
    skills: Record<string, number>;
    comments: string;
  };
}

// ============================================================================
// QUERY KEYS
// ============================================================================

export const lessonsKeys = {
  all: ["lessons"] as const,
  lists: () => [...lessonsKeys.all, "list"] as const,
  list: (filters: any) => [...lessonsKeys.lists(), filters] as const,
  details: () => [...lessonsKeys.all, "detail"] as const,
  detail: (id: string) => [...lessonsKeys.details(), id] as const,
  stats: () => [...lessonsKeys.all, "stats"] as const,
};

// ============================================================================
// API SIMULATION
// ============================================================================

const mockLessons: Lesson[] = [
  {
    id: "lesson-1",
    date: "2025-01-15",
    time: "09:00",
    duration: 90,
    studentId: "student-1",
    studentName: "Jean Dupont",
    instructorId: "instructor-1",
    vehicleId: "vehicle-1",
    category: "B",
    status: "scheduled",
    location: "Lausanne Centre",
  },
  {
    id: "lesson-2",
    date: "2025-01-15",
    time: "11:00",
    duration: 90,
    studentId: "student-2",
    studentName: "Marie Martin",
    instructorId: "instructor-1",
    vehicleId: "vehicle-1",
    category: "B",
    status: "scheduled",
    location: "Lausanne Gare",
  },
];

const api = {
  getLessons: async (filters: any): Promise<Lesson[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let filtered = [...mockLessons];

    if (filters.search) {
      filtered = filtered.filter((l) =>
        l.studentName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status?.length > 0) {
      filtered = filtered.filter((l) => filters.status.includes(l.status));
    }

    if (filters.studentId) {
      filtered = filtered.filter((l) => l.studentId === filters.studentId);
    }

    return filtered;
  },

  getLessonDetail: async (id: string): Promise<Lesson> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const lesson = mockLessons.find((l) => l.id === id);
    if (!lesson) throw new Error("Lesson not found");
    return lesson;
  },

  getLessonsStats: async (): Promise<LessonsStats> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      total: mockLessons.length,
      scheduled: mockLessons.filter((l) => l.status === "scheduled").length,
      completed: mockLessons.filter((l) => l.status === "completed").length,
      cancelled: mockLessons.filter((l) => l.status === "cancelled").length,
      noShow: mockLessons.filter((l) => l.status === "no-show").length,
      totalHours: mockLessons.reduce((sum, l) => sum + l.duration / 60, 0),
      completionRate: 0.85,
    };
  },

  createLesson: async (input: CreateLessonInput): Promise<Lesson> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      ...input,
      studentName: "Nouvel Élève",
      instructorId: "instructor-1",
      status: "scheduled",
    };
    mockLessons.push(newLesson);
    return newLesson;
  },

  updateLesson: async (input: UpdateLessonInput): Promise<Lesson> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockLessons.findIndex((l) => l.id === input.id);
    if (index === -1) throw new Error("Lesson not found");
    mockLessons[index] = { ...mockLessons[index], ...input };
    return mockLessons[index];
  },

  cancelLesson: async (id: string): Promise<Lesson> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockLessons.findIndex((l) => l.id === id);
    if (index === -1) throw new Error("Lesson not found");
    mockLessons[index].status = "cancelled";
    return mockLessons[index];
  },

  completeLesson: async (input: CompleteLessonInput): Promise<Lesson> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockLessons.findIndex((l) => l.id === input.id);
    if (index === -1) throw new Error("Lesson not found");
    mockLessons[index].status = "completed";
    mockLessons[index].evaluation = input.evaluation;
    return mockLessons[index];
  },
};

// ============================================================================
// QUERIES
// ============================================================================

/**
 * Hook pour récupérer la liste des leçons avec filtres
 * Utilise automatiquement les filtres du store Zustand
 */
export function useLessonsList() {
  const filters = useInstructorLessonsStore((state) => state.filters);

  return useQuery({
    queryKey: lessonsKeys.list(filters),
    queryFn: () => api.getLessons(filters),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook pour récupérer le détail d'une leçon
 */
export function useLessonDetail(id: string) {
  return useQuery({
    queryKey: lessonsKeys.detail(id),
    queryFn: () => api.getLessonDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook pour récupérer les statistiques des leçons
 */
export function useLessonsStats() {
  return useQuery({
    queryKey: lessonsKeys.stats(),
    queryFn: () => api.getLessonsStats(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// ============================================================================
// MUTATIONS
// ============================================================================

/**
 * Hook pour créer une nouvelle leçon
 */
export function useCreateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateLessonInput) => api.createLesson(input),
    onSuccess: () => {
      // Invalider toutes les listes de leçons
      queryClient.invalidateQueries({ queryKey: lessonsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: lessonsKeys.stats() });
    },
  });
}

/**
 * Hook pour modifier une leçon avec optimistic update
 */
export function useUpdateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateLessonInput) => api.updateLesson(input),
    onMutate: async (input) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: lessonsKeys.detail(input.id),
      });

      // Snapshot previous value
      const previousLesson = queryClient.getQueryData(
        lessonsKeys.detail(input.id)
      );

      // Optimistically update
      queryClient.setQueryData(lessonsKeys.detail(input.id), (old: any) => ({
        ...old,
        ...input,
      }));

      return { previousLesson };
    },
    onError: (err, input, context) => {
      // Rollback on error
      if (context?.previousLesson) {
        queryClient.setQueryData(
          lessonsKeys.detail(input.id),
          context.previousLesson
        );
      }
    },
    onSettled: (data, error, input) => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: lessonsKeys.detail(input.id) });
      queryClient.invalidateQueries({ queryKey: lessonsKeys.lists() });
    },
  });
}

/**
 * Hook pour annuler une leçon
 */
export function useCancelLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.cancelLesson(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: lessonsKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: lessonsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: lessonsKeys.stats() });
    },
  });
}

/**
 * Hook pour compléter une leçon avec évaluation
 */
export function useCompleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CompleteLessonInput) => api.completeLesson(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: lessonsKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: lessonsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: lessonsKeys.stats() });
    },
  });
}
