/**
 * VIAMENTOR - Use Instructor Students Query
 * Hook TanStack Query pour gestion données serveur élèves assignés moniteur
 *
 * Responsabilités:
 * - Queries: liste élèves, détail élève, progression
 * - Mutations: assigner élève, mettre à jour progression, notes
 * - Cache management avec invalidation automatique
 * - Optimistic updates
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useInstructorStudentsStore } from "@/polymet/data/viamentor-instructor-students-store";

// ============================================================================
// TYPES
// ============================================================================

export interface InstructorStudent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: string;
  status: string;
  progressionLevel: "beginner" | "intermediate" | "advanced" | "exam-ready";
  totalHours: number;
  completedLessons: number;
  nextLessonDate: string | null;
  lastEvaluationDate: string | null;
  needsEvaluation: boolean;
  instructorNotes: string;
  strengths: string[];
  weaknesses: string[];
}

export interface StudentProgression {
  studentId: string;
  totalHours: number;
  completedLessons: number;
  skills: Record<string, number>;
  milestones: {
    id: string;
    name: string;
    completed: boolean;
    date: string | null;
  }[];
  readinessScore: number;
}

export interface UpdateProgressionInput {
  studentId: string;
  skills?: Record<string, number>;
  milestones?: string[];
  notes?: string;
}

export interface UpdateNotesInput {
  studentId: string;
  notes: string;
  strengths?: string[];
  weaknesses?: string[];
}

// ============================================================================
// QUERY KEYS
// ============================================================================

export const instructorStudentsKeys = {
  all: ["instructor-students"] as const,
  lists: () => [...instructorStudentsKeys.all, "list"] as const,
  list: (filters: any) => [...instructorStudentsKeys.lists(), filters] as const,
  details: () => [...instructorStudentsKeys.all, "detail"] as const,
  detail: (id: string) => [...instructorStudentsKeys.details(), id] as const,
  progression: (id: string) =>
    [...instructorStudentsKeys.all, "progression", id] as const,
};

// ============================================================================
// API SIMULATION
// ============================================================================

const mockStudents: InstructorStudent[] = [
  {
    id: "student-1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    phone: "+41 79 123 45 67",
    category: "B",
    status: "active",
    progressionLevel: "intermediate",
    totalHours: 15.5,
    completedLessons: 10,
    nextLessonDate: "2025-01-15",
    lastEvaluationDate: "2025-01-10",
    needsEvaluation: false,
    instructorNotes: "Bon élève, progresse bien",
    strengths: ["Stationnement", "Circulation"],
    weaknesses: ["Autoroute"],
  },
  {
    id: "student-2",
    firstName: "Marie",
    lastName: "Martin",
    email: "marie.martin@example.com",
    phone: "+41 79 234 56 78",
    category: "B",
    status: "active",
    progressionLevel: "beginner",
    totalHours: 8.0,
    completedLessons: 5,
    nextLessonDate: "2025-01-16",
    lastEvaluationDate: null,
    needsEvaluation: true,
    instructorNotes: "Débutante, besoin de plus de pratique",
    strengths: ["Attention"],
    weaknesses: ["Confiance", "Vitesse"],
  },
];

const api = {
  getStudents: async (filters: any): Promise<InstructorStudent[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let filtered = [...mockStudents];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.firstName.toLowerCase().includes(search) ||
          s.lastName.toLowerCase().includes(search)
      );
    }

    if (filters.category?.length > 0) {
      filtered = filtered.filter((s) => filters.category.includes(s.category));
    }

    if (filters.progressionLevel?.length > 0) {
      filtered = filtered.filter((s) =>
        filters.progressionLevel.includes(s.progressionLevel)
      );
    }

    if (filters.needsEvaluation !== null) {
      filtered = filtered.filter(
        (s) => s.needsEvaluation === filters.needsEvaluation
      );
    }

    return filtered;
  },

  getStudentDetail: async (id: string): Promise<InstructorStudent> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const student = mockStudents.find((s) => s.id === id);
    if (!student) throw new Error("Student not found");
    return student;
  },

  getStudentProgression: async (id: string): Promise<StudentProgression> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      studentId: id,
      totalHours: 15.5,
      completedLessons: 10,
      skills: {
        parking: 7,
        highway: 5,
        city: 8,
        night: 6,
      },
      milestones: [
        {
          id: "m1",
          name: "Première leçon",
          completed: true,
          date: "2024-12-01",
        },
        {
          id: "m2",
          name: "Circulation en ville",
          completed: true,
          date: "2024-12-15",
        },
        { id: "m3", name: "Autoroute", completed: false, date: null },
      ],

      readinessScore: 65,
    };
  },

  updateProgression: async (
    input: UpdateProgressionInput
  ): Promise<StudentProgression> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return api.getStudentProgression(input.studentId);
  },

  updateNotes: async (input: UpdateNotesInput): Promise<InstructorStudent> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const index = mockStudents.findIndex((s) => s.id === input.studentId);
    if (index === -1) throw new Error("Student not found");
    mockStudents[index].instructorNotes = input.notes;
    if (input.strengths) mockStudents[index].strengths = input.strengths;
    if (input.weaknesses) mockStudents[index].weaknesses = input.weaknesses;
    return mockStudents[index];
  },
};

// ============================================================================
// QUERIES
// ============================================================================

/**
 * Hook pour récupérer la liste des élèves avec filtres
 * Utilise automatiquement les filtres du store Zustand
 */
export function useInstructorStudentsList() {
  const filters = useInstructorStudentsStore((state) => state.filters);

  return useQuery({
    queryKey: instructorStudentsKeys.list(filters),
    queryFn: () => api.getStudents(filters),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook pour récupérer le détail d'un élève
 */
export function useInstructorStudentDetail(id: string) {
  return useQuery({
    queryKey: instructorStudentsKeys.detail(id),
    queryFn: () => api.getStudentDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook pour récupérer la progression d'un élève
 */
export function useStudentProgression(id: string) {
  return useQuery({
    queryKey: instructorStudentsKeys.progression(id),
    queryFn: () => api.getStudentProgression(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// ============================================================================
// MUTATIONS
// ============================================================================

/**
 * Hook pour mettre à jour la progression d'un élève
 */
export function useUpdateProgression() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateProgressionInput) => api.updateProgression(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: instructorStudentsKeys.progression(data.studentId),
      });
      queryClient.invalidateQueries({
        queryKey: instructorStudentsKeys.detail(data.studentId),
      });
      queryClient.invalidateQueries({
        queryKey: instructorStudentsKeys.lists(),
      });
    },
  });
}

/**
 * Hook pour mettre à jour les notes moniteur avec optimistic update
 */
export function useUpdateStudentNotes() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateNotesInput) => api.updateNotes(input),
    onMutate: async (input) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: instructorStudentsKeys.detail(input.studentId),
      });

      // Snapshot previous value
      const previousStudent = queryClient.getQueryData(
        instructorStudentsKeys.detail(input.studentId)
      );

      // Optimistically update
      queryClient.setQueryData(
        instructorStudentsKeys.detail(input.studentId),
        (old: any) => ({
          ...old,
          instructorNotes: input.notes,
          strengths: input.strengths || old.strengths,
          weaknesses: input.weaknesses || old.weaknesses,
        })
      );

      return { previousStudent };
    },
    onError: (err, input, context) => {
      // Rollback on error
      if (context?.previousStudent) {
        queryClient.setQueryData(
          instructorStudentsKeys.detail(input.studentId),
          context.previousStudent
        );
      }
    },
    onSettled: (data, error, input) => {
      // Refetch after mutation
      queryClient.invalidateQueries({
        queryKey: instructorStudentsKeys.detail(input.studentId),
      });
    },
  });
}
