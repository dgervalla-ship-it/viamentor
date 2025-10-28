/**
 * VIAMENTOR - Instructor Lessons Store
 * Store Zustand pour gestion état UI leçons moniteur
 *
 * Responsabilités:
 * - Filtres leçons (date, élève, statut, catégorie)
 * - Vue active (calendar/list/timeline)
 * - Sélections multiples leçons
 * - Préférences affichage
 * - État modals/dialogs
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ============================================================================
// TYPES
// ============================================================================

export type LessonView = "calendar" | "list" | "timeline";
export type LessonStatus = "scheduled" | "completed" | "cancelled" | "no-show";
export type LessonCategory = "B" | "A" | "A1" | "C" | "D";

export interface LessonsFilters {
  search: string;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  studentId: string | null;
  status: LessonStatus[];
  category: LessonCategory[];
  vehicleId: string | null;
}

export interface LessonsUIState {
  // Vue active
  view: LessonView;

  // Filtres
  filters: LessonsFilters;

  // Sélections
  selectedLessonIds: string[];

  // Préférences affichage
  showWeekends: boolean;
  showCancelled: boolean;
  groupByStudent: boolean;

  // État modals
  isBookingModalOpen: boolean;
  isEvaluationModalOpen: boolean;
  isRescheduleModalOpen: boolean;
  selectedLessonForAction: string | null;

  // Actions
  setView: (view: LessonView) => void;
  setSearch: (search: string) => void;
  setDateRange: (start: Date | null, end: Date | null) => void;
  setStudentFilter: (studentId: string | null) => void;
  setStatusFilter: (status: LessonStatus[]) => void;
  setCategoryFilter: (category: LessonCategory[]) => void;
  setVehicleFilter: (vehicleId: string | null) => void;
  clearFilters: () => void;

  toggleLessonSelection: (lessonId: string) => void;
  selectAllLessons: (lessonIds: string[]) => void;
  clearSelection: () => void;

  setShowWeekends: (show: boolean) => void;
  setShowCancelled: (show: boolean) => void;
  setGroupByStudent: (group: boolean) => void;

  openBookingModal: () => void;
  closeBookingModal: () => void;
  openEvaluationModal: (lessonId: string) => void;
  closeEvaluationModal: () => void;
  openRescheduleModal: (lessonId: string) => void;
  closeRescheduleModal: () => void;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialFilters: LessonsFilters = {
  search: "",
  dateRange: {
    start: null,
    end: null,
  },
  studentId: null,
  status: [],
  category: [],
  vehicleId: null,
};

// ============================================================================
// STORE
// ============================================================================

export const useInstructorLessonsStore = create<LessonsUIState>()(
  persist(
    (set) => ({
      // État initial
      view: "calendar",
      filters: initialFilters,
      selectedLessonIds: [],
      showWeekends: true,
      showCancelled: false,
      groupByStudent: false,
      isBookingModalOpen: false,
      isEvaluationModalOpen: false,
      isRescheduleModalOpen: false,
      selectedLessonForAction: null,

      // Actions Vue
      setView: (view) => set({ view }),

      // Actions Filtres
      setSearch: (search) =>
        set((state) => ({
          filters: { ...state.filters, search },
        })),

      setDateRange: (start, end) =>
        set((state) => ({
          filters: {
            ...state.filters,
            dateRange: { start, end },
          },
        })),

      setStudentFilter: (studentId) =>
        set((state) => ({
          filters: { ...state.filters, studentId },
        })),

      setStatusFilter: (status) =>
        set((state) => ({
          filters: { ...state.filters, status },
        })),

      setCategoryFilter: (category) =>
        set((state) => ({
          filters: { ...state.filters, category },
        })),

      setVehicleFilter: (vehicleId) =>
        set((state) => ({
          filters: { ...state.filters, vehicleId },
        })),

      clearFilters: () => set({ filters: initialFilters }),

      // Actions Sélection
      toggleLessonSelection: (lessonId) =>
        set((state) => ({
          selectedLessonIds: state.selectedLessonIds.includes(lessonId)
            ? state.selectedLessonIds.filter((id) => id !== lessonId)
            : [...state.selectedLessonIds, lessonId],
        })),

      selectAllLessons: (lessonIds) => set({ selectedLessonIds: lessonIds }),

      clearSelection: () => set({ selectedLessonIds: [] }),

      // Actions Préférences
      setShowWeekends: (show) => set({ showWeekends: show }),
      setShowCancelled: (show) => set({ showCancelled: show }),
      setGroupByStudent: (group) => set({ groupByStudent: group }),

      // Actions Modals
      openBookingModal: () => set({ isBookingModalOpen: true }),

      closeBookingModal: () => set({ isBookingModalOpen: false }),

      openEvaluationModal: (lessonId) =>
        set({
          isEvaluationModalOpen: true,
          selectedLessonForAction: lessonId,
        }),

      closeEvaluationModal: () =>
        set({
          isEvaluationModalOpen: false,
          selectedLessonForAction: null,
        }),

      openRescheduleModal: (lessonId) =>
        set({
          isRescheduleModalOpen: true,
          selectedLessonForAction: lessonId,
        }),

      closeRescheduleModal: () =>
        set({
          isRescheduleModalOpen: false,
          selectedLessonForAction: null,
        }),
    }),
    {
      name: "viamentor-instructor-lessons-ui",
      partialize: (state) => ({
        view: state.view,
        showWeekends: state.showWeekends,
        showCancelled: state.showCancelled,
        groupByStudent: state.groupByStudent,
      }),
    }
  )
);
