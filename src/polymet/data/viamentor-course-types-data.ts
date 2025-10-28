/**
 * VIAMENTOR Course Types Configuration Data
 *
 * Mock data et types pour configuration types cours collectifs
 * avec couleurs custom, capacités, récurrence, pré-requis
 */

// ============================================================================
// TYPES
// ============================================================================

export type CourseTypeCategory =
  | "theoretical"
  | "practical"
  | "awareness"
  | "first_aid"
  | "specialized"
  | "other";

export type LicenseCategory = "B" | "A" | "BE" | "A1" | "C" | "D";

export type WeekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type NotificationType =
  | "reminder_d1"
  | "confirmation"
  | "satisfaction_survey";

export interface CourseTypeSchedule {
  day: WeekDay;
  startTime: string; // HH:mm
  duration?: number; // hours override
}

export interface CourseType {
  id: string;
  name: string;
  description: string;
  category: CourseTypeCategory[];
  color: string; // hex
  icon?: string; // URL
  defaultDuration: number; // hours
  maxCapacity: number;
  minCapacity: number;
  price?: number; // CHF
  licenseCategories: LicenseCategory[];
  certificateIssued: boolean;
  active: boolean;
  authorizedInstructors?: string[]; // instructor IDs, empty = all
  prerequisites?: string[]; // course type IDs
  recurringSchedule?: CourseTypeSchedule[];
  autoRecurrence: boolean;
  notifications: NotificationType[];
  plannedCoursesCount: number;
  enrolledStudentsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseTypeStats {
  activeTypes: number;
  plannedCoursesThisMonth: number;
  totalEnrolledStudents: number;
}

export interface ColorPreset {
  name: string;
  hex: string;
  contrastRatio: number; // with white text
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const colorPresets: ColorPreset[] = [
  { name: "Bleu", hex: "#1E88E5", contrastRatio: 4.52 },
  { name: "Vert", hex: "#7CB342", contrastRatio: 4.61 },
  { name: "Rouge", hex: "#E53935", contrastRatio: 4.54 },
  { name: "Jaune", hex: "#FDB022", contrastRatio: 2.89 }, // Warning: insufficient
  { name: "Violet", hex: "#8E24AA", contrastRatio: 6.23 },
  { name: "Orange", hex: "#FF6F00", contrastRatio: 3.98 }, // Warning: insufficient
  { name: "Gris", hex: "#616161", contrastRatio: 5.74 },
];

export const mockCourseTypes: CourseType[] = [
  {
    id: "ct-1",
    name: "Cours de théorie de base",
    description:
      "Cours théorique obligatoire couvrant le code de la route, la signalisation et les règles de circulation selon l'OAC",
    category: ["theoretical"],
    color: "#1E88E5",
    defaultDuration: 8,
    maxCapacity: 20,
    minCapacity: 5,
    price: 150,
    licenseCategories: ["B", "A", "A1"],
    certificateIssued: true,
    active: true,
    authorizedInstructors: [],
    prerequisites: [],
    recurringSchedule: [
      { day: "monday", startTime: "18:00", duration: 4 },
      { day: "wednesday", startTime: "18:00", duration: 4 },
    ],

    autoRecurrence: true,
    notifications: ["reminder_d1", "confirmation", "satisfaction_survey"],
    plannedCoursesCount: 12,
    enrolledStudentsCount: 145,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-10"),
  },
  {
    id: "ct-2",
    name: "Cours de sensibilisation",
    description:
      "Cours obligatoire de 8 heures sur la perception des dangers et la conduite défensive",
    category: ["awareness"],
    color: "#E53935",
    defaultDuration: 8,
    maxCapacity: 12,
    minCapacity: 4,
    price: 280,
    licenseCategories: ["B"],
    certificateIssued: true,
    active: true,
    authorizedInstructors: ["inst-1", "inst-2"],
    prerequisites: ["ct-3"],
    recurringSchedule: [{ day: "saturday", startTime: "08:00", duration: 8 }],

    autoRecurrence: true,
    notifications: ["reminder_d1", "confirmation", "satisfaction_survey"],
    plannedCoursesCount: 8,
    enrolledStudentsCount: 67,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-08"),
  },
  {
    id: "ct-3",
    name: "Premiers secours",
    description:
      "Formation aux premiers secours obligatoire pour l'obtention du permis de conduire",
    category: ["first_aid"],
    color: "#7CB342",
    defaultDuration: 10,
    maxCapacity: 15,
    minCapacity: 6,
    price: 120,
    licenseCategories: ["B", "A", "BE", "A1"],
    certificateIssued: true,
    active: true,
    authorizedInstructors: [],
    prerequisites: [],
    recurringSchedule: [
      { day: "friday", startTime: "17:00", duration: 5 },
      { day: "saturday", startTime: "08:00", duration: 5 },
    ],

    autoRecurrence: true,
    notifications: ["reminder_d1", "confirmation"],
    plannedCoursesCount: 6,
    enrolledStudentsCount: 52,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-12-05"),
  },
  {
    id: "ct-4",
    name: "Conduite sur autoroute",
    description:
      "Cours spécialisé pour apprendre les techniques de conduite sur autoroute et voies rapides",
    category: ["specialized", "practical"],
    color: "#8E24AA",
    defaultDuration: 4,
    maxCapacity: 8,
    minCapacity: 3,
    price: 200,
    licenseCategories: ["B"],
    certificateIssued: false,
    active: true,
    authorizedInstructors: ["inst-1", "inst-3"],
    prerequisites: ["ct-1"],
    recurringSchedule: [{ day: "sunday", startTime: "09:00", duration: 4 }],

    autoRecurrence: false,
    notifications: ["reminder_d1", "confirmation"],
    plannedCoursesCount: 4,
    enrolledStudentsCount: 18,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-11-28"),
  },
  {
    id: "ct-5",
    name: "Éco-conduite",
    description:
      "Formation aux techniques de conduite économique et écologique",
    category: ["specialized"],
    color: "#7CB342",
    defaultDuration: 3,
    maxCapacity: 10,
    minCapacity: 4,
    price: 90,
    licenseCategories: ["B", "BE"],
    certificateIssued: true,
    active: false,
    authorizedInstructors: [],
    prerequisites: [],
    recurringSchedule: [],
    autoRecurrence: false,
    notifications: ["confirmation"],
    plannedCoursesCount: 0,
    enrolledStudentsCount: 0,
    createdAt: new Date("2024-03-05"),
    updatedAt: new Date("2024-10-15"),
  },
];

export const mockStats: CourseTypeStats = {
  activeTypes: 4,
  plannedCoursesThisMonth: 30,
  totalEnrolledStudents: 282,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getCategoryColor(category: CourseTypeCategory): string {
  const colors: Record<CourseTypeCategory, string> = {
    theoretical: "#1E88E5",
    practical: "#7CB342",
    awareness: "#E53935",
    first_aid: "#FF6F00",
    specialized: "#8E24AA",
    other: "#616161",
  };
  return colors[category];
}

export function calculateContrastRatio(hexColor: string): number {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16) / 255;
  const g = parseInt(hexColor.slice(3, 5), 16) / 255;
  const b = parseInt(hexColor.slice(5, 7), 16) / 255;

  // Calculate relative luminance
  const luminance = (c: number) => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  const L =
    0.2126 * luminance(r) + 0.7152 * luminance(g) + 0.0722 * luminance(b);

  // Contrast ratio with white (L = 1)
  return (1 + 0.05) / (L + 0.05);
}

export function isContrastSufficient(ratio: number): boolean {
  return ratio >= 4.5; // WCAG AA standard
}

export function detectCircularDependencies(
  courseTypeId: string,
  prerequisites: string[],
  allCourseTypes: CourseType[]
): boolean {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  function hasCycle(id: string): boolean {
    if (recursionStack.has(id)) return true;
    if (visited.has(id)) return false;

    visited.add(id);
    recursionStack.add(id);

    const courseType = allCourseTypes.find((ct) => ct.id === id);
    if (courseType?.prerequisites) {
      for (const prereqId of courseType.prerequisites) {
        if (hasCycle(prereqId)) return true;
      }
    }

    recursionStack.delete(id);
    return false;
  }

  // Check if adding these prerequisites would create a cycle
  for (const prereqId of prerequisites) {
    if (hasCycle(prereqId)) return true;
  }

  return false;
}

export function filterCourseTypes(
  courseTypes: CourseType[],
  filters: {
    search?: string;
    categories?: CourseTypeCategory[];
    activeOnly?: boolean;
  }
): CourseType[] {
  return courseTypes.filter((ct) => {
    if (filters.search) {
      const search = filters.search.toLowerCase();
      if (
        !ct.name.toLowerCase().includes(search) &&
        !ct.description.toLowerCase().includes(search)
      ) {
        return false;
      }
    }

    if (filters.categories && filters.categories.length > 0) {
      if (!ct.category.some((cat) => filters.categories!.includes(cat))) {
        return false;
      }
    }

    if (filters.activeOnly && !ct.active) {
      return false;
    }

    return true;
  });
}

export function sortCourseTypes(
  courseTypes: CourseType[],
  sortBy: "name" | "duration" | "capacity" | "price",
  order: "asc" | "desc" = "asc"
): CourseType[] {
  const sorted = [...courseTypes].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "duration":
        comparison = a.defaultDuration - b.defaultDuration;
        break;
      case "capacity":
        comparison = a.maxCapacity - b.maxCapacity;
        break;
      case "price":
        comparison = (a.price || 0) - (b.price || 0);
        break;
    }

    return order === "asc" ? comparison : -comparison;
  });

  return sorted;
}
