/**
 * VIAMENTOR - Header Search Data
 * Mock data pour global search multi-entities
 */

export type SearchEntityType =
  | "student"
  | "instructor"
  | "lesson"
  | "vehicle"
  | "invoice"
  | "document";

export interface SearchResult {
  id: string;
  type: SearchEntityType;
  title: string;
  subtitle?: string;
  metadata?: Record<string, any>;
  url: string;
}

// Students mock data
export const MOCK_STUDENTS_SEARCH = [
  {
    id: "std-001",
    type: "student" as const,
    title: "Jean Dupont",
    subtitle: "Catégorie B • 75% progression",
    metadata: {
      avatar: "https://github.com/yusufhilmi.png",
      category: "B",
      progression: 75,
      status: "active",
      birthDate: "15.03.1998",
    },
    url: "/students/std-001",
  },
  {
    id: "std-002",
    type: "student" as const,
    title: "Marie Martin",
    subtitle: "Catégorie A • 45% progression",
    metadata: {
      avatar: "https://github.com/kdrnp.png",
      category: "A",
      progression: 45,
      status: "active",
      birthDate: "22.07.2001",
    },
    url: "/students/std-002",
  },
  {
    id: "std-003",
    type: "student" as const,
    title: "Pierre Dubois",
    subtitle: "Catégorie BE • 90% progression",
    metadata: {
      avatar: "https://github.com/yahyabedirhan.png",
      category: "BE",
      progression: 90,
      status: "active",
      birthDate: "08.11.1995",
    },
    url: "/students/std-003",
  },
  {
    id: "std-004",
    type: "student" as const,
    title: "Sophie Bernard",
    subtitle: "Catégorie B • 30% progression",
    metadata: {
      avatar: "https://github.com/denizbuyuktas.png",
      category: "B",
      progression: 30,
      status: "active",
      birthDate: "30.05.2003",
    },
    url: "/students/std-004",
  },
  {
    id: "std-005",
    type: "student" as const,
    title: "Luc Moreau",
    subtitle: "Catégorie A1 • 60% progression",
    metadata: {
      avatar: "https://github.com/shoaibux1.png",
      category: "A1",
      progression: 60,
      status: "active",
      birthDate: "12.09.2000",
    },
    url: "/students/std-005",
  },
];

// Instructors mock data
export const MOCK_INSTRUCTORS_SEARCH = [
  {
    id: "ins-001",
    type: "instructor" as const,
    title: "Marc Lefebvre",
    subtitle: "B, A, BE • Disponible",
    metadata: {
      avatar: "https://github.com/yusufhilmi.png",
      qualifications: ["B", "A", "BE"],
      status: "available",
      statusColor: "green",
    },
    url: "/instructors/ins-001",
  },
  {
    id: "ins-002",
    type: "instructor" as const,
    title: "Claire Dubois",
    subtitle: "B, A1 • Occupé",
    metadata: {
      avatar: "https://github.com/kdrnp.png",
      qualifications: ["B", "A1"],
      status: "busy",
      statusColor: "orange",
    },
    url: "/instructors/ins-002",
  },
  {
    id: "ins-003",
    type: "instructor" as const,
    title: "Thomas Petit",
    subtitle: "B, BE, C • Disponible",
    metadata: {
      avatar: "https://github.com/yahyabedirhan.png",
      qualifications: ["B", "BE", "C"],
      status: "available",
      statusColor: "green",
    },
    url: "/instructors/ins-003",
  },
];

// Lessons mock data
export const MOCK_LESSONS_SEARCH = [
  {
    id: "les-001",
    type: "lesson" as const,
    title: "Leçon B - Jean Dupont avec Marc Lefebvre le 15.01.2025",
    subtitle: "14:00 - 15:30",
    metadata: {
      category: "B",
      student: "Jean Dupont",
      instructor: "Marc Lefebvre",
      date: "2025-01-15",
      time: "14:00 - 15:30",
      status: "scheduled",
    },
    url: "/lessons/les-001",
  },
  {
    id: "les-002",
    type: "lesson" as const,
    title: "Leçon A - Marie Martin avec Claire Dubois le 16.01.2025",
    subtitle: "10:00 - 11:30",
    metadata: {
      category: "A",
      student: "Marie Martin",
      instructor: "Claire Dubois",
      date: "2025-01-16",
      time: "10:00 - 11:30",
      status: "scheduled",
    },
    url: "/lessons/les-002",
  },
  {
    id: "les-003",
    type: "lesson" as const,
    title: "Leçon BE - Pierre Dubois avec Thomas Petit le 17.01.2025",
    subtitle: "16:00 - 17:30",
    metadata: {
      category: "BE",
      student: "Pierre Dubois",
      instructor: "Thomas Petit",
      date: "2025-01-17",
      time: "16:00 - 17:30",
      status: "scheduled",
    },
    url: "/lessons/les-003",
  },
];

// Vehicles mock data
export const MOCK_VEHICLES_SEARCH = [
  {
    id: "veh-001",
    type: "vehicle" as const,
    title: "VD 12345",
    subtitle: "VW Golf 8 • Disponible",
    metadata: {
      plate: "VD 12345",
      model: "VW Golf 8",
      category: "B",
      status: "available",
      statusColor: "green",
    },
    url: "/vehicles/veh-001",
  },
  {
    id: "veh-002",
    type: "vehicle" as const,
    title: "VD 67890",
    subtitle: "BMW 320d • En leçon",
    metadata: {
      plate: "VD 67890",
      model: "BMW 320d",
      category: "B",
      status: "in_use",
      statusColor: "orange",
    },
    url: "/vehicles/veh-002",
  },
  {
    id: "veh-003",
    type: "vehicle" as const,
    title: "VD 11111",
    subtitle: "Yamaha MT-07 • Disponible",
    metadata: {
      plate: "VD 11111",
      model: "Yamaha MT-07",
      category: "A",
      status: "available",
      statusColor: "green",
    },
    url: "/vehicles/veh-003",
  },
];

// Invoices mock data
export const MOCK_INVOICES_SEARCH = [
  {
    id: "inv-001",
    type: "invoice" as const,
    title: "INV-2025-001",
    subtitle: "Jean Dupont • CHF 1'200.00 • Payée",
    metadata: {
      number: "INV-2025-001",
      student: "Jean Dupont",
      amount: 1200.0,
      currency: "CHF",
      status: "paid",
      statusColor: "green",
    },
    url: "/finances/invoices/inv-001",
  },
  {
    id: "inv-002",
    type: "invoice" as const,
    title: "INV-2025-002",
    subtitle: "Marie Martin • CHF 850.00 • En attente",
    metadata: {
      number: "INV-2025-002",
      student: "Marie Martin",
      amount: 850.0,
      currency: "CHF",
      status: "pending",
      statusColor: "orange",
    },
    url: "/finances/invoices/inv-002",
  },
  {
    id: "inv-003",
    type: "invoice" as const,
    title: "INV-2025-003",
    subtitle: "Pierre Dubois • CHF 2'100.00 • En retard",
    metadata: {
      number: "INV-2025-003",
      student: "Pierre Dubois",
      amount: 2100.0,
      currency: "CHF",
      status: "overdue",
      statusColor: "red",
    },
    url: "/finances/invoices/inv-003",
  },
];

// Documents mock data
export const MOCK_DOCUMENTS_SEARCH = [
  {
    id: "doc-001",
    type: "document" as const,
    title: "Permis d'élève conducteur - Jean Dupont",
    subtitle: "PDF • Il y a 2 jours",
    metadata: {
      name: "Permis d'élève conducteur - Jean Dupont",
      type: "PDF",
      category: "permit",
      date: "2025-01-13",
      size: "245 KB",
    },
    url: "/documents/doc-001",
  },
  {
    id: "doc-002",
    type: "document" as const,
    title: "Contrat formation - Marie Martin",
    subtitle: "PDF • Il y a 5 jours",
    metadata: {
      name: "Contrat formation - Marie Martin",
      type: "PDF",
      category: "contract",
      date: "2025-01-10",
      size: "189 KB",
    },
    url: "/documents/doc-002",
  },
  {
    id: "doc-003",
    type: "document" as const,
    title: "Attestation cours sensibilisation - Pierre Dubois",
    subtitle: "PDF • Il y a 1 semaine",
    metadata: {
      name: "Attestation cours sensibilisation - Pierre Dubois",
      type: "PDF",
      category: "certificate",
      date: "2025-01-08",
      size: "312 KB",
    },
    url: "/documents/doc-003",
  },
];

// All search data combined
export const ALL_SEARCH_DATA: SearchResult[] = [
  ...MOCK_STUDENTS_SEARCH,
  ...MOCK_INSTRUCTORS_SEARCH,
  ...MOCK_LESSONS_SEARCH,
  ...MOCK_VEHICLES_SEARCH,
  ...MOCK_INVOICES_SEARCH,
  ...MOCK_DOCUMENTS_SEARCH,
];

// Fuse.js configuration
export const SEARCH_CONFIG = {
  threshold: 0.3,
  keys: [
    "title",
    "subtitle",
    "metadata.student",
    "metadata.instructor",
    "metadata.number",
    "metadata.birthDate",
  ],

  includeScore: true,
  minMatchCharLength: 2,
};
