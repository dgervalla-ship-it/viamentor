/**
 * VIAMENTOR - Billing Reminders Data
 * Mock data et types pour module rappels facturation
 */

// ============================================================================
// TYPES
// ============================================================================

export type ReminderStatus = "pending" | "sent" | "failed" | "cancelled";
export type ReminderType = "first" | "second" | "final" | "legal";
export type ReminderChannel = "email" | "sms" | "phone";

export interface Reminder {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  student: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  amount: number;
  dueDate: Date;
  overdueBy: number;
  type: ReminderType;
  status: ReminderStatus;
  sentDate?: Date;
  sentVia: ReminderChannel[];
  nextReminderDate?: Date;
}

export interface ReminderTemplate {
  id: string;
  name: string;
  type: ReminderType;
  subject: string;
  delayDays: number;
  channels: ReminderChannel[];
  active: boolean;
}

export interface ReminderStats {
  pending: number;
  sent: number;
  failed: number;
  total: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const mockReminders: Reminder[] = [
  {
    id: "1",
    invoiceId: "inv-001",
    invoiceNumber: "FAC-2025-001",
    student: {
      id: "s1",
      name: "Sophie Dubois",
      email: "sophie.dubois@email.com",
      phone: "+41 79 123 45 67",
      avatar: "https://github.com/kdrnp.png",
    },
    amount: 450,
    dueDate: new Date(2025, 0, 10),
    overdueBy: 15,
    type: "first",
    status: "pending",
    sentVia: [],
    nextReminderDate: new Date(2025, 0, 26),
  },
  {
    id: "2",
    invoiceId: "inv-002",
    invoiceNumber: "FAC-2025-002",
    student: {
      id: "s2",
      name: "Marc Lefebvre",
      email: "marc.lefebvre@email.com",
      phone: "+41 79 234 56 78",
      avatar: "https://github.com/yusufhilmi.png",
    },
    amount: 850,
    dueDate: new Date(2024, 11, 20),
    overdueBy: 35,
    type: "second",
    status: "sent",
    sentDate: new Date(2025, 0, 20),
    sentVia: ["email", "sms"],
    nextReminderDate: new Date(2025, 1, 5),
  },
  {
    id: "3",
    invoiceId: "inv-003",
    invoiceNumber: "FAC-2024-089",
    student: {
      id: "s3",
      name: "Julie Martin",
      email: "julie.martin@email.com",
      phone: "+41 79 345 67 89",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    amount: 1200,
    dueDate: new Date(2024, 10, 15),
    overdueBy: 70,
    type: "final",
    status: "sent",
    sentDate: new Date(2025, 0, 15),
    sentVia: ["email", "sms", "phone"],
    nextReminderDate: new Date(2025, 1, 1),
  },
];

export const mockTemplates: ReminderTemplate[] = [
  {
    id: "t1",
    name: "Premier rappel",
    type: "first",
    subject: "Rappel de paiement - Facture {invoice_number}",
    delayDays: 7,
    channels: ["email"],
    active: true,
  },
  {
    id: "t2",
    name: "Deuxième rappel",
    type: "second",
    subject: "Rappel urgent - Facture {invoice_number}",
    delayDays: 14,
    channels: ["email", "sms"],
    active: true,
  },
  {
    id: "t3",
    name: "Dernier rappel",
    type: "final",
    subject: "Dernier rappel avant poursuites - Facture {invoice_number}",
    delayDays: 30,
    channels: ["email", "sms", "phone"],
    active: true,
  },
  {
    id: "t4",
    name: "Mise en demeure",
    type: "legal",
    subject: "Mise en demeure - Facture {invoice_number}",
    delayDays: 45,
    channels: ["email"],
    active: false,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getStatusColor = (status: ReminderStatus): string => {
  switch (status) {
    case "pending":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "sent":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "failed":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "cancelled":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const getTypeColor = (type: ReminderType): string => {
  switch (type) {
    case "first":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "second":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "final":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "legal":
      return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const calculateStats = (reminders: Reminder[]): ReminderStats => {
  return {
    pending: reminders.filter((r) => r.status === "pending").length,
    sent: reminders.filter((r) => r.status === "sent").length,
    failed: reminders.filter((r) => r.status === "failed").length,
    total: reminders.length,
  };
};
