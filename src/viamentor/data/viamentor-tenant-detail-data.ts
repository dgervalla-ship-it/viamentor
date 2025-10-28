/**
 * VIAMENTOR Tenant Detail Mock Data
 *
 * Données complètes pour page de détail tenant Platform Admin
 *
 * @module data/viamentor-tenant-detail-data
 * @version 1.0.0
 */

export interface TenantDetail {
  id: string;
  name: string;
  description: string;
  logo: string;
  plan: "Starter" | "Pro" | "Enterprise";
  status: "Active" | "Trial" | "Suspended";
  address: {
    street: string;
    postalCode: string;
    city: string;
    canton: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  stats: {
    studentsCount: number;
    studentsTrend: number; // percentage
    instructorsCount: number;
    lessonsThisMonth: number;
    lessonsLastMonth: number;
    mrr: number;
    mrrChange: number; // percentage
    activeSince: string; // ISO date
  };
  createdAt: string;
  updatedAt: string;
}

export interface TenantUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: "School Admin" | "Instructor" | "Secretary" | "Staff";
  status: "Active" | "Suspended";
  lastLogin: string; // ISO date
}

export interface TenantStudent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  categories: string[];
  progress: number; // percentage
  instructor: string;
  nextLesson: string | null; // ISO date
  status: "Active" | "Inactive";
}

export interface TenantInvoice {
  id: string;
  number: string;
  date: string; // ISO date
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  pdfUrl: string;
}

export interface TenantActivity {
  id: string;
  timestamp: string; // ISO date
  userId: string;
  userName: string;
  userAvatar: string;
  action: string;
  entity: string;
  entityId: string;
  description: string;
}

export interface TenantLog {
  id: string;
  timestamp: string; // ISO date
  userId: string;
  userName: string;
  userAvatar: string;
  action: "Create" | "Update" | "Delete";
  resource: string;
  changes: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
  ipAddress: string;
  country: string;
  sessionId: string;
}

export const MOCK_TENANT_DETAIL: TenantDetail = {
  id: "tenant-001",
  name: "Auto-École Léman",
  description:
    "École de conduite premium située au cœur de Genève, spécialisée dans la formation de qualité depuis 1995.",
  logo: "https://github.com/viamentor-ai.png",
  plan: "Pro",
  status: "Active",
  address: {
    street: "Rue du Rhône 42",
    postalCode: "1200",
    city: "Genève",
    canton: "GE",
  },
  contact: {
    phone: "+41 22 123 45 67",
    email: "contact@leman.ch",
    website: "https://www.leman.ch",
  },
  stats: {
    studentsCount: 145,
    studentsTrend: 12.5,
    instructorsCount: 8,
    lessonsThisMonth: 342,
    lessonsLastMonth: 298,
    mrr: 1850,
    mrrChange: 8.2,
    activeSince: "2023-03-15T10:00:00Z",
  },
  createdAt: "2023-03-15T10:00:00Z",
  updatedAt: "2024-01-10T14:30:00Z",
};

export const MOCK_TENANT_USERS: TenantUser[] = [
  {
    id: "user-001",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@leman.ch",
    avatar: "https://github.com/yusufhilmi.png",
    role: "School Admin",
    status: "Active",
    lastLogin: "2024-01-10T09:15:00Z",
  },
  {
    id: "user-002",
    firstName: "Marie",
    lastName: "Martin",
    email: "marie.martin@leman.ch",
    avatar: "https://github.com/kdrnp.png",
    role: "Instructor",
    status: "Active",
    lastLogin: "2024-01-10T08:30:00Z",
  },
  {
    id: "user-003",
    firstName: "Pierre",
    lastName: "Bernard",
    email: "pierre.bernard@leman.ch",
    avatar: "https://github.com/yahyabedirhan.png",
    role: "Instructor",
    status: "Active",
    lastLogin: "2024-01-09T16:45:00Z",
  },
  {
    id: "user-004",
    firstName: "Sophie",
    lastName: "Dubois",
    email: "sophie.dubois@leman.ch",
    avatar: "https://github.com/denizbuyuktas.png",
    role: "Secretary",
    status: "Active",
    lastLogin: "2024-01-10T10:00:00Z",
  },
  {
    id: "user-005",
    firstName: "Luc",
    lastName: "Moreau",
    email: "luc.moreau@leman.ch",
    avatar: "https://github.com/shoaibux1.png",
    role: "Instructor",
    status: "Suspended",
    lastLogin: "2024-01-05T14:20:00Z",
  },
];

export const MOCK_TENANT_STUDENTS: TenantStudent[] = [
  {
    id: "student-001",
    firstName: "Alice",
    lastName: "Rousseau",
    email: "alice.rousseau@example.com",
    avatar: "https://github.com/yusufhilmi.png",
    categories: ["B", "B1"],
    progress: 75,
    instructor: "Marie Martin",
    nextLesson: "2024-01-12T14:00:00Z",
    status: "Active",
  },
  {
    id: "student-002",
    firstName: "Thomas",
    lastName: "Petit",
    email: "thomas.petit@example.com",
    avatar: "https://github.com/kdrnp.png",
    categories: ["B"],
    progress: 45,
    instructor: "Pierre Bernard",
    nextLesson: "2024-01-11T10:00:00Z",
    status: "Active",
  },
  {
    id: "student-003",
    firstName: "Emma",
    lastName: "Leroy",
    email: "emma.leroy@example.com",
    avatar: "https://github.com/yahyabedirhan.png",
    categories: ["B", "A1"],
    progress: 90,
    instructor: "Marie Martin",
    nextLesson: null,
    status: "Active",
  },
];

export const MOCK_TENANT_INVOICES: TenantInvoice[] = [
  {
    id: "inv-001",
    number: "INV-2024-001",
    date: "2024-01-01T00:00:00Z",
    amount: 1850,
    status: "Paid",
    pdfUrl: "#",
  },
  {
    id: "inv-002",
    number: "INV-2023-012",
    date: "2023-12-01T00:00:00Z",
    amount: 1710,
    status: "Paid",
    pdfUrl: "#",
  },
  {
    id: "inv-003",
    number: "INV-2023-011",
    date: "2023-11-01T00:00:00Z",
    amount: 1710,
    status: "Paid",
    pdfUrl: "#",
  },
];

export const MOCK_TENANT_ACTIVITIES: TenantActivity[] = [
  {
    id: "act-001",
    timestamp: "2024-01-10T14:30:00Z",
    userId: "user-001",
    userName: "Jean Dupont",
    userAvatar: "https://github.com/yusufhilmi.png",
    action: "created",
    entity: "student",
    entityId: "student-045",
    description: "Created student Emma Leroy",
  },
  {
    id: "act-002",
    timestamp: "2024-01-10T11:15:00Z",
    userId: "user-002",
    userName: "Marie Martin",
    userAvatar: "https://github.com/kdrnp.png",
    action: "scheduled",
    entity: "lesson",
    entityId: "lesson-892",
    description: "Scheduled lesson with Alice Rousseau",
  },
  {
    id: "act-003",
    timestamp: "2024-01-10T09:45:00Z",
    userId: "user-004",
    userName: "Sophie Dubois",
    userAvatar: "https://github.com/denizbuyuktas.png",
    action: "paid",
    entity: "invoice",
    entityId: "inv-001",
    description: "Invoice INV-2024-001 paid",
  },
  {
    id: "act-004",
    timestamp: "2024-01-09T16:20:00Z",
    userId: "user-003",
    userName: "Pierre Bernard",
    userAvatar: "https://github.com/yahyabedirhan.png",
    action: "completed",
    entity: "lesson",
    entityId: "lesson-891",
    description: "Completed lesson with Thomas Petit",
  },
  {
    id: "act-005",
    timestamp: "2024-01-09T14:00:00Z",
    userId: "user-001",
    userName: "Jean Dupont",
    userAvatar: "https://github.com/yusufhilmi.png",
    action: "updated",
    entity: "student",
    entityId: "student-042",
    description: "Updated student progress to 75%",
  },
];

export const MOCK_TENANT_LOGS: TenantLog[] = [
  {
    id: "log-001",
    timestamp: "2024-01-10T14:30:00Z",
    userId: "user-001",
    userName: "Jean Dupont",
    userAvatar: "https://github.com/yusufhilmi.png",
    action: "Create",
    resource: "Student",
    changes: [
      { field: "firstName", oldValue: "", newValue: "Emma" },
      { field: "lastName", oldValue: "", newValue: "Leroy" },
      { field: "email", oldValue: "", newValue: "emma.leroy@example.com" },
    ],

    ipAddress: "185.45.123.45",
    country: "CH",
    sessionId: "sess-abc123",
  },
  {
    id: "log-002",
    timestamp: "2024-01-10T11:15:00Z",
    userId: "user-002",
    userName: "Marie Martin",
    userAvatar: "https://github.com/kdrnp.png",
    action: "Update",
    resource: "Lesson",
    changes: [
      { field: "status", oldValue: "Pending", newValue: "Scheduled" },
      { field: "date", oldValue: "2024-01-11", newValue: "2024-01-12" },
    ],

    ipAddress: "185.45.123.46",
    country: "CH",
    sessionId: "sess-def456",
  },
  {
    id: "log-003",
    timestamp: "2024-01-09T16:20:00Z",
    userId: "user-003",
    userName: "Pierre Bernard",
    userAvatar: "https://github.com/yahyabedirhan.png",
    action: "Delete",
    resource: "Lesson",
    changes: [
      { field: "id", oldValue: "lesson-890", newValue: "" },
      { field: "reason", oldValue: "", newValue: "Student cancelled" },
    ],

    ipAddress: "185.45.123.47",
    country: "CH",
    sessionId: "sess-ghi789",
  },
];

/**
 * Helper pour obtenir un tenant par ID
 */
export function getTenantById(id: string): TenantDetail {
  // Mock - retourne toujours le même tenant
  return MOCK_TENANT_DETAIL;
}

/**
 * Helper pour obtenir les utilisateurs d'un tenant
 */
export function getTenantUsers(tenantId: string): TenantUser[] {
  return MOCK_TENANT_USERS;
}

/**
 * Helper pour obtenir les étudiants d'un tenant
 */
export function getTenantStudents(tenantId: string): TenantStudent[] {
  return MOCK_TENANT_STUDENTS;
}

/**
 * Helper pour obtenir les factures d'un tenant
 */
export function getTenantInvoices(tenantId: string): TenantInvoice[] {
  return MOCK_TENANT_INVOICES;
}

/**
 * Helper pour obtenir les activités d'un tenant
 */
export function getTenantActivities(tenantId: string): TenantActivity[] {
  return MOCK_TENANT_ACTIVITIES;
}

/**
 * Helper pour obtenir les logs d'un tenant
 */
export function getTenantLogs(tenantId: string): TenantLog[] {
  return MOCK_TENANT_LOGS;
}
