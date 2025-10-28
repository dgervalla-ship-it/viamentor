/**
 * VIAMENTOR - Instructor Students Store
 * Store Zustand pour gestion état UI élèves assignés moniteur
 *
 * Responsabilités:
 * - Filtres élèves (recherche, catégorie, progression)
 * - Vue active (grid/list/progression)
 * - Sélections multiples élèves
 * - Tri et ordre
 * - État modals/dialogs
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// TYPES
// ============================================================================

export type StudentView = "grid" | "list" | "progression";
export type ProgressionLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "exam-ready";
export type StudentCategory = "B" | "A" | "A1" | "C" | "D";

export interface StudentsFilters {
  search: string;
  category: StudentCategory[];
  progressionLevel: ProgressionLevel[];
  hasUpcomingLesson: boolean | null;
  needsEvaluation: boolean | null;
}

export type SortField = "name" | "progression" | "nextLesson" | "totalHours";
export type SortOrder = "asc" | "desc";

export interface InstructorStudentsUIState {
  // Vue active
  view: StudentView;

  // Filtres
  filters: StudentsFilters;

  // Tri
  sortField: SortField;
  sortOrder: SortOrder;

  // Sélections
  selectedStudentIds: string[];

  // État modals
  isProgressionModalOpen: boolean;
  isEvaluationModalOpen: boolean;
  isNotesModalOpen: boolean;
  selectedStudentForAction: string | null;

  // Actions
  setView: (view: StudentView) => void;
  setSearch: (search: string) => void;
  setCategoryFilter: (category: StudentCategory[]) => void;
  setProgressionFilter: (level: ProgressionLevel[]) => void;
  setHasUpcomingLesson: (has: boolean | null) => void;
  setNeedsEvaluation: (needs: boolean | null) => void;
  clearFilters: () => void;

  setSortField: (field: SortField) => void;
  setSortOrder: (order: SortOrder) => void;
  toggleSort: (field: SortField) => void;

  toggleStudentSelection: (studentId: string) => void;
  selectAllStudents: (studentIds: string[]) => void;
  clearSelection: () => void;

  openProgressionModal: (studentId: string) => void;
  closeProgressionModal: () => void;
  openEvaluationModal: (studentId: string) => void;
  closeEvaluationModal: () => void;
  openNotesModal: (studentId: string) => void;
  closeNotesModal: () => void;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialFilters: StudentsFilters = {
  search: "",
  category: [],
  progressionLevel: [],
  hasUpcomingLesson: null,
  needsEvaluation: null,
};

// ============================================================================
// STORE
// ============================================================================

export const useInstructorStudentsStore = create<InstructorStudentsUIState>()(
  persist(
    (set) => ({
      // État initial
      view: "grid",
      filters: initialFilters,
      sortField: "name",
      sortOrder: "asc",
      selectedStudentIds: [],
      isProgressionModalOpen: false,
      isEvaluationModalOpen: false,
      isNotesModalOpen: false,
      selectedStudentForAction: null,

      // Actions Vue
      setView: (view) => set({ view }),

      // Actions Filtres
      setSearch: (search) =>
        set((state) => ({
          filters: { ...state.filters, search },
        })),

      setCategoryFilter: (category) =>
        set((state) => ({
          filters: { ...state.filters, category },
        })),

      setProgressionFilter: (progressionLevel) =>
        set((state) => ({
          filters: { ...state.filters, progressionLevel },
        })),

      setHasUpcomingLesson: (hasUpcomingLesson) =>
        set((state) => ({
          filters: { ...state.filters, hasUpcomingLesson },
        })),

      setNeedsEvaluation: (needsEvaluation) =>
        set((state) => ({
          filters: { ...state.filters, needsEvaluation },
        })),

      clearFilters: () => set({ filters: initialFilters }),

      // Actions Tri
      setSortField: (sortField) => set({ sortField }),
      setSortOrder: (sortOrder) => set({ sortOrder }),

      toggleSort: (field) =>
        set((state) => ({
          sortField: field,
          sortOrder:
            state.sortField === field && state.sortOrder === "asc"
              ? "desc"
              : "asc",
        })),

      // Actions Sélection
      toggleStudentSelection: (studentId) =>
        set((state) => ({
          selectedStudentIds: state.selectedStudentIds.includes(studentId)
            ? state.selectedStudentIds.filter((id) => id !== studentId)
            : [...state.selectedStudentIds, studentId],
        })),

      selectAllStudents: (studentIds) =>
        set({ selectedStudentIds: studentIds }),

      clearSelection: () => set({ selectedStudentIds: [] }),

      // Actions Modals
      openProgressionModal: (studentId) =>
        set({
          isProgressionModalOpen: true,
          selectedStudentForAction: studentId,
        }),

      closeProgressionModal: () =>
        set({
          isProgressionModalOpen: false,
          selectedStudentForAction: null,
        }),

      openEvaluationModal: (studentId) =>
        set({
          isEvaluationModalOpen: true,
          selectedStudentForAction: studentId,
        }),

      closeEvaluationModal: () =>
        set({
          isEvaluationModalOpen: false,
          selectedStudentForAction: null,
        }),

      openNotesModal: (studentId) =>
        set({
          isNotesModalOpen: true,
          selectedStudentForAction: studentId,
        }),

      closeNotesModal: () =>
        set({
          isNotesModalOpen: false,
          selectedStudentForAction: null,
        }),
    }),
    {
      name: "viamentor-instructor-students-ui",
      partialize: (state) => ({
        view: state.view,
        sortField: state.sortField,
        sortOrder: state.sortOrder,
      }),
    }
  )
);
