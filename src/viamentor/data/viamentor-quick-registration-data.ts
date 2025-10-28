/**
 * VIAMENTOR - Quick Registration Data
 * Mock data inscription rapide secrétariat
 */

// ============================================================================
// TYPES
// ============================================================================

export type LicenseCategory = "B" | "A" | "BE" | "A1" | "BPT";
export type PaymentMethod = "cash" | "card" | "transfer" | "twint" | "invoice";
export type RegistrationStatus = "active" | "pending" | "inactive";

export interface Package {
  id: string;
  name: string;
  lessonCount: number;
  price: number;
  unitPrice: number;
  savings: number;
  popular?: boolean;
}

export interface InstructorOption {
  id: string;
  name: string;
  avatar: string;
  categories: LicenseCategory[];
  rating: number;
  availability: "high" | "medium" | "low";
}

export interface RecentRegistration {
  id: string;
  date: Date;
  student: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  categories: LicenseCategory[];
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  package?: {
    id: string;
    name: string;
  };
  status: RegistrationStatus;
}

export interface RegistrationStats {
  monthRegistrations: number;
  conversionRate: number;
  activeStudents: number;
}

// ============================================================================
// MOCK DATA - PACKAGES
// ============================================================================

export const mockPackages: Package[] = [
  {
    id: "discovery",
    name: "Forfait découverte",
    lessonCount: 5,
    price: 450,
    unitPrice: 100,
    savings: 50,
  },
  {
    id: "standard",
    name: "Pack standard",
    lessonCount: 10,
    price: 900,
    unitPrice: 100,
    savings: 100,
    popular: true,
  },
  {
    id: "intensive",
    name: "Pack intensif",
    lessonCount: 20,
    price: 1700,
    unitPrice: 100,
    savings: 300,
  },
];

// ============================================================================
// MOCK DATA - INSTRUCTORS
// ============================================================================

export const mockInstructors: InstructorOption[] = [
  {
    id: "1",
    name: "Marc Dubois",
    avatar: "https://github.com/yusufhilmi.png",
    categories: ["B", "BE"],
    rating: 4.8,
    availability: "high",
  },
  {
    id: "2",
    name: "Sophie Martin",
    avatar: "https://github.com/kdrnp.png",
    categories: ["B", "A", "A1"],
    rating: 4.9,
    availability: "medium",
  },
  {
    id: "3",
    name: "Pierre Blanc",
    avatar: "https://github.com/yahyabedirhan.png",
    categories: ["B", "BPT"],
    rating: 4.7,
    availability: "high",
  },
];

// ============================================================================
// MOCK DATA - RECENT REGISTRATIONS
// ============================================================================

export const mockRecentRegistrations: RecentRegistration[] = [
  {
    id: "1",
    date: new Date("2024-01-15T10:30:00"),
    student: {
      id: "s1",
      firstName: "Lucas",
      lastName: "Dubois",
      avatar: "https://github.com/denizbuyuktas.png",
    },
    categories: ["B"],
    instructor: {
      id: "1",
      name: "Marc Dubois",
      avatar: "https://github.com/yusufhilmi.png",
    },
    package: {
      id: "standard",
      name: "Pack standard - 10 leçons",
    },
    status: "active",
  },
  {
    id: "2",
    date: new Date("2024-01-14T14:20:00"),
    student: {
      id: "s2",
      firstName: "Emma",
      lastName: "Martin",
      avatar: "https://github.com/shoaibux1.png",
    },
    categories: ["B", "BE"],
    instructor: {
      id: "1",
      name: "Marc Dubois",
      avatar: "https://github.com/yusufhilmi.png",
    },
    status: "pending",
  },
  {
    id: "3",
    date: new Date("2024-01-13T09:15:00"),
    student: {
      id: "s3",
      firstName: "Noah",
      lastName: "Blanc",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    categories: ["A"],
    instructor: {
      id: "2",
      name: "Sophie Martin",
      avatar: "https://github.com/kdrnp.png",
    },
    package: {
      id: "discovery",
      name: "Forfait découverte - 5 leçons",
    },
    status: "active",
  },
];

// ============================================================================
// MOCK DATA - STATS
// ============================================================================

export const mockRegistrationStats: RegistrationStats = {
  monthRegistrations: 24,
  conversionRate: 68,
  activeStudents: 156,
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Obtient les moniteurs disponibles pour une catégorie
 */
export function getAvailableInstructors(
  category: LicenseCategory
): InstructorOption[] {
  return mockInstructors.filter((instructor) =>
    instructor.categories.includes(category)
  );
}

/**
 * Calcule le prix total avec forfait
 */
export function calculateTotalPrice(packageId?: string): number {
  if (!packageId) return 0;
  const pkg = mockPackages.find((p) => p.id === packageId);
  return pkg?.price || 0;
}

/**
 * Formate le statut d'inscription
 */
export function formatRegistrationStatus(
  status: RegistrationStatus,
  locale: "fr" | "de" | "it" | "en" = "fr"
): string {
  const translations = {
    fr: {
      active: "Actif",
      pending: "Attente documents",
      inactive: "Inactif",
    },
    de: {
      active: "Aktiv",
      pending: "Dokumente ausstehend",
      inactive: "Inaktiv",
    },
    it: {
      active: "Attivo",
      pending: "Attesa documenti",
      inactive: "Inattivo",
    },
    en: {
      active: "Active",
      pending: "Pending documents",
      inactive: "Inactive",
    },
  };

  return translations[locale][status];
}
