/**
 * VIAMENTOR Tenants Mock Data
 *
 * Données de test pour auto-écoles avec cantons suisses
 *
 * @module data/viamentor-tenants-data
 * @version 1.0.0
 */

export type TenantPlan = "Free" | "Pro" | "Enterprise";
export type TenantStatus = "Active" | "Trial" | "Suspended";

export interface Tenant {
  id: string;
  name: string;
  logo?: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    canton: string;
    postalCode: string;
  };
  plan: TenantPlan;
  status: TenantStatus;
  studentsCount: number;
  instructorsCount: number;
  mrr: number; // Monthly Recurring Revenue in CHF
  createdAt: string;
  lastActivity: string;
}

/**
 * Cantons suisses (26 cantons)
 */
export const SWISS_CANTONS = [
  { code: "AG", name: "Argovie" },
  { code: "AI", name: "Appenzell Rhodes-Intérieures" },
  { code: "AR", name: "Appenzell Rhodes-Extérieures" },
  { code: "BE", name: "Berne" },
  { code: "BL", name: "Bâle-Campagne" },
  { code: "BS", name: "Bâle-Ville" },
  { code: "FR", name: "Fribourg" },
  { code: "GE", name: "Genève" },
  { code: "GL", name: "Glaris" },
  { code: "GR", name: "Grisons" },
  { code: "JU", name: "Jura" },
  { code: "LU", name: "Lucerne" },
  { code: "NE", name: "Neuchâtel" },
  { code: "NW", name: "Nidwald" },
  { code: "OW", name: "Obwald" },
  { code: "SG", name: "Saint-Gall" },
  { code: "SH", name: "Schaffhouse" },
  { code: "SO", name: "Soleure" },
  { code: "SZ", name: "Schwytz" },
  { code: "TG", name: "Thurgovie" },
  { code: "TI", name: "Tessin" },
  { code: "UR", name: "Uri" },
  { code: "VD", name: "Vaud" },
  { code: "VS", name: "Valais" },
  { code: "ZG", name: "Zoug" },
  { code: "ZH", name: "Zurich" },
] as const;

/**
 * Mock tenants data
 */
export const MOCK_TENANTS: Tenant[] = [
  {
    id: "tenant-1",
    name: "Auto-École Léman",
    logo: "https://github.com/polymet-ai.png",
    email: "contact@leman-auto.ch",
    phone: "+41 22 123 45 67",
    address: {
      street: "Rue du Rhône 45",
      city: "Genève",
      canton: "GE",
      postalCode: "1204",
    },
    plan: "Enterprise",
    status: "Active",
    studentsCount: 245,
    instructorsCount: 12,
    mrr: 2499,
    createdAt: "2023-01-15",
    lastActivity: "2024-01-10T14:30:00Z",
  },
  {
    id: "tenant-2",
    name: "Fahrschule Zürich Pro",
    email: "info@zh-fahrschule.ch",
    phone: "+41 44 987 65 43",
    address: {
      street: "Bahnhofstrasse 120",
      city: "Zürich",
      canton: "ZH",
      postalCode: "8001",
    },
    plan: "Pro",
    status: "Active",
    studentsCount: 180,
    instructorsCount: 8,
    mrr: 999,
    createdAt: "2023-03-20",
    lastActivity: "2024-01-11T09:15:00Z",
  },
  {
    id: "tenant-3",
    name: "École de Conduite Fribourg",
    email: "contact@ecf-fribourg.ch",
    phone: "+41 26 456 78 90",
    address: {
      street: "Avenue de la Gare 23",
      city: "Fribourg",
      canton: "FR",
      postalCode: "1700",
    },
    plan: "Pro",
    status: "Trial",
    studentsCount: 95,
    instructorsCount: 5,
    mrr: 0,
    createdAt: "2024-01-05",
    lastActivity: "2024-01-11T11:45:00Z",
  },
  {
    id: "tenant-4",
    name: "Scuola Guida Ticino",
    logo: "https://github.com/yusufhilmi.png",
    email: "info@guida-ticino.ch",
    phone: "+41 91 234 56 78",
    address: {
      street: "Via Nassa 67",
      city: "Lugano",
      canton: "TI",
      postalCode: "6900",
    },
    plan: "Enterprise",
    status: "Active",
    studentsCount: 310,
    instructorsCount: 15,
    mrr: 2499,
    createdAt: "2022-11-10",
    lastActivity: "2024-01-11T16:20:00Z",
  },
  {
    id: "tenant-5",
    name: "Auto-École Lausanne",
    email: "contact@ae-lausanne.ch",
    phone: "+41 21 345 67 89",
    address: {
      street: "Place Saint-François 12",
      city: "Lausanne",
      canton: "VD",
      postalCode: "1003",
    },
    plan: "Free",
    status: "Active",
    studentsCount: 45,
    instructorsCount: 3,
    mrr: 0,
    createdAt: "2023-09-12",
    lastActivity: "2024-01-09T13:00:00Z",
  },
  {
    id: "tenant-6",
    name: "Fahrschule Bern City",
    email: "info@bern-city.ch",
    phone: "+41 31 567 89 01",
    address: {
      street: "Spitalgasse 34",
      city: "Bern",
      canton: "BE",
      postalCode: "3011",
    },
    plan: "Pro",
    status: "Suspended",
    studentsCount: 120,
    instructorsCount: 6,
    mrr: 999,
    createdAt: "2023-05-18",
    lastActivity: "2023-12-20T10:30:00Z",
  },
  {
    id: "tenant-7",
    name: "École de Conduite Neuchâtel",
    email: "contact@ecn.ch",
    phone: "+41 32 678 90 12",
    address: {
      street: "Rue du Seyon 8",
      city: "Neuchâtel",
      canton: "NE",
      postalCode: "2000",
    },
    plan: "Free",
    status: "Trial",
    studentsCount: 28,
    instructorsCount: 2,
    mrr: 0,
    createdAt: "2024-01-08",
    lastActivity: "2024-01-11T08:45:00Z",
  },
  {
    id: "tenant-8",
    name: "Fahrschule Basel Premium",
    logo: "https://github.com/kdrnp.png",
    email: "info@basel-premium.ch",
    phone: "+41 61 789 01 23",
    address: {
      street: "Freie Strasse 56",
      city: "Basel",
      canton: "BS",
      postalCode: "4051",
    },
    plan: "Enterprise",
    status: "Active",
    studentsCount: 280,
    instructorsCount: 14,
    mrr: 2499,
    createdAt: "2022-08-25",
    lastActivity: "2024-01-11T15:10:00Z",
  },
];

/**
 * Génère une couleur unique basée sur le hash du nom
 */
export function generateColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 65%, 50%)`;
}

/**
 * Génère les initiales d'un nom
 */
export function generateInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Calcule les statistiques globales
 */
export function calculateTenantStats(tenants: Tenant[]) {
  return {
    active: tenants.filter((t) => t.status === "Active").length,
    trial: tenants.filter((t) => t.status === "Trial").length,
    suspended: tenants.filter((t) => t.status === "Suspended").length,
    totalMrr: tenants.reduce((sum, t) => sum + t.mrr, 0),
  };
}
