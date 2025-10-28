/**
 * VIAMENTOR Instructors Data
 *
 * Mock data pour module gestion moniteurs avec types complets
 */

// Types
export type LicenseCategory = "B" | "A" | "BE" | "A1" | "C" | "D";

export type InstructorStatus =
  | "Disponible"
  | "En leçon"
  | "Absent"
  | "En pause";

export type OMCoStatus = "Conforme" | "Attention" | "Non conforme";

export interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  status: InstructorStatus;
  categories: LicenseCategory[];
  lessonsToday: number;
  monthStats: {
    lessonsCount: number;
    totalHours: number;
    rating: number;
  };
  omcoStatus: OMCoStatus;
  omcoExpiryDate?: string;
  trainingDue: boolean;
  activeStudents: number;
  joinedDate: string;
  address?: {
    street: string;
    zip: string;
    city: string;
  };
}

export interface InstructorStats {
  total: number;
  available: number;
  inLesson: number;
  absent: number;
}

export interface FiltersState {
  search: string;
  categories: LicenseCategory[];
  availability: "all" | "available" | "in_lesson" | "absent";
  omcoStatus: OMCoStatus[];
  trainingDue: boolean;
}

// Mock Data
export const MOCK_INSTRUCTORS: Instructor[] = [
  {
    id: "inst-1",
    firstName: "Marc",
    lastName: "Dubois",
    email: "marc.dubois@viamentor.ch",
    phone: "+41 79 123 45 67",
    avatar: "https://github.com/yusufhilmi.png",
    status: "Disponible",
    categories: ["B", "BE"],
    lessonsToday: 3,
    monthStats: {
      lessonsCount: 68,
      totalHours: 102,
      rating: 4.8,
    },
    omcoStatus: "Conforme",
    omcoExpiryDate: "2025-12-31",
    trainingDue: false,
    activeStudents: 12,
    joinedDate: "2020-03-15",
    address: {
      street: "Rue du Lac 45",
      zip: "1003",
      city: "Lausanne",
    },
  },
  {
    id: "inst-2",
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@viamentor.ch",
    phone: "+41 79 234 56 78",
    avatar: "https://github.com/kdrnp.png",
    status: "En leçon",
    categories: ["A", "A1"],
    lessonsToday: 5,
    monthStats: {
      lessonsCount: 82,
      totalHours: 123,
      rating: 4.9,
    },
    omcoStatus: "Conforme",
    omcoExpiryDate: "2026-06-30",
    trainingDue: false,
    activeStudents: 15,
    joinedDate: "2019-09-01",
    address: {
      street: "Avenue de la Gare 12",
      zip: "1201",
      city: "Genève",
    },
  },
  {
    id: "inst-3",
    firstName: "Thomas",
    lastName: "Müller",
    email: "thomas.mueller@viamentor.ch",
    phone: "+41 79 345 67 89",
    avatar: "https://github.com/yahyabedirhan.png",
    status: "Disponible",
    categories: ["B", "A", "BE"],
    lessonsToday: 2,
    monthStats: {
      lessonsCount: 45,
      totalHours: 67.5,
      rating: 4.6,
    },
    omcoStatus: "Attention",
    omcoExpiryDate: "2025-02-28",
    trainingDue: true,
    activeStudents: 8,
    joinedDate: "2021-01-10",
    address: {
      street: "Hauptstrasse 78",
      zip: "8001",
      city: "Zürich",
    },
  },
  {
    id: "inst-4",
    firstName: "Laura",
    lastName: "Rossi",
    email: "laura.rossi@viamentor.ch",
    phone: "+41 79 456 78 90",
    status: "Absent",
    categories: ["B"],
    lessonsToday: 0,
    monthStats: {
      lessonsCount: 52,
      totalHours: 78,
      rating: 4.7,
    },
    omcoStatus: "Conforme",
    omcoExpiryDate: "2026-03-31",
    trainingDue: false,
    activeStudents: 10,
    joinedDate: "2020-11-20",
    address: {
      street: "Via Roma 23",
      zip: "6900",
      city: "Lugano",
    },
  },
  {
    id: "inst-5",
    firstName: "Pierre",
    lastName: "Favre",
    email: "pierre.favre@viamentor.ch",
    phone: "+41 79 567 89 01",
    avatar: "https://github.com/denizbuyuktas.png",
    status: "En leçon",
    categories: ["B", "A"],
    lessonsToday: 4,
    monthStats: {
      lessonsCount: 75,
      totalHours: 112.5,
      rating: 4.8,
    },
    omcoStatus: "Non conforme",
    omcoExpiryDate: "2024-12-31",
    trainingDue: true,
    activeStudents: 14,
    joinedDate: "2018-05-15",
    address: {
      street: "Chemin des Fleurs 56",
      zip: "2000",
      city: "Neuchâtel",
    },
  },
  {
    id: "inst-6",
    firstName: "Anna",
    lastName: "Schmidt",
    email: "anna.schmidt@viamentor.ch",
    phone: "+41 79 678 90 12",
    avatar: "https://github.com/shoaibux1.png",
    status: "Disponible",
    categories: ["B", "BE"],
    lessonsToday: 3,
    monthStats: {
      lessonsCount: 60,
      totalHours: 90,
      rating: 4.9,
    },
    omcoStatus: "Conforme",
    omcoExpiryDate: "2026-09-30",
    trainingDue: false,
    activeStudents: 11,
    joinedDate: "2020-07-01",
    address: {
      street: "Bahnhofstrasse 34",
      zip: "3000",
      city: "Bern",
    },
  },
];

export const MOCK_INSTRUCTOR_STATS: InstructorStats = {
  total: MOCK_INSTRUCTORS.length,
  available: MOCK_INSTRUCTORS.filter((i) => i.status === "Disponible").length,
  inLesson: MOCK_INSTRUCTORS.filter((i) => i.status === "En leçon").length,
  absent: MOCK_INSTRUCTORS.filter((i) => i.status === "Absent").length,
};

// Helper functions
export function getStatusColor(status: InstructorStatus): string {
  switch (status) {
    case "Disponible":
      return "bg-green-600";
    case "En leçon":
      return "bg-blue-600";
    case "Absent":
      return "bg-red-600";
    case "En pause":
      return "bg-orange-600";
    default:
      return "bg-gray-400";
  }
}

export function getOMCoStatusColor(
  status: OMCoStatus
): "default" | "secondary" | "destructive" {
  switch (status) {
    case "Conforme":
      return "default";
    case "Attention":
      return "secondary";
    case "Non conforme":
      return "destructive";
  }
}

export function getCategoryColor(category: LicenseCategory): string {
  switch (category) {
    case "B":
      return "hsl(var(--chart-1))";
    case "A":
      return "hsl(var(--chart-2))";
    case "BE":
      return "hsl(var(--chart-3))";
    case "A1":
      return "hsl(var(--chart-4))";
    case "C":
      return "hsl(var(--chart-5))";
    case "D":
      return "hsl(220, 70%, 50%)";
    default:
      return "hsl(var(--muted))";
  }
}

export function getCategoryIcon(
  category: LicenseCategory
): "Car" | "Bike" | "Truck" | "Bus" {
  switch (category) {
    case "B":
    case "BE":
      return "Car";
    case "A":
    case "A1":
      return "Bike";
    case "C":
      return "Truck";
    case "D":
      return "Bus";
    default:
      return "Car";
  }
}
