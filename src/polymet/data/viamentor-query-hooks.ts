/**
 * VIAMENTOR Query Hooks
 *
 * Hooks TanStack Query v5 pour data fetching
 * - Students queries
 * - Lessons queries
 * - Invoices queries
 * - Mutations avec optimistic updates
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRole } from "@/polymet/data/viamentor-roles";

/**
 * Types de données
 */
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentNumber: string;
  licenseCategory: "A" | "B" | "C" | "D";
  instructorId: string;
  status: "active" | "inactive" | "graduated";
  enrollmentDate: string;
  avatar?: string;
}

export interface Lesson {
  id: string;
  studentId: string;
  instructorId: string;
  date: string;
  startTime: string;
  duration: number;
  type: "theory" | "practice" | "exam";
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

export interface Invoice {
  id: string;
  studentId: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: "pending" | "paid" | "overdue" | "cancelled";
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  createdAt: string;
}

/**
 * Mock API functions (à remplacer par vraies API calls)
 */
const mockStudents: Student[] = [
  {
    id: "student-1",
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@example.ch",
    phone: "+41791234567",
    studentNumber: "STU-2024-001",
    licenseCategory: "B",
    instructorId: "instructor-1",
    status: "active",
    enrollmentDate: "2024-01-15",
    avatar: "https://github.com/kdrnp.png",
  },
  {
    id: "student-2",
    firstName: "Lucas",
    lastName: "Müller",
    email: "lucas.mueller@example.ch",
    phone: "+41797654321",
    studentNumber: "STU-2024-002",
    licenseCategory: "A",
    instructorId: "instructor-1",
    status: "active",
    enrollmentDate: "2024-02-20",
    avatar: "https://github.com/denizbuyuktas.png",
  },
];

const mockLessons: Lesson[] = [
  {
    id: "lesson-1",
    studentId: "student-1",
    instructorId: "instructor-1",
    date: "2024-03-15",
    startTime: "14:00",
    duration: 90,
    type: "practice",
    status: "scheduled",
    notes: "Parking et manœuvres",
  },
];

const mockInvoices: Invoice[] = [
  {
    id: "invoice-1",
    studentId: "student-1",
    amount: 450.0,
    currency: "CHF",
    dueDate: "2024-04-15",
    status: "pending",
    items: [
      {
        description: "Leçon de conduite (90 min)",
        quantity: 3,
        unitPrice: 150.0,
      },
    ],

    createdAt: "2024-03-01",
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchStudents = async (): Promise<Student[]> => {
  await delay(800);
  return mockStudents;
};

const fetchStudent = async (id: string): Promise<Student> => {
  await delay(500);
  const student = mockStudents.find((s) => s.id === id);
  if (!student) throw new Error("Student not found");
  return student;
};

const fetchLessons = async (studentId?: string): Promise<Lesson[]> => {
  await delay(600);
  return studentId
    ? mockLessons.filter((l) => l.studentId === studentId)
    : mockLessons;
};

const fetchInvoices = async (studentId?: string): Promise<Invoice[]> => {
  await delay(700);
  return studentId
    ? mockInvoices.filter((i) => i.studentId === studentId)
    : mockInvoices;
};

/**
 * Query Keys (centralisés pour invalidation)
 */
export const queryKeys = {
  students: {
    all: ["students"] as const,
    detail: (id: string) => ["students", id] as const,
  },
  lessons: {
    all: ["lessons"] as const,
    byStudent: (studentId: string) =>
      ["lessons", "student", studentId] as const,
  },
  invoices: {
    all: ["invoices"] as const,
    byStudent: (studentId: string) =>
      ["invoices", "student", studentId] as const,
  },
};

/**
 * Hook pour récupérer tous les étudiants
 */
export function useStudents() {
  return useQuery({
    queryKey: queryKeys.students.all,
    queryFn: fetchStudents,
  });
}

/**
 * Hook pour récupérer un étudiant par ID
 */
export function useStudent(id: string) {
  return useQuery({
    queryKey: queryKeys.students.detail(id),
    queryFn: () => fetchStudent(id),
    enabled: !!id,
  });
}

/**
 * Hook pour récupérer les leçons
 */
export function useLessons(studentId?: string) {
  return useQuery({
    queryKey: studentId
      ? queryKeys.lessons.byStudent(studentId)
      : queryKeys.lessons.all,
    queryFn: () => fetchLessons(studentId),
  });
}

/**
 * Hook pour récupérer les factures
 */
export function useInvoices(studentId?: string) {
  return useQuery({
    queryKey: studentId
      ? queryKeys.invoices.byStudent(studentId)
      : queryKeys.invoices.all,
    queryFn: () => fetchInvoices(studentId),
  });
}

/**
 * Mutation pour créer un étudiant
 */
export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newStudent: Omit<Student, "id">) => {
      await delay(1000);
      const student: Student = {
        ...newStudent,
        id: `student-${Date.now()}`,
      };
      mockStudents.push(student);
      return student;
    },
    onSuccess: () => {
      // Invalider le cache pour refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
    },
  });
}

/**
 * Mutation pour mettre à jour un étudiant
 */
export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Student>;
    }) => {
      await delay(800);
      const index = mockStudents.findIndex((s) => s.id === id);
      if (index === -1) throw new Error("Student not found");
      mockStudents[index] = { ...mockStudents[index], ...data };
      return mockStudents[index];
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.students.detail(id),
      });
    },
  });
}

/**
 * Mutation pour supprimer un étudiant
 */
export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await delay(500);
      const index = mockStudents.findIndex((s) => s.id === id);
      if (index === -1) throw new Error("Student not found");
      mockStudents.splice(index, 1);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.all });
    },
  });
}
